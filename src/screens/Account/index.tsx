import React, { useState, useEffect, useRef } from "react";

import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { Formik, ErrorMessage } from "formik";
import { Picker } from "@react-native-picker/picker";
import { yupResolver } from "@hookform/resolvers/yup";
import Constants from "expo-constants";
import { Camera } from "expo-camera";
import * as DocumentPicker from "expo-document-picker";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Alert,
  ScrollView,
  Text,
  View,
  Button,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Image,
  Keyboard,
  FlatList,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { InputForm } from "../../components/Forms/InputForm";

import api from "../../services/api.ts";

import {
  Container,
  Register,
  Title,
  SubTitle,
  ButtonText,
  InputArea,
  PickerContainer,
  ContainerPicker,
  ImagePicker as PickerImage,
  ButtonCameraReverse,
  ButtonCamera,
  ViewFlatlist,
  Images,
} from "./styles.ts";

const schema = Yup.object({
  name: Yup.string().required("Nome é obrigatório"),
  email: Yup.string().email("Email inválido").required("Email requerido"),
});

interface DateProps {
  name: string;
  email: string;
}

export const Account: React.FC<DateProps> = ({ name, email }) => {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { navigate, goBack } = useNavigation<any>();
  const [type, setType] = useState("Fisica");

  //Utilização da camera
  const camRef = useRef(null);
  const [image, setImage] = useState(null);
  const [imageArray, setImageArray] = useState([]);
  const [document, setDocument] = useState(null);
  const [documentArray, setDocumentArray] = useState([]);

  const [typeCamera, setTypeCamera] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHaspermission] = useState(null);
  const [open, setOpen] = useState(null);
  const [openCamera, setOpenCamera] = useState(false);
  //const showHideCamera = () => setOpenCamera(true)

  //Carregar dados quando o aplicativo for iniciado
  useEffect(() => {
    const ImageLoad = async () => {
      try {
        const _savetakePicture = await AsyncStorage.getItem("@image");
        setImage(_savetakePicture);
      } catch (err) {
        console.log(err);
      }
    };

    ImageLoad();
  }, []);

  //Carregar dados document quando o aplicativo for iniciado
  useEffect(() => {
    const DocumentLoad = async () => {
      try {
        const _savepickDocument = await AsyncStorage.getItem("@documents");
        setDocument(_savepickDocument);
      } catch (err) {
        console.log(err);
      }
    };

    DocumentLoad();
  }, [document]);
  //Verifica se o aplicativo tem permissão
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      return setHaspermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>Sem Acesso </Text>;
  }

  //FINALIZAR CADASTRO
  async function _handleRegister(values) {
    try {
      const response = api.post("/store", {
        name: values.name,
        email: values.email,
        type: type,
        document: document,
        image: image,
      });
      navigate("Confirmation", {
        title: "Conta criada!",
        message: "",
        nextScreenRoute: "SignIn",
      });
      return response;
    } catch (error) {
      console.log("error" + error);
    }
  }

  //TIRAR FOTO
  async function _takePicture() {
    if (camRef) {
      const data = await camRef.current.takePictureAsync();
      setImage(data.uri);
      setImageArray([...imageArray, data.uri]);
      setOpen(true);
    }
  }

  async function _savepickDocument() {
    try {
      await AsyncStorage.setItem("@documents", document);
      //console.log("Imagem salva _savepickDocument ->" + document);
    } catch (err) {
      console.log(err);
    }

    Keyboard.dismiss();
  }

  //UTILIZAÇÃO DE DOCUMENTOS
  async function _pickDocument() {
    let result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      copyToCacheDirectory: true,
    });
    setDocumentArray([...documentArray, result.uri]);
  }

  //SALVANDO A IMAGEM DEPOIS E CAPTURA-LA
  async function _savetakePicture() {
    try {
      await AsyncStorage.setItem("@image", image);
    } catch (err) {
      console.log(err);
    }

    Keyboard.dismiss();
  }

  // REMOVENDO A IMAGEM
  async function _removetakePicture(removeImage, imageKey) {
    const newImage = [...imageArray];
    const todoImage = imageArray.findIndex(
      (deleteImage) => deleteImage.image === imageKey
    );
    newImage.splice(todoImage, 1);
    setImageArray(newImage);
  }

  // REMOVENDO DOCUMENTO
  async function _removepickDocument(removeDocument, documentKey) {
    const newDocument = [...documentArray];
    const todoDocument = documentArray.findIndex(
      (deleteDocument) => deleteDocument.document === documentKey
    );
    newDocument.splice(todoDocument, 1);
    setDocumentArray(newDocument);
  }

  return (
    <Container>
      <Formik
        initialValues={{ name: "", email: "" }}
        onSubmit={_handleRegister}
        validationSchema={schema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            {/* {console.log(values)} */}
            <ScrollView>
              <Title primary>
                <Title>Cadastre</Title> sua empresa{"\n"} gratuitamente.
              </Title>

              <SubTitle primary>Localização da Empresa</SubTitle>
              <InputArea>
                <PickerContainer
                  selectedValue={type}
                  onValueChange={(type) => setType(type)}
                >
                  <Picker.Item label="Fisica" value="Fisica" />
                  <Picker.Item label="Juridica" value="Juridica" />
                </PickerContainer>
              </InputArea>

              {type === "Fisica" ? (
                <>
                  <InputArea>
                    <InputForm
                      value={values.name}
                      placeholder="Nome"
                      onChangeText={handleChange("name")}
                      onBlur={handleBlur("name")}
                    ></InputForm>
                    {errors.name && touched.name ? (
                      <Text style={{ color: "red" }}>{errors.name}</Text>
                    ) : null}
                  </InputArea>
                  <InputArea>
                    <InputForm
                      value={values.email}
                      placeholder="Email"
                      onChangeText={handleChange("email")}
                      placeholder="Email *"
                      onBlur={handleBlur("email")}
                    ></InputForm>
                    {errors.email && touched.email ? (
                      <Text>{errors.email}</Text>
                    ) : null}
                  </InputArea>

                  <InputArea>
                    <Register
                      type="submit"
                      onPress={() => setOpenCamera(!openCamera)}
                    >
                      <ButtonText>Adicionar Imagem</ButtonText>
                    </Register>
                  </InputArea>

                  {openCamera ? (
                    <InputArea>
                      <SafeAreaView
                        style={{
                          flex: 1,
                          width: "80%",
                          height: 300,
                          justifyContent: "center",
                          alignSelf: "center",
                          marginTop: 12,
                        }}
                      >
                        <Camera
                          style={{ flex: 1 }}
                          typeCamera={typeCamera}
                          ref={camRef}
                        >
                          <ButtonCameraReverse
                            onPress={() => {
                              setTypeCamera(
                                typeCamera === Camera.Constants.Type.front
                                  ? Camera.Constants.Type.back
                                  : Camera.Constants.Type.front
                              );
                            }}
                          >
                            <Ionicons
                              name="ios-camera-reverse"
                              size={24}
                              color="black"
                            />
                          </ButtonCameraReverse>

                          <ButtonCamera>
                            <Ionicons
                              name="camera"
                              size={24}
                              color="black"
                              onPress={() => _takePicture()}
                            />
                          </ButtonCamera>

                          {image && (
                            <Modal
                              animationType="slide"
                              transparent={false}
                              visible={open}
                            >
                              <View
                                style={{
                                  flex: 1,
                                  justifyContent: "center",
                                  alignItems: "center",
                                  margin: 12,
                                }}
                              >
                                <TouchableOpacity
                                  onPress={() => setOpen(false)}
                                >
                                  <Ionicons
                                    name="close"
                                    size={40}
                                    color="red"
                                  />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={_savetakePicture}>
                                  <Ionicons name="save" size={40} color="red" />
                                </TouchableOpacity>
                                <Image
                                  style={{ width: "100%", height: 300 }}
                                  source={{ uri: image }}
                                />
                              </View>
                            </Modal>
                          )}
                        </Camera>
                      </SafeAreaView>
                      <ViewFlatlist>
                        {imageArray.length > 0 && (
                          <>
                            <View style={{ height: 145, width: "100%" }}>
                              <FlatList
                                keyExtractor={(item, index) => item.image}
                                horizontal={true}
                                data={imageArray}
                                renderItem={({ item }) => (
                                  <>
                                    <TouchableOpacity
                                      onPress={_removetakePicture}
                                    >
                                      <Ionicons
                                        name="close"
                                        size={40}
                                        color="blue"
                                      />
                                    </TouchableOpacity>
                                    <Images source={{ uri: item }} />
                                  </>
                                )}
                              />
                            </View>
                          </>
                        )}
                      </ViewFlatlist>
                    </InputArea>
                  ) : null}

                  <InputArea>
                    <Register type="submit" onPress={_pickDocument}>
                      <ButtonText>Adicionar Arquivo</ButtonText>
                    </Register>
                  </InputArea>
                  {documentArray.length > 0 && (
                    <>
                      <View style={{ height: 145, width: "100%" }}>
                        <FlatList
                          horizontal={true}
                          keyExtractor={(item, index) => {
                            return item.id;
                          }}
                          data={documentArray}
                          renderItem={({ item }) => (
                            <>
                              <TouchableOpacity onPress={_removepickDocument}>
                                <Ionicons name="close" size={40} color="blue" />
                              </TouchableOpacity>

                              <Ionicons
                                name="clipboard"
                                size={50}
                                color="green"
                              />
                            </>
                          )}
                        />
                      </View>
                    </>
                  )}
                </>
              ) : type === "Juridica" ? (
                <></>
              ) : null}

              <Register onPress={handleSubmit} type="submit">
                <ButtonText>Cadastrar</ButtonText>
              </Register>
            </ScrollView>
          </>
        )}
      </Formik>
    </Container>
  );
};

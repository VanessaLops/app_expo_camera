import React, { useState, useEffect } from 'react';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker';
import { yupResolver } from '@hookform/resolvers/yup';
// import Constants from 'expo-constants';
import { Camera } from 'expo-camera';
import * as DocumentPicker from 'expo-document-picker';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from '../../components/Forms/Button';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Keyboard,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { InputForm } from '../../components/Forms/InputForm';

import api from '../../services/api';
import { ContainerModal } from '../../components/Modal';
import {
  Container,
  Title,
  SubTitle,
  InputArea,
  PickerContainer,
  ButtonCameraReverse,
  ButtonCamera,
  ViewFlatlist,
  Images,
  MaskInput,
} from './styles';

const schema = Yup.object({
  name: Yup.string().required('Nome é obrigatório'),
  email: Yup.string().email('Email inválido').required('Email requerido'),
  cpf: Yup.string().required('CPF obrigatório'),
});

interface DateProps {
  name: string;
  email: string;
  handleSubmit: () => void;
}

export const Account: React.FC<DateProps> = () => {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { navigate } = useNavigation<any>();
  const [typePeople, setTypePeople] = useState('Fisica');
  const [image, setImage] = useState(null);
  const [document, setDocument] = useState(null);
  const [images, setImages]: any = useState([]);
  const [documents, setDocuments] = useState<string[]>([]);

  const [open, setOpen] = useState<boolean>(false);

  const [cameraRef, setCameraRef]: any = useState(null);
  const [openCamera, setOpenCamera] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHaspermission] = useState<boolean | null>(null);

  //Carregar dados quando o aplicativo for iniciado
  useEffect(() => {
    const ImageLoad = async () => {
      try {
        const _savetakePicture = await AsyncStorage.getItem('@image');
        setImage((_savetakePicture: null) => _savetakePicture);
        return _savetakePicture;
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
        const _savepickDocument = await AsyncStorage.getItem(`@documents`);
        setDocument((_savepickDocument: null) => _savepickDocument);
        return _savepickDocument;
      } catch (err) {
        console.log(err);
      }
    };
    DocumentLoad();
    _savepickDocument();
  }, [document]);

  //Verifica se o aplicativo tem permissão
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHaspermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>Sem Acesso </Text>;
  }

  //FINALIZAR CADASTRO
  async function _handleRegister(values: any) {
    try {
      const response = api.post('/store', {
        name: values.name,
        email: values.email,
        cpf: values.cpf,
        cnpj: values.cnpj,
        typePeople: typePeople,
        documents: documents,
        images: images,
      });
      navigate('Confirmation', {
        title: 'Conta criada!',
        message: '',
        nextScreenRoute: 'SignIn',
      });
      return response;
    } catch (error) {
      console.log('error' + error);
    }
  }

  //TIRAR FOTO
  async function _takePicture() {
    if (cameraRef) {
      try {
        const { uri } = await cameraRef.takePictureAsync();
        setImage(uri);
        setImages([...images, uri]);
        setOpen(true);
      } catch (e) {
        console.log(e);
      }
    }
    return;
  }

  async function _savepickDocument() {
    try {
      await AsyncStorage.setItem('@documents', `${document}`);
    } catch (err) {
      console.log(err);
    }
    Keyboard.dismiss();
  }

  //UTILIZAÇÃO DE DOCUMENTOS
  async function _pickDocument() {
    let result: any = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
      copyToCacheDirectory: true,
    });
    setDocuments([...documents, result.uri]);
  }

  // REMOVENDO A IMAGEM
  async function _removetakePicture(imageKey) {
    const newImage = [...images];
    const todoImage = images.findIndex(deleteImage => deleteImage === imageKey);
    newImage.splice(todoImage, 1);
    setImages(newImage);
  }

  // REMOVENDO DOCUMENTO
  async function _removepickDocument(documentKey) {
    const newDocument = [...documents];
    const todoDocument = documents.findIndex(
      deleteDocument => deleteDocument === documentKey,
    );
    newDocument.splice(todoDocument, 1);
    setDocuments(newDocument);
  }

  return (
    <Container>
      <Formik
        initialValues={{ name: '', email: '', cpf: '', cnpj: '', image: '' }}
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
            <ScrollView showsVerticalScrollIndicator={false}>
              <Title primary>
                <Title>Cadastre</Title> sua empresa{'\n'} gratuitamente.
              </Title>

              <SubTitle primary>Localização da Empresa</SubTitle>
              <InputArea>
                <PickerContainer
                  selectedValue={typePeople}
                  onValueChange={typePeople => setTypePeople(typePeople)}
                >
                  <Picker.Item label="Fisica" value="Fisica" />
                  <Picker.Item label="Juridica" value="Juridica" />
                </PickerContainer>
              </InputArea>

              <InputArea>
                <InputForm
                  value={values.name}
                  placeholder="Nome"
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                ></InputForm>
                {errors.name && touched.name ? (
                  <Text style={{ color: 'red', left: 35 }}>{errors.name}</Text>
                ) : null}
              </InputArea>
              <InputArea>
                <InputForm
                  value={values.email}
                  onChangeText={handleChange('email')}
                  placeholder="Email *"
                  onBlur={handleBlur('email')}
                ></InputForm>
                {errors.email && touched.email ? (
                  <Text style={{ color: 'red', left: 35 }}>{errors.email}</Text>
                ) : null}
              </InputArea>
              {typePeople === 'Fisica' ? (
                <InputArea>
                  <MaskInput
                    type={'cpf'}
                    value={values.cpf}
                    placeholder="CPF*"
                    onChangeText={handleChange('cpf')}
                  />

                  {errors.cpf && touched.cpf ? (
                    <Text style={{ color: 'red', left: 35 }}>{errors.cpf}</Text>
                  ) : null}
                </InputArea>
              ) : typePeople === 'Juridica' ? (
                <InputArea>
                  <MaskInput
                    type={'cnpj'}
                    value={values.cnpj}
                    onChangeText={handleChange('cnpj')}
                    placeholder="CNPJ"
                  />

                  {errors.cnpj && touched.cnpj ? (
                    <Text style={{ color: 'red', left: 35 }}>
                      {errors.cnpj}
                    </Text>
                  ) : null}
                </InputArea>
              ) : null}

              <InputArea>
                <Button
                  title="Adicionar Imagem"
                  onPress={() => setOpenCamera(!openCamera)}
                />
              </InputArea>

              {openCamera ? (
                <InputArea>
                  <SafeAreaView
                    style={{
                      flex: 1,
                      width: '100%',
                      height: 300,
                      justifyContent: 'center',
                      alignSelf: 'center',
                      marginTop: 12,
                    }}
                  >
                    <Camera
                      style={{ flex: 1 }}
                      type={type}
                      ref={ref => setCameraRef(ref)}
                    >
                      <ButtonCameraReverse
                        onPress={() => {
                          setType(
                            type === Camera.Constants.Type.front
                              ? Camera.Constants.Type.back
                              : Camera.Constants.Type.front,
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
                        <ContainerModal
                          animationType="slide"
                          transparent={false}
                          visible={open}
                          onPress={() => setOpen(false)}
                          source={{ uri: image }}
                        ></ContainerModal>
                      )}
                    </Camera>
                  </SafeAreaView>
                  <ViewFlatlist>
                    {images.length > 0 && (
                      <>
                        <View
                          style={{
                            height: 142,
                            width: '100%',
                          }}
                        >
                          <FlatList
                            keyExtractor={(item, index) => item}
                            horizontal={true}
                            data={images}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => (
                              <>
                                <TouchableOpacity onPress={_removetakePicture}>
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
                <Button title="Adicionar Arquivo" onPress={_pickDocument} />
              </InputArea>
              {documents.length > 0 && (
                <>
                  <View style={{ height: 145, width: '100%' }}>
                    <FlatList
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      keyExtractor={(item, index) => {
                        return item;
                      }}
                      data={documents}
                      renderItem={({ item }) => (
                        <>
                          <TouchableOpacity onPress={_removepickDocument}>
                            <Ionicons name="close" size={40} color="blue" />
                          </TouchableOpacity>

                          <Ionicons name="clipboard" size={50} color="green" />
                        </>
                      )}
                    />
                  </View>
                </>
              )}

              <Button title="Cadastrar" onPress={handleSubmit} />
            </ScrollView>
          </>
        )}
      </Formik>
    </Container>
  );
};

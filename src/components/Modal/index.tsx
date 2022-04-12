import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import { Modal, Image, ImageURISource } from 'react-native';

interface ModalProps {
  animationType: string;
  transparent: boolean;
  visible: boolean;
  onPress: () => void;
  source: ImageURISource;
}

import { Container, Close } from './styles';

export const ContainerModal: React.FC<ModalProps> = ({
  animationType,
  transparent,
  visible,
  source,
  onPress,
  ...rest
}) => {
  return (
    <Modal animationType="slide" transparent={false} visible={visible}>
      <Container>
        <Close onPress={onPress}>
          <Ionicons name="close" size={40} color="red" />
        </Close>
        <Image style={{ width: '100%', height: 300 }} source={source} />
      </Container>
    </Modal>
  );
};

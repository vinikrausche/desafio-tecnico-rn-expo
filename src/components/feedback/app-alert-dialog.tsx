import {
  Button,
  ButtonText,
  Card,
  Heading,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import { Modal, Pressable, View } from 'react-native';

import type { AppAlertDialogProps } from '../../types/components/feedback/app-alert-dialog.types';
import { appAlertDialogStyles as styles } from './app-alert-dialog.styles';

export function AppAlertDialog({
  cancelLabel = 'Cancelar',
  confirmLabel = 'Fechar',
  isOpen,
  message,
  mode = 'notice',
  onClose,
  onConfirm,
  title,
  tone = 'info',
}: AppAlertDialogProps) {
  const isConfirmation = mode === 'confirm';

  function handleConfirm() {
    onConfirm?.();
    onClose();
  }

  function handleBackdropPress() {
    if (!isConfirmation) {
      onClose();
    }
  }

  return (
    <Modal
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
      transparent
      visible={isOpen}
    >
      <View style={styles.dialogRoot}>
        <Pressable onPress={handleBackdropPress} style={styles.backdrop} />

        <View style={styles.contentHost}>
          <Card style={styles.content}>
            <VStack style={styles.body}>
              <Heading style={styles.title}>{title}</Heading>
              <Text style={styles.description}>{message}</Text>
            </VStack>

            <View style={styles.actions}>
              {isConfirmation ? (
                <Button
                  action="secondary"
                  onPress={onClose}
                  style={styles.secondaryButton}
                  variant="outline"
                >
                  <ButtonText style={styles.secondaryButtonText}>
                    {cancelLabel}
                  </ButtonText>
                </Button>
              ) : null}

              <Button
                action={tone === 'error' ? 'negative' : 'primary'}
                onPress={handleConfirm}
                style={!isConfirmation ? styles.noticeButton : null}
              >
                <ButtonText style={styles.confirmButtonText}>
                  {confirmLabel}
                </ButtonText>
              </Button>
            </View>
          </Card>
        </View>
      </View>
    </Modal>
  );
}

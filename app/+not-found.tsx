import { Button, ButtonText, Card, Text, VStack } from '@gluestack-ui/themed';
import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ScreenShell } from '../src/components/layout/screen-shell';

export default function NotFoundScreen() {
  return (
    <ScreenShell eyebrow="404" title="Rota não encontrada">
      <Card style={styles.card}>
        <VStack style={styles.content}>
          <Text style={styles.text}>Caminho indisponível.</Text>

          <Link href="/" asChild>
            <Button style={styles.button}>
              <ButtonText style={styles.buttonText}>Ir para o início</ButtonText>
            </Button>
          </Link>
        </VStack>
      </Card>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#163020',
    minHeight: 52,
  },
  buttonText: {
    color: '#f8f4ec',
    fontSize: 15,
    fontWeight: '700',
  },
  card: {
    backgroundColor: '#ffffff',
    borderColor: '#d9d4ca',
    borderWidth: 1,
    padding: 18,
  },
  content: {
    gap: 16,
  },
  text: {
    color: '#495057',
    fontSize: 15,
    lineHeight: 22,
  },
});

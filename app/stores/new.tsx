import { Button, ButtonText, Card, Text, VStack } from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ScreenShell } from '../../src/components/layout/screen-shell';

export default function NewStoreScreen() {
  const router = useRouter();

  return (
    <ScreenShell
      eyebrow="Lojas"
      title="Rota de nova loja reservada"
      description="A estrutura de navegação já separa a tela de criação de loja, mas o formulário ainda não foi implementado."
    >
      <Card style={styles.card}>
        <VStack style={styles.content}>
          <Text style={styles.text}>
            Esta rota existe apenas para fechar a organização do projeto antes da
            implementação do CRUD.
          </Text>

          <Button style={styles.button} onPress={() => router.back()}>
            <ButtonText style={styles.buttonText}>Voltar</ButtonText>
          </Button>
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

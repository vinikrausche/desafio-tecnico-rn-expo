import { Button, ButtonText, Card, Text, VStack } from '@gluestack-ui/themed';
import { Link } from 'expo-router';

import { ScreenShell } from '../src/components/layout/screen-shell';
import { notFoundScreenStyles as styles } from '../src/features/not-found/not-found.styles';

export default function NotFoundScreen() {
  return (
    <ScreenShell eyebrow="404" title="Rota não encontrada">
      <Card style={styles.card}>
        <VStack style={styles.content}>
          <Text style={styles.text}>Caminho indisponível.</Text>

          <Link href="/" asChild>
            <Button style={styles.button}>
              <ButtonText style={styles.buttonText}>
                Ir para o início
              </ButtonText>
            </Button>
          </Link>
        </VStack>
      </Card>
    </ScreenShell>
  );
}

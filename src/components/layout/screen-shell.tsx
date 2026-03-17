import { Badge, BadgeText, Card, Heading, Text, VStack } from '@gluestack-ui/themed';
import { type PropsWithChildren } from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { screenShellStyles as styles } from './screen-shell.styles';

type ScreenShellProps = PropsWithChildren<{
  eyebrow: string;
  title: string;
  description: string;
}>;

export function ScreenShell({
  children,
  eyebrow,
  title,
  description,
}: ScreenShellProps) {
  return (
    <SafeAreaView edges={['bottom']} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <VStack style={styles.stack}>
          <Card style={styles.heroCard}>
            <VStack style={styles.heroContent}>
              <Badge style={styles.badge}>
                <BadgeText style={styles.badgeText}>{eyebrow}</BadgeText>
              </Badge>
              <Heading style={styles.title}>{title}</Heading>
              <Text style={styles.description}>{description}</Text>
            </VStack>
          </Card>

          {children}
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}

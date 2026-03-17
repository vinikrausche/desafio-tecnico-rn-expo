import { Badge, BadgeText, Card, Heading, Text, VStack } from '@gluestack-ui/themed';
import { type PropsWithChildren } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#dbe7c9',
    borderColor: '#adc178',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  badgeText: {
    color: '#2f4f1e',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  description: {
    color: '#d8dfd3',
    fontSize: 15,
    lineHeight: 22,
  },
  heroCard: {
    backgroundColor: '#163020',
    borderRadius: 24,
    padding: 24,
  },
  heroContent: {
    gap: 12,
  },
  safeArea: {
    backgroundColor: '#f5efe6',
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  stack: {
    gap: 16,
  },
  title: {
    color: '#f8f4ec',
    fontSize: 30,
    lineHeight: 36,
  },
});

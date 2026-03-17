import { Badge, BadgeText, Card, Heading, HStack, Text, VStack } from '@gluestack-ui/themed';

import type { StoreSummary } from '../store.types';
import { storeListCardStyles as styles } from './store-list-card.styles';

type StoreListCardProps = {
  store: StoreSummary;
};

function formatProductCount(value: number) {
  return value === 1 ? '1 produto' : `${value} produtos`;
}

// ! Store cards keep the list screen lean and consistent.
export function StoreListCard({ store }: StoreListCardProps) {
  return (
    <Card style={styles.card}>
      <VStack style={styles.content}>
        <HStack style={styles.header}>
          <VStack style={styles.headerCopy}>
            <Heading size="md" style={styles.name}>
              {store.name}
            </Heading>
            <Text style={styles.address}>{store.address}</Text>
          </VStack>

          <Badge style={styles.badge}>
            <BadgeText style={styles.badgeText}>{store.productCount}</BadgeText>
          </Badge>
        </HStack>

        <Text style={styles.meta}>{formatProductCount(store.productCount)}</Text>
      </VStack>
    </Card>
  );
}

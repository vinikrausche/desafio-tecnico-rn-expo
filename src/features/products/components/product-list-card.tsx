import { Badge, BadgeText, Card, Heading, HStack, Text, VStack } from '@gluestack-ui/themed';

import type { ProductSummary } from '../product.types';
import { productListCardStyles as styles } from './product-list-card.styles';

function formatCurrency(value: number) {
  const [integer, decimal] = value.toFixed(2).split('.');
  const normalizedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return `R$ ${normalizedInteger},${decimal}`;
}

type ProductListCardProps = {
  product: ProductSummary;
};

// ! Product cards keep the store-specific list screen focused and readable.
export function ProductListCard({ product }: ProductListCardProps) {
  return (
    <Card style={styles.card}>
      <VStack style={styles.content}>
        <Heading size="md" style={styles.title}>
          {product.name}
        </Heading>

        {product.storeName ? (
          <Text style={styles.storeName}>{product.storeName}</Text>
        ) : null}

        <HStack style={styles.footer}>
          <Badge style={styles.badge}>
            <BadgeText style={styles.badgeText}>{product.category}</BadgeText>
          </Badge>

          <Text style={styles.price}>{formatCurrency(product.price)}</Text>
        </HStack>
      </VStack>
    </Card>
  );
}

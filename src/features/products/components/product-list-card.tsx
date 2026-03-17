import {
  Badge,
  BadgeText,
  Button,
  ButtonText,
  Card,
  Heading,
  HStack,
  Text,
  VStack,
} from '@gluestack-ui/themed';

import type { ProductSummary } from '../product.types';
import { productListCardStyles as styles } from './product-list-card.styles';

function formatCurrency(value: number) {
  const [integer, decimal] = value.toFixed(2).split('.');
  const normalizedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return `R$ ${normalizedInteger},${decimal}`;
}

type ProductListCardProps = {
  onDelete: () => void;
  onEdit: () => void;
  product: ProductSummary;
};

// ! O card de produto deixa as acoes do item visiveis sem sair da lista.
export function ProductListCard({
  onDelete,
  onEdit,
  product,
}: ProductListCardProps) {
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

        <HStack style={styles.actionsRow}>
          <Button style={styles.secondaryActionButton} onPress={onEdit}>
            <ButtonText style={styles.secondaryActionButtonText}>
              Editar
            </ButtonText>
          </Button>

          <Button style={styles.dangerActionButton} onPress={onDelete}>
            <ButtonText style={styles.dangerActionButtonText}>
              Excluir
            </ButtonText>
          </Button>
        </HStack>
      </VStack>
    </Card>
  );
}

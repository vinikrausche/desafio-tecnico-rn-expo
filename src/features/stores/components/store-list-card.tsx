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

import type { StoreSummary } from '../store.types';
import { storeListCardStyles as styles } from './store-list-card.styles';

type StoreListCardProps = {
  onDelete: () => void;
  onEdit: () => void;
  onLinkProduct: () => void;
  onOpenProducts: () => void;
  store: StoreSummary;
};

function formatProductCount(value: number) {
  return value === 1 ? '1 produto' : `${value} produtos`;
}

// ! O card de loja concentra as acoes principais do modulo sem poluir a tela.
export function StoreListCard({
  onDelete,
  onEdit,
  onLinkProduct,
  onOpenProducts,
  store,
}: StoreListCardProps) {
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

        <HStack style={styles.actionsGrid}>
          <Button style={styles.primaryActionButton} onPress={onOpenProducts}>
            <ButtonText style={styles.primaryActionButtonText}>Produtos</ButtonText>
          </Button>

          <Button style={styles.secondaryActionButton} onPress={onLinkProduct}>
            <ButtonText style={styles.secondaryActionButtonText}>Vincular</ButtonText>
          </Button>

          <Button style={styles.secondaryActionButton} onPress={onEdit}>
            <ButtonText style={styles.secondaryActionButtonText}>Editar</ButtonText>
          </Button>

          <Button style={styles.dangerActionButton} onPress={onDelete}>
            <ButtonText style={styles.dangerActionButtonText}>Excluir</ButtonText>
          </Button>
        </HStack>
      </VStack>
    </Card>
  );
}

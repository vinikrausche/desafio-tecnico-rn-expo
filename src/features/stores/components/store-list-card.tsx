import {
  Badge,
  BadgeText,
  Button,
  Card,
  EditIcon,
  Heading,
  HStack,
  Icon,
  SearchIcon,
  Text,
  TrashIcon,
  VStack,
} from '@gluestack-ui/themed';

import type { StoreSummary } from '../store.types';
import { corporateTheme } from '../../../theme/corporate-theme';
import { storeListCardStyles as styles } from './store-list-card.styles';

type StoreListCardProps = {
  onDelete: () => void;
  onEdit: () => void;
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
          <Button
            accessibilityLabel={`Abrir produtos da loja ${store.name}`}
            style={styles.iconActionButton}
            onPress={onOpenProducts}
          >
            <Icon
              as={SearchIcon}
              color={corporateTheme.colors.brandStrong}
              style={styles.iconAction}
            />
          </Button>

          <Button
            accessibilityLabel={`Editar loja ${store.name}`}
            style={styles.iconActionButton}
            onPress={onEdit}
          >
            <Icon
              as={EditIcon}
              color={corporateTheme.colors.brandStrong}
              style={styles.iconAction}
            />
          </Button>

          <Button
            accessibilityLabel={`Excluir loja ${store.name}`}
            style={styles.iconDangerActionButton}
            onPress={onDelete}
          >
            <Icon
              as={TrashIcon}
              color={corporateTheme.colors.error}
              style={styles.iconAction}
            />
          </Button>
        </HStack>
      </VStack>
    </Card>
  );
}

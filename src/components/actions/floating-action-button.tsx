import { AddIcon, Fab, FabIcon } from '@gluestack-ui/themed';

import { floatingActionButtonStyles as styles } from './floating-action-button.styles';

type FloatingActionButtonProps = {
  accessibilityLabel: string;
  onPress: () => void;
};

// ! Shared FAB used by list screens that expose a primary create action.
export function FloatingActionButton({
  accessibilityLabel,
  onPress,
}: FloatingActionButtonProps) {
  return (
    <Fab
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      style={styles.fab}
    >
      <FabIcon as={AddIcon} style={styles.icon} />
    </Fab>
  );
}

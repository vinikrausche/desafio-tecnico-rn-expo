import { fireEvent, screen } from '@testing-library/react-native';

import { renderWithUi } from '../../../test-utils/render-with-ui';
import { StoreListCard } from './store-list-card';

describe('StoreListCard', () => {
  it('renderiza os dados da loja e dispara as acoes principais', () => {
    const onDelete = jest.fn();
    const onEdit = jest.fn();
    const onOpenProducts = jest.fn();

    renderWithUi(
      <StoreListCard
        onDelete={onDelete}
        onEdit={onEdit}
        onOpenProducts={onOpenProducts}
        store={{
          address: 'Avenida Brasil, 100',
          id: 'store-1',
          name: 'Loja Centro',
          productCount: 3,
        }}
      />,
    );

    expect(screen.getByText('Loja Centro')).toBeTruthy();
    expect(screen.getByText('Avenida Brasil, 100')).toBeTruthy();
    expect(screen.getByText('3 produtos')).toBeTruthy();

    fireEvent.press(
      screen.getByLabelText('Abrir produtos da loja Loja Centro'),
    );
    fireEvent.press(screen.getByLabelText('Editar loja Loja Centro'));
    fireEvent.press(screen.getByLabelText('Excluir loja Loja Centro'));

    expect(onOpenProducts).toHaveBeenCalledTimes(1);
    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledTimes(1);
  });
});

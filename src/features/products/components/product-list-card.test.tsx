import { fireEvent, screen } from '@testing-library/react-native';

import { renderWithUi } from '../../../test-utils/render-with-ui';
import { ProductListCard } from './product-list-card';

describe('ProductListCard', () => {
  it('renderiza os dados do produto e executa editar e excluir', () => {
    const onDelete = jest.fn();
    const onEdit = jest.fn();

    renderWithUi(
      <ProductListCard
        onDelete={onDelete}
        onEdit={onEdit}
        product={{
          category: 'Tecnologia',
          id: 'product-1',
          name: 'Notebook',
          price: 1999.9,
          storeId: 'store-1',
          storeName: 'Loja Centro',
        }}
      />,
    );

    expect(screen.getByText('Notebook')).toBeTruthy();
    expect(screen.getByText('Loja Centro')).toBeTruthy();
    expect(screen.getByText('Tecnologia')).toBeTruthy();
    expect(screen.getByText('R$ 1.999,90')).toBeTruthy();

    fireEvent.press(screen.getByText('Editar'));
    fireEvent.press(screen.getByText('Excluir'));

    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledTimes(1);
  });
});

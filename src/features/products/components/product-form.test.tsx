import { fireEvent, screen } from '@testing-library/react-native';

import { renderWithUi } from '../../../test-utils/render-with-ui';
import { ProductForm } from './product-form';

describe('ProductForm', () => {
  it('permite interagir com campos, loja e botoes principais', () => {
    const onCancel = jest.fn();
    const onFieldChange = jest.fn();
    const onStoreSelect = jest.fn();
    const onSubmit = jest.fn();

    renderWithUi(
      <ProductForm
        errors={{}}
        formValues={{
          category: '',
          name: '',
          price: '',
          storeId: '',
        }}
        isSubmitting={false}
        onCancel={onCancel}
        onFieldChange={onFieldChange}
        onStoreSelect={onStoreSelect}
        onSubmit={onSubmit}
        storeOptions={[
          {
            address: 'Avenida Brasil, 100',
            id: 'store-1',
            name: 'Loja Centro',
          },
          {
            address: 'Rua Sul, 45',
            id: 'store-2',
            name: 'Loja Sul',
          },
        ]}
      />,
    );

    fireEvent.changeText(
      screen.getByPlaceholderText('Nome do produto'),
      'Notebook',
    );
    fireEvent.changeText(
      screen.getByPlaceholderText('Categoria'),
      'Tecnologia',
    );
    fireEvent.changeText(screen.getByPlaceholderText('0,00'), '1999,90');
    fireEvent.press(screen.getByText('Loja Centro'));
    fireEvent.press(screen.getByText('Salvar produto'));
    fireEvent.press(screen.getByText('Cancelar'));

    expect(onFieldChange).toHaveBeenNthCalledWith(1, 'name', 'Notebook');
    expect(onFieldChange).toHaveBeenNthCalledWith(2, 'category', 'Tecnologia');
    expect(onFieldChange).toHaveBeenNthCalledWith(3, 'price', '1999,90');
    expect(onStoreSelect).toHaveBeenCalledWith('store-1');
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});

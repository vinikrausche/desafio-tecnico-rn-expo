import { fireEvent, screen } from '@testing-library/react-native';

import { renderWithUi } from '../../../test-utils/render-with-ui';
import { StoreForm } from './store-form';

describe('StoreForm', () => {
  it('permite preencher os campos e acionar salvar e cancelar', () => {
    const onCancel = jest.fn();
    const onFieldChange = jest.fn();
    const onSubmit = jest.fn();

    renderWithUi(
      <StoreForm
        errors={{}}
        formValues={{
          address: '',
          name: '',
        }}
        isSubmitting={false}
        onCancel={onCancel}
        onFieldChange={onFieldChange}
        onSubmit={onSubmit}
      />,
    );

    fireEvent.changeText(screen.getByPlaceholderText('Nome da loja'), 'Matriz');
    fireEvent.changeText(
      screen.getByPlaceholderText('Endereco da loja'),
      'Rua Central, 500',
    );
    fireEvent.press(screen.getByText('Salvar loja'));
    fireEvent.press(screen.getByText('Cancelar'));

    expect(onFieldChange).toHaveBeenNthCalledWith(1, 'name', 'Matriz');
    expect(onFieldChange).toHaveBeenNthCalledWith(
      2,
      'address',
      'Rua Central, 500',
    );
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});

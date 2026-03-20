import { fireEvent, screen } from '@testing-library/react-native';

import { renderWithUi } from '../../test-utils/render-with-ui';
import { FormTextInput } from './form-text-input';

describe('FormTextInput', () => {
  it('renderiza label, placeholder, valor e erro', () => {
    renderWithUi(
      <FormTextInput
        errorMessage="Campo obrigatorio"
        label="Nome"
        onChangeText={jest.fn()}
        placeholder="Digite o nome"
        value="Loja Centro"
      />,
    );

    expect(screen.getByText('Nome')).toBeTruthy();
    expect(screen.getByDisplayValue('Loja Centro')).toBeTruthy();
    expect(screen.getByText('Campo obrigatorio')).toBeTruthy();
  });

  it('dispara onChangeText ao editar o valor', () => {
    const onChangeText = jest.fn();

    renderWithUi(
      <FormTextInput
        label="Categoria"
        onChangeText={onChangeText}
        placeholder="Digite a categoria"
        value=""
      />,
    );

    fireEvent.changeText(
      screen.getByPlaceholderText('Digite a categoria'),
      'Tecnologia',
    );

    expect(onChangeText).toHaveBeenCalledWith('Tecnologia');
  });

  it('renderiza textarea reutilizavel para campos longos', () => {
    const onChangeText = jest.fn();

    renderWithUi(
      <FormTextInput
        helperMessage="Inclua rua, numero e bairro."
        label="Endereco"
        multiline
        onChangeText={onChangeText}
        placeholder="Digite o endereco"
        value=""
      />,
    );

    fireEvent.changeText(
      screen.getByPlaceholderText('Digite o endereco'),
      'Rua Central, 500',
    );

    expect(screen.getByText('Inclua rua, numero e bairro.')).toBeTruthy();
    expect(onChangeText).toHaveBeenCalledWith('Rua Central, 500');
  });
});

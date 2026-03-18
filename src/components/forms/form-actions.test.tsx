import { fireEvent, screen } from '@testing-library/react-native';

import { renderWithUi } from '../../test-utils/render-with-ui';
import { FormActions } from './form-actions';

describe('FormActions', () => {
  it('renderiza os labels padrao e dispara as acoes', () => {
    const onPrimaryPress = jest.fn();
    const onSecondaryPress = jest.fn();

    renderWithUi(
      <FormActions
        onPrimaryPress={onPrimaryPress}
        onSecondaryPress={onSecondaryPress}
        primaryLabel="Salvar produto"
      />,
    );

    fireEvent.press(screen.getByText('Salvar produto'));
    fireEvent.press(screen.getByText('Cancelar'));

    expect(onPrimaryPress).toHaveBeenCalledTimes(1);
    expect(onSecondaryPress).toHaveBeenCalledTimes(1);
  });

  it('permite sobrescrever o label da acao secundaria', () => {
    renderWithUi(
      <FormActions
        onPrimaryPress={jest.fn()}
        onSecondaryPress={jest.fn()}
        primaryLabel="Salvar loja"
        secondaryLabel="Voltar"
      />,
    );

    expect(screen.getByText('Voltar')).toBeTruthy();
  });
});

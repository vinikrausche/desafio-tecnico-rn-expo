import { Spinner, Text } from '@gluestack-ui/themed';
import { fireEvent, screen } from '@testing-library/react-native';

import { renderWithUi } from '../../test-utils/render-with-ui';
import { StateCard } from './state-card';

describe('StateCard', () => {
  it('renderiza titulo, mensagem, acao e children', () => {
    const onAction = jest.fn();

    renderWithUi(
      <StateCard
        actionLabel="Tentar novamente"
        message="Nao foi possivel carregar as lojas."
        onAction={onAction}
        title="Falha"
      >
        <Text>Detalhe adicional</Text>
      </StateCard>,
    );

    expect(screen.getByText('Falha')).toBeTruthy();
    expect(
      screen.getByText('Nao foi possivel carregar as lojas.'),
    ).toBeTruthy();
    expect(screen.getByText('Detalhe adicional')).toBeTruthy();

    fireEvent.press(screen.getByText('Tentar novamente'));

    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it('nao renderiza a acao quando o callback nao e informado', () => {
    renderWithUi(
      <StateCard actionLabel="Tentar novamente" message="Sem callback" />,
    );

    expect(screen.queryByText('Tentar novamente')).toBeNull();
  });

  it('renderiza spinner no modo de carregamento', () => {
    renderWithUi(
      <StateCard
        layout="row"
        message="Carregando produtos"
        showSpinner
        tone="soft"
      />,
    );

    expect(screen.getByText('Carregando produtos')).toBeTruthy();
    expect(screen.UNSAFE_getByType(Spinner)).toBeTruthy();
  });
});

import { screen } from '@testing-library/react-native';

import { renderWithUi } from '../../test-utils/render-with-ui';
import { AppToast } from './app-toast';

describe('AppToast', () => {
  it('renderiza titulo e descricao do toast', () => {
    renderWithUi(
      <AppToast
        id="toast-1"
        message="A loja foi salva com sucesso."
        title="Loja criada"
        tone="success"
      />,
    );

    expect(screen.getByText('Loja criada')).toBeTruthy();
    expect(screen.getByText('A loja foi salva com sucesso.')).toBeTruthy();
  });
});

import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndContext from './helpers/RenderWithRouter';
import fetch from '../../cypress/mocks/fetch';

describe('Teste do componente Details', () => {
  beforeEach(() => {
    global.fetch = jest.fn(fetch);
  });

  afterEach(jest.restoreAllMocks);

  it('Verifica se a pagina renderiza o conteudo de Meals', async () => {
    renderWithRouterAndContext(<App />, '/meals/52771');

    const recipeTitle = await screen.findByRole('heading', { name: /spicy arrabiata penne/i });
    expect(recipeTitle).toBeInTheDocument();
  });

  it('Verifica se a pagina renderiza o conteudo de Drinks', async () => {
    renderWithRouterAndContext(<App />, '/drinks/178319');

    const recipeTitle = await screen.findByRole('heading', { name: /aquamarine/i });
    expect(recipeTitle).toBeInTheDocument();
  });

  it('Verificar se a mock da Api esta sendo chamada', async () => {
    renderWithRouterAndContext(<App />, '/meals/52771');

    expect(global.fetch).toHaveBeenCalled();
  });
});

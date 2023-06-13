import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import App from '../App';
import renderWithRouterAndContext from './helpers/RenderWithRouter';

describe('Componente Recipes', () => {
  // it('Ao clicar no botão, o usuário é redirecionado para a página de perfil', async () => {
  //   const { history } = renderWithRouterAndContext(<App />, '/drinks');

  //   const profileButton = screen.getByRole('img', { name: /profile icon/i });
  //   userEvent.click(profileButton);

  //   await waitFor(() => {
  //     expect(history.location.pathname).toBe('/profile');
  //   });
  // });

  // it('Ao clicar no botão de pesquisa, uma textbox aparece na tela', async () => {
  //   const { history } = renderWithRouterAndContext(<App />, '/meals');

  //   const searchButton = screen.getByRole('img', {
  //     name: /search icon/i,
  //   });

  //   userEvent.click(searchButton);

  //   expect(screen.getByRole('textbox')).toBeInTheDocument();
  // });

  // it('Existem os cards de receitas na renderização', async () => {
  //   renderWithRouterAndContext(<App />, '/meals');

  //   await screen.findAllByTestId(/recipe-card/);
  //   const recipeCard = screen.getByTestId('0-recipe-card');
  //   expect(recipeCard).toBeInTheDocument();
  // });

  // it('Existem botões de categorias na renderização', async () => {
  //   renderWithRouterAndContext(<App />, '/drinks');

  //   await screen.findAllByRole('button', { name: /ordinary drink/i });
  //   const categoryButton = screen.getByRole('button', { name: /ordinary drink/i });
  //   expect(categoryButton).toBeInTheDocument();
  // });

  it('Existem 12 cards renderizados inicialmente no endpoint /drinks', async () => {
    renderWithRouterAndContext(<App />, '/drinks');

    const allButton = screen.getByRole('button', {
      name: /all/i,
    });

    userEvent.click(allButton);

    await screen.findAllByTestId(/recipe-card/);
    const recipeCards = screen.getAllByTestId(/recipe-card/);
    expect(recipeCards).toHaveLength(12);
  });

  it('Existem 12 cards renderizados inicialmente no endpoint /meals', async () => {
    renderWithRouterAndContext(<App />, '/meals');

    const allButton = screen.getByRole('button', {
      name: /all/i,
    });

    userEvent.click(allButton);

    await screen.findAllByTestId(/recipe-card/);
    const recipeCards = screen.getAllByTestId(/recipe-card/);
    expect(recipeCards).toHaveLength(12);
  });

  it('Ao clicar nos botões de categorias, apenas os drinks relativos à aquela categoria são renderizados ', async () => {
    renderWithRouterAndContext(<App />, '/drinks');

    await screen.findAllByRole('button', { name: /ordinary drink/i });
    const categoryButton = screen.getByRole('button', { name: /ordinary drink/i });

    userEvent.click(categoryButton);

    const drinkCategory = await screen.findByText(/mile long island iced tea/i);

    expect(drinkCategory).toBeInTheDocument();

    userEvent.click(categoryButton);

    const allDrinks = await screen.findByText(/gg/i);

    expect(allDrinks).toBeInTheDocument();
  });

  it('Ao clicar nos botões de categorias, apenas as meals relativos à aquela categoria são renderizados ', async () => {
    renderWithRouterAndContext(<App />, '/meals');

    await screen.findByRole('button', {
      name: /beef/i,
    });
    const categoryButton = screen.getByRole('button', {
      name: /beef/i,
    });

    userEvent.click(categoryButton);

    const mealsCategory = screen.findByText(/beef and mustard pie/i);

    expect(mealsCategory).toBeInTheDocument();
  });

  it('Ao clicar nos cards no /meals, o usuário é redirecionado para os detalhes daquela receita', async () => {
    const history = createMemoryHistory();
    renderWithRouterAndContext(<App />, '/meals', history);

    const cardButton = await screen.findByRole('img', {
      name: /corba/i,
    });

    userEvent.click(cardButton);

    expect(history.location.pathname).toEqual('/meals/52977');
  });

  it('Ao clicar nos cards no /drinks, o usuário é redirecionado para os detalhes daquela receita', async () => {
    const { history } = renderWithRouterAndContext(<App />, '/drinks');

    const cardButton = await screen.findByTestId('0-card-img');

    userEvent.click(cardButton);

    await waitFor(() => expect(history.location.pathname).toEqual('/drinks/15997'));
  });
});

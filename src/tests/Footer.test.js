import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from '../App';

describe('Componente Footer', () => {
  it('Existem os ícones de drinks e refeições no componente', () => {
    render(<App />);

    const mealIcon = screen.getByRole('img', {
      name: /meal icon/i,
    });

    expect(mealIcon).toBeInTheDocument();

    const drinksIcon = screen.getByRole('img', {
      name: /drink icon/i,
    });

    expect(drinksIcon).toBeInTheDocument();
  });

  it('Os ícones de drinks e refeições no componente levam para suas respectivas páginas', async () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const mealBtn = screen.getByTestId('meals-bottom-btn');

    userEvent.click(mealBtn);

    expect(history.location.pathname).toBe('/meals');

    const drinksBtn = screen.getByTestId('drinks-bottom-btn');

    userEvent.click(drinksBtn);

    expect(history.location.pathname).toBe('/drinks');
  });
});

import React from 'react';
import { fetchDrinks } from '../services/fetchApi';

export default function Login() {
  console.log(fetchDrinks('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='));
  return (
    <div>
      <form>
        <label htmlFor="email">
          Email
          <input
            type="text"
            name="email"
            data-testid="email-input"
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            data-testid="password-input"
          />
        </label>
        <button
          type="button"
          data-testid="login-submit-btn"
        >
          Enter
        </button>
      </form>
    </div>
  );
}

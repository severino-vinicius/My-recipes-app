import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const testEmail = regex.test(email);
  const SIX = 6;
  const history = useHistory();

  const handleEmail = ({ target: { value } }) => {
    setEmail(value);
  };

  const handlePassword = ({ target: { value } }) => {
    setPassword(value);
  };

  const saveUser = (event) => {
    event.preventDefault();
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };

  return (
    <div>
      <form>
        <label htmlFor="email">
          Email
          <input
            type="text"
            name="email"
            data-testid="email-input"
            onChange={ handleEmail }
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            data-testid="password-input"
            onChange={ handlePassword }
          />
        </label>
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ !(password.length > SIX && testEmail) }
          onClick={ saveUser }
        >
          Enter
        </button>
      </form>
    </div>
  );
}

import React from 'react';

export default function Login() {
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

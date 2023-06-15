import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Profile() {
  return (
    <>
      <Header pageTitle="Profile" showSearch={ false } showIcon />
      <Footer />
      <div>
        <input type="email" data-testid="profile-email"></input>
        <button data-testid="profile-done-btn">Done Recipes</button>
        <button data-testid="profile-favorite-btn">Favorite Recipes</button>
        <button data-testid="profile-logout-btn">Logout</button>
      </div>
    </>
  );
}

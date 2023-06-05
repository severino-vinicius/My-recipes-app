import React from 'react';
import Header from './Header';

export default function FavoriteRecipes() {
  return (
    <>
      <Header pageTitle="Favorite Recipes" showSearch={ false } showIcon />
      <div>Favorite Recipes</div>
    </>
  );
}

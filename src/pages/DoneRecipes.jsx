import React from 'react';
import Header from '../components/Header';

export default function DoneRecipes() {
  return (
    <>
      <Header pageTitle="Done Recipes" showSearch={ false } ShowIcon />
      <div>
        <button data-testid="filter-by-all-btn">All</button>
        <button data-testid="filter-by-meal-btn">Meals</button>
        <button data-testid="filter-by-drink-btn">Drinks</button>
        <img
          data-testid={ `${index}-horizontal-image` }
          src="recipe-image.jpg"
          alt="Recipe"
        />
        <p data-testid={ `${index}-horizontal-top-text` }>Category</p>
        <p data-testid={ `${index}-horizontal-name` }>Name</p>
        <p data-testid={ `${index}-horizontal-done-date` }>doneDate</p>
        <button data-testid={ `${index}-horizontal-share-btn` }>shareBtn</button>
      </div>
    </>
  );
}

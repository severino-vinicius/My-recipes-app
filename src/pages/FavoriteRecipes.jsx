import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Header from '../components/Header';
import ShareIcon from '../images/shareIcon.svg';
import BlackHeartIcon from '../images/blackHeartIcon.svg';

export default function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

    setFavoriteRecipes(favRecipes);
  }, []);

  return (
    <>
      <Header pageTitle="Favorite Recipes" showSearch={ false } showIcon />
      <div className="favButtons">
        <span data-testid="filter-by-all-btn">All</span>
        <span data-testid="filter-by-meal-btn">Food</span>
        <span data-testid="filter-by-drink-btn">Drinks</span>
      </div>
      {favoriteRecipes.map((recipe, index) => (
        <div key={ index } className="favItem">
          <img
            alt={ recipe.name }
            data-testid={ `${index}-horizontal-image` }
            src={ recipe.image }
          />
          <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
          <p data-testid={ `${index}-horizontal-top-text` }>
            {`${recipe.nationality} - ${recipe.category}`}
          </p>
          <Button>
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              alt="share"
              src={ ShareIcon }
            />
          </Button>
          <Button>
            <img
              data-testid={ `${index}-horizontal-favorite-btn` }
              alt="favorite icon"
              src={ BlackHeartIcon }
            />
          </Button>
        </div>
      ))}
    </>
  );
}

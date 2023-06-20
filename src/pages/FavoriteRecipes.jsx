import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShare } from '@fortawesome/free-solid-svg-icons';
import Header from '../components/Header';
import ShareIcon from '../images/shareIcon.svg';
import '../css/FavoriteRecipe.css';

export default function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setFavoriteRecipes(favRecipes);
  }, []);

  const removeFavorite = (removeId) => {
    const newLocalStorage = favoriteRecipes.filter((recipe) => recipe.id !== removeId);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newLocalStorage));
    setFavoriteRecipes(newLocalStorage);
  };

  const handleClickCard = (type, id) => {
    if (type === 'drink') {
      history.push(`/drinks/${id}`);
    } else {
      history.push(`/meals/${id}`);
    }
  };

  return (
    <>
      <Header pageTitle="Favorite Recipes" showSearch={ false } showIcon />
      <div className="recipe-container-favorite">

        <div className="category-conteiner">
          <button type="button" className="category-btn-favorite">All</button>
          <button type="button" className="category-btn-favorite">Food</button>
          <button type="button" className="category-btn-favorite">Drinks</button>
        </div>
        <div className="recipe-list-favorite">
          {favoriteRecipes.map((recipe, index) => (
            <div key={ index } className="recipeCard-favorite">
              <button
                className="img-to-details-favorite"
                type="button"
                onClick={ () => handleClickCard(recipe.type, recipe.id) }
              >
                <img
                  alt={ recipe.name }
                  className="favorite-img"
                  data-testid={ `${index}-horizontal-image` }
                  src={ recipe.image }
                />
                <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
              </button>
              <p data-testid={ `${index}-horizontal-top-text` }>
                {`${recipe.nationality} - ${recipe.category}`}
              </p>
              <div className="media-container">
                <button type="button" className="favorite-item-remove">
                  <FontAwesomeIcon icon={ faShare } />
                </button>
                <button
                  type="button"
                  className="favorite-item-remove"
                  onClick={ () => removeFavorite(recipe.id) }
                >
                  <FontAwesomeIcon
                    icon={ faHeart }
                    color="red"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

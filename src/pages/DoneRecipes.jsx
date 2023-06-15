import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

export default function DoneRecipes() {
  const [responseLS, setResponseLS] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [shareBtn, setShareBtn] = useState('');
  const history = useHistory();

  useEffect(() => {
    const recive = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    if (!recive) localStorage.setItem('doneRecipes', JSON.stringify(objeto));
    setResponseLS(recive);
    setFilteredRecipes(recive);
  }, []);

  const filterRecipes = (type) => {
    if (type === 'Meals') {
      const filtered = responseLS.filter((recipe) => recipe.type === 'meal');
      setFilteredRecipes(filtered);
    } else if (type === 'Drinks') {
      const filtered = responseLS.filter((recipe) => recipe.type === 'drink');
      setFilteredRecipes(filtered);
    } else {
      setFilteredRecipes(responseLS);
    }
  };

  const handleShare = (type, id) => {
    const timeOut = 2000;
    if (type === 'meal') {
      const pathUrl = `${window.location.origin}/meals/${id}`;
      navigator.clipboard.writeText(pathUrl);
      setShareBtn(true);
      setTimeout(() => {
        setShareBtn(false);
      }, timeOut);
    } if (type === 'drink') {
      const pathUrl = `${window.location.origin}/drinks/${id}`;
      navigator.clipboard.writeText(pathUrl);
      setShareBtn(true);
      setTimeout(() => {
        setShareBtn(false);
      }, timeOut);
    }
  };

  const recipeDetails = (type, id) => {
    if (type === 'drink') {
      history.push(`/drinks/${id}`);
    } else {
      history.push(`/meals/${id}`);
    }
  };

  return (
    <>
      <Header pageTitle="Done Recipes" showSearch={ false } showIcon />
      <div>
        <button data-testid="filter-by-all-btn" onClick={ () => filterRecipes('All') }>
          All
        </button>
        <button data-testid="filter-by-meal-btn" onClick={ () => filterRecipes('Meals') }>
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
          onClick={ () => filterRecipes('Drinks') }
        >
          Drinks
        </button>
      </div>

      {filteredRecipes.map((recipe, index) => (
        <div key={ recipe.id }>
          <button type="button" onClick={ () => recipeDetails(recipe.type, recipe.id) }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              width={ 250 }
              height={ 200 }
              alt="Recipe"
            />
          </button>
          <p data-testid={ `${index}-horizontal-top-text` }>
            {recipe.type === 'meal'
              ? `${recipe.nationality} - ${recipe.category}`
              : recipe.alcoholicOrNot}
          </p>
          <button type="button" onClick={ () => recipeDetails(recipe.type, recipe.id) }>
            <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
          </button>
          <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
          {recipe.tags
            .map((tag) => (
              <p data-testid={ `${index}-${tag}-horizontal-tag` } key={ tag }>
                {tag}
              </p>
            ))
            .slice(0, 2)}

          <button
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            onClick={ () => handleShare(recipe.type, recipe.id) }
          >
            <img alt="shareBTn" src={ shareIcon } />
          </button>
          { shareBtn && <span>Link copied!</span> }
        </div>
      ))}
    </>
  );
}

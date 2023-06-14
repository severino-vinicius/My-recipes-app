import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

export default function DoneRecipes() {
  const [responseLS, setResponseLS] = useState([]);

  const getLocalStorage = () => {
    const recive = JSON.parse(localStorage.getItem('doneRecipes'));
    setResponseLS(recive);
  };

  useEffect(() => {
    const objeto = [
      {
        id: 'id-da-receita',
        type: 'meal',
        nationality: 'nacionalidade-da-receita-ou-texto-vazio',
        category: 'categoria-da-receita-ou-texto-vazio',
        alcoholicOrNot: 'alcoholic-ou-non-alcoholic-ou-texto-vazio',
        name: 'nome-da-receita',
        image: 'imagem-da-receita',
        doneDate: 'quando-a-receita-foi-concluida',
        tags: 'array-de-tags-da-receita-ou-array-vazio',
      },
    ];
    localStorage.setItem('doneRecipes', JSON.stringify(objeto));
    getLocalStorage();
  }, []);

  return (
    <>
      <Header pageTitle="Done Recipes" showSearch={ false } showIcon />
      <div>
        <button data-testid="filter-by-all-btn">All</button>
        <button data-testid="filter-by-meal-btn">Meals</button>
        <button data-testid="filter-by-drink-btn">Drinks</button>
      </div>

      {responseLS
        .filter((recipe) => recipe.type === 'meal')
        .map((recipe, index) => (
          <div key={ recipe.id }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src="recipe-image.jpg"
              alt="Recipe"
            />
            <p data-testid={ `${index}-horizontal-top-text` }>
              {recipe.category}
              -
              {recipe.nationality}
            </p>
            <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
            <p data-testid={ `${index}-horizontal-done-date` }>{recipe.category}</p>
            <button data-testid={ `${index}-horizontal-share-btn` }>
              {shareIcon}
              Compartilhar
            </button>
          </div>
        ))}
    </>
  );
}

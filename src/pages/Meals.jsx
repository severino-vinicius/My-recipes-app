import React, { useContext } from 'react';
import Header from '../components/Header';
import MealIcon from '../images/mealIcon.svg';
import RecipesContext from '../context/recipesContext';
import './Meals.css';

const MAX_DRINKS_ON_PAGE = 12;

export default function Meals() {
  const { recipes } = useContext(RecipesContext);

  return (
    <>
      <Header
        pageTitle="Meals"
        showSearch
        showIcon
        pageIcon={ MealIcon }
        pageType="meals"
      />
      <div>Meals Page</div>
      {recipes.map((recipe, index) => {
        if (index >= MAX_DRINKS_ON_PAGE) {
          return null;
        }

        return (
          <div className="mealCard" key={ index } data-testid={ `${index}-recipe-card` }>
            <img
              src={ recipe.strMealThumb }
              alt={ recipe.strMeal }
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{recipe.strMeal}</p>
          </div>
        );
      })}
    </>
  );
}

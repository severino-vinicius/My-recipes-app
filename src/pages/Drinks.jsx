import React, { useContext } from 'react';
import Header from '../components/Header';
import DrinkIcon from '../images/drinkIcon.svg';
import Footer from '../components/Footer';
import './Drinks.css';
import RecipesContext from '../context/recipesContext';

const MAX_DRINKS_ON_PAGE = 12;

export default function Drinks() {
  const { recipes } = useContext(RecipesContext);

  return (
    <>
      <Header
        pageTitle="Drinks"
        showSearch
        showIcon
        pageIcon={ DrinkIcon }
        pageType="drinks"
      />
      <div>Drinks</div>
      {recipes.map((recipe, index) => {
        if (index >= MAX_DRINKS_ON_PAGE) {
          return null;
        }
        return (
          <div className="drinkCard" key={ index } data-testid={ `${index}-recipe-card` }>
            <img
              src={ recipe.strDrinkThumb }
              alt={ recipe.strDrink }
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{recipe.strDrink}</p>
          </div>
        );
      })}
      <Footer />
    </>
  );
}

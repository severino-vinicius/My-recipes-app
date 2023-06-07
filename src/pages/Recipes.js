import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { fetchDrinks, fetchMeals } from '../services/fetchApi';

const MAX_RECIPES_ON_PAGE = 12;

export default function Recipes() {
  const [recipes, setRecipes] = useState([])
  const history = useHistory();
  
  useEffect(() => {
    const callFetch = async () => {
      if (history.location.pathname === '/meals') {
        const mealsAPI = await fetchMeals('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        setRecipes(mealsAPI);
      } else if (history.location.pathname === '/drinks') {
        const drinksAPI = await fetchDrinks('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        setRecipes(drinksAPI);
      }
    };

    callFetch();
  }, [history.location.pathname]);

  return (
    <div>
    {recipes.map((recipe, index) => {
       if (index >= MAX_RECIPES_ON_PAGE) {
        return null;
      }
     return (
      <div key={index} data-testid={`${index}-recipe-card`}>
        <p data-testid={`${index}-card-name`}>{history.location.pathname === '/drinks' ? recipe.strDrink : recipe.strMeal}</p>
        <img data-testid={`${index}-card-img`} src={history.location.pathname === '/drinks' ? recipe.strDrinkThumb : recipe.strMealThumb}/>
      </div>
    )})}
    </div>
  )
}

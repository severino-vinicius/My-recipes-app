import PropTypes from 'prop-types';
import React, { useCallback, useMemo, useState } from 'react';
import RecipesContext from './recipesContext';
import { fetchDrinks, fetchMeals } from '../services/fetchApi';

function RecipesProvider({ children }) {
  const [recipes, setRecipes] = useState([]);

  const fetch = useCallback(async (type, url) => {
    if (type === 'meals') {
      const dataApi = await fetchMeals(url);
      setRecipes(dataApi);
    } else {
      const dataApi = await fetchDrinks(url);
      setRecipes(dataApi);
      console.log(recipes);
    }
  }, [recipes]);

  const fetchMealRecipes = useCallback(async (searchType, searchParam) => {
    switch (searchType) {
    case 'ingredient':
      await fetch(
        'meals',
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchParam}`,
      );
      break;
    case 'name':
      await fetch(
        'meals',
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchParam}`,
      );
      break;
    case 'first-letter':
      if (searchParam.length > 1) {
        global.alert('Your search must have only 1 (one) character');
        return;
      }

      await fetch(
        'meals',
        `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchParam}`,
      );
      break;
    default:
      console.log('invalid');
    }
  }, [fetch]);

  const fetchDrinkRecipes = useCallback(async (searchType, searchParam) => {
    switch (searchType) {
    case 'ingredient':
      await fetch(
        'drinks',
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchParam}`,
      );
      break;
    case 'name':
      await fetch(
        'drinks',
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchParam}`,
      );
      break;
    case 'first-letter':
      if (searchParam.length > 1) {
        global.alert('Your search must have only 1 (one) character');
        return;
      }

      await fetch(
        'drinks',
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchParam}`,
      );
      break;
    default:
      console.log('invalid');
    }
  }, [fetch]);

  const context = useMemo(() => ({
    fetchMealRecipes,
    fetchDrinkRecipes,
  }), [fetchMealRecipes, fetchDrinkRecipes]);

  return (
    <RecipesContext.Provider value={ context }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;

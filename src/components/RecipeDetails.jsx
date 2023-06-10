import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchMealsDetails,
  fetchDrinksDetails,
  fetchDrinks,
  fetchMeals } from '../services/fetchApi';
import '../css/Details.css';

function RecipeDetails() {
  // Estados que salvam a resposta da API
  const [responseMealApi, setResponseMealApi] = useState('');
  const [responseDrinksApi, setResponseDrinksApi] = useState('');
  const [recomendedDrinks, setRecomendedDrinks] = useState('');
  const [recomendedMeals, setRecomendedMeals] = useState('');
  const history = useHistory();

  // Função que chama a Api de acordo com qual path ela se encontra e depois salva no estado local
  const getDetailsData = async () => {
    const pathUrl = history.location.pathname;
    const [, prefix, id] = pathUrl.split('/');

    if (prefix === 'meals') {
      const mealData = await fetchMealsDetails(id);
      const recomendedDrinksApi = await fetchDrinks('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      setResponseMealApi(mealData);
      setRecomendedDrinks(recomendedDrinksApi);
    }
    const drinkData = await fetchDrinksDetails(id);
    const recomendedMealsApi = await fetchMeals('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    setResponseDrinksApi(drinkData);
    setRecomendedMeals(recomendedMealsApi);
  };

  // Inicia o componente chamando a função q dispara a chamada da API
  useEffect(() => {
    getDetailsData();
  }, []);

  // Função que faz uma contagem ate 20 para renderizar todos os ingredientes
  const renderIngredients = (ingredientList) => {
    const ingredients = [];
    const limitIngred = 20;
    for (let i = 0; i <= limitIngred; i += 1) {
      const ingredientKey = `strIngredient${i}`;
      const measureKey = `strMeasure${i}`;
      if (ingredientList[0][ingredientKey]) {
        ingredients.push(
          <li key={ i } data-testid={ `${i - 1}-ingredient-name-and-measure` }>
            {`${ingredientList[0][ingredientKey]} ${ingredientList[0][measureKey]}`}
          </li>,
        );
      }
    }
    return ingredients;
  };

  const embedVideo = (linkToEmbed) => {
    const videoUrl = linkToEmbed.replace('watch?v=', 'embed/');
    return videoUrl;
  };

  // Filtro usado no map das recomendações, limita a renderização ate 6 itens;
  const filterRecomendedCard = (element, index) => {
    const maxCard = 6;
    return index < maxCard && element;
  };

  if (responseMealApi.length > 0) {
    return (
      <div>
        {
          responseMealApi && responseMealApi.map((meal) => (
            <div key={ meal.idMeal }>
              <img
                className="imgRecipeDetail"
                data-testid="recipe-photo"
                src={ meal.strMealThumb }
                alt={ meal.strMeal }
              />

              <h4 data-testid="recipe-title">{meal.strMeal}</h4>

              <p data-testid="recipe-category">{meal.strCategory}</p>

              <ul>
                {renderIngredients(responseMealApi)}
              </ul>

              <p data-testid="instructions">
                { meal.strInstructions }
              </p>

              <iframe
                width="560"
                height="315"
                src={ embedVideo(meal.strYoutube) }
                title="YouTube video player"
                allow="accelerometer;
                clipboard-write;
                encrypted-media;
                gyroscope;
                picture-in-picture;
                web-share"
                allowFullScreen
                data-testid="video"
              />
            </div>
          ))
        }
        <div className="RecomendedCard">
          {
            recomendedDrinks.filter(filterRecomendedCard).map((recipe, index) => (
              <div
                key={ recipe.idDrink }
                data-testid={ `${index}-recommendation-card` }
              >
                <img
                  className="imgRecomendCard"
                  src={ recipe.strDrinkThumb }
                  alt={ recipe.strDrink }
                />
                <h4 data-testid={ `${index}-recommendation-title` }>
                  {recipe.strDrink}
                </h4>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
  if (responseDrinksApi.length > 0) {
    return (
      <div>
        {
          responseDrinksApi && responseDrinksApi.map((drink) => (
            <div key={ drink.idDrink }>
              <img
                className="imgRecipeDetail"
                data-testid="recipe-photo"
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
              />

              <h4 data-testid="recipe-title">{drink.strDrink}</h4>

              <p data-testid="recipe-category">{drink.strAlcoholic}</p>

              <ul>
                {renderIngredients(responseDrinksApi)}
              </ul>

              <p data-testid="instructions">
                { drink.strInstructions }
              </p>
            </div>
          ))
        }
        <div className="RecomendedCard">
          {
            recomendedMeals.filter(filterRecomendedCard).map((recipe, index) => (
              <div
                key={ recipe.idMeal }
                data-testid={ `${index}-recommendation-card` }
              >
                <img
                  className="imgRecomendCard"
                  src={ recipe.strMealThumb }
                  alt={ recipe.strMeal }
                />
                <h4 data-testid={ `${index}-recommendation-title` }>{recipe.strMeal}</h4>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default RecipeDetails;

import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import BtnStartRecipe from './BtnStartRecipe';
import ShareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../css/Details.css';
import { fetchMealsDetails, fetchDrinksDetails,
  fetchDrinks, fetchMeals } from '../services/fetchApi';

function RecipeDetails() {
  const [responseMealApi, setResponseMealApi] = useState([]); // Estado que salva a resposta da API
  const [responseDrinksApi, setResponseDrinksApi] = useState(''); // Estado que salva a resposta da API
  const [recomendedDrinks, setRecomendedDrinks] = useState(''); // Estado que salva a resposta da API
  const [recomendedMeals, setRecomendedMeals] = useState(''); // Estado que salva a resposta da API
  const [doneRecipe, setDoneRecipe] = useState(''); // Estado que salva as informações do LocalStorage
  const [inProgressRecipe, setInProgressRecipe] = useState(''); // Estado que salva as informações do LocalStorage
  const [shareBtn, setShareBtn] = useState(''); // Estado que trabalha com a mensagem do clipBoard
  const [isFavorite, setIsFavorite] = useState(false);
  const history = useHistory();

  const getDetailsData = async () => { // Função que chama a Api de acordo com qual path ela se encontra e depois salva no estado local
    const pathUrl = history.location.pathname;
    const [, prefix, id] = pathUrl.split('/');

    if (prefix === 'meals') { // Caso seja o prefixo meals faz as seguintes chamadas pra API
      const mealData = await fetchMealsDetails(id);
      const recomendedDrinksApi = await fetchDrinks('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      setResponseMealApi(mealData);
      setRecomendedDrinks(recomendedDrinksApi);
      return;
    }
    if (prefix === 'drinks') {
    // Caso seja o prefixo Drinks faz as seguintes chamadas pra API
      const drinkData = await fetchDrinksDetails(id);
      const recomendedMealsApi = await fetchMeals('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      setResponseDrinksApi(drinkData);
      setRecomendedMeals(recomendedMealsApi);
    }
  };

  const getLocalStorage = () => { // Verifica o LocalStorage e o define como um estado local
    const dataDoneRecipeLS = JSON.parse(localStorage.getItem('doneRecipes'));
    const dataInProgressRecipeLS = JSON.parse(localStorage.getItem('inProgressRecipes'));
    setDoneRecipe(dataDoneRecipeLS);
    setInProgressRecipe(dataInProgressRecipeLS);
  };

  const verifyIsfavorite = () => { // Verifica se no LocalStorage a Receita se encontra como favorita
    const dataLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const pathUrl = history.location.pathname;
    const [,, id] = pathUrl.split('/');

    const verifyIds = dataLocalStorage.some((recipe) => recipe.id === id);
    setIsFavorite(verifyIds);
  };

  useEffect(() => { // Inicia o componente chamando a função q dispara a chamada da API
    getDetailsData();
    getLocalStorage();
    verifyIsfavorite();
  }, []);

  const renderIngredients = (ingredientList) => { // Função que faz uma contagem ate 20 para renderizar todos os ingredientes
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

  const embedVideo = (linkToEmbed) => { // Função que substitui o trecho, 'watch?v=' por 'embed/' no link do youtube que retorna da API
    const videoUrl = linkToEmbed.replace('watch?v=', 'embed/');
    return videoUrl;
  };

  const filterRecomendedCard = (element, index) => { // Filtro usado no map das recomendações, limita a renderização ate 6 itens;
    const maxCard = 6;
    return index < maxCard && element;
  };

  const handleShare = () => {
    const timeOut = 2000;
    const pathUrl = window.location.href;
    // clipboardCopy(pathUrl); // Ultiliza o clipBoard pra salvar o pathUrl no Ctrol + c
    navigator.clipboard.writeText(pathUrl);
    setShareBtn(true); // Seta o estado shareBtn para true assim a renderização condicional do span
    setTimeout(() => { // passa a ser executada, depois de 2 segundos é setado pra false novamente para o Span sumir
      setShareBtn(false);
    }, timeOut);
  };

  const handleFavorite = () => { // Executada ao clicar no botão favorito
    const dataLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const pathUrl = history.location.pathname;
    const [, prefix, id] = pathUrl.split('/'); // Pega o pathName e desestrutura para usar suas consts

    const favorite = { // Objeto com ternario dependendo do prefixo o qual vem a pagina
      id: prefix === 'meals' ? responseMealApi[0].idMeal : responseDrinksApi[0].idDrink,
      type: prefix === 'meals' ? 'meal' : 'drink',
      nationality: prefix === 'meals' ? responseMealApi[0].strArea : '',
      category: prefix === 'meals' ? responseMealApi[0].strCategory
        : responseDrinksApi[0].strCategory,
      alcoholicOrNot: prefix === 'drinks' ? responseDrinksApi[0].strAlcoholic : '',
      name: prefix === 'drinks' ? responseDrinksApi[0].strDrink
        : responseMealApi[0].strMeal,
      image: prefix === 'drinks' ? responseDrinksApi[0].strDrinkThumb
        : responseMealApi[0].strMealThumb,
    };

    const verifyIds = dataLocalStorage.some((recipe) => recipe.id === id); // Verifica se o Id ja existe no local storage
    if (verifyIds) {
      const removeFavorite = dataLocalStorage.filter((recipe) => recipe.id !== id); // Se existir remove o mesmo
      localStorage.setItem('favoriteRecipes', JSON.stringify(removeFavorite));
      setIsFavorite(false); // seta o estado que controla o coração do favorito pra falso
    } else {
      const addFavorite = [...dataLocalStorage, favorite];
      localStorage.setItem('favoriteRecipes', JSON.stringify(addFavorite)); // Se não existir adiciona um novo
      setIsFavorite(true); // seta o estado que controla o coração do favorito pra true
    }
  };

  let recipeContent = null;
  let recomendedCards = null;
  // Renderização condicional, se possuir alguma coisa no estado responseMealApi rendeiza o map dos Meals
  if (responseMealApi?.length > 0) {
    recipeContent = responseMealApi.map((meal) => (
      <div key={ meal.idMeal }>
        <img
          className="imgRecipeDetail"
          data-testid="recipe-photo"
          src={ meal.strMealThumb }
          alt={ meal.strMeal }
        />
        <h4 data-testid="recipe-title">{meal.strMeal}</h4>
        <p data-testid="recipe-category">{meal.strCategory}</p>
        <ul>{renderIngredients(responseMealApi)}</ul>
        <p data-testid="instructions">{meal.strInstructions}</p>
        <iframe
          width="560"
          height="315"
          src={ embedVideo(meal.strYoutube) }
          title="YouTube video player"
          allow="accelerometer; clipboard-write;
          encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          data-testid="video"
        />
      </div>
    ));

    recomendedCards = recomendedDrinks
      .filter(filterRecomendedCard)
      .map((recipe, index) => (
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
      ));
  } else if (responseDrinksApi?.length > 0) {
    recipeContent = responseDrinksApi.map((drink) => (
      <div key={ drink.idDrink }>
        <img
          className="imgRecipeDetail"
          data-testid="recipe-photo"
          src={ drink.strDrinkThumb }
          alt={ drink.strDrink }
        />
        <h4 data-testid="recipe-title">{drink.strDrink}</h4>
        <p data-testid="recipe-category">{drink.strAlcoholic}</p>
        <ul>{renderIngredients(responseDrinksApi)}</ul>
        <p data-testid="instructions">{drink.strInstructions}</p>
      </div>
    ));

    recomendedCards = recomendedMeals
      .filter(filterRecomendedCard)
      .map((recipe, index) => (
        <div
          key={ recipe.idMeal }
          data-testid={ `${index}-recommendation-card` }
        >
          <img
            className="imgRecomendCard"
            src={ recipe.strMealThumb }
            alt={ recipe.strMeal }
          />
          <h4 data-testid={ `${index}-recommendation-title` }>
            {recipe.strMeal}
          </h4>
        </div>
      ));
  }

  return (
    <>
      <div>
        {recipeContent}
        <div className="RecomendedCard">{recomendedCards}</div>
        {!doneRecipe && <BtnStartRecipe inProgressRecipe={ inProgressRecipe } />}
      </div>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ handleShare }
      >
        <img
          src={ ShareIcon }
          alt="share-btn"
        />
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ handleFavorite }
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
      >
        <img
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt="share-btn"
        />
      </button>
      { shareBtn && <span>Link copied!</span> }
    </>
  );
}

export default RecipeDetails;

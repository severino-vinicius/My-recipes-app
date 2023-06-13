import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function BtnStartRecipe({ inProgressRecipe }) {
  const history = useHistory();

  const [recipeButtonText, setRecipeButtonText] = useState('Start Recipe');

  useEffect(() => {
    // Se existir o inProgressRecipe props que vem os dados do localstorage
    // será verificado se as chaves dos objetos drinks, meals
    // possuem o id que corresponde ao ID da url da pagina
    if (inProgressRecipe) {
      const { drinks, meals } = inProgressRecipe;
      const pathUrl = history.location.pathname;
      const [,, id] = pathUrl.split('/');

      const isRecipeInProgress = (drinks && Object.keys(drinks).includes(id))
      || (meals && Object.keys(meals).includes(id));
      setRecipeButtonText(isRecipeInProgress ? 'Continue Recipe' : 'Start Recipe');
    }
  }, [inProgressRecipe]);

  // No clique do botão redireciona o usario para a tela de receita(id) em progresso
  const onStartClick = () => {
    const pathUrl = history.location.pathname;
    const [, prefix, id] = pathUrl.split('/');

    history.push(`/${prefix}/${id}/in-progress`);
  };

  return (
    <button
      type="button"
      data-testid="start-recipe-btn"
      className="btnStartRecipe"
      onClick={ onStartClick }
    >
      { recipeButtonText }
    </button>
  );
}

BtnStartRecipe.propTypes = {
  inProgressRecipe: PropTypes.shape({
    drinks: PropTypes.shape({}),
    meals: PropTypes.shape({}),
  }),
}.isRequired;

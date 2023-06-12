import React from 'react';
import { useHistory } from 'react-router-dom';

export default function BtnStartRecipe() {
  const history = useHistory();

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
      Start Recipe
    </button>
  );
}

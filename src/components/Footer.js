import React from 'react';
import '../css/Footer.css';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();
  const handleDrinksClick = () => {
    history.push('/drinks');
  };

  const handleMealsClick = () => {
    history.push('/meals');
  };

  return (
    <div className="footer" data-testid="footer">
      <button
        data-testid="drinks-bottom-btn"
        onClick={ handleDrinksClick }
        src={ drinkIcon }
      >
        <img src={ drinkIcon } alt="Drink Icon" />
      </button>

      <button
        data-testid="meals-bottom-btn"
        onClick={ handleMealsClick }
        src={ mealIcon }
      >
        <img src={ mealIcon } alt="Meal Icon" />
      </button>
    </div>
  );
}

export default Footer;

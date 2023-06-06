import React from 'react';
import Header from '../components/Header';
import MealIcon from '../images/mealIcon.svg';

export default function Meals() {
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
    </>
  );
}

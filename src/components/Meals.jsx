import React from 'react';
import Header from './Header';
import MealIcon from '../images/mealIcon.svg';

export default function Meals() {
  return (
    <>
      <Header pageTitle="Meals" showSearch showIcon pageIcon={ MealIcon } />
      <div>Meals Page</div>
    </>
  );
}

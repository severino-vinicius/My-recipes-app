import React from 'react';
import Header from '../components/Header';
import MealIcon from '../images/mealIcon.svg';
import './Meals.css';
import Footer from '../components/Footer';
import Recipes from './Recipes';

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

      <Recipes />
      <Footer />
    </>
  );
}

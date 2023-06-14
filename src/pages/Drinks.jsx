import React from 'react';
import Header from '../components/Header';
import DrinkIcon from '../images/drinkIcon.svg';
import Footer from '../components/Footer';
import './Drinks.css';
import Recipes from './Recipes';

export default function Drinks() {
  return (
    <>
      <Header
        pageTitle="Drinks"
        showSearch
        showIcon
        pageIcon={ DrinkIcon }
        pageType="drinks"
      />
      <div>Drinks</div>

      <Recipes />
      <Footer />
    </>
  );
}

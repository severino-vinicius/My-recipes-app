import React from 'react';
import Header from '../components/Header';
import DrinkIcon from '../images/drinkIcon.svg';

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
    </>
  );
}

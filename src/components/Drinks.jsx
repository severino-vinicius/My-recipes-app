import React from 'react';
import Header from './Header';
import DrinkIcon from '../images/drinkIcon.svg';

export default function Drinks() {
  return (
    <>
      <Header pageTitle="Drinks" showSearch showIcon pageIcon={ DrinkIcon } />
      <div>Drinks</div>
    </>
  );
}

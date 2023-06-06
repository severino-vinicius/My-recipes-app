import { useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import RecipesContext from '../context/recipesContext';

export default function SearchBar({ pageType }) {
  const [filterText, setFilterText] = useState('');
  const [searchOption, setSearchOption] = useState('ingredient');
  const {
    fetchMealRecipes,
    fetchDrinkRecipes,
  } = useContext(RecipesContext);

  // funcao para o botao search
  const handleSearch = async () => {
    if (pageType === 'drinks') {
      await fetchDrinkRecipes(searchOption, filterText);
    } else {
      await fetchMealRecipes(searchOption, filterText);
    }
  };

  return (
    <>
      <div>
        <input
          type="radio"
          value={ searchOption }
          id="ingredient"
          name="search-option"
          data-testid="ingredient-search-radio"
          onChange={ () => setSearchOption('ingredient') }
          checked={ searchOption === 'ingredient' }
        />
        {' '}
        <label htmlFor="ingredient">Ingredient </label>
        {' '}
        {'  '}

        <input
          type="radio"
          value={ searchOption }
          id="name"
          name="search-option"
          data-testid="name-search-radio"
          onChange={ () => setSearchOption('name') }
          checked={ searchOption === 'name' }
        />
        {' '}
        <label htmlFor="name">Name </label>
        {'  '}

        <input
          type="radio"
          value={ searchOption }
          id="first-letter"
          name="search-option"
          data-testid="first-letter-search-radio"
          onChange={ () => setSearchOption('first-letter') }
          checked={ searchOption === 'first-letter' }
        />
        {' '}
        <label htmlFor="first-letter">First letter</label>
      </div>
      <input
        type="text"
        value={ filterText }
        onChange={ ({ target }) => setFilterText(target.value) }
        placeholder="Search"
        data-testid="search-input"
      />
      <br />
      <br />
      <Button
        onClick={ handleSearch }
        data-testid="exec-search-btn"
      >
        SEARCH
      </Button>
    </>
  );
}

SearchBar.propTypes = {
  pageType: PropTypes.string.isRequired,
};

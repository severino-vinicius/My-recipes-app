import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import SearchIcon from '../images/searchIcon.svg';
import ProfileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';

export default function Header({ pageTitle, showSearch, showIcon, pageIcon, pageType }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <div>
        {showSearch ? (
          <Button
            onClick={ () => setIsSearchOpen(!isSearchOpen) }
          >
            <img data-testid="search-top-btn" alt="search icon" src={ SearchIcon } />
          </Button>
        ) : null}
        {showIcon ? (
          <Link to="/profile">
            <img
              data-testid="profile-top-btn"
              alt="profile icon"
              src={ ProfileIcon }
            />
          </Link>
        ) : null}
      </div>
      <div>
        {pageIcon ? (
          <img data-testid="page-icon-header" alt="page icon" src={ pageIcon } />
        ) : null}
        <div data-testid="page-title">{pageTitle}</div>
      </div>
      <div>
        {isSearchOpen ? (
          <SearchBar pageType={ pageType } />
        ) : null}
      </div>
    </>
  );
}

Header.propTypes = {
  pageTitle: PropTypes.string,
  showSearch: PropTypes.bool,
  showIcon: PropTypes.bool,
  pageIcon: PropTypes.shape({}),
  pageType: PropTypes.string,
}.isRequired;

// @ts-check

import UIManager from "./uimanager";

/**
 * @class SearchBarUI
 * @classdesc Places a searchBar at the top of the page
 * */
class SearchBarUI {
  #uimanager;
  /**
   * @constructor
   * @param {UIManager} uimanager 
   * */
  constructor(uimanager) {
    this.#uimanager = uimanager;
  }

  /**
   * @method to render the search bar on the page
   * @param {Function} onSearchClick 
   * @param {Function} onLocationClick 
   * @returns {Node} searchbarDiv
   * */
  renderSearchBar(onSearchClick, onLocationClick) {
    const searchbarDiv = document.createElement('div')
    searchbarDiv.classList.add('search-bar-div')
    const searchbar = this.#uimanager.addElement('input', searchbarDiv, 'search-bar')
    if (searchbar instanceof HTMLInputElement) {
      searchbar.type = 'search';
      searchbar.placeholder = 'Search for a city';
    }
    const locateButton = this.#uimanager.addElement('span', searchbarDiv, 'locate-btn');
    if (locateButton instanceof HTMLElement) {
      locateButton.innerHTML = `<i class='fa-solid fa-location-dot'></i>`
    }
    const searchButton = this.#uimanager.addElement('span', searchbarDiv, 'search-btn');
    if (searchButton instanceof HTMLElement) {
      searchButton.innerHTML = `<i class='fa-solid fa-magnifying-glass'></i>`
    }

    searchButton.addEventListener('click', (e) => {
      console.log(`inside ${e.target}`)
      e.preventDefault()
      if (typeof onSearchClick === 'function') {
        if (searchbar instanceof HTMLInputElement) {
          onSearchClick(searchbar.value);
        }
      }
    });

    return searchbarDiv;
  }
}

/**
 * @module SearchBarUI
 * */
export default SearchBarUI;

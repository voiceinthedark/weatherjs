// @ts-check
import UIManager from "./uimanager";

/**
* @class
* @classdesc responsible for rendering the day card onto the page
*/
class DayWeatherUI {
  #uimanager;
  /**
   * @constructor
   * @description Creates an instance of DayWeatherUI.
   * @param {UIManager} uimanager 
   */
  constructor(uimanager) {
    this.#uimanager = uimanager;
  }
  /**
   * @method
   * @description Renders the day card onto the page.
   * @param {Object} day - The day data to render.
   * @returns {HTMLElement} The rendered day card element.
   */
  renderDayCard(day) {
    const dayCard = document.createElement('div');
    dayCard.className = 'day-card';

    /** Day card Header **/
    const topDiv = this.#uimanager.addElement('div', dayCard, 'day-top-div');
    const topDivLeft = this.#uimanager.addElement('div', topDiv, 'day-top-div-left');
    const icon = this.#uimanager.addElement('img', topDivLeft, 'day-icon');
    if (day.icon && this.#uimanager.icons[day.icon] && icon instanceof HTMLImageElement) {
      icon.src = this.#uimanager.icons[day.icon];
    } else {
      //TODO: add fallback Icon

    }
    const temperature = this.#uimanager.addElement('span', topDivLeft, 'day-temp')
    temperature.textContent = `${day.temperature}°C`;
    const feelslike = this.#uimanager.addElement('span', topDivLeft, 'day-feel');
    feelslike.textContent = `Feels ${day.feelsLike}°C`
    const date = this.#uimanager.addElement('span', topDiv, 'day-date');
    date.textContent = day.datetime;

    /** Day Card Body **/
    const bodyDiv = this.#uimanager.addElement('div', dayCard, 'day-body');


    return dayCard;
  }
}

/** @module DayWeatherUI */
export default DayWeatherUI;

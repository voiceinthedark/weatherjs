// @ts-check

import TodayWeather from "../todayWeather";
import UIManager from "./uimanager";

/**
 * @class WeeKWeatherUI
 * @classdesc class to render the week days weather forecast
 * */
class WeeKWeatherUI {
  #uimanager;

  /**
   * @constructor
   * @param {UIManager} uimanager 
   * */
  constructor(uimanager) {
    this.#uimanager = uimanager;
  }

  /**
   * @method to render entire week forecast
   * @param {Array<TodayWeather>} weekDays 
   * @returns {HTMLElement} week item that contains the entire week forecast
   * */
  renderWeekCards(weekDays) {
    const week = document.createElement('div')
    week.classList.add('week-list')
    for (let day of weekDays) {
      const dayCard = this.renderWeekDayCard(day);
      week.appendChild(dayCard);
    }
    return week;
  }

  /**
   * @method to render a weekday weather forecast
   * @param {TodayWeather} day - the day data
   * @returns {HTMLElement} weekDayFrame
   * */
  renderWeekDayCard(day) {
    const weekDayFrame = document.createElement('div');
    weekDayFrame.classList.add('week-frame')
    const date = this.#uimanager.addElement('span', weekDayFrame, 'week-date')
    date.textContent = day.datetime;
    const weekDayCard = this.#uimanager.addElement('div', weekDayFrame, 'week-card')

    /** TOP SECTION **/
    const weekTopDiv = this.#uimanager.addElement('div', weekDayCard, 'week-top-div');
    const weekTopLeftDiv = this.#uimanager.addElement('div', weekTopDiv, 'week-top-left-div');
    const icon = this.#uimanager.addElement('img', weekTopLeftDiv, 'week-icon')
    if (icon instanceof HTMLImageElement) {
      icon.src = this.#uimanager.icons[day.icon];
    }
    const temperature = this.#uimanager.addElement('span', weekTopLeftDiv, 'week-temp')
    temperature.textContent = `${day.temperature}°C`
    const weekTopRightDiv = this.#uimanager.addElement('div', weekTopDiv, 'week-top-right-div')
    const tempMax = this.#uimanager.addElement('span', weekTopRightDiv, 'week-temp-max')
    tempMax.textContent = `${day.tempmax}°C`
    const tempMin = this.#uimanager.addElement('span', weekTopRightDiv, 'week-temp-min')
    tempMin.textContent = `${day.tempmin}°C`
    const feels = this.#uimanager.addElement('span', weekTopRightDiv, 'week-feels')
    feels.textContent = `${day.feelslike}°C`

    /** MIDDLE SECTION **/
    const weekMidDiv = this.#uimanager.addElement('div', weekDayCard, 'week-mid-div')
    const sunriseDiv = this.#uimanager.addElement('div', weekMidDiv, 'week-mid-sun-div')
    const sunriseIcon = this.#uimanager.addElement('img', sunriseDiv, 'week-sunrise-icon')
    if (sunriseIcon instanceof HTMLImageElement) {
      sunriseIcon.src = this.#uimanager.icons['sunrise']
    }
    const sunrise = this.#uimanager.addElement('span', sunriseDiv, 'week-sunrise')
    sunrise.textContent = day.sunrise;
    const sunsetDiv = this.#uimanager.addElement('div', weekMidDiv, 'week-mid-set-div')
    const sunsetIcon = this.#uimanager.addElement('img', sunsetDiv, 'week-sunset-icon')
    if (sunsetIcon instanceof HTMLImageElement) {
      sunsetIcon.src = this.#uimanager.icons['sunset']
    }
    const sunset = this.#uimanager.addElement('span', sunsetDiv, 'week-sunset')
    sunset.textContent = day.sunset;

    /** BOTTOM SECTION **/
    const weekBotDiv = this.#uimanager.addElement('div', weekDayCard, 'week-bot-div')
    // const conditions = this.#uimanager.addElement('span', weekBotDiv, 'week-conditions')
    const description = this.#uimanager.addElement('span', weekBotDiv, 'week-description')
    description.textContent = day.description

    // set up background
    if (weekDayCard instanceof HTMLElement) {
      weekDayCard.classList.add(day.icon)
    }

    return weekDayFrame;

  }
}

/**
 * @module WeeKWeatherUI
 * */
export default WeeKWeatherUI;

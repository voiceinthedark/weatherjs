// @ts-check

import TodayWeather from "../todayWeather";
import UIManager from "./uimanager";

/**
 * @class WeeKWeatherUI
 * @classdesc class to render the week days weather forecast
 * */
class WeeKWeatherUI{
  #uimanager;

  /**
   * @constructor
   * @param {UIManager} uimanager 
   * */
  constructor(uimanager){
    this.#uimanager = uimanager;
  }

  /**
   * @method to render a weekday weather forecast
   * @param {TodayWeather} day - the day data
   * */
  renderWeekDayCard(day){
    const weekDayFrame = document.createElement('div');
    weekDayFrame.classList.add('week-frame')
    const date = this.#uimanager.addElement('span', weekDayFrame, 'week-date')
    const weekDayCard = this.#uimanager.addElement('div', weekDayFrame, 'week-card')

    /** TOP SECTION **/
    const weekTopDiv = this.#uimanager.addElement('div', weekDayCard, 'week-top-div');
    const weekTopLeftDiv = this.#uimanager.addElement('div', weekTopDiv, 'week-top-left-div');
    const icon = this.#uimanager.addElement('img', weekTopLeftDiv, 'week-icon')
    const temperature = this.#uimanager.addElement('span', weekTopLeftDiv, 'week-temp')
    const weekTopRightDiv = this.#uimanager.addElement('div', weekTopDiv, 'week-top-right-div')
    const tempMax = this.#uimanager.addElement('span', weekTopRightDiv, 'week-temp-max')
    const tempMin = this.#uimanager.addElement('span', weekTopRightDiv, 'week-temp-min')
    const feels = this.#uimanager.addElement('span', weekTopRightDiv, 'week-feels')

    /** MIDDLE SECTION **/
    const weekMidDiv = this.#uimanager.addElement('div', weekDayCard, 'week-mid-div')
    const sunriseDiv = this.#uimanager.addElement('div', weekMidDiv, 'week-mid-sun-div')
    const sunriseIcon = this.#uimanager.addElement('img', sunriseDiv, 'week-sunrise-icon')
    const sunrise = this.#uimanager.addElement('span', weekMidDiv, 'week-sunrise')   
    const sunsetDiv = this.#uimanager.addElement('div', weekMidDiv, 'week-mid-set-div')
    const sunsetIcon = this.#uimanager.addElement('img', sunsetDiv, 'week-sunset-icon')
    const sunset = this.#uimanager.addElement('span', weekMidDiv, 'week-sunset')

    /** BOTTOM SECTION **/
    const weekBotDiv = this.#uimanager.addElement('div', weekDayCard, 'week-bot-div')
    // const conditions = this.#uimanager.addElement('span', weekBotDiv, 'week-conditions')
    const description = this.#uimanager.addElement('span', weekBotDiv, 'week-description')

  }
}

/**
 * @module WeeKWeatherUI
 * */
export default WeeKWeatherUI;

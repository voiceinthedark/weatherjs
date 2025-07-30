// @ts-check
import DataFetcher from "./datafetcher";
import DayWeatherUI from "./UI/dayweatherui";
import UIManager from "./UI/uimanager";
import allIcons from "../assets/icons/allicons";

/**
 * @class
 * @classdesc App controller, to control the flow of data between the front and the back
 * */
class AppController {
  #dataFetcher;
  #data;
  #weekData;
  #uimanager;

  /**
   * @param {HTMLElement} appContainer 
   * */
  constructor(appContainer) {
    this.#dataFetcher = new DataFetcher(
      "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/",
      'Chehour',
      "7WXVPBFAC4BMBGSURKG4AJBTP",
      "metric");
    this.#uimanager = new UIManager(appContainer, allIcons);
  }

  /**
     * @method to initialize the AppController and fetch initial data
     * @async
     * @returns {Promise<void>}
     * */
  async initialize() {
    try {
      this.#data = await this.#dataFetcher.collect();
      this.#weekData = await this.#dataFetcher.getWeekData();
    } catch (error) {
      console.error("Error fetching initial data:", error);
      this.#data = undefined; // Ensure #data is in a known state on error
      this.#weekData = undefined;
    }
  }

  /**
   * @returns data fetched from visualcrossing api
   * */
  getData() {
    return this.#data;
  }

  getWeekData(){
    return this.#weekData;
  }

  setDayCard() {
    if (!this.#data) {
      console.error("No data available to render day card.");
      return;
    }

    const dayWeatherUI = new DayWeatherUI(this.#uimanager);
    const dayCard = dayWeatherUI.renderDayCard(this.#data);

    // Assuming there's a container in the HTML to append the day card
    const container = document.getElementById('container');
    if (container) {
      container.appendChild(dayCard);
    } else {
      console.error("Container for day card not found.");
    }


  }


}

/**
 * @module AppController
 * */
export default AppController;

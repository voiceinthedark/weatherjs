// @ts-check
import DataFetcher from "./datafetcher";
import DayWeatherUI from "./UI/dayweatherui";
import UIManager from "./UI/uimanager";
import WeekDaysWeather from "./weekdaysweather";
import allIcons from "../assets/icons/allicons";
import TodayWeather from "./todayWeather";
import WeeKWeatherUI from "./UI/weekweatherui";
import SearchBarUI from "./UI/searchbarui";
import FooterUI from "./UI/footerui";
import HoursWeather from "./hoursweather";

/**
 * @class
 * @classdesc App controller, to control the flow of data between the front and the back
 * */
class AppController {
  #dataFetcher;
  /** @type {Object} */
  #data;
  /** @type {Object} */
  #weekData;
  /** @type {Array<TodayWeather>} */
  #weekDays;
  // #hoursData;
  // #hoursWeather;
  #uimanager;
  #container;

  /**
   * @param {HTMLElement} appContainer
   * */
  constructor(appContainer) {
    this.#dataFetcher = new DataFetcher(
      "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/",
      "paris",
      "7WXVPBFAC4BMBGSURKG4AJBTP",
      "metric",
    );
    this.#uimanager = new UIManager(appContainer, allIcons);
    this.#container = appContainer;
  }

  /**
   * @method to initialize the AppController and fetch initial data
   * @async
   * @returns {Promise<void>}
   * */
  async initialize() {
    this.#uimanager.showLoading()
    try {
      this.#data = await this.#dataFetcher.collect();
      this.#weekData = await this.#dataFetcher.getWeekData();
      const week = new WeekDaysWeather(this.#weekData);
      this.#weekDays = week.getDays();
      // Retrieve the raw grouped hours data from DataFetcher
      const rawGroupedHoursByDay = this.#dataFetcher.getGroupedHoursByDay();

      // Associate HoursWeather object with each TodayWeather object
      for (const dayWeather of this.#weekDays) {
        // Assuming TodayWeather objects have a 'datetime' property (e.g., via a getter)
        const dayKey = dayWeather.datetime;
        if (rawGroupedHoursByDay && rawGroupedHoursByDay[dayKey]) {
          const hoursForThisDay = rawGroupedHoursByDay[dayKey];
          const hoursWeatherInstance = new HoursWeather(hoursForThisDay);
          
          dayWeather.hours = hoursWeatherInstance;
        }
      }
    } catch (error) {
      console.error("Error fetching initial data:", error);
      this.#data = undefined; // Ensure #data is in a known state on error
      this.#weekData = undefined;
      this.setEmptyResult()
    } finally {
      this.#uimanager.hideLoading()
    }

  }

  /**
   * @returns data fetched from visualcrossing api
   * */
  getData() {
    return this.#data;
  }

  /**
   * @method to return the wehater data unsanitized
   * @returns {Array<object>} weekData
   * */
  getWeekData() {
    return this.#weekData;
  }

  /**
   * @method to return the forecast week data as Today's objects
   * @returns {Array<TodayWeather>} weekDays
   * */
  getWeek() {
    return this.#weekDays;
  }

  // getHoursData() {
  //   return this.#hoursData;
  // }

  getGroupedByHoursData() {
    return this.getWeek()
  }

  setSearchBar() {
    const header = document.getElementById("header");
    const searchBar = new SearchBarUI(this.#uimanager).renderSearchBar(
      this.handleSearchButton.bind(this),
      this.handleLocationButton.bind(this),
    );
    header?.appendChild(searchBar);
  }

  setEmptyResult() {
    const empty = this.#uimanager.addElement(
      "h1",
      this.#container,
      "empty-container",
    );
    empty.textContent = "No Data found, retry again";
  }

  /**
   * @method to set day card on the ui
   * */
  setDayCard() {
    if (!this.#data) {
      console.error("No data available to render day card.");
      return;
    }

    const dayWeatherUI = new DayWeatherUI(this.#uimanager);
    const dayCard = dayWeatherUI.renderDayCard(this.#data);

    if (this.#container) {
      this.#container.appendChild(dayCard);
    } else {
      console.error("Container for day card not found.");
    }
  }

  setWeekList() {
    if (!this.#weekDays) {
      console.error("No data available to render the forecast");
      return;
    }

    const weekWeatherUI = new WeeKWeatherUI(this.#uimanager);
    const weekForecast = weekWeatherUI.renderWeekCards(
      this.getWeek().slice(0, -1),
    );

    if (this.#container) {
      this.#container.appendChild(weekForecast);
    } else {
      console.error("Container not found");
    }
  }

  /**
   * @method to handle the search bar value
   * @param {string} value
   * */
  async handleSearchButton(value) {
    if (value !== "" && value !== null) {
      console.log(`searching for ${value} in appcontroller`);
      this.#uimanager.clearElement(this.#container)
      this.#uimanager.showLoading()

      try {
        await this.#dataFetcher.setQuery(value);
        this.#data = this.#dataFetcher.getData();
        this.#weekData = this.#dataFetcher.getWeekData();
        const week = new WeekDaysWeather(this.#weekData);
        this.#weekDays = week.getDays();

        const rawGroupedHoursByDay = this.#dataFetcher.getGroupedHoursByDay()

        for (const dayWeather of this.#weekDays) {
          const dayKey = dayWeather.datetime;
          if (rawGroupedHoursByDay && rawGroupedHoursByDay[dayKey]) {
            const hoursForThisDay = rawGroupedHoursByDay[dayKey]
            const hoursWeatherInstance = new HoursWeather(hoursForThisDay);
            dayWeather.hours = hoursWeatherInstance;
          }
        }

        this.setDayCard();
        this.setWeekList();
        this.setupFooter();
      } catch (error) {
        console.error("Error fetching data for search query", error);
        this.setEmptyResult()
      } finally {
        this.#uimanager.hideLoading()
      }


    }
  }

  /**
   * @method to handle geolocation button
   * */
  async handleLocationButton() {
    // TODO: Fix Geolocation not getting the city name and getting out of bound on the ui
    console.log("Location button clicked, fetching current location data...");
    this.#uimanager.clearElement(this.#container)
    this.#uimanager.showLoading()

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          await this.#dataFetcher.setQuery(`${latitude},${longitude}`);
          console.log(this.#dataFetcher.query);

          this.#data = this.#dataFetcher.getData();
          this.#weekData = this.#dataFetcher.getWeekData();
          const week = new WeekDaysWeather(this.#weekData);
          this.#weekDays = week.getDays();

          // Retrieve the raw grouped hours data after new query
          const rawGroupedHoursByDay = this.#dataFetcher.getGroupedHoursByDay();

          // Associate HoursWeather object with each TodayWeather object
          for (const dayWeather of this.#weekDays) {
            const dayKey = dayWeather.datetime;
            if (rawGroupedHoursByDay && rawGroupedHoursByDay[dayKey]) {
              const hoursForThisDay = rawGroupedHoursByDay[dayKey];
              const hoursWeatherInstance = new HoursWeather(hoursForThisDay);
              dayWeather.hours = hoursWeatherInstance; // Assuming direct property assignment
            }
          }

          this.setDayCard();
          this.setWeekList();
          this.setupFooter();
        } catch (error) {
          console.error("Error fetching data for current location:", error);
          this.setEmptyResult()
        } finally {
          this.#uimanager.hideLoading()
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        this.#uimanager.hideLoading()
        this.setEmptyResult()
      },
    );
  }

  /**
   * @method to setup the footer of the page
   * */
  setupFooter() {
    const footerui = new FooterUI(this.#uimanager);
    const footer = footerui.renderFooter();
    this.#container.appendChild(footer);
  }
}

/**
 * @module AppController
 * */
export default AppController;

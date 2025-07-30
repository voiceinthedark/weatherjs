// @ts-check
import TodayWeather from "./todayWeather";

/**
 * @class WeekDaysWeather
 * @classdesc formats a list of object data into todayWeather objects
 * */
class WeekDaysWeather {
  #weekDaysData;
  #weekDays;

  /**
   * @constructor
   * @param {Array<object>} weekDaysData 
   * */
  constructor(weekDaysData) {
    this.#weekDaysData = weekDaysData;
    this.#weekDays = [];

    this.#formatData();
  }

  /**
   * @method to format the data into Today objects
   * */
  #formatData() {
    for (let day of this.#weekDaysData) {
      this.#weekDays.push(new TodayWeather(day));
    }
  }

  getDays() {
    return this.#weekDays;
  }
}

/**
 * @module WeekDaysWeather
 * */
export default WeekDaysWeather;

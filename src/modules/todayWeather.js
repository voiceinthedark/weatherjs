// @ts-check

/**
 * @class TodayWeather
 * @description Holds information about weather condition for any given day
 * */
class TodayWeather{
  #address;
  #resolvedAddress;
  #datetime;
  #temperature;
  #feelslike;
  #humidity;
  #precipitation;
  #precipitationProbability;
  #windspeed;
  #solarenergy;
  #condition;
  #icon;
  #sunrise;
  #sunset;

  /**
   * @constructor
   * @param {Object} weatherData 
   * @param {string} weatherData.address
   * @param {string} weatherData.resolvedAddress
   * @param {string} weatherData.datetime
   * @param {number} weatherData.temperature
   * @param {number} weatherData.feelslike
   * @param {number} weatherData.humidity
   * @param {number} weatherData.precipitation
   * @param {number} weatherData.precipprob
   * @param {number} weatherData.windspeed
   * @param {number} weatherData.solarenergy
   * @param {string} weatherData.condition
   * @param {string} weatherData.icon
   * @param {string} weatherData.sunrise
   * @param {string} weatherData.sunset
   * */
  constructor(weatherData){
    this.#address = weatherData.address;
    this.#resolvedAddress = weatherData.resolvedAddress;
    this.#temperature = weatherData.temperature
    this.#feelslike = weatherData.feelslike
    this.#datetime = weatherData.datetime
    this.#humidity = weatherData.humidity
    this.#precipitation = weatherData.precipitation
    this.#precipitationProbability = weatherData.precipprob;
    this.#windspeed = weatherData.windspeed
    this.#solarenergy = weatherData.solarenergy
    this.#condition = weatherData.condition
    this.#icon = weatherData.icon
    this.#sunset = weatherData.sunset
    this.#sunrise = weatherData.sunrise
  }

  get address(){
    return this.#address;
  }
  get resolvedAddress(){
    return this.#resolvedAddress
  }
  get temperature(){
    return this.#temperature
  }
  get feelslike(){
    return this.#feelslike
  }
  get datetime(){
    return this.#datetime
  }
  get humidity(){
    return this.#humidity
  }
  get precipitation(){
    return this.#precipitation
  }
  get precipitationProbability(){
    return this.#precipitationProbability;
  }
  get windspeed(){
    return this.#windspeed
  }
  get solarenergy(){
    return this.#solarenergy
  }
  get condition(){
    return this.#condition
  }
  get sunrise(){
    return this.#sunrise
  }
  get sunset(){
    return this.#sunset
  }

  get icon(){
    return this.#icon
  }
  /**
   * @param {string} val 
   * */
  set icon(val){
    this.#icon = val
  }


}

/**
 * @module TodayWeather
 * */
export default TodayWeather;

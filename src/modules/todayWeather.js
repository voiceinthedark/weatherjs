// @ts-check

/**
 * @class TodayWeather
 * @description Holds information about weather condition for any given day
 * */
class TodayWeather{
  #address;
  #resolvedAddress;
  #datetime;
  #tempMin;
  #tempMax;
  #temperature;
  #feelslike;
  #humidity;
  #precipitation;
  #precipitationProbability;
  #windspeed;
  #solarenergy;
  #conditions;
  #description;
  #icon;
  #sunrise;
  #sunset;

  /**
   * @constructor
   * @param {Object} weatherData 
   * @param {string} weatherData.address
   * @param {string} weatherData.resolvedAddress
   * @param {string} weatherData.datetime
   * @param {number | null} weatherData.tempmin
   * @param {number | null} weatherData.tempmax 
   * @param {number | null | undefined} weatherData.temperature
   * @param {number | null | undefined} weatherData.temp
   * @param {number} weatherData.feelslike
   * @param {number} weatherData.humidity
   * @param {number} weatherData.precipitation
   * @param {number} weatherData.precipprob
   * @param {number} weatherData.windspeed
   * @param {number} weatherData.solarenergy
   * @param {string | null} weatherData.description
   * @param {string} weatherData.conditions
   * @param {string} weatherData.icon
   * @param {string} weatherData.sunrise
   * @param {string} weatherData.sunset
   * */
  constructor(weatherData){
    this.#address = weatherData.address;
    this.#resolvedAddress = weatherData.resolvedAddress;
    this.#temperature = weatherData.temperature ?? weatherData.temp // temperature on current, but temp on forecast (?!)
    this.#feelslike = weatherData.feelslike
    this.#datetime = weatherData.datetime
    this.#humidity = weatherData.humidity
    this.#precipitation = weatherData.precipitation
    this.#precipitationProbability = weatherData.precipprob;
    this.#windspeed = weatherData.windspeed
    this.#solarenergy = weatherData.solarenergy
    this.#conditions = weatherData.conditions
    this.#icon = weatherData.icon
    this.#sunset = weatherData.sunset
    this.#sunrise = weatherData.sunrise

    this.#tempMin = weatherData.tempmin ?? 30;
    this.#tempMax = weatherData.tempmax ?? 30;
    this.#description = weatherData.description ?? '';
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
  get conditions(){
    return this.#conditions
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

  get tempmin(){
    return this.#tempMin;
  }
  get tempmax(){
    return this.#tempMax;
  }
  get description(){
    return this.#description;
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

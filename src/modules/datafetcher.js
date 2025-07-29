// @ts-check

/**
 * @class DataFetcher
 * @classdesc The data fetcher object that connects to the api
 * */
class DataFetcher {
  #endpoint;
  #query;
  #apiKey;
  #unit;
  /**
   * @member {object} #data
   * */
  #data;
  /** @member {URLSearchParams} #searchParams */
  #searchParams;
  #fullUrl;

  /**
   * @constructor
   * @param {string} endpoint - url endpoint
   * @param {string} query - search query, city, country
   * @param {string} apikey - the api key
   * @param {string} unit - the unit, metric, us, uk
   * */
  constructor(endpoint, query, apikey, unit) {
    this.#endpoint = endpoint;
    this.#query = query;
    this.#apiKey = apikey;
    this.#unit = unit;

    this.setupSearchParameters();
    this.#fullUrl = new URL(`${this.#endpoint}${this.#query}?${this.#searchParams}`);
  }

  /**
   * @method to setup the search parameters of the url query
   * */
  setupSearchParameters() {
    this.#searchParams = new URLSearchParams();
    this.#searchParams.append('unitGroup', this.#unit);
    this.#searchParams.append('key', this.#apiKey);
    this.#searchParams.append('contentType', 'json');
  }

  get query() {
    return this.#query
  }

  /**
   * @param {string} val
   * */
  set query(val) {
    this.#query = val;
  }

  get unit() {
    return this.#unit;
  }

  /**
   * @param {string} val - metric, uk, us
   * */
  set unit(val) {
    this.#unit = val;
  }

  async collect() {
    try {
      const url = new URL(`${this.#endpoint}${this.#query}?${this.#searchParams}`);
      const response = await fetch(url, { mode: "cors" });
      const jsonResponse = await response.json();

      // extract data
      this.#data = {
        address: jsonResponse.address,
        resolvedAddress: jsonResponse.resolvedAddress,
        temperature: jsonResponse.currentConditions.temp,
        feelsLike: jsonResponse.currentConditions.feelslike,
        datetime: jsonResponse.currentConditions.datetime,
        humidity: jsonResponse.currentConditions.humidity,
        precipitation: jsonResponse.currentConditions.precip,
        windspeed: jsonResponse.currentConditions.windspeed,
        solarenergy: jsonResponse.currentConditions.solarenergy,
        conditions: jsonResponse.currentConditions.conditions,
        icon: jsonResponse.currentConditions.icon,
        sunrise: jsonResponse.currentConditions.sunrise,
        sunset: jsonResponse.currentConditions.sunset,
      };
      return this.#data;
    } catch(error){
      console.error(error);
      return undefined;
    }
  }

  getURL() {
    return this.#fullUrl;
  }

  /**
   * @method to return the collected data object
   * @returns {object} data
   * */
  getData() {
    return this.#data;
  }
}

/**
 * @module DataFetcher
 * */
export default DataFetcher;

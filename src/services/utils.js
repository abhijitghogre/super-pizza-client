import constants from "./constants";

export default {
  displayInSelectedCurrency: ({price, currency}) => {
    if (currency === 'usd') {
       return `${price.toFixed(2)} USD`;
    }
    if (currency === 'eur') {
      return `${(constants.euroExchangeRate * price).toFixed(2)} EUR`;
    }

  }
}
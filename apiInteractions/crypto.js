import axios from 'axios';
import { colors } from '../colors.js';
import { cryptoConversions } from '../config/cryptoConversions.js';
import { readTempValues } from '../manageTempFiles.js';

const {
  white, blue, green, error
} = colors;

const call = () => {
  const endpoint = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=NEAR,ETH,MKR,COMP,GRT,XLM,CELO,BAT,BTC,BAND&tsyms=USD&api_key=${process.env.REACT_APP_CRYPTO_KEY}`;
  try {
    return axios.get(endpoint);
  } catch (err) {
    return err;
  }
};

const crypto = () => {
  let totalPortfolio = 0;
  console.log(readTempValues());
  call()
    .then(({ data }) => {
      Object.keys(data).forEach((token) => {
        totalPortfolio += cryptoConversions[token] * data[token].USD;
        console.log(`${blue(token)}: ${white((cryptoConversions[token] * data[token].USD).toFixed(2))}`);
      });
      console.log(`Total: ${green(totalPortfolio.toFixed(2))}`);
    })
    .catch((err) => console.log(error(err)));
};

export default crypto;
/* eslint-disable import/prefer-default-export */
import fs from 'fs';

export const readTempValues = async () => {
  try {
    await fs.readFile('./config/tempValues.json', (err, data) => {
      if (err) throw err;
      JSON.parse(data);
    }).then((json) => json);
  } catch (err) {
    return err;
  }
};

export const writeTempValues = (tempValues) => {
  fs.writeFile('./config/tempValues.json', JSON.stringify(tempValues), (err) => {
    if (err) throw err;
    console.log('Temp values written to file');
  });
};
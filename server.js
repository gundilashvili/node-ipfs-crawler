const getData = require('./crawler/getData');
const readJson = require('./crawler/helpers/readJson');

const app = async () => {
  try {
    const data2 = await readJson('data.json'); 
    getData(data2);
    
  } catch (e) {
    console.log(e);
  }
};
app();

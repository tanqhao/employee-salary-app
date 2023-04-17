const User = require('../models/user');

const fs = require('fs');
const Papa = require('papaparse');

const csvFilePath = './csv/user.csv'


exports.userUpload = async (req, res, next) => {
  let parsedData = await readCSV(csvFilePath);
};


const readCSV = async (filePath) => {
  const csvFile = fs.readFileSync(filePath, 'utf8')
  const csvData = csvFile.toString()

  const idList = [];
  const loginList = [];

  return new Promise(resolve => {
    Papa.parse(csvData, {
      header: true,
      comments: '#',
      dynamicTyping: true,
      transformHeader: header => header.trim(),
      step: (results, parser) => {

        parser.pause();
        console.log("Row data:", results);

        const salary = results.data['salary'];

        if(typeof(salary) !== 'number' ||salary < 0.0 ) {
          console.log('incorrect salary format', salary)
          parser.abort();
        }

        if(idList.includes(results.data['id']) || loginList.includes(results.data['login'])) {
          console.log('duplicate entry');
          parser.abort();
        }

        idList.push(results.data['id']);
        loginList.push(results.data['login']);

        parser.resume();
        // console.log("Row errors:", results.errors);
      },
    });
  });
};

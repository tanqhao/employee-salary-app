const User = require('../models/user');

const fs = require('fs');
const Papa = require('papaparse');

exports.userUpload = async (req, res, next) => {
  try{
    let parsedData = await readCSV(req.file.path);
    return res.status(200).json({ message: parsedData });
  }
  catch(err) {
    return res.status(422).json({ message: err });
  };
};


const readCSV = async (filePath) => {
  const csvFile = fs.readFileSync(filePath, 'utf8')
  const csvData = csvFile.toString()

  const idList = [];
  const loginList = [];

  return new Promise((resolve, reject) => {
    Papa.parse(csvData, {
      header: true,
      comments: '#',
      dynamicTyping: true,
      transformHeader: header => header.trim(),
      step: (results, parser) => {

        parser.pause();

        const salary = results.data['salary'];

        // check salary
        if(typeof(salary) !== 'number' || salary < 0.0 ) {
          reject(`incorrect salary format ${salary}`);
          parser.abort();
        }

        // check duplicate employee ID
        if(idList.includes(results.data['id'])) {
          reject(`duplicate employee ID ${results.data['id']}`);
          parser.abort();
        }

        // check duplicate login ID
        if(loginList.includes(results.data['login'])) {
          reject(`duplicate login ID ${results.data['login']}`);
          parser.abort();
        }

        idList.push(results.data['id']);
        loginList.push(results.data['login']);

        const id = { id: results.data['id']};
        const userData = {
          login: results.data['login'],
          name: results.data['name'],
          salary: salary,
        };

        // update / create in DB
        User.findOneAndUpdate(id, userData, {
          upsert: true
        }).then(()=> {
          parser.resume();
        }).catch(err => {
          reject(err);
          parser.abort();
        });

      },
      complete: (results, file) => {
        if(results.meta.aborted)
        reject('CSV parse error');
        else
        resolve('CSV successfully parsed');
      }
    });
  });
};

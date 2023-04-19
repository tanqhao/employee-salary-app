const User = require('../models/user');

const fs = require('fs');
const Papa = require('papaparse');

exports.userUpload = async (req, res, next) => {
  try{
    let parsedData = await readCSV(req.file.path);
    return res.status(200).json({ message: parsedData });
  }
  catch(err) {
    return res.status(422).json({ message: `CSV parse error: ${err}` });
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

        if(results.errors.length) {
          reject(`${results.errors[0].message}`);
          parser.abort();
        }

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
        reject('CSV parse aborted');
        else
        resolve('CSV successfully parsed');
      }
    });
  });
};


exports.userList = async (req, res, next) => {

  try{

    if(Object.keys(req.query).length) {

      const minSalary = +req.query.minSalary;
      const maxSalary = +req.query.maxSalary;
      const limit = +req.query.limit || 30;
      const sort = req.query.sort;
      const offset = req.query.offset;

      let sortOrder = 1;

      if(sort.substring(0, 1) === '-')
        sortOrder = -1;

      const users = await User.find({salary: {$gte: minSalary, $lte: maxSalary}}, {_id: 0, __v: 0},)
      .sort({[sort.slice(1)]: sortOrder}).skip(offset).limit(limit);
      return res.status(200).json(users);
    }

    else {
    const users = await User.find({}, {_id: 0, __v: 0},);
    return res.status(200).json(users);
    }
  }
  catch(err) {
    return res.status(400).json({ message: `${err}` });
  };
};

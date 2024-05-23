// File handeling
const { error } = require('console');
const fs = require('fs');

/// write file

const data1 = Date();

fs.writeFile('date-time.txt', data1 , (err) => {

  if(err){
    console.log(err);
    return;
  }
  console.log(data1);
  console.log('File write successfully');
});


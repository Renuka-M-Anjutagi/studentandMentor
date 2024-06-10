<<<<<<< HEAD
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

=======
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

>>>>>>> e813d22dfc968b68f5ad56157a62da637c2e4e60

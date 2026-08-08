const gis = require('g-i-s');

gis('Silver Springs project image real estate noida', (error, results) => {
  if (error) {
    console.error(error);
  } else {
    console.log(JSON.stringify(results.slice(0, 3), null, 2));
  }
});

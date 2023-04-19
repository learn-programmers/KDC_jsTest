const catNames = require("./catNames");
const data = require("./data.json");

function validate() {
  Object.keys(catNames).forEach(name => {
    console.log(
      `${name} count: ${data.filter(d => d.name.includes(name)).length}`
    );
  });
}

module.exports = validate;

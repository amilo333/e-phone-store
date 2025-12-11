const fs = require("fs");
const path = require("path");

const USER_JSON = path.join(__dirname, "..", "data", "employee.json");

function loadData() {
  const txt = fs.readFileSync(USER_JSON, "utf8");
  return JSON.parse(txt);
}

function saveData(arr) {
  fs.writeFileSync(USER_JSON, JSON.stringify(arr, null, 2));
}

module.exports = {
  login: (req, res) => {},
};

const path = require("path");
const { success } = require("../util");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const BRAND_JSON = path.join(__dirname, "..", "data", "brand.json");

function brandJson() {
  const txt = fs.readFileSync(BRAND_JSON, "utf8");
  return JSON.parse(txt);
}

function saveData(arr) {
  fs.writeFileSync(BRAND_JSON, JSON.stringify(arr, null, 2));
}

module.exports = {
  getBrandList: (req, res) => {
    const brands = brandJson();
    success(res, brands);
  },
};

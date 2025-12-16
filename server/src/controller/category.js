const path = require("path");
const { success } = require("../util");
const fs = require("fs");

const CATEGORY_JSON = path.join(__dirname, "..", "data", "category.json");

function categoryJson() {
  const txt = fs.readFileSync(CATEGORY_JSON, "utf8");
  return JSON.parse(txt);
}

function saveData(arr) {
  fs.writeFileSync(CATEGORY_JSON, JSON.stringify(arr, null, 2));
}

module.exports = {
  getCategoryList: (req, res) => {
    const { search } = req.query;
    let categories = categoryJson();
    if (search && String(search).trim().length > 0) {
      const q = String(search).trim().toLowerCase();
      categories = categories.filter((c) =>
        (c.name ? String(c.name).toLowerCase() : "").includes(q)
      );
    }
    return success(res, categories);
  },
  createCategory: (req, res) => {
    const {name} = req.body
    
  }
};

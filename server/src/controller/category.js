const path = require("path");
const { success } = require("../util");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

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
    let categories = categoryJson();
    const { name } = req.body;
    const payload = req.body.payload || {};

    payload.id = uuidv4();
    payload.name = name || "Unnamed Category";
    payload.created_at = new Date().toISOString();

    categories.unshift(payload);
    saveData(categories);

    return success(res, payload);
  },
  updateCategory: (req, res) => {
    const { id } = req.params;
    let categories = categoryJson();
    const payload = req.body || {};

    const index = categories.findIndex((c) => c.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Không tìm thấy danh mục" });
    }

    categories[index] = {
      ...categories[index],
      name: payload.name || categories[index].name,
      updated_at: new Date().toISOString(),
    };

    saveData(categories);
    return success(res, categories[index], "Update danh mục thành công");
  },
  deleteCategory: (req, res) => {
    const { id } = req.params;
    let categories = categoryJson();

    const index = categories.findIndex((c) => c.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Không tìm thấy danh mục" });
    }

    categories.splice(index, 1);
    saveData(categories);

    return success(res, null, "Xóa danh mục thành công");
  },
};

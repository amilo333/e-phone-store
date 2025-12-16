const fs = require("fs");
const path = require("path");
const { success } = require("../util");

const USER_JSON = path.join(__dirname, "..", "data", "user.json");
const ROLE_JSON = path.join(__dirname, "..", "data", "role.json");

function userJson() {
  const txt = fs.readFileSync(USER_JSON, "utf8");
  return JSON.parse(txt);
}

function roleJson() {
  const txt = fs.readFileSync(ROLE_JSON, "utf8");
  return JSON.parse(txt);
}

function saveData(arr) {
  fs.writeFileSync(USER_JSON, JSON.stringify(arr, null, 2));
}

module.exports = {
  login: (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = userJson().find(
      (item) => item.email === username && item.password === password
    );

    if (user) {
      const role = roleJson().find((item) => item.id === user.role_id);
      return res.status(200).json({
        message: "Đăng nhập thành công",
        data: { ...user, role },
      });
    } else {
      return res.status(400).json({
        message: "Đăng nhập thất bại",
      });
    }
  },
  getUserList: (req, res) => {
    const { search } = req.query;

    let users = userJson();

    if (search && String(search).trim().length > 0) {
      const q = String(search).trim().toLowerCase();
      users = users.filter((u) => {
        const name = u.name ? String(u.name).toLowerCase() : "";
        const email = u.email ? String(u.email).toLowerCase() : "";
        return name.includes(q) || email.includes(q);
      });
    }

    const roles = roleJson();
    for (let userIdx = 0; userIdx < users.length; userIdx++) {
      const role = roles.find((item) => item.id === users[userIdx].role_id);
      users[userIdx].role = role ? role.label : null;
    }

    return success(res, users);
  },
};

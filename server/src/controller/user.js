const fs = require("fs");
const path = require("path");

const USER_JSON = path.join(__dirname, "..", "data", "user.json");

function userJson() {
  const txt = fs.readFileSync(USER_JSON, "utf8");
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
      return res.status(200).json({
        message: "Đăng nhập thành công",
        data: user,
      });
    } else {
      return res.status(400).json({
        message: "Đăng nhập thất bại",
      });
    }
  },
};

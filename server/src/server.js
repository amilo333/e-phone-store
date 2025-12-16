const fs = require("fs");
const path = require("path");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const moment = require("moment");
const { login, getUserList } = require("./controller/user");
const { getCategoryList } = require("./controller/category");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const USER_JSON = path.join(__dirname, ".", "data", "employee.json");

function loadData() {
  const txt = fs.readFileSync(USER_JSON, "utf8");
  return JSON.parse(txt);
}

function saveData(arr) {
  fs.writeFileSync(USER_JSON, JSON.stringify(arr, null, 2));
}

app.post("/api/employees", (req, res) => {
  const data = loadData();
  const payload = req.body.payload || {};

  const filteredData = data
    .filter(
      (item) =>
        !payload.status ||
        payload.status === "all" ||
        item.status === payload.status
    )
    .filter((item) =>
      payload.employee
        ? item.employee.toLowerCase().includes(payload.employee.toLowerCase())
        : true
    );

  res.json({
    data: filteredData,
  });
});

app.post("/api/employee", (req, res) => {
  const data = loadData();
  const payload = req.body || {};

  // Basic validation
  if (
    !payload.employee ||
    !payload.endDate ||
    !payload.type ||
    !payload.startDate
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const startDate = moment(payload.startDate).format("yyyy-MM-DD");
  const endDate = moment(payload.endDate).format("yyyy-MM-DD");

  if (payload.reqId) {
    const idx = data.findIndex((r) => r.reqId === payload.reqId);

    if (idx === -1) {
      return res.status(404).json({ message: "Request ID not found" });
    }

    data[idx] = { ...data[idx], ...payload };

    saveData(data);

    return res.json(data[idx]);
  } else {
    const maxId = data.reduce((m, r) => {
      return Math.max(m, Number(r.reqId.split("LR")[1]));
    }, 0);

    payload.reqId = `LR${maxId + 1}`;
    payload.employee = payload.employee;
    payload.type = payload.type;
    payload.startDate = startDate;
    payload.endDate = endDate;
    payload.status = "Pending";

    data.unshift(payload);

    saveData(data);
    return res.json(payload);
  }
});

// user.controller
app.post("/api/login", (req, res) => login(req, res));
app.get("/api/get-user", (req, res) => getUserList(req, res));
// category.controller
app.get("/api/get-categories",  (req, res) => getCategoryList(req, res))

app.listen(5000, () =>
  console.log("Mock API running at http://localhost:5000")
);

module.exports = {
  success: (res, data, message = "") =>
    res.status(200).json({
      data,
      message,
    }),
  badRequest: (res, message) =>
    res.status(400).json({
      message,
    }),
};

export const errorResponder = (err, req, res) => {
  res.header("Content-Type", "application/json");
  res.status(err.statusCode).send(JSON.stringify(err, null, 4));
};

export const invalidPathHandler = (req, res) => {
  res.redirect("/500");
};

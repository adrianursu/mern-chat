const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) return res.status(403).send("Acces denied.");
  next();
};

module.exports = { isAdmin };

const User = require('../models/user');

const protect = async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).send('Not authenticated');
  }
  try {
    const user = await User.findOne({ user_id: req.session.userId });
    if (!user) {
      return res.status(401).send('Not authenticated');
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = { protect };

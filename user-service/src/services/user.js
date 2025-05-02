const User = require('../models/User');

exports.getUserById = async (id) => {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return user;
}
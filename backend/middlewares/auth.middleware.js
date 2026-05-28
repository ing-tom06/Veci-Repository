const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  
  if (!bearerHeader) {
    return res.status(403).json({ message: 'No token provided' });
  }

  const bearer = bearerHeader.split(' ');
  const token = bearer[1];

  if (!token) {
    return res.status(403).json({ message: 'Malformed token' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    // Attach the decoded user payload to the request object
    req.user = decoded.user;
    next();
  });
};

exports.isVoluntario = (req, res, next) => {
  if (req.user && req.user.rol && req.user.rol.trim().toLowerCase() === 'voluntario') {
    next();
  } else {
    res.status(403).json({ message: 'Require Voluntario Role' });
  }
};

exports.isAdultoMayor = (req, res, next) => {
  if (req.user && req.user.rol && req.user.rol.trim().toLowerCase() === 'adulto mayor') {
    next();
  } else {
    res.status(403).json({ message: 'Require Adulto Mayor Role' });
  }
};

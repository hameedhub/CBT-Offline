import jwt from 'jsonwebtoken';
import dot from 'dotenv';
dot.config();


class Authorization {

  static checkToken(req, res, next) {
    try {
      const token = req.headers.authorization;
      const decoded = jwt.verify(token, process.env.TOKEN);
      req.userData = decoded;
      next();
    } catch (err) {
      return res.status(401).json({
        status: 401,
        error: 'Authorization failed',
      });
    }
  
  }

}

export default Authorization;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUserSchema, loginSchema } = require('./user.schema');

const { User } = require('./user.model');

class ApiController {

  static async register(req, res) {
    const user = req.body
    const validationRes = createUserSchema.validate(user);
    if (validationRes.error) {
      res.status(400).send()
    }
    const existingUser = await User.findOne({username: user.username});
    if (existingUser) {
      res.status(400).send('User already registered');
    }
    const userEntity = new User({
      ...user,
      passowrd: await bcrypt.hash(user.password, 10)
    });
    try {
      await userEntity.save();
      res.status(201).send();
    } catch (error) {
      res.status(500).send(error);
    }
  }


  static async login(req, res) {
    const validationRes = loginSchema.validate(req.body);
    if (validationRes.error) {
      res.status(400).send()
    }
    const { username, password } = req.body;
    const userCredentials = await User.findOne({ username });
    if (!userCredentials) {
      res.status(400).send();
    }
    console.log(userCredentials);
    try {
      const userAuth = await bcrypt.compare(password, userCredentials.password);
      if (!userAuth) {
        res.status(500).send();
      }
    } catch (error) {
      console.log(error);
    }

    const payload = { username, id: userCredentials.id };
    const signingOptions = {
      expiresIn: parseInt(process.env.expiresIn, 10),
      issuer: process.env.issuer,
      subject: process.env.subject,
      algorithm: process.env.algorithm,
    };
    const token = jwt.sign(
      payload,
      process.env.privateKey, signingOptions,
    );
    res.send({ token });
  }
}

module.exports = ApiController;

const passport = require("passport");
const passportJWT = require("passport-jwt");
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const Usuario = require("../../models/usuario");
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_OR_KEY
};
const strategy = new JwtStrategy(opts, (payload, next) => {
  Usuario.forge({ id: payload.id })
    .fetch()
    .then(res => {
      next(null, res);
    });
});

passport.use(strategy);

module.exports = passport;

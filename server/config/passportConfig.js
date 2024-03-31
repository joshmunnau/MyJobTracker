require('dotenv').config()
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const bcrypt = require('bcrypt');
const db = require('../config/dbConfig'); // Your database module 




    passport.use(new LocalStrategy(
        async (username, password, done) => {
          try {
            const { rows } = await db.query('SELECT * FROM users WHERE username = $1', [username]);
            const user = rows[0];
            
            if (!user) {
              return done(null, false, { message: 'No user with that username' });
            }
      
            if (await bcrypt.compare(password, user.password)) {
              return done(null, user);
            } else {
              return done(null, false, { message: 'Password incorrect' });
            }
          } catch (e) {
            return done(e);
          }
        }
      ));

      const jwtOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET, // Ensure this secret matches the one used when issuing JWTs
    };

    passport.use(new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
      console.log(jwt_payload); // Check the payload structure
      try {
          const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [jwt_payload.id]);
          const user = rows[0];
          
          if (user) {
              return done(null, user);
          } else {
              return done(null, false);
          }
      } catch (error) {
          console.log(error); // Ensure there are no errors in the query
          return done(error, false);
      }
  }));
      
      passport.serializeUser((user, done) => done(null, user.id));
      passport.deserializeUser(async (id, done) => {
        try {
          const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [id]);
          const user = rows[0];
          done(null, user);
        } catch (e) {
          done(e, null);
        }
      });

      module.exports = passport;

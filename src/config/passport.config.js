import passport from 'passport';
import passportLocal from 'passport-local';
import userModel from '../models/User.model.js';
import { create_hash, validate_password } from '../utils.js';


const LocalStrategy = passportLocal.Strategy;


const initializePassport = () => {
    
    passport.use('localRegister', new LocalStrategy(
        {
            passReqToCallback: true,
            usernameField: 'email',
        },
        async (req, username, password, done) => {
            const {firstname, lastname, role = 'user'} = req.body;

            try {

                const user_exists = await userModel.findOne({email: username});
                if(user_exists) return done(null, false, {message: "Usuario ya registrado"});

                const newUser = {
                  firstname,
                  lastname,
                  email: username,
                  role,
                  password: create_hash(password),
                  provider: 'local',
                };
                
                const createdUser = await userModel.create(newUser);
                return done(null, createdUser)

            } catch (error) {
                return done(`Error al registrar nuevo usuario (${error})`);
            }
        }
    ))

    passport.use(
      "localLogin",
      new LocalStrategy(
        {
          passReqToCallback: true,
          usernameField: "email",
        },
        async (req, username, password, done) => {
            try {
                const user = await userModel.findOne({email: username});

                if(!user){
                    console.log("Credenciales inválidas", email);
                    return done(null, false, {message: "Credenciales inválidas"});
                };

                const valid_password = validate_password(password, user.password);
                if(!valid_password) {
                    return done(null, false, { message: "Credenciales inválidas" });
                };

                return done(null, user);

            } catch (error) {
                return done(`Error al iniciar sesión (${error})`);
            }
        },
      ),
    );

    passport.serializeUser((user, done) => done(null, user._id));

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await userModel.findById(id).lean();
            done(null, user);
        } catch (error) {
            done(`Sesión no encontrada ${error}`)
        }
    })
}

export default initializePassport;
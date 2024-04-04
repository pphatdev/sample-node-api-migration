import { Router } from 'express'
import session from 'express-session'
import { updatePassword } from '../../controllers/password.js'
import passport from 'passport'
import Strategy from 'passport-http-bearer-base64'
export const ROUTE = Router()


const authSession = session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
})



// ROUTE.use(passport.initialize())
// ROUTE.use(passport.session())

// ROUTE.use(
//     new Strategy(
//         function(token, done) {
//             User.findOne({
//                 token: token
//             }, function(err, user) {
//                 if (err) {
//                     return done(err);
//                 }
//                 if (!user) {
//                     return done(null, false);
//                 }
//                 return done(null, user);
//             });
//         }
//     )
// );

ROUTE.get(
    "/",
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    }),
    async (req, res, next) =>
    {
        console.info("req.session", req)
        // const request  = req.body
        // const data     = await updatePassword(request)
        res.send(req.passport)
    }
)


export default ROUTE
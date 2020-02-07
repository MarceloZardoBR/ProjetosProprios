const passport = require('passport');
const passjwt = require('passport-jwt');
const config = require('./config/config');
const DesignModel = require('./models/design');

const { ExtractJwt, Strategy } = passjwt;

module.exports = app => {
    const params = {
        secretOrKey: config.jwtSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    }
    
    const strategy = new Strategy(params, (payload, done) => {
            DesignModel.findById({id: payload.id})
                        .then(user => {
                            if(user){
                                done(null, {id: user._id});
                            } else {
                                done(null, false);
                            }
                        }).catch(err => console.log(err));
    })
    
    passport.use(strategy);

    return {
        initialize: () => passport.initialize(),
        authenticate: () => passport.authenticate('jwt', { session: false}),
    }

}

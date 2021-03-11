const UserSchema = require('../../modals/userSchema');

async function admin(req, res, next) {
    try {
        if (req.session.token.id) {
            const user = await UserSchema.findById(req.session.token.id);
            if (user.role == 'admin') {
                return next()
            }
        };
        res.redirect('/');

    } catch (err) {
        console.log(err.message)
    }
}

module.exports = admin;
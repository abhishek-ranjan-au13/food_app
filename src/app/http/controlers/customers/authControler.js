const bcrypt = require('bcrypt');
const path = require('path');
const layout = path.join('layouts')
const UserSchema = require('../../../modals/userSchema');
const jwt = require('jsonwebtoken');

const AuthControler = {
    getRegister(req, res) {
        try {
            res.render('auth/register', {
                layout
            })
        } catch (error) {
            console.log(error.message)
        }
    },

    async postRegister(req, res) {
        const { name, email, password } = req.body
        try {
            if (!name || !email || !password) {
                req.flash('error', 'All fields are requered !')
                res.redirect('/register')
            }
            // check user already exist or not
            let user = await UserSchema.findOne({ email: req.body.email });
            if (user) {
                req.flash('error', 'User already exist')
                return res.render('auth/register', {
                    layout,
                    // ...req.body
                })
            }
            // if new user
            // encrypt the password
            const salt = await bcrypt.hash(password, 10);
            //save in Database
            user = new UserSchema({
                name: name,
                email: email,
                password: salt
            })
            await user.save();
            return res.redirect('/login')
        } catch (error) {
            console.log(error.message)
        }
    },

    getLogin(req, res) {
        res.render('auth/login', {
            layout
        })
    },

    async postLogin(req, res) {
        const { email, password } = req.body
        try {
            const user = await UserSchema.findOne({ 'email': email });
            if (!user) {
                req.flash('error', 'Invalid email')
                return res.render('auth/login', {
                    layout,
                    ...req.body
                })
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                req.flash('error', 'Invalid password')
                return res.render('auth/login', {
                    layout,
                    ...req.body
                })
            }

            const token = jwt.sign({ id: user._id }, 'jwt_Secret', { expiresIn: 3600 })
            if (!token) {
                req.flash('error', 'Something went wrong')
                res.render('auth/login', {
                    layout,
                    ...req.body
                })
            };
            const decoded = jwt.verify(token, 'jwt_Secret');
            if (decoded) {
                req.session.token = decoded;
                if (user.role == 'admin') {
                    return res.redirect('/admin')
                }
                res.redirect('/')
            }

        } catch (error) {
            console.log(error.message)
        }
    },

    logout(req, res) {
        delete req.session.token;
        res.redirect('/login')
    }

}

module.exports = AuthControler;



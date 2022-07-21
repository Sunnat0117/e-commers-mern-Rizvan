const User = require('../models/user.model')
const jwt = require('jsonwebtoken')


exports.signup = (req, res) => {
    User.findOne({
            email: req.body.email
        })
        .exec((error, user) => {
            if (user) {
                return res.status(400).send('User already exected')
            }

            const {
                firstName,
                lastName,
                email,
                password
            } = req.body

            const _user = new User({
                firstName,
                lastName,
                email,
                password,
                userName: Math.random().toString()
            })

            _user.save((error, data) => {
                if (error) {
                    return rea.status(400).json({
                        message: 'Something is wrong'
                    })
                }

                if (data) {
                    return res.status(201).json({
                        message: "User save successfully !!!"
                    })
                }
            });
        })
}


exports.signin = (req, res) => {
    User.findOne({
            email: req.body.email
        })
        .exec((error, user) => {
            if (error) return res.status(400).json({
                Error: error
            });
            if (user) {
                if (user.authenticate(req.body.password)) {
                    const token = jwt.sign({
                        _id: user._id
                    }, process.env.JWT_SECRET_KEY, {
                        expiresIn: '1d'
                    })
                    const {
                        _id,
                        firstName,
                        lastName,
                        email,
                        role,
                        fullname
                    } = user
                    res.status(200).json({
                        token,
                        user: {
                            _id,
                            firstName,
                            lastName,
                            fullname,
                            email,
                            role
                            
                        }

                    })

                } else {
                    return res.status(400).json({
                        message: "Invalid password"
                    })
                }

            } else {
                return res.status(400).json({
                    message: 'Something went wrong'
                })
            }
        })
}


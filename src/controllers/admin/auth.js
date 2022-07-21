const User = require('../../models/user.model')
const jwt = require('jsonwebtoken')


exports.signup = (req, res) => {
    User.findOne({
            email: req.body.email
        })
        .exec((error, user) => {
            if (user) {
                return res.status(400).send('Admin already exected')
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
                userName: Math.random().toString(),
                role : "admin"
            })

            _user.save((error, data) => {
                if (error) {
                    return rea.status(400).json({
                        message: 'Something is wrong'
                    })
                }

                if (data) {
                    return res.status(201).json({
                        message: "Admin save successfully !!!"
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
                if (user.authenticate(req.body.password) && user.role === "admin") {
                    const token = jwt.sign({
                        _id: user._id,
                        role : user.role
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


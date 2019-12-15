const joi = require('joi')

exports.validate_user = (req, res, next) => {
    let schema = joi.object().keys({
        username: joi.string().required().max(5),
        password: joi.string().required().min(8)
    })

    joi.validate(req.body, schema)
        .then(validate => {
            next()
        })
        .catch(err => {
            res.render("login", { message: err.details })
        })
}
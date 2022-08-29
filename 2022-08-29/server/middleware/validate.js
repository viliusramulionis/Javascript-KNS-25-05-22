import Joi from 'joi'

const validate = (schema, req, next) => {
    const options = {
        abortEarly: true,
        stripUnknown: true
    }
    const {error, value} = schema.validate(req.body, options)

    if(error)
        return next('Neteisingai užpildyti laukeliai')

    req.body = value
    next()
}

export const postValidator = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().min(5).max(255).required(),
        content: Joi.string(),
        image: Joi.string()
    })

    validate(schema, req, next)
}

export default validate
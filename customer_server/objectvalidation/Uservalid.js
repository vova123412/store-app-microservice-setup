import Joi from 'joi'
const schema = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().min(2).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
})
export default schema





import Joi from 'joi'
import JoiObjectId from "joi-objectid";
const myJoiObjectId = JoiObjectId(Joi);
const schema = Joi.object().keys({
    userid: myJoiObjectId().required(),
    name: Joi.string().required(),
    price: Joi.number().required()
})
export default schema


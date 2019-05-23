import Joi from '@hapi/joi';

class Validator {
    static loginData(data){
        const schema = Joi.object().keys({
            username: Joi.string().min(3).max(20).required(),
            password: Joi.string().min(3).max(50),
            date : Joi.string().required()
        })
        return Joi.validate(data, schema);
    }
}

export default Validator;
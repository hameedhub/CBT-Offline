import Joi from '@hapi/joi';

class Validator {
    static loginData(data){
        const schema = Joi.object().keys({
            username: Joi.string().min(3).max(20).required(),
            password: Joi.string().min(3).max(50).required(),
            date : Joi.string().required()
        })
        return Joi.validate(data, schema);
    }
    static questionData(data){
        const schema = Joi.object().keys({
            subject: Joi.string().required(),
            class: Joi.required(),
            term : Joi.string().required(),
            date : Joi.required(),
            questions: Joi.required()
        })
        return Joi.validate(data, schema);
    }
    static viewQuestion(data){
        const schema = Joi.object().keys({
            subject: Joi.string().required(),
            class: Joi.required(),
            term : Joi.string().required(),
            date : Joi.required()
        })
        return Joi.validate(data, schema);
    }
    static sessionLogin(data){
        const schema = Joi.object().keys({
            studentId: Joi.string().required(),
            name: Joi.string(),
            subject: Joi.string().required(),
            class: Joi.required(),
            term : Joi.string().required(),
            date : Joi.string().required()
        })
        return Joi.validate(data, schema);
    }
}

export default Validator;
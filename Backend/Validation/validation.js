const Joi = require("joi");

const studentValidator = (data) => {
    const schema = Joi.object({
        id: Joi.number().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        stuClass: Joi.string().min(1).required(),
        subject: Joi.array(),
    })
    return schema.validate(data);
}

module.exports.studentValidator = studentValidator;
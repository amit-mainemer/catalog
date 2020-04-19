const Joi = require('@hapi/joi');

module.exports = (author) => {
 
    const schema = Joi.object({
      first_name: Joi.string().min(2).max(255).required(),
      last_name: Joi.string().min(2).max(255).required(),
      email: Joi.string().min(6).max(255).required().email(),
      phone: Joi.string().min(9).max(10).required().regex(/^0[2-9]\d{7,8}$/)
    });
   
    return schema.validate(author);
}

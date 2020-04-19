const Joi = require('@hapi/joi');

module.exports = (book) => {
 
    const schema = Joi.object({
      name: Joi.string().min(2).max(255).required(),
      book_image: Joi.string().min(6).max(1024).required(),
      description: Joi.string().min(6).max(1024).required(),
      authorId: Joi.string().required()
    });
   
    return schema.validate(book);
}



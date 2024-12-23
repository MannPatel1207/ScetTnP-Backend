const Joi = require("joi");

//patterns
const objectIdPattern = /^[0-9a-fA-F]{24}$/;
const contactNumberPattern = /^\d{10}$/;
const countryCodePattern = /^\+\d{1,4}$/;


//schema
const companyValidationSchema = Joi.object({
    name : Joi.string().required(),

    logo : Joi.object({
        link : Joi.string().required(),
        file_name : Joi.string().required()
    }),
    link : Joi.string().required(),

    desc : Joi.string().required(),
    
    contact_no: Joi.object({
        country_code: Joi.string().pattern(countryCodePattern).default("+91"), 
        number: Joi.string().pattern(contactNumberPattern).required() 
    }).required(),

    address :Joi.string().required(),

    offers : Joi.array().items(Joi.string().pattern(objectIdPattern))
    .messages({'string.pattern.base': 'Invalid applicant ID format.'}), 
});

module.exports = companyValidationSchema;
const Joi = require("joi");

//patterns
const objectIdPattern = /^[0-9a-fA-F]{24}$/;
const contactNumberPattern = /^\d{10}$/;
const countryCodePattern = /^\+\d{1,4}$/;
const enrollmentNoPattern = /^ET\d{2}BT[A-Z]{2}\d{3}$/;


//schema
const offerValidationSchema = Joi.object({
    enrollment_no: Joi.string().pattern(enrollmentNoPattern).required(),

    name : Joi.string().required(),

    birth_date: Joi.date().required(),

    email : Joi.string().email().required(),

    contact_no: Joi.object({
        country_code: Joi.string().pattern(countryCodePattern).default("+91"), 
        number: Joi.string().pattern(contactNumberPattern).required() 
    }).required(),

    gender: Joi.string().valid('male', 'female', 'other').required(),

    cast: Joi.string().required(),

    address: Joi.string().required(),

    result :Joi.object({
        ssc: Joi.object({
            percentage: Joi.number().required(),
            passing_year: Joi.number().required()
        }),
        hsc: Joi.object({
            percentage: Joi.number().required(),
            passing_year: Joi.number().required()
        }),
        diploma: Joi.object({
            percentage: Joi.number().required(),
            semwise_result: Joi.array().items(Joi.number()).max(6).required(),
            backlog: Joi.array().items(Joi.number()).required(),
            passing_year: Joi.number().required()
        }),
        degree: Joi.object({
            percentage: Joi.number().required(),
            semwise_result: Joi.array().items(Joi.number()).max(8).required(),
            backlog: Joi.array().items(Joi.number()).required(),
            passing_year: Joi.number().required()
        })
    }),

    applied: Joi.array().items(Joi.string().pattern(objectIdPattern)).required(),

    selected: Joi.array().items(Joi.object({
        offer: Joi.string().pattern(objectIdPattern).required(),
        salary: Joi.number().required()
    })).required()
});

module.exports = offerValidationSchema;
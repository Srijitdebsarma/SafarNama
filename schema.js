//Schema for JOI schema validator will be here

const Joi = require('joi');


// Define Joi schema
module.exports.listingSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    travel: Joi.string().allow('', null), // Allow empty string or null for travel
    speciality: Joi.string().allow('', null), // Allow empty string or null for speciality
    food: Joi.string().allow('', null), // Allow empty string or null for food
    expense: Joi.number().min(0).required(),
    image: Joi.string().allow('', null), // Allow empty string or null for image
}).forbidden(['$__']); // Disallow fields starting with "$"

//review schema
module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required(),
        
    }).required()  
})


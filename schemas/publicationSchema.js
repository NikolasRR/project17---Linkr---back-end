import joi from "joi";

const publicationSchema = joi.object({
    url: joi.string().uri().required(),
    text: joi.string().allow("")
})

export default publicationSchema;
export function schemaMiddleware(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error)
        {
            const errorMessages = error.details.map(e => e.message);
            console.log(errorMessages);
            return res.status(400).send(errorMessages);
        }

        next();
    }
}
const validate = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            next();
        } catch (e) {
            res.status(400).json({ success: false, errors: e.errors });
        }
    };
};

export { validate };

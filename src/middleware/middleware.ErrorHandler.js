const jsonErrorHandler = (err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({
            success: false,
            status: 400,
            message: 'El formato JSON de la solicitud no es válido.',
            details: 'Se detectaron caracteres inválidos, falta de comillas o una estructura JSON mal formada.'
        });
    }
    next();
};

module.exports = jsonErrorHandler;
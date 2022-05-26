const success = (req, res, message, body, status) => {
    return res.status(status).json({
        error: null,
        message,
        body
    })
}

const error = (req, res, message, status) => {
    return res.status(status).json({
        error: status,
        message
    })
}

module.exports = {
    success,
    error
}
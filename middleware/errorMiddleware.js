const errorMiddleware = (err, req, res, next) => {
    console.log(err);

    if(err.name === "CastError"){
        return res.status(400).json({
            success: false,
            message: "Invalid ID format."
        });
    }

    if(err.code === 11000){
        const field = Object.keys(err.keyValue)[0];
        return res.status(409).json({
            success: false,
            message: `${field} already exists.`
        });
    }

    res.status(500).json({
        success: false,
        message: "Internal server error."
    });
}

module.exports = errorMiddleware;
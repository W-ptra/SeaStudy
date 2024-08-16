const jwt = require("jsonwebtoken");

exports.createJSONToken = (response) => {
    return jwt.sign(
        { id: response.user.id, role: response.user.role },
        process.env.KEY,
        { expiresIn: "1h" }
    );
};

exports.validateJSONToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.KEY, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
};

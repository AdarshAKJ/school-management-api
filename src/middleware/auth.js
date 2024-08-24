import jwt from 'jsonwebtoken';

const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ status: "error", message: "Please authenticate." });
    }

    try {
        const decoded = jwt.verify(token, "secretkey");
        req.userId = decoded.id; // Assuming `id` is the key in your JWT payload
        next();
    } catch (error) {
        return res.status(401).json({ status: "error", message: "Invalid token. Please authenticate." });
    }
};

export default authenticateUser;

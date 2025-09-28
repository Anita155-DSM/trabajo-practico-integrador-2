import { verifyToken } from "../helpers/jwt.helpers.js";

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(403).json({ msg: "No autorizado" });
    }
    try {
        const decoded = await verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ msg: "Token inválido" });
    }
};

export default authMiddleware;
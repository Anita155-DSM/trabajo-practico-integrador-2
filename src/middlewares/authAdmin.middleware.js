import authMiddleware from "./auth.middleware.js";
// Middleware para verificar si el usuario es admin
const authAdminMiddleware = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ msg: "Acceso denegado: solo administradores" });
    }
    next();
}

export default authAdminMiddleware;
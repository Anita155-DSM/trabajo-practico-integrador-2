import authMiddleware from "./auth.middleware.js";

const ownerOrAdminMiddleware = async (req, res, next) => {
    // Verifica si el usuario autenticado es el dueño del recurso o un administrador
    if (!req.user) {
        return res.status(401).json({ msg: "no autorizado" });
    }//si es admin o el mismo usuario, puede continuar
    if (req.user.role === 'admin' || req.user.id === req.params.id) {
        return next();
    } else{
        return res.status(403).json({ msg: "no autorizado" });
    }
};

export default ownerOrAdminMiddleware
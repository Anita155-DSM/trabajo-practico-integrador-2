import authMiddleware from "./auth.middleware.js";

export const authOwnerMiddleware = (req, res, next) => {
    // Verifica si el usuario autenticado es el dueño del recurso
    if (!req.user || req.user.id !== req.params.id) {
        return res.status(403).json({ msg: "Acceso denegado: solo el propietario puede realizar esta acción" });
    }
    next();
};


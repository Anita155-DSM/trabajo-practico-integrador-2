import userModel from "../models/user.models.js";
import articleModel from "../models/article.models.js"
import commentModel from "../models/comment.models.js"

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({ deletedAt: null }).populate('articles').populate('comments');
        res.status(200).json({
            msg: "Lista de usuarios",
            data: users,
            ok: true
        });
    } catch (error) {
        res.status(500).json({ msg: "Error al obtener usuarios", error });
    }
}

const getUserByID = async (req, res) => {
    const existingUser = await userModel.findById(req.params.id);
    if (!existingUser) {
        return res.status(404).json({msg: "El usuario no existe"});
    }
    try {
        const user = await userModel.findById(req.params.id).populate('articles').populate('comments');
        res.status(200).json({
            msg: "Usuario correspondinte:",
            data: user,
            ok: true
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error al obtener usuario",
            error,
            ok: false
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const existingUser = await userModel.findById(req.params.id);
        if (!existingUser) {
            return res.status(404).json({msg: "El usuario no existe"});
        }
        //compara los datos 
        const same = req.body.username === existingUser.username &&
        req.body.email === existingUser.email &&
        req.body.role === existingUser.role &&
        JSON.stringify(req.body.profile) === JSON.stringify(existingUser.profile);
        if (same){
            return res.status(400).json({msg: "No hay cambios para actualizar"});
        }
        //si hay cambios, actualiza
        const updatedUser = await userModel.findByIdAndUpdate(
            req.params.id, 
            req.body
        );
        res.status(200).json({
            msg: "usuario actualizado correctamente",
            data: updatedUser,
            ok: true
        })
    } catch (error) {
        res.status(500).json({msg: "Error al actualizar el usuario"})
    }
}

const deleteUser = async (req, res) => {
    try {
        const existingUser = await userModel.findById(req.params.id);
        if (!existingUser) {
            return res.status(404).json({msg: "El usuario no existe"});
        }
        //eliminación en cascada, elimina todos los artículos y comentarios del usuario
        await articleModel.deleteMany({ author: req.params.id })
        await commentModel.deleteMany({ author: req.params.id })
        //eliminación lógica
        const user = await userModel.findByIdAndUpdate(
            req.params.id,
            { deletedAt: new Date() }, //se lo considera algo asi como eliminado y se pone su fecha
            { new: true }
        );
        res.status(200).json({
            msg: "Usuario eliminado correctamente",
            data: user,
            ok: true
        });
    } catch (error) {
        res.status(500).json({msg: "Error al eliminar usuario"})
    }
}

export { getAllUsers, getUserByID, updateUser, deleteUser };
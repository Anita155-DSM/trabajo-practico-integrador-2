import userModel from "../models/user.models.js";

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();
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
        const user = await userModel.findByIdAndDelete(req.params.id);
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
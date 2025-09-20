import userModel from "../models/user.models.js";

const createUser = async (req, res) =>{
    const {username, email, password, role} = req.body;
    try {
        const newUser = await userModel.create({
            username,
            email,
            password,
            role
        })
        res.status(201).json({
            msg: "Usuario creado correctamente",
            data: newUser
        })
    } catch (error) {
        res.status(500).json({msg: "Error al crear usuario"})
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json({
            msg: "Lista de usuarios",
            data: users
        });
    } catch (error) {
        res.status(500).json({ msg: "Error al obtener usuarios", error });
    }
}

const getUserByID = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
        res.status(200).json({
            msg: "Usuario correspondinte:",
            data: user
        })
    } catch (error) {
        res.status(500).json({msg: "Error al obtener usuario", error})
    }
}

const updateUser = async (req, res) => {
    try {
        const user = await userModel.findByIdAndUpdate(
            req.params.id, 
            req.body)
        res.status(200).json({
            msg: "usuario actualizado correctamente",
            data: user
        })
    } catch (error) {
        res.status(500).json({msg: "Error al actualizar el usuario"})
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await userModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            msg: "Usuario eliminado correctamente",
            data: user
        });
    } catch (error) {
        res.status(500).json({msg: "Error al eliminar usuario"})
    }
}

export { createUser, getAllUsers, getUserByID, updateUser, deleteUser };
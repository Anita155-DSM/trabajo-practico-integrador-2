import jwt from "jsonwebtoken";
import { generateToken } from "../helpers/jwt.helpers.js";
import userModel from "../models/user.models.js";
import { hashPassword, comparePassword } from "../helpers/bcrypt.helpers.js";

//LOGICA REGISTRO
export const register = async (req, res) => {
    const { username, email, password, role, profile } = req.body;
    try {
        //validacion: de email y usuario único antes de crear un nuevo usuario
        const existingUser = await userModel.findOne({ $or: [{ email }, { username }] }); //$or operador de consulta de MongoDB
        if (existingUser) {
            return res.status(400).json({ msg: "el email o nombre de usuario ya esté en uso" });
        }
        const hassedPassword = await hashPassword(password);
        const newUser = await userModel.create({
            username,
            email,
            password: hassedPassword,
            role,
            profile: {
                firstName: profile.firstName,
                lastName: profile.lastName,
                biography: profile.biography,
                avatarUrl: profile.avatarUrl,
                birthDate: profile.birthDate
            }
        })
        res.status(201).json({
            msg: "Usuario creado correctamente",
            data: newUser,
            ok: true
        })
    } catch (error) {
        console.error(error); // Muestra el error en la consola
        res.status(500).json({
            msg: "Error al crear usuario",
            ok: false,
            error: error.message
        })
    }
}

//LOGICA LOGIN
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }
        const passwordValid = await comparePassword(password, user.password);
        if (!passwordValid) {
            return res.status(401).json({
                msg: "Contraseña o Email incorrectos",
                ok: false
            })
        }
        //generamos el token usando helper
        const token = generateToken({ id: user._id, role: user.role });
        //aca implementamos las cookies
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000 // 60 minutos * 60 segundos * 1000 milisegundos = 1 hora
        })
        res.status(200).json({
            msg: "Login exitoso",
            data: { token },
            ok: true
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error en el servidor",
            ok: false
        })
    }

}

//logica logout
export const logout = async (req, res) => {
    try {
        res.clearCookie("token"); //limpia la cookie del token
        res.status(200).json({
            msg: "Logout exitoso",
            ok: true
        })
    } catch (error) {
        res.status(500).json({
            msg: "error interno del servidor",
            ok: false
        })
    }
}

//logica profile(no me di cuenta en el tp)
export const profile = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: "Usuario no encontrado", ok: false });
        }
        res.status(200).json({ 
            msg: "Perfil obtenido correctamente", 
            data: user, 
            ok: true 
        });
    } catch (error) {
        res.status(500).json({
            msg: "error interno del servidor",
            error: error.message,
            ok: false
        });
    }
}
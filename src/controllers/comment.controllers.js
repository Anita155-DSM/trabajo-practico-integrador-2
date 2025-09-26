import commentModel from "../models/comment.models.js";
import articleModel from "../models/article.models.js";

const createComment = async (req, res) => {
    const { content, author, article} = req.body
    try {
        const newComment = commentModel.create({
            content,
            author,
            article
        })
        res.status(201).json({
            msg: "comentario creado correctamente",
            data: newComment
        })
    } catch (error) {
        res.status(500).json({msg: "error al crear comentario"})
    }
}

const getAllComments = async (req, res) => {
    try {
        const comments = await commentModel.find().populate('author').populate('article');
        res.status(200).json({
            data: comments,
            msg: "Lista de comentarios",
            ok: true
        });
    } catch (error) {
        res.status(500).json({
            msg: "error al obtener comentarios",
            ok: false
        });
    }
}

const getCommentByID = async (req, res) => {
    try {
        const comment = await commentModel.findById(req.params.id).populate('author').populate('article');
        if (!comment) {
            return res.status(404).json({msg: "comentario no encontrado"});
        }
        res.status(200).json({
            data: comment,
            msg: "comentario obtenido correctamente",
            ok: true
    });
    } catch (error) {
        res.status(500).json({
            msg: "error al obtener comentario",
            ok: false
        });
    }
}

const updateComment = async (req, res) => { 
    try {
        const comment = await commentModel.findByIdAndUpdate(req.params.id, req.body);
        if (!comment) {
            return res.status(404).json({ msg: "comentario no encontrado" });
        }
        res.status(200).json({
            msg: "comentario actualizado correctamente",
            data: comment,
            ok: true
        });
    } catch (error) {
        res.status(500).json({
            msg: "error al actualizar comentario",
            ok: false
        });
    }
}

const deleteComment = async (req, res) => {
    try {
        const comment = await commentModel.findByIdAndDelete(req.params.id)
        if (!comment) {
            return res.status(404).json({
                msg: "comentario no encontrado",
                ok: false
            });
        }
        res.status(200).json({
            msg: "comentario eliminado correctamente",
            data: comment,
            ok: true
        });
    } catch (error) {
        res.status(500).json({
            msg: "error al eliminar comentario",
            ok: false
        });
    }
}

export {createComment, getAllComments, getCommentByID, updateComment, deleteComment};
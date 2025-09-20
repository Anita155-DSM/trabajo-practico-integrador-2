import commentModel from "../models/comment.models.js";

const createComment = async (req, res) => {
    const { content, author, article} = req.body
    try {
        const newComment = commentModel.create({
            content,
            author,
            article
        })
        res.status(200).json({
            msg: "comentario creado correctamente",
            data: newComment
        })
    } catch (error) {
        res.status(500).json({msg: "error al crear comentario"})
    }
}

const getAllComments = async (req, res) => {
    try {
        const comments = await commentModel.find();
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({msg: "error al obtener comentarios"})
    }
}

const getCommentByID = async (req, res) => {
    try {
        const comment = await commentModel.findById(req.params.id)
        if (!comment) {
            return res.status(404).json({msg: "comentario no encontrado"});
        }
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({msg: "error al obtener comentario"});
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
            data: comment
        });
    } catch (error) {
        res.status(500).json({ msg: "error al actualizar comentario" });
    }
}

const deleteComment = async (req, res) => {
    try {
        const comment = await commentModel.findByIdAndDelete(req.params.id)
        if (!comment) {
            return res.status(404).json({msg: "comentario no encontrado"});
        }
        res.status(200).json({
            msg: "comentario eliminado correctamente",
            data: comment
        });
    } catch (error) {
        res.status(500).json({msg: "error al eliminar comentario"});
    }
}

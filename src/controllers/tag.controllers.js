import tagModel from "../models/tag.models.js";
import articleModel from "../models/article.models.js";

const createTag = async (req, res) => {
    const { name, description } = req.body;
    try {
        const newTag = await tagModel.create({
            name,
            description
        });
        res.status(201).json({
            msg: "Etiqueta creada correctamente",
            data: newTag,
            ok: true
        });
    } catch (error) {
        res.status(500).json({ msg: "Error al crear etiqueta" });
    }
};

const getAllTags = async (req, res) => {
    try {
        const tags = await tagModel.find().populate('article');
        res.status(200).json({
            data: tags,
            msg: "Lista de etiquetas",
            ok: true
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error al obtener etiquetas",
            ok: false
        });
    }
};

const getTagByID = async (req, res) => {
    try {
        const tag = await tagModel.findById(req.params.id).populate('article');
        if (!tag) {
            return res.status(404).json({ msg: "Etiqueta no encontrada" });
        }
        res.status(200).json({
            data: tag,
            msg: "Etiqueta obtenida correctamente",
            ok: true
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error al obtener etiqueta",
            ok: false
        });
    }
};

const updateTag = async (req, res) => {
    try {
        const tag = await tagModel.findByIdAndUpdate(req.params.id, req.body);
        if (!tag) {
            return res.status(404).json({ msg: "Etiqueta no encontrada" });
        }
        res.status(200).json({ 
            msg: "Etiqueta actualizada correctamente",
            data: tag,
            ok: true
        });
    } catch (error) {
        res.status(500).json({ 
            msg: "Error al actualizar etiqueta",
            ok: false 
        });
    }
};

const deleteTag = async (req, res) => {
    try {
        const tag = await tagModel.findByIdAndDelete(req.params.id);
        if (!tag) {
            return res.status(404).json({ 
                msg: "Etiqueta no encontrada",
                ok: false
            });
        }
        res.status(200).json({ 
            msg: "Etiqueta eliminada correctamente",
            ok: true
        });
    } catch (error) {
        res.status(500).json({ 
            msg: "Error al eliminar etiqueta",
            ok: false
        });
    }
};

export { createTag, getAllTags, getTagByID, updateTag, deleteTag };
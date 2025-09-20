import tagModel from "../models/tag.models.js";

const createTag = async (req, res) => {
    const { name, description } = req.body;
    try {
        const newTag = await tagModel.create({
            name,
            description
        });
        res.status(200).json({
            msg: "Etiqueta creada correctamente",
            data: newTag
        });
    } catch (error) {
        res.status(500).json({ msg: "Error al crear etiqueta" });
    }
};

const getAllTags = async (req, res) => {
    try {
        const tags = await tagModel.find();
        res.status(200).json(tags);
    } catch (error) {
        res.status(500).json({ msg: "Error al obtener etiquetas" });
    }
};

const getTagByID = async (req, res) => {
    try {
        const tag = await tagModel.findById(req.params.id);
        if (!tag) {
            return res.status(404).json({ msg: "Etiqueta no encontrada" });
        }
        res.status(200).json(tag);
    } catch (error) {
        res.status(500).json({ msg: "Error al obtener etiqueta" });
    }
};

const updateTag = async (req, res) => {
    try {
        const tag = await tagModel.findByIdAndUpdate(req.params.id, req.body);
        if (!tag) {
            return res.status(404).json({ msg: "Etiqueta no encontrada" });
        }
        res.status(200).json({ msg: "Etiqueta actualizada correctamente" });
    } catch (error) {
        res.status(500).json({ msg: "Error al actualizar etiqueta" });
    }
};

const deleteTag = async (req, res) => {
    try {
        const tag = await tagModel.findByIdAndDelete(req.params.id);
        if (!tag) {
            return res.status(404).json({ msg: "Etiqueta no encontrada" });
        }
        res.status(200).json({ msg: "Etiqueta eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ msg: "Error al eliminar etiqueta" });
    }
};

export { createTag, getAllTags, getTagByID, updateTag, deleteTag };
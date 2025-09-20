import articleModel from "../models/article.models.js";

const createArticle = async (req,res) => {
    const {title, content, excerpt, status, tags, author} = req.body;
    try {
        const newArticle = articleModel.create({
            title,
            content,
            excerpt,
            status,
            tags,
            author
        })
        res.status(200).json({
            msg: "articulo creado correctamente",
            data: newArticle
        })
    } catch (error) {
        res.status(500).json({msg: "error al crear articulo"})
    }
}

const getAllArticles = async (req, res) => {
    try {
        const articles = await articleModel.find();
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({msg: "error al obtener articulos"})
    }
}

const getArticleByID = async (req, res) => {
    try {
        const article = await articleModel.findById(req.params.id);
        if (!article) {
            return res.status(404).json({msg: "articulo no encontrado"});
        }
        res.status(200).json(article);
    } catch (error) {
        res.status(500).json({msg: "error al obtener articulo"});
    }
}

const updateArticle = async (req, res) => {
    try {
        const article = await articleModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!article) {
            return res.status(404).json({msg: "articulo no encontrado"});
        }
        res.status(200).json({msg: "articulo actualizado correctamente"});
    } catch (error) {
        res.status(500).json({msg: "error al actualizar articulo"});
    }
}

const deleteArticle = async (req, res) => {
    try {
        const article = await articleModel.findByIdAndDelete(req.params.id);
        if (!article) {
            return res.status(404).json({msg: "articulo no encontrado"});
        }
        res.status(200).json({msg: "articulo eliminado correctamente"});
    } catch (error) {
        res.status(500).json({msg: "error al eliminar articulo"});
    }
}

export {createArticle, getAllArticles, getArticleByID, updateArticle, deleteArticle};
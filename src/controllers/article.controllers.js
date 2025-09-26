import articleModel from "../models/article.models.js";

const createArticle = async (req,res) => {
    const {title, content, excerpt, status, tags, author} = req.body;
    try {
        const articleExisting = await articleModel.findOne({title});
        if (articleExisting) {
            return res.status(400).json({msg: "El articulo ya existe"});
        }
        const newArticle = articleModel.create({
            title,
            content,
            excerpt,
            status,
            tags,
            author
        })
        res.status(201).json({
            msg: "articulo creado correctamente",
            data: newArticle,
            ok: true
        })
    } catch (error) {
        res.status(500).json({
            msg: "error al crear articulo",
            ok: false
        })
    }
}

const getAllArticles = async (req, res) => {
    try {
        const articles = await articleModel.find().populate('author').populate('tags');
        res.status(200).json({
            msg: "Lista de articulos",
            data: articles,
            ok: true
        });
    } catch (error) {
        res.status(500).json({
            msg: "error al obtener articulos",
            ok: false
        })
    }
}

const getArticleByID = async (req, res) => {
    try {
        const article = await articleModel.findById(req.params.id).populate('author').populate('tags');
        if (!article) {
            return res.status(404).json({
                msg: "articulo no encontrado",
                ok: false
            });
        }
        res.status(200).json({
            data: article,
            msg: "articulo obtenido correctamente",
            ok: true
        });
    } catch (error) {
        res.status(500).json({
            msg: "error al obtener articulo",
            ok: false
        });
    }
}

const updateArticle = async (req, res) => {
    try {
        const article = await articleModel.findByIdAndUpdate(req.params.id, req.body);
        if (!article) {
            return res.status(404).json({
                msg: "articulo no encontrado",
                ok: false
            });
        }
        res.status(200).json({
            msg: "articulo actualizado correctamente",
            data: article,
            ok: true
        });
    } catch (error) {
        res.status(500).json({
            msg: "error al actualizar articulo",
            ok: false
        });
    }
}

const deleteArticle = async (req, res) => {
    try {
        const article = await articleModel.findByIdAndDelete(req.params.id);
        if (!article) {
            return res.status(404).json({
                msg: "articulo no encontrado",
                ok: false
            });
        }
        res.status(200).json({
            msg: "articulo eliminado correctamente",
            data: article,
            ok: true
        });
    } catch (error) {
        res.status(500).json({msg: "error al eliminar articulo"});
    }
}

export {createArticle, getAllArticles, getArticleByID, updateArticle, deleteArticle};
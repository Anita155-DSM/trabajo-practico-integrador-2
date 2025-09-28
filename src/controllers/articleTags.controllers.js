import articleModel from "../models/article.models.js";
import tagModel from "../models/tag.models.js";

//logica agregar un tag
export const createArticleTag = async (req, res) => {
    const { articleId, tagId } = req.params;
    try {
        const article = await articleModel.findById(articleId);
        const tag = await tagModel.findById(tagId);
        if (!article || !tag) {
            return res.status(404).json({
                msg: "Artículo o etiqueta no encontrados",
                ok: false
            })
        }
        const newTaginArticle = await articleModel.findByIdAndUpdate(
            articleId,
            {
                $push: { tags: tagId }, //lo apropiado es usar $push propio del mongo para agregar un elemento a un array(en este caso el array de tags en el modeloArticle)
            },//añade el tagId al array tags del articulo
            { new: true } //devuelve el articulo actualizado RECORDAR ESTOS PASOOS:)
        );
        return res.status(200).json({
            msg: "Etiqueta agregada al articulo correctamente",
            data: newTaginArticle,
            ok: true
        })
         /*   article.tags.push(tag._id); //esto le dice al modelo de article que tiene el array de tags, que guarde el id del tag en ese array. NO OLVIDAR    
              await article.save();
              res.status(200).json({   //otro metodo
                  msg: "Etiqueta agregada al artículo correctamente",
                  data: article,
                  ok: true
              });  */
        } catch (error) {
            console.error("Error al agregar etiqueta al artículo:", error);
            res.status(500).json({
                msg: "Error al agregar etiqueta al artículo",
                ok: false
            });
        }
    }
//logica eliminar un tag
export const deleteArticleTag = async (req, res) => {
        const { articleId, tagId } = req.params;
        try {
            const article = await articleModel.findById(articleId);
            const tag = await tagModel.findById(tagId);
            if (!article || !tag) {
                return res.status(404).json({
                    msg: "Artículo o etiqueta no encontrados",
                    ok: false
                })
            }
            const removeTag = await articleModel.findByIdAndUpdate(
                articleId, 
                {
                    $pull: { tags: tagId } //decimos el metodo, donde vamosa  guardar y que vamos a guardar
                }
            )
        } catch (error) {
            console.error("Error al agregar etiqueta al artículo:", error);
            res.status(500).json({
                msg: "Error al agregar etiqueta al artículo",
                ok: false
            });
        }
    }
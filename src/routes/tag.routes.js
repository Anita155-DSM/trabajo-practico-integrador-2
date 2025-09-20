import { createTag, getAllTags, getTagByID, updateTag, deleteTag } from "../controllers/tag.controllers.js";
import { Router } from "express";

const routerTag = Router();

routerTag.post('/tags', createTag);
routerTag.get('/tags', getAllTags);
routerTag.get('/tags/:id', getTagByID);
routerTag.put('/tags/:id', updateTag);
routerTag.delete('/tags/:id', deleteTag);

export default routerTag;
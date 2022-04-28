import  express  from "express";
import { homePage } from "../controllers/index.controllers.js";
import blogRoute from "./blog.routes.js";

const router = express.Router();

router.get('/', homePage);
router.get('/blog', blogRoute);


export default router;
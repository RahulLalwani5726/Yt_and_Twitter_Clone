import { userRegister } from "../controllers/User/Register.controllers.js";
import {Router} from "express"
import {Upload} from "../middlewares/multer.middleware.js"

const routes = Router();
 // Upload is middleWare
routes.route("/register").post(Upload.fields([
    {
        name: "avatar",
        maxCount: 1
    },
    {
        name:"coverimage",
        maxCount:1
    }
]),userRegister)

export default routes;
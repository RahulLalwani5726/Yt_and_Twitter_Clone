import { userRegister , userLogin , userLogout} from "../controllers/User.controllers.js";
import {Router} from "express"
import {Upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
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

routes.route("/login").post(userLogin);

routes.route("/logout").post(verifyJWT,userLogout);

export default routes;
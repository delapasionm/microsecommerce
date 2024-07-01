import * as authController from "../controllers/AuthController";
import router from "./UserRoutes";

router.post('/login', authController.login)

router.post('/register', authController.register)


export default router;

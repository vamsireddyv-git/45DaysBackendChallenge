import express from 'express'
import { refreshTokenAccess } from '../controllers/refreshTokenAccess.js';
import { logout } from '../controllers/logout.js';

const refreshRouter = express.Router();

refreshRouter.post("/refresh",refreshTokenAccess)
refreshRouter.post("/logout",logout)

export default refreshRouter;
import express from 'express'
import { refreshTokenAccess } from '../controllers/refreshTokenAccess.js';

const refreshRouter = express.Router();

refreshRouter.post("/refresh",refreshTokenAccess)

export default refreshRouter;
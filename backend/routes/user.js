import express from 'express';
import { editAddress } from '../controllers/user.js';

const router = express.Router();

router.post('/', editAddress);

export default router;
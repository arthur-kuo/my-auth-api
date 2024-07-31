import express from 'express';
import {
  registerUser,
  changePassword,
  loginUser,
  validateRefreshToken,
  getDummyData
} from '../controllers/userController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', registerUser);
router.post('/change-password', authenticateToken, changePassword);
router.post('/login', loginUser);
router.post('/validate-refresh-token', validateRefreshToken);
router.get('/dummy-data', authenticateToken, getDummyData);

export default router;

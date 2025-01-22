import express from 'express'
const router = express.Router();
import {transactions } from '../controllers/transactions.js';

router.get("/", transactions);

export default router;
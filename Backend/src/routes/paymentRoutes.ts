import express from "express";
import { initiatePayU, verifyPayU } from "../controllers/paymentController";

const router = express.Router();

router.post("/payu/initiate", initiatePayU);
router.post("/payu/verify", verifyPayU);

export default router;

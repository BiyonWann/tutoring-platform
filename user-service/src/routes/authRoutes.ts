import { Router } from 'express';
import { signup, login } from '../controllers/authController';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/auth';

const router = Router();

router.post('/signup', [
    body("firstName").notEmpty().withMessage("Firstname is required!"),
    body("lastName").notEmpty().withMessage("Lastname is Required!"),
    body("email")
        .notEmpty().withMessage("Email is required!")
        .isEmail().withMessage("Enter valid email!")
        .normalizeEmail(),
    body("password")
        .notEmpty().withMessage("Password is required!")
        .isLength({ min: 8 }).withMessage("Password must be atleast 8 characters long")
        .matches(/[A-Z]/).withMessage("Password must contain atleast one uppercase letter")
        .matches(/[0-9]/).withMessage("Password must contain atleast one number")
], validateRequest, signup);
router.post('/login', [
    body("email")
        .notEmpty().withMessage("Email is required!")
        .isEmail().withMessage("Enter valid email!")
        .normalizeEmail(),
    body("password")
        .notEmpty().withMessage("Password is required!")
], validateRequest,login);

export default router;  
import { Request, Response } from 'express';
import { signup as signupService, login as loginService } from '../services/authService';

export const signup = async (req: Request, res: Response) => {
    try {
        const { email, password, lastName, firstName } = req.body;
        if(!email ||!password||!lastName||!firstName) return res.status(400).json({error:"All fields are required!"})
        const result = await signupService(email, password, firstName,lastName);
        res.status(201).json(result);
    } catch (error: any) {
        res.status(400).json({ error: error.message || 'Signup failed' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const result = await loginService(email, password);
        res.json(result);
    } catch (error: any) {
        res.status(401).json({ error: error.message || 'Login failed' });
    }
};
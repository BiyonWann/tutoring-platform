import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { validationResult} from 'express-validator'

export interface AuthRequest extends Request {
    user?: { id: string; email: string };
}
export interface ErrorFormatted{
      type: string,
      value: string,
      msg: string,
      path: string,
      location: string
}
export const authMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): void => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        res.status(401).json({ success: false,endpoint: req.url,error: 'Not Authorized!' });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        req.user = decoded as { id: string; email: string };
        next();
    } catch (error) {
        res.status(401).json({success:false, endpoint:req.url, error: 'Invalid token' });
    }
};

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    
    const errors = validationResult(req)
    
    if (!errors.isEmpty()) {
        const formattedErrors: Record<string, string[]> = {}
        // console.log(errors)
        errors.array().forEach(err => {
            const error = err as ErrorFormatted
            console.log(err)
            if (!formattedErrors[error.path]) {
                formattedErrors[error.path] = []
            }
            formattedErrors[error.path].push(error.msg)
        })
        return res.status(400).json({
            success: false,
            endpoint:req.url,
            errors: formattedErrors
        })  
    } 
    next()
}
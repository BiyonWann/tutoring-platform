import prisma from "../utils/prisma"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const signup = async (email: string, password: string, firstName: string, lastName:string) => {
    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        throw new Error('Email already in use');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            firstName,
            lastName
        },
    });

    return { message: 'User created successfully', userId: user.id };
};

export const login = async (email: string, password: string) => {
    // Find user by email
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        throw new Error('Invalid email or password');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new Error('Invalid email or password');
    }

    // Generate JWT token
    const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '24h' }
    );

    return { message: 'Login successful', token, userId: user.id,user:{name: `${user.firstName} ${user.lastName}`,email:user.email,photo: ""} };
};
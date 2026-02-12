import prisma from "../utils/prisma";
export async function getUserProfile(userId: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName:true,
                createdAt: true,
                updatedAt: true,
            },
        });
        return user;
    } catch (error) {
        throw new Error(`Failed to fetch user profile: ${error}`);
    }
}

export async function getAllUsers() {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        return users;
    } catch (error) {
        throw new Error(`Failed to fetch users: ${error}`);
    }
}

export async function deleteAllUsers() {
    try {
        const result = await prisma.user.deleteMany({});
        return result;
    } catch (error) {
        throw new Error(`Failed to delete users: ${error}`);
    }
}

export async function deleteUserById(userId: string) {
    try {
        const user = await prisma.user.delete({
            where: { id: userId },
        });
        return user;
    } catch (error) {
        throw new Error(`Failed to delete user: ${error}`);
    }
}
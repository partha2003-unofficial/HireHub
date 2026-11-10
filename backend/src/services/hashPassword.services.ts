import bcrypt from 'bcrypt';

export function hashPassword(password: string) {
    return bcrypt.hashSync(password, 10)
}

export function verifyHashPassword(originalPassword: string, verifyPassword: string) {
    return bcrypt.compare(verifyPassword,originalPassword);
}
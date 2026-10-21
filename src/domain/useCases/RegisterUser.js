/*
 * Registra usuarios validando sus datos y guardando la contraseña como hash.
 */
import { User } from "../entities/User.js";

export class RegisterUser {
    constructor(userRepository, passwordHasher) {
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
    }

    async execute(userData = {}) {
       const existingUser =
    await this.userRepository.findByEmail(
        userData.email
    );

if (existingUser) {
            throw new Error("Ya existe un usuario con este correo.");
        }


        const passwordData = 
        await this.passwordHasher.hash(
            userData.password);

        const user = new User({
             name: userData.name,
             email: userData.email,
             password: passwordData,
             identificacion: userData.identificacion,
             role: userData.role,
        });
        return this.userRepository.save(user);
    }
}

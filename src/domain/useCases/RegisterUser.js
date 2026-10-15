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
        const name = String(userData.name || "").trim();
        const email = String(userData.email || "").trim().toLowerCase();
        const password = String(userData.password || "");
        const role = String(userData.role || "").trim();

        if (!name || !email || !password) {
            throw new Error("Completa todos los campos obligatorios.");
        }

        if (!["Estudiante", "Profesor"].includes(role)) {
            throw new Error("Debes seleccionar si eres Estudiante o Profesor.");
        }

        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new Error("Ya existe un usuario con este correo.");
        }

        if (!this.passwordHasher || typeof this.passwordHasher.hash !== "function") {
            throw new Error("No está disponible la protección de contraseñas.");
        }

        const passwordHash = await this.passwordHasher.hash(password);
        if (!passwordHash || typeof passwordHash !== "string") {
            throw new Error("No se pudo proteger la contraseña.");
        }

        const user = new User({ name, email, passwordHash, role });
        return this.userRepository.save(user);
    }
}

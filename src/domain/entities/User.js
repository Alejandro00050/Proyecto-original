/*
 * Entidad de usuario del Gestor Escolar.
 * Valida los datos básicos y el tipo de usuario permitido.
 */
export class User {
    constructor({ id = null, name, email, passwordHash, role }) {
        const validRoles = ["Estudiante", "Profesor"];
        const cleanName = String(name || "").trim();
        const cleanEmail = String(email || "").trim().toLowerCase();
        const cleanHash = String(passwordHash || "").trim();

        if (!cleanName) {
            throw new Error("El nombre es obligatorio.");
        }

        if (!cleanHash) {
            throw new Error("No se pudo proteger la contraseña.");
        }

        if (!validRoles.includes(role)) {
            throw new Error("Debes seleccionar si eres Estudiante o Profesor.");
        }

        this.id = id;
        this.name = cleanName;
        this.email = cleanEmail;
        this.passwordHash = cleanHash;
        this.role = role;
    }
}

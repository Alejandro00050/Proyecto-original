/*
 * Busca el usuario y verifica la contraseña.
 */
export class LoginUser {
    constructor(userRepository, passwordHasher) {
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
    }

    async execute(credentials) {
        const email = String(credentials.email || "").trim().toLowerCase();
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new Error("Correo o contraseña incorrectos.");
        }

        // Las cuentas nuevas guardan passwordHash. La rama de compatibilidad
        // permite iniciar sesión con cuentas antiguas guardadas localmente.
        let valid = false;
        if (user.passwordHash) {
            valid = await this.passwordHasher.verify(
                String(credentials.password || ""),
                user.passwordHash
            );
        } else if (user.password) {
            valid = user.password === credentials.password;
        }

        if (!valid) {
            throw new Error("Correo o contraseña incorrectos.");
        }

        return user;
    }
}

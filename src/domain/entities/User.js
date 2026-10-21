/**
 * Esta clase NO sabe:
 * - cómo se guarda el usuario
 * - dónde se guarda
 * - cómo funciona Firestore
 * - cómo funciona LocalStorage
 * - cómo funciona la interfaz
 */

export class User {

    constructor({
        id = null,
        name,
        email,
        passwordHash = null,
        tipoUsuario
    }) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.passwordHash = passwordHash;
          this.identificacion = identificacion;
        this.TipoUsuario = tipoUsuario;
    }

}
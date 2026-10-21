export function validarUsuarioLogeado(){
  const usuarioActivo = JSON.parse(
    localStorage.getItem("usuarioActivo")
  );
  console.log("Soy usuarioActivo de la funcion", usuarioActivo);
  const esEstudiante = usuarioActivo && usuarioActivo.TipoUsuario === "estudiante";
  //me retorna un true o un false
  //true cuando es verdadera la validacion
  if (esEstudiante) {
    console.log("Ingresa en estudiante");
    const botonesEditar = document.querySelectorAll(".btn-editar");

    console.log("Botones encontrados:", botonesEditar.length);
    document.querySelectorAll(".btn-editar").forEach(btn => {
      btn.disabled = true;
    });

    document.querySelectorAll(".btn-eliminar").forEach(btn => {
      btn.hidden = true;
    });
  }
}
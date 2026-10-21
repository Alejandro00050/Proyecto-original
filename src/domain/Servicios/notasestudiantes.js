export function consultaNota(){
    const usuarioActivo = JSON.parse(
        localStorage.getItem("usuarioActivo")
    );
    document.getElementById("btn-consultar")
        .addEventListener("click", async () => {
            console.log("usuarioActivo identificaion estudiante", usuarioActivo)
            const ideEstudiante = usuarioActivo.iden;
            console.log("identificaion estudiante", ideEstudiante)

            const resultado = document.getElementById("resultado");

            if (!ideEstudiante) {
                resultado.textContent = "No se pudo obtener la identificación del estudiante";
                return;
            }

            try {
                const respuesta = await fetch(
                    `https://microservicio-notas-manzanares.onrender.com/api/estudiantes/${encodeURIComponent(ideEstudiante)}`
                );

                const data = await respuesta.json();

                if (!respuesta.ok) {
                    throw new Error(data.mensaje || "No se encontró el estudiante.");
                }

               console.log(data);
                console.log(resultado);
                resultado.innerHTML = `
                    <div class="alert alert-${data.alert}" role="alert">
                        <strong>Nombre:</strong> ${data.nombre}
                        <strong>Nota final:</strong> ${data.notaFinal}
                    </div>
                `;
            } catch (error) {
                console.error("Error al consultar la nota:", error);
                resultado.textContent = error.message || "Error al consultar la nota.";
            }
        })
    }
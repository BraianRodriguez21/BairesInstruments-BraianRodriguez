document.addEventListener("DOMContentLoaded", async function () {
    try {
        const username = await getUsername();
        if (username === "admin") {
            const password = await getPassword();
            if (password === "Secreta" || password === "123456789") {
                Swal.fire({
                    title: "Inicio de sesión exitoso!",
                    customClass: {
                        container: 'custom-swal'
                    }
                });
            } else {
                Swal.fire({
                    title: "Contraseña incorrecta. Inténtalo de nuevo.",
                    customClass: {
                        container: 'custom-swal'
                    }
                });
            }
        } else {
            Swal.fire({
                title: "Nombre de usuario invalido.",
                customClass: {
                    container: 'custom-swal'
                }
            });
        }
    } catch (error) {
        console.error("Ocurrió un error:", error);
    }
});

async function getUsername() {
    const { value } = await Swal.fire({
        title: "Ingrese su nombre de usuario",
        input: "text",
        inputLabel: "Su Usuario",
        inputPlaceholder: "Usuario"
    });
    return value;
}

async function getPassword() {
    const { value } = await Swal.fire({
        title: "Ingresa tu contraseña",
        input: "password",
        inputLabel: "Contraseña",
        inputPlaceholder: "Ingresa tu contraseña",
        inputAttributes: {
            maxlength: "10",
            autocapitalize: "off",
            autocorrect: "off"
        }
    });
    return value;}
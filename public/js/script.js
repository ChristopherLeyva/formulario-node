document.getElementById('dynamicForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío del formulario para validar

    // Limpiar errores anteriores
    document.getElementById('errorNombre').textContent = "";
    document.getElementById('errorApellido').textContent = "";
    document.getElementById('errorCorreo').textContent = "";

    // Obtener valores
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const correo = document.getElementById('correo').value;

    let isValid = true;

    // Validar nombre
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)) {
        document.getElementById('errorNombre').textContent = "El nombre solo puede contener letras y espacios.";
        isValid = false;
    }

    // Validar apellido
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(apellido)) {
        document.getElementById('errorApellido').textContent = "El apellido solo puede contener letras y espacios.";
        isValid = false;
    }

    // Validar correo
    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(correo)) {
        document.getElementById('errorCorreo').textContent = "El correo debe ser un Gmail válido.";
        isValid = false;
    }

    // Si es válido, mostrar alerta
    if (isValid) {
        alert("Formulario enviado exitosamente.");
        document.getElementById('dynamicForm').reset();
    }
});

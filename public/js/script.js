document.getElementById('registroForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        telefono: document.getElementById('telefono').value,
        correo: document.getElementById('correo').value,
        consulta: document.getElementById('consulta').value
    };

    try {
        const response = await fetch('/registro', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        alert(data.message);
    } catch (error) {
        console.error('Error:', error);
        alert('Error al enviar el formulario.');
    }
});

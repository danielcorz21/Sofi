async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/inicios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();

        if (response.ok) {
            // Redirigir al dashboard si el login es exitoso
            window.location.href = '/baselogeo';
        } else {
            // Mostrar notificación de error
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: result.message
            });
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error al intentar iniciar sesión. Por favor, inténtelo de nuevo.'
        });
    }
}

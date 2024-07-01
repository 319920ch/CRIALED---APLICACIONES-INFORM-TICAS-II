// scripts/auth.js
document.addEventListener('DOMContentLoaded', function() {
  const loginLink = document.getElementById('login-link');
  const loginForm = document.getElementById('login-form');
  const loginError = document.getElementById('login-error'); // Contenedor para mensajes de error

  const user = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  const isLoggedIn = user !== null && token !== null;

  if (isLoggedIn) {
    loginLink.textContent = 'Cerrar sesión';
    document.getElementById('button-container').style.display = 'flex';
  } else {
    loginLink.textContent = 'Iniciar sesión';
    document.getElementById('button-container').style.display = 'none';
  }

  loginLink.addEventListener('click', function(event) {
    event.preventDefault();
    if (isLoggedIn) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      window.location.reload(); // Refresca la página para actualizar el estado de sesión
    } else {
      // Redirige a la página de login si no está logueado
      window.location.href = 'index.html'; // Asegúrate de que la ruta al archivo de login sea correcta
    }
  });

  if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })
      .then(response => response.json())
      .then(data => {
        if (data.token) {
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('token', data.token);
          window.location.reload();
        } else {
          // Mostrar mensaje de error
          loginError.textContent = data.message || 'Inicio de sesión fallido';
          loginError.style.display = 'block';
        }
      })
      .catch(error => {
        console.error('Error:', error);
        // Mostrar mensaje de error
        loginError.textContent = 'Error en el servidor';
        loginError.style.display = 'block';
      });
    });
  }
});

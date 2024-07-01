document.addEventListener('DOMContentLoaded', function() {
  const loginLink = document.getElementById('login-link');
  const loginForm = document.getElementById('login-form');
  const loginContainer = document.getElementById('login-container');
  const buttonContainer = document.getElementById('button-container');

  if (!loginLink || !buttonContainer) {
    console.error('Elementos del DOM no encontrados: login-link o button-container');
    return;
  }
  
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  const isLoggedIn = user !== null && token !== null;

  if (isLoggedIn) {
    loginLink.textContent = 'Cerrar sesión';
    buttonContainer.style.display = 'flex';
    if (loginContainer) {
      loginContainer.style.display = 'none';
    }
  } else {
    loginLink.textContent = 'Iniciar sesión';
    buttonContainer.style.display = 'none';
  }

  loginLink.addEventListener('click', function(event) {
    event.preventDefault();
    if (isLoggedIn) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      window.location.reload();
    } else {
      window.location.href = 'index.html';
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
      .then(response => {
        if (!response.ok) {
          return response.json().then(data => {
            throw new Error(data.message || 'Inicio de sesión fallido');
          });
        }
        return response.json();
      })
      .then(data => {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        loginLink.textContent = 'Cerrar sesión';
        buttonContainer.style.display = 'flex';
        if (loginContainer) {
          loginContainer.style.display = 'none';
        }
        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso',
          showConfirmButton: false,
          timer: 1500
        });
      })
      .catch(error => {
        console.error('Error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error de inicio de sesión',
          text: error.message,
        });
      });
    });
  }
});

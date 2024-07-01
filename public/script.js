document.addEventListener('DOMContentLoaded', function() {
  const loginLink = document.getElementById('login-link');
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
  } else {
    loginLink.textContent = 'Iniciar sesión';
    buttonContainer.style.display = 'none';
  }

  loginLink?.addEventListener('click', function(event) {
    event.preventDefault();
    if (isLoggedIn) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      window.location.href = '/';
    } else {
      window.location.href = 'index.html';
    }
  });

  window.navigateTo = function(page) {
    window.location.href = page;
  };
});

document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname.endsWith('usuarios.html')) {
    loadUsers();
    loadRoles(); // Cargar roles al cargar la página

    const addUserForm = document.getElementById('add-user-form');
    const userForm = document.getElementById('user-form');

    window.showAddUserForm = function() {
      addUserForm.style.display = 'block';
    };

    const userFormSubmitHandler = function(event) {
      event.preventDefault();
      const formData = new FormData(userForm);
      const userData = {};
      formData.forEach((value, key) => {
        userData[key] = value;
      });

      // Validaciones de contraseña y correo electrónico
      if (userData.contrasena.length < 5 || userData.contrasena.length > 25) {
        alert('La contraseña debe tener entre 5 y 25 caracteres.');
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(userData.correo_electronico)) {
        alert('El correo electrónico no tiene un formato válido.');
        return;
      }

      // Validar que el nombre de usuario no se repita
      fetch(`/api/usuarios/exists?nombre=${encodeURIComponent(userData.nombre)}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.exists) {
          alert('El nombre de usuario ya existe. Por favor, elige otro.');
          return;
        }

        // Convertir id_rol a entero
        userData.id_rol = parseInt(userData.rol, 10); // Convertir rol a id_rol

        fetch('/api/usuarios', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(userData)
        })
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            alert(data.error);
          } else {
            alert('Usuario agregado con éxito');
            addUserForm.style.display = 'none';
            loadUsers();
          }
        })
        .catch(error => {
          console.error('Error:', error);
          alert('Error al agregar usuario');
        });
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error al verificar nombre de usuario');
      });
    };

    userForm?.addEventListener('submit', userFormSubmitHandler);

    window.editUser = function(id) {
      // Implementar lógica de edición de usuario
    };

    window.deleteUser = function(id) {
      if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
        fetch(`/api/usuarios/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(response => {
          if (response.ok) {
            alert('Usuario eliminado con éxito');
            loadUsers();
          } else {
            alert('Error al eliminar usuario');
          }
        })
        .catch(error => {
          console.error('Error:', error);
          alert('Error al eliminar usuario');
        });
      }
    };

    document.getElementById('back-link')?.addEventListener('click', function(event) {
      event.preventDefault();
      window.location.href = '/';
    });
  }
});

function loadUsers() {
  fetch('/api/usuarios/list', {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
  .then(response => response.json())
  .then(data => {
    const usersTableBody = document.getElementById('users-table').getElementsByTagName('tbody')[0];
    usersTableBody.innerHTML = '';
    data.forEach(usuario => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${usuario.nombre}</td>
        <td>${usuario.correo_electronico}</td>
        <td>${usuario.id_rol}</td>
        <td>
          <button onclick="editUser(${usuario.id})">Editar</button>
          <button onclick="deleteUser(${usuario.id})">Eliminar</button>
        </td>
      `;
      usersTableBody.appendChild(row);
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

function loadRoles() {
  fetch('/api/roles/list', {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
  .then(response => response.json())
  .then(data => {
    const roleSelect = document.getElementById('rol');
    roleSelect.innerHTML = '';
    data.forEach(rol => {
      const option = document.createElement('option');
      option.value = rol.id; // Usar el id del rol
      option.textContent = rol.nombre_rol;
      roleSelect.appendChild(option);
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

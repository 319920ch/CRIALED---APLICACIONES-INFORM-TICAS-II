// scripts/user.js
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.endsWith('usuarios.html')) {
      loadUsers();
  
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
          alert('Usuario agregado con éxito');
          addUserForm.style.display = 'none';
          loadUsers();
        })
        .catch(error => {
          console.error('Error:', error);
          alert('Error al agregar usuario');
        });
      };
  
      userForm?.addEventListener('submit', userFormSubmitHandler);
  
      window.editUser = function(nombre) {
        // Implementar lógica de edición de usuario
      };
  
      window.deleteUser = function(nombre) {
        if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
          fetch(`/api/usuarios/${nombre}`, {
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
    fetch('/api/usuarios', {
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
            <button onclick="editUser('${usuario.nombre}')">Editar</button>
            <button onclick="deleteUser('${usuario.nombre}')">Eliminar</button>
          </td>
        `;
        usersTableBody.appendChild(row);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  
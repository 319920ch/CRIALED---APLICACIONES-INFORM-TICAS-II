
// Función para mostrar el formulario para agregar un rol
function showAddRoleForm() {
  document.getElementById('add-role-form').style.display = 'block';
}

// Función para cargar los roles existentes
function loadRoles() {
  fetch('/api/roles')
    .then(response => response.json())
    .then(data => {
      const rolesTableBody = document.getElementById('roles-table').getElementsByTagName('tbody')[0];
      rolesTableBody.innerHTML = '';
      data.forEach(rol => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${rol.id}</td>
          <td>${rol.nombre}</td>
          <td>
            <button onclick="editRole('${rol.id}')">Editar</button>
            <button onclick="deleteRole('${rol.id}')">Eliminar</button>
          </td>
        `;
        rolesTableBody.appendChild(row);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Agregar rol
const roleForm = document.getElementById('role-form');
roleForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const formData = new FormData(roleForm);
  const roleData = {};
  formData.forEach((value, key) => {
    roleData[key] = value;
  });

  fetch('/api/roles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(roleData)
  })
  .then(response => response.json())
  .then(data => {
    alert('Rol agregado con éxito');
    document.getElementById('add-role-form').style.display = 'none';
    loadRoles();
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Error al agregar rol');
  });
});

// Editar rol
function editRole(id) {
  // Implementar lógica de edición de rol
}

// Eliminar rol
function deleteRole(id) {
  if (confirm('¿Estás seguro de que deseas eliminar este rol?')) {
    fetch(`/api/roles/${id}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        alert('Rol eliminado con éxito');
        loadRoles();
      } else {
        alert('Error al eliminar rol');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error al eliminar rol');
    });
  }
}

// Cargar roles al cargar la página
document.addEventListener('DOMContentLoaded', function() {
  loadRoles();
});

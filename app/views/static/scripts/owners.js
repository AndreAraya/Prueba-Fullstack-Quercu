document.addEventListener('DOMContentLoaded', function() {
    const createButton = document.getElementById('createButton');
    const editButton = document.getElementById('editButton');
    const deleteButton = document.getElementById('deleteButton');


    fetch('/api/owners')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#ownersTable tbody');
            tableBody.innerHTML = ''; // Limpiar contenido existente
            data.forEach(owner => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><input type="checkbox" class="owner-checkbox" data-id="${owner[0]}"></td>
                    <td>${owner[0]}</td>  <!-- ID -->
                    <td>${owner[1]}</td>  <!-- Name -->
                    <td>${owner[2]}</td>  <!-- Telephone -->
                    <td>${owner[3]}</td>  <!-- Email -->
                    <td>${owner[4]}</td>  <!-- IdentificationNumber -->
                    <td>${owner[5]}</td>  <!-- Address -->
                `;
                tableBody.appendChild(row);
            });

            document.querySelectorAll('.owner-checkbox').forEach(checkbox => {
                checkbox.addEventListener('change', function() {
                    const selectedCheckboxes = document.querySelectorAll('.owner-checkbox:checked');
                    editButton.disabled = selectedCheckboxes.length !== 1;
                    deleteButton.disabled = selectedCheckboxes.length !== 1;
                });
            });
        })
        .catch(error => console.error('Error:', error));
        createButton.addEventListener('click', function() {
            window.location.href = 'createOwner.html';
        });
    
        editButton.addEventListener('click', function() {
            const selectedCheckbox = document.querySelector('.owner-checkbox:checked');
            if (selectedCheckbox) {
                const ownerId = selectedCheckbox.getAttribute('data-id');
                window.location.href = `editOwner.html?id=${ownerId}`;
            }
        });
    
        deleteButton.addEventListener('click', function() {
            const selectedCheckbox = document.querySelector('.owner-checkbox:checked');
            if (selectedCheckbox) {
                const ownerId = selectedCheckbox.getAttribute('data-id');
                if (confirm(`¿Estás seguro de que quieres eliminar el propietario con ID: ${ownerId}?`)) {
                    fetch(`/api/owners/${ownerId}`, {
                        method: 'DELETE',
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.message === 'Owner not found') {
                            alert('No se pudo eliminar. Puede que este dueño tenga propiedades registradas.');
                        } else if (!response.ok) {
                            throw new Error('Network response was not ok');
                        } else {
                            alert('Propietario eliminado con éxito');
                            location.reload(); // Recargar la página para actualizar la lista de propietarios
                        }
                    })
                    .catch(error => console.error('Error deleting owner:', error));
                }
            } else {
                alert('Debes seleccionar un propietario para eliminar.');
            }
        });
});



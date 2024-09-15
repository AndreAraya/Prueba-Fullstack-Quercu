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
                    deleteButton.disabled = selectedCheckboxes.length === 0;
                });
            });
        })
        .catch(error => console.error('Error:', error));
        createButton.addEventListener('click', function() {
            alert('Crear nuevo dueño');
        });
    
        editButton.addEventListener('click', function() {
            const selectedCheckbox = document.querySelector('.owner-checkbox:checked');
            if (selectedCheckbox) {
                const ownerId = selectedCheckbox.getAttribute('data-id');
                alert(`Editar dueño con ID: ${ownerId}`);
            }
        });
    
        deleteButton.addEventListener('click', function() {
            const selectedCheckboxes = document.querySelectorAll('.owner-checkbox:checked');
            const idsToDelete = Array.from(selectedCheckboxes).map(cb => cb.getAttribute('data-id'));
            alert(`Eliminar dueños con IDs: ${idsToDelete.join(', ')}`);
        });
});



document.addEventListener('DOMContentLoaded', function() {
    const createButton = document.getElementById('createButton');
    const editButton = document.getElementById('editButton');
    const deleteButton = document.getElementById('deleteButton');
    
    fetch('/api/propertyTypes')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#propertyTypesTable tbody');
            tableBody.innerHTML = ''; // Limpiar contenido existente
            data.forEach(propertyType => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><input type="checkbox" class="propertyType-checkbox" data-id="${propertyType[0]}"></td>
                    <td>${propertyType[0]}</td>  <!-- ID -->
                    <td>${propertyType[1]}</td>  <!-- Description -->
                `;
                tableBody.appendChild(row);
            });

            document.querySelectorAll('.propertyType-checkbox').forEach(checkbox => {
                checkbox.addEventListener('change', function() {
                    const selectedCheckboxes = document.querySelectorAll('.propertyType-checkbox:checked');
                    editButton.disabled = selectedCheckboxes.length !== 1;
                    deleteButton.disabled = selectedCheckboxes.length === 0;
                });
            });
        })
        .catch(error => console.error('Error:', error));

        createButton.addEventListener('click', function() {
            alert('Crear nuevo tipo de propiedad');
        });

        editButton.addEventListener('click', function() {
            const selectedCheckbox = document.querySelector('.propertyType-checkbox:checked');
            if (selectedCheckbox) {
                const propertyTypeId = selectedCheckbox.getAttribute('data-id');
                alert(`Editar tipo de propiedad con ID: ${propertyTypeId}`);
            }
        });

        deleteButton.addEventListener('click', function() {
            const selectedCheckboxes = document.querySelectorAll('.propertyType-checkbox:checked');
            const idsToDelete = Array.from(selectedCheckboxes).map(cb => cb.getAttribute('data-id'));
            alert(`Eliminar tipos de propiedad con IDs: ${idsToDelete.join(', ')}`);
        });
});


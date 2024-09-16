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
                    <td>${propertyType[1]}</td>  <!-- Descripción -->
                `;
                tableBody.appendChild(row);
            });
            
            document.querySelectorAll('.propertyType-checkbox').forEach(checkbox => {
                checkbox.addEventListener('change', function() {
                    const selectedCheckboxes = document.querySelectorAll('.propertyType-checkbox:checked');
                    editButton.disabled = selectedCheckboxes.length !== 1;
                    deleteButton.disabled = selectedCheckboxes.length !== 1;
                });
            });
        })
        .catch(error => console.error('Error:', error));

    createButton.addEventListener('click', function() {
        window.location.href = 'createPropertyType.html';
    });

    editButton.addEventListener('click', function() {
        const selectedCheckbox = document.querySelector('.propertyType-checkbox:checked');
        if (selectedCheckbox) {
            const propertyTypeId = selectedCheckbox.getAttribute('data-id');
            window.location.href = `editPropertyType.html?id=${propertyTypeId}`;
        }
    });

    deleteButton.addEventListener('click', function() {
        const selectedCheckbox = document.querySelector('.propertyType-checkbox:checked');
        if (selectedCheckbox) {
            const propertyTypeId = selectedCheckbox.getAttribute('data-id');
            if (confirm(`¿Estás seguro de que quieres eliminar el tipo de propiedad con ID: ${propertyTypeId}?`)) {
                fetch(`/api/propertyTypes/${propertyTypeId}`, {
                    method: 'DELETE',
                })
                .then(response => response.json())
                .then(data => {
                    if (data.message === 'PropertyType not found') {
                        alert('No se pudo eliminar. Puede que este tipo de propiedad esté siendo utilizado.');
                    } else if (!response.ok) {
                        throw new Error('Network response was not ok');
                    } else {
                        alert('Tipo de propiedad eliminado con éxito');
                        location.reload(); // Recargar la página para actualizar la lista de tipos de propiedad
                    }
                })
                .catch(error => console.error('Error deleting property type:', error));
            }
        } else {
            alert('Debes seleccionar un tipo de propiedad para eliminar.');
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const createButton = document.getElementById('createButton');
    const editButton = document.getElementById('editButton');
    const deleteButton = document.getElementById('deleteButton');
    
    
    fetch('/api/properties')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#propertiesTable tbody');
            tableBody.innerHTML = ''; // Limpiar contenido existente
            data.forEach(property => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><input type="checkbox" class="property-checkbox" data-id="${property[0]}"></td>
                    <td>${property[0]}</td>  <!-- ID -->
                    <td>${property[1]}</td>  <!-- PropertyTypeId -->
                    <td>${property[2]}</td>  <!-- OwnerId -->
                    <td>${property[3]}</td>  <!-- Number -->
                    <td>${property[4]}</td>  <!-- Address -->
                    <td>${property[5]}</td>  <!-- Area -->
                    <td>${property[6]}</td>  <!-- ConstructionArea -->
                `;
                tableBody.appendChild(row);
            });
            
            document.querySelectorAll('.property-checkbox').forEach(checkbox => {
                checkbox.addEventListener('change', function() {
                        const selectedCheckboxes = document.querySelectorAll('.property-checkbox:checked');
                        editButton.disabled = selectedCheckboxes.length !== 1;
                        deleteButton.disabled = selectedCheckboxes.length === 0;
                    /*const propertyId = this.getAttribute('data-id'); 
                    if (this.checked) {
                        console.log(`Selected property ID: ${propertyId}`);
                    } else {
                        console.log(`Deselected property ID: ${propertyId}`);
                    }*/
                });
            });
        })
        .catch(error => console.error('Error:', error));

        createButton.addEventListener('click', function() {
            alert('Crear nuevo registro');
        });

        editButton.addEventListener('click', function() {
            const selectedCheckbox = document.querySelector('.property-checkbox:checked');
            if (selectedCheckbox) {
                const propertyId = selectedCheckbox.getAttribute('data-id');
                alert(`Editar propiedad con ID: ${propertyId}`);
            }
        });

        deleteButton.addEventListener('click', function() {
            const selectedCheckboxes = document.querySelectorAll('.property-checkbox:checked');
            const idsToDelete = Array.from(selectedCheckboxes).map(cb => cb.getAttribute('data-id'));
            alert(`Eliminar propiedades con IDs: ${idsToDelete.join(', ')}`);
        });
});

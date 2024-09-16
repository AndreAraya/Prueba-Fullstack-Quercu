document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const propertyId = urlParams.get('id');

    if (propertyId) {
        // Cargar datos de la propiedad
        fetch(`/api/properties/${propertyId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(property => {
                document.getElementById('propertyNumber').value = property[3];
                document.getElementById('propertyAddress').value = property[4];
                document.getElementById('propertyArea').value = property[5];
                document.getElementById('propertyConstructionArea').value = property[6] || '';

                // Cargar select options
                return Promise.all([
                    fetch('/api/propertyTypes').then(res => res.json()),
                    fetch('/api/owners').then(res => res.json())
                ]);
            })
            .then(([propertyTypes, owners]) => {
                const propertyTypeSelect = document.getElementById('propertyType');
                const ownerSelect = document.getElementById('owner');

                propertyTypes.forEach(type => {
                    const option = document.createElement('option');
                    option.value = type[0];  // ID del tipo de propiedad
                    option.textContent = type[1];  // Descripción del tipo de propiedad
                    propertyTypeSelect.appendChild(option);
                });

                owners.forEach(owner => {
                    const option = document.createElement('option');
                    option.value = owner[0];  // ID del propietario
                    option.textContent = owner[1];  // Nombre del propietario
                    ownerSelect.appendChild(option);
                });

                // Establecer valores seleccionados
                propertyTypeSelect.value = property[1]; // propertyTypeId
                ownerSelect.value = property[2]; // ownerId
            })
            .catch(error => console.error('Error fetching property data:', error));

        document.getElementById('submitEdit').addEventListener('click', function(event) {
            event.preventDefault(); // Evitar el envío del formulario hasta que la validación pase

            const propertyNumber = document.getElementById('propertyNumber').value;
            const propertyAddress = document.getElementById('propertyAddress').value;
            const propertyArea = parseFloat(document.getElementById('propertyArea').value);
            const propertyConstructionArea = parseFloat(document.getElementById('propertyConstructionArea').value);
            const propertyType = document.getElementById('propertyType').value;
            const owner = document.getElementById('owner').value;

            // Validaciones
            if (!propertyNumber || !propertyAddress || !propertyType || !owner) {
                alert('Todos los campos obligatorios deben ser completados.');
                return;
            }

            if (isNaN(propertyArea) || propertyArea < 0) {
                alert('El valor del área debe ser un número no negativo.');
                return;
            }

            if (propertyConstructionArea && (isNaN(propertyConstructionArea) || propertyConstructionArea < 0)) {
                alert('El valor del área de construcción debe ser un número no negativo.');
                return;
            }

            const requestBody = {
                number: propertyNumber,
                address: propertyAddress,
                area: propertyArea,
                constructionArea: propertyConstructionArea || null, // Usa null si no hay valor
                propertyTypeId: propertyType,
                ownerId: owner
            };

            // Enviar los datos al backend si todas las validaciones pasan
            fetch(`/api/properties/${propertyId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody) // Enviar el cuerpo de la solicitud
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                alert('Propiedad actualizada con éxito');
                window.location.href = 'properties.html';
            })
            .catch(error => console.error('Error updating property:', error));
        });
    }
});





document.addEventListener('DOMContentLoaded', function() {
    const propertyTypeSelect = document.getElementById('propertyType');
    const ownerSelect = document.getElementById('owner');

    fetch('/api/propertyTypes')
        .then(response => response.json())
        .then(data => {
            data.forEach(propertyType => {
                const option = document.createElement('option');
                option.value = propertyType[0]; // ID
                option.textContent = propertyType[1]; // Description
                propertyTypeSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching property types:', error));

    fetch('/api/owners')
        .then(response => response.json())
        .then(data => {
            data.forEach(owner => {
                const option = document.createElement('option');
                option.value = owner[0]; // ID
                option.textContent = owner[1]; // Name
                ownerSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching owners:', error));
    
    document.getElementById('submitProperty').addEventListener('click', function(event) {
        event.preventDefault(); // Evita el envío del formulario hasta que la validación pase
    
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
        fetch('/api/properties', {
            method: 'POST',
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
            alert('Propiedad creada con éxito');
            window.location.href = 'properties.html';
        })
        .catch(error => console.error('Error creating property:', error));
    });
});   


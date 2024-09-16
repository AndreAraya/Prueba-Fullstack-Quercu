document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('createPropertyTypeForm');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar el envío del formulario hasta que se procese
    
        const description = document.getElementById('description').value;
        console.log('Form submitted');
        
        // Validación simple
        if (!description) {
            alert('La descripción es obligatoria.');
            return;
        }
        
        const requestBody = {
            description: description
        };
        
        fetch('/api/propertyTypes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            alert('Tipo de propiedad creado con éxito');
            window.location.href = 'propertyTypes.html'; // Redirigir a la página de tipos de propiedad
        })
        .catch(error => console.error('Error creating property type:', error));
    });
});

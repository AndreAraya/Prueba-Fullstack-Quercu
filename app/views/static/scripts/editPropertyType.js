document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const propertyTypeId = urlParams.get('id');

    if (propertyTypeId) {
        // Cargar datos del tipo de propiedad
        fetch(`/api/propertyTypes/${propertyTypeId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                document.getElementById('description').value = data[1]; // La descripción está en el segundo índice
            })
            .catch(error => console.error('Error fetching property type data:', error));

        document.getElementById('submitEdit').addEventListener('click', function(event) {
            event.preventDefault(); // Evitar el envío del formulario hasta que la validación pase

            const description = document.getElementById('description').value;

            // Validaciones
            if (!description) {
                alert('La descripción es obligatoria.');
                return;
            }

            const requestBody = {
                description: description
            };

            // Enviar los datos al backend si todas las validaciones pasan
            fetch(`/api/propertyTypes/${propertyTypeId}`, {
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
                alert('Tipo de propiedad actualizado con éxito');
                window.location.href = 'propertyTypes.html';
            })
            .catch(error => console.error('Error updating property type:', error));
        });
    }
});


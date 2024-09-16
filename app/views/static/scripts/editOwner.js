document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const ownerId = urlParams.get('id');

    if (ownerId) {
        // Cargar datos del propietario
        fetch(`/api/owners/${ownerId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(owner => {
                document.getElementById('name').value = owner[1];
                document.getElementById('telephone').value = owner[2];
                document.getElementById('email').value = owner[3];
                document.getElementById('identificationNumber').value = owner[4];
                document.getElementById('address').value = owner[5];
            })
            .catch(error => console.error('Error fetching owner data:', error));

        document.getElementById('submitEdit').addEventListener('click', function(event) {
            event.preventDefault(); // Evitar el envío del formulario hasta que la validación pase

            const name = document.getElementById('name').value;
            const telephone = document.getElementById('telephone').value;
            const email = document.getElementById('email').value;
            const identificationNumber = document.getElementById('identificationNumber').value;
            const address = document.getElementById('address').value;

            // Validaciones
            if (!name || !telephone || !identificationNumber) {
                alert('Nombre, teléfono y número de identificación son obligatorios.');
                return;
            }

            if (!/^\d+$/.test(telephone)) {
                alert('El teléfono debe contener solo números.');
                return;
            }

            if (!/^\d+$/.test(identificationNumber)) {
                alert('El número de identificación debe contener solo números.');
                return;
            }

            if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('El correo electrónico no tiene un formato válido.');
                return;
            }

            const requestBody = {
                name: name,
                telephone: telephone,
                email: email,
                identificationNumber: identificationNumber,
                address: address
            };

            // Enviar los datos al backend si todas las validaciones pasan
            fetch(`/api/owners/${ownerId}`, {
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
                alert('Propietario actualizado con éxito');
                window.location.href = 'owners.html';
            })
            .catch(error => console.error('Error updating owner:', error));
        });
    }
});

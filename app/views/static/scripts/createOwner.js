document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('createOwnerForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar el envío del formulario hasta que la validación pase

        const name = document.getElementById('name').value;
        const telephone = document.getElementById('telephone').value;
        const email = document.getElementById('email').value;
        const identificationNumber = document.getElementById('identificationNumber').value;
        const address = document.getElementById('address').value;

        if (!name || !telephone || !identificationNumber) {
            alert('Nombre, teléfono y número de identificación son obligatorios.');
            return;
        }
        
        // Validar formato de correo electrónico
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailPattern.test(email)) {
            alert('El formato del correo electrónico no es válido.');
            return;
        }

        // Validar que teléfono y número de identificación sean solo números
        const phonePattern = /^\d+$/;
        const idPattern = /^\d+$/;
        if (!phonePattern.test(telephone)) {
            alert('El número de teléfono debe contener solo números.');
            return;
        }

        if (!idPattern.test(identificationNumber)) {
            alert('El número de identificación debe contener solo números.');
            return;
        }


        const requestBody = {
            name: name,
            telephone: telephone,
            email: email,
            identificationNumber: identificationNumber,
            address: address
        };

        // Enviar los datos al backend
        fetch('/api/owners', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
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
            alert('Dueño creado con éxito');
            window.location.href = 'owners.html'; // Redirigir a la lista de dueños
        })
        .catch(error => console.error('Error creating owner:', error));
    });
});

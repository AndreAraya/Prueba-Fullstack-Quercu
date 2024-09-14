document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/owners')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#ownersTable tbody');
            tableBody.innerHTML = ''; // Limpiar contenido existente
            data.forEach(owner => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${owner[0]}</td>  <!-- ID -->
                    <td>${owner[1]}</td>  <!-- Name -->
                    <td>${owner[2]}</td>  <!-- Telephone -->
                    <td>${owner[3]}</td>  <!-- Email -->
                    <td>${owner[4]}</td>  <!-- IdentificationNumber -->
                    <td>${owner[5]}</td>  <!-- Address -->
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error:', error));
});



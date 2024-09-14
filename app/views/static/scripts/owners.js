document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/owners')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#ownersTable tbody');
            tableBody.innerHTML = ''; // Limpiar contenido existente
            data.forEach(owner => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${owner.id}</td>
                    <td>${owner.name}</td>
                    <td>${owner.telephone}</td>
                    <td>${owner.email}</td>
                    <td>${owner.identificationNumber}</td>
                    <td>${owner.address}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error:', error));
});


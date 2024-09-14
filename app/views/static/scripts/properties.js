document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/properties')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#propertiesTable tbody');
            tableBody.innerHTML = ''; // Limpiar contenido existente
            data.forEach(property => {
                const row = document.createElement('tr');
                row.innerHTML = `
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
        })
        .catch(error => console.error('Error:', error));
});

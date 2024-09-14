document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/properties')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#propertiesTable tbody');
            tableBody.innerHTML = ''; // Limpiar contenido existente
            data.forEach(property => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${property.id}</td>
                    <td>${property.propertyTypeId}</td>
                    <td>${property.ownerId}</td>
                    <td>${property.number}</td>
                    <td>${property.address}</td>
                    <td>${property.area}</td>
                    <td>${property.constructionArea}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error:', error));
});

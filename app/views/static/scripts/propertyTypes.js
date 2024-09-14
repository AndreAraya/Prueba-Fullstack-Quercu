document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/propertyTypes')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#propertyTypesTable tbody');
            tableBody.innerHTML = ''; // Limpiar contenido existente
            data.forEach(propertyType => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${propertyType.id}</td>
                    <td>${propertyType.description}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error:', error));
});

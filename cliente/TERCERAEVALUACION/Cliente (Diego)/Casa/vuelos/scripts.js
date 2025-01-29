// Array para almacenar vuelos
const flights = [
    { id: 1, name: "Vuelo 101", destination: "París" },
    { id: 2, name: "Vuelo 202", destination: "Londres" },
    { id: 3, name: "Vuelo 303", destination: "Tokio" }
];

// Manejar el envío del formulario
document.getElementById('flightForm').addEventListener('submit', (e) => {
  
    const id = document.getElementById('flightId').value;
    const classType = document.getElementById('classType').value;
    const seatsOccupied = parseInt(document.getElementById('seatsOccupied').value);
    const totalSeats = parseInt(document.getElementById('totalSeats').value);
  
    addOrUpdateFlight(id, classType, seatsOccupied, totalSeats);
  
    // Limpiar el formulario
    e.target.reset();
});

// Función para renderizar la lista de vuelos
function mostrarVuelos() {
    const flightList = document.getElementById('flightList');
    flightList.innerHTML = '';
  
    flights.forEach((flight) => {
      const listItem = document.createElement('li');
      listItem.textContent = `ID: ${flight.id}, Clase: ${flight.classType}, Plazas Ocupadas: ${flight.seatsOccupied}, Total Plazas: ${flight.totalSeats}`;
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Eliminar';
      deleteButton.onclick = () => deleteFlight(flight.id);
      listItem.appendChild(deleteButton);
      flightList.appendChild(listItem);
    });
}
// Función para agregar o actualizar un vuelo
function addOrUpdateFlight(id, classType, seatsOccupied, totalSeats) {
    // Validaciones
    if (seatsOccupied < 1 || totalSeats < 1) {
      alert('Las plazas ocupadas y totales deben ser mayores o iguales a 1');
      return;
    }
    if (seatsOccupied > totalSeats) {
      alert('Las plazas ocupadas no pueden superar el total de plazas.');
      return;
    }
  
    // Buscar si el vuelo ya existe
    const flightIndex = flights.findIndex((flight) => flight.id === id);
    const newFlight = { id, classType, seatsOccupied, totalSeats };
  
    if (flightIndex >= 0) {
      // Si existe, actualizar
      flights[flightIndex] = newFlight;
      alert(`Vuelo con ID "${id}" actualizado.`);
    } else {
      // Si no existe, agregar
      flights.push(newFlight);
      alert(`Vuelo con ID "${id}" agregado.`);
    }
  
    mostrarVuelos();
    calculateCategories();
}  
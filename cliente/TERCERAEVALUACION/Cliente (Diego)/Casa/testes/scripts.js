// Array para almacenar vuelos
const flights = [];

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

  renderFlights();
  calculateCategories();
}

// Función para eliminar un vuelo
function deleteFlight(id) {
  const flightIndex = flights.findIndex((flight) => flight.id === id);
  if (flightIndex >= 0) {
    flights.splice(flightIndex, 1);
    alert(`Vuelo con ID "${id}" eliminado.`);
  } else {
    alert(`Vuelo con ID "${id}" no encontrado.`);
  }

  renderFlights();
  calculateCategories();
}

// Función para renderizar la lista de vuelos
function renderFlights() {
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

// Función para calcular y mostrar categorías de vuelos
function calculateCategories() {
  const categories = { bajo: 0, medio: 0, alto: 0 };

  flights.forEach((flight) => {
    const occupancyRate = (flight.seatsOccupied / flight.totalSeats) * 100;

    if (occupancyRate < 50) categories.bajo++;
    else if (occupancyRate <= 75) categories.medio++;
    else categories.alto++;
  });

  const categoriesDiv = document.getElementById('flightCategories');
  categoriesDiv.innerHTML = `
    <p>Vuelos con baja ocupación (<50%): ${categories.bajo}</p>
    <p>Vuelos con ocupación media (50-75%): ${categories.medio}</p>
    <p>Vuelos con alta ocupación (>75%): ${categories.alto}</p>
  `;
}

// Manejar el envío del formulario
document.getElementById('flightForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const id = document.getElementById('flightId').value;
  const classType = document.getElementById('classType').value;
  const seatsOccupied = parseInt(document.getElementById('seatsOccupied').value);
  const totalSeats = parseInt(document.getElementById('totalSeats').value);

  addOrUpdateFlight(id, classType, seatsOccupied, totalSeats);

  // Limpiar el formulario
  e.target.reset();
});

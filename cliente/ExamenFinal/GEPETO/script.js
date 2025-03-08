const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 512;

// Dimensiones de cada pantalla
const SCREEN_WIDTH = 512;
const SCREEN_HEIGHT = 512;

// Mapa del mundo con colores para cada pantalla (temporal para visualización)
const worldMap = [
  { color: "#2ecc71" }, // screen1 - Verde (bosque)
  { color: "#3498db" }, // screen2 - Azul (agua)
  { color: "#e74c3c" }, // screen3 - Rojo (lava)
  { color: "#f39c12" }, // screen4 - Naranja (desierto)
  { color: "#9b59b6" }, // screen5 - Púrpura (pantano)
  { color: "#1abc9c" }, // screen6 - Turquesa (ciudad)
  { color: "#34495e" }, // screen7 - Gris (montañas)
  { color: "#e67e22" }, // screen8 - Dorado (templo)
  { color: "#2c3e50" }  // screen9 - Oscuro (mazmorra)
];

// El jugador comienza en el centro del mundo
let currentScreen = { x: 1, y: 1 }; 

const player = {
    x: SCREEN_WIDTH / 2 - 16,
    y: SCREEN_HEIGHT / 2 - 16,
    width: 32,
    height: 32,
    speed: 5,
    health: 3,
    inventory: [],
};

// Función para cambiar de pantalla
function changeScreen(direction) {
    if (direction === 'left' && currentScreen.x > 0) {
        currentScreen.x--;
        player.x = SCREEN_WIDTH - player.width - 10; // Aparece en el borde derecho
    } else if (direction === 'right' && currentScreen.x < 2) {
        currentScreen.x++;
        player.x = 10; // Aparece en el borde izquierdo
    } else if (direction === 'up' && currentScreen.y > 0) {
        currentScreen.y--;
        player.y = SCREEN_HEIGHT - player.height - 10; // Aparece en el borde inferior
    } else if (direction === 'down' && currentScreen.y < 2) {
        currentScreen.y++;
        player.y = 10; // Aparece en el borde superior
    }
    console.log(`Pantalla actual: ${currentScreen.x + currentScreen.y * 3}`);
}

// Movimiento del jugador
function movePlayer() {
    if (keys["ArrowUp"] && player.y > 0) player.y -= player.speed;
    if (keys["ArrowDown"] && player.y + player.height < SCREEN_HEIGHT) player.y += player.speed;
    if (keys["ArrowLeft"] && player.x > 0) player.x -= player.speed;
    if (keys["ArrowRight"] && player.x + player.width < SCREEN_WIDTH) player.x += player.speed;
    
    // Cambio de pantalla al llegar a los bordes
    if (player.x <= 0) changeScreen("left");
    if (player.x + player.width >= SCREEN_WIDTH) changeScreen("right");
    if (player.y <= 0) changeScreen("up");
    if (player.y + player.height >= SCREEN_HEIGHT) changeScreen("down");
}

// Dibujar jugador
function drawPlayer() {
    ctx.fillStyle = "blue";
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Detectar colisiones entre el jugador y los enemigos u objetos
function detectCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

// Clase base para enemigos
class Enemy {
    constructor(x, y, width, height, health) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.health = health;
        this.speed = 2;
    }

    moveTowardPlayer() {
        if (player.x > this.x) this.x += this.speed;
        if (player.x < this.x) this.x -= this.speed;
        if (player.y > this.y) this.y += this.speed;
        if (player.y < this.y) this.y -= this.speed;
    }

    draw() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

// Crear enemigos en la pantalla
let enemies = [
    new Enemy(100, 100, 32, 32, 3),
    new Enemy(300, 200, 32, 32, 3),
];

// Actualizar enemigos
function updateEnemies() {
    enemies.forEach(enemy => {
        enemy.moveTowardPlayer();
        enemy.draw();
        
        if (detectCollision(player, enemy)) {
            player.health -= 1;
            console.log("¡Has sido golpeado!");
        }
    });
}

// Jefe final
class Boss extends Enemy {
    constructor(x, y, width, height, health) {
        super(x, y, width, height, health);
        this.speed = 4;
    }

    draw() {
        ctx.fillStyle = "purple";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

let boss = new Boss(400, 100, 50, 50, 10);

function updateBoss() {
    boss.moveTowardPlayer();
    boss.draw();
    
    if (detectCollision(player, boss)) {
        player.health -= 2; // El jefe hace más daño
        console.log("¡Has sido golpeado por el jefe!");
    }
}

// Inventario y objetos
const items = [
    { x: 200, y: 150, width: 16, height: 16, type: "sword" },
    { x: 250, y: 250, width: 16, height: 16, type: "shield" }
];

function updateItems() {
    items.forEach((item, index) => {
        ctx.fillStyle = item.type === "sword" ? "gray" : "blue";
        ctx.fillRect(item.x, item.y, item.width, item.height);
        
        if (detectCollision(player, item)) {
            player.inventory.push(item.type);
            items.splice(index, 1); // Eliminar el objeto del juego
            console.log(`Recogiste un ${item.type}`);
        }
    });
}

// Mostrar inventario en la UI
function updateInventoryUI() {
    const inventoryUI = document.getElementById("inventory-items");
    inventoryUI.textContent = player.inventory.join(", ");
}

// Manejo del teclado
let keys = {};
document.addEventListener("keydown", (e) => keys[e.key] = true);
document.addEventListener("keyup", (e) => keys[e.key] = false);

// Dibujar el fondo de la pantalla actual
function drawBackground() {
    const screenIndex = currentScreen.x + currentScreen.y * 3;
    const screen = worldMap[screenIndex];
    ctx.fillStyle = screen.color;
    ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
}

// Bucle principal del juego
function gameLoop() {
    drawBackground(); // Dibujar el fondo de la pantalla actual
    
    movePlayer();
    drawPlayer();
    updateEnemies(); // Actualiza enemigos
    updateBoss();    // Actualiza jefe
    updateItems();   // Actualiza objetos
    updateInventoryUI(); // Actualiza inventario en pantalla
    
    requestAnimationFrame(gameLoop);
}

gameLoop();

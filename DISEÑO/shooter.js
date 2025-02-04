const readline = require('readline');

// Configuración del juego
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let score = 0;
const targets = ['🚀', '👾', '💀', '👽'];
const gameDuration = 20000; // 20 segundos

function getRandomTarget() {
    return targets[Math.floor(Math.random() * targets.length)];
}

function printGame() {
    console.clear();
    console.log(`Puntuación: ${score}`);
    console.log('Dispara a los objetivos!');
    console.log('Escribe el emoji para disparar:');
    const target = getRandomTarget();
    console.log(`\n${target}\n`);
    return target;
}

function startGame() {
    const endTime = Date.now() + gameDuration;

    function gameLoop() {
        if (Date.now() > endTime) {
            console.log(`\n¡Tiempo acabado! Puntuación final: ${score}`);
            rl.close();
            return;
        }

        const target = printGame();

        rl.question('> ', (input) => {
            if (input === target) {
                score++;
                console.log('¡Acertaste!');
            } else {
                console.log('¡Fallaste!');
            }
            setTimeout(gameLoop, 1000); // Espera 1 segundo antes de continuar
        });
    }

    gameLoop();
}

console.log('Bienvenido al Shooter de Terminal!');
console.log('Tienes 20 segundos para disparar a los objetivos.');
console.log('Presiona Enter para comenzar...');

rl.question('', () => {
    startGame();
});
// Configuración básica de Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Luz
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5).normalize();
scene.add(light);

// Piso
const floorGeometry = new THREE.PlaneGeometry(10, 10);
const floorMaterial = new THREE.MeshPhongMaterial({ color: 0x808080, side: THREE.DoubleSide });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = Math.PI / 2;
scene.add(floor);

// Cubos como objetivos
const targets = [];
const targetGeometry = new THREE.BoxGeometry(1, 1, 1);
const targetMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });

for (let i = 0; i < 5; i++) {
    const target = new THREE.Mesh(targetGeometry, targetMaterial);
    target.position.set(Math.random() * 8 - 4, 0.5, Math.random() * -8 - 2);
    scene.add(target);
    targets.push(target);
}

// Posición de la cámara
camera.position.set(0, 1, 5);

// Disparar
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('click', (event) => {
    // Convertir la posición del clic a coordenadas normalizadas (-1 a 1)
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Lanzar un rayo desde la cámara
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(targets);

    if (intersects.length > 0) {
        const target = intersects[0].object;
        scene.remove(target); // Eliminar el objetivo
        targets.splice(targets.indexOf(target), 1); // Quitar de la lista
    }
});

// Animación
function animate() {
    requestAnimationFrame(animate);

    // Rotar los objetivos
    targets.forEach(target => {
        target.rotation.x += 0.01;
        target.rotation.y += 0.01;
    });

    renderer.render(scene, camera);
}

animate();

// Ajustar el tamaño del renderizador al cambiar el tamaño de la ventana
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
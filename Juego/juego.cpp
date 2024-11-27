#include <SFML/Graphics.hpp>
#include <SFML/Window.hpp>
#include <iostream>
#include <vector>

using namespace sf;

class Enemy {
public:
    RectangleShape shape;

    Enemy(float x, float y) {
        shape.setSize(Vector2f(50, 100)); // Tamaño del enemigo
        shape.setFillColor(Color::Green); // Color del enemigo
        shape.setPosition(x, y);
    }

    void draw(RenderWindow& window) {
        window.draw(shape);
    }
};

int main() {
    RenderWindow window(VideoMode(800, 600), "Shooter en Primera Persona");

    // Cruceta
    RectangleShape crosshair(Vector2f(20, 2));
    crosshair.setFillColor(Color::Red);
    crosshair.setOrigin(10, 1);
    
    // Marcador de puntos
    int score = 0;
    Font font;
    font.loadFromFile("arial.ttf"); // Asegúrate de tener una fuente
    Text scoreText("Puntos: 0", font, 30);
    scoreText.setPosition(10, 10);

    // Temporizador
    int timeElapsed = 0;
    Clock clock;

    // Enemigos
    std::vector<Enemy> enemies;
    for (int i = 0; i < 5; i++) {
        enemies.emplace_back(rand() % 700, rand() % 500);
    }

    while (window.isOpen()) {
        Event event;
        while (window.pollEvent(event)) {
            if (event.type == Event::Closed)
                window.close();
        }

        // Manejo de entrada
        if (Keyboard::isKeyPressed(Keyboard::Escape)) {
            // Aquí puedes pausar el juego
            std::cout << "Juego Pausado!" << std::endl;
        }

        // Actualizar temporizador
        timeElapsed = static_cast<int>(clock.getElapsedTime().asSeconds());

        // Actualizar texto del marcador
        scoreText.setString("Puntos: " + std::to_string(score));

        // Renderizar
        window.clear(Color::Cyan); // Color de fondo

        // Dibujar enemigos
        for (auto& enemy : enemies) {
            enemy.draw(window);
        }

        // Dibujar cruceta
        crosshair.setPosition(window.getSize().x / 2, window.getSize().y / 2);
        window.draw(crosshair);

        // Dibujar marcador
        window.draw(scoreText);

        // Dibujar temporizador
        std::string timerText = "Tiempo: " + std::to_string(timeElapsed);
        Text timeText(timerText, font, 30);
        timeText.setPosition(150, 10);
        window.draw(timeText);

        window.display();
    }

    return 0;
}

import { render, screen } from "@testing-library/react";
import App from "./App";

describe("Pruebas en el componente principal, App", () => {
/*  beforeEach(() => {
    render(<App />);
  }); FUNCIONA PERO DA ERROR EN ESLINT*/
  test("renders learn react link", () => {
    render(<App />);  // Mover render aquí
    const mensaje = screen.getByText(/learn react/i);
    expect(mensaje).toBeInTheDocument();
  });

  test("nueva prueba", () => {
    render(<App />);  // También aquí
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  });

  });

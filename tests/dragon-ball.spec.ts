import { describe, test, expect } from "vitest";
import { findCharacter } from "../src/ejercicio-clase/dragon-ball.js";

describe("findCharacter", () => {
  test("Sin argumentos (filtro vacío)", () => {
    return findCharacter({})
      .then((data) => {
        expect(data).toBeDefined();
        expect(data.body).toBeDefined();
      });
  });

  test("Filtrar por nombre", () => {
    return findCharacter({ name: "Goku" })
      .then((data) => {
        expect(data).toBeDefined();
        expect(data.body).toBeDefined();
        expect(data.body[0].name).toBe("Goku");
      });
  });

  test("Filtrar por raza", () => {
    return findCharacter({ race: "Saiyan" })
      .then((data) => {
        expect(data).toBeDefined();
        expect(data.body).toBeDefined();
        expect(data.body.length).toBeGreaterThan(0);
        expect(data.body[0].race).toBe("Saiyan");
      });
  });

  test("Filtrar por nombre y raza", () => {
    return findCharacter({ name: "Goku", race: "Saiyan" })
      .then((data) => {
        expect(data).toBeDefined();
        expect(data.body).toBeDefined();
        expect(data.body[0].name).toBe("Goku");
        expect(data.body[0].race).toBe("Saiyan");
      });
  });

  test("Filtro sin resultados", () => {
    return findCharacter({ name: "NonExistentCharacter" })
      .catch((error) => {
        expect(error).toBe("Dragon-Ball API error: no character found");
      });
  });

  test("Filtro con valores inválidos", () => {
    return findCharacter({ name: "", race: "" })
      .catch((error) => {
        expect(error).toBe("Dragon-Ball API error: no character found");
      });
  });
});
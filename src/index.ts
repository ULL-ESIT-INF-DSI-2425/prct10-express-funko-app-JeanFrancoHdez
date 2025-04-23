/**
 * Emula el comportamiento de la función `map` proporcionada por el lenguaje.
 * 
 * @param listOfNumbers - Un array de valores numéricos que se desea modificar.
 * @param operation - Un callback que se aplica a cada elemento del array. 
 *                    Este callback recibe un número y devuelve un número modificado.
 * @returns Un nuevo array con los resultados de aplicar el callback a cada elemento del array de entrada.
 * 
 * Ejemplo de uso:
 * ```
 * const result = myMap([0, 1, 2, 3, 4], (item) => item * item);
 * ```
 */

export function myMap(listOfNumbers: number[], operation: (x: number) => number): number[] {
  let result: number[] = [];
  
  for (let i = 0; i < listOfNumbers.length; i++) {
    result.push(operation(listOfNumbers[i]));
  }
  
  return result;
}
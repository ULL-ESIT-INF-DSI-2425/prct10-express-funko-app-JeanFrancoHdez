import { promises as fs } from 'fs';
import path from 'path';

// Directorio base para almacenar los Funkos
export const FUNKOS_DIRECTORY = './funkos';

/**
 * Asegura que el directorio del usuario exista
 * @param username - Nombre del usuario
 * @returns Ruta al directorio del usuario
 */
export async function ensureUserDir(username: string): Promise<string> {
  const userDir = path.join(FUNKOS_DIRECTORY, username);
  try {
    await fs.mkdir(userDir, { recursive: true });
  } catch (error) {
    console.error(`Error creating directory for user ${username}:`, error);
  }
  return userDir;
}

/**
 * Obtiene la ruta completa al archivo de un Funko
 * @param username - Nombre del usuario
 * @param funkoId - ID del Funko
 * @returns Ruta completa al archivo
 */
export function getFunkoPath(username: string, funkoId: number): string {
  return path.join(FUNKOS_DIRECTORY, username, `${funkoId}.json`);
}

/**
 * Verifica si un archivo existe
 * @param filePath - Ruta al archivo
 * @returns true si el archivo existe, false en caso contrario
 */
export async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}
import { promises as fs } from 'fs';
import path from 'path';
import { FunkoPop } from './funko.js';
import { ensureUserDir, getFunkoPath, fileExists } from './tools.js';

/**
 * Comprueba si un Funko existe para un usuario
 * @param username - Nombre del usuario
 * @param funkoId - ID del Funko
 * @returns true si el Funko existe, false en caso contrario
 */
export async function funkoExists(username: string, funkoId: number): Promise<boolean> {
  const funkoPath = getFunkoPath(username, funkoId);
  return await fileExists(funkoPath);
}

/**
 * Obtiene todos los Funkos de un usuario
 * @param username - Nombre del usuario
 * @returns Array con todos los Funkos del usuario
 */
export async function getUserFunkos(username: string): Promise<FunkoPop[]> {
  const userDir = await ensureUserDir(username);
  
  try {
    const files = await fs.readdir(userDir);
    const jsonFiles = files.filter(file => file.endsWith('.json'));
    
    const funkos: FunkoPop[] = [];
    for (const file of jsonFiles) {
      try {
        const content = await fs.readFile(path.join(userDir, file), 'utf-8');
        const funko: FunkoPop = JSON.parse(content);
        funkos.push(funko);
      } catch (error) {
        console.error(`Error reading file ${file}:`, error);
      }
    }
    
    return funkos;
  } catch (error) {
    console.error(`Error reading files for user ${username}:`, error);
    return [];
  }
}

/**
 * Obtiene un Funko específico
 * @param username - Nombre del usuario
 * @param funkoId - ID del Funko
 * @returns Funko si existe, null en caso contrario
 */
export async function getFunko(username: string, funkoId: number): Promise<FunkoPop | null> {
  const funkoPath = getFunkoPath(username, funkoId);
  
  try {
    const content = await fs.readFile(funkoPath, 'utf-8');
    return JSON.parse(content) as FunkoPop;
  } catch {
    return null;
  }
}

/**
 * Guarda un Funko en el sistema de archivos
 * @param username - Nombre del usuario
 * @param funko - Funko a guardar
 */
export async function saveFunko(username: string, funko: FunkoPop): Promise<void> {
  await ensureUserDir(username);
  const funkoPath = getFunkoPath(username, funko.id);
  
  await fs.writeFile(funkoPath, JSON.stringify(funko, null, 2), 'utf-8');
}

/**
 * Elimina un Funko del sistema de archivos
 * @param username - Nombre del usuario
 * @param funkoId - ID del Funko a eliminar
 */
export async function deleteFunko(username: string, funkoId: number): Promise<void> {
  const funkoPath = getFunkoPath(username, funkoId);
  
  await fs.unlink(funkoPath);
}
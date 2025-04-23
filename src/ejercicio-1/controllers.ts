import { Request, Response } from 'express';
import { FunkoPop } from './funko.js';
import { 
  getUserFunkos, 
  getFunko, 
  funkoExists, 
  saveFunko, 
  deleteFunko 
} from '././services.js';

/**
 * Listar todos los Funkos de un usuario
 */
export async function listFunkos(req: Request, res: Response): Promise<void> {
  const username = req.query.username as string;
  
  if (!username) {
    res.status(400).json({
      success: false,
      message: 'Username is required'
    });
    return;
  }
  
  try {
    const funkos = await getUserFunkos(username);
    
    res.json({
      success: true,
      funkoPops: funkos
    });
  } catch (error) {
    console.error('Error getting Funkos:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}

/**
 * Obtener un Funko específico por ID
 */
export async function getFunkoById(req: Request, res: Response): Promise<void> {
  const username = req.query.username as string;
  const funkoId = parseInt(req.params.id);
  
  if (!username) {
    res.status(400).json({
      success: false,
      message: 'Username is required'
    });
    return;
  }
  
  if (isNaN(funkoId)) {
    res.status(400).json({
      success: false,
      message: 'Invalid Funko ID'
    });
    return;
  }
  
  try {
    const exists = await funkoExists(username, funkoId);
    
    if (!exists) {
      res.status(404).json({
        success: false,
        message: `Funko with ID ${funkoId} not found in user ${username}'s collection`
      });
      return;
    }
    
    const funko = await getFunko(username, funkoId);
    
    res.json({
      success: true,
      funkoPops: funko ? [funko] : []
    });
  } catch (error) {
    console.error('Error getting Funko:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}

/**
 * Añadir un nuevo Funko
 */
export async function addFunko(req: Request, res: Response): Promise<void> {
  const username = req.query.username as string;
  const newFunko: FunkoPop = req.body;
  
  if (!username) {
    res.status(400).json({
      success: false,
      message: 'Username is required'
    });
    return;
  }
  
  // Validación básica
  if (!newFunko || !newFunko.id || typeof newFunko.id !== 'number') {
    res.status(400).json({
      success: false,
      message: 'Invalid Funko data'
    });
    return;
  }
  
  try {
    const exists = await funkoExists(username, newFunko.id);
    
    if (exists) {
      res.status(409).json({
        success: false,
        message: `Funko with ID ${newFunko.id} already exists in user ${username}'s collection`
      });
      return;
    }
    
    await saveFunko(username, newFunko);
    
    res.status(201).json({
      success: true,
      message: `Funko with ID ${newFunko.id} added to user ${username}'s collection`
    });
  } catch (error) {
    console.error('Error adding Funko:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}

/**
 * Modificar un Funko existente
 */
export async function updateFunko(req: Request, res: Response): Promise<void> {
  const username = req.query.username as string;
  const funkoId = parseInt(req.params.id);
  const updatedFunko: Partial<FunkoPop> = req.body;
  
  if (!username) {
    res.status(400).json({
      success: false,
      message: 'Username is required'
    });
    return;
  }
  
  if (isNaN(funkoId)) {
    res.status(400).json({
      success: false,
      message: 'Invalid Funko ID'
    });
    return;
  }
  
  try {
    const exists = await funkoExists(username, funkoId);
    
    if (!exists) {
      res.status(404).json({
        success: false,
        message: `Funko with ID ${funkoId} not found in user ${username}'s collection`
      });
      return;
    }
    
    const existingFunko = await getFunko(username, funkoId);
    
    if (!existingFunko) {
      res.status(404).json({
        success: false,
        message: `Funko with ID ${funkoId} not found in user ${username}'s collection`
      });
      return;
    }
    
    // Actualizar el Funko con los nuevos valores
    const mergedFunko: FunkoPop = {
      ...existingFunko,
      ...updatedFunko,
      id: funkoId // Asegurarse de que el ID no cambia
    };
    
    await saveFunko(username, mergedFunko);
    
    res.json({
      success: true,
      message: `Funko with ID ${funkoId} has been updated in user ${username}'s collection`
    });
  } catch (error) {
    console.error('Error updating Funko:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}

/**
 * Eliminar un Funko
 */
export async function removeFunko(req: Request, res: Response): Promise<void> {
  const username = req.query.username as string;
  const funkoId = parseInt(req.params.id);
  
  if (!username) {
    res.status(400).json({
      success: false,
      message: 'Username is required'
    });
    return;
  }
  
  if (isNaN(funkoId)) {
    res.status(400).json({
      success: false,
      message: 'Invalid Funko ID'
    });
    return;
  }
  
  try {
    const exists = await funkoExists(username, funkoId);
    
    if (!exists) {
      res.status(404).json({
        success: false,
        message: `Funko with ID ${funkoId} not found in user ${username}'s collection`
      });
      return;
    }
    
    await deleteFunko(username, funkoId);
    
    res.json({
      success: true,
      message: `Funko with ID ${funkoId} has been deleted from user ${username}'s collection`
    });
  } catch (error) {
    console.error('Error deleting Funko:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}
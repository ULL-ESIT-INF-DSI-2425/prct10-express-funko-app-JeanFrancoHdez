/**
 * Enumeracion de los tipos de Funkos que hay
 */
export enum FunkoType {
  Pop = 'Pop!',
  PopRides = 'Pop! Rides',
  VynilSoda = 'Vynil Soda',
  VynilGold = 'Vynil Gold',
  Other = 'Other'
}

/**
 * Enumeraciones para los géneros de Funkos
 */ 
export enum FunkoGenre {
  Animation = 'Animación',
  Movies = 'Películas y TV',
  VideoGames = 'Videojuegos',
  Sports = 'Deportes',
  Music = 'Música',
  Anime = 'Ánime',
  Other = 'Other'
}

/**
 * Tipo para representar un Funko Pop
 */
export type FunkoPop = {
  id: number;
  name: string;
  description: string;
  type: FunkoType;
  genre: FunkoGenre;
  franchise: string;
  number: number;
  exclusive: boolean;
  specialFeatures: string;
  marketValue: number;
}

/**
 * Tipo para las respuestas del servidor
 */
export type ResponseType = {
  success: boolean;
  message?: string;
  funkoPops?: FunkoPop[];
}
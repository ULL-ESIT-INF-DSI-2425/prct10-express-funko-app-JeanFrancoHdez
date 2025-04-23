import { describe, it, expect } from 'vitest';
import { FunkoType, FunkoGenre, FunkoPop } from '../src/ejercicio-1/funko';

describe('FunkoPop Models', () => {
  describe('FunkoType enum', () => {
    it('should have the correct values', () => {
      expect(FunkoType.Pop).toBe('Pop!');
      expect(FunkoType.PopRides).toBe('Pop! Rides');
      expect(FunkoType.VynilSoda).toBe('Vynil Soda');
      expect(FunkoType.VynilGold).toBe('Vynil Gold');
      expect(FunkoType.Other).toBe('Other');
    });
  });

  describe('FunkoGenre enum', () => {
    it('should have the correct values', () => {
      expect(FunkoGenre.Animation).toBe('Animación');
      expect(FunkoGenre.Movies).toBe('Películas y TV');
      expect(FunkoGenre.VideoGames).toBe('Videojuegos');
      expect(FunkoGenre.Sports).toBe('Deportes');
      expect(FunkoGenre.Music).toBe('Música');
      expect(FunkoGenre.Anime).toBe('Ánime');
      expect(FunkoGenre.Other).toBe('Other');
    });
  });

  describe('FunkoPop type', () => {
    it('should create a valid FunkoPop object', () => {
      const funko: FunkoPop = {
        id: 1,
        name: 'Test Funko',
        description: 'This is a test funko',
        type: FunkoType.Pop,
        genre: FunkoGenre.Movies,
        franchise: 'Test Franchise',
        number: 42,
        exclusive: false,
        specialFeatures: 'None',
        marketValue: 15.99
      };

      expect(funko).toHaveProperty('id', 1);
      expect(funko).toHaveProperty('name', 'Test Funko');
      expect(funko).toHaveProperty('description', 'This is a test funko');
      expect(funko).toHaveProperty('type', FunkoType.Pop);
      expect(funko).toHaveProperty('genre', FunkoGenre.Movies);
      expect(funko).toHaveProperty('franchise', 'Test Franchise');
      expect(funko).toHaveProperty('number', 42);
      expect(funko).toHaveProperty('exclusive', false);
      expect(funko).toHaveProperty('specialFeatures', 'None');
      expect(funko).toHaveProperty('marketValue', 15.99);
    });
  });

  describe('ResponseType', () => {
    it('should create a valid success response without Funkos', () => {
      const response = {
        success: true,
        message: 'Operation successful'
      };

      expect(response).toHaveProperty('success', true);
      expect(response).toHaveProperty('message', 'Operation successful');
      expect(response).not.toHaveProperty('funkoPops');
    });

    it('should create a valid success response with Funkos', () => {
      const funko: FunkoPop = {
        id: 1,
        name: 'Test Funko',
        description: 'This is a test funko',
        type: FunkoType.Pop,
        genre: FunkoGenre.Movies,
        franchise: 'Test Franchise',
        number: 42,
        exclusive: false,
        specialFeatures: 'None',
        marketValue: 15.99
      };

      const response = {
        success: true,
        funkoPops: [funko]
      };

      expect(response).toHaveProperty('success', true);
      expect(response).toHaveProperty('funkoPops');
      expect(response.funkoPops).toHaveLength(1);
      expect(response.funkoPops?.[0]).toEqual(funko);
    });

    it('should create a valid error response', () => {
      const response = {
        success: false,
        message: 'Operation failed'
      };

      expect(response).toHaveProperty('success', false);
      expect(response).toHaveProperty('message', 'Operation failed');
    });
  });
});
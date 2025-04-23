import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { promises as fs } from 'fs';
import path from 'path';
import { ensureUserDir, getFunkoPath, fileExists, FUNKOS_DIRECTORY } from '../src/ejercicio-1/tools';

// Mock del módulo fs
vi.mock('fs', () => ({
  promises: {
    mkdir: vi.fn(),
    access: vi.fn()
  }
}));

describe('File Utils', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('FUNKOS_DIRECTORY', () => {
    it('should be defined correctly', () => {
      expect(FUNKOS_DIRECTORY).toBe('./funkos');
    });
  });

  describe('ensureUserDir', () => {
    it('should call mkdir with the correct path', async () => {
      const username = 'testuser';
      const expectedPath = path.join(FUNKOS_DIRECTORY, username);
      
      // Mock implementation de mkdir para que sea exitoso
      vi.mocked(fs.mkdir).mockResolvedValue(undefined);
      
      const result = await ensureUserDir(username);
      
      expect(fs.mkdir).toHaveBeenCalledWith(expectedPath, { recursive: true });
      expect(result).toBe(expectedPath);
    });

    it('should handle errors and log them', async () => {
      const username = 'testuser';
      const error = new Error('Test error');
      
      // Mock de console.error
      const consoleSpy = vi.spyOn(console, 'error');
      consoleSpy.mockImplementation(() => undefined);
      
      // Mock implementation de mkdir para que falle
      vi.mocked(fs.mkdir).mockRejectedValue(error);
      
      const result = await ensureUserDir(username);
      
      expect(consoleSpy).toHaveBeenCalled();
      expect(result).toBe(path.join(FUNKOS_DIRECTORY, username));
      
      consoleSpy.mockRestore();
    });
  });

  describe('getFunkoPath', () => {
    it('should return the correct path for a funko', () => {
      const username = 'testuser';
      const funkoId = 42;
      const expectedPath = path.join(FUNKOS_DIRECTORY, username, `${funkoId}.json`);
      
      const result = getFunkoPath(username, funkoId);
      
      expect(result).toBe(expectedPath);
    });
  });

  describe('fileExists', () => {
    it('should return true when file exists', async () => {
      const filePath = '/test/path.json';
      
      // Mock implementation de access para que sea exitoso
      vi.mocked(fs.access).mockResolvedValue(undefined);
      
      const result = await fileExists(filePath);
      
      expect(fs.access).toHaveBeenCalledWith(filePath);
      expect(result).toBe(true);
    });

    it('should return false when file does not exist', async () => {
      const filePath = '/test/path.json';
      
      // Mock implementation de access para que falle
      vi.mocked(fs.access).mockRejectedValue(new Error('File not found'));
      
      const result = await fileExists(filePath);
      
      expect(fs.access).toHaveBeenCalledWith(filePath);
      expect(result).toBe(false);
    });
  });
});
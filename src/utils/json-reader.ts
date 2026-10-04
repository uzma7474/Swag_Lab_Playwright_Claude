import fs from 'fs';
import path from 'path';

/** Reads and parses a JSON file from src/test-data. */
export function readTestData<T>(fileName: string): T {
  const filePath = path.resolve(process.cwd(), 'src', 'test-data', fileName);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Test data file not found: ${filePath}`);
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as T;
}

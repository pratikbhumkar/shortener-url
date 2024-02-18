import { validateURL } from "./validateURL";

describe('validateURL', () => {
  test('should validate URL when provided with a valid URL - https', () => {
    const url = 'https://www.example.com/path/to/page';
    const response = validateURL(url);
    expect(response).toBe(true);
  });

  test('should validate URL when provided with a valid URL - http', () => {
    const url = 'http://www.example.com/path/to/page';
    const response = validateURL(url);
    expect(response).toBe(true);
  });

  test('should return false when provided with an invalid URL', () => {
    const url = 'example.com/path/to/page';
    const response = validateURL(url);
    expect(response).toBe(false);
  });
});
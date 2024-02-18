import { uniqueExtensionCreator } from "./uniqueExtensionCreator";

describe('uniqueExtensionCreator', () => {
  test('should generate random extensions', () => {
   
    const word1 = uniqueExtensionCreator();
    const word2 = uniqueExtensionCreator();
    expect(word1).not.toBe(word2);
  });
});
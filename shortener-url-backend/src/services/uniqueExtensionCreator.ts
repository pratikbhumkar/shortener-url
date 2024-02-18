/**
 * This method creates the unique extension for the original URLs.
 * @returns A 5 letter word that will represent the URL.
 * It can store 456,976 unique URLs
 */
export const uniqueExtensionCreator = () => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let word = '';
    for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * alphabet.length);
        word += alphabet[randomIndex];
    }
    return word;
}
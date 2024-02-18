export const validateURL = (url?: string): boolean =>{
    if (url) {
      const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;    
      return urlPattern.test(url);
    }
    return false
  }
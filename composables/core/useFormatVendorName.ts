// composables/useFormattedString.js

export const useFormattedString = () => {
    const formatString = (inputString) => {
      if (typeof inputString !== 'string') {
        return ''; // Return an empty string if input is not a valid string
      }
  
      return inputString
        .toLowerCase()           // Convert the string to lowercase
        .replace(/\s+/g, '-')    // Replace spaces with dashes
        .trim();                 // Trim any leading or trailing spaces
    };
  
    return {
      formatString
    };
  };
  
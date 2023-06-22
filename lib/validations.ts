
/**
 * Validates a token against a specific regex pattern.
 * 
 * @param token - The token string to be validated.
 * @returns A boolean indicating whether the token matches the regex pattern.
 */
export const validateKey = async (token:string) => {
    const regexPattern = /^AIza[0-9A-Za-z-_]{35}$/;
    const isMatch = regexPattern.test(token);
    return isMatch;
}

/**
 * Validates a token against a specific regex pattern.
 * 
 * @param response - The response from Google.
 * @returns A boolean indicating whether the token was approved or not.
 * @description This function is used to verify the response from Google. 
 * Sometimes API calls return 200 even if the API token is not valid
 */
export const verifyGoogleResponse = async (response: any) => {
    const data = await response.json();
    if (data.status === 'OK' || data.status === 'ZERO_RESULTS') {
        return true;
    } else {
        return false;
    }
}

/**
 * Retrieves the language based on the provided input.
 * @param lang The language to be checked.
 * @returns The valid language or a default language if the input is not allowed.
 */
export const getLanguage = async (lang: string) => {
    const allowedLanguages = ['python', 'bash', 'powershell'];

    if (allowedLanguages.includes(lang)) {
        return lang;
    }
    return 'bash';
}
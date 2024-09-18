import { constructedBaseUrl } from "~/utils/fetchHelper";

// Types and interfaces
import type { AuthenticateResponse } from "@/interfaces/api/AuthenticationInterface";

const APP_NAME = 'authentication';
const SESSION_URL = 'sessions';

/*
 * Method to authenticate the user
 * 
 * @returns {Promise<string>} - The status of the app
 */
export const authenticate = async (username: string, password: string) => {
  const runtimeConfig = useRuntimeConfig();

  try {
    const response: AuthenticateResponse = await $fetch<AuthenticateResponse>(`${constructedBaseUrl()}/${APP_NAME}/${SESSION_URL}/authenticate/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    });
    return response;
  } catch (error: any) {
    console.error('Error authenticating user:', error.message);
    throw new Error(`Authentication failed: ${error}`);
  }
}
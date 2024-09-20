import { constructedBaseUrl } from "~/utils/fetchHelper";

const BASE_URL = 'sessions';

/*
 * @interface SessionResponse
 * 
 * @param {string} session The session ID
 */
interface SessionResponse {
  id: string;
}

/*
 * Get the session ID from the API
 *
 * @returns {Promise<string>} The session ID
 */
export const getSessionId = async () => {
  const runtimeConfig = useRuntimeConfig();

  const response: SessionResponse = await $fetch<SessionResponse>(`${constructedBaseUrl(BASE_URL)}session-id`);

  console.log(`Session ID: ${response.id}`);
  return response.id;
}

export const retrieveSessionFromToken = async () => {
  const runtimeConfig = useRuntimeConfig();
  const token = localStorage.getItem("token");

  const response: SessionResponse = await $fetch<SessionResponse>(`${constructedBaseUrl()}/authentication/sessions/retrieve-from-token/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}
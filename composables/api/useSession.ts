import { constructedBaseUrl } from "~/utils/fetchHelper";

const BASE_URL = 'authentication';

/*
 * @interface SessionResponse
 * 
 * @param {string} session The session ID
 */
interface SessionResponse {
  session: string;
}

/*
 * Get the session ID from the API
 *
 * @returns {Promise<string>} The session ID
 */
export const getSessionId = async () => {
  const runtimeConfig = useRuntimeConfig();

  const response: SessionResponse = await $fetch<SessionResponse>(`${constructedBaseUrl(BASE_URL)}sessions/session-id`);

  return response.session;
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
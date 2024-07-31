const runtimeConfig = useRuntimeConfig();

/*
 *
 * Method to authenticate the user
 * 
 * @param {string} username - The username of the user
 * @param {string} password - The password of the user
 * 
 * @returns {Promise} - The response from the API
 */
export const getSessionId = async () => {
  const url = `${runtimeConfig.public.apiProtocol}://${runtimeConfig.public.apiBase}:${runtimeConfig.public.apiPort}/api/authentication/sessions/session-id`;
  const response: any = await fetch(url, {
    method: 'get',
  });

  return response.json()
}

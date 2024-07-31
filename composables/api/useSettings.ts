/*
 *
 * Method to fetch the settings
 *
 * @param {string} token - The token to authenticate the request
 *
 * @returns {Promise} - The response from the API
 */
export const fetchSettings = async (token: string | null) => {
  const runtimeConfig = useRuntimeConfig();
  const url = `${runtimeConfig.public.apiProtocol}://${runtimeConfig.public.apiBase}:${runtimeConfig.public.apiPort}/api/settings/`;
  const response: any = await $fetch(url, {
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

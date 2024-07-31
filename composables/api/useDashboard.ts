const runtimeConfig = useRuntimeConfig();

/*
 *
 * Method to fetch the dashboard data
 *
 * @param {string} token - The token to authenticate the request
 *
 * @returns {Promise} - The response from the API
 */
export const fetchDashboard = async (token: string | null) => {
  const url = `${runtimeConfig.public.apiProtocol}://${runtimeConfig.public.apiBase}:${runtimeConfig.public.apiPort}/api/users/retrieve-dashboard`;
  const response: any = await $fetch(url, {
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

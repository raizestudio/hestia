import { constructedBaseUrl } from "~/utils/fetchHelper";

interface HealthCheckResponse {
  status: string;
}

const CORE_URL = 'app';

/*
 * Method to check the health of the app
 * 
 * @returns {Promise<string>} - The status of the app
 */
export const healthCheck = async () => {
  const runtimeConfig = useRuntimeConfig();

  const response: HealthCheckResponse = await $fetch(`${constructedBaseUrl(CORE_URL)}health-check`);
  return response.status;
}

/*
 *
 * Method to fetch the settings
 *
 * @param {string} token - The token to authenticate the request
 *
 * @returns {Promise} - The response from the API
 */
export const fetchSettings = async () => {
  const token = localStorage.getItem("token");
  const url = `${constructedBaseUrl()}settings/`;
  const response: any = await $fetch(url, {
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

import { constructedBaseUrl } from "@/helpers/fetchHelper";

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

  const response: HealthCheckResponse = await $fetch<HealthCheckResponse>(`${constructedBaseUrl()}/${CORE_URL}/health-check`);

  // console.log(`Health Check: ${response.status}`);
  return response.status;
}
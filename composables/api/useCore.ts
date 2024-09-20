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

  const response: any = await $fetch(`${constructedBaseUrl(CORE_URL)}health-check`);
  return response.status;
}
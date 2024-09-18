/*
 * This file is used to create a base URL for the API calls.
 * 
 * @returns {string} The base URL for the API calls.
 */
export const constructedBaseUrl = (): string => {
    const runtimeConfig = useRuntimeConfig();
    return `${runtimeConfig.public.apiProtocol}://${runtimeConfig.public.apiHost}:${runtimeConfig.public.apiPort}/${runtimeConfig.public.apiBasePath}`;
};
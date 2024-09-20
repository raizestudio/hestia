/*
 * This file is used to create a base URL for the API calls.
 * 
 * @returns {string} The base URL for the API calls.
 */
export const constructedBaseUrl = (baseApp?: string): string => {
    const { public: { apiProtocol, apiHost, apiPort, apiBasePath } } = useRuntimeConfig();

    if (!apiProtocol || !apiHost || !apiPort || !apiBasePath) {
        throw new Error('Missing necessary runtime configuration for API URL construction.');
    }

    const basePath = baseApp ? `${baseApp}/` : '';
    return `${apiProtocol}://${apiHost}:${apiPort}/${apiBasePath}/${basePath}`;
};
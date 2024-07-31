/*
 *
 * Method to fetch the services
 * 
 * @param {string} token - The token to authenticate the request
 * @param {number} page - The page number to fetch
 * @param {number} itemsPerPage - The number of items per page
 * @param {string} objects - The objects to fetch
 * @param {string} expand - The fields to expand
 * 
 * @returns {Promise} - The response from the API
 */
export const fetchServices = async (
  token: string | null,
  page: number = 1,
  itemsPerPage: number = 20,
  objects: string = "",
  expand: string = "author,updated_by,tags,categories"
) => {
  const runtimeConfig = useRuntimeConfig();
  const url = `${runtimeConfig.public.apiProtocol}://${runtimeConfig.public.apiBase}:${runtimeConfig.public.apiPort}/api/services?page=${page}&page_size=${itemsPerPage}&expand=${expand}&objects=${objects}`;
  const response: any = await $fetch(url, {
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

/*
 *
 * Method to create a service
 * 
 * @param {string} token - The token to authenticate the request
 * @param {object} data - The data to create the service
 * 
 * @returns {Promise} - The response from the API
 */
export const createService = async (token: string, data: any) => {
  const coreStore = useCoreStore();
  const runtimeConfig = useRuntimeConfig();
  const url = `${runtimeConfig.public.apiProtocol}://${runtimeConfig.public.apiBase}:${runtimeConfig.public.apiPort}/api/services/`;
  try {
    const response: any = await $fetch(url, {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    coreStore.addNotification({
      id: "success",
      title: "Succès",
      message: `Le service ${response.name} a été créé avec succès!`,
      type: "success",
      isRead: false,
      timestamp: new Date().toISOString(),
    });
    return response;
  } catch (error) {
    return error;
  }
};

/*
 *
 * Method to retrieve a service
 * 
 * @param {string} token - The token to authenticate the request
 * @param {string | number} id - The id of the service to retrieve
 * 
 * @returns {Promise} - The response from the API
 */
export const retrieveService = async (token: string, id: string | number) => {
  const runtimeConfig = useRuntimeConfig();
  const url = `${runtimeConfig.public.apiProtocol}://${runtimeConfig.public.apiBase}:${runtimeConfig.public.apiPort}/api/services/${id}`;
  try {
    const response: any = await $fetch(url, {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    return error;
  }
};

/*
 *
 * Method to update a service
 * 
 * @param {string} token - The token to authenticate the request
 * @param {number} id - The id of the service to update
 * @param {object} data - The data to update the service
 * 
 * @returns {Promise} - The response from the API
 */
export const partialUpdateService = async (
  token: string,
  id: number,
  data: any
) => {
  const runtimeConfig = useRuntimeConfig();
  const url = `${runtimeConfig.public.apiProtocol}://${runtimeConfig.public.apiBase}:${runtimeConfig.public.apiPort}/api/services/${id}/`;
  try {
    const response: any = await $fetch(url, {
      method: "patch",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    return response;
  } catch (error) {
    return error;
  }
};

/*
 *
 * Method to delete a service
 * 
 * @param {string} token - The token to authenticate the request
 * @param {number} id - The id of the service to delete
 * 
 * @returns {Promise} - The response from the API
 */
export const deleteService = async (token: string, id: number) => {
  const runtimeConfig = useRuntimeConfig();
  const url = `${runtimeConfig.public.apiProtocol}://${runtimeConfig.public.apiBase}:${runtimeConfig.public.apiPort}/api/services/${id}/`;
  try {
    const response: any = await $fetch(url, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    return error;
  }
};

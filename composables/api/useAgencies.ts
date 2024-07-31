/*
 *
 * Method of fetching agencies
 *
 * @param {string} token - The token to authenticate the request
 * @param {number} page - The page to fetch
 * @param {number} itemsPerPage - The number of items per page
 * @param {string} objects - The objects to fetch 'deleted' or 'all'
 * @param {string} expand - The fields to expand
 *
 * @returns {Promise} - The response from the API
 */
export const fetchAgencies = async (
  token: string | null,
  page: number = 1,
  itemsPerPage: number = 20,
  objects: string = "",
  expand: string = "author,updated_by,group_pro"
) => {
  const runtimeConfig = useRuntimeConfig();
  const url = `${runtimeConfig.public.apiProtocol}://${runtimeConfig.public.apiBase}:${runtimeConfig.public.apiPort}/api/pros/enterprises?page=${page}&page_size=${itemsPerPage}&expand=${expand}&objects=${objects}`;
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
 * Method to create an agency
 *
 * @param {string} token - The token to authenticate the request
 * @param {object} data - The data to create the agency
 *
 * @returns {Promise} - The response from the API
 */
export const createAgency = async (token: string, data: any) => {
  const coreStore = useCoreStore();
  const runtimeConfig = useRuntimeConfig();
  const url = `${runtimeConfig.public.apiProtocol}://${runtimeConfig.public.apiBase}:${runtimeConfig.public.apiPort}/api/pros/enterprises/`;
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
      message: `L'agence ${response.name} a été créé avec succès!`,
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
 * Method to retrieve an agency
 *
 * @param {string} token - The token to authenticate the request
 * @param {string | number} id - The id of the agency to retrieve
 *
 * @returns {Promise} - The response from the API
 */
export const retrieveAgency = async (token: string, id: string | number) => {
  const runtimeConfig = useRuntimeConfig();
  const url = `${runtimeConfig.public.apiProtocol}://${runtimeConfig.public.apiBase}:${runtimeConfig.public.apiPort}/api/pros/enterprises/${id}`;
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
 * Method to partially update an agency
 *
 * @param {string} token - The token to authenticate the request
 * @param {number} id - The id of the agency to update
 * @param {object} data - The data to update the agency
 */
export const partialUpdateAgency = async (
  token: string,
  id: number,
  data: any
) => {
  const runtimeConfig = useRuntimeConfig();
  const url = `${runtimeConfig.public.apiProtocol}://${runtimeConfig.public.apiBase}:${runtimeConfig.public.apiPort}/api/pros/enterprises/${id}/`;
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
 * Method to delete an agency
 *
 * @param {string} token - The token to authenticate the request
 * @param {number} id - The id of the agency to delete
 *
 * @returns {Promise} - The response from the API
 */
export const deleteAgency = async (token: string, id: number) => {
  const runtimeConfig = useRuntimeConfig();
  const url = `${runtimeConfig.public.apiProtocol}://${runtimeConfig.public.apiBase}:${runtimeConfig.public.apiPort}/api/pros/enterprises/${id}/`;
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

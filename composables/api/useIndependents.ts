const runtimeConfig = useRuntimeConfig();

/*
 *
 * Method to fetch the independents data
 *
 * @param {string} token - The token to authenticate the request
 * @param {number} page - The page number
 * @param {number} itemsPerPage - The number of items per page
 * @param {string} objects - The objects to fetch 'deleted' or 'all'
 * @param {string} expand - The fields to expand
 *
 * @returns {Promise} - The response from the API
 */
export const fetchIndependents = async (
  token: string | null,
  page: number = 1,
  itemsPerPage: number = 20,
  objects: string = "",
  expand: string = "author,updated_by,tags,categories"
) => {
  const url = `${runtimeConfig.public.apiProtocol}://${runtimeConfig.public.apiBase}:${runtimeConfig.public.apiPort}/api/pros/self-employed?page=${page}&page_size=${itemsPerPage}&expand=${expand}&objects=${objects}`;
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
 * Method to create an independent
 *
 * @param {string} token - The token to authenticate the request
 * @param {object} data - The data to create the independent
 *
 * @returns {Promise} - The response from the API
 */
export const createIndependent = async (token: string, data: any) => {
  const coreStore = useCoreStore();
  const url = `${runtimeConfig.public.apiProtocol}://${runtimeConfig.public.apiBase}:${runtimeConfig.public.apiPort}/api/pros/self-employed/`;
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
      message: `L'indépendant ${response.name} a été créé avec succès!`,
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
 * Method to retrieve an independent
 *
 * @param {string} token - The token to authenticate the request
 * @param {string | number} id - The id of the independent to retrieve
 *
 * @returns {Promise} - The response from the API
 */
export const retrieveIndependent = async (
  token: string,
  id: string | number
) => {
  const url = `${runtimeConfig.public.apiProtocol}://${runtimeConfig.public.apiBase}:${runtimeConfig.public.apiPort}/api/pros/self-employed/${id}`;
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
 * Method to update an independent
 *
 * @param {string} token - The token to authenticate the request
 * @param {number} id - The id of the independent to update
 * @param {object} data - The data to update the independent
 *
 * @returns {Promise} - The response from the API
 */
export const partialUpdateIndependent = async (
  token: string,
  id: number,
  data: any
) => {
  const url = `${runtimeConfig.public.apiProtocol}://${runtimeConfig.public.apiBase}:${runtimeConfig.public.apiPort}/api/pros/self-employed/${id}/`;
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
 * Method to delete an independent
 *
 * @param {string} token - The token to authenticate the request
 * @param {number} id - The id of the independent to delete
 *
 * @returns {Promise} - The response from the API
 */
export const deleteIndependent = async (token: string, id: number) => {
  const url = `${runtimeConfig.public.apiProtocol}://${runtimeConfig.public.apiBase}:${runtimeConfig.public.apiPort}/api/pros/self-employed/${id}/`;
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

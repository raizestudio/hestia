const runtimeConfig = useRuntimeConfig();

/*
 * Fetch assets
 *
 * @param {string} token - The token to authenticate the request
 * @param {number} page - The page to fetch
 * @param {number} itemsPerPage - The number of items per page
 * @param {string} objects - The objects to fetch
 * @param {string} expand - The fields to expand
 * 
 * @returns {Promise} - The response from the API
 */
export const fetchAssets = async (
  token: string | null,
  page: number = 1,
  itemsPerPage: number = 20,
  objects: string = "",
  expand: string = "author,updated_by,tags,categories"
) => {
  const url = `${runtimeConfig.public.apiProtocol}://${runtimeConfig.public.apiBase}:${runtimeConfig.public.apiPort}/api/assets?page=${page}&page_size=${itemsPerPage}&expand=${expand}&objects=${objects}`;
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
 * Method to create an asset
 * 
 * @param {string} token - The token to authenticate the request
 * @param {object} data - The data to create the asset
 * 
 * @returns {Promise} - The response from the API
 */
export const createAsset = async (token: string, data: any) => {
  const coreStore = useCoreStore();
  const url = `${runtimeConfig.public.apiProtocol}://${runtimeConfig.public.apiBase}:${runtimeConfig.public.apiPort}/api/assets/`;
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
      message: `L'actif ${response.name} a été créé avec succès!`,
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
 * Method to retrieve an asset
 * 
 * @param {string} token - The token to authenticate the request
 * @param {string | number} id - The id of the asset to retrieve
 * 
 * @returns {Promise} - The response from the API
 */
export const retrieveAsset = async (token: string, id: string | number) => {
  const url = `${runtimeConfig.public.apiProtocol}://${runtimeConfig.public.apiBase}:${runtimeConfig.public.apiPort}/api/assets/${id}`;
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
 * Method to update an asset
 * 
 * @param {string} token - The token to authenticate the request
 * @param {number} id - The id of the asset to update
 * @param {object} data - The data to update the asset
 * @param {boolean} restore - The flag to restore the asset
 * 
 * @returns {Promise} - The response from the API
 */
export const partialUpdateAsset = async (
  token: string,
  id: number,
  data: any,
  restore?: boolean
) => {
  const url = `${runtimeConfig.public.apiProtocol}://${runtimeConfig.public.apiBase}:${runtimeConfig.public.apiPort}/api/assets/${id}/?restore=${restore}`;
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
 * Method to delete an asset
 * 
 * @param {string} token - The token to authenticate the request
 * @param {number} id - The id of the asset to delete
 * 
 * @returns {Promise} - The response from the API
 */
export const deleteAsset = async (token: string, id: number) => {
  const url = `${runtimeConfig.public.apiProtocol}://${runtimeConfig.public.apiBase}:${runtimeConfig.public.apiPort}/api/assets/${id}/`;
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

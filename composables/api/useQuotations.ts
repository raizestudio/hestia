/*
 *
 * Method to fetch the quotation references
 * 
 * @param {string} token - The token to authenticate the request
 * @param {number} page - The page number
 * @param {number} itemsPerPage - The number of items per page
 * @param {string} objects - The objects to fetch
 * @param {string} expand - The fields to expand
 * 
 * @returns {Promise} - The response from the API
 */
export const fetchQuotationReferences = async (
  token: string | null,
  page: number = 1,
  itemsPerPage: number = 20,
  objects: string = "",
  expand: string = "author,updated_by,quotation_reference_scope,service,asset,currency"
) => {
  const runtimeConfig = useRuntimeConfig();
  const url = `${runtimeConfig.public.apiProtocol}://${runtimeConfig.public.apiBase}:${runtimeConfig.public.apiPort}/api/quotations/references?page=${page}&page_size=${itemsPerPage}&expand=${expand}&objects=${objects}`;
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
 * Method to create a quotation reference
 * 
 * @param {string} token - The token to authenticate the request
 * @param {object} data - The data to create the quotation reference
 * 
 * @returns {Promise} - The response from the API
 */
export const createQuotationReference = async (token: string, data: any) => {
  const coreStore = useCoreStore();
  const runtimeConfig = useRuntimeConfig();
  const url = `${runtimeConfig.public.apiProtocol}://${runtimeConfig.public.apiBase}:${runtimeConfig.public.apiPort}/api/quotations/references/`;
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
 * Method to retrieve a quotation reference
 * 
 * @param {string} token - The token to authenticate the request
 * @param {string | number} id - The id of the quotation reference to retrieve
 * 
 * @returns {Promise} - The response from the API
 */
export const retrieveQuotationReference = async (
  token: string,
  id: string | number
) => {
  const runtimeConfig = useRuntimeConfig();
  const url = `${runtimeConfig.public.apiProtocol}://${runtimeConfig.public.apiBase}:${runtimeConfig.public.apiPort}/api/quotations/references/${id}`;
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
 * Method to update a quotation reference
 * 
 * @param {string} token - The token to authenticate the request
 * @param {number} id - The id of the quotation reference to update
 * @param {object} data - The data to update the quotation reference
 * 
 * @returns {Promise} - The response from the API
 */
export const partialUpdateQuotationReference = async (
  token: string,
  id: number,
  data: any
) => {
  const runtimeConfig = useRuntimeConfig();
  const url = `${runtimeConfig.public.apiProtocol}://${runtimeConfig.public.apiBase}:${runtimeConfig.public.apiPort}/api/quotations/references/${id}/`;
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
 * Method to delete a quotation reference
 * 
 * @param {string} token - The token to authenticate the request
 * @param {number} id - The id of the quotation reference to delete
 * 
 * @returns {Promise} - The response from the API
 */
export const deleteQuotationReference = async (token: string, id: number) => {
  const runtimeConfig = useRuntimeConfig();
  const url = `${runtimeConfig.public.apiProtocol}://${runtimeConfig.public.apiBase}:${runtimeConfig.public.apiPort}/api/quotations/references/${id}/`;
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

/*
 *
 * Method to fetch the quotations
 * 
 * @param {string} token - The token to authenticate the request
 * @param {number} page - The page number
 * @param {number} itemsPerPage - The number of items per page
 * @param {string} objects - The objects to fetch
 * @param {string} expand - The fields to expand
 * 
 * @returns {Promise} - The response from the API
 */
export const fetchQuotations = async (
  token: string | null,
  page: number = 1,
  itemsPerPage: number = 20,
  objects: string = "",
  expand: string = "author,updated_by,quotation_references"
) => {
  const runtimeConfig = useRuntimeConfig();
  const url = `${runtimeConfig.public.apiProtocol}://${runtimeConfig.public.apiBase}:${runtimeConfig.public.apiPort}/api/quotations?page=${page}&page_size=${itemsPerPage}&expand=${expand}&objects=${objects}`;
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
 * Method to create a quotation
 * 
 * @param {string} token - The token to authenticate the request
 * @param {object} data - The data to create the quotation
 * 
 * @returns {Promise} - The response from the API
 */
export const createQuotation = async (token: string, data: any) => {
  const coreStore = useCoreStore();
  const runtimeConfig = useRuntimeConfig();
  const url = `${runtimeConfig.public.apiProtocol}://${runtimeConfig.public.apiBase}:${runtimeConfig.public.apiPort}/api/quotations/`;
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
 * Method to retrieve a quotation
 * 
 * @param {string} token - The token to authenticate the request
 * @param {string | number} id - The id of the quotation to retrieve
 * 
 * @returns {Promise} - The response from the API
 */
export const retrieveQuotation = async (token: string, id: string | number) => {
  const runtimeConfig = useRuntimeConfig();
  const url = `${runtimeConfig.public.apiProtocol}://${runtimeConfig.public.apiBase}:${runtimeConfig.public.apiPort}/api/quotations/${id}`;
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
 * Method to update a quotation
 * 
 * @param {string} token - The token to authenticate the request
 * @param {number} id - The id of the quotation to update
 * @param {object} data - The data to update the quotation
 * 
 * @returns {Promise} - The response from the API
 */
export const partialUpdateQuotation = async (
  token: string,
  id: number,
  data: any
) => {
  const runtimeConfig = useRuntimeConfig();
  const url = `${runtimeConfig.public.apiProtocol}://${runtimeConfig.public.apiBase}:${runtimeConfig.public.apiPort}/api/quotations/${id}/`;
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
 * Method to delete a quotation
 * 
 * @param {string} token - The token to authenticate the request
 * @param {number} id - The id of the quotation to delete
 * 
 * @returns {Promise} - The response from the API
 */
export const deleteQuotation = async (token: string, id: number) => {
  const runtimeConfig = useRuntimeConfig();
  const url = `${runtimeConfig.public.apiProtocol}://${runtimeConfig.public.apiBase}:${runtimeConfig.public.apiPort}/api/quotations/${id}/`;
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

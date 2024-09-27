import { constructedBaseUrl } from "~/utils/fetchHelper";

/*
 *
 * Method to fetch users from the API
 *
 * @param {string} token - The token to authenticate the request
 * @param {number} page - The page number to fetch
 * @param {number} itemsPerPage - The number of items to fetch per page
 * @param {string} objects - The objects to fetch 'deleted' or 'all'
 * @param {string} expand - The fields to expand
 *
 * @returns {Promise} - The response from the API
 */
export const fetchUsers = async (
  page: number = 1,
  itemsPerPage: number = 20,
  objects: string = "",
  expand: string = "role.group,addresses,phone_numbers,user_preferences,user_security"
) => {
  const runtimeConfig = useRuntimeConfig();
  const token = localStorage.getItem("token");
  const coreStore = useCoreStore();
  const url = `${constructedBaseUrl()}users/?page=${page}&page_size=${itemsPerPage}&expand=${expand}&objects=${objects}`;
  try {
    const response: any = await $fetch(url, {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    // coreStore.addNotification({
    //   id: "error",
    //   title: "Erreur",
    //   message:
    //     "Une erreur est survenue lors de la récupération des utilisateurs",
    //   type: "error",
    //   isRead: false,
    //   timestamp: new Date().toISOString(),
    // });
    return error;
  }
};

/*
 *
 * Method to retrieve a user
 *
 * @param {string} token - The token to authenticate the request
 * @param {username} username - The username of the user to retrieve
 * @param {string} objects - The objects to fetch 'deleted' or 'all'
 * @param {string} expand - The fields to expand
 *
 * @returns {Promise} - The response from the API
 */
export const retrieveUser = async (
  token: string,
  username: string,
  objects: string = "",
  expand: string = "role.group,addresses,phone_numbers,user_preferences,user_security"
) => {
  const runtimeConfig = useRuntimeConfig();
  const url = `${runtimeConfig.public.apiProtocol}}://${runtimeConfig.public.apiBase}:${runtimeConfig.public.apiPort}/${runtimeConfig.public.apiBaseUrl}/users/${username}/?expand=${expand}&objects=${objects}`;
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
 * Method to partially update a user
 *
 * @param {string} token - The token to authenticate the request
 * @param {username} username - The username of the user to update
 * @param {object} data - The data to update
 *
 * @returns {Promise} - The response from the API
 */
export const partialUpdateUser = async (
  username: string,
  data: any,
  objects: string = "all",
  token?: string
) => {
  const runtimeConfig = useRuntimeConfig();
  const url = `${runtimeConfig.public.apiProtocol}://${runtimeConfig.public.apiBase}:${runtimeConfig.public.apiPort}/${runtimeConfig.public.apiBaseUrl}/users/${username}/?objects=${objects}`;
  try {
    const token = localStorage.getItem("token");
    const headers = token
      ? { Authorization: `Bearer ${String(token)}` }
      : ({} as any);

    const response: any = await $fetch(url, {
      method: "patch",
      headers,
      body: JSON.stringify(data),
    });

    return response;
  } catch (error) {
    return error;
  }
};

/*
 *
 * Method to search users
 * TODO: this method is probably redundant with the usage of django-filter and filter backends
 *
 * @param {string} token - The token to authenticate the request
 * @param {string} field - The field to search
 * @param {string} query - The query to search
 *
 */
export const searchUsers = async (
  token: string | null,
  field: string,
  query: string
) => {
  const runtimeConfig = useRuntimeConfig();
  const url = `${runtimeConfig.public.apiProtocol}://${runtimeConfig.public.apiBase}:${runtimeConfig.public.apiPort}/${runtimeConfig.public.apiBaseUrl}/users/search?field=${field}&term=${query}`;
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
 * Method to create a user starting from an email
 *
 * @param {string} email - The email to create the user from
 *
 * @returns {Promise} - The response from the API
 */
export const createFromEMail = async (email: string) => {
  const runtimeConfig = useRuntimeConfig();
  const url = `${runtimeConfig.public.apiProtocol}://${runtimeConfig.public.apiBase}:${runtimeConfig.public.apiPort}/${runtimeConfig.public.apiBaseUrl}/users/email/`;
  const response: any = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  return response;
};

/*
 *
 * Method to confirm an email
 *
 * @param {string} code - The code to confirm the email
 *
 * @returns {Promise} - The response from the API
 */
export const confirmEmail = async (code: string) => {
  const runtimeConfig = useRuntimeConfig();
  const url = `${runtimeConfig.public.apiProtocol}://${runtimeConfig.public.apiBase}:${runtimeConfig.public.apiPort}/${runtimeConfig.public.apiBaseUrl}/users/email/activate/${code}`;
  try {
    const response: any = await $fetch(url, {
      method: "get",
    });
    return response;
  } catch (error) {
    return error;
  }
};

/*
 *
 * Method to delete a user
 * 
 * @param {string} token - The token to authenticate the request
 * @param {string} username - The username of the user to delete
 * 
 * @returns {Promise} - The response from the API
 */
export const deleteUser = async (token: string, username: string) => {
  const runtimeConfig = useRuntimeConfig();
  const url = `${runtimeConfig.public.apiProtocol}://${runtimeConfig.public.apiBase}:${runtimeConfig.public.apiPort}/${runtimeConfig.public.apiBaseUrl}/users/${username}/`;
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

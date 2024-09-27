import { constructedBaseUrl } from '../../utils/fetchHelper';

const SERVICE_URL = 'services';

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
  page: number = 1,
  itemsPerPage: number = 20,
  objects: string = "",
  expand: string = "author,updated_by,tags,categories"
) => {
  const token = localStorage.getItem("token");
  const url = `${constructedBaseUrl(SERVICE_URL)}?page=${page}&page_size=${itemsPerPage}&expand=${expand}&objects=${objects}`;
  const response: any = await $fetch(url, {
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

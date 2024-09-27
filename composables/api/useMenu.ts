import { constructedBaseUrl } from '../../utils/fetchHelper';

const MENU_URL = 'app';

/*
 * Method to get the menu items
 * 
 * @returns {Promise<array>} - The menu items
 */
export const fetchMenus = async () => {
  const token = localStorage.getItem('token');
  const response: any = await $fetch(`${constructedBaseUrl()}menus/user-menu`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return response;
}
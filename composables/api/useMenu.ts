import { constructedBaseUrl } from '../../utils/fetchHelper';

const MENU_URL = 'app';

/*
 * Method to get the menu items
 * 
 * @returns {Promise<array>} - The menu items
 */
export const fetchMenus = async () => {
  const response: any = await $fetch(`${constructedBaseUrl(MENU_URL)}menus`);
  return response;
}
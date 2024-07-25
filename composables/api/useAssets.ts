export const fetchAssets = async (token: string | null, page: number = 1, itemsPerPage: number = 20, objects: string = '', expand: string = 'author,updated_by,tags,categories') => {
  const response: any = await $fetch(`http://localhost:8000/api/assets?page=${page}&page_size=${itemsPerPage}&expand=${expand}&objects=${objects}`, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response
}

export const createAsset = async (token: string, data: any) => {
  const coreStore = useCoreStore();
  try {
    const response: any = await $fetch(`http://localhost:8000/api/assets/`, {
      method: 'post',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    coreStore.addNotification({
      id: 'success',
      title: 'Succès',
      message: `L'actif ${response.name} a été créé avec succès!`,
      type: 'success',
      isRead: false,
      timestamp: new Date().toISOString(),
    });
    return response
  } catch (error) {
    return error
  }
}

export const retrieveAsset = async (token: string, id: string | number) => {
  try {
    const response: any = await $fetch(`http://localhost:8000/api/assets/${id}`, {
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response
  } catch (error) {
    return error
  
  }
}

export const partialUpdateAsset = async (token: string, id: number, data: any, restore?: boolean) => {
  try {
    const response: any = await $fetch(`http://localhost:8000/api/assets/${id}/?restore=${restore}`, {
      method: 'patch',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    return response
  } catch (error) {
    return error
  }
}

export const deleteAsset = async (token: string, id: number) => {
  try {
    const response: any = await $fetch(`http://localhost:8000/api/assets/${id}/`, {
      method: 'delete',
      headers: {
        Authorization: `Bearer ${token}`
      },
    });

    return response
  } catch (error) {
    return error
  }
}
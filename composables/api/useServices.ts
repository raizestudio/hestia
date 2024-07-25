export const fetchServices = async (token: string | null, page: number = 1, itemsPerPage: number = 20, objects: string = '', expand: string = 'author,updated_by,tags,categories') => {
  const response: any = await $fetch(`http://localhost:8000/api/services?page=${page}&page_size=${itemsPerPage}&expand=${expand}&objects=${objects}`, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response
}

export const createService = async (token: string, data: any) => {
  const coreStore = useCoreStore();
  try {
    const response: any = await $fetch(`http://localhost:8000/api/services/`, {
      method: 'post',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    coreStore.addNotification({
      id: 'success',
      title: 'Succès',
      message: `Le service ${response.name} a été créé avec succès!`,
      type: 'success',
      isRead: false,
      timestamp: new Date().toISOString(),
    });
    return response
  } catch (error) {
    return error
  }
}

export const retrieveService = async (token: string, id: string | number) => {
  try {
    const response: any = await $fetch(`http://localhost:8000/api/services/${id}`, {
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

export const partialUpdateService = async (token: string, id: number, data: any) => {
  try {
    const response: any = await $fetch(`http://localhost:8000/api/services/${id}/`, {
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

export const deleteService = async (token: string, id: number) => {
  try {
    const response: any = await $fetch(`http://localhost:8000/api/services/${id}/`, {
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
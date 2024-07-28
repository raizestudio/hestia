export const fetchIndependents = async (token: string | null, page: number = 1, itemsPerPage: number = 20, objects: string = '', expand: string = 'author,updated_by,tags,categories') => {
  const response: any = await $fetch(`http://localhost:8000/api/pros/self-employed?page=${page}&page_size=${itemsPerPage}&expand=${expand}&objects=${objects}`, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response
}

export const createIndependent = async (token: string, data: any) => {
  const coreStore = useCoreStore();
  try {
    const response: any = await $fetch(`http://localhost:8000/api/pros/self-employed/`, {
      method: 'post',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    coreStore.addNotification({
      id: 'success',
      title: 'Succès',
      message: `L'indépendant ${response.name} a été créé avec succès!`,
      type: 'success',
      isRead: false,
      timestamp: new Date().toISOString(),
    });
    return response
  } catch (error) {
    return error
  }
}

export const retrieveIndependent = async (token: string, id: string | number) => {
  try {
    const response: any = await $fetch(`http://localhost:8000/api/pros/self-employed/${id}`, {
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

export const partialUpdateIndependent = async (token: string, id: number, data: any) => {
  try {
    const response: any = await $fetch(`http://localhost:8000/api/pros/self-employed/${id}/`, {
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

export const deleteIndependent = async (token: string, id: number) => {
  try {
    const response: any = await $fetch(`http://localhost:8000/api/pros/self-employed/${id}/`, {
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
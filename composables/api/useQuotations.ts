export const fetchQuotationReferences = async (token: string | null, page: number = 1, itemsPerPage: number = 20, objects: string = '', expand: string = 'author,updated_by,quotation_reference_scope,service,asset,currency') => {
  const response: any = await $fetch(`http://localhost:8000/api/quotations/references?page=${page}&page_size=${itemsPerPage}&expand=${expand}&objects=${objects}`, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response
}

export const createQuotationReference = async (token: string, data: any) => {
  const coreStore = useCoreStore();
  try {
    const response: any = await $fetch(`http://localhost:8000/api/quotations/references/`, {
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

export const retrieveQuotationReference = async (token: string, id: string | number) => {
  try {
    const response: any = await $fetch(`http://localhost:8000/api/quotations/references/${id}`, {
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

export const partialUpdateQuotationReference = async (token: string, id: number, data: any) => {
  try {
    const response: any = await $fetch(`http://localhost:8000/api/quotations/references/${id}/`, {
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

export const deleteQuotationReference = async (token: string, id: number) => {
  try {
    const response: any = await $fetch(`http://localhost:8000/api/quotations/references/${id}/`, {
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

export const fetchQuotations = async (token: string | null, page: number = 1, itemsPerPage: number = 20, objects: string = '', expand: string = 'author,updated_by,quotation_references') => {
  const response: any = await $fetch(`http://localhost:8000/api/quotations?page=${page}&page_size=${itemsPerPage}&expand=${expand}&objects=${objects}`, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response
}

export const createQuotation = async (token: string, data: any) => {
  const coreStore = useCoreStore();
  try {
    const response: any = await $fetch(`http://localhost:8000/api/quotations/`, {
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

export const retrieveQuotation = async (token: string, id: string | number) => {
  try {
    const response: any = await $fetch(`http://localhost:8000/api/quotations/${id}`, {
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

export const partialUpdateQuotation= async (token: string, id: number, data: any) => {
  try {
    const response: any = await $fetch(`http://localhost:8000/api/quotations/${id}/`, {
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

export const deleteQuotation= async (token: string, id: number) => {
  try {
    const response: any = await $fetch(`http://localhost:8000/api/quotations/${id}/`, {
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
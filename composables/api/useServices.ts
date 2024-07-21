export const fetchServices = async (token: string | null, page: number = 1, itemsPerPage: number = 20) => {
  const response: any = await $fetch(`http://localhost:8000/api/services?page=${page}&page_size=${itemsPerPage}&expand=created_by,updated_by,tags,categories`, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response
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
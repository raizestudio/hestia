export const fetchQuotationReferences = async (token: string | null, page : number = 1, itemsPerPage: number = 20) => {
  const response: any = await $fetch(`http://localhost:8000/api/quotations/references?page=${page}&page_size=${itemsPerPage}`, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response
}

export const fetchQuotations = async (token: string | null, page : number = 1, itemsPerPage: number = 20) => {
  const response: any = await $fetch(`http://localhost:8000/api/quotations?page=${page}&page_size=${itemsPerPage}`, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response
}
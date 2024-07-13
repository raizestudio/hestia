export const fetchQuotationReferences = async (token: string | null) => {
  const response: any = await $fetch('http://localhost:8000/api/quotations/references', {
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response
}
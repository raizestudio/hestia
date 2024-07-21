export const fetchAgencies = async (token: string | null,  page : number = 1, itemsPerPage: number = 20) => {
  const response: any = await $fetch(`http://localhost:8000/api/pros/enterprises?page=${page}&page_size=${itemsPerPage}`, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response

}

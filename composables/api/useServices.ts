export const fetchServices = async (token: string | null) => {
  const response: any = await $fetch('http://localhost:8000/api/services', {
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response
}
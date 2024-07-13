export const fetchSettings = async (token: string | null) => {
  const response: any = await $fetch('http://localhost:8000/api/settings', {
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response
}
export const fetchDashboard = async (token: string | null) => {
  const response: any = await $fetch('http://localhost:8000/api/users/retrieve-dashboard', {
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response
}
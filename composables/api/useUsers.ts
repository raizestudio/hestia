export const fetchUsers = async (token: string | null) => {
  const response: any = await fetch('http://localhost:8000/api/users/', {
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.json()
}

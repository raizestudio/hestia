export const useUsers = () => {
  const fetchUsers = async (token: string | null) => {
    const response: any = await fetch('http://localhost:8000/api/users/', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response
  }
  return {
    fetchUsers
  }
}

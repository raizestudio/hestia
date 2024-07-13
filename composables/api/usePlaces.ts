export const fetchPlaces = async (token: string | null) => {
  const response: any = await $fetch('http://localhost:8000/api/places', {
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response
}
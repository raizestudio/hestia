export const getSessionId = async () => {
  const response: any = await fetch(`http://localhost:8000/api/authentication/sessions/session-id`, {
    method: 'get',
  });

  return response.json()
}

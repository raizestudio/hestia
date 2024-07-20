export const fetchUsers = async (token: string | null) => {
  const coreStore = useCoreStore();

  try {
    const response: any = await fetch('http://localhost:8000/api/users/', {
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    if (response.status !== 200) {
      coreStore.addNotification({
        id: 'error',
        title: 'Erreur',
        message: 'Une erreur est survenue lors de la récupération des utilisateurs',
        type: 'error',
        isRead: false,
        timestamp: new Date().toISOString(),
      });
    }
    return response.json()
  } catch (error) {
    return error
  }
  
}

export const retrieveUser = async (token: string, username: string) => {
  try {
    const response: any = await $fetch(`http://localhost:8000/api/users/${username}`, {
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response
  } catch (error) {
    return error
  
  }

}

export const searchUsers = async (token: string | null, field: string,query: string) => {
  const response: any = await fetch(`http://localhost:8000/api/users/?field=${field}&term=${query}`, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.json()
}

export const createFromEMail = async (email: string) => {
  const response: any = await fetch('http://localhost:8000/api/users/email/', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  return response
}

export const confirmEmail = async (code: string) => {
  const response: any = await fetch(`http://localhost:8000/api/users/email/activate/${code}`, {
    method: 'get',
  });

  return response
}
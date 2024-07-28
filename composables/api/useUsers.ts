export const fetchUsers = async (
  token: string | null,
  page: number = 1,
  itemsPerPage: number = 20,
  objects: string = "",
  expand: string = "role.group,addresses,phone_numbers,user_preferences,user_security"
) => {
  const coreStore = useCoreStore();

  try {
    const response: any = await $fetch(
      `http://localhost:8000/api/users/?page=${page}&page_size=${itemsPerPage}&expand=${expand}&objects=${objects}`,
      {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    coreStore.addNotification({
      id: "error",
      title: "Erreur",
      message:
        "Une erreur est survenue lors de la récupération des utilisateurs",
      type: "error",
      isRead: false,
      timestamp: new Date().toISOString(),
    });
    return error;
  }
};

export const retrieveUser = async (
  token: string,
  username: string,
  objects: string = "",
  expand: string = "role.group,addresses,phone_numbers,user_preferences,user_security"
) => {
  try {
    const response: any = await $fetch(
      `http://localhost:8000/api/users/${username}/?expand=${expand}&objects=${objects}`,
      {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    return error;
  }
};

export const partialUpdateUser = async (
  token: string,
  username: string,
  data: any
) => {
  try {
    const response: any = await $fetch(
      `http://localhost:8000/api/users/${username}/`,
      {
        method: "patch",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    return response;
  } catch (error) {
    return error;
  }
};
export const searchUsers = async (
  token: string | null,
  field: string,
  query: string
) => {
  const response: any = await $fetch(
    `http://localhost:8000/api/users/search?field=${field}&term=${query}`,
    {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response;
};

export const createFromEMail = async (email: string) => {
  const response: any = await fetch("http://localhost:8000/api/users/email/", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  return response;
};

export const confirmEmail = async (code: string) => {
  try {
    const response: any = await $fetch(
      `http://localhost:8000/api/users/email/activate/${code}`,
      {
        method: "get",
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteUser = async (token: string, username: string) => {
  try {
    const response: any = await $fetch(
      `http://localhost:8000/api/users/${username}/`,
      {
        method: "delete",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    return error;
  }
};

import { constructedBaseUrl } from "~/helpers/fetchHelper";

interface SessionResponse {
  session: string;
}

export const getSessionId = async () => {
  const runtimeConfig = useRuntimeConfig();
  const response: SessionResponse = await $fetch<SessionResponse>(`${constructedBaseUrl()}/authentication/sessions/session-id`);

  return response.session;
}
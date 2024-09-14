const authenticate = useAsyncData(async () => {
  const response = await fetch('/api/auth');
  return response.json();
});
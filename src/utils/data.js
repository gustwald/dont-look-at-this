export const callApi = async () => {
  const response = await fetch('/api/hello');
  const body = await response.json();

  if (response.status !== 200) {
  } else {
    const condoms = body.data;
    return condoms;
  }
};

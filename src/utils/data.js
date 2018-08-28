export const callApi = async () => {
  const response = await fetch("/api/hello");
  const body = await response.json();

  if (response.status !== 200) {
    //error hantera
    this.setState({
      error: body.message
    });
  } else {
    const condoms = body.data;
    return condoms;
  }
};

export const manipulateData = (data) => {

}
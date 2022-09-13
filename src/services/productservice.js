export async function addProduct(values, token) {
  const response = await fetch(`${process.env.REACT_APP_API}/product/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "x-auth-token": token,
    },
    body: JSON.stringify(values),
  });

  const data = await response.json();
  return data;
}
export async function editOneProduct(values, token) {
  const response = await fetch(`${process.env.REACT_APP_API}/product/edit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "x-auth-token": token,
    },
    body: JSON.stringify(values),
  });

  const data = await response.json();
  return data;
}
export async function getAllProducts(token) {
  const response = await fetch(
    `${process.env.REACT_APP_API}/product/getAllProducts`,
    {
      methos: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "Application/json",
        "x-auth-token": token,
      },
    }
  );
  const data = await response.json();
  return data;
}

export async function deleteProduct(values, token) {
  const response = await fetch(`${process.env.REACT_APP_API}/product/delete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "Application/json",
      "x-auth-token": token,
    },
    body: JSON.stringify(values),
  });

  const data = await response.json();
  return data;
}

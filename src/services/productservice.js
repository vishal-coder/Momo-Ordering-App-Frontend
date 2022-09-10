export async function addProduct(values) {
  const response = await fetch(`${process.env.REACT_APP_API}/product/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(values),
  });

  const data = await response.json();
  return data;
}
export async function editOneProduct(values) {
  const response = await fetch(`${process.env.REACT_APP_API}/product/edit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(values),
  });

  const data = await response.json();
  return data;
}
export async function getProducts() {
  const response = await fetch(`${process.env.REACT_APP_API}/product/getAll`, {
    methos: "GET",
    headers: { "Content-Type": "application/json", Accept: "Application/json" },
  });
  const data = await response.json();
  return data;
}

export async function deleteProduct(values) {
  const response = await fetch(`${process.env.REACT_APP_API}/product/delete`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "Application/json" },
    body: JSON.stringify(values),
  });

  const data = await response.json();
  return data;
}

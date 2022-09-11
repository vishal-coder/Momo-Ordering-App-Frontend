export async function saveOrder(values) {
  const response = await fetch(`${process.env.REACT_APP_API}/order/save`, {
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

export async function getAllOrders(token) {
  const response = await fetch(`${process.env.REACT_APP_API}/order/getAll`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const data = await response.json();
  return data;
}

export async function updateOrderStatus(values) {
  const response = await fetch(`${process.env.REACT_APP_API}/order/update`, {
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

export async function getCustomerOrders(values) {
  const response = await fetch(
    `${process.env.REACT_APP_API}/order/getCustomerOrder`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(values),
    }
  );

  const data = await response.json();
  return data;
}

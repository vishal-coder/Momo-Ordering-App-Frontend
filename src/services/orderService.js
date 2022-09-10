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

const header = `http://localhost:3080/`;
const token = localStorage.getItem("token");

async function fetchApiGet(path) {
  const res = await fetch(header + path, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
}
async function fetchApiPost(path, body) {
  await fetch(header + path, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: JSON.stringify(body),
  });
}

async function fetchApiPostUnauth(path, body) {
  const res = await fetch(header + path, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(body),
  });
  return await res.json();
}

export { fetchApiGet, fetchApiPost, fetchApiPostUnauth };

import axios from "axios";
const header = `http://localhost:3080/`;
const token = localStorage.getItem("token");
let url;

async function fetchApiGet(path: string) {
  url = header + path;
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.data;
}
async function fetchApiPost(path: string, body: any) {
  url = header + path;
  await axios.post(url, body, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
async function fetchApiPostUnauth(path: string, body: any) {
  url = header + path;
  const res = await axios.post(url, body, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return await res.data;
}
export { fetchApiGet, fetchApiPost, fetchApiPostUnauth };

import axios from "../utils/axios";

export async function getUsers() {
  return axios.get(
    `https://61acd230d228a9001703ac2d.mockapi.io/cho-thue-xe/users`
  );
}
export async function getXe() {
  return axios.get(
    `https://61acd230d228a9001703ac2d.mockapi.io/cho-thue-xe/xe`
  );
}

export async function addUsers(payload: any) {
  return axios.post(
    `https://61acd230d228a9001703ac2d.mockapi.io/cho-thue-xe/users`,
    payload
  );
}

export async function updUsers(payload: any) {
  const { id } = payload;
  return axios.put(
    `https://61acd230d228a9001703ac2d.mockapi.io/cho-thue-xe/users/${id}`,
    payload
  );
}

export async function delUsers(payload: { id: string }) {
  const { id } = payload;
  return axios.delete(
    `https://61acd230d228a9001703ac2d.mockapi.io/cho-thue-xe/users/${id}`
  );
}

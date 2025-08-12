import axios from "axios";

export async function addComment(data: { email: string, message: string }) {
  const response = await axios.post(`http://localhost:8080/contact`, data);

  return response;
}

import axios from "axios";
import {API_BASE} from "../constants/apiConstant";

export async function addComment(data: {email: string; message: string}) {
  const response = await axios.post(`${API_BASE}/contact`, data);

  return response;
}

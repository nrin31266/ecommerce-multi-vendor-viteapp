import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

interface RequestParams<B = unknown> {
  endpoint: string;
  body?: B;
  method?: "post" | "get" | "delete" | "put";
  isAuthenticated?: boolean;
  params?: string | Record<string, string | number>;
}

const handleAPI = async <T, B = unknown>({
  endpoint,
  body,
  method = "get",
  isAuthenticated = false,
  params
}: RequestParams<B>): Promise<T> => {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (isAuthenticated) {
      const token = localStorage.getItem("jwt");
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }

    const res = await axios({
      url: endpoint,
      method,
      data: body,
      headers,
      baseURL: API_BASE_URL,
      // timeout: 5000,
      params: params
    });

    return res.data;
  } catch (error) {
    
    if (axios.isAxiosError(error) && error.response?.data) {
      throw new Error(error.response.data.message);
    }else{
        console.error("An unexpected error occurred.", error);
        throw new Error("An unexpected error occurred.");
    }
    
  }
};

export default handleAPI;

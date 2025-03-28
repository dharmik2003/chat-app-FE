import toast from "react-hot-toast";

export const APICall = async ({
  url,
  method,
  headers = {},
  body = null,
}: any): Promise<any> => {
  try {
    const backendUrl = process.env.NEXT_BACKEND_URL || "http://localhost:5001";
    const fullUrl = `${backendUrl}${url.startsWith("/") ? url : `/${url}`}`;

    const requestOptions: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      credentials: "include",
    };

    if (body !== null) {
      requestOptions.body = JSON.stringify(body);
    }

    const response = await fetch(fullUrl, requestOptions);

    if (response.status === 500) {
      toast.error("Something went wrong. Please try again.");
      return null;
    }else{
      return await response.json();
    }
    // if (!response.ok) {
    //   const errorBody = await response.text();
    //   throw new Error(
    //     `HTTP error! status: ${response.status}, message: ${errorBody}`
    //   );
    // }

  } catch (error) {
    console.error("Complete API call error:", error);
    toast.error("Something went wrong. Please try again.");
  }
};

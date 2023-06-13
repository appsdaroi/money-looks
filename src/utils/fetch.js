import axios from "axios";
import { getSession } from "next-auth/react";

const FetchWithToken = async ({ path, method, data, token }) => {
  if (!token) {
    const { session } = await getSession();
    token = session.user.token;
  }

  try {
    const req = await axios({
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/${path}`,
      method: method || "POST",
      data: data || {},
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    return req;
  } catch (err) {
    console.log(err);
  }
};

export { FetchWithToken };

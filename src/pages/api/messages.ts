import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error(
    "NEXT_PUBLIC_API_URL is not defined in the environment variables"
  );
}

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { errorCode, id } = req.query;
  let url = API_URL;

  if (id) {
    url = `${API_URL}/${id}`;
  } else if (errorCode) {
    url = `${API_URL}?error_code=${errorCode}`;
  }

  try {
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      },
    });
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching system messages:", error);
    res.status(500).json({ error: "Error fetching system messages" });
  }
};

export default handler;

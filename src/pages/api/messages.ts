import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error(
    "NEXT_PUBLIC_API_URL is not defined in the environment variables"
  );
}

const fetchAllMessages = async (errorCode?: string) => {
  let url = API_URL;
  if (errorCode) {
    url = `${API_URL}?error_code=${errorCode}`;
  }
  const { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    },
  });
  return data;
};

const fetchSpecificMessage = async (id: string) => {
  const url = `${API_URL}/${id}`;
  const { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    },
  });
  return data;
};

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { errorCode, id } = req.query;

  try {
    if (id) {
      const data = await fetchSpecificMessage(id as string);
      res.status(200).json(data);
    } else if (errorCode) {
      const data = await fetchAllMessages(errorCode as string);
      res.status(200).json(data);
    } else {
      const data = await fetchAllMessages();
      res.status(200).json(data);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
};

export default handler;

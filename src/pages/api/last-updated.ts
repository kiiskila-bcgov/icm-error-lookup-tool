import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.API_KEY;

if (!API_URL || !API_KEY) {
  throw new Error("API is not defined in the environment variables");
}

const fetchLastUpdated = async () => {
  const url = `${API_URL}/last-updated`;
  const { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return data;
};

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await fetchLastUpdated();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
};

export default handler;

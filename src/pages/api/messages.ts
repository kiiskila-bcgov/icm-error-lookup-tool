import axios, { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.API_KEY;

if (!API_URL || !API_KEY) {
  throw new Error("API is not defined in the environment variables");
}

const fetchAllMessages = async (errorCode?: string) => {
  let url = API_URL;
  if (errorCode) {
    url = `${API_URL}?error_code=${errorCode}`;
  }
  const { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return data;
};

const fetchSpecificMessage = async (id: string) => {
  try {
    const url = `${API_URL}/${id}`;
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });
    return data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 404) {
      throw { status: 404, message: "Message not found" };
    }
    throw axiosError;
  }
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
    const axiosError = error as AxiosError;
    console.error("Error fetching data:", axiosError.message);
    if (axiosError.response?.status === 404) {
      res.status(404).json({ error: "Message not found" });
    } else {
      res.status(500).json({ error: "Error fetching data" });
    }
  }
};

export default handler;

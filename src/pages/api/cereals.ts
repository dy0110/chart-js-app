// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { cereals } from "@/constants/cereals";
import type { NextApiHandler, NextApiResponse } from "next";

const getCereals: NextApiHandler = async (_, res: NextApiResponse) => {
  res.status(200).json(cereals);
};

export default getCereals;

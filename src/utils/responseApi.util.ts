import type { Response } from "express";

const responseApi = (
  res: Response,
  code: number,
  message: string,
  data: Record<string, unknown> = {},
) => {
  res.status(code).json({
    message,
    ...data,
  });
};

export { responseApi };

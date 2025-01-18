import { Response } from "express";

export const erroGenerico = (res: Response) => {
    res.status(500).json({ message: 'Internal Server Error' });
}

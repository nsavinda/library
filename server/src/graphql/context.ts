import { PrismaClient } from "@prisma/client";
import { Request, Response } from 'express';

import prisma from "../lib/prisma";

export type Context = {
    prisma: PrismaClient;
};

export async function createContext(req:Request ,res:Response): Promise<Context> {
    return{
        prisma,
    };
    
}
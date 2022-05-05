import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
    // Permet de récupèrer les logs des requêtes envoyées
    log: ['query'],
});
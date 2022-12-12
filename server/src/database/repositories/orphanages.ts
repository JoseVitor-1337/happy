import { AppDataSource } from "../data-source";
import { Orphanages } from "../entities/Orphanages";

export const orphanagesRepository = AppDataSource.getRepository(Orphanages);

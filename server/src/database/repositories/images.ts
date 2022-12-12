import { AppDataSource } from "../data-source";
import { Images } from "../entities/Images";

export const imagesRepository = AppDataSource.getRepository(Images);

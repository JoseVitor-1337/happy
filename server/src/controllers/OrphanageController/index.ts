import { Request, Response } from "express";
import * as yup from "yup";
import { Images } from "../../database/entities/Images";
import { Orphanages } from "../../database/entities/Orphanages";

import { orphanagesRepository } from "../../database/repositories/orphanages";
import orphanageView from "../../views/orphanages";

type IImage = {
  path: string;
};

export default {
  async index(request: Request, response: Response) {
    try {
      const orphanages = await orphanagesRepository.find({
        relations: ["images"],
      });

      return response.json({
        success: true,
        orphanages: orphanageView.renderMany(orphanages),
      });
    } catch (error) {
      console.log("error", error);
      return response.json({
        success: false,
        message: "Erro ao lista orfanatos",
      });
    }
  },

  async show(request: Request, response: Response) {
    const id = Number(request.params?.id || 0);

    try {
      const orphanage = await orphanagesRepository.findOne({
        where: { id },
        relations: ["images"],
      });

      if (!orphanage) throw new Error("Orfanato não encontrado");

      return response.json({
        success: true,
        orphanage: orphanageView.render(orphanage),
      });
    } catch (error) {
      return response.json({
        success: false,
        message: "Orfanato não encontrado",
      });
    }
  },

  async delete(request: Request, response: Response) {
    try {
      await orphanagesRepository
        .createQueryBuilder()
        .delete()
        .from(Images)
        .execute();

      await orphanagesRepository
        .createQueryBuilder()
        .delete()
        .from(Orphanages)
        .execute();

      return response.json({
        success: true,
      });
    } catch (error) {
      console.log("error", error);
      return response.json({
        success: false,
      });
    }
  },

  async create(request: Request, response: Response) {
    const requestedFiles = request.files as Express.Multer.File[];

    let images: IImage[] = [];

    if (requestedFiles) {
      images = requestedFiles.map((image) => {
        return { path: image.filename };
      });
    }

    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekands,
    } = request.body;

    const schema = yup.object().shape({
      name: yup.string().required(),
      latitude: yup.string().required(),
      longitude: yup.string().required(),
      about: yup.string().required().max(300),
      instructions: yup.string().required(),
      opening_hours: yup.string().required(),
      open_on_weekands: yup.boolean(),
      images: yup.array(
        yup.object().shape({
          path: yup.string().required(),
        })
      ),
    });

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekands: open_on_weekands === "true",
      images,
    };

    await schema.validate(data, {
      abortEarly: false,
    });

    const orphanage = orphanagesRepository.create(data);

    await orphanagesRepository.save(orphanage);

    return response.json({ orphanage });
  },
};

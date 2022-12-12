import { Orphanages } from "../database/entities/Orphanages";
import imagesView from "./images";

export default {
  render(orphanage: Orphanages) {
    return {
      id: orphanage.id,
      name: orphanage.name,
      about: orphanage.about,
      instructions: orphanage.instructions,
      latitude: Number(orphanage.latitude),
      longitude: Number(orphanage.longitude),
      opening_hours: orphanage.opening_hours,
      open_on_weekands: orphanage.open_on_weekands,
      images: imagesView.renderMany(orphanage.images),
    };
  },

  renderMany(orphanages: Orphanages[]) {
    return orphanages.map((orphanage) => this.render(orphanage));
  },
};

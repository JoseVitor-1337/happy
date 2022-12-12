import { Images } from "../database/entities/Images";

export default {
  render(image: Images) {
    return {
      id: image.id,
      url: `${process.env.API_FILES_URL}${image.path}`,
    };
  },

  renderMany(images: Images[]) {
    return images.map((image) => this.render(image));
  },
};

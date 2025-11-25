import { Center, Service } from "./types";

const DB = {
  CENTERS:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRQc-z1WgW5CHYelKT20QR0tsrx-kqksSPTCQibbXrQYiIZKSmMjEXZKrSGN-EN7GPCrQyYCX3ptEgv/pub?gid=0&single=true&output=csv",
  SERVICES:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRQc-z1WgW5CHYelKT20QR0tsrx-kqksSPTCQibbXrQYiIZKSmMjEXZKrSGN-EN7GPCrQyYCX3ptEgv/pub?gid=327211246&single=true&output=csv",
};

const api = {
  listCenters: async (): Promise<Center[]> => {
    // Get the information from Google Sheets in text format and split it by lines, skipping the first line because it's the header
    const [, ...data] = await fetch(DB.CENTERS, {
      next: { tags: ["beauty-centers"] },
    })
      .then((res) => res.text())
      .then((text) => text.split("\n"));

    const centers: Center[] = data.map((row) => {
      const [id, name, description, brief, image] = row.split(",");
      return {
        id,
        name,
        brief,
        description,
        image: image.replace("\r", ""),
      };
    });

    return centers;
  },
  listServices: async (): Promise<Service[]> => {
    const [, ...data] = await fetch(DB.SERVICES, {
      next: { tags: ["beauty-services"] },
    })
      .then((res) => res.text())
      .then((text) => text.split("\n"));

    const services: Service[] = data.map((row) => {
      const [id, name, duration, price, description, centerId] = row.split(",");
      return {
        id,
        name,
        price: Number(price),
        duration: Number(duration),
        description,
        centerId,
      };
    });

    return services;
  },
  fetchCenterById: async (id: Center["id"]): Promise<Center> => {
    const center = await api
      .listCenters()
      .then((centers) => centers.find((center) => center.id === id));

    if (!center) {
      throw new Error(`center with id ${id} not found`);
    }

    return center;
  },
};

export default api;

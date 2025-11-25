import { Center, Service } from "./types";

const DB = {
  CENTERS:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRQc-z1WgW5CHYelKT20QR0tsrx-kqksSPTCQibbXrQYiIZKSmMjEXZKrSGN-EN7GPCrQyYCX3ptEgv/pub?gid=0&single=true&output=csv",
  SERVICES:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRQc-z1WgW5CHYelKT20QR0tsrx-kqksSPTCQibbXrQYiIZKSmMjEXZKrSGN-EN7GPCrQyYCX3ptEgv/pub?gid=327211246&single=true&output=csv",
};

// Simular un delay en la respuesta de la API
const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, Math.random() * ms));

const api = {
  // Obtener todos los restaurantes
  listCenters: async (): Promise<Center[]> => {
    // Obtenemos la información de Google Sheets en formato texto y la dividimos por líneas, nos saltamos la primera línea porque es el encabezado
    const [, ...data] = await fetch(DB.CENTERS, {
      next: { tags: ["beauty-centers"] },
    })
      .then((res) => res.text())
      .then((text) => text.split("\n"));

    // Convertimos cada línea en un objeto Restaurant, asegúrate de que los campos no posean `,`
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

    // Lo retornamos
    return centers;
  },
  listServices: async (): Promise<Service[]> => {
    // Obtenemos la información de Google Sheets en formato texto y la dividimos por líneas, nos saltamos la primera línea porque es el encabezado
    const [, ...data] = await fetch(DB.SERVICES, {
      next: { tags: ["beauty-services"] },
    })
      .then((res) => res.text())
      .then((text) => text.split("\n"));

    // Convertimos cada línea en un objeto Restaurant, asegúrate de que los campos no posean `,`
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

    // Lo retornamos
    return services;
  },
  // Obtener un restaurante específico por su ID
  fetch: async (id: Center["id"]): Promise<Center> => {
    // Simular un delay en la respuesta de la API
    await sleep(750);

    // Buscar el restaurante con el ID correspondiente
    const center = await api
      .listCenters()
      .then((centers) => centers.find((center) => center.id === id));

    // Lanzar un error si el centere no es encontrado
    if (!center) {
      throw new Error(`center with id ${id} not found`);
    }

    return center;
  },
};

export default api;

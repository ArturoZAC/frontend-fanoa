import adminApi from "../../../api/admin.api";
import type { ServicioCategoriaResponse } from "../interfaces/servicio-cateogira.response";

// const { VITE_API_DEFAULT } = getEnvs();

export const getAllServicioCategoria =
  async (): Promise<ServicioCategoriaResponse[]> => {
    const response = await adminApi.get<ServicioCategoriaResponse[]>(
      "/scategorias"
    );

    return response.data;
  };

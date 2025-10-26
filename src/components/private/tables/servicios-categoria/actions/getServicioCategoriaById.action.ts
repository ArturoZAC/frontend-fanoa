import adminApi from "../../../api/admin.api";
import type { ServicioCategoriaResponse } from "../interfaces/servicio-cateogira.response";

export const getServicioCategoriaById = async (
  id: string
): Promise<ServicioCategoriaResponse> => {
  const response = await adminApi.get<ServicioCategoriaResponse>(`/scategorias/${id}`);
  return response.data;
};

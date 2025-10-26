import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import type { ServicioCategoriaResponse } from "./interfaces/servicio-cateogira.response";
import { getAllServicioCategoria } from "./actions/getAllServiciosCategorias.action";
import { deleteServicioCategoria } from "./actions/deleteServicioCategoria.action";

export const ListaServicioCategoria = (): JSX.Element => {
  const navigate = useNavigate();
  const [totalRegistros, setTotalRegistros] = useState(0);
  const [serviciosCategorias, setServiciosCategorias] = useState<ServicioCategoriaResponse[]>([]);
  const [loadingComponents, setLoadingComponents] = useState(false);

  const getAllProductos = async () => {
    setLoadingComponents(true);
    const data = await getAllServicioCategoria();
    setServiciosCategorias(data);
    setTotalRegistros(data.length);
    setLoadingComponents(false);
  };

  const handleDelete = async (id: string) => {
    const confirmar = window.confirm("¿Seguro que deseas eliminar esta categoría?");
    if (!confirmar) return;

    try {
      await deleteServicioCategoria(id);
      setServiciosCategorias((prev) => prev.filter((item) => item.id !== id));
      setTotalRegistros((prev) => prev - 1);
      alert("Categoría eliminada correctamente ✅");
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert("❌ Error al eliminar la categoría");
    }
  };

  useEffect(() => {
    getAllProductos();
  }, []);

  return (
    <>
      <div className="flex flex-col mb-5 md:flex-row md:items-center md:justify-between gap-y-4">
        <div className="flex flex-col items-center justify-between w-full gap-4 lg:flex-row lg:justify-end">
          <button
            onClick={() => navigate("agregar")}
            className="flex items-center justify-center w-full gap-2 px-4 py-2 text-white transition-colors rounded-lg bg-main hover:bg-main lg:w-fit"
          >
            Crear
          </button>
        </div>
      </div>

      {loadingComponents ? (
        <div>Cargando...</div>
      ) : (
        <div className="p-8 bg-secondary-100 rounded-xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {serviciosCategorias.map((pro) => (
              <div
                className="overflow-hidden transition-transform bg-secondary-900 rounded-xl hover:scale-105"
                key={pro.id}
              >
                <div className="relative aspect-video">
                  <img
                    src={pro.imagen ? `http://localhost:4000/uploads/servicio_categoria/${pro.imagen}` : "/placeholder-image.jpg"}
                    alt={pro.titulo}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute top-2 right-2">
                    <Menu
                      menuButton={
                        <MenuButton className="p-2 transition-colors rounded-lg bg-secondary-100/80 backdrop-blur-sm hover:bg-secondary-100">
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                          </svg>
                        </MenuButton>
                      }
                      align="end"
                      arrow
                      transition
                      menuClassName="bg-secondary-100 p-4"
                    >
                      <MenuItem className="p-0 hover:bg-transparent">
                        <Link
                          to={`editar/${pro.id}`}
                          className="flex items-center flex-1 p-2 text-gray-300 transition-colors rounded-lg hover:bg-secondary-900 gap-x-4"
                        >
                          Editar
                        </Link>
                      </MenuItem>
                      <MenuItem className="p-0 hover:bg-transparent">
                        <button
                          onClick={() => handleDelete(pro.id)}
                          className="flex items-center flex-1 p-2 text-gray-300 transition-colors rounded-lg hover:bg-secondary-900 gap-x-4 w-full text-left"
                        >
                          Eliminar
                        </button>
                      </MenuItem>
                    </Menu>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="mb-2 text-lg font-semibold text-white truncate">
                    {pro.titulo}
                  </h3>
                  <p className="mt-2 text-xs text-gray-500">ID: {pro.id.split("-")[0]}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col justify-between gap-5 mt-8 md:flex-row md:gap-0 content_buttons">
            <p className="ml-1 text-md">{totalRegistros} Registros</p>
          </div>
        </div>
      )}
    </>
  );
};

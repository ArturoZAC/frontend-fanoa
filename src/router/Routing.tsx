import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../context/AuthProvider";
import { Login } from "../components/public/Login";
// import { PrivateLayout } from "../components/private/PrivateLayout";
import Home from "../components/private/tables/Home";
import { EditarContacto } from "../components/private/tables/contacto/EditarContacto";
import { ListaServicio } from "../components/private/tables/servicios/ListaServicio";
import { CrearServicio } from "../components/private/tables/servicios/CrearServicio";
import { EditarServicio } from "../components/private/tables/servicios/EditarServicio";
import { PrivateLayoutV2 } from "../components/private/PrivateLayoutV2";

import { ListaServicioCategoria } from "../components/private/tables/servicios-categoria/ListaServicioCategoria";
import { CrearServicioCategoria } from "../components/private/tables/servicios-categoria/CrearServicioCategoria";
import { EditarServicioCategoria } from "../components/private/tables/servicios-categoria/EditorServicioCategoria";

export const Routing = (): JSX.Element => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="login" element={<Login />} />
          {/* <Route path="admin" element={<PrivateLayout />}> */}
          <Route path="admin" element={<PrivateLayoutV2 />}>
            <Route index element={<Home />} />

            {/* NOTICIAS */}
            <Route path="galeria" element={<ListaServicio />} />
            <Route path="galeria/agregar" element={<CrearServicio />} />
            <Route path="galeria/editar/:id" element={<EditarServicio />} />

            <Route
              path="servicios-categoria"
              element={<ListaServicioCategoria />}
            />
            <Route
              path="servicios-categoria/agregar"
              element={<CrearServicioCategoria />}
            />
            <Route
              path="servicios-categoria/editar/:id"
              element={<EditarServicioCategoria />}
            />

            {/* CONFIGURACION */}
            <Route path="contacto/:id" element={<EditarContacto />} />
          </Route>
          <Route path="*" element={<>Error 404</>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

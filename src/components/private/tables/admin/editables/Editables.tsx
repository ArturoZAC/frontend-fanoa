import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TitleBriefs } from "../../../../shared/TitleBriefs";
import { InputsBriefs } from "../../../../shared/InputsBriefs";
import { Errors } from "../../../../shared/Errors";
import { updateSeccionContactoAction } from "./actions/updateSeccionContacto.action";
import { createSeccionContactoAction } from "./actions/createSeccionContacto.action";
import { getSeccionContactoAction } from "./actions/getSeccionContacto.action";

// --- Validación ---
const ContactoSchema = Yup.object().shape({
  titulo: Yup.string().required("El título es obligatorio"),
  descripcion: Yup.string().required("La descripción es obligatoria"),
});

export const EditContacto = (): JSX.Element => {
  const [contactoId, setContactoId] = useState<string | null>(null);

  const contactoFormik = useFormik({
    initialValues: {
      titulo: "",
      descripcion: "",
    },
    validationSchema: ContactoSchema,
    onSubmit: async (values) => {
      try {
        if (contactoId) {
          await updateSeccionContactoAction(contactoId, values);
          alert("✅ Contacto actualizado correctamente");
        } else {
          const nuevo = await createSeccionContactoAction(values);
          setContactoId(nuevo.id);
          alert("✅ Contacto creado correctamente");
        }
      } catch (error) {
        console.error("Error en Contacto:", error);
      }
    },
  });

  useEffect(() => {
    const loadContacto = async () => {
      const contacto = await getSeccionContactoAction();
      if (contacto) {
        setContactoId(contacto.id);
        contactoFormik.setValues(contacto);
      }
    };
    loadContacto();
  }, []);

  return (
    <form className="p-8 bg-secondary-100 rounded-xl" onSubmit={contactoFormik.handleSubmit}>
      <TitleBriefs titulo="Contacto" />

      <div className="flex flex-col gap-4 mb-5 mt-10">
        <label className="font-medium text-white">Título del contacto</label>
        <InputsBriefs
          name="titulo"
          type="text"
          value={contactoFormik.values.titulo}
          onChange={contactoFormik.handleChange}
          onBlur={contactoFormik.handleBlur}
        />
        <Errors errors={contactoFormik.errors.titulo} touched={contactoFormik.touched.titulo} />

        <label className="font-medium text-white">Descripción del contacto</label>
        <InputsBriefs
          name="descripcion"
          type="text"
          value={contactoFormik.values.descripcion}
          onChange={contactoFormik.handleChange}
          onBlur={contactoFormik.handleBlur}
        />
        <Errors
          errors={contactoFormik.errors.descripcion}
          touched={contactoFormik.touched.descripcion}
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 text-black bg-green-500 rounded-lg hover:bg-green-600"
        >
          Guardar
        </button>
      </div>
    </form>
  );
};

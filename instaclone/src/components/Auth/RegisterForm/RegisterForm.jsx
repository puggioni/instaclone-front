import React from "react";
import "./RegisterForm.scss";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import { REGISTER } from "../../../gql/user";
import { toast } from "react-toastify";
const RegisterForm = ({ setShowLogin }) => {
  const [register] = useMutation(REGISTER);

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Este campo es obligatorio"),
      username: yup
        .string()
        .required(true)
        .matches(
          /^[a-zA-Z0-9-]*$/,
          "El nombre de usuario no puede tener espacios"
        ),
      email: yup
        .string()
        .email("El email no es valido")
        .required("Este campo es obligatorio"),
      password: yup
        .string()
        .required("Este campo es obligatorio")
        .oneOf([yup.ref("repeatPassword")], "Las contraseñas no son iguales"),
      repeatPassword: yup
        .string()
        .required("Este campo es obligatorio")
        .oneOf([yup.ref("password")], "Las contraseñas no son iguales"),
    }),
    onSubmit: async (formValue) => {
      try {
        const newUser = formValue;
        delete newUser.repeatPassword;
        await register({
          variables: {
            input: newUser,
          },
        });
        toast.success("Usuario registrado correctamente");
        setShowLogin(true);
      } catch (error) {
        toast.error(error.message);
        console.log(error);
      }
    },
  });
  return (
    <>
      <h2 className="register-form-title">
        Regístrate para ver fotos y videos de tus amigos.
      </h2>
      <Form className="register-form" onSubmit={formik.handleSubmit}>
        <Form.Input
          type="text"
          placeholder="Nombre y apellidos"
          name="name"
          onChange={formik.handleChange}
          error={formik.errors.name}
        />
        <Form.Input
          type="text"
          placeholder="Nombre de usuario"
          name="username"
          onChange={formik.handleChange}
          error={formik.errors.username}
        />
        <Form.Input
          type="text"
          placeholder="correo electronico"
          name="email"
          onChange={formik.handleChange}
          error={formik.errors.email}
        />
        <Form.Input
          type="password"
          placeholder="Contraseña"
          name="password"
          onChange={formik.handleChange}
          error={formik.errors.password}
        />
        <Form.Input
          type="password"
          placeholder="Repetir contraseña"
          name="repeatPassword"
          onChange={formik.handleChange}
          error={formik.errors.repeatPassword}
        />
        <Button type="submit" className="btn-submit">
          Registrarse
        </Button>
      </Form>
    </>
  );
};

export default RegisterForm;

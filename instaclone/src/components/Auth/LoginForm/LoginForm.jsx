import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../../gql/user";
import { toast } from "react-toastify";
import "./LoginForm.scss";
const LoginForm = () => {
  const [error, setError] = useState("");
  const [login] = useMutation(LOGIN);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("El email no es valido")
        .required("Este campo es obligatorio"),
      password: yup.string().required("Este campo es obligatorio"),
    }),
    onSubmit: async (formValue) => {
      setError("");
      try {
        const { data } = await login({
          variables: {
            input: formValue,
          },
        });
        console.log(data);
      } catch (error) {
        setError(error.message);
      }
    },
  });
  return (
    <>
      <h2 className="login-form-title">
        Regístrate para ver fotos y videos de tus amigos.
      </h2>
      <Form className="login-form" onSubmit={formik.handleSubmit}>
        <Form.Input
          type="text"
          placeholder="Correo electronico"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email}
        />
        <Form.Input
          type="password"
          placeholder="Contraseña"
          name="password"
          onChange={formik.handleChange}
          error={formik.errors.password}
          value={formik.values.password}
        />
        <Button type="submit" className="btn-submit">
          Iniciar Sesion
        </Button>
        {error && <p className="submit-error">{error}</p>}
      </Form>
    </>
  );
};

export default LoginForm;

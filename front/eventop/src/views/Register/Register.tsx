"use client";

import { IRegisterProps, IRegisterErrors } from "@/interfaces/IRegisterProps";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import validateRegisterForm from "@/helpers/validateRegisterForm";
import { register } from "@/helpers/auth.helper";
import { Eye, EyeClosed } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

function Register() {
  const router = useRouter();
  const [userData, setUserData] = useState<IRegisterProps>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<IRegisterErrors>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [touched, setTouched] = useState<{
    name: boolean;
    email: boolean;
    password: boolean;
    confirmPassword: boolean;
  }>({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleOnChange = (e: any) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleOnBlur = (e: any) => {
    setTouched({ ...touched, [e.target.name]: true });
    // Aquí puedes agregar la lógica para validar el campo y establecer errores
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const errors = validateRegisterForm(userData);
    setError(errors);
  }, [userData]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const errors = validateRegisterForm(userData);
    if (Object.values(errors).some((error) => error)) {
      setError(errors);
      return;
    }

    try {
      const res = await register(userData);
      console.log(res);
      Swal.fire({
        title: "Registro exitoso",
        icon: "success",
        customClass: {
          popup: "bg-white shadow-lg rounded-lg p-6",
          title: "text-2xl font-semibold text-gray-800",
          confirmButton:
            "bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded",
        },
        buttonsStyling: false,
      });
      router.push("/login");
    } catch (error: any) {
      console.log("Error en el catch:", error);
      Swal.fire({
        title: "Error en el registro",
        text: error.message,
        icon: "error",
        customClass: {
          popup: "bg-white shadow-lg rounded-lg p-6",
          title: "text-2xl font-semibold text-gray-800",
          confirmButton:
            "bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded",
        },
        buttonsStyling: false,
      });
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="relative flex flex-col m-6 space-y-8 bg-gray-900 shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        <div className="flex flex-col  sm:w-[400px] md:w-[500px] justify-center p-8 md:p-14">
          <div className="flex flex-col p-6">
            <h3 className="text-xl font-semibold leading-6 tracking-tighter text-slate-200">
              Registro
            </h3>
            <p className="mt-1.5 text-sm font-medium text-white/50">
              Crea una cuenta para comenzar.
            </p>
          </div>

          <div className="p-6 pt-0">
            <form onSubmit={handleSubmit}>
              <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30 mb-4">
                <div className="flex justify-between">
                  <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                    Nombre
                  </label>
                </div>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={userData.name}
                  onChange={handleOnChange}
                  onBlur={handleOnBlur}
                  placeholder="Nombre"
                  className="block w-full border-0 bg-transparent p-0 text-sm placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground text-white"
                />
                {touched.name && error.name && (
                  <span className="text-red-500 text-sm block">
                    {error.name}
                  </span>
                )}
              </div>
              <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30 mb-4">
                <div className="flex justify-between">
                  <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                    Email
                  </label>
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={userData.email}
                  onChange={handleOnChange}
                  onBlur={handleOnBlur}
                  placeholder="Correo electrónico"
                  className="block w-full border-0 bg-transparent p-0 text-sm placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground text-white"
                />
                {touched.email && error.email && (
                  <span className="text-red-500 text-sm block">
                    {error.email}
                  </span>
                )}
              </div>
              <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30 mb-4">
                <div className="flex justify-between">
                  <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                    Password
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    value={userData.password}
                    onChange={handleOnChange}
                    onBlur={handleOnBlur}
                    placeholder="Contraseña"
                    className="block w-full border-0 bg-transparent p-0 text-sm placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground text-white"
                  />
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="ml-2 text-sm text-gray-500 focus:outline-none"
                    aria-label={
                      showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                    }
                  >
                    {showPassword ? <Eye /> : <EyeClosed />}
                  </button>
                </div>
                {touched.password && error.password && (
                  <span className="text-red-500 text-sm block">
                    {error.password}
                  </span>
                )}
              </div>
              <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30 mb-4">
                <div className="flex justify-between">
                  <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                    Confirmar Password
                  </label>
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={userData.confirmPassword}
                  onChange={handleOnChange}
                  onBlur={handleOnBlur}
                  placeholder="Confirmar Contraseña"
                  className="block w-full border-0 bg-transparent p-0 text-sm placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground text-white"
                />
                {touched.confirmPassword && error.confirmPassword && (
                  <span className="text-red-500 text-sm block">
                    {error.confirmPassword}
                  </span>
                )}
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                Registrarse
              </button>
            </form>
          </div>
        </div>

        <div className="relative">
          <Image
            src="/foto-registro.jpg"
            width={300}
            height={300}
            alt="login"
            className="hidden md:flex rounded-r-2xl w-[400px] h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default Register;

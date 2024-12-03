"use client";
import { ILoginErrors, ILoginProps } from "@/interfaces/ILoginProps";
import { useEffect, useState } from "react";
import validateLoginForm from "@/helpers/validateLoginForm";
import Swal from "sweetalert2";
import { login } from "@/helpers/auth.helper";
import Cookies from "js-cookie";
import { Eye, EyeClosed } from "lucide-react";
import Image from "next/image";

export const Login = () => {
  const [userData, setUserData] = useState<ILoginProps>({
    email: "",
    password: "",
  });
  const [error, setErrors] = useState<ILoginErrors>({
    email: "",
    password: "",
  });
  const [touched, setTouched] = useState<{ email: boolean; password: boolean }>(
    {
      email: false,
      password: false,
    }
  );

  const [showPassword, setShowPassword] = useState(false);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleOnBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;

    setTouched({
      ...touched,
      [name]: true,
    });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google/login`;
  };

  useEffect(() => {
    const URLparams = new URLSearchParams(window.location.search);
    const token = URLparams.get("token");
    console.log(token);
    if (token) {
      console.log(`Token: ${token}`);
      Cookies.set("accessToken", JSON.stringify(token));
      window.location.href = "/";
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = validateLoginForm(userData);
    setErrors(errors);

    // Comprobación si hay errores, incluyendo un mensaje si los campos están vacíos
    if (Object.values(errors).some((error) => error !== "")) {
      Swal.fire({
        title: "Error",
        text: "Por favor, completa todos los campos antes de continuar.",
        icon: "warning",
        customClass: {
          popup: "bg-white shadow-lg rounded-lg p-6",
          title: "text-2xl font-semibold text-gray-800",
          confirmButton:
            "bg-[#D9534F] hover:bg-[#C9302C] text-white font-bold py-2 px-4 rounded",
        },
        buttonsStyling: false,
      });
      return;
    }
    try {
      const response = await login(userData);
      const { accessToken } = response;
      // Almacenar token y datos de usuario en localStorage
      Cookies.set("accessToken", JSON.stringify(accessToken), {
        expires: 1 / 24,
      });
      // Pop-up de éxito
      Swal.fire({
        title: "¡Éxito!",
        text: "Has iniciado sesión correctamente.",
        icon: "success",
        customClass: {
          popup: "bg-white shadow-lg rounded-lg p-6",
          title: "text-2xl font-semibold text-gray-800",
          confirmButton:
            "bg-[#164E78] hover:bg-[#169978] text-white font-bold py-2 px-4 rounded",
        },
        buttonsStyling: false,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/"; // Cambia "/ruta-de-redireccion" por la ruta deseada
        }
      });
    } catch (error: any) {
      setErrors({ email: "Email o contraseña incorrectos.", password: "" });
      // Pop-up de error
      Swal.fire({
        title: "Error",
        text: `No se pudo iniciar sesión. Por favor verifica tus credenciales., ${error.message}`,
        icon: "error",
        customClass: {
          popup: "bg-white shadow-lg rounded-lg p-6",
          title: "text-2xl font-semibold text-gray-800",
          confirmButton:
            "bg-[#D9534F] hover:bg-[#C9302C] text-white font-bold py-2 px-4 rounded",
        },
        buttonsStyling: false,
      });
    }
  };

  useEffect(() => {
    const errors = validateLoginForm(userData);
    setErrors(errors);
  }, [userData]);

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="relative flex flex-col m-6 space-y-8 bg-gray-900 shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        <div className="flex flex-col justify-center p-8 md:p-12">
          <div className="flex flex-col p-6">
            <h3 className="text-xl font-semibold leading-6 tracking-tighter text-slate-200">
              Iniciar Sesion
            </h3>
            <p className="mt-1.5 text-sm font-medium text-white/50">
              Bienvenido de nuevo, ingresa tus credenciales para continuar.
            </p>
          </div>

          <div className="p-6 pt-0">
            <form onSubmit={handleSubmit}>
              <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
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
                  className="block w-full border-0 bg-transparent p-0 text-sm text-white placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground"
                />
                {touched.email && error.email && (
                  <span className="text-red-500 text-sm block">
                    {error.email}
                  </span>
                )}
              </div>
              <div className="mt-4 group relative rounded-lg border focus-within:border-purple-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
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
                    className="ml-2 text-sm text-gray-500"
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

              <div className="flex justify-between w-full py-4 ">
                <div>
                  <input
                    type="checkbox"
                    name="remember"
                    id="remember"
                    className="mr-2 rounded-lg"
                  />
                  <label htmlFor="remember" className="text-sm text-white py-2">
                    Recordarme
                  </label>
                </div>
                <a href="#" className="text-sm text-white">
                  Olvidaste tu contraseña?
                </a>
              </div>

              <div className="mt-2 flex items-center justify-end gap-x-2">
                <button
                  className="flex  items-center justify-center font-bold rounded-xl  w-full mx-auto bg-purple-600 px-4 py-3 text-sm text-white duration-200 hover:bg-purple-700"
                  type="submit"
                >
                  Iniciar Sesion
                </button>
              </div>
            </form>

            <hr className="text-slate-200 w-full border-2 rounded-lg mt-4 mb-4" />

            <div className="flex items-end justify-end mt-4 text-gray-900">
              <button
                onClick={handleGoogleLogin}
                className="mx-auto w-full rounded-lg bg-slate-200 flex flex-row items-center justify-center gap-x-2 px-4 py-3 text-sm duration-200 hover:bg-slate-300"
              >
                Inicia Sesion con Google{" "}
                <Image src="google.svg" alt="google" width={20} height={20} />
              </button>
            </div>

            <p className="text-center mt-4 text-white">
              No tienes una cuenta?{" "}
              <a href="/register" className="text-purple-600">
                Registrate
              </a>
            </p>
          </div>
        </div>

        <div className="relative">
          <Image
            src="window.jpg"
            alt="login"
            className="hidden md:flex rounded-r-2xl w-[400px] h-full object-cover"
            width={400} // Añadir width
            height={600} // Añadir height (ajusta según sea necesario)
          />
        </div>
      </div>
    </section>
  );
};

export default Login;

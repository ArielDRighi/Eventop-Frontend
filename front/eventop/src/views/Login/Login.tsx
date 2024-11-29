"use client";
import { ILoginErrors, ILoginProps } from "@/interfaces/ILoginProps";
import { useEffect, useState } from "react";
import validateLoginForm from "@/helpers/validateLoginForm";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { login } from "@/helpers/auth.helper";
import Cookies from "js-cookie";
import { useAdmin } from "@/context/admincontext";
import { UserSearch } from "lucide-react";
import { Auth0Client } from "@auth0/auth0-spa-js";

const auth0 = new Auth0Client({
  domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN || '',
  clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || '',
  authorizationParams: {
    redirect_uri: window.location.origin
  }
});

export const Login = () => {
  const router = useRouter();
  const { setIsAdmin } = useAdmin();

  

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

  const handleGoogleLogin = async () => {
    try {
      await auth0.loginWithPopup({ connection: 'google-oauth2' });
      const user = await auth0.getUser();
      // Manejar el usuario autenticado
      console.log(user);
      router.push('/dashboard'); // Redirigir al dashboard o a la página deseada
    } catch (error) {
      console.error("Error logging in with Google:", error);
    }
  };
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

      console.log(response);

      const { access_token } = response;
      console.log(access_token);

      // Almacenar token y datos de usuario en localStorage
      Cookies.set("adminToken", JSON.stringify({ access_token }));
      setIsAdmin(true);

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
      });

      router.push("/");
    } catch (error) {
      setErrors({ email: "Email o contraseña incorrectos.", password: "" });

      // Pop-up de error
      Swal.fire({
        title: "Error",
        text: "No se pudo iniciar sesión. Por favor verifica tus credenciales.",
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
    <div className="bg-gray-900  text-white flex  flex-col items-center pt-16 sm:justify-center sm:pt-0">
      <a href="#">
        <div className="text-foreground font-semibold text-2xl tracking-tighter mx-auto flex items-center gap-2">
          EvenTop
        </div>
      </a>
      <div className="relative mt-12 w-full max-w-lg sm:mt-10">
        <div className="relative -mb-px h-px w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
        <div className="mx-5 border  border-b-white/20 sm:border-t-white/20 shadow-[20px_0_20px_20px] shadow-slate-500/10  rounded-lg border-white/20 border-l-white/20 border-r-white/20 sm:shadow-sm lg:rounded-xl lg:shadow-none">
          <div className="flex flex-col p-6">
            <h3 className="text-xl font-semibold leading-6 tracking-tighter">
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
                    type="password"
                    name="password"
                    id="password"
                    value={userData.password}
                    onChange={handleOnChange}
                    onBlur={handleOnBlur}
                    placeholder="Contraseña"
                    className="block w-full border-0 bg-transparent p-0 text-sm placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground text-white"
                  />
                </div>
                {touched.password && error.password && (
                  <span className="text-red-500 text-sm block">
                    {error.password}
                  </span>
                )}
              </div>

              <div className="mt-4 flex items-center justify-end gap-x-2">
                <button
                  className="flex  items-center justify-center font-bold rounded-xl   bg-purple-600 px-4 py-3 text-sm text-white duration-200 hover:bg-purple-700"
                  type="submit"
                >
                  Iniciar Sesion
                </button>
              </div>
            </form>

            <div className="flex items-end justify-end mt-4"></div>
            <button
              onClick={handleGoogleLogin}
              className="w-4/5 mx-auto rounded-lg bg-slate-200"
            >
              Login with Google <span><UserSearch/></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

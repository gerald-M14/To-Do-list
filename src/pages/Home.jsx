import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Home() {
    const { login, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/dashboard");
        }
    }, [user, navigate]);

    return (
        <div className="layout">
            <section className="layout__banner">
                <div className="banner__content">
                    <h1 className="banner__title">Lista de Tareas</h1>
                    <p className="parrafo__principal">Te ofrecemos una forma sencilla y eficiente de organizar tus pendientes. Aquí podrás añadir, editar o eliminar tareas con facilidad, asegurándote de no olvidar ningún compromiso. Además, podrás marcar tus tareas como completadas y hacer un seguimiento visual de tu progreso. Con esta herramienta, gestionar tu tiempo y cumplir tus objetivos será más fácil que nunca.</p>
                    {user ? (
                        <p>Redirigiendo a tu Dashboard...</p>
                    ) : (
                        <button onClick={login} className="banner__btn">Iniciar sesión con Google</button>
                    )}
                </div>

                <div className="shapes__item shapes__item--shape1">
                    <img src="./banner-shape-1.png" alt="" className="shapes__img" />
                </div>
                <div className="shapes__item shapes__item--shape2">
                    <img src="./banner-shape-2.png" alt="" className="shapes__img" />
                </div>
            </section>
        </div>
        
    );
}

export default Home;

import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);  // Estado de carga para controlar la verificación del estado de autenticación

    // Verificar si el usuario está cargado, si no, esperamos que Firebase lo procese.
    useEffect(() => {
        if (user !== undefined) {
            setLoading(false);  // Si ya sabemos si el usuario está autenticado o no, dejamos de cargar
        }
    }, [user]);

    // Si estamos verificando el estado de autenticación, mostramos un indicador de carga o nada
    if (loading) {
        return <div>Loading...</div>;  // O un componente de spinner
    }
    

    // Si no hay usuario autenticado, redirige a la página principal
    if (!user) {
        return <Navigate to="/" />;
    }

    return children;  // Si el usuario está autenticado, renderiza el contenido protegido
}

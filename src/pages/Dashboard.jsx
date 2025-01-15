import { useAuth } from "../context/AuthContext";
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { db } from "../firebase/firebaseConfig";
import VerTask from "./VerTask";

function Dashboard() {
    const { user, logout } = useAuth();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }, // Para manejar errores de validación
    } = useForm();

    const [showModal, setShowModal] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    const guardarTarea = async (data) => {
        try {
        if (editingTask) {
            const taskRef = doc(db, "ListaTareas", editingTask.id);
            await updateDoc(taskRef, {
            Titulo: data.Titulo,
            Detalles: data.Detalles,
            Fecha: data.Fecha,
            Hora: data.Hora,
            });
        } else {
            await addDoc(collection(db, "ListaTareas"), {
            Titulo: data.Titulo,
            Detalles: data.Detalles,
            Fecha: data.Fecha,
            Hora: data.Hora,
            uid: user.uid,
            completada: false,
            });
        }
        } catch (e) {
        console.error("Error al guardar la tarea", e);
        }

        reset(); // Resetear formulario
        setEditingTask(null);
        setShowModal(false);
    };

    const abrirModalRegistrar = () => {
        setEditingTask(null);
        reset();
        setShowModal(true);
    };

    const abrirModalEditar = (task) => {
        reset(task);
        setEditingTask(task);
        setShowModal(true);
    };

    const cerrarModal = () => {
        reset();
        setEditingTask(null);
        setShowModal(false);
        
    };

    const marcarComoCompletada = async (task) => {
        try {
        const taskRef = doc(db, "ListaTareas", task.id);
        await updateDoc(taskRef, { completada: true });
        } catch (e) {
        console.error("Error al marcar como completada", e);
        }
    };

return (
    <div className="layout__task" style={{ width: "100%", maxWidth: "100%" }}>
        <div class="fondo"></div>

    <div className="task__header">
        <p className="header__title">Bienvenido/a, {user?.displayName}</p>
        <button className="button-logout type1" onClick={logout}>
        <span className="btn-txt">Logout</span>
        </button>
    </div>

    <div className="task__title">
        <h1 className="task__title-principal">To-Do List</h1>
        <button className="btn__registrar" onClick={abrirModalRegistrar}>
        Registrar Tarea
        </button>
    </div>

    <div className="task__content">
        <VerTask onEdit={abrirModalEditar} />
    </div>

    {/* Modal */}
    {showModal && (
        <div className="modal">
        <div className="modal__content">
            <h2 className="title__modal">
            {editingTask ? "Editar Tarea" : "Registrar Tarea"}
            </h2>
            <form className="form__modal" onSubmit={handleSubmit(guardarTarea)}>
            <div className="form__group">
                <label className="modal__title" htmlFor="Titulo">
                Título
                </label>
                <input
                className="modal__input"
                type="text"
                {...register("Titulo", { required: "El título es obligatorio" })}
                />
                {errors.Titulo && (
                <p className="error-message">{errors.Titulo.message}</p>
                )}
            </div>
            <div className="form__group">
                <label className="modal__title modal__title-big" htmlFor="Detalles">
                Detalles
                </label>
                <input
                className="modal__input"
                type="text"
                {...register("Detalles", {
                    required: "Los detalles son obligatorios",
                })}
                />
                {errors.Detalles && (
                <p className="error-message">{errors.Detalles.message}</p>
                )}
            </div>
            <div className="form__group">
                <label className="modal__title" htmlFor="Fecha">
                Fecha
                </label>
                <input className="modal__input" type="date" {...register("Fecha")} />
            </div>
            <div className="form__group">
                <label className="modal__title" htmlFor="Hora">
                Hora
                </label>
                <input className="modal__input" type="time" {...register("Hora")} />
            </div>
            <div className="form__buttons">
                <button className="btn__registrar-modal" type="submit">
                {editingTask ? "Guardar Cambios" : "Registrar"}
                </button>
                <button
                className="btn__cancelar"
                type="button"
                onClick={cerrarModal}
                >
                Cancelar
                </button>
            </div>
            </form>
        </div>
        </div>
    )}
    </div>
    );
}

export default Dashboard;

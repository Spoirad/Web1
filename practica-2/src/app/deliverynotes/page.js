"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import FormDeliveryNote from "../../components/FormDeliveryNote";
import DownloadDeliveryNote from "../../components/DownloadDeliveryNote";

export default function DeliveryNotes() {
    const [deliveryNotes, setDeliveryNotes] = useState([]);
    const [formVisible, setFormVisible] = useState(false);
    const [editingNote, setEditingNote] = useState(null);
    const [clients, setClients] = useState([]);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (token) {
            axios
                .get("https://bildy-rpmaya.koyeb.app/api/deliverynote", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    setDeliveryNotes(response.data || []);
                })
                .catch((error) => {
                    console.error("Error fetching delivery notes:", error);
                });

            axios
                .get("https://bildy-rpmaya.koyeb.app/api/client", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    setClients(response.data || []);
                })
                .catch((error) => {
                    console.error("Error fetching clients:", error);
                });

            axios
                .get("https://bildy-rpmaya.koyeb.app/api/project", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    setProjects(response.data || []);
                })
                .catch((error) => {
                    console.error("Error fetching projects:", error);
                });
        } else {
            console.error("Token not found. Please log in.");
        }
    }, []);

    const handleEditNote = (note) => {
        setEditingNote(note);
        setFormVisible(true);
    };

    const handleDeleteNote = (noteId) => {
        const token = localStorage.getItem("jwt");
        if (token) {
            axios
                .delete(`https://bildy-rpmaya.koyeb.app/api/deliverynote/${noteId}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(() => {
                    setDeliveryNotes((prev) => prev.filter((note) => note._id !== noteId));
                    alert("Albarán eliminado con éxito.");
                })
                .catch((error) => {
                    console.error("Error deleting delivery note:", error);
                });
        } else {
            console.error("Token not found. Please log in.");
        }
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="p-8 flex-grow">
                    <h2 className="text-3xl font-bold mb-4">Gestión de Albaranes</h2>
                    <button
                        onClick={() => {
                            setFormVisible(!formVisible);
                            if (formVisible) setEditingNote(null);
                        }}
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 mb-4"
                    >
                        {formVisible ? "Ocultar Formulario" : "Crear Albarán"}
                    </button>
                    {formVisible && (
                        <FormDeliveryNote
                            setDeliveryNotes={setDeliveryNotes}
                            setFormVisible={setFormVisible}
                            editingNote={editingNote}
                            setEditingNote={setEditingNote}
                            clients={clients}
                            projects={projects}
                        />
                    )}
                    {deliveryNotes.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {deliveryNotes.map((note) => (
                                <div key={note._id} className="p-6 bg-white shadow-md rounded-lg border border-gray-300">
                                    <h3 className="text-lg font-bold text-gray-800 mb-2">{note.description || "Sin descripción"}</h3>
                                    <p className="text-sm text-gray-600"><strong>Cliente:</strong> {clients.find(c => c._id === note.clientId)?.name || "N/A"}</p>
                                    <p className="text-sm text-gray-600"><strong>Proyecto:</strong> {projects.find(p => p._id === note.projectId)?.name || "N/A"}</p>
                                    <p className="text-sm text-gray-600"><strong>Formato:</strong> {note.format || "N/A"}</p>
                                    <p className="text-sm text-gray-600"><strong>Fecha:</strong> {note.workdate || "N/A"}</p>
                                    <p className="text-sm text-gray-600"><strong>Horas:</strong> {note.hours?.toString() || 0}</p>
                                    <p className="text-sm text-gray-600"><strong>Material:</strong> {note.material || "N/A"}</p>
                                    <div className="mt-4 flex flex-col gap-2">
                                        <button
                                            className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600"
                                            onClick={() => handleEditNote(note)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                                            onClick={() => handleDeleteNote(note._id)}
                                        >
                                            Eliminar
                                        </button>
                                        <div className="mt-2">
                                            <DownloadDeliveryNote deliveryNoteId={note._id} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center">No hay albaranes disponibles.</p>
                    )}
                </main>
                <Footer />
            </div>
        </div>
    );
}

<script setup lang="ts">
import api from "@/axios/axios.ts";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import type { Propiedad } from "@/interfaces/Propiedad.ts";

// Estado para almacenar las propiedades
const propiedades = ref<Propiedad[]>([]);

// Función para obtener las propiedades desde la API
const obtenerPropiedades = async () => {
    try {
        const respuesta = await api.get("propiedad", {
            withCredentials: true,
        });
        // Aseguramos que cada propiedad tenga un campo `hover` para manejar el hover individual
        propiedades.value = respuesta.data.map((propiedad) => ({
            ...propiedad,
            hover: false, // Agregar el campo hover a cada propiedad
        }));
    } catch (error) {
        console.log("Error al obtener propiedades: ", error);
    }
};

onMounted(() => {
    obtenerPropiedades();
});

// Llamada a otro componente con link
const router = useRouter();
const verDetalles = (id: number) => {
    router.push({ name: "PropiedadDetalles", params: { id } });
};
</script>

<template>
    <div class="container py-5">
        <h1 class="text-center mb-5 display-4 font-weight-bold text-gradient">
            Nuestras Propiedades
        </h1>

        <div v-if="propiedades.length !== 0">
            <div class="row g-4">
                <div
                    class="col-md-4"
                    v-for="propiedad in propiedades"
                    :key="propiedad.id"
                >
                    <div class="card shadow-lg border-0 rounded overflow-hidden">
                        <img
                            :src="propiedad.imagen_principal"
                            :alt="propiedad.titulo"
                            class="card-img-top"
                            style="
                                height: 250px;
                                object-fit: cover;
                                transition: transform 0.3s ease-in-out;
                            "
                            @mouseover="propiedad.hover = true"
                            @mouseleave="propiedad.hover = false"
                            :style="{
                                transform: propiedad.hover ? 'scale(1.1)' : 'scale(1)',
                            }"
                        />
                        <div class="card-body">
                            <h5 class="card-title text-dark font-weight-bold">
                                {{ propiedad.titulo }}
                            </h5>
                            <p class="card-text text-muted">
                                {{ propiedad.descripcion }}
                            </p>
                            <p class="text-muted mb-0">
                                Ubicación: <strong>{{ propiedad.ubicacion }}</strong>
                            </p>
                            <div
                                class="d-flex justify-content-between align-items-center mt-3"
                            >
                                <p class="mb-0 text-success">
                                    <strong
                                        >{{ propiedad.precio_por_noche }} por día</strong
                                    >
                                </p>
                                <p class="mb-0 text-secondary">
                                    Capacidad: {{ propiedad.capacidad_personas }} Personas
                                </p>
                            </div>
                        </div>
                        <div class="card-footer text-center bg-transparent border-0">
                            <button
                                @click="verDetalles(propiedad.id)"
                                class="btn btn-dark w-100 py-2 mt-3 border-0 rounded-pill shadow-sm"
                            >
                                Ver detalles
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-else>
            <p class="text-center text-danger">
                No hay propiedades disponibles en este momento.
            </p>
        </div>
    </div>
</template>

<style scoped>
.text-gradient {
    background: linear-gradient(45deg, #6a11cb, #2575fc);
    -webkit-background-clip: text;
    color: transparent;
}
</style>

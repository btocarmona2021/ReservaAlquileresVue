<script setup lang="ts">
import api from "@/axios/axios.ts";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import type { Propiedad } from "@/interfaces/Propiedad.ts";

//Estado para almacenar las propiedades
const propiedades = ref<Propiedad[]>([]);
const info = ref("");

const obtenerPropiedades = async () => {
    try {
        const respuesta = await api.get("propiedad", {
            withCredentials: true,
        });

        propiedades.value = respuesta.data;
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
        } else {
            console.log("Error al obtener propiedades:", error);
        }
    }
};

const eliminarPropiedad = async (id: number) => {
    if (confirm("¿Estás seguro de que deseas eliminar esta propiedad?")) {
        try {
            const respuesta = await api.delete(`propiedad/${id}`, {
                withCredentials: true,
            });

            propiedades.value = propiedades.value.filter(
                (propiedad) => propiedad.id !== id
            );

            info.value = respuesta.data.message;
            setTimeout(() => {
                info.value = "";
            }, 2000);
        } catch (error: any) {
            console.error("Error al eliminar la propiedad:", error);
        }
    }
};

onMounted(() => {
    obtenerPropiedades();
});

//llamada a otro componente con link
const router = useRouter();
const verDetalles = (id: number) => {
    router.push({ name: "PropiedadDetalles", params: { id } });
};

const addpropiedad = () => {
    router.push({ name: "dashboard-addpropiedad" });
};
const addTarifa = (id: number) => {
    router.push({ name: "dashboard-addtarifa", params: { id } });
};
</script>

<template>
    <div>
        <div class="addPropiedad">
            <button @click="addpropiedad" class="btn btn-info m-2">
                Agregar Propiedad
            </button>
            <p :class="{ info: info != '' }">{{ info }}</p>
        </div>
        <table class="tabla-propiedades">
            <thead>
                <tr>
                    <!--        <th>ID</th>-->
                    <th>Título</th>
                    <th>Imagen</th>
                    <th>Descripción</th>
                    <th>Ubicación</th>
                    <th>Precio por Noche</th>
                    <th>Capacidad</th>
                    <th>Tipo</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="propiedad in propiedades" :key="propiedad.id">
                    <!--        <td>{{ propiedad.id }}</td>-->
                    <td>{{ propiedad.titulo }}</td>
                    <td>
                        <img
                            :src="propiedad.imagen_principal"
                            :alt="propiedad.titulo"
                            class="tabla-imagen"
                        />
                    </td>
                    <td>{{ propiedad.descripcion }}</td>
                    <td>{{ propiedad.ubicacion }}</td>
                    <td>{{ propiedad.precio_por_noche }}</td>
                    <td>{{ propiedad.capacidad_personas }}</td>
                    <td>{{ propiedad.tipo_propiedad }}</td>
                    <td>
                        <button
                            @click="addTarifa(propiedad.id)"
                            class="btn btn-info btn-sm"
                        >
                            Agregar Tarifa
                        </button>
                        <button
                            @click="eliminarPropiedad(propiedad.id)"
                            class="btn btn-danger btn-sm m-2"
                        >
                            Eliminar Propiedad
                        </button>
                    </td>
                </tr>
                <tr v-if="propiedades.length === 0">
                    <td colspan="9" class="tabla-vacia">
                        No hay propiedades disponibles
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.btn {
    font-size: 0.8em;
    font-weight: 400;
}
.tabla-propiedades {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    font-family: Oswald, sans-serif;
    font-size: 0.9em;
}

.tabla-propiedades th,
.tabla-propiedades td {
    border: 1px solid #ccc;
    padding: 10px;
    text-align: center;
}

.tabla-propiedades th {
    background-color: #f4f4f4;
}

.tabla-imagen {
    max-width: 80px;
    height: auto;
}

.tabla-btn:hover {
    background-color: #3498db;
}

.tabla-vacia {
    text-align: center;
    color: #999;
    font-style: italic;
}
</style>

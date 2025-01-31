<script setup lang="ts">
import api from "@/axios/axios.ts";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import type { Propiedad } from "@/interfaces/Propiedad.ts";
import {
  TrashIcon,
  PlusCircleIcon,
  PhotoIcon,
  CurrencyDollarIcon,
} from "@heroicons/vue/24/solid";
import Swal from "sweetalert2";

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
  const result = await Swal.fire({
    title: "¿Estás seguro de que deseas eliminar esta Propiedad?",
    text: "Este cambio será permanente.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar Propiedad",
    cancelButtonText: "No, cancelar",
  });
  if (result.isConfirmed) {
    try {
      const respuesta = await api.delete(`propiedad/${id}`, {
        withCredentials: true,
      });

      propiedades.value = propiedades.value.filter(
        (propiedad) => propiedad.id !== id
      );

      info.value = respuesta.data.message;
      Swal.fire({
        title: "Propiedad",
        text: info.value,
        icon: "success",
      });
      setTimeout(() => {
        info.value = "";
      }, 2000);
    } catch (error: any) {
      info.value = error.response.data.message;
      Swal.fire({
        title: "Error",
        text: info.value,
        icon: "error",
      });
      setTimeout(() => {
        router.push({ name: "login" });
      }, 1500);
    }
  }
};

onMounted(() => {
  obtenerPropiedades();
});

//llamada a otro componente con link
const router = useRouter();

const addpropiedad = () => {
  router.push({ name: "dashboard-addpropiedad" });
};
const addTarifa = async (id: number) => {
  const result = await Swal.fire({
    title: "Agregar tarifa nueva",
    text: "Estas a punto de agregar una nueva tarifa a la pripiedad.",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, agregar tarifa",
    cancelButtonText: "No, cancelar",
  });
  if (result.isConfirmed) {
    router.push({ name: "dashboard-addtarifa", params: { id } });
  }
};

const agregarImagenes = async (id:number) => {
  const result = await Swal.fire({
    title: "Agregar imagenes",
    text: "Estas a punto de agregar imagenes a la propiedad.",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, agregar imagenes",
    cancelButtonText: "No, cancelar",
  });

  if (result.isConfirmed) {
    router.push({name:'dashboard-addimagenes', params:{id}});
  }

};
</script>

<template>
  <div>
    <div class="addPropiedad">
      <a class="addpropiedad" @click="addpropiedad">
        <PlusCircleIcon class="icono__agregar" /> AGREGAR PROPIEDAD
      </a>
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
          <td class="d-flex justify-content-center align-items-center">
            <a @click="agregarImagenes(propiedad.id)">
              <PhotoIcon class="icono__agregar" />
            </a>
            <a @click="addTarifa(propiedad.id)"
              ><CurrencyDollarIcon class="icono__agregar" />
            </a>
            <a @click="eliminarPropiedad(propiedad.id)">
              <TrashIcon class="icono__agregar" />
            </a>
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
.icono__agregar {
  width: 32px;
  height: 32px;
  color: #3498db;
  margin: 10px;
  cursor: pointer;
}
.addpropiedad {
  font-family: Oswald, sans-serif;
  text-decoration: none;
  cursor: pointer;
}
</style>

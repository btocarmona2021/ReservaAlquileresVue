<script setup lang="ts">
import { onMounted, ref } from "vue";
import api from "@/axios/axios.ts";
import Swal from "sweetalert2";
import { HomeIcon, StarIcon, TrashIcon, UserCircleIcon } from "@heroicons/vue/24/solid";
import type { Opiniones } from "@/interfaces/Opinion";

const Opiniones = ref<Opiniones[]>([]);
const info = ref("");

const obtenerOpiniones = async () => {
  try {
    const respuesta = await api.get("/opinion", {
      withCredentials: true,
    });
    Opiniones.value = respuesta.data;
  } catch (error: any) {
    info.value = error.response.data.message;
  }
};

onMounted(() => {
  obtenerOpiniones();
});
const eliminarOpinion = async (id: number) => {
  const result = await Swal.fire({
    title: "Eliminar Comentario",
    text: "¿Estás seguro de que deseas eliminar este comentario?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar Propiedad",
    cancelButtonText: "No, cancelar",
  });

  if (result.isConfirmed) {
    try {
      // Llamada al endpoint para eliminar el usuario
      const respuesta = await api.delete(`/opinion/${id}`, {
        withCredentials: true,
      });
      // Filtrar al usuario eliminado de la lista local
      Opiniones.value = Opiniones.value.filter((opinion) => opinion.id !== id);
      info.value = respuesta.data.message;
      Swal.fire({
        title: "Comentario",
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
    }
  } else {
  }
};
</script>

<template>
  <div>
    <table class="tabla-reservas">
      <thead>
        <tr>
          <th>Cliente</th>
          <th>Propiedad</th>
          <th>Comentario</th>
          <th>Calificacion</th>
          <th>Fecha</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="opinion in Opiniones" :key="opinion.id">
          <td>
            <img class="tabla-imagen" :src="opinion.usuario.foto_perfil" :title="opinion.usuario.nombre">
            {{ opinion.usuario.nombre + " " + opinion.usuario.apellido }}
          </td>
          <td><HomeIcon class="icono__deco "/>{{ opinion.propiedade.titulo }}</td>
          <td class="fs-6">{{ opinion.comentario }}</td>
          <td><StarIcon class="icono__deco icono__deco--star"/> {{ opinion.calificacion }}</td>
          <td>{{ new Date(opinion.fecha_opinion).toLocaleDateString() }}</td>
          <td>
            <a @click="eliminarOpinion(opinion.id)" class="">
              <TrashIcon class="icono__agregar" />
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.tabla-reservas {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-family: Oswald, sans-serif;
}

.tabla-reservas th,
.tabla-reservas td {
  border: 1px solid #ccc;
  padding: 4px;
  text-align: center;
  vertical-align: middle;
}

.tabla-reservas th {
  background-color: #f4f4f4;
}

.tabla-imagen {
  width: 40px;
  height: 40px;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  border: 2px solid #222222;
}

.tabla-btn {
  padding: 5px 10px;
  background-color: #5dade2;
  border: none;
  color: white;
  cursor: pointer;
  margin: 2px;
}

.tabla-btn:hover {
  background-color: #3498db;
}

.tabla-vacia {
  text-align: center;
  color: #999;
  font-style: italic;
}

.addReservas {
  display: flex;
  gap: 20px;
}

.info {
  background-color: #5dade2;
  color: whitesmoke;
  padding: 5px 10px;
  width: 250px;
  margin: 2px;
}

.pendiente {
  color: #222222;
  text-transform: uppercase;
  background-color: yellow;
}

.confirmada {
  color: #222222;
  text-transform: uppercase;
  background-color: rgb(11, 157, 11);
}

.cancelada {
  color: whitesmoke;
  background-color: darkred;
  text-transform: uppercase;
}

.icono__agregar {
  width: 32px;
  height: 32px;
  color: #3498db;
  margin: 10px;
  cursor: pointer;
}
.icono__deco--star{
  color: rgb(228, 228, 5);
}
</style>

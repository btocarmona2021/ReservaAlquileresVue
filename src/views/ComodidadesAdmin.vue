<script setup lang="ts">
import api from "@/axios/axios.ts";
import { onMounted, ref } from "vue";
import type { Comodidad } from "@/interfaces/Comodidad.ts";
import router from "@/router"; // Asegúrate de tener la interfaz de comodidad

// Estado para almacenar las comodidades
const comodidades = ref<Comodidad[]>([]);
const info = ref("");

// Función para obtener las comodidades desde la API
const obtenerComodidades = async () => {
  try {
    const respuesta = await api.get("comodidad", {
      withCredentials: true,
    });
    comodidades.value = respuesta.data;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  obtenerComodidades();
});

const actualizarComodidad = (id: number) => {};

const eliminarComodidad = async (id: number) => {
  if (confirm("¿Estás seguro de que deseas eliminar esta comodidad?")) {
    try {
      const respuesta = await api.delete(`comodidad/${id}`, {
        withCredentials: true,
      });
      comodidades.value = comodidades.value.filter(
        (comodidad) => comodidad.id !== id
      );
      info.value = respuesta.data.message;
      setTimeout(() => {
        info.value = "";
      }, 2000);
    } catch (error) {
      console.error("Error al eliminar la comodidad:", error);
    }
  }
};

const addcomodidad = () => {
  router.push({ name: "dashboard-addcomodidad" });
};
</script>

<template>
  <div>
    <div class="addUsuarios">
      <button @click="addcomodidad" class="btn btn-info m-2">
        Agregar Comodidad
      </button>
      <p :class="{ info: info != '' }">{{ info }}</p>
    </div>
    <table class="tabla-comodidades">
      <thead>
        <tr>
          <!--        <th>ID</th>-->
          <th>Icono</th>
          <th>Nombre</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="comodidad in comodidades" :key="comodidad.id">
          <td>
            <img
              :src="comodidad.icono"
              :alt="comodidad.icono"
              class="tabla-imagen"
            />
          </td>
          <!--        <td>{{ comodidad.id }}</td>-->
          <td>{{ comodidad.nombre }}</td>
          <td>
            <button
              @click="actualizarComodidad(comodidad.id)"
              class="btn btn-sm btn-info"
            >
              Actualizar
            </button>
            <button
              @click="eliminarComodidad(comodidad.id)"
              class="btn btn-sm btn-danger m-2"
            >
              Eliminar
            </button>
          </td>
        </tr>
        <tr v-if="comodidades.length === 0">
          <td colspan="4" class="tabla-vacia">
            No hay comodidades disponibles
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.tabla-comodidades {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-family: Oswald, sans-serif;
}

.tabla-comodidades th,
.tabla-comodidades td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}

.tabla-comodidades th {
  background-color: #f4f4f4;
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

.info {
  background-color: #5dade2;
  color: whitesmoke;
  padding: 5px 10px;
  width: 250px;
  margin: 2px;
}

.tabla-imagen {
  width: 32px;
}
</style>

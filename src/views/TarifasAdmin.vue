<script setup lang="ts">
import api from "@/axios/axios.ts";
import { onMounted, ref } from "vue";
import type { Tarifa } from "@/interfaces/Tarifa.ts";
import { TrashIcon } from "@heroicons/vue/24/solid";
import Swal from "sweetalert2";
import router from "@/router";

// Estado para almacenar las tarifas
const tarifas = ref<Tarifa[]>([]);
const info = ref("");

// Función para obtener las tarifas desde la API
const obtenerTarifas = async () => {
  try {
    const respuesta = await api.get("tarifa", {
      withCredentials: true,
    });
    tarifas.value = respuesta.data;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  obtenerTarifas();
});

const eliminarTarifa = async (id: number) => {
  const result =await Swal.fire({
    title: "Eliminar Tarifa",
    text: "¿Estás seguro de que deseas eliminar esta tarifa?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar tarifa",
    cancelButtonText: "No, cancelar",
  });

  if (result.isConfirmed) {
    try {
      // Llamada al endpoint para eliminar el usuario
      const respuesta = await api.delete(`tarifa/${id}`, {
        withCredentials: true,
      });
      // Filtrar al usuario eliminado de la lista local
      tarifas.value = tarifas.value.filter((tarifa) => tarifa.id !== id);
      info.value = respuesta.data.message;
      setTimeout(() => {
        info.value = "";
      }, 2000);
    } catch (error) {
            info.value = error.response.data.message;
      Swal.fire({
        title: "Error",
        text: info.value,
        icon: "error",
      });
      setTimeout(() => {
        router.push({ name: "login" });
      },1500);
  
    }
  }
};
</script>

<template>
  <div>
    <div class="addUsuarios">
      <p :class="{ info: info != '' }">{{ info }}</p>
    </div>
    <table class="tabla-tarifas">
      <thead>
        <tr>
          <!--        <th>ID</th>-->
          <th>Propiedad</th>
          <th>Fecha de Inicio</th>
          <th>Fecha de Fin</th>
          <th>Precio</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="tarifa in tarifas" :key="tarifa.id">
          <!--        <td>{{ tarifa.id }}</td>-->
          <td>
            {{
              tarifa.propiedade.titulo
                ? tarifa.propiedade.titulo
                : "Sin propiedad asignada"
            }}
          </td>
          <td>
            {{
              new Date(tarifa.fecha_inicio).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
            }}
          </td>
          <td>
            {{
              new Date(tarifa.fecha_fin).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
            }}
          </td>
          <td>{{ tarifa.precio }}</td>

          <td>
            <!--          <button @click="actualizarTarifa(tarifa.id)" class="tabla-btn actualizar-btn">Actualizar</button>-->
            <a @click="eliminarTarifa(tarifa.id)">
              <TrashIcon class="icono__delete" />
            </a>
          </td>
        </tr>
        <tr v-if="tarifas.length === 0">
          <td colspan="6" class="tabla-vacia">No hay tarifas disponibles</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.btn {
  font-size: 0.8em;
}
.tabla-tarifas {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-family: Oswald, sans-serif;
}

.tabla-tarifas th,
.tabla-tarifas td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}

.tabla-tarifas th {
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
.icono__delete {
  width: 28px;
  cursor: pointer;
  color: red;
}
</style>

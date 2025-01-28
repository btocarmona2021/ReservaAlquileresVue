<script setup lang="ts">
import { onMounted, ref } from "vue";
import api from "@/axios/axios.ts";
import type { Reserva } from "@/interfaces/Reserva.ts";
import router from "@/router";

const reservas = ref<Reserva[]>([]);
const info = ref("");

const obtenerReservas = async () => {
  try {
    const respuesta = await api.get("/reserva", {
      withCredentials: true,
    });
    reservas.value = respuesta.data;
    console.log(reservas);
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  obtenerReservas();
});
const eliminarReserva = async (id: number) => {
  if (confirm("¿Estás seguro de que deseas eliminar esta reserva?")) {
    try {
      // Llamada al endpoint para eliminar el usuario
      const respuesta = await api.delete(`/reserva/${id}`, {
        withCredentials: true,
      });
      // Filtrar al usuario eliminado de la lista local
      reservas.value = reservas.value.filter((reserva) => reserva.id !== id);
      info.value = respuesta.data.message;
      setTimeout(() => {
        info.value = "";
      }, 2000);
    } catch (error) {
      console.error("Error al eliminar la reserva:", error);
    }
  }
};

const addReserva = () => {
  router.push({name:'dashboard-addreserva'})
};
</script>

<template>
  <div>
    <div class="addReservas">
      <button @click="addReserva" class="btn btn-info m-2">
        Agregar Reserva
      </button>
      <p :class="{ info: info != '' }">{{ info }}</p>
    </div>
    <table class="tabla-reservas">
      <thead>
        <tr>
          <th>Cliente</th>
          <th>Propiedad</th>
          <th>Fecha Inicio</th>
          <th>Fecha Fin</th>
          <th>Dias</th>
          <th>Precio total</th>
          <th>Estado</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="reserva in reservas" :key="reserva.id">
          <td>
            {{ reserva.usuario.nombre + " " + reserva.usuario.apellido }}
          </td>
          <td>{{ reserva.propiedade.titulo }}</td>
          <td>{{ reserva.fecha_inicio.split("T")[0] }}</td>
          <td>{{ reserva.fecha_fin.split("T")[0] }}</td>
          <td>{{ reserva.dias_reserva }}</td>
          <td>$ {{ reserva.precio_total }}</td>
          <td
            :class="
              reserva.estado === 'pendiente'
                ? 'pendiente'
                : reserva.estado === 'confirmada'
                ? 'confirmada'
                : 'cancelada'
            "
          >
            {{ reserva.estado }}
          </td>
          <td>
            <button
              @click="verDetalles(reserva.id)"
              class="btn btn-sm btn-info"
            >
              Ver Detalles
            </button>
            <button
              @click="eliminarReserva(reserva.id)"
              class="btn btn-sm btn-danger m-2"
            >
              Eliminar
            </button>
          </td>
        </tr>
        <!-- <tr v-if="usuarios.length === 0">
          <td colspan="6" class="tabla-vacia">No hay usuarios disponibles</td>
        </tr> -->
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
</style>

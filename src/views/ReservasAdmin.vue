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
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  obtenerReservas();
});
const eliminarReserva = async (id: number) => {
  const result = await Swal.fire({
    title: "¿Estás seguro de que deseas eliminar esta reserva?",
    text: "Este cambio será permanente.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "No, cancelar",
  });

  if (result.isConfirmed) {
    try {
      // Llamada al endpoint para eliminar el usuario
      const respuesta = await api.delete(`/reserva/${id}`, {
        withCredentials: true,
      });
      console.log();

      // Filtrar al usuario eliminado de la lista local
      reservas.value = reservas.value.filter((reserva) => reserva.id !== id);
      info.value = respuesta.data.message;
      Swal.fire({
        title: "Eliminar reserva",
        text: info.value,
        icon: "success",
        timer: 3000,
        timerProgressBar: true,
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
        timer: 3000,
        timerProgressBar: true,
      });
    }
  }
};

const addReserva = () => {
  router.push({ name: "dashboard-addreserva" });
};

import Swal from "sweetalert2";
import { PlusCircleIcon, TrashIcon } from "@heroicons/vue/24/solid";

const actualizarReserva = async (ev: Event, id: number) => {
  const elemento = ev.target as HTMLSelectElement;
  const valorAnterior = elemento.value; // Guardamos el valor antes de cambiar

  // Usamos sweetalert2 para la confirmación
  const result = await Swal.fire({
    title: "¿Estás seguro de que deseas actualizar esta reserva?",
    text: "Este cambio será permanente.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, actualizar",
    cancelButtonText: "No, cancelar",
  });

  if (result.isConfirmed) {
    // Si el usuario confirma la actualización
    try {
      const estado = {
        estado: elemento.value,
      };
      const respuesta = await api.patch(`/reserva/${id}`, estado, {
        withCredentials: true,
      });
      obtenerReservas();

      info.value = respuesta.data.message;
      Swal.fire({
        title: "Actualizar",
        text: info.value,
        icon: "info",
        timer: 3000,
        timerProgressBar: true,
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
        timer: 2500,
        timerProgressBar: true,
      });
      setTimeout(() => {
        info.value = "";
      }, 2000);
    }
  } else {
    // Si el usuario cancela, restauramos el valor original
    elemento.value = valorAnterior === "pendiente" ? "confirmada" : "pendiente";
  }
};
</script>

<template>
  <div>
    <div class="addReservas">
      <a class="addreserva" @click="addReserva">
        <PlusCircleIcon class="icono__agregar" /> AGREGAR RESERVA
      </a>
    </div>
    <table class="tabla-reservas">
      <thead>
        <tr>
          <th>Solicitado</th>
          <th>Cliente</th>
          <th>Propiedad</th>
          <th>Fecha Inicio</th>
          <th>Fecha Fin</th>
          <th>Dias</th>
          <th>Precio total</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="reserva in reservas" :key="reserva.id">
          <td>
            {{
              new Date(reserva.fecha_pedido).toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })
            }}
          </td>
          <td>
            {{ reserva.usuario.nombre + " " + reserva.usuario.apellido }}
          </td>
          <td>{{ reserva.propiedade.titulo }}</td>
          <td>
            {{
              reserva.fecha_inicio.split("T")[0].split("-").reverse().join("-")
            }}
          </td>
          <td>
            {{ reserva.fecha_fin.split("T")[0].split("-").reverse().join("-") }}
          </td>
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
            <select
              @change="(ev) => actualizarReserva(ev, reserva.id)"
              id="estado"
            >
              <option :value="reserva.estado">
                {{ reserva.estado.toUpperCase() }}
              </option>
              <option value="pendiente" v-if="reserva.estado !== 'pendiente'">
                PENDIENTE
              </option>
              <option value="confirmada" v-if="reserva.estado !== 'confirmada'">
                CONFIRMADA
              </option>
            </select>
          </td>
          <td>
            <a @click="eliminarReserva(reserva.id)">
              <TrashIcon class="icono__agregar" />
            </a>
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

.icono__delete {
  width: 28px;
  cursor: pointer;
  color: red;
}
.icono__agregar {
  width: 32px;
  height: 32px;
  color: #3498db;
  margin: 10px;
  cursor: pointer;
}
.addreserva {
  font-family: Oswald, sans-serif;
  text-decoration: none;
  cursor: pointer;
}
</style>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import api from "@/axios/axios.ts";
import Swal from "sweetalert2";
import { TrashIcon } from "@heroicons/vue/24/solid";
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

// const addReserva = () => {
//   router.push({ name: "dashboard-addreserva" });
// };

// const actualizarReserva = async (ev: Event, id: number) => {
//   const elemento = ev.target as HTMLSelectElement;
//   const valorAnterior = elemento.value; // Guardamos el valor antes de cambiar

//   // Usamos sweetalert2 para la confirmación
//   const result = await Swal.fire({
//     title: '¿Estás seguro de que deseas actualizar esta reserva?',
//     text: 'Este cambio será permanente.',
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#3085d6',
//     cancelButtonColor: '#d33',
//     confirmButtonText: 'Sí, actualizar',
//     cancelButtonText: 'No, cancelar',
//   });

//   if (result.isConfirmed) {
//     // Si el usuario confirma la actualización
//     try {
//       const estado = {
//         estado: elemento.value,
//       };
//       await api.patch(`/reserva/${id}`, estado, {
//         withCredentials: true,
//       });
//       obtenerReservas();
//       info.value = "La reserva ha sido actualizada"; // Mostramos el mensaje
//       setTimeout(() => {
//         info.value = "";
//       }, 2000);
//     } catch (error:any) {
//       info.value = error.response.data.message;
//        setTimeout(() => {
//         info.value = "";
//         router.push({name:'login'})
//       }, 2000);

//     }
//   } else {
//     // Si el usuario cancela, restauramos el valor original
//     elemento.value = valorAnterior === 'pendiente' ? 'confirmada' : 'pendiente';
//   }
// };
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
            {{ opinion.usuario.nombre + " " + opinion.usuario.apellido }}
          </td>
          <td>{{ opinion.propiedade.titulo }}</td>
          <td class="fs-6">{{ opinion.comentario }}</td>
          <td>{{ opinion.calificacion }}</td>
          <td>{{ new Date(opinion.fecha_opinion).toLocaleDateString() }}</td>
          <td>
            <a @click="eliminarOpinion(opinion.id)" class="">
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

.icono__agregar {
  width: 32px;
  height: 32px;
  color: #3498db;
  margin: 10px;
  cursor: pointer;
}
</style>

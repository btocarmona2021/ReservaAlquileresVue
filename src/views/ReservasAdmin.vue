<script setup lang="ts">
import { ref } from 'vue';
import api from '@/axios/axios.ts';
import type { Reserva } from '@/interfaces/Reserva.ts';

const reservas = ref<Reserva[]>([]);
const info = ref('');

const obtenerReservas = async () => {
  try {
    const respuesta = await api.get('/reserva', {
      withCredentials: true,
    });
    reservas.value = respuesta.data;
    console.log(reservas);
  } catch (error) {
    console.log(error);
  }
};


</script>

<template>
  <div>
    <div class="addReservas">
<!--      <button @click="addreserva" class="btn btn-info m-2">Agregar Reserva</button>-->
<!--      <p :class="{ info: info != '' }">{{ info }}</p>-->
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
      </tr>
      </thead>
      <tbody>
<!--      <tr v-for="reserva in reservas" :key="reserva.id">-->
<!--        &lt;!&ndash;        <td>{{ usuario.id }}</td>&ndash;&gt;-->
<!--        <td>{{ reserva.nombre }}</td>-->
<!--        <td>-->
<!--          <img :src="usuario.foto_perfil || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'"-->
<!--               :alt="usuario.nombre" class="tabla-imagen" />-->
<!--        </td>-->
<!--        <td>{{ usuario.email }}</td>-->
<!--        <td>{{ usuario.tipo_usuario }}</td>-->
<!--        <td>-->
<!--          <button @click="verDetalles(usuario.id)" class="btn btn-sm btn-info">-->
<!--            Ver Detalles-->
<!--          </button>-->
<!--          <button @click="eliminarUsuario(usuario.id)" class="btn btn-sm btn-danger m-2">-->
<!--            Eliminar-->
<!--          </button>-->
<!--        </td>-->
<!--      </tr>-->
<!--      <tr v-if="usuarios.length === 0">-->
<!--        <td colspan="6" class="tabla-vacia">No hay usuarios disponibles</td>-->
<!--      </tr>-->
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
</style>

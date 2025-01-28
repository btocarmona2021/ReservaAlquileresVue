<script setup lang="ts">
import api from "@/axios/axios";
import type { Propiedad } from "@/interfaces/Propiedad";
import { onMounted, ref } from "vue";

const propiedades = ref<Propiedad[]>([]);
const propiedad_id = ref("");
const fecha_inicio = ref("");
const fecha_fin = ref("");
const estado = ref("");

const obtenerPropiedades = async () => {
  try {
    const respuesta = await api.get("propiedad", {
      withCredentials: true,
    });
    // Aseguramos que cada propiedad tenga un campo `hover` para manejar el hover individual
    propiedades.value = respuesta.data;
  } catch (error) {
    console.log("Error al obtener propiedades: ", error);
  }
};

onMounted(() => {
  obtenerPropiedades();
});
const addReserva = async (ev) => {
  ev.preventDefault();
  
  try {
    const reserva = {
      propiedad_id: propiedad_id.value,
      fecha_inicio: fecha_inicio.value,
      fecha_fin: fecha_fin.value,
      estado: estado.value,
    };
    console.log(reserva);

    const respuesta = await api.post("/reserva", reserva, {
      withCredentials: true,
    });
    console.log(respuesta.data);

  } catch (error: any) {
console.log(error.response.data.message);

  }
};
</script>

<template>
  <div class="container form__addpropiedad">
    <form
      class="row d-flex flex-column align-items-center justify-content-center mx-auto"
      action=""
      @submit="addReserva"
    >
      <label for="tipo_propiedad">Elije la propiedad:</label>

      <select
        class="form-control"
        name="propiedades"
        id=""
        v-model="propiedad_id"
      >
        <option
          v-for="propiedad in propiedades"
          :key="propiedad.id"
          :value="propiedad.id"
        >
          {{ propiedad.titulo }}
        </option>
      </select>

      <label for="fecha_inicio">Seleccione la fecha de inicio</label>
      <input
        class="form-control"
        type="date"
        v-model="fecha_inicio"
        id="fecha_inicio"
      />

      <label for="fecha_fin">Seleccione la fecha fin</label>
      <input
        class="form-control"
        type="date"
        v-model="fecha_fin"
        id="fecha_fin"
      />

      <label for="estado">Seleccione el estado</label>
      <select class="form-control" v-model="estado" name="estado" id="estado">
        <option value="pendiente">Pendiente</option>
        <option value="confirmada">Confirmada</option>
        <option value="caencelada">Cancelada</option>
      </select>

      <!-- <p
        :class="{
          correcto: errorEncontrado === 'Propiedad creada correctamente',
          disabled: errorEncontrado == '',
        }"
        class="error"
      >
        {{ errorEncontrado }}
      </p> -->
      <input
        class="btn btn-outline-dark mt-3"
        type="submit"
        value="GUARDAR RESERVA"
      />
    </form>
  </div>
</template>

<style scoped>
.form__addpropiedad {
  width: 500px;
  height: 360px;
  margin: 10px auto;
  font-family: Oswald, sans-serif;
  background-color: #115291;
  color: whitesmoke;
  border-radius: 8px;
  padding: 20px;
}

.form__addusuario form {
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 15px;
}

.form__btn {
  color: white;
  padding: 14px;
  font-family: Oswald, sans-serif;
  font-size: 1em;
  background-color: #115291;
  border-radius: 5px;
  box-shadow: 0 0 3px 2px #222;
}

input,
select {
  font-family: Oswald, sans-serif;
  font-size: 1.1em;
}

.error {
  color: wheat;
  background-color: darkred;
  padding: 5px;
  font-size: 0.8em;
}

.correcto {
  background-color: darkgreen;
}

.disabled {
  display: none;
}
</style>

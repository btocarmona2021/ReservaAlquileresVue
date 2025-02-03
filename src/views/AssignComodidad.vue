<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Propiedad } from "@/interfaces/Propiedad.ts";
import api from "@/axios/axios.ts";
import type { Comodidad } from "@/interfaces/Comodidad.ts";
import { useRoute } from "vue-router";
import { HomeIcon, SunIcon } from "@heroicons/vue/24/solid";

const propiedad_id = ref();
const comodidad_id = ref("");
const propiedad = ref<Propiedad | null>(null);
const comodidades = ref<Comodidad[]>([]);
const errorEncontrado = ref("");

//funcion para obtener las propiedades desde la Api
const obtenerPropiedad = async () => {
  try {
    const id = useRoute().params.id;
    const respuesta = await api.get(`propiedad/${id}`, {
      withCredentials: true,
    });
    propiedad.value = respuesta.data;
    if (propiedad.value) {
      propiedad_id.value = propiedad.value.id;
    }
  } catch (error) {
    console.log(error);
  }
};

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

const asignarComodidad = async () => {
  try {
    if (!propiedad_id.value || !comodidad_id.value) {
      errorEncontrado.value = "Debe seleccionar un elemento en ambos campos";
      return;
    }

    const comodidadAPropiedad = {
      propiedad_id: propiedad_id.value,
      comodidad_id: comodidad_id.value,
    };

    const respuesta = await api.post("asignaComodidad", comodidadAPropiedad, {
      withCredentials: true,
    });

    errorEncontrado.value = respuesta.data.message;
  } catch (error: any) {
    errorEncontrado.value = error.response.data.message;
  }
};

onMounted(() => {
  obtenerPropiedad();
  obtenerComodidades();
});
</script>

<template>
  <div class="contenedor d-flex justify-content-between align-items-center">
   <label for="propiedad">Propiedad</label>
    <div class="d-flex w-75">
      <HomeIcon class="icono__deco"/>
      <input
        type="text"
        class="form-control"
        :value="propiedad?.titulo"
        name="propiedad"
        readonly="true"
        id="propiedad"
      />
    </div>

    <label for="comodidad_id">Seleccione una comodidad</label>
    <div class="d-flex w-75">
      <SunIcon class="icono__deco"/>
      <select class="form-control" v-model="comodidad_id" id="comodidad_id">
        <option value="" selected>Seleccione la comodidad</option>
        <option
          v-for="comodidad in comodidades"
          :key="comodidad.id"
          :value="comodidad.id"
        >
          {{ comodidad.nombre }}
        </option>
      </select>
    </div>
    <p
      :class="{
        correcto:
          errorEncontrado == 'Comodidad asignada correctamente a la propiedad',
        error:
          errorEncontrado == 'Falta seleccionar la comodidad o la propiedad',
        disabled: errorEncontrado == '',
      }"
      class="error"
    >
      {{ errorEncontrado }}
    </p>

    <input
      @click="asignarComodidad"
      type="button"
      class="btn btn-outline-dark"
      value="Asignar comodidad"
    />
  </div>
</template>

<style scoped>
.contenedor {
  max-width: 500px;
  height: 340px;
  background-color: #115291;
  color: whitesmoke;
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin: 20px auto;
  border-radius: 8px;
  font-size: 1.1em;
  gap: 10px 0;
}

label,
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

.form__btn {
  color: white;
  padding: 14px;
  font-size: 1em;
  text-transform: uppercase;
  background-color: #115291;
  border-radius: 5px;
  box-shadow: 0 0 3px 2px #222;
}

</style>

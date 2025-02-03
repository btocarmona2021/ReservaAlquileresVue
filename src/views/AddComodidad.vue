<script setup lang="ts">
import { ref } from "vue";
import api from "@/axios/axios.ts";
import { PhotoIcon, SunIcon } from "@heroicons/vue/24/solid";

const errorEncontrado = ref("");

const nombre = ref("");
const icono = ref<File | null>(null);

const agregarPropiedad = async (ev: Event) => {
  ev.preventDefault();

  const datosComodidad = new FormData();
  datosComodidad.append("nombre", nombre.value);
  if (icono.value) {
    datosComodidad.append("imagen", icono.value);
  }

  try {
    const respuesta = await api.post("comodidad", datosComodidad, {
      withCredentials: true,
    });
    errorEncontrado.value = respuesta.data.message;
    nombre.value = "";
  } catch (error: any) {
    errorEncontrado.value = error.response.data.message;
  }
};

const actualizarImagen = (event: Event) => {
  const target = event.target as HTMLInputElement;

  if (target.files) {
    icono.value = target.files[0];
  } else {
    icono.value = null;
  }
};
</script>

<template>
  <div class="form__addcomodidad">
    <form
      class="d-flex justify-content-center align-items-center"
      action=""
      @submit="agregarPropiedad"
    >
      <label for="nombre">Nombre de la comodidad</label>
      <div class="d-flex w-75">
        <SunIcon class="icono__deco" />
        <input
          class="form-control"
          type="text"
          v-model="nombre"
          id="nombre"
          placeholder="Ingresa el nombre de la comodidad"
        />
      </div>

      <label for="imagen_principal">Selecciona una o mas imagenes <span style="color: red;">*</span> </label>
      <div class="d-flex w-75">
        <PhotoIcon class="icono__deco" />
        <input
          class="form-control"
          type="file"
          @change="actualizarImagen"
          id="imagen_principal"
          accept="image/png"
        />
      </div>
      <p
        :class="{
          correcto: errorEncontrado == 'Comodidad creada exitosamente',
          disabled: errorEncontrado == '',
        }"
        class="error"
      >
        {{ errorEncontrado }}
      </p>
      <input
        class="btn btn-outline-dark"
        type="submit"
        value="GUARDAR COMODIDAD"
      />
    </form>
  </div>
</template>

<style scoped>
.form__addcomodidad {
  width: 500px;
  margin: 10px auto;
  font-family: Oswald, sans-serif;
  background-color: #115291;
  color: whitesmoke;
  border-radius: 8px;
}

.form__addcomodidad form {
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 15px;
}

input,
select {
  font-family: Oswald, sans-serif;
  font-size: 1.1em;
}
.disabled {
  display: none;
}
</style>

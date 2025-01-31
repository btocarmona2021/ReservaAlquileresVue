<script setup lang="ts">
import api from "@/axios/axios";
import { PhotoIcon } from "@heroicons/vue/24/solid";
import { ref } from "vue";
import { useRoute } from "vue-router";

const imagenes = ref<File[] | null>(null);
const route = useRoute();
const propiedad_id = route.params.id as string;


const agregarImagenes = async (ev: Event) => {
  ev.preventDefault();
  const datos = new FormData();
  if (imagenes.value) {
    imagenes.value.forEach((imagen) => {
      datos.append(`imagen`, imagen); // Agregar cada archivo con un nombre único
    });
  }
  try {
    const respuesta = await api.post(`/imagen/${propiedad_id}`, datos, {
      withCredentials: true,
    });

  } catch (error) {
    console.log(error);
  }
};

const actualizarImagenes = (ev: Event) => {
  const inputFile = ev.target as HTMLInputElement;
  if (inputFile.files && inputFile.files[0]) {
    imagenes.value = Array.from(inputFile.files);
  }
};
</script>

<template>
  <div class="container form__addimagenes">
    <form
      class="row d-flex flex-column align-items-center justify-content-center mx-auto"
      action=""
      @submit="agregarImagenes"
    >
      <PhotoIcon class="icono_imagenes" />
      <label for="imagen_principal"
        >Carga las imagenes que creas necesarias para esta propiedad</label
      >
      <input
        class="form-control"
        type="file"
        multiple="true"
        @change="actualizarImagenes"
        id="imagen"
      />

      <input
        class="btn btn-outline-dark"
        type="submit"
        value="GUARDAR IMAGENES"
      />
    </form>
  </div>
</template>

<style scoped>
.form__addimagenes {
  width: 500px;
  height: 300px;
  margin: 10px auto;
  font-family: Oswald, sans-serif;
  background-color: #115291;
  color: whitesmoke;
  border-radius: 8px;
}
.form__addimagenes form {
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 15px;
}
.icono_imagenes {
  width: 100px;
  height: 100px;
}
</style>

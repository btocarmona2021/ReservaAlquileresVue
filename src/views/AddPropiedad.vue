<script setup lang="ts">
import { ref } from "vue";
import api from "@/axios/axios.ts";
import {
  BuildingOffice2Icon,
  BuildingStorefrontIcon,
  DocumentArrowDownIcon,
  HomeIcon,
  InformationCircleIcon,
  MapIcon,
  MapPinIcon,
  PhotoIcon,
  UserGroupIcon,
} from "@heroicons/vue/24/solid";

const errorEncontrado = ref("");

const titulo = ref("");
const descripcion = ref("");
const ubicacion = ref("");
const precio_por_noche = ref(0);
const capacidad_personas = ref(0);
const tipo_propiedad = ref("");
const imagen = ref<File | null>(null);
const tipo_usuario = ref("cliente");

const agregarPropiedad = async (ev: Event) => {
  ev.preventDefault();

  const datosPropiedad = new FormData();
  datosPropiedad.append("titulo", titulo.value);
  datosPropiedad.append("descripcion", descripcion.value);
  datosPropiedad.append("ubicacion", ubicacion.value);
  datosPropiedad.append("precio_por_noche", precio_por_noche.value.toString());
  datosPropiedad.append(
    "capacidad_personas",
    capacidad_personas.value.toLocaleString()
  );
  datosPropiedad.append("tipo_propiedad", tipo_propiedad.value);
  datosPropiedad.append("tipo_usuario", tipo_usuario.value);

  if (imagen.value) {
    datosPropiedad.append("imagen", imagen.value);
  }

  try {
    const respuesta = await api.post("propiedad", datosPropiedad, {
      withCredentials: true,
    });
    errorEncontrado.value = respuesta.data.message;
  } catch (error: any) {
    errorEncontrado.value = error.response.data.message;
  }
};

const actualizarImagen = (event: Event) => {
  //casteo del target como input para que typescript lo trate como input y nos otorgue el metodo files
  const target = event.target as HTMLInputElement;

  if (target.files && target.files[0]) {
    imagen.value = target.files[0];
  } else {
    imagen.value = null;
  }
};
</script>

<template>
  <div
    class="form__addcomodidad"
  >
    <form class="d-flex justify-content-center align-items-center" @submit="agregarPropiedad">
      <label for="titulo">Nombre de la propiedad</label>
      <div class="d-flex w-75">
        <HomeIcon class="icono__deco" />
        <input
          class="form-control"
          type="text"
          v-model="titulo"
          id="titulo"
          placeholder="Ingresa el nombre de la propiedad"
        />
      </div>

      <label for="descripcion">Descripcion de la propiedad</label>
      <div class="d-flex w-75">
        <InformationCircleIcon class="icono__deco" />
        <input
          class="form-control"
          type="text"
          v-model="descripcion"
          id="descripcion"
          placeholder="Ingresa la descripcion de la propiedad"
        />
      </div>

      <label for="ubicacion">Ubicacion de la propiedad</label>
      <div class="d-flex w-75">
        <MapPinIcon class="icono__deco" />
        <input
          class="form-control"
          type="text"
          v-model="ubicacion"
          id="ubicacion"
          placeholder="Ingresa la ubicacion de la propiedad"
        />
      </div>

      <label for="capacidad_personas">Capacidad de personas</label>
      <div class="d-flex w-75">
        <UserGroupIcon class="icono__deco" />
        <input
          class="form-control"
          type="number"
          v-model="capacidad_personas"
          id="capacidad_personas"
          min="0"
          max="10"
          placeholder="Ingresa la capacidad de personas"
        />
      </div>

      <label for="tipo_propiedad">Elije el tipo de propiedad:</label>
      <div class="d-flex w-75">
        <BuildingStorefrontIcon class="icono__deco" />
        <select
          class="form-control"
          v-model="tipo_propiedad"
          id="tipo_propiedad"
        >
          <option value="departamento">Departamento</option>
          <option value="casa">Casa</option>
          <option value="habitacion">Habitacion</option>
          <option value="cabaña">Cabaña</option>
        </select>
      </div>

      <label for="imagen_principal"
        >Carga la imagen principal de la propiedad</label
      >
      <div class="d-flex w-75">
        <PhotoIcon class="icono__deco" />
        <input
          class="form-control"
          type="file"
          @change="actualizarImagen"
          id="imagen_principal"
        />
      </div>

      <p
        :class="{
          correcto: errorEncontrado === 'Propiedad creada correctamente',
          disabled: errorEncontrado == '',
        }"
        class="error"
      >
        {{ errorEncontrado }}
      </p>
      <input
        class="btn btn-outline-dark w-50"
        type="submit"
        value="GUARDAR PROPIEDAD"
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

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import api from '@/axios/axios.ts';
import { useRoute } from 'vue-router';
import type { Propiedad } from '@/interfaces/Propiedad.ts';

const errorEncontrado = ref('');

const fecha_inicio = ref('');
const fecha_fin = ref('');
const precio = ref('');

const propiedad = ref<Propiedad>();

const obtenerPropiedad = async () => {
  const route = useRoute();
  const id = route.params.id;
  const respuesta = await api.get(`/propiedad/${id}`, {
    withCredentials: true,
  });
  propiedad.value = respuesta.data;
};

onMounted(() => {
  obtenerPropiedad();
});

const agregarPropiedad = async (ev: Event) => {
  ev.preventDefault();

  const datosTarifa = {
    fecha_inicio: cambiarFormatoFecha(fecha_inicio.value),
    fecha_fin: cambiarFormatoFecha(fecha_fin.value),
    precio: precio.value,
    propiedad_id: propiedad.value?.id,
  };

  try {
    const respuesta = await api.post('tarifa', datosTarifa, {
      withCredentials: true,
    });

    errorEncontrado.value = '';
    fecha_inicio.value = '';
    fecha_fin.value = '';
    precio.value = '';
  } catch (error: any) {
    errorEncontrado.value = error.response.data.message;
  }
};

const cambiarFormatoFecha = (fecha: string) => {
  return fecha.split('-').join('/'); // Cambia los guiones por barras
};
</script>

<template>
  <div class="form__addcomodidad">
    <form action="" @submit="agregarPropiedad">
      <label for="propiedad">Propiedad</label>
      <input type="text" :value="propiedad?.titulo" name="propiedad" id="propiedad" />

      <label for="fecha_inicio">Fecha inicio Tarifa</label>
      <input type="date" v-model="fecha_inicio" name="fecha_inicio" id="fecha_inicio" />

      <label for="fecha_fin">Fecha fin Tarifa</label>
      <input type="date" v-model="fecha_fin" name="fecha_fin" id="fecha_fin" />

      <label for="precio">Ingrese el precio por dia en estas fechas</label>
      <input
        type="number"
        v-model="precio"
        id="precio"
        placeholder="Ingresa el precio por dia en estas fechas"
      />

      <p
        :class="{
          correcto: errorEncontrado == 'Comodidad creada exitosamente',
          disabled: errorEncontrado == '',
        }"
        class="error"
      >
        {{ errorEncontrado }}
      </p>
      <input class="form__btn" type="submit" value="GUARDAR TARIFA" />
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

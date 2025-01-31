<script setup lang="ts">
import { onMounted, ref } from "vue";
import api from "@/axios/axios.ts";
import Swal from "sweetalert2";
import { TrashIcon } from "@heroicons/vue/24/solid";
import type { Imagen } from "@/interfaces/Imagen";

const imagenes = ref<Imagen[]>([]);
const info = ref("");

const obtenerImagenes = async () => {
  try {
    const respuesta = await api.get("/imagen", {
      withCredentials: true,
    });
    imagenes.value = respuesta.data;
  } catch (error: any) {
    info.value = error.response.data.message;
  }
};

onMounted(() => {
  obtenerImagenes();
});
const eliminarImagen = async (id: number) => {
  const result = await Swal.fire({
    title: "Eliminar Imagen",
    text: "¿Estás seguro de que deseas eliminar esta imagen?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar imagen",
    cancelButtonText: "No, cancelar",
  });

  if (result.isConfirmed) {
    try {
      // Llamada al endpoint para eliminar el usuario
      const respuesta = await api.delete(`/imagen/${id}`, {
        withCredentials: true,
      });
      // Filtrar al usuario eliminado de la lista local
      imagenes.value = imagenes.value.filter((imagen) => imagen.id !== id);
      info.value = respuesta.data.message;
      Swal.fire({
        title: "Imagen",
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
</script>

<template>
  <div>
    <table class="tabla-imagenes">
      <thead>
        <tr>
          <th>Id</th>
          <th>Imagen</th>
          <th>Propiedad</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(imagen, index) in imagenes" :key="imagen.id">
          <td>
            {{ imagen.id }}
          </td>
          <td>
            <img
              class="propiedad__imagenes img-fluid rounded shadow-sm"
              :src="imagen.ruta_imagen"
              alt=""
              data-bs-toggle="modal"
              :data-bs-target="'#modalImagen' + index"
              style="
                object-fit: cover;
                height: 60px;
                width: 60px;
                border-radius: 8px;
              "
            />

            <!-- Modal -->
            <div v-for="(imagen, index) in imagenes" :key="'modal-' + index">
              <div
                class="modal fade"
                :id="'modalImagen' + index"
                tabindex="-1"
                aria-labelledby="'modalImagenLabel' + index"
                aria-hidden="true"
              >
                <div class="modal-dialog w-25">
                  <div class="modal-content">
                    <div class="modal-header">
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body text-center">
                      <img
                        :src="imagen.ruta_imagen"
                        class="img-fluid"
                        style="max-width: 100%; height: auto"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </td>
          <td>{{ imagen.propiedade.titulo }}</td>
          <td>
            <a @click="eliminarImagen(imagen.id)" class="">
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
.tabla-imagenes {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-family: Oswald, sans-serif;
}

.tabla-imagenes th,
.tabla-imagenes td {
  border: 1px solid #ccc;
  padding: 4px;
  text-align: center;
  vertical-align: middle;
}

.tabla-imagenes th {
  background-color: #f4f4f4;
}

.tabla-imagen {
  width: 60px;
  height: 60px;
  object-fit: cover;
  object-position: center;
  border-radius: 10%;
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

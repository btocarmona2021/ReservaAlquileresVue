<script setup lang="ts">
import api from '@/axios/axios.ts';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import type { Usuario } from '@/interfaces/Usuario.ts'; // Asegúrate de tener esta interfaz definida

// Estado para almacenar los usuarios
const usuarios = ref<Usuario[]>([]);

const info = ref('');

// Función para obtener los usuarios desde la API
const obtenerUsuarios = async () => {
  try {
    const respuesta = await api.get('usuario', {
      withCredentials: true,
    });
    usuarios.value = respuesta.data;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  obtenerUsuarios(); // Llamada a la función para obtener los usuarios al montar el componente
});

// Llamada a otro componente con link
const router = useRouter();
const verDetalles = (id: number) => {
  router.push({ name: 'UsuarioDetalles', params: { id } }); // Asume que tienes una ruta de detalles para usuarios
};

const eliminarUsuario = async (id: number) => {
  if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
    try {
      // Llamada al endpoint para eliminar el usuario
      const respuesta = await api.delete(`usuario/${id}`, {
        withCredentials: true,
      });
      // Filtrar al usuario eliminado de la lista local
      usuarios.value = usuarios.value.filter((usuario) => usuario.id !== id);
      info.value = respuesta.data.message;
      setTimeout(() => {
        info.value = '';
      }, 2000);
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      alert('Ocurrió un error al intentar eliminar el usuario');
    }
  }
};

//llamada al formulario para agregar usuario
const addusuario = () => {
  router.push({ name: 'dashboard-addusuario' });
};
</script>

<template>
  <div>
    <div class="addUsuarios">
      <button @click="addusuario" class="btn btn-info m-2">Agregar Usuario</button>
      <p :class="{ info: info != '' }">{{ info }}</p>
    </div>
    <table class="tabla-usuarios">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Imagen</th>
          <th>Email</th>
          <th>Rol</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="usuario in usuarios" :key="usuario.id">
          <!--        <td>{{ usuario.id }}</td>-->
          <td>{{ usuario.nombre }}</td>
          <td>
            <img :src="usuario.foto_perfil || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'"
                 :alt="usuario.nombre" class="tabla-imagen" />
          </td>
          <td>{{ usuario.email }}</td>
          <td>{{ usuario.tipo_usuario }}</td>
          <td>
            <button @click="verDetalles(usuario.id)" class="btn btn-sm btn-info">
              Ver Detalles
            </button>
            <button @click="eliminarUsuario(usuario.id)" class="btn btn-sm btn-danger m-2">
              Eliminar
            </button>
          </td>
        </tr>
        <tr v-if="usuarios.length === 0">
          <td colspan="6" class="tabla-vacia">No hay usuarios disponibles</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.tabla-usuarios {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-family: Oswald, sans-serif;
}

.tabla-usuarios th,
.tabla-usuarios td {
  border: 1px solid #ccc;
  padding: 4px;
  text-align: center;
  vertical-align: middle;
}

.tabla-usuarios th {
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

.addUsuarios {
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

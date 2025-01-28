<script setup lang="ts">
import api from "@/axios/axios.ts";
import { ref } from "vue";

const errorEncontrado = ref("");

const nombre = ref("");
const apellido = ref("");
const email = ref("");
const telefono = ref("");
const direccion = ref("");
const contrasena_encriptada = ref("");
const imagen = ref<File | null>(null);
const tipo_usuario = ref("cliente");

const agregarUsuario = async (ev: Event) => {
  ev.preventDefault();

  const datosUsuario = new FormData();
  datosUsuario.append("nombre", nombre.value);
  datosUsuario.append("apellido", apellido.value);
  datosUsuario.append("email", email.value);
  datosUsuario.append("telefono", telefono.value);
  datosUsuario.append("direccion", direccion.value);
  datosUsuario.append("contrasena_encriptada", contrasena_encriptada.value);
  datosUsuario.append("tipo_usuario", tipo_usuario.value);
  if (imagen.value) {
    datosUsuario.append("imagen", imagen.value);
  }

  try {
    const respuesta = await api.post("usuario", datosUsuario, {
      withCredentials: true,
    });
    errorEncontrado.value = respuesta.data.message;
  } catch (error: any) {
    if (error.response && error.response.data.errores) {
      const errores = error.response.data.errores;
      errorEncontrado.value = errores[0].msg;
    } else {
      // Maneja otros errores (como problemas de conexión, etc.)
      errorEncontrado.value = error.response.data.message;
    }
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
  <div class="form__addusuario">
    <form action="" @submit="agregarUsuario">
      <label for="nombre">Nombre del usuario</label>
      <input
        type="text"
        v-model="nombre"
        id="nombre"
        placeholder="Ingresa el nombre del usuario"
      />

      <label for="apellido">Apellido del usuario</label>
      <input
        type="text"
        v-model="apellido"
        id="apellido"
        placeholder="Ingresa el apellido del usuario"
      />

      <label for="email">Email del usuario</label>
      <input
        type="email"
        v-model="email"
        id="email"
        placeholder="Ingresa el email del usuario"
      />

      <label for="telefono">Telefono del usuario</label>
      <input
        type="text"
        v-model="telefono"
        id="telefono"
        placeholder="Ingresa el telefono del usuario"
      />

      <label for="direccion">Direccion del usuario</label>
      <input
        type="text"
        v-model="direccion"
        id="direccion"
        placeholder="Ingresa la direccion del usuario"
      />

      <label for="contrasena_encriptada">Ingresa el password</label>
      <input
        type="text"
        v-model="contrasena_encriptada"
        id="contrasena_encriptada"
        placeholder="Ingresa el password"
      />

      <label for="foto_perfil">Carga la imagen de perfil</label>
      <input type="file" @change="actualizarImagen" id="foto_perfil" />

      <label for="tipo_usuario">Elije el Rol del usuario:</label>
      <select v-model="tipo_usuario" id="tipo_usuario">
        <option value="cliente">cliente</option>
        <option value="administrador">administrador</option>
      </select>
      <p
        :class="{
          correcto: errorEncontrado == 'Usuario creado correctamente',
          disabled: errorEncontrado == '',
        }"
        class="error"
      >
        {{ errorEncontrado }}
      </p>
      <input class="form__btn" type="submit" value="GUARDAR USUARIO" />
    </form>
  </div>
</template>

<style scoped>
.form__addusuario {
  width: 500px;
  margin: 10px auto;
  font-family: Oswald, sans-serif;
  background-color: #115291;
  color: whitesmoke;
  border-radius: 8px;
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

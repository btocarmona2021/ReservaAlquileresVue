<script lang="ts" setup>
import api from "@/axios/axios.ts";
import { ref } from "vue";
import router from "@/router";
import { UserIcon, KeyIcon } from "@heroicons/vue/24/solid";

const email = ref("");
const password = ref("");
const info = ref("");

const login = async () => {
    try {
        const credenciales = {
            email: email.value,
            contrasena_encriptada: password.value,
        };
        const respuesta = await api.post("login", credenciales);
        info.value = respuesta.data.message;

        setTimeout(() => {
            if (respuesta) {
                router.push({ name: "propiedades" });
            }
        }, 2000);
    } catch (error: any) {
        info.value = error.response.data.message;
        console.log(error);
    }
};
</script>

<template>
    <div class="contenedor">
        <form class="form" action="">
            <label for="email">Ingres su mail: </label>

            <div class="contenedor__input">
                <UserIcon class="icono__login" />
                <input
                    class="form__input"
                    v-model="email"
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Ingrese su correo electronico"
                    required
                />
            </div>
            <label for="password">Ingrese su password: </label>
            <div class="contenedor__input">
                <KeyIcon class="icono__login" />
                <input
                    v-model="password"
                    class="form__input"
                    type="password"
                    name="contrasena_encriptada"
                    id="password"
                    placeholder="Ingrese su password"
                    required
                />
            </div>
            <p
                v-if="info != ''"
                :class="info === 'Login exitoso' ? 'info__login' : 'info__error'"
            >
                {{ info }}
            </p>
            <input
                @click="login"
                class="form__btn btn__login"
                type="button"
                value="Ingresar"
            />
        </form>
    </div>
</template>

<style scoped>
.contenedor {
    background-color: #444444;
    padding: 20px;
}

.form {
    font-family: Oswald, sans-serif;
    font-size: 1.2em;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding: 20px;
    width: 400px;
    height: 200px;
    gap: 10px;
    margin: 20px auto;
    background-color: #3498db;
    border-radius: 8px;
}

form:hover {
    box-shadow: 0 0 5px 2px whitesmoke;
}

.form__input {
    font-family: Oswald, sans-serif;
    font-size: 1em;
    width: 80%;
    border-radius: 5px;
    padding-left: 10px;
}

.info__login {
    background-color: green;
    padding: 5px;
    border-radius: 5px;
    color: whitesmoke;
}

.info__error {
    background-color: darkred;
    padding: 5px;
    border-radius: 5px;
    color: whitesmoke;
}

.btn__login {
    width: 50%;
    border: 2px solid white;
    background-color: #333333;
    color: white;
    font-family: Oswald, sans-serif;
    text-transform: uppercase;
    border-radius: 8px;
    margin-bottom: 10px;
    cursor: pointer;
    padding: 10px 0;
}

.icono__login {
    width: 24px;
    height: 24px;
    color: #333333;
}

.contenedor__input {
    width: 80%;
    display: flex;
    align-items: center;
    gap: 0 10px;
}
</style>

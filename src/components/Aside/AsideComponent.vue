<script setup lang="ts">
import {
    HomeIcon,
    WifiIcon,
    CheckBadgeIcon,
    CurrencyDollarIcon,
    CalendarDateRangeIcon,
    UserGroupIcon,
} from "@heroicons/vue/24/solid";
</script>

<template>
    <aside class="aside">
        <router-link class="btn btn-secondary text-start" to="/dashboard/propiedades"
            ><HomeIcon class="icono__check" />Propiedades
        </router-link>
        <router-link class="btn btn-secondary text-start" to="/dashboard/comodidades"
            ><WifiIcon class="icono__check" />Comodidades
        </router-link>
        <router-link class="btn btn-secondary text-start" to="/dashboard/asigna-comodidad"
            ><CheckBadgeIcon class="icono__check" />Asignar Comodidad</router-link
        >
        <router-link class="btn btn-secondary text-start" to="/dashboard/tarifas"
            ><currency-dollar-icon class="icono__check" />Tarifas Vigentes
        </router-link>
        <router-link class="btn btn-secondary text-start" to="/dashboard/reservas"
            ><CalendarDateRangeIcon class="icono__check" />Reservas
        </router-link>
        <router-link class="btn btn-secondary text-start" to="/dashboard/usuarios"
            ><UserGroupIcon class="icono__check" />Usuarios
        </router-link>
        <!-- Agrega más enlaces según tus necesidades -->
    </aside>
</template>

<style scoped>
.btn {
    font-size: 0.8em;
}
.aside {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: #3498db;
    padding: 15px;
}
.link {
    width: 80%;
    text-decoration: none;
    color: white;
    padding: 14px;
    font-family: Oswald, sans-serif;
    background-color: #115291;
    border-radius: 5px;
    box-shadow: 0 0 3px 2px #222;
    display: flex;
    align-items: center;
    gap: 0 5px;
}
</style>

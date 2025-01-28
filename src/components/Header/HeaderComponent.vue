<script lang="ts" setup>
import {
  HomeIcon,
  HomeModernIcon,
  CalendarDaysIcon,
  UserIcon,
  ArrowRightIcon,
  UserPlusIcon,
  WrenchIcon,
} from '@heroicons/vue/24/solid';
</script>

<template>
  <header>
    <div>
      <img src="../../assets/logoreservas.png" alt="Logo" />
    </div>

    <nav>
      <ul class="menu">
        <li>
          <router-link to="/">
            <HomeIcon class="menu__icon" />
            Inicio
          </router-link>
        </li>
        <li>
          <router-link to="/propiedades">
            <HomeModernIcon class="menu__icon" />
            Propiedades
          </router-link>
        </li>
        <li>
          <router-link to="/acerca">
            <UserIcon class="menu__icon" />
            Acerca de
          </router-link>
        </li>
        <li>
          <router-link to="/login">
            <ArrowRightIcon class="menu__icon" />
            Login
          </router-link>
        </li>
        <li>
          <router-link to="/registro">
            <UserPlusIcon class="menu__icon" />
            Registro
          </router-link>
        </li>
        <li>
          <router-link to="/dashboard">
            <WrenchIcon class="menu__icon" />
            Dashboard
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
header {
  max-width: 1360px;
  background-color: #333;
  color: #fff;
  padding: 1.5rem;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
}

img {
  width: 140px;
}

.menu {
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
}

nav li {
  margin: 0 1rem;
}

nav li a,
nav li router-link {
  color: antiquewhite;
  text-decoration: none;
  font-size: 1.3em;
  font-family: Oswald, sans-serif;
  display: flex;
  align-items: center;
  gap: 2px;
}

.menu__icon {
  width: 32px;
  height: 32px;
}
</style>

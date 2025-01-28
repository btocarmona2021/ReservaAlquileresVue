<script setup lang="ts">

</script>

<template>
  <footer>
    <div>
      <img src="../../assets/logoreservas.png" alt="Logo">
    </div>

    <nav>
      <ul>
        <li><a href="/">Inicio</a></li>
        <li><a href="/propiedades">Propiedades</a></li>
        <li><a href="/reserva">Reserva</a></li>
        <li><a href="/acerca">Acerca de</a></li>
        <li><a href="/login">Login</a></li>
        <li><a href="/registro">Registro</a></li>
      </ul>
    </nav>
  </footer>
</template>

<style scoped>

footer {
  max-width: 1360px;
  margin-block: 5px;
  background-color: #333;
  color: #fff;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100px;
}
img{
  width: 80px;
}

nav ul {
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
}

nav li {
  margin: 0 1rem;
}
nav li a{
  color: antiquewhite;
  text-decoration: none;
  font-size: 1.3em;
  font-family: Oswald,sans-serif;
}
img{
  width: 140px;
}
</style>

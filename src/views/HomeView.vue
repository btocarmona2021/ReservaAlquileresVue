<script setup lang="ts"></script>

<template>
  <div class="slider">
    <div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide-to="0"
          class="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active" data-bs-interval="4000">
          <img
            src="https://www.ferrocons.com.ar/wp-content/uploads/2021/08/1-4.jpg"
            class="d-block w-100"
            alt="..."
          />
          <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-75 text-white">
            <h5>Tu hogar, nuestra prioridad</h5>
            <p>Encuentra propiedades únicas adaptadas a tus necesidades.</p>
          </div>
        </div>
        <div class="carousel-item" data-bs-interval="4000">
          <img
            src="https://i.pinimg.com/originals/24/e5/0a/24e50a824ae9a8a5ac28b2f9339b92ac.jpg"
            class="d-block w-100"
            alt="..."
          />
          <div class="carousel-caption d-none d-md-block bg-primary bg-opacity-75 text-white">
            <h5>Alquileres confiables</h5>
            <p>Disfruta de una experiencia sin preocupaciones con nuestra gestión profesional.</p>
          </div>
        </div>
        <div class="carousel-item" data-bs-interval="4000">
          <img
            src="https://images.homify.com/c_fill,f_auto,h_500,q_auto,w_1280/v1462889949/p/photo/image/1500480/20160229_091403.jpg"
            class="d-block w-100"
            alt="..."
          />
          <div class="carousel-caption d-none d-md-block bg-warning bg-opacity-75 text-dark">
            <h5>Espacios diseñados para ti</h5>
            <p>Explora opciones de alquiler en ubicaciones privilegiadas.</p>
          </div>
        </div>
      </div>

      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleDark"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Anterior</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleDark"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Siguiente</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.slider {
  max-height: 350px;
  overflow: hidden;
}

.slider img {
  object-fit: cover;
  height: 100%;
  max-height: 350px;
}
</style>

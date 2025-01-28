<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import api from '@/axios/axios.ts';
import Swal from 'sweetalert2';

import FullCalendar from '@fullcalendar/vue3';
import DayGridPlugin from '@fullcalendar/daygrid';
import InteractionPlugin from '@fullcalendar/interaction';
import TimeGridPlugin from '@fullcalendar/timegrid';
import esLocale from '@fullcalendar/core/locales/es';

import {
  CheckCircleIcon,
  PhotoIcon,
  ChatBubbleLeftIcon,
  CalendarIcon,
} from '@heroicons/vue/24/outline';

import type { PropiedadDetalles } from '@/interfaces/PropiedadDetalles.ts';
import type { optionCalendar } from '@/interfaces/OptionCalendar.ts';
import type { Reserva } from '@/interfaces/Reserva.ts';

// Variables y referencias
const propiedad = ref<PropiedadDetalles | null>(null);
const reservas = ref<{ title: string; start: string; end: string }[]>([]);
const info = ref<Reserva | string>('');
const comentario = ref('');
const rating = ref(0);
const estadoComentario = ref('');
const stars: number[] = [1, 2, 3, 4, 5];
const route = useRoute();
const propiedadId = route.params.id;

// Obtener propiedad
const obtenerPropiedad = async () => {
  try {
    const respuesta = await api.get(`propiedaddetalles/${propiedadId}`, {
      withCredentials: true,
    });
    propiedad.value = respuesta.data;
  } catch (error) {
    console.error(error);
  }
};

// Obtener reservas
const obtenerReservas = async () => {
  try {
    const respuesta = await api.get(`reserva/propiedad/${propiedadId}`, {
      withCredentials: true,
    });

    if (Array.isArray(respuesta.data)) {
      reservas.value = respuesta.data.map((reserva) => ({
        title: 'Reservado',
        start: new Date(reserva.fecha_inicio).toISOString().split('T')[0],
        end: new Date(reserva.fecha_fin).toISOString().split('T')[0],
        endExclusive: new Date(
          new Date(reserva.fecha_fin).setDate(new Date(reserva.fecha_fin).getDate()),
        )
          .toISOString()
          .split('T')[0],
        estado: reserva.estado,
        precio_total: reserva.precio_total,
        dias_reserva: reserva.dias_reserva,
      }));
    } else {
      reservas.value = [];
    }
  } catch (error) {
    console.error('Error al obtener reservas:', error);
  }
};

// Función para verificar si la fecha está reservada
const isDateReserved = (date: string) => {
  return reservas.value.some(
    (reserva) =>
      new Date(date).getTime() >= new Date(reserva.start).getTime() &&
      new Date(date).getTime() <= new Date(reserva.end).getTime(),
  );
};

// Función de selección de rango de fechas
const handleSelect = (info: any) => {
  const startDate = info.start;
  const endDate = new Date(info.end);

  endDate.setDate(endDate.getDate() - 1);

  if (
    isDateReserved(startDate.toISOString().split('T')[0]) ||
    isDateReserved(endDate.toISOString().split('T')[0])
  ) {
    alert('Una o más fechas seleccionadas ya están reservadas.');
  } else {
    reservar(startDate, endDate);
  }
};

// Configuración del calendario
const calendarOptions = ref<optionCalendar>({
  plugins: [DayGridPlugin, InteractionPlugin, TimeGridPlugin],
  headerToolbar: {
    right: 'prev today next',
  },
  initialView: 'dayGridMonth',
  selectable: true,
  select: handleSelect,
  events: [],
  locale: esLocale,
});

// Actualizar eventos en el calendario cuando cambien las reservas
watch(reservas, (nuevasReservas) => {
  calendarOptions.value.events = nuevasReservas.map((reserva) => ({
    title: `${reserva.title}`,
    start: reserva.start,
    end: new Date(new Date(reserva.end).setDate(new Date(reserva.end).getDate() + 1))
      .toISOString()
      .split('T')[0],
  }));
});

// Realizar reserva
const reservar = async (start: Date, end: Date) => {
  const result = await Swal.fire({
    title: 'Confirmar reserva',
    text: `¿Estás seguro de que deseas reservar desde ${start.toISOString().split('T')[0]} hasta ${end.toISOString().split('T')[0]}?`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar',
  });

  if (result.isConfirmed) {
    try {
      const reserva = {
        usuario_id: '1',
        propiedad_id: propiedadId,
        fecha_inicio: start.toISOString().split('T')[0],
        fecha_fin: end.toISOString().split('T')[0],
        estado: 'pendiente',
      };

      const respuesta = await api.post('/reserva', reserva, {
        withCredentials: true,
      });
      await obtenerReservas();
      info.value =await respuesta.data;
    } catch (error: any) {
      info.value = error.response.data.message;
    }
  } else {
    info.value = 'Reserva cancelada';
  }
};

// Actualizar la calificación
const setRating = (star: number) => {
  rating.value = star;
};

// Enviar comentario
const enviaComentario = async () => {
  const calificacion = {
    calificacion: rating.value,
    comentario: comentario.value,
    propiedad_id: propiedad.value?.id,
  };
  try {
    const respuesta = await api.post('/opinion', calificacion, {
      withCredentials: true,
    });
    estadoComentario.value =
      'Tu comentario ya ha sido publicado, muchas gracias por tu valoración.';
    comentario.value = '';
    rating.value = 0;

    setTimeout(() => {
      obtenerPropiedad();
    }, 2000);
  } catch (error: any) {
    estadoComentario.value = error.response.data.message;
  }
};

// Ejecutar funciones al montar el componente
onMounted(() => {
  obtenerPropiedad();
  obtenerReservas();
});
</script>

<template>
  <div class="propiedad">
    <div class="container-fluid d-flex">
      <div class="row d-flex justify-content-center ">
        <div class="col-md-4 col-sm-12">
          <h1 class="propiedad__titulo h3 text-center p-2 m-2 rounded-3" v-if="propiedad">
            {{ propiedad.titulo }}
          </h1>
          <div>
            <img
              class="propiedad__imagen--principal img-thumbnail"
              v-if="propiedad"
              :src="propiedad.imagen_principal"
              alt=""
            />
          </div>
        </div>

        <div class="col-md-3 col-sm-12 propiedad__comodidades mt-4">
          <p class="comodidad__titulo mb-3 fw-bold text-primary">Comodidades disponibles</p>

          <div class="d-flex flex-wrap gap-3">
            <div
              v-for="comodidad in propiedad?.propiedad_comodidades"
              :key="comodidad.id"
              class="comodidad-item d-flex flex-column align-items-center p-2 rounded-3 shadow-sm bg-light"
              style="flex: 1 1 calc(50% - 1rem); max-width: calc(50% - 1rem)"
            >
              <img
                class="icono-comodidad mb-2"
                :src="comodidad.comodidade.icono"
                :alt="comodidad.comodidade.nombre"
                style="width: 30px; height: 30px; object-fit: contain"
              />
              <span class="comodidad-nombre text-center" style="font-size: 10px; color: #333">
                {{ comodidad.comodidade.nombre }}
              </span>
            </div>
          </div>
        </div>

        <!-- TARIFAS -->
        <div class="col-md-4 col-sm-12 tarifas mt-4">
          <p v-if="propiedad?.tarifas?.length" class="comodidad__titulo mb-3 fw-bold text-primary">
            Tarifas disponibles
          </p>
          <p v-else class="comodidad__titulo">Aún no se definieron tarifas</p>

          <div class="list-group">
            <div
              v-for="tarifa in propiedad?.tarifas"
              :key="tarifa.id"
              class="list-group-item border-0 rounded-2 shadow-sm p-2 mb-2 bg-light"
            >
              <h6 class="mb-2 text-primary text-uppercase text-truncate">
                {{
                  new Date(tarifa.fecha_inicio)
                    .toLocaleDateString('es-ES', { month: 'long' })
                    .toUpperCase()
                }}
              </h6>

              <div class="d-flex justify-content-between">
                <div>
                  <p class="mb-1 text-sm">
                    <strong>Desde:</strong>
                    {{ new Date(tarifa.fecha_inicio).toLocaleDateString('es-ES') }}
                  </p>
                  <p class="mb-0 text-sm">
                    <strong>Hasta:</strong>
                    {{ new Date(tarifa.fecha_fin).toLocaleDateString('es-ES') }}
                  </p>
                </div>

                <div class="text-end">
                  <p class="mb-1 text-sm">
                    <strong>Precio:</strong> ${{ tarifa.precio }}
                    <span class="text-muted">por día</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- GALERÍA DE FOTOS -->
    <h1 class="header__titulos">
      <PhotoIcon class="icono__galeria" />
      Galeria de fotos
    </h1>

    <div class="container mt-4">
      <div class="row justify-content-center">
        <div
          v-for="(imagen, index) in propiedad?.imagenes_propiedads.slice(0, 12)"
          :key="imagen.id"
          class="col-12 col-sm-4 col-md-2 mb-3"
        >
          <img
            class="propiedad__imagenes img-fluid rounded shadow-sm"
            :src="imagen.ruta_imagen"
            alt=""
            data-bs-toggle="modal"
            :data-bs-target="'#modalImagen' + index"
            style="object-fit: cover; height: 150px; width: 150px; border-radius: 8px"
          />
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      v-for="(imagen, index) in propiedad?.imagenes_propiedads.slice(0, 5)"
      :key="'modal-' + index"
    >
      <div
        class="modal fade"
        :id="'modalImagen' + index"
        tabindex="-1"
        aria-labelledby="'modalImagenLabel' + index"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <img :src="imagen.ruta_imagen" class="img-fluid" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- RESEÑAS -->
    <h1 class="header__titulos">
      <ChatBubbleLeftIcon class="icono__galeria" />
      Reseñas
    </h1>
    <div class="container mt-4">
      <div class="row">
        <div class="col-12">
          <h3 class="mb-4">Opiniones de nuestros clientes</h3>
          <div
            v-for="opinion in propiedad?.opinions.slice(0,5)"
            :key="opinion.id"
            class="card mb-3 shadow-sm border-0"
          >
            <div class="row g-0">
              <!-- Foto de perfil -->
              <div class="col-md-2 d-flex align-items-center justify-content-center">
                <img
                  class="rounded-circle img-fluid"
                  :src="
                    opinion?.usuario?.foto_perfil ||
                    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                  "
                  alt="Foto de perfil"
                  style="width: 80px; height: 80px; object-fit: cover"
                />
              </div>
              <!-- Contenido de la opinión -->
              <div class="col-md-10">
                <div class="card-body">
                  <h5 class="card-title mb-1">
                    {{ opinion?.usuario?.nombre }} {{ opinion?.usuario?.apellido }}
                  </h5>
                  <div class="d-flex align-items-center mb-2">
                    <!-- Calificación -->
                    <span class="text-warning me-2">
                      <i
                        class="bi bi-star-fill"
                        v-for="i in Math.floor(opinion.calificacion)"
                        :key="i"
                      ></i>
                      <i
                        class="bi bi-star"
                        v-for="i in 5 - Math.floor(opinion.calificacion)"
                        :key="`empty-${i}`"
                      ></i>
                    </span>
                    <span class="text-muted">Calificación: {{ opinion.calificacion }}</span>
                  </div>
                  <!-- Comentario -->
                  <p class="card-text">{{ opinion.comentario }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- RESERVA -->
    <h1 class="header__titulos">
      <CalendarIcon class="icono__galeria" />
      Haz tu reserva
    </h1>
    <div class="container-fluid">
      <div class="row">
        <FullCalendar class="col-md-7 fc" :options="calendarOptions" />
        <div class="col-md-5 reservas__info card p-4 shadow-lg rounded">
          <p v-if="info === ''" class="text-center text-muted fs-5 fw-bold">
            ¡Haz tu reserva, nos contactaremos contigo al instante!
          </p>
          <p v-else-if="info !== '' && typeof info !== 'object' " class="info__errores alert alert-danger text-center">
            {{ info }}
          </p>
          <div class="reservas__ok" v-else>
            <p class="reservas__ok--contacto text-center fs-4 fw-bold text-success mb-4">
              ¡Genial! Pronto nos pondremos en contacto contigo.
            </p>
            <div class="mb-3">
              <span class="text-primary fw-bold">Propiedad: </span>
              <span class="fw-normal">{{ propiedad?.titulo }}</span>
            </div>
            <hr />
            <div class="mb-3 d-flex align-items-center">
              <CheckCircleIcon class="icono__check text-success me-2" />
              <span>Has reservado desde el <strong>{{ info.fecha_inicio.split('T')[0] }}</strong> hasta el <strong>{{
                  info.fecha_fin.split('T')[0] }}</strong></span>
            </div>
            <div class="mb-3 d-flex align-items-center">
              <CheckCircleIcon class="icono__check text-success me-2" />
              <span>Con la tarifa del mes de <strong>{{ new Date(info.fecha_inicio).toLocaleDateString('es-ES', { month: 'long' }) }}</strong></span>
            </div>
            <div class="mb-3 d-flex align-items-center">
              <CheckCircleIcon class="icono__check text-success me-2" />
              <span>Por un total de <strong>{{ info.dias_reserva }}</strong> días</span>
            </div>
            <div class="mb-3 d-flex align-items-center">
              <CheckCircleIcon class="icono__check text-success me-2" />
              <span>Con un costo total de <strong>{{ info.precio_total }}</strong> pesos</span>
            </div>
            <div class="d-flex align-items-center">
              <CheckCircleIcon class="icono__check text-success me-2" />
              <span>La reserva se encuentra
        <span class="badge bg-warning text-dark ms-1">{{ info.estado }}</span>
      </span>
            </div>
          </div>
        </div>


      </div>
    </div>
  </div>

  <!--  COMENTARIOS Y CALIFICACION-->
  <h1 class="header__titulos">
    <ChatBubbleLeftIcon class="icono__galeria" />
    Califícanos y recomiéndanos si lo consideras. ¡Gracias por tu visita! ¡Te esperamos nuevamente!
  </h1>

  <div class="container-fluid calificanos">
    <div class="row justify-content-center">
      <div class="col-md-7 d-flex flex-column align-items-center justify-content-center">
        <div>
          <span
            v-for="star in stars"
            :key="star"
            @click="setRating(star)"
            :style="{
              cursor: 'pointer',
              color: star <= rating ? 'gold' : 'gray',
              fontSize: '40px',
              textShadow: '2px 1px 4px black',
            }"
          >
            ★
          </span>
        </div>
        <textarea
          class="form-control mt-3"
          v-model="comentario"
          name="comentario"
          cols="20"
          rows="5"
        ></textarea>
        <p v-if="estadoComentario !== ''" class="alert alert-info mt-3" role="alert">
          {{ estadoComentario }}
        </p>
        <button @click="enviaComentario" type="submit" class="btn btn-dark mt-3">
          Enviar comentario
        </button>
      </div>
    </div>
  </div>
</template>

<style>
.icono__galeria {
  width: 48px;
  height: 48px;
}

.propiedad__titulo {
  font-size: 2rem;
  font-weight: bold;
  font-family: Oswald, sans-serif;
  background-color: #333333;
  color: whitesmoke;
}

.propiedad__imagen--principal {
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.comodidad__titulo {
  font-size: 1.25em;
  font-family: Oswald, sans-serif;
}

.comodidad-item {
  transition: transform 0.3s ease-in-out;
}

.comodidad-item:hover {
  transform: translateY(-5px);
}

.list-group-item {
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.tarifas .list-group-item {
  transition: background-color 0.3s ease;
}

.tarifas .list-group-item:hover {
  background-color: #f8f9fa;
}

@media (max-width: 768px) {
  .comodidad-item {
    flex: 1 1 100%;
    max-width: 100%;
  }
}

.modal-body {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.modal-dialog {
  max-width: 80%; /* Ajusta el valor según lo necesites */
}

.modal-body img {
  width: 100%;
  height: auto; /* Asegúrate de que la altura de la imagen sea proporcional */
  object-fit: contain; /* Si prefieres que la imagen se ajuste sin cortar */
}

/* Contenedor principal del calendario */
.fc {
  margin: auto;
  background: #ffffff;
  border: 2px solid #dcdcdc;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

/* Estilo para el encabezado del calendario */
.fc-toolbar {
  background: linear-gradient(45deg, #3498db, #5dade2);
  color: white;
  padding: 15px;
  border-bottom: 2px solid #3498db;
  font-size: 1.2rem;
  font-weight: bold;
  text-transform: uppercase;
}

.fc-toolbar-title {
  font-size: 1.5rem;
  font-weight: 600;
}

.fc-button {
  background: #2980b9;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 0.9rem;
  text-transform: uppercase;
  transition: background-color 0.3s ease;
}

.fc-button:hover {
  background: #21618c;
  cursor: pointer;
}

/* Fondo negro y letras blancas para los días de la semana */
.fc-col-header-cell {
  background-color: #000000;
  color: #ffffff;
  font-weight: bold;
  font-size: 1rem;
  text-transform: uppercase;
  padding: 10px;
  border: 1px solid #444; /* Líneas grises entre columnas */
}

/* Días del calendario */
.fc-daygrid-day {
  border: 1px solid #eaeaea;
  transition:
    transform 0.2s ease,
    background-color 0.3s ease;
}

/* Eventos */
.fc .fc-event {
  background-color: darkred;
  color: white;
  font-size: 0.85rem;
  border-radius: 8px;
  padding: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease;
}

/* Texto de días y eventos */
.fc-daygrid-day-number {
  font-weight: bold;
  font-size: 1rem;
}

.fc-title {
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.header__titulos {
  font-family: Oswald, sans-serif;
  background-color: #333333;
  color: whitesmoke;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 10px;
  font-size: 2.1em;
}
.icono__check{
  width: 40px;
  height: 40px;
}
.propiedad__imagenes{
  transition: 0.3s ;
  border: 2px solid #cdc9c9;
  padding: 2px;

}

.propiedad__imagenes:hover{
  transform: scale(1.2);
  border: 2px solid black;
}

</style>

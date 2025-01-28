import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import PropiedadesView from '@/views/PropiedadesView.vue';
import LoginView from '@/views/LoginView.vue';
import RegistroView from '@/views/RegistroView.vue';
import AcercaView from '@/views/AcercaView.vue';
import DashboardView from '@/views/DashboardView.vue';
import PropiedadDetalles from '@/views/PropiedadDetalles.vue';
import UsuariosAdmin from '@/views/UsuariosAdmin.vue';
import PropiedadesAdmin from '@/views/PropiedadesAdmin.vue';
import ComodidadesAdmin from '@/views/ComodidadesAdmin.vue';
import TarifasAdmin from '@/views/TarifasAdmin.vue';
import AddUsuario from '@/views/AddUsuario.vue';
import AddPropiedad from '@/views/AddPropiedad.vue';
import AddTarifa from '@/views/AddTarifa.vue';
import AddComodidad from '@/views/AddComodidad.vue';
import AssignComodidad from '@/views/AssignComodidad.vue';
import ReservasAdmin from '@/views/ReservasAdmin.vue';
import AddReserva from '@/views/AddReserva.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/propiedades',
      name: 'propiedades',
      component: PropiedadesView,
    },
    {
      path: '/acerca',
      name: 'acerca',
      component: AcercaView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/registro',
      name: 'registro',
      component: RegistroView,
    },
    {
      path: '/propiedad/:id',
      name: 'PropiedadDetalles',
      component: PropiedadDetalles,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      children: [
        {
          path: 'usuarios',
          name: 'dashboard-usuarios',
          component: UsuariosAdmin,
        },
        {
          path: 'propiedades',
          name: 'dashboard-propiedades',
          component: PropiedadesAdmin,
        },
        {
          path: 'comodidades',
          name: 'dashboard-comodidades',
          component: ComodidadesAdmin,
        },
        {
          path: 'tarifas',
          name: 'dashboard-tarifas',
          component: TarifasAdmin,
        },
        {
          path: 'addusuario',
          name: 'dashboard-addusuario',
          component: AddUsuario,
        },
        {
          path: 'addpropiedad',
          name: 'dashboard-addpropiedad',
          component: AddPropiedad,
        },
        {
          path: 'addreserva',
          name: 'dashboard-addreserva',
          component: AddReserva,
        },
        {
          path: 'addcomodidad',
          name: 'dashboard-addcomodidad',
          component: AddComodidad,
        },
        {
          path: 'addtarifa/:id',
          name: 'dashboard-addtarifa',
          component: AddTarifa,
        },
        {
          path: 'asigna-comodidad',
          name: 'dashboard-asigna-comodidad',
          component: AssignComodidad,
        },
        {
          path: 'reservas',
          name: 'dashboard-reservas',
          component: ReservasAdmin,
        },
        // Agrega más rutas hijas según sea necesario
      ],
    },
  ],
});

export default router;

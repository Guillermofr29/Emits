<template>
  <div class="card">
    <h1>Registro de usuario</h1>
    <form @submit.prevent="registro" class="form">
      <label for="nombre">Nombre:</label>
      <input v-model="nombre" type="text" id="nombre"/>
      <p v-if="errores.nombre" class="error">{{ errores.nombre }}</p>
      <br />
      <label for="email">Email:</label>
      <input v-model="email" type="text" id="email"/>
      <p v-if="errores.email" class="error">{{ errores.email }}</p>
      <br />
      <label for="contraseña">Contraseña:</label>
      <input v-model="contraseña" type="password" id="contraseña"/>
      <p v-if="errores.contraseña" class="error">{{ errores.contraseña }}</p>
      <br />
      <button type="submit" class="btn">Registrarse</button>
      <button @click="irLogin" class="login">Ir al Login <i class="fas fa-sign-in-alt"></i></button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import UsersData from '@/data/UsersData';

const nombre = ref('');
const email = ref('');
const contraseña = ref('');
const errores = ref({ nombre: '', email: '', contraseña: '' });
const router = useRouter();

const registro = () => {
  errores.value = { nombre: '', email: '', contraseña: '' };

  // Validaciones
  if (!validarEmail(email.value)) {
    errores.value.email = 'Correo electrónico inválido.';
  }

  if (usuarioExiste(email.value)) {
    errores.value.email = 'Ya existe un usuario con este correo.';
  }

  if (!validarNombre(nombre.value)) {
    errores.value.nombre = 'Nombre inválido. Solo se permiten letras.';
  }

  if (contraseña.value.length < 6) {
    errores.value.contraseña = 'La contraseña debe tener al menos 6 caracteres.';
  }

  if (Object.values(errores.value).every(error => error === '')) {
    UsersData.push({ nombre: nombre.value, email: email.value, contraseña: contraseña.value });
    router.push('/login');
  }
};

const irLogin = () => {
  router.push('/login');
};

const validarEmail = (email:string) => {
  // Lógica de validación de correo electrónico básica
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validarNombre = (nombre:string) => {
  // Validar que solo contenga letras
  return /^[a-zA-Z]+$/.test(nombre);
};

const usuarioExiste = (email:string) => {
  return UsersData.some(u => u.email === email);
};
</script>
  

<style scoped>
h1{
  text-align: center;
  color: #4caf50;
}
h1, p, label, input, .btn  {
  font-family: "Roboto", sans-serif;
}
  .card {
    max-width: 400px;
    margin: 200px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .form {
    display: flex;
    flex-direction: column;
  }
  
  input {
    margin-bottom: 10px;
    padding: 8px;
    border: 1px solid #4caf50;
    border-radius: 4px;
  }
  
  .btn {
    padding: 8px 12px;
    background-color: #4caf50;
    margin-bottom: 5px;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn:hover {
    background-color: #45a049;
  }

  .login {
  padding: 8px 12px;
  margin-top: 5px;
  color: #4caf50;
  border: none;
  cursor: pointer;
}

  .error {
  color: #ff0000;
  margin: 0 0 15px 0;
  font-size: 12px;
}

i{
  margin: 0 5px;
}
  </style>
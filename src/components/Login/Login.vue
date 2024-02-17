<template>
  <div class="card">
    <h1>Login</h1>
    <form @submit.prevent="login" class="form">
      <label for="email">Email:</label>
      <input v-model="email" type="text" id="email"/>
      <p v-if="errores.email" class="error">{{ errores.email }}</p>
      <br />
      <label for="contraseña">Contraseña:</label>
      <input v-model="contraseña" type="password" id="contraseña"/>
      <p v-if="errores.contraseña" class="error">{{ errores.contraseña }}</p>
      <br />
      <button type="submit" class="btn">Login <i class="fas fa-sign-in-alt"></i></button>
      <button @click="goToRegister" class="registro">Registrarse</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import UsersData from '@/data/UsersData';

const email = ref('');
const contraseña = ref('');
const errores = ref({ email: '', contraseña: '' });
const router = useRouter();

const login = () => {
  errores.value = { email: '', contraseña: '' };
  const user = UsersData.find(u => u.email === email.value && u.contraseña === contraseña.value);
  if (user) {
    router.push('/crud');
  } else {
    if (!userExists(email.value)) {
      errores.value.email = 'Correo electrónico no registrado.';
    }
    if (userExists(email.value) && contraseña.value !== (UsersData.find(u => u.email === email.value)?.contraseña || '')) {
      errores.value.contraseña = 'Contraseña incorrecta.';
    }
  }
};

const goToRegister = () => {
  router.push('/register');
};

const userExists = (email:string) => {
  return UsersData.some(u => u.email === email);
};
</script>
  
<style scoped>

h1{
  text-align: center;
  color: #4caf50;
}
h1, p, label, .input-field, .btn  {
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

input{
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

.registro {
  padding: 8px 12px;
  margin-top: 5px;
  color: #4caf50;
  border: none;
  cursor: pointer;
}
.btn:hover {
  background-color: #45a049;
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
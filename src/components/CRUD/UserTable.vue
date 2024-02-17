<template>
  <div class="tabla-container">
    <h1>Usuarios <i class="fas fa-users"></i></h1>
    <button @click="salir" class="btn-salir"><i class="fas fa-arrow-left"></i> Salir</button>
    <table class="tabla">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Email</th>
          <th>Contraseña</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="usuario in usuarios" :key="usuario.email">
          <td>{{ usuario.nombre }}</td>
          <td>{{ usuario.email }}</td>
          <td>{{ usuario.contraseña }}</td>
          <td>
            <button @click="editUsuario(usuario)" class="btn-editar"><i class="fas fa-edit"></i></button>
            <button @click="elimUsuario(usuario)" class="btn-eliminar"><i class="fas fa-trash-alt"></i></button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Formulario para agregar/editar usuario -->
    <div v-if="mostrarForm" class="form">
    <h2>{{ editarUsuario ? 'Editar Usuario' : 'Agregar Usuario' }}</h2>
    <form @submit.prevent="guardarUsuario" class="form-contenido">
      <label for="nombre">Nombre:</label>
      <input v-model="formUsuario.nombre" type="text" id="nombre"/>
      <span v-if="errores.nombre" class="msjError">{{ errores.nombre }}</span>
      <br />
      <label for="email">Email:</label>
      <input v-model="formUsuario.email" type="text" id="email"/>
      <span v-if="errores.email" class="msjError">{{ errores.email }}</span>
      <br />
      <label for="contraseña">Contraseña:</label>
      <input v-model="formUsuario.contraseña" type="password" id="contraseña"/>
      <span v-if="errores.contraseña" class="msjError">{{ errores.contraseña }}</span>
      <br />
      <button type="submit" class="btn">
        {{ editarUsuario ? 'Guardar cambios' : 'Agregar Usuario' }}
        <i :class="editarUsuario ? 'fas fa-save' : 'fas fa-user-plus'"></i>
      </button>

      <button @click="cancelarEditar" type="button" class="btn-cancelar">Cancelar</button>
    </form>
  </div>

    <button @click="showAddForm" class="btn-agregar"><i class="fas fa-plus"></i> Agregar Usuario </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import UsersData from '@/data/UsersData';

const router = useRouter();
const usuarios = ref(UsersData);
const mostrarForm = ref(false);
const editarUsuario = ref(null);
const formUsuario = ref({ nombre: '', email: '', contraseña: '' });
const errores = ref({ nombre: '', email: '', contraseña: '' });
const limpiarErrores = () => {errores.value = { nombre: '', email: '', contraseña: '' };};

const salir = () => {
  router.push('/login');
};

const editUsuario = (usuario) => {
  editarUsuario.value = usuario;
  formUsuario.value = { ...usuario };
  mostrarForm.value = true;
  limpiarErrores();
};

const elimUsuario = (usuario) => {
  const confirmar = window.confirm(`¿Seguro que desea eliminar al usuario: ${usuario.nombre}?`);
  if (confirmar) {
    usuarios.value = usuarios.value.filter(u => u.email !== usuario.email);
  }
};

const showAddForm = () => {
  editarUsuario.value = null;
  formUsuario.value = { nombre: '', email: '', contraseña: '' };
  mostrarForm.value = true;
  limpiarErrores();
};

const guardarUsuario = () => {
  errores.value = { nombre: '', email: '', contraseña: '' };

  if (!formUsuario.value.nombre.match(/^[a-zA-Z\s]+$/)) {
    errores.value.nombre = 'El nombre solo puede contener letras.';
  }

  if (!formUsuario.value.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    errores.value.email = 'Correo electrónico inválido.';
  }

  if (!editarUsuario.value && usuarios.value.some(u => u.email === formUsuario.value.email)) {
    errores.value.email = 'Este correo ya está registrado por otro usuario.';
  }

  if (editarUsuario.value && formUsuario.value.email !== editarUsuario.value.email && usuarios.value.some(u => u.email === formUsuario.value.email)) {
    errores.value.email = 'Este correo ya está registrado por otro usuario.';
  }

  if (formUsuario.value.contraseña.length < 6) {
    errores.value.contraseña = 'La contraseña debe tener al menos 6 caracteres.';
  }

  if (Object.values(errores.value).some(error => error !== '')) {
    return;
  }

  if (editarUsuario.value) {
    // Editar usuario existente
    const index = usuarios.value.findIndex(u => u.email === editarUsuario.value.email);
    usuarios.value.splice(index, 1, formUsuario.value);
  } else {
    // Agregar nuevo usuario
    usuarios.value.push(formUsuario.value);
  }

  mostrarForm.value = false;
};

const cancelarEditar = () => {
  mostrarForm.value = false;
};


</script>

<style scoped>
h1, h2{
  text-align: center;
  color: #4caf50;
}
h1, h2, p, label,span, input, .btn  {
  font-family: "Roboto", sans-serif;
}
.tabla-container {
  max-width: 800px;
  margin: 200px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
  
.tabla {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
  
th, td {
  border: 1px solid #ddd;
  font-family: "Roboto", sans-serif;
  padding: 8px;
  text-align: left;
}
  
th {
  background-color: #4caf50;
  color: white;
}
  
tr:hover {
  background-color: #f5f5f5;
}

.btn-salir {
  padding: 8px 12px;
  background-color: #ff0000;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-salir:hover {
  background-color: #cc0000;
}

i{
  margin: 0 5px;
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

.btn-editar,.btn-eliminar {
  margin-right: 5px;
  padding: 6px 10px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-eliminar {
  background-color: #f44336;
}

.btn-eliminar:hover {
  background-color: #da190b;
}

.btn-editar {
  background-color: #2196F3;
}

.btn-editar:hover {
  background-color: #0b7dda;
}

.btn-agregar {
  margin-top: 10px;
  padding: 8px 12px;
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-agregar:hover {
  background-color: #0b7dda;
}

.form {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.btn-cancelar {
  margin-left: 5px;
  padding: 8px 12px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-cancelar:hover {
  background-color: #da190b;
}

.form-contenido {
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: 0 auto;
}

.form-contenido label {
  margin-bottom: 5px;
}

.form-contenido input {
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #4caf50;
  border-radius: 4px;
}

.form-contenido button {
  margin-top: 10px;
}

.msjError {
  color: #f44336;
  font-size: 12px;
  margin: 0 0 15px 0;
}

</style>

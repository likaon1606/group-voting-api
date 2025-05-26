# Group Voting API

API REST para gestionar grupos de usuarios y permitir votaciones sobre diferentes opciones (stacks, librerías, temas, etc.).

---

## Tecnologías

- Node.js
- Express
- MongoDB con Mongoose
- JWT para autenticación
- OpenAPI (Swagger) para documentación

---

## Funcionalidades

- Registro y login de usuarios (con roles `user` y `admin`)
- Creación de grupos (solo admin)
- Agregar miembros a grupos (solo admin)
- Votación dentro de grupos con opciones limitadas (`Node.js`, `Django`, `Laravel`)
- Restricción de un voto por usuario por grupo
- Consulta de votos y resultados

---

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/tu-usuario/group-voting-api.git
cd group-voting-api
```
2. Instalar dependencias:
`npm install`

3. Crear archivo .env con variables de entorno, por ejemplo:
```sh
PORT=3000
MONGODB_URI=mongodb://localhost:27017/groupVotingDB
JWT_SECRET=tu_secreto_jwt
```

4. Ejecutar el servidor:
`npm run dev 'desarrollo' / npm start 'producción'`

## Uso

### Registro

***POST /api/auth/register***
```json
{
  "username": "usuario",
  "email": "usuario@example.com",
  "password": "123456"
}
```
- El primer usuario puede tener rol admin si se le asigna explícitamente.

# Login

***POST /api/auth/login***
```json
{
  "email": "usuario@example.com",
  "password": "123456"
}
```
### Respuesta:
```json
{
  "token": "jwt_token_aqui"
}
```

# Crear grupo (solo admin)

***POST /api/groups***
- Authorization: Bearer <token>

```json
{
  "name": "Equipo Front End",
  "description": "Elegir el Stack para el proyecto"
}
```

# Agregar miembro a grupo (solo admin)

***POST /api/groups/{groupId}/addMembers***
- Authorization: Bearer <token>
```
{
  "userId": "id_del_usuario"
}
```

# Votar en un grupo

***POST /api/votes***
- Authorization: Bearer <token>
```json
{
  "groupId": "id_del_grupo",
  "option": "Laravel"
}
```
- Solo se puede votar por: "Node.js", "Django" o "Laravel".

# Obtener votos de un grupo

***GET /api/votes/{groupId}***
- Authorization: Bearer <token>

# Obtener resultados de votación

***GET /api/votes/results/{groupId}***
- Authorization: Bearer <token>

---
# Documentación API
- La documentación completa con Swagger está disponible en:

### http://localhost:3000/api-docs

---
# Notas
- Solo un usuario puede tener el rol admin.

- Un usuario solo puede votar una vez por grupo.

- Opciones válidas para votar: Node.js, Django, Laravel.

Licencia
Este proyecto está registrado en derechos de Autor México.

Desarrollado por [Ariel Fuentes García]

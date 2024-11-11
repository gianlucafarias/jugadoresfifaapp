# FIFA Stats - Players Management API :soccer:

Este proyecto permite la gestión de jugadores del juego FIFA, proporcionando funcionalidades para crear, editar y visualizar jugadores, además de manejar la autenticación. Incluye la importación inicial de datos desde un archivo SQL en una base de datos MySQL y la posibilidad de exportar los datos de jugadores a un archivo CSV.

## Características

- CRUD completo de jugadores.
- Frontend con paginación y filtros de búsqueda.
- Sistema de autenticación JWT.
- Organización de estadísticas en categorías.
- Importación de datos iniciales desde un archivo SQL.

## Requisitos Previos
Asegúrate de tener instalado lo siguiente:

- Node.js
- Angular CLI
- MySQL
- Docker (opcional)

# Instalación

## Backend

Clona el repositorio:
```
git clone https://github.com/gianlucafarias/jugadoresfifaapp.git
cd backend
```

Instala las dependencias:
```
npm install
```

Configura las variables de entorno: 

Crea un archivo .env basado en el .env.example con los valores correspondientes

Inicia el servidor:
```
npm start
```

## Frontend

Ve al directorio del frontend:
```
cd frontend
```

Instala las dependencias:

```
npm install
```

Inicia la aplicación Angular:

```
ng serve
```

La aplicación estará disponible en `http://localhost:4200.`

# Importación de Datos

Inicia tu servidor MySQL.

Importa el archivo SQL proporcionado (fifa_male_players.sql o fifa_female_players.sql) para cargar los datos iniciales de jugadores:
```
mysql -u your_user -p your_database < path/to/players.sql
```

Asegúrate de que los datos se han cargado correctamente ejecutando una consulta:
```
SELECT * FROM players;
```

# Uso

### Crear un nuevo jugador

Ve a la sección "Nuevo Jugador" en la aplicación.
Rellena los datos requeridos y envía el formulario.

### Editar un jugador

Desde la lista de jugadores, selecciona uno para editar.
Actualiza los datos y guarda los cambios.

### Ver un jugador

Navega por la lista de jugadores y selecciona uno para ver sus detalles.

### Endpoints API

## Autenticación

POST /users/login: Iniciar sesión.
POST /users/signup: Registrar un nuevo usuario.

## Jugadores

`GET /players:` Obtener todos los jugadores.

`GET /players/:id:` Obtener un jugador por ID.

`POST /players/` Crear un nuevo jugador.

`PUT /players/:id:` Actualizar un jugador.

`DELETE /players/:id:` Eliminar un jugador.


# Contribuciones

¡Contribuciones son bienvenidas! Por favor, abre un issue o un pull request.

# Licencia

Este proyecto está bajo la Licencia MIT.
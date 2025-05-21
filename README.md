# Gestor de Tareas (Full Stack)

Proyecto de gestor de tareas con autenticación JWT utilizando:

- **Backend**: Django + Django REST Framework
- **Frontend**: React.js

---

## 🔒 Autenticación

Se utiliza **JWT** (JSON Web Tokens).

- Registro: `POST /api/register/`
- Login: `POST /api/token/`
- Refresh: `POST /api/token/refresh/`

---

## 📅 Endpoints principales

- `GET /tasks/tasks/` - Listar tareas del usuario autenticado
- `POST /tasks/tasks/` - Crear tarea (asigna automáticamente el usuario)
- `GET /tasks/tasks/<id>/` - Ver tarea
- `PUT /tasks/tasks/<id>/` - Actualizar
- `DELETE /tasks/tasks/<id>/` - Eliminar

---

## 💡 Características destacadas

- Autenticación protegida con `PrivateRoute` en el frontend
- Al loguearse redirige al dashboard
- Tareas separadas por usuario
- Swagger disponible en `/swagger/` para probar la API

---

## 🚀 Instalación y ejecución

### Clonar el repositorio

```bash
git clone https://github.com/usuario/gestor-tareas.git
cd gestor-tareas
```

### 2. Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # o venv\Scripts\activate en Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### 3. Frontend

```bash
cd frontend
npm install
npm start
```

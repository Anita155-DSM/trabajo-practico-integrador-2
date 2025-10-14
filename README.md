JUSTIFICACIÓN DEL TRABAJO PRÁCTICO INTEGRADOR 2: Sistema de Gestión de Blog Personal con MongoDB y Mongoose

1. Relación Usuario-Perfil (1:1) - EMBEBIDO

Se eligió embeber el perfil dentro del modelo de usuario.
Las razones son: una sola consulta obtiene toda la información del usuario, los datos del perfil siempre están sincronizados con el usuario. No vi necesario usar otro modelo en este caso porque es más eficiente en cuanto a cnsultas utilizar un embebido.

2. Relación Usuario-Artículos (1:N) - REF

Se eligió referenciar el autor en cada artículo, este caso lo utilicé porque: un usuario puede tener muchos artículos sin afectar el tamaño del documento usuario, y asi permite obtener artículos independientemente del usuario. aca usamos populate() para obtener datos del autor.

3. Relación Artículo-Tags (N:M) - REF

Se implementó mediante un array de referencias de tags en el modelo artículo. Los tags pueden ser reutilizados en múltiples artículos y asi tambien permite crear tantos tags como sea necesario, haciendo mas fácil agregar/quitar tags de artículos

4. Relación Artículo-Comentarios (1:N) - POPULATE REVERSO(el virtual)

Se utilizó populate reverso (virtual) para obtener comentarios de un artículo. Los artículos pueden tener muchos comentarios sin afectar su tamaño y tambien permite consultas independientes de comentarios, esto hace fácil la implementación para eliminar comentarios cuando se elimina un artículo y obtiene comentarios sin duplicar datos


Estructura del Proyecto

proyecto/
├── src/
│   ├── config/
│   │   └── database.js         
│   ├── controllers/             
│   │   ├── auth.controllers.js
│   │   ├── user.controllers.js
│   │   ├── article.controllers.js
│   │   ├── comment.controllers.js
│   │   ├── tag.controllers.js
│   │   └── articleTags.controllers.js
│   ├── middlewares/            
│   │   ├── auth.middleware.js
│   │   ├── authAdmin.middleware.js
│   │   ├── authOwner.middleware.js
│   │   ├── validator.js
│   │   └── validations/
│   ├── models/                 
│   │   ├── user.models.js
│   │   ├── article.models.js
│   │   ├── comment.models.js
│   │   └── tag.models.js
│   ├── routes/                 
│   │   └── *.routes.js
│   └── helpers/              
│       ├── bcrypt.helpers.js
│       └── jwt.helpers.js
├── app.js                     
├── package.json
└── .env                        

Características de validaciones:

1. **Validaciones Síncronas y Asíncronas**: Incluye validaciones que consultan la base de datos
2. **Validaciones de Autorización**: Verifica gti permisos según el rol del usuario
3. **Validaciones de Integridad**: Verifica que las referencias existan antes de crear relaciones
4. **Mensajes de Error Personalizados**: Cada validación tiene mensajes descriptivos en español
5. **Validaciones Opcionales**: Algunos campos como biography y avatarUrl son opcionales
6. **Validaciones de Longitud**: Controla la longitud mínima y máxima de los campos
7. **Validaciones de Tipo**: Verifica ObjectIds válidos de MongoDB

Tipos de Validaciones Implementadas (validator):

- Presencia: `notEmpty()`, `required`
- Longitud: `isLength({ min, max })`
- Formato: `isEmail()`, `isURL()`, `isDate()`, `matches(regex)`
- Valores Permitidos: `isIn(array)`
- Validaciones Personalizadas: `custom(function)`
- Validaciones Condicionales: Basadas en rol de usuario
- Validaciones de Base de Datos: Verificación de existencia de recursos

Estas validaciones aseguran la integridad de los datos, mejoran la seguridad de la aplicación y proporcionan una experiencia de usuario clara con mensajes de error descriptivos.
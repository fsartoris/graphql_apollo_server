# Backend: Apollo, GraphQL & Mongo 

Arme este backend para probar la funcionalidad de GraphQL y Mongo porque me parecio interesante como una opcion alternativa a los back tradicionales.

## Tech Stack

- BD Mongo (usando mongoose como ORM) - Podria usarse cualquier otra orientada a documentos. 
- Apollo Server para soportar GraphQL (Schema (definicion), Resolvers (query, mutation)
- JWT para usarlo con el front

## Como funciona? 

### Mongo
Los modelos se definen dentro de la carpeta Models. En este caso son tres: Usuario, Reclamo y Tipo de Reclamo. Utiliza Mongoose como ORM.

### Apollo Server:

Permite generar el GraphQL server que accede a la base de datos. Dentro de la carpeta db se encuentran los dos archivos que se usan para definir/acceder a los datos: Dentro de schema.js se definen: Types (estructuras de datos), Query (acceso a los datos y el tipado), Mutation (operaciones). En el archivo resolvers.js esta separado en dos: Query y Mutations. Aca se implementan lo definido en el Schema y se interactua con la Base de Datos. 

### JWT Json Web Token:

Utiliza la libreria de jsonwebtoken para generar el token para acceso a los datos desde el front. 

### Instalacion

Con base de datos de Mongo configurada (podes usar MongoDB Atlas) ejecutar npm run dev. 

### Todos

 - Muchas mejoras, es algo experimental.

License
----

MIT
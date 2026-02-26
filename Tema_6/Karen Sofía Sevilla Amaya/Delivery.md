
Diseña una API REST para una plataforma de delivery de comida. La API debe gestionar la interacción entre usuarios, restaurantes y el sistema de pagos, permitiendo un flujo eficiente desde la búsqueda de restaurantes hasta la confirmación del pedido.

Funcionalidades para Usuarios
Exploración de restaurantes y menús: Permitir la búsqueda de restaurantes por ubicación, tipo de cocina y otros filtros que consideres apropiados; visualizar menús con información detallada de cada plato. Los menus están asociados siempre a un restaurante. No se concibe, a nivel API, la consulta de un menú fuera de la consulta de un restaurante.
Realización de pedidos: Facilitar la creación de pedidos seleccionando platos del menú de un restaurante.
Gestión de pedidos: Permitir la cancelación o modificación de pedidos antes de su preparación o confirmación.
Seguimiento de pedidos: Proveer un sistema de seguimiento en tiempo real del estado del pedido.
Registro de pagos: Integrar la funcionalidad para registrar y gestionar el pago de los pedidos realizados.

Funcionalidades para Restaurantes
Gestión de menú: Permitir a los restaurantes añadir, modificar y eliminar platos de su menú.
Control de disponibilidad: Actualizar el estado de cada plato (disponible o agotado) en función del stock y la demanda.
Administración de pedidos: Confirmar, preparar y actualizar el estado de los pedidos recibidos a través de la plataforma.

Recursos identificados:
Usuarios, pedidos, pagos y restaurantes

---

## Funcionalidades EndPoints para Usuarios

### Buscar restaurantes y menús
| Método HTTP | Endpoint | Descripción | Ejemplo de cuerpo JSON | Respuestas posibles |
|-------------|----------|-------------|------------------------|---------------------|
| GET | /restaurants | Listar restaurantes por filtros (ubicación, tipo de cocina, etc.) | N/A | 200 OK (lista de restaurantes), 400 Bad Request |
| GET | /restaurants/{restaurantId}/menus | Listar menú de un restaurante | N/A | 200 OK (lista de platos), 404 Not Found |

---

### Realizar pedidos
| Método HTTP | Endpoint | Descripción | Ejemplo de cuerpo JSON | Respuestas posibles |
|-------------|----------|-------------|------------------------|---------------------|
| POST | /orders | Crear un nuevo pedido | ```json { "userId": "123", "restaurantId": "456", "items": [ { "dishId": "789", "quantity": 2 }, { "dishId": "790", "quantity": 1 } ], "notes": "Sin cebolla en la hamburguesa" } ``` | 201 Created (pedido creado), 400 Bad Request, 401 Unauthorized |

---

### Gestionar  pedidos
| Método HTTP | Endpoint | Descripción | Ejemplo de cuerpo JSON | Respuestas posibles |
|-------------|----------|-------------|------------------------|---------------------|
| PUT | /orders/{orderId} | Modificar pedido (si no está confirmado) | ```json { "items": [ { "dishId": "789", "quantity": 3 } ] } ``` | 200 OK (pedido actualizado), 400 Bad Request, 404 Not Found |
| DELETE | /orders/{orderId} | Cancelar pedido | N/A | 200 OK (pedido cancelado), 404 Not Found |

---

### Seguimiento de pedidos
| Método HTTP | Endpoint | Descripción | Ejemplo de cuerpo JSON | Respuestas posibles |
|-------------|----------|-------------|------------------------|---------------------|
| GET | /orders/{orderId} | Consultar estado del pedido | N/A | 200 OK (estado: pendiente, confirmado, en proceso, enviado, entregado, cancelled), 404 Not Found |

---

### Registro de pagos
| Método HTTP | Endpoint | Descripción | Ejemplo de cuerpo JSON | Respuestas posibles |
|-------------|----------|-------------|------------------------|---------------------|
| POST | /pagos | Registrar pago de un pedido | ```json { "orderId": "123", "paymentMethod": "credit_card", "amount": 25.50 } ``` | 201 Created (pago registrado), 400 Bad Request, 402 Payment Required |

---

##  Funcionalidades EndPoints para Restaurantes

### Gestionar  menú restaurante
| Método HTTP | Endpoint | Descripción | Ejemplo de cuerpo JSON | Respuestas posibles |
|-------------|----------|-------------|------------------------|---------------------|
| POST | /restaurants/{restaurantId}/menus| Añadir nuevo plato | ```json { "name": "Pizza Margarita", "price": 12.50, "available": true } ``` | 201 Created, 400 Bad Request |
| PUT | /restaurants/{restaurantId}/menus/{dishId} | Modificar plato | ```json { "price": 13.00 } ``` | 200 OK, 404 Not Found |
| DELETE | /restaurants/{restaurantId}/menus/{dishId} | Eliminar plato | N/A | 200 OK, 404 Not Found |

---

### Control de disponibilidad
| Método HTTP | Endpoint | Descripción | Ejemplo de cuerpo JSON | Respuestas posibles |
|-------------|----------|-------------|------------------------|---------------------|
| PATCH | /restaurants/{restaurantId}/menus/{dishId} | Actualizar los datos del menu | ```json { "Disponible": false } ``` | 200 OK, 404 Not Found |

---

### Administración de pedidos
| Método HTTP | Endpoint | Descripción | Ejemplo de cuerpo JSON | Respuestas posibles |
|-------------|----------|-------------|------------------------|---------------------|
| GET | /restaurants/{restaurantId}/orders | Listar pedidos recibidos | N/A | 200 OK (lista de pedidos) |
| PATCH | /restaurants/{restaurantId}/orders/{orderId} | Actualizar los datos de un pedido | ```json { "status": "Confirmado" } ``` | 200 OK, 404 Not Found |

---

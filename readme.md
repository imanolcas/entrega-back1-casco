# E-Commerce

Este es un e-commerce como entrega para CoderHouse


Con implementacion de mongoDB y mongoose





## API Reference

#### para obtener todos los productos en una vista se utiliza 

```http
   http://localhost:8080/
```

#### Para poder registrarse y crear un usuario

```http
  http://localhost:8080/users/register
```

#### Para poder entrar con tu usuario y en el localStorage aparezcas como online

```http
  http://localhost:8080/users/login
```

#### Para poder ver todos los productos y poder crear, actulizar y eliminar esos productos

```http
  http://localhost:8080/products/admin
```


#### Para poder ver la informacion de un usuario

```http
  http://localhost:8080/users/:uid
```

#### Para poder ver la informacion de un carrito como vista donde se puede eliminar el mismo

User_id de ejemplo
671bf25e63ef9bc9f2c19392

```http
  http://localhost:8080/cart/:uid
``` 

#### Para poder ver todos los carritos

```http
  localhost:8008/api/carts
``` 

####En postman para poder crear un carrito

```http
  localhost:8008/api/carts/
``` 


## Authors

- [@imanolcas](https://github.com/imanolcas)


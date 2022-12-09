# Proyecto que nos hará millonarios 🥵💵

## Para levantar

1. Copiar variables de entorno

```bash
cp .env.example .env
```

2. Crear imagen de docker y contenedor

```bash
docker build -t mvp-ia . && 
docker run -p 3000:3000 --rm \
-d -v $(pwd)/src:/app/src    \
--name mvp-ia-frontend mvp-ia
```

*Nota: Tal vez no funcione en Windows el file-watching*

3. Acceder a http://localhost:3000/

## TODO

Utilizar `docker-compose`

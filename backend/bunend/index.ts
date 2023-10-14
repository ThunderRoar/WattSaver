// https://dev.to/sadeedpv/build-an-http-server-in-bun-4k8l
import { Elysia } from 'elysia'

const app = new Elysia();
app.get('/', () => "Hello World!");
app.listen(Number(Bun.env.PORT));
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

app.post(
  "/query",
  ({ body }:any) => {
    const message = body?.message;
    console.log(message);
    return new Response(JSON.stringify({ message: "Added" }), {
      headers: { "Content-Type": "application/json" },
    });
  });

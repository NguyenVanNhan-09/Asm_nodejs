import jsonServer from "json-server";
import auth from "json-server-auth";

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// /!\ Bind the router db to the app
server.db = router.db;

// You must apply the auth middleware before the router
server.use(middlewares);
server.use(auth);
server.use(router);

const port = process.env.PORT || 3000;
server.listen(port, () => {
   console.log(`JSON Server is running on port ${port}`);
});

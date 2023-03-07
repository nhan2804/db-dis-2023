import appRoutes from "@modules/apps/routes";
import authRoute from "@modules/auth/routes";
import depRoutes from "@modules/departments/routes";

const routes = [...authRoute, ...appRoutes, ...depRoutes];
export default routes;

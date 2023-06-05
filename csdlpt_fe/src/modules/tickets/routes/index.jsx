import { lazy } from "react";
import MyTicket from "../pages/MyTicket";
const TicketHome = lazy(() => import("../pages"));
const ticketRoutes = [
  {
    component: TicketHome,
    path: "tickets",
    exact: true,
  },
  {
    component: MyTicket,
    path: "tickets/my",
    exact: true,
  },
];
export default ticketRoutes;

import { Router } from "express";
import appUser from "./routes/users.js";
import appReportIncidents from "./routes/report_incidents.js";
import appZones from "./routes/zones.js";
import appInventory from "./routes/inventory.js";
import appLogin from "./routes/login.js";

const RoutesV1 = Router();

RoutesV1.use("/login", appLogin);
RoutesV1.use("/users", appUser);
RoutesV1.use("/incidents", appReportIncidents);
RoutesV1.use("/zones", appZones);
RoutesV1.use("/inventory", appInventory);

export default RoutesV1
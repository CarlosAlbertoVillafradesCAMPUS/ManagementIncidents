import { Router } from "express";
import appUser from "./routes/users.js";
import appReportIncidents from "./routes/report_incidents.js";
import appZones from "./routes/zones.js";

const RoutesV1 = Router();

RoutesV1.use("/users", appUser);
RoutesV1.use("/incidents", appReportIncidents);
RoutesV1.use("/zones", appZones);

export default RoutesV1
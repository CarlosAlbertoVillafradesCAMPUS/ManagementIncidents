import { Router } from "express";
import appUser from "./routes/users.js";
import appReportIncidents from "./routes/report_incidents.js";

const RoutesV1 = Router();

RoutesV1.use("/users", appUser);
RoutesV1.use("/incidents", appReportIncidents);

export default RoutesV1
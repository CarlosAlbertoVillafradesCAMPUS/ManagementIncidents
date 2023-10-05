import { Router } from "express";
import appUser from "./routes/users.js";
import appReportIncidents from "./routes/report_incidents.js";
import appZones from "./routes/zones.js";
import appInventory from "./routes/inventory.js";
import appLogin from "./routes/login.js";
import {limitLogin, limitPeticiones} from "../../helpers/limit_request.js"

const RoutesV1 = Router();

RoutesV1.use("/login", limitLogin(), appLogin);
RoutesV1.use("/users", limitPeticiones(), appUser);
RoutesV1.use("/incidents", limitPeticiones(), appReportIncidents);
RoutesV1.use("/zones", limitPeticiones(), appZones);
RoutesV1.use("/inventory", limitPeticiones(), appInventory);

export default RoutesV1
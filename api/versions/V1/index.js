import { Router } from "express";
import appUser from "./routes/users.js";

const RoutesV1 = Router();

RoutesV1.use("/users", appUser)

export default RoutesV1
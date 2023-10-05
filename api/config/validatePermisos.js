export const validatePermisos = (requiredPermission) => async (req, res, next) => {
      const permisos = req.data.payload.Permission;
    
      if (!permisos.includes("*")) {
        if (!permisos.includes(requiredPermission)){
          return res.status(401).send({status:401, message:"You are Not Authorized to access."});}
      }
      next();
    };

    //falta colocar la validacion de permisos en las rutas
export const validatePermisos = (requiredPermission) => async (req, res, next) => {
      const permisos = req.data.payload.Permission;
    
      if (!permisos.includes("*")) {
        if (!permisos.includes(requiredPermission)){
          return res.status(401).send({status:401, message:"No tienes permiso para acceder"});}
          else{
              next()
          }
      }
      next();
    };

    //falta colocar la validacion de permisos en las rutas
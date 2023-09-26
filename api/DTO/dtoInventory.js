import { check } from "express-validator";

export const validateInventoryBody = [
    check("Zone_id")
    .notEmpty().withMessage("The 'Zone_id' parameter is required.")
    .isInt().withMessage("The 'Zone_id' parameter must be an 'Int'"),

    check("Object")
    .notEmpty().withMessage("The 'Object' parameter is required.")
    .isObject().withMessage("The 'Object' property must be an 'Object'"),

    check("Object.Name_Object")
    .notEmpty().withMessage("The 'Object.Name_Object' parameter is required.")
    .isString().withMessage("The 'Object.Name_Object' parameter must be an 'String'")
    .isLength(3, 50).withMessage("The 'Object.Name_Object' parameter cannot be longer than [50 characters].")
    .matches(/^[a-zA-Z\s]+$/).withMessage("The 'Object.Name_Object' parameter only allows letters."),

    check("Object.Parts")
    .optional()
    .isObject().withMessage("The 'Object' property must be an 'Object'"),

    check("Object.Parts.Mouse")
    .optional()
    .isInt().withMessage("The 'Object.Parts.Mouse' parameter must be an 'Int'"),

    check("Object.Parts.Keyboard")
    .optional()
    .isInt().withMessage("The 'Object.Parts.Keyboard' parameter must be an 'Int'"),

    check("Object.Parts.Monitor")
    .optional()
    .isInt().withMessage("The 'Object.Parts.Monitor' parameter must be an 'Int'"),

];

export const validateInventoryParams = [
    check("zoneId")
    .optional()
    .isInt().withMessage("The URL parameter 'zoneId' must be an Int"),

    check("id")
    .optional()
    .isInt().withMessage("The URL parameter 'id' must be an Int"),
]

// {
//     "Zone_id": 3,
//     "Object": {
//       "Name_Object": "Computer",
//       "Parts": {
//         "Mouse": 6,
//         "Keyboard": 7,
//         "Monitor": 8
//       }
//     }
//   }
import { check } from "express-validator";

export const validateIncidentsBody = [
    check("Incident_Type")
        .notEmpty().withMessage("The 'Incident_Type' parameter is required.")
        .custom((value) => {
            if (!value) {
                return true;
            }

            if (!["Material", "Digital"].includes(value)) {
                throw new Error("The URL parameter 'Incident_Type'  must be one of the following values:[Material, Digital]");
            }

            return true;
        }),

    check("Inventory_id")
        .optional()
        .notEmpty().withMessage("The 'Inventory_id' parameter is required.")
        .isInt().withMessage("The 'Inventory_id' parameter must be an 'Int'"),

    check("Zone_id")
        .notEmpty().withMessage("The 'Zone_id' parameter is required.")
        .isInt().withMessage("The 'Zone_id' parameter must be an 'Int'"),

    check("Description")
        .notEmpty().withMessage("The 'Description' parameter is required.")
        .isString().withMessage("The 'Description' parameter must be an 'String'")
        .isLength(1, 500).withMessage("The 'Description' parameter cannot be longer than [500 characters]."),

    check("By_Camper")
        .notEmpty().withMessage("The 'By_Camper' parameter is required.")
        .isObject().withMessage("The 'By_Camper' property must be an 'Object'"),

    check("By_Camper.Nit")
        .notEmpty().withMessage("The 'By_Camper.Nit' parameter is required.")
        .isInt().withMessage("The 'By_Camper.Nit' parameter must be an 'Int'"),

    check("By_Camper.Nickname")
        .notEmpty().withMessage("The 'By_Camper.Nickname' parameter is required.")
        .isString().withMessage("The 'By_Camper.Nickname' parameter must be an 'String'")
        .isLength(3, 40).withMessage("The 'By_Camper.Nickname' parameter cannot be longer than [40 characters].")
        .matches(/^[a-zA-Z\s]+$/).withMessage("The 'By_Camper.Nickname' parameter only allows letters."),

    check("Severity")
        .optional()
        .custom((value) => {
            if (!value) {
                return true;
            }

            if (!["Minor", "Moderate", "Severe"].includes(value)) {
                throw new Error("The URL parameter 'Severity'  must be one of the following values:[Minor, Moderate, Severe]");
            }
            return true;
        }),

    check("By_Trainer")
        .optional()
        .isObject().withMessage("The 'By_Trainer' property must be an 'Object'"),

    check("By_Trainer.Nit")
        .optional()
        .isInt().withMessage("The 'By_Trainer.Nit' parameter must be an 'Int'"),

    check("By_Trainer.Nickname")
        .optional()
        .isString().withMessage("The 'By_Trainer.Nickname' parameter must be an 'String'")
        .isLength(3, 40).withMessage("The 'By_Trainer.Nickname' parameter cannot be longer than [40 characters].")
        .matches(/^[a-zA-Z\s]+$/).withMessage("The 'By_Trainer.Nickname' parameter only allows letters."),

    check("Support_Person")
        .optional()
        .isObject().withMessage("The 'Support_Person' property must be an 'Object'"),

    check("Support_Person.Nit")
        .optional()
        .isInt().withMessage("The 'Support_Person.Nit' parameter must be an 'Int'"),

    check("Support_Person.Nickname")
        .optional()
        .isString().withMessage("The 'Support_Person.Nickname' parameter must be an 'String'")
        .isLength(3, 40).withMessage("The 'Support_Person.Nickname' parameter cannot be longer than [40 characters].")
        .matches(/^[a-zA-Z\s]+$/).withMessage("The 'Support_Person.Nickname' parameter only allows letters."),
];

export const validateIncidentsParams = [
    check("status")
        .optional()
        .custom((value) => {
            if (!value) {
                return true;
            }

            if (!["Pending", "Assigned", "Solved"].includes(value)) {
                throw new Error("The URL parameter 'status'  must be one of the following values:[Pending, Assigned, Solved]");
            }
            return true;
        }),

    check("rol")
        .optional()
        .custom((value) => {
            if (!value) {
            return true;
            }
        
            if (!['Admin', 'Trainer', 'Camper', 'Support'].includes(value)) {
            throw new Error("The URL parameter 'rol' must be one of the following values:[Admin,Trainer,Camper,Support]");
            }
            return true;
        }),

    check("nit")
        .optional()
        .isInt().withMessage("The URL parameter 'nit' must be an Int"),

    check("nameArea")
        .optional()
        .custom((value) => {
            if (!value) {
            return true;
            }
            if (!["Training", "Review", "Hunters", "Cafeteria", "Auditorium"].includes(value)) {
            throw new Error("The URL parameter 'nameArea' must be one of the following values:[Training, Review, Hunters, Cafeteria, Auditorium]");
            }
            return true;
        }),

    check("nameClassroom")
        .optional()
        .isString().withMessage("The 'nameClassroom' parameter must be an 'String'")
        .isLength(3, 30).withMessage("The 'nameClassroom' parameter cannot be longer than [30 characters].")
        .matches(/^[a-zA-Z\s]+$/).withMessage("The 'nameClassroom' parameter only allows letters."),

    check("supportNit")
        .optional()
        .isInt().withMessage("The URL parameter 'supportNit' must be an Int"),
]

// {
//     "Incident_Type": "Material",
//     "Inventory_id": 1,
//     "Zone_id": 3,
//     "Description": "The mouse is not working",
//     "By_Camper": {
//       "Nit": 1004344958,
//       "Full_Name": "John Doe"
//     }
// }
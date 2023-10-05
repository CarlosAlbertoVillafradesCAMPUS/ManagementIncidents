import { check } from "express-validator";

export const validateZonesBody = [
    check("Area")
    .notEmpty().withMessage("The 'Area' parameter is required.")
    .custom((value) => {
        if (!value) {
          return true;
        }
      
        if (!["Training", "Review", "Hunters", "Cafeteria", "Auditorium"].includes(value)) {
          throw new Error("The 'Area' parameter must be one of the following values:[Training, Review, Hunters, Cafeteria,Auditorium]");
        }
      
        return true;
      }),

    check("Classroom")
    .notEmpty().withMessage("The 'Classroom' parameter is required.")
    .isString().withMessage("The 'Classroom' parameter must be an 'String'")
    .isLength(3, 30).withMessage("The 'Classroom' parameter cannot be longer than [30 characters].")
    .matches(/^[a-zA-Z\s]+$/).withMessage("The 'Classroom' parameter only allows letters."),
];

export const validateZonesParams = [
    check("id")
    .optional()
    .isInt().withMessage("The URL parameter 'id' must be an Int"),

    check("nameArea")
    .optional()
    .custom((value) => {
        if (!value) {
          return true;
        }
      
        if (!["Training", "Review", "Hunters", "Cafeteria", "Auditorium"].includes(value)) {
          throw new Error("The URL parameter 'nameArea'  must be one of the following values:[Training, Review, Hunters, Cafeteria,Auditorium]");
        }
      
        return true;
      }),
]

// {
//     "Area": "Training",
//     "Classroom": "Ingles"

// }
import { check } from "express-validator";

export const validateUsersBody = [
    check("Nit")
    .notEmpty().withMessage("The 'Nit' parameter is required.")
    .isInt().withMessage("The 'Nit' parameter must be an 'Int'"),

    check("Full_Name")
    .notEmpty().withMessage("The 'Full_Name' parameter is required.")
    .isString().withMessage("The 'Full_Name' parameter must be an 'String'")
    .isLength(3, 70).withMessage("The 'Full_Name' parameter cannot be longer than [70 characters].")
    .matches(/^[a-zA-Z\s]+$/).withMessage("The 'Full_Name' parameter only allows letters."),

    check("Nickname")
    .notEmpty().withMessage("The 'Nickname' parameter is required.")
    .isString().withMessage("The 'Nickname' parameter must be an 'String'")
    .isLength(5, 40).withMessage("The 'Nickname' parameter must be at least [5 characters] long and cannot be longer than [40 characters].")
    .matches(/^[a-zA-Z0-9\s@*ñ#$&%]+$/).withMessage("Error in The 'Nickname' parameter"),

    check("Date_Birth")
    .notEmpty().withMessage("The 'Date_Birth' parameter is required.")
    .isString().withMessage("The 'Date_Birth' parameter must be an 'String'")
    .matches(/^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})$/).withMessage("The 'Date_Birth' parameter must be in the [YYYY-MM-DD] format."),

    check("Email")
    .notEmpty().withMessage("The 'Email' parameter is required.")
    .isString().withMessage("The 'Email' parameter must be an 'String'")
    .isLength(1, 60).withMessage("The 'Email' parameter cannot be longer than [60 characters].")
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/).withMessage("The 'Email' parameter must contain an '@' followed by the mail server name and the [.Domain]."),

    check("Password")
    .notEmpty().withMessage("The 'Password' parameter is required.")
    .isString().withMessage("The 'Password' parameter must be an 'String'")
    .isLength(8, 40).withMessage("The 'Password' parameter must be at least [8 characters] long and cannot be longer than [40 characters].")
    .matches(/^[a-zA-Z0-9\s@*ñ#$&%]+$/).withMessage("Error in The 'Password' parameter"),

    check("Image")
    .optional()
    .isString().withMessage("The 'Image' parameter must be an 'String'")
    .isLength(8, 300).withMessage("The 'Image' parameter must be at least [8 characters] long and cannot be longer than [300 characters].")
];

export const validateUsersParams = [
    check("rol")
    .optional()
    .custom((value) => {
        if (!value) {
          return true;
        }
      
        if (!['Admin', 'Trainer', 'Camper', 'Support'].includes(value)) {
          throw new Error("The 'rol' parameter must be one of the following values:[Admin,Trainer,Camper,Support]");
        }
      
        return true;
      }),

    check("nit")
    .optional()
    .isInt().withMessage("The URL parameter 'nit' must be an Int"),
]
/* 
"Nit": 1005999685,
      "Full_Name": "John Doe",
      "Nickname": "johndoe",
      "Data_Birth": "1980-01-01",
      "Email": "john.doe@example.com",
      "Password": "anita123" */
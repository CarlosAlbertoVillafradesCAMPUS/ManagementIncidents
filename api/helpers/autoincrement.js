import {myConnect} from "../db/connect.js"

export const autoIncrement = async (colleccionName) =>{
    const db = await myConnect();
    const coleccion = db.collection("Counters");
    const resultado = await coleccion.findOneAndUpdate(
        { ID: `${colleccionName}ID` },
        { $inc: { Sequence_Value: 1 } },
        { returnDocument: "after" }
    );

    return resultado.Sequence_Value;

}
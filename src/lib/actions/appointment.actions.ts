"use server";
import {parseStringify} from "../../../lib/utils";
import {ID} from "node-appwrite";
import {
  databases,
  APPOINTMENT_COLLECTION_ID,
  DATABASE_ID,
} from "../appwrite.config";

export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
  try {
    const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointment
    );
    return parseStringify(newAppointment);
  } catch (error) {
    console.log(error);
  }
};

import { Resend } from "resend";
import { env } from "./env";

export const resend = new Resend(env.RESEND_EMAIL_API_KEY);
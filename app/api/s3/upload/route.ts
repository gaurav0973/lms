import { NextResponse } from "next/server";
import {z} from "zod";

export const fileUploadSchema = z.object({
    fileName : z.string().min(1, "File name is required"),
    contentType : z.string().min(1, "Content type is required"),
    size : z.number().min(1, "File size must be greater than 0"),
    isImage : z.boolean()
})


export async function POST(req : Request){

    try {
        const body = await req.json()

        const validation = fileUploadSchema.safeParse(body)

        if(!validation.success) {
            return NextResponse.json(
                { error: "Invalid Request Data" },
                { status: 400 }
            )
        }

        const { fileName, contentType, size, isImage } = validation.data

        

    } catch (error) {
        
    }
}
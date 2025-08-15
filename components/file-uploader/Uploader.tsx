"use client";

import { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import { relative } from "path";
import { RenderEmptyState, RenderErrorState } from "./RenderStates";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';

interface UploaderState{
    id : string | null,
    file : File | null;
    uploading : boolean;
    progress : number | null;
    key? : string;
    isDeleting : boolean;
    error : boolean;
    objectUrl? : string;
    fileType : "image" | "video";
}



export function Uploader() {
  
  const [fileState, setFileState] = useState<UploaderState>({
    id: null,
    file: null,
    uploading: false,
    progress: 0,
    isDeleting: false,
    error: false,
    fileType: "image"
  });


  function uploadFile(file : File){
    setFileState((prev) => ({
      ...prev,
      uploading : true,
      progress : 0,
    }));

    try {
        
    } catch (error) {
        
    }

  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if(acceptedFiles.length > 0){
        const file = acceptedFiles[0]
        setFileState({
            file : file,
            uploading : false,
            progress : 0,
            objectUrl : URL.createObjectURL(file),
            error : false,
            id : uuidv4(),
            isDeleting : false,
            fileType : "image"

        })
    }
  }, []);
  

  function rejectedFiles(fileRejection : FileRejection[]){
    console.log(fileRejection);
    if(fileRejection.length > 0){
        const toManyFiles = fileRejection.find((rejection) => rejection.errors[0].code === "too-many-files")

        const fileSizeBig = fileRejection.find((rejection) => rejection.errors[0].code === "file-too-large")

        if(toManyFiles){
            toast.error("Too many files selected, max is 1")
        }

        if(fileSizeBig){
            toast.error("File is too large, max size is 5MB")
        }
    }
  }
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop , 
    accept: { 'image/*': [] },
    maxFiles: 1,
    multiple: false,
    maxSize: 1024 * 1024 * 5, // 5 MB
    onDropRejected : rejectedFiles
});

  return (
    <Card
      {...getRootProps()}
      className={cn(
        "relative border-2 border-dashed transition-colors duration-100 ease-in-out w-full h-64 text-center rounded-lg flex items-center justify-center",
        isDragActive
          ? "border-primary bg-primary/10 border-solid"
          : "border-border hover:border-primary hover:bg-primary/10"
      )}
    >
      <CardContent className="flex items-center justify-center h-full w-full ">
        <input {...getInputProps()} />
            <RenderEmptyState isDragActive={isDragActive} />
            {/* <RenderErrorState/> */}
      </CardContent>
    </Card>
  );
}

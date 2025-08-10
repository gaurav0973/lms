import { type Editor } from "@tiptap/react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { Toggle } from "../ui/toggle"
import { Bold, Italic, Strikethrough } from "lucide-react"
import { cn } from "@/lib/utils"


interface iAppProps{
    editor : Editor | null
}


export function Menubar({ editor }: iAppProps){
    return (
        <div>
            <TooltipProvider>
                <div>
                    {/* bold */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle
                            size="sm"
                            pressed={editor?.isActive("bold")}
                            onPressedChange={() => editor?.chain().focus().toggleBold().run()}
                            className={cn(
                            editor?.isActive("bold") && "bg-muted text-muted-foreground"
                            )}
                            >
                                <Bold />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>
                            Bold
                        </TooltipContent>
                    </Tooltip>

                    {/* italic */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle
                            size="sm"
                            pressed={editor?.isActive("italic")}
                            onPressedChange={() => editor?.chain().focus().toggleItalic().run()}
                            className={cn(
                            editor?.isActive("italic") && "bg-muted text-muted-foreground"
                            )}
                            >
                                <Italic />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>
                            Italic
                        </TooltipContent>
                    </Tooltip>

                    {/* strike */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle
                            size="sm"
                            pressed={editor?.isActive("strike")}
                            onPressedChange={() => editor?.chain().focus().toggleStrike().run()}
                            className={cn(
                            editor?.isActive("strike") && "bg-muted text-muted-foreground"
                            )}
                            >
                                <Strikethrough />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>
                            Strikethrough
                        </TooltipContent>
                    </Tooltip>
                </div>
                
            </TooltipProvider>
        </div>
    )
}
import {z} from "zod";


export const courseLevels = ["Beginner", "Intermediate", "Advanced"]
export const courseStatus = ["Draft", "Published", "Archived"]
export const courseCategories = [
    "Development",
    "Business",
    "Finance",
    "It & software",
    "Marketing",
    "Design",
    "Health & Fitness",
    "Other",
    "Music",
    "Teaching"
]

export const courseSchema = z.object({
    title : z.string().min(3, {message: "Title must be at least 3 characters long"}).max(100),
    description : z.string().min(10, {message: "Description must be at least 10 characters long"}),
    fileKey : z.string().min(1, {message: "File key is required"}),
    price : z.coerce.number().min(1, {message: "Price must be at least 1"}),

    duration : z.coerce.number().min(1, {message: "Duration must be at least 1"}),
    level : z.enum(courseLevels, {message: "Level must be one of: Beginner, Intermediate, Advanced"}),

    category : z.enum(courseCategories, {message: "category is required"}),
    smallDescription : z.string().min(10, {message: "Small description must be at least 10 characters long"}).max(250, {message: "Small description must be at most 250 characters long"}),

    slug : z.string().min(3, {message: "Slug must be at least 3 characters long"}),
    status : z.enum(courseStatus, {message: "Status must be one of: Draft, Published, Archived"}),


})


export type courseSchemaType = z.infer<typeof courseSchema>
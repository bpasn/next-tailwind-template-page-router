'use client';
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form"
import { CategoryResolver } from "../schema";


const CategoryForm = () => {
    const form = useForm<CategoryModel>({
        resolver: CategoryResolver,
        defaultValues: { name: "" }
    });
    return (
        <Form {...form}>
            <form className="space-y-8 w-full" onSubmit={form.handleSubmit(d => {})}>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button className="ml-auto" type="submit" >
                    Save Changed
                </Button>
            </form>
        </Form>
    )
}
export default CategoryForm
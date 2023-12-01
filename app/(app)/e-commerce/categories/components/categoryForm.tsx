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
import { useStoreModel } from "@/hook/useStoreModel";
import { useEffect } from "react";
import { useForm } from "react-hook-form"


const CategoryForm = (): React.JSX.Element => {
    const storeModel = useStoreModel();

    const form = useForm();
    return (
        <Form {...form}>
            <form className="space-y-8 w-full">
                <FormField
                    control={form.control}
                    name=""
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button className="ml-auto" type="submit">
                    Save Changed
                </Button>
            </form>
        </Form>
    )
}

export default CategoryForm
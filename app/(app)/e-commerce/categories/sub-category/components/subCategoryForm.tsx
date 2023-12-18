'use client';
import { Button } from "@/components/ui/button";
import {
    Form,
} from "@/components/ui/form"
import { ComboboxForm, InputForm } from "@/provider/form-provider";
import { useForm } from "react-hook-form"
import { SubCategoryResolver } from "../../schema";


const SubCategoryForm = () => {
    const form = useForm<SubCategoryModel>({
        resolver: SubCategoryResolver,
        defaultValues: {
            name: "",
            categoryId: ""
        }
    });
    return (
        <Form {...form}>
            <form className="space-y-8 w-full" onSubmit={form.handleSubmit((d) => {})} >
                <InputForm
                    control={form.control}
                    name="name"
                    formLabel="Sub Category Name"
                />
                <ComboboxForm
                    control={form.control}
                    name="categoryId"
                    formLabel="Sub Category Name"
                    options={[{ label: "Nextjs", value: "NextJs" }]}
                />
                <Button className="ml-auto" type="submit" >
                    Save Changed
                </Button>
            </form>
        </Form>
    )
}
export default SubCategoryForm
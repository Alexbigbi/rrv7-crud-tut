import { Form, redirect, type ActionFunctionArgs } from "react-router";
import { supabase } from "~/supabase-client";

export function meta() {
    return [
        {title: "New Item | RRV7 Crud"},
        {name: "description", content: "Create a new item"},
    ];
}

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    if (!title || !description) {
        return {error: "Title and content are required."};
    }

    const { error } = await supabase.from("items").insert({ title, description });

    if (error) {
        return { error: error.message };
    }

    return redirect("/");
}

export default function NewItem() {
    return (
        <div>
            <h2> Create New Item </h2>
            <Form method="post">
                <div>
                    <label> Title </label>
                    <input type="text" name="title" required />
                </div>

                <div>
                    <label> Description </label>
                    <textarea name="description" required />
                </div>

                <button type="submit"> Create Item </button>
            </Form>
        </div>
    );
}

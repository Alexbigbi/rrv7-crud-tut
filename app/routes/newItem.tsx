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
        <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4"> Create New Item </h2>
            <Form method="post" className="space-y-4 bg-white p-4 rounded shadow">
                <div>
                    <label className="block text-gray-700"> Title </label>
                    <input type="text" 
                    name="title" 
                    className="border border-gray-300 rounded px-3 py-2 w-full" 
                    required />
                </div>

                <div>
                    <label className="block text-gray-700"> Content </label>
                    <textarea name="description" 
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                    required 
                    />
                </div>

                <button type="submit" className="text-white bg-green-600 px-2 py-1 rounded shadow hover:bg-green-500"> Create Item </button>
            </Form>
        </div>
    );
}

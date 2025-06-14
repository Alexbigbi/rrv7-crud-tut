import { supabase } from "~/supabase-client";
import type { Route } from "./+types/item";
import { Form, redirect, type ActionFunctionArgs } from "react-router";

export async function loader({ params }: Route.LoaderArgs) {
    const { id } = params;

    if (!id) {
        return {error: "No item found."};
    }

    const {data, error} = await supabase
    .from("items")
    .select("*")
    .eq("id", id)
    .single();

    if (error) {
        return { error: error.message }; 
    }

    return {item: data};
}

export async function action({ request, params }: ActionFunctionArgs) {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const { id } = params;

    const intent = formData.get("intent");
    if (intent == "delete") {
        const { error } = await supabase.from("items").delete().eq("id", id);

        if (error) {
            return { error: error.message };
        }

        return redirect("/");
    }
    else if (intent == "update") {
        const { error } = await supabase.from("items").update({ title, description }).eq("id", id);

        if (error) {
            return { error: error.message };
        }
        return redirect("/")
    }

    return {};

}

export default function Item({loaderData}: Route.ComponentProps) {
    const { item } = loaderData;
    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4"> Edit Item </h2>

            <Form method="post" className="space-y-4 bg-white p-4 rounded shadow">
                <div>
                    <label className="block text-gray-700"> Title </label>
                    <input name="title" 
                    type="text" 
                    defaultValue={item.title}
                    className="border border-gray-300 rounded px-3 py-2 w-full" 
                    required />
                </div>

                <div>
                    <label className="block text-gray-700"> Content </label>
                    <textarea name="description" 
                    defaultValue={item.description}
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                    required 
                    />
                </div>
                <div className="space-x-4">
                    <button type="submit" name="intent" value="update" className="text-white bg-green-600 px-2 py-1 rounded shadow hover:bg-green-500"> Update </button>
                    <button type="submit" name="intent" value="delete" className="text-white bg-red-600 px-2 py-1 rounded shadow hover:bg-red-500"> Delete </button>
                </div>
            </Form>
        </div>
    )
}

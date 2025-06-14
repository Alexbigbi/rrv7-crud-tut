import { supabase } from "~/supabase-client";
import type { Route } from "./+types/items";
import { Link } from "react-router";

export function meta() {
    return [
        {title: `All Your Items | RRV7 Crud`},
        {name:"description", content:"View your collection of items using our Supabase RRV7 CRUD app."}
    ]
}

export async function loader() {
    const {data, error} = await supabase.from("items").select("*");

    if (error) {
        return { error: error.message };
    }

    return { items: data };
}

export default function Items({ loaderData }: Route.ComponentProps) {
    const { error, items } = loaderData;

    return (
    <div>
        <h2 className="text-2xl text-gray-800 font-bold mb-4"> List of Items </h2>   
        {error && <div className="bg-red-200 text-red-800 p-2 mb-4 rounded"> {error} </div>}  

        <ul className="space-y-4">
            {items?.map((item) => (
                <li className="bg-white p-4 rounded shadow">
                    <Link to={`/items/${item.id}`} className="block text-indigo-600">
                        <span className="text-xl font-semibold"> {item.title} </span>
                        <p className="text-gray-600"> {item.description} </p>
                    </Link>
                </li>
            ))}
        </ul>  
    </div>
    
    );
}

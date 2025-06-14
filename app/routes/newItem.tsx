import { Form } from "react-router";

export async function action() {

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

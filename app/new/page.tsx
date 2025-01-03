export default function New() {
    return (
        <div className="flex flex-col bg-zinc-950 min-h-screen justify-center items-center">
            <h1 className="font-times text-6xl font-bold text-gray-200">
                New Visit
            </h1>
            <form>
                <label>Restaurant Name</label>
                <input></input>
                <label>Category</label>
                <select></select>
                <label>Rating</label>
                <input></input>
            </form>
        </div>
    );
}
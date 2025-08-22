import { Link } from "react-router-dom";

function HomePage() {
    return (
        <div>
            <h1>Book Buddy</h1>
            <div className="flex flex-row gap-6">
                <button className="bg-blue-500 text-white">
                    <Link to="/search">Search</Link>
                </button>
                <button className="bg-blue-500 text-white">
                    <Link to="/reading-list">Reading List</Link>
                </button>
            </div>
        </div>
    );
}

export default HomePage;

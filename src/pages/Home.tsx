import { Link } from "react-router-dom";

function HomePage() {
    return (
        <div className="flex size-full min-h-screen flex-col items-center justify-center">
            <div>
                <h1>Welcome to Book Buddy!</h1>
                <h2>What would you like to do today?</h2>
            </div>
            <div className="flex flex-row gap-6">
                <button className="bg-blue-500 text-white">
                    <Link to="/search">Search</Link>
                </button>
                <button className="bg-blue-500 text-white">
                    <Link to="/reading-list">View My Reading List</Link>
                </button>
            </div>
        </div>
    );
}

export default HomePage;

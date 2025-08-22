import { useState } from "react";
import BookCard, { BookResult } from "src/components/BookCard/BookCard";

interface SearchFormData {
    q: string;
    author: string;
}

const defaultSearchResults = {
    numFound: 0,
    start: 0,
    numFoundExact: false,
    num_found: 0,
    offset: null,
    docs: [] as BookResult[],
    q: "string",
    documentation_url: "https://openlibrary.org/dev/docs/api/search",
};

interface SearchResults {
    numFound: number;
    start: number;
    numFoundExact: boolean;
    num_found: number;
    offset: null;
    docs: BookResult[];
    q: string;
    documentation_url: string;
}

function SearchPage() {
    const [searchFormData, setSearchFormData] = useState<SearchFormData>({
        q: "",
        author: "",
    });
    const [searchResults, setSearchResults] =
        useState<SearchResults>(defaultSearchResults);

    const constructSearchUrl = (formData: SearchFormData) => {
        const filtered = Object.fromEntries(
            Object.entries(formData)
                .filter(([_, value]) => value != null && value !== "")
                .map(([key, value]) => [key, String(value)]),
        );

        const searchParams = new URLSearchParams(filtered);

        return `https://openlibrary.org/search.json?${searchParams}`;
    };

    const handleFormDataChange = (
        formUpdateEvent: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const { name, value } = formUpdateEvent.target;
        setSearchFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmitEvent = async (formSubmissionEvent: React.FormEvent) => {
        formSubmissionEvent.preventDefault();

        console.log(formSubmissionEvent);

        const rawFormData = new FormData(formSubmissionEvent.currentTarget);

        const formData: SearchFormData = {
            q: rawFormData.get("q") as string,
            author: rawFormData.get("author") as string,
        };

        console.log("formData", formData);

        const searchUrl = constructSearchUrl(formData);
        const response = await fetch(searchUrl);

        let results = defaultSearchResults;
        try {
            results = (await response.json()) as SearchResults;
        } catch (e) {
            console.error(e);
        }

        console.log(results);
        setSearchResults(results);
    };

    return (
        <div>
            <h1>Search Page</h1>
            <div>
                <form onSubmit={handleSubmitEvent}>
                    <div>
                        <input
                            id="q"
                            name="q"
                            value={searchFormData.q}
                            onChange={handleFormDataChange}
                            type="text"
                            placeholder="Book Title"
                        />
                    </div>
                    <div>
                        <input
                            onChange={handleFormDataChange}
                            value={searchFormData.author}
                            id="author"
                            name="author"
                            type="text"
                            placeholder="Author Name"
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div>
                {searchResults.docs.map(
                    (bookResult: BookResult, idx: number) => {
                        return (
                            <BookCard
                                key={`${idx}-${bookResult.title}`}
                                bookResult={bookResult}
                            />
                        );
                    },
                )}
            </div>
        </div>
    );
}

export default SearchPage;

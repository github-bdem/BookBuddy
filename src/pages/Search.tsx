import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const bookSearchFormSchema = z.object({
    q: z.string(),
    author: z.string(),
});

type BookSearchFormData = z.infer<typeof bookSearchFormSchema>;

function SearchPage() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<BookSearchFormData>({
        resolver: zodResolver(bookSearchFormSchema),
    });

    const constructSearchUrl = (formData: BookSearchFormData) => {
        const filtered = Object.fromEntries(
            Object.entries(formData)
                .filter(([_, value]) => value != null && value !== "")
                .map(([key, value]) => [key, String(value)]),
        );

        const searchParams = new URLSearchParams(filtered);

        return `https://openlibrary.org/search.json?${searchParams}`;
    };

    const onSubmit = async (formData: BookSearchFormData) => {
        console.log(formData);

        const searchUrl = constructSearchUrl(formData);
        const response = await fetch(searchUrl);

        let results = {};
        try {
            results = (await response.json()) as string;
        } catch (e) {
            console.error(e);
        }

        console.log(results);
    };

    return (
        <div>
            <h1>Search Page</h1>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <input
                            {...register("q")}
                            type="text"
                            placeholder="Book Title"
                        />
                        {errors.q && <span>{errors.q.message}</span>}
                    </div>
                    <div>
                        <input
                            {...register("author")}
                            type="text"
                            placeholder="Author Name"
                        />
                        {errors.author && <span>{errors.author.message}</span>}
                    </div>
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SearchPage;

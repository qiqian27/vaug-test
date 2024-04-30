'use client'

import Image from "next/image";
import useSWR from 'swr';
import BuildUrl from "build-url";
import Link from 'next/link';

type Book = {
    id: number;
    title: string;
    author: string;
    genre: string;
    description: string;
    image: string;
    isbn: number;
    published: string;
    publisher: string;
};

export default function Page({ params }: { params: { id: string } }) {
    // Extract the book id from the params
    const { id } = params;

    // Fetch the list of books
    const { data: books, error } = useSWR<Book[]>(BuildUrl('https://fakerapi.it/api/v1/books'), async (url: string | URL | Request) => {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        return data.data;
    });

    // Handle error and loading states
    if (error) return <div>Error fetching data</div>;
    if (!books) return <div>Loading...</div>;

    // Find the book with the specified id
    const book = books.find(book => book.id === parseInt(id));

    // Handle case where book is not found
    if (!book) return <div>Book not found</div>;

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB'); // Change the locale to your desired format
    };

    const decodedImageLink = book.image.replace(/\\/g, ''); // Removing escape characters

    // Display the book title
    return (
        <main className="px-7">
            <span className="flex justify-center text-5xl mt-5 mb-5">Selected Book</span>
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="border">No.</th>
                        <th className="border">Title</th>
                        <th className="border">Author</th>
                        <th className="border">Genre</th>
                        <th className="border">Description</th>
                        <th className="border">Image</th>
                        <th className="border">ISBN</th>
                        <th className="border">Publish Date</th>
                        <th className="border">Publisher</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    <tr>
                        <td className="border">{book.id}</td>
                        <td className="border">{book.title}</td>
                        <td className="border">{book.author}</td>
                        <td className="border">{book.genre}</td>
                        <td className="border">{book.description}</td>
                        <td className="border">
                            <Image
                                src={decodedImageLink}
                                alt="No Img"
                                width={40}
                                height={40}
                                loader={({ src, width, quality }) => `${src}?w=${width}&q=${quality || 75}`}
                            />
                        </td>
                        <td className="border">{book.isbn}</td>
                        <td className="border">{formatDate(book.published)}</td>
                        <td className="border">{book.publisher}</td>

                    </tr>
                </tbody>
            </table>

            {/* Edited from New Branch  */}
            <Link href="/">
                <span className="cursor-pointer block text-center mt-5 text-blue-600 underline">Back to Home Page</span>
            </Link>
        </main>
    );
}

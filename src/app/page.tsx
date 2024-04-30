'use client'

import { FC } from 'react';
import useSWR from 'swr';
import BuildUrl from "build-url";
import Link from 'next/link';

type Book = {
  id: number;
  title: string;
  author: string;
  genre: string;
  description: string;
  isbn: number;
  published: string;
  publisher: string;
};

const VAug: FC = () => {

  const { data: books, error } = useSWR<Book[]>(BuildUrl('https://fakerapi.it/api/v1/books'), async (url: string | URL | Request) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data.data;
  });

  if (error) return <div>Error fetching data</div>;
  if (!books) return <div>Loading...</div>;

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  return (
    <>
      <main className="px-7">
        <section id="list">
          <span className="flex justify-center text-5xl mt-5 mb-5">Book List</span>
          <div className="mb-5">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="border">No.</th>
                  <th className="border">Title</th>
                  <th className="border">Author</th>
                  <th className="border">Genre</th>
                  <th className="border">Description</th>
                  <th className="border">ISBN</th>
                  <th className="border">Publish Date</th>
                  <th className="border">Publisher</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {books.map((book, index) => (
                  <tr key={book.id} className="hover:bg-gray-200 cursor-pointer">
                    <td className="border"><Link href={`/book/${book.id}`}>
                        <span>{book.id}</span>
                      </Link></td>
                    <td className="border">
                      <Link href={`/book/${book.id}`}>
                        <span>{book.title}</span>
                      </Link>
                    </td>
                    <td className="border">
                      <Link href={`/book/${book.id}`}>
                        <span>{book.author}</span>
                      </Link>
                    </td>
                    <td className="border">
                      <Link href={`/book/${book.id}`}>
                        <span>{book.genre}</span>
                      </Link>
                    </td>
                    <td className="border">
                      <Link href={`/book/${book.id}`}>
                        <span>{book.description}</span>
                      </Link>
                    </td>
                    <td className="border">
                      <Link href={`/book/${book.id}`}>
                        <span>{book.isbn}</span>
                      </Link>
                    </td>
                    <td className="border">
                      <Link href={`/book/${book.id}`}>
                        <span>{formatDate(book.published)}</span>
                      </Link>
                    </td>
                    <td className="border">
                      <Link href={`/book/${book.id}`}>
                        <span>{book.publisher}</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
}

export default VAug;

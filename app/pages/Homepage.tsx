'use client'

import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import SearchInput from '../components/searchInput'

async function getData(searchQuery:any) {
  const url = `https://jsonplaceholder.typicode.com/posts`;
  const res = await fetch(url, { next: { revalidate: 0 } });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default function Homepage() {

  const [title, setTitle] = useState<any[]>([])

  const searchParams = useSearchParams()
  const searchQuery = searchParams && searchParams.get("q");

  useEffect(() => {
    const handleSearch = async () => {
      try {
        const data = await getData(searchQuery);

        const findUser = data.filter((user: any) => {
          if (searchQuery) {
            return (
              user.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
          } else {
            return true;
          }
        });

        setTitle(findUser);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    handleSearch();
  }, [searchQuery]);

  return (
    <main className='pl-10'>
      <h2 className='pb-10 pt-10'>This is the main page</h2>
      <SearchInput defaultValue={searchQuery} />

      {title.map((Title: any) => (
        <div key={Title.id} className="div ">
          <p className=" pb-5">{Title.title}</p>
        </div>
      ))}
    </main>
  )
}

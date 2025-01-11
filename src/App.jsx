import React from 'react'
import { Button } from './components/ui/button'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

// const wallpapers = [
//   { id: 1, src: '/placeholder.svg?height=300&width=400', alt: 'Wallpaper 1' },
//   { id: 2, src: '/placeholder.svg?height=300&width=400', alt: 'Wallpaper 2' },
//   { id: 3, src: '/placeholder.svg?height=300&width=400', alt: 'Wallpaper 3' },
//   { id: 4, src: '/placeholder.svg?height=300&width=400', alt: 'Wallpaper 4' },
//   { id: 5, src: '/placeholder.svg?height=300&width=400', alt: 'Wallpaper 5' },
//   { id: 6, src: '/placeholder.svg?height=300&width=400', alt: 'Wallpaper 6' },
// ]
const apiKey = import.meta.env.VITE_PEXELS_API_KEY
const endpoint = 'https://api.pexels.com/v1/curated'

function App() {
  const [wallpapers, setWallpapers] = useState([]);
  const [page, setPage] = useState(1);

  const fetchWallpapers = async () => {
    try {
      const response = await axios.get(endpoint, {
        headers: { Authorization: apiKey },
        params: { page, per_page: 15 }
      });
      setWallpapers(response.data.photos);

      // console.log(response.data.photos);
    } catch (error) {
      console.error("Error fetching the wallpapers", error);
    }
  };
  useEffect(() => {
    fetchWallpapers();
  }, [page]);

  return (
    <>
      <header className="bg-black text-white p-4">
        <nav className="container mx-auto flex justify-between items-center">
          <div className="text-lg font-bold">PixPan</div>
          <Button variant="secondary" className="px-4 py-2 rounded">It's Free!</Button>
        </nav>
        <div className='container mx-auto h-[70vh] flex flex-col justify-center items-center text-center'>
          <h1 className='text-6xl font-bold mb-4'>Beautiful Wallpapers <br /> <span className='text-teal-500'>for Your Devices</span></h1>
          <p className='text-base max-w-lg'>Discover and download high-quality wallpapers for your desktop, mobile, and tablet devices.</p>
        </div>
      </header>

      <main className='bg-black'>
        <section className='container mx-auto py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {wallpapers.map(wallpaper => (
            <div className='bg-transparent rounded-lg shadow-lg overflow-hidden relative group' key={wallpaper.id}>
              <img src={wallpaper?.src?.original} className='w-full h-auto object-cover' />
              <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                <Button onClick={() => window.open(wallpaper.src.original)} className='bg-white text-black hover:bg-gray-200'>
                  Download
                </Button>
              </div>
            </div>
          ))}
        </section>
        <div className="text-center py-8">
          <Button size="lg" variant="secondary" onClick={() => setPage(page + 1)}>Load More </Button>
        </div>
      </main>

      <footer className='bg-black text-white py-8'>
        <div className='container mx-auto px-4'>
          <div className='border-t border-gray-800 mt-8 pt-8 text-center text-gray-400'>
            <div className='flex justify-between items-center'>
              <p>Made with ♥️ by <span className='cursor-pointer' onClick={() => window.open("https://github.com/nayiswftw")}>nayiswftw</span></p>
              <Button onClick={() => window.open("https://github.com/nayiswftw/PixPan")}>View on Github</Button>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
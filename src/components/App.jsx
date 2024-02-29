import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import Loader from './Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import css from './App.module.css';
import FetchImages from './Api/Api.js';
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    if (!searchQuery) return;
    const getImages = async () => {
      setLoading(true);
      try {
        const { images, totalImages } = await FetchImages(searchQuery, page);

        if (images.length === 0) {
          toast.error('Nothing found. Please, change your request.');
          return;
        }
        if (images.length !== 0 && page === 1) {
          toast.success(`We have found ${totalImages} images on your request.`);
        }
        if (page < Math.ceil(totalImages / 12)) {
          toast.info('There are more images.');
        }
        setImages(prevImages => [...prevImages, ...images]);

        setShowBtn(page < Math.ceil(totalImages / 12));
      } catch (error) {
        toast.error('There are some problems! Try again later.');
      } finally {
        setLoading(false);
      }
    };
    getImages();
  }, [searchQuery, page]);

  const formSubmitHandler = newSearchQuery => {
    if (newSearchQuery === searchQuery) {
      toast.info('Images on your request is already shown.');
      return;
    }
    setSearchQuery(newSearchQuery);
    setPage(1);
    setImages([]);
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };
  // console.log(images);
  return (
    <section className={css.App}>
      <Searchbar onSubmit={formSubmitHandler} />
      {loading && <Loader />}
      {images.length > 0 && <ImageGallery images={images} />}
      {showBtn && <Button onClick={onLoadMore} />}
      <ToastContainer autoClose={3000} />
    </section>
  );
}

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useState, useEffect } from 'react';
// import Searchbar from './Searchbar/Searchbar';
// import Loader from './Loader/Loader';
// import ImageGallery from './ImageGallery/ImageGallery';
// import Button from './Button/Button';
// import css from './App.module.css';
// import FetchImages from './Api/Api.js';
// import 'react-toastify/dist/ReactToastify.css';

// export function App() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [page, setPage] = useState(1);
//   // const [totalImages, setTotalImages] = useState(0);
//   const [images, setImages] = useState([]);
//   const [status, setStatus] = useState('idle');
//   const [showBtn, setShowBtn] = useState(false);

//   useEffect(() => {
//     if (!searchQuery) return;
//     const getImages = async () => {
//       setStatus('pending');

//       try {
//         const { images, totalImages } = await FetchImages(searchQuery, page);

//         if (images.length === 0) {
//           toast.error('Nothing found. Please, change your request.');
//         }
//         if (images.length !== 0 && page === 1) {
//           toast.success(`We have found ${totalImages} images on your request.`);
//         }
//         if (
//           totalImages > 0 &&
//           page !== 1 &&
//           totalImages <= images.length + 12
//         ) {
//           toast.info('There are no more images.');
//         }
//         if (page < Math.ceil(totalImages / 12)) {
//           toast.info('There are more images.');
//         } else {
//           setImages(prevImages => [...prevImages, ...images]);
//           setStatus('resolved');
//           // setTotalImages(totalImages);
//           setShowBtn(page < Math.ceil(totalImages / 12));
//         }
//       } catch (error) {
//         toast.error('There are some problems! Try again later.');
//         setStatus('rejected');
//       }
//     };
//     getImages();
//   }, [searchQuery, page]);

//   const getImages = async () => {
//     setStatus('pending');

//     try {
//       const { images, totalImages } = await FetchImages(searchQuery, page);

//       if (images.length === 0) {
//         toast.error('Nothing found. Please, change your request.');
//       }
//       if (images.length !== 0 && page === 1) {
//         toast.success(`We have found ${totalImages} images on your request.`);
//       }
//       if (totalImages > 0 && page !== 1 && totalImages <= images.length + 12) {
//         toast.info('There are no more images.');}
//         if (page < Math.ceil(totalImages / 12)) {
//           toast.info('There are  more images.');
//         }
//       } else {
//         setImages(prevImages => [...prevImages, ...images]);
//         setStatus('resolved');
//         setTotalImages(totalImages);
//         setShowBtn(page < Math.ceil(totalImages / 12));
//       }
//     } catch (error) {
//       toast.error('There are some problems! Try again later.');
//       setStatus('rejected');
//     }
//   // };

//   useEffect(() => {
//     if (!searchQuery) return;

//     getImages();
//   }, [searchQuery, page]);

//   const formSubmitHandler = newSearchQuery => {
//     if (newSearchQuery === searchQuery) {
//       toast.info('Images on your request is already shown.');
//       return;
//     }
//     setSearchQuery(newSearchQuery);
//     setPage(1);
//     setImages([]);
//     // setTotalImages(0);
//   };

//   const onLoadMore = () => {
//     setPage(prevPage => prevPage + 1);
//   };

//   return (
//     <section className={css.App}>
//       <Searchbar onSubmit={formSubmitHandler} />
//       {status === 'pending' && <Loader />}
//       {status === 'resolved' && images.length > 0 && (
//         <ImageGallery images={images} />
//       )}
//       {showBtn && <Button onClick={onLoadMore} />}
//       <ToastContainer autoClose={3000} />
//     </section>
//   );
// }

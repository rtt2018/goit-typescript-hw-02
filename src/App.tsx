import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import { PuffLoader } from "react-spinners";
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import getUnsplashData from './api';
import ImageModal from './components/ImageModal/ImageModal';
import { useState, useEffect } from 'react'
import './App.css'
import { UnsplashPhoto, UnsplashResponse } from './types/types';

// Modal.setAppElement("#root");

function App() {

  const [requestPhrase, setRequestPhrase] = useState<string>('');
  const [galleryItem, setGalleryItem] = useState<Array<UnsplashPhoto>>([]);
  const [loaderIsVisible, setLoaderIsVisible] = useState<boolean>(false);
  const [loadMoreIsVisible, setLoadMoreIsVisible] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [currentShowImg, setCurrentShowImg] = useState<UnsplashPhoto | null>(null);
  const [zeroResult, setZeroResult] = useState<boolean>(false);

  const showModal = (imgId: UnsplashPhoto): void => {
    setCurrentShowImg(imgId);
    setModalVisible(true);
  }

  const closeModal = (): void => {
    setModalVisible(false)
  }

  useEffect(() => {
    async function getData(): Promise<void> {
      if (requestPhrase === '') {
        return
      }

      try {
        setLoaderIsVisible(true);
        setLoadMoreIsVisible(false);

        const data: UnsplashResponse = await getUnsplashData({ query: requestPhrase, page: pageNumber });
        if (data.total_pages > pageNumber) {
          setLoadMoreIsVisible(true);
        } else {
          setLoadMoreIsVisible(false);
        }
        if (data.results.length === 0) {
          setZeroResult(true)
        }
        setGalleryItem((prevImages) => [...prevImages, ...data.results]);
      } catch {
        setError(true);
      } finally {
        setLoaderIsVisible(false);
      }
    }
    getData();
  }, [requestPhrase, pageNumber]);


  const onSubmit = (inputPhrase: string): void => {
    setZeroResult(false)
    setPageNumber(1);
    setRequestPhrase(inputPhrase);
    setError(false);
    setGalleryItem([]);
    setLoadMoreIsVisible(false)
  }

  const loadMore = (): void => {
    setPageNumber(prevPageNum => prevPageNum + 1)
  }

  return (
    <>
      <SearchBar getRequestPhrase={onSubmit} />
      {galleryItem.length > 0 && <ImageGallery imagesData={galleryItem} showModal={showModal} />}
      {zeroResult && <p>За вашим запитом не знайдено зображень. Спробуйте іншу пошукову фразу!</p>}
      {loaderIsVisible && <PuffLoader
        color="#1561f4"
        cssOverride={{}}
        className='loader'
      />}
      {error && <ErrorMessage />}
      {loadMoreIsVisible && <LoadMoreBtn onLoadMore={loadMore} />}
      {modalVisible && <ImageModal
        isOpen={modalVisible}
        onClose={closeModal}
        currentImg={currentShowImg}
      />}
    </>
  )
};

export default App

import styles from './ImageCard.module.css';

type ImageCardProps = {
  imgData: {
    urls: {
      small: string;
    };
    alt_description: string;
  };
  showModal: (imgData: any) => void;
};

export default function ImageCard({ imgData, showModal }: ImageCardProps) {

  const handleOpenModal = () => {
    showModal(imgData);
  }
  return (
    <div className={styles.container}>
      <img onClick={handleOpenModal} src={imgData.urls.small} alt={imgData.alt_description} />
    </div>
  );
}

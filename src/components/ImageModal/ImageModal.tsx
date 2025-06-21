import styles from './ImageModal.module.css';
import Modal from 'react-modal'
import { SlClose } from "react-icons/sl";
import { IoInformationCircleOutline } from "react-icons/io5";
import { ImageModalProps } from '../../types/types';

Modal.setAppElement("#root");


export default function ImgModal({ onClose, currentImg, isOpen }: ImageModalProps) {
  if (!currentImg) return null;
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
      contentLabel="Butiful picture"
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          transform: "translate(-50%, -50%)",
          padding: "0",
          border: "none",
          overflow: "visible",
          maxWidth: "100vw",
          maxHeight: "100vh",
          backgroundColor: "transparent",
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          zIndex: 999,
        },
      }}
    >
      <button aria-label='Close modal' type="button" className={styles.closeButton} onClick={onClose}><SlClose /></button>
      <div className={styles.thumb}>
        <img src={currentImg.urls.regular} alt={currentImg.alt_description} />
        <div className={styles.info}>
          <p><strong>Author: </strong>{currentImg.user.name} </p>
          <p><strong>Likes: </strong>{currentImg.likes}</p>
          <p><strong>Description: </strong>{currentImg.description}</p>
          <p><a href={currentImg.links.download} target='_blank' download={String(currentImg.slug) + ".jpg"}>Download</a></p>
          <IoInformationCircleOutline style={{
            width: "36px",
            height: "auto",
          }} />
        </div>
      </div>
    </Modal >
  );
}

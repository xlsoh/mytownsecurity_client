import React, { useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';

const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const ModalWrapper = styled.div`
  width: 400px;
  height: 400px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  grid-template-columns: 1fr;
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 10;
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

function Modal({ isOpen, setIsOpen, children }) {
  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setIsOpen(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    },
    [setIsOpen, isOpen]
  );

  useEffect(() => {
    document.addEventListener('keydown', keyPress);
    return () => document.removeEventListener('keydown', keyPress);
  }, [keyPress]);

  return (
    <>
      {isOpen && (
        <Background ref={modalRef} onClick={closeModal}>
          <ModalWrapper isOpen={isOpen}>
            <ModalContent>{children}</ModalContent>
            <CloseModalButton
              aria-label='Close modal'
              onClick={() => {
                setIsOpen((prev) => !prev);
              }}
            />
          </ModalWrapper>
        </Background>
      )}
    </>
  );
}

//-----------styled-component 삭제
// const Modal_styles = {
//   position: 'fixed',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   background: '#fff',
//   padding: '50px',
//   display: 'grid',
//   zIndex: 1000,
// };

// const Overlay_styled = {
//   position: 'fixed',
//   display: 'flex',
//   top: 0,
//   left: 0,
//   bottom: 0,
//   right: 0,
//   background: 'rgba(0, 0, 0, 0.7)',
//   content: 'center',
//   align: 'center',
//   zIndex: 1000,
// };

// const ModalButton = {
//   cursor: 'pointer',
//   background: '#fff',
//   position: 'absolute',
//   top: '20px',
//   right: '20px',
//   width: '32px',
//   height: '32px',
//   padding: 0,
//   zIndex: 10,
// };

// function Modal({ isOpen, setIsOpen, children }) {
//   const modalRef = useRef();

//   const closeModal = (e) => {
//     if (modalRef.current === e.target) {
//       setIsOpen(false);
//     }
//   };
//   const keyPress = useCallback(
//     (e) => {
//       if (e.key === 'Escape' && isOpen) {
//         setIsOpen(false);
//       }
//     },
//     [setIsOpen, isOpen]
//   );

//   useEffect(() => {
//     document.addEventListener('keydown', keyPress);
//     return () => document.removeEventListener('keydown', keyPress);
//   }, [keyPress]);

//   return (
//     <>
//       {isOpen && (
//         <>
//           <div style={Overlay_styled} ref={modalRef} onClick={closeModal} />
//           <div style={Modal_styles}>
//             <button
//               style={ModalButton}
//               onClick={() => {
//                 setIsOpen(false);
//               }}
//             >
//               X
//             </button>
//             {children}
//           </div>
//         </>
//       )}
//     </>
//   );
// }

export default Modal;

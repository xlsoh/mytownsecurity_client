import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import swal from '@sweetalert/with-react';
import AddFavoritePage from '../modal/favorite/AddFavoritePage';
import Modal from '../../styles/Modal';
import { FavContainer } from './ServiceCss';

import Button from '@material-ui/core/Button';
import { useStylesBtn } from '../../styles/globalBtnCss';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';

function AddFavorite({ isToken, address, userInfo }) {
  const [isOpen, setIsOpen] = useState(false);
  const [viewForm, setViewForm] = useState(false);
  const openModal = () => {
    console.log('test');
    setIsOpen(true);
  };
  const favBtn = useStylesBtn();
  return (
    <>
      {isToken && (
        <>
          <FavContainer>
            <Button
              variant='contained'
              color='secondary'
              className={favBtn.FavriteBtn}
              startIcon={<FavoriteRoundedIcon />}
              onClick={openModal}
            >
              찜하기
            </Button>
          </FavContainer>
          <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <AddFavoritePage userInfo={userInfo} address={address} />
          </Modal>
        </>
      )}
      {!isToken && (
        <>
          <FavContainer>
            <Button
              variant='contained'
              color='secondary'
              className={favBtn.FavriteBtn}
              startIcon={<StarsRoundedIcon />}
              onClick={() => {
                swal('로그인 후 이용해 주세요.', {
                  button: false,
                  timer: 1000,
                  icon: 'warning',
                });
              }}
            >
              찜하기
            </Button>
          </FavContainer>
        </>
      )}
    </>
  );
}

export default withRouter(AddFavorite);

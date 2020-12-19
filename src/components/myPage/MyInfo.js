import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Modal from '../../styles/Modal';
import EditInfoPage from '../modal/user/EditInfoPage';
import {
  MyInfoSubTitle,
  MyinfoDesc,
  MyInfoTextWrap,
  EditPasswordButton,
  MyInfoBtnWrap,
  MyInfoWrap,
} from './myPageCss';

function MyInfo({ userInfo }) {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <MyInfoWrap>
      <MyInfoTextWrap>
        <MyInfoSubTitle>이메일</MyInfoSubTitle>
        <MyinfoDesc>{userInfo.email}</MyinfoDesc>
        <MyInfoSubTitle>비밀번호</MyInfoSubTitle>
      </MyInfoTextWrap>
      <MyInfoBtnWrap>
        <EditPasswordButton onClick={openModal}>
          비밀번호 수정
        </EditPasswordButton>
      </MyInfoBtnWrap>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <EditInfoPage userInfo={userInfo} />
      </Modal>
    </MyInfoWrap>
  );
}

export default withRouter(MyInfo);

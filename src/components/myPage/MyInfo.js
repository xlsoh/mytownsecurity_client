import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import Modal from '../../styles/Modal';
import EditInfoPage from '../modal/user/EditInfoPage';

const InfoWrapper = styled.div`
  width: 1000px;
  padding: 20px;
  box-shadow: 0px 5px 16px rgba(0, 0, 0, 0.2);
  display: grid;
  place-items: center;
  border-radius: 5px;
  background: #e1f5f1;
`;

const SubTitle = styled.div`
  font-size: 30px;
  font-weight: 600;
  font-family: Gill Sans;
`;

const Description = styled.div`
  font-size: 20px;
  font-weight: 400;
  font-family: Gill Sans;
`;

const EditPasswordButton = styled.button`
  border: solid 1px #dadada;
  margin-bottom: 15px;
  padding: 10px;
  transition: all 0.5s;
  cursor: pointer;
  &:hover {
    background-color: #32e0c4;
  }
`;

function MyInfo({ userInfo }) {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      <InfoWrapper>
        <SubTitle>이메일</SubTitle>
        <br />
        <Description>{userInfo.email}</Description>
        <br />
        <br />
        <SubTitle>비밀번호</SubTitle>
        <br />
        <div>
          <EditPasswordButton onClick={openModal}>
            비밀번호 수정
          </EditPasswordButton>
          <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <EditInfoPage userInfo={userInfo} />
          </Modal>
        </div>
      </InfoWrapper>
    </>
  );
}

export default withRouter(MyInfo);

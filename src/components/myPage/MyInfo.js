import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import Modal from '../../styles/Modal';
import EditInfoPage from '../modal/user/EditInfoPage';

const InfoWrapper = styled.div`
  width: 100%;
  padding: 20px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  color: #000;
  display: grid;
  grid-template-columns: 1fr;
  position: relative;
  z-index: 2;
  border-radius: 10px;
`;

const Button = styled.button`
  border: solid 1px #dadada;
  margin-bottom: 15px;
  padding: 10px;
`;

function MyInfo({ userInfo }) {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      <InfoWrapper>
        <div>
          <p>E-mail</p>
          <br />
          <div>{userInfo.email}</div>
          <br />
        </div>
        <div>
          <p>Password</p>
          <br />
          <div>
            <Button onClick={openModal}>비밀번호 수정</Button>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
              <EditInfoPage userInfo={userInfo} />
            </Modal>
          </div>
        </div>
      </InfoWrapper>
    </>
  );
}

export default withRouter(MyInfo);

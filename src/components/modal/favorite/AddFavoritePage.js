import React from 'react';
import { withRouter } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo-hooks';
import styled from 'styled-components';
import swal from '@sweetalert/with-react';
import useInput from '../../../hooks/useInput';
import Button from '@material-ui/core/Button';
import { useStylesBtn } from '../../../styles/globalBtnCss';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  form {
    display: flex;
    margin-bottom: 10px;
    flex-direction: column;
  }
  text-align: center;
  font-size: 17px;
  font-family: Gill Sans;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 20px;
  width: 450px;
`;
const Title = styled.div`
  font-size: 30px;
  font-weight: 700;
  color: #212121;
`;
const SubTitle = styled.div`
  font-size: 16px;
  text-align: left;
  color: #212121;
  margin-left: 10px;
`;
const FavoriteInput = styled.input`
  position: flex;
  border: solid 1px #fff;
  width: 400px;
  padding: 10px;
  margin-top: 10px;
  font-size: 16px;
`;

const ADDFAVORITE = gql`
  mutation addFavorite($userId: ID!, $addressId: ID!, $aliasInput: String!) {
    addFavorite(userId: $userId, addressId: $addressId, aliasInput: $aliasInput)
  }
`;

function AddFavoritePage({ userInfo, address }) {
  const aliaseInput = useInput('');
  const [addFavoriteMutation] = useMutation(ADDFAVORITE, {
    variables: {
      userId: userInfo.id,
      addressId: address.id,
      aliasInput: aliaseInput.value,
    },
  });
  const loginClass = useStylesBtn();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (aliaseInput.value == '') {
        swal('별칭을 입력해 주세요.', {
          button: false,
          timer: 1000,
          icon: 'info',
        });
      } else {
        const { data: addFavortie } = await addFavoriteMutation();
        if (addFavortie) {
          swal('찜이 완료되었습니다.', {
            button: false,
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      }
    } catch (error) {
      swal(error, {
        button: false,
        timer: 1000,
        icon: 'info',
      });
    }
  };

  return (
    <>
      <Wrapper>
        <Container>
          <div>
            <Title>검색하신 주소를 등록하시겠습니까?</Title>
            <br />
            <br />
            <a>{address.detail}</a>
            <br />
            <br />
            <br />
            <SubTitle>장소 별칭</SubTitle>
            <form onSubmit={onSubmit}>
              <FavoriteInput
                placeholder='별칭을 입력 해주세요.'
                {...aliaseInput}
              />
              <br />
              <Button type='submit' className={loginClass.modalBtn}>
                찜하기
              </Button>
            </form>
          </div>
        </Container>
      </Wrapper>
    </>
  );
}

export default withRouter(AddFavoritePage);

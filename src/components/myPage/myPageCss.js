import styled from 'styled-components';

export const MyPageTitle = styled.h1`
  font-size: 45px;
  font-weight: 700;
  margin-bottom: 20px;
  text-align: center;
`;

export const MyInfoContainer = styled.div`
  display: grid;
  place-items: center;
  margin-bottom: 70px;
`;

export const MyInfoWrap = styled.div`
  display: grid;
  place-items: center;
  width: 45%;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 16px rgba(0, 0, 0, 0.2);
  background: #e1f5f1;
`;

export const MyInfoTextWrap = styled.div`
  display: grid;
  place-items: center;
`;

export const MyInfoBtnWrap = styled.div`
  width: 120px;
`;

export const MyInfoSubTitle = styled.h1`
  font-size: 30px;
  font-weight: 600;
  font-family: Gill Sans;
  margin-bottom: 15px;
`;

export const MyinfoDesc = styled.p`
  font-size: 20px;
  font-weight: 400;
  font-family: Gill Sans;
  margin-bottom: 30px;
`;

export const EditPasswordButton = styled.button`
  width: 100%;
  border: solid 1px #dadada;
  border-radius: 10px;
  padding: 10px;
  transition: all 0.5s;
  cursor: pointer;
  &:hover {
    background-color: #32e0c4;
    color: white;
    border-radius: 20px;
  }
`;

export const FRContainer = styled.div`
  width: 750px;
`;

export const FRWrapper = styled.div`
  width: 100%;
  border-radius: 5px;
  box-shadow: 0px 5px 16px rgba(0, 0, 0, 0.2);
  background: #e1f5f1;
`;

export const FRTextWrapper = styled.div`
  padding-top: 20px;
  margin-left: 35px;
`;

export const FRTextWrap = styled.div`
  margin-bottom: 10px;
`;

export const FRSubTitle = styled.a`
  font-size: 25px;
`;

export const FRDesc = styled.a`
  opacity: 0.6;
  font-size: 20px;
  font-weight: 400;
`;

export const EditDeleteBtttonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 25px;
  margin-bottom: 10px;
`;

export const EditDeleteBtttonWrap = styled.div`
  width: 60px;
  margin-right: 10px;
`;

export const EditDeleteButton = styled.button`
  width: 100%;
  border: solid 1px #dadada;
  border-radius: 10px;
  margin-right: 15px;
  padding: 5px;
  transition: all 0.5s;
  cursor: pointer;
  &:hover {
    background-color: #32e0c4;
    color: white;
    border-radius: 20px;
  }
`;

export const EditInput = styled.input`
  border: solid 1px #fff;
  margin-left: 35px;
  margin-top: 15px;
  margin-bottom: 15px;
  width: 60%;
  padding: 10px;
`;

export const RatingWrapper = styled.div`
  display: flex;
  justify-content: start;
  margin-bottom: 10px;
`;

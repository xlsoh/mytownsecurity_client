import styled from 'styled-components';

// 배경이미지
const MainBackground = styled.div`
  background-image: url('https://ifh.cc/g/qDtRkS.jpg');
  width: 1920px;
  height: 450px;
  margin-top: -300px;
  z-index: -11;
`;

//검색창, 서비스 소개 가운데 정렬
const MainCenter = styled.div`
  display: table;
  margin-left: auto;
  margin-right: auto;
  z-index: 2;
`;

export { MainBackground, MainCenter };

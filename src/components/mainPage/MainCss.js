import styled from 'styled-components';

export const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 450px;
  positon: relative;
  z-index: 1;
`;
// 배경이미지
export const ImgWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 450px;
  overflow: hidden;
  z-index: -2;
`;

export const ContentWrapper = styled.div`
  z-index: -1;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-item: center;
`;

export const SerchedWtapper = styled.div`
  display: grid;
  place-items: center;
`;

export const MainIMG = styled.img.attrs({
  src: 'https://ifh.cc/g/qDtRkS.jpg',
})`
  width: 100%;
  height: 100%;
`;

export const MainH1 = styled.h1`
  font-size: 40px;
  font-family: 'Do Hyeon', sans-serif;
  text-align: center;
  opacity: 0.5;
`;

export const MainH2 = styled.h2`
  font-size: 50px;
  text-align: center;
  font-family: 'Gill Sans';
  font-weight: bold;
  margin-top: 10px;
`;

export const MainH3 = styled.h3`
  font-size: 30px;
  font-family: 'Noto Sans KR', sans-serif;
  text-align: center;
  margin-top: 15px;
`;

//검색창, 서비스 소개 가운데 정렬
export const MainCenter = styled.div`
  display: table;
  margin-left: auto;
  margin-right: auto;
  z-index: 2;
`;

export const DescContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  margin-bottom: 100px;
  height: 500px;
`;

export const DescImgWrapper = styled.div`
  width: 800px;
  height: 100%;
  overflow: hidden;
`;

export const DescIMG1 = styled.img.attrs({
  src: 'https://ifh.cc/g/aeeix9.png',
})`
  width: 100%;
  height: 100%;
`;

export const DescIMG2 = styled.img.attrs({
  src: 'https://ifh.cc/g/tNenA3.png',
})`
  width: 100%;
  height: 100%;
`;

export const DescIMG3 = styled.img.attrs({
  src: 'https://ifh.cc/g/mkyLP0.png',
})`
  width: 100%;
  height: 100%;
`;

export const DescIMG4 = styled.img.attrs({
  src: 'https://ifh.cc/g/zcLKXH.png',
})`
  width: 100%;
  height: 100%;
`;

export const DescContentWrapepr = styled.div`
  width: 800px;
  padding: 50px;
`;

export const DescTitle = styled.h1`
  font-size: 50px;
  font-weight: bold;
`;

export const DescDetail = styled.p`
  margin-top: 25px;
  font-size: 30px;
  font-family: 'Noto Sans KR', sans-serif;
`;

import React, { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import {
  MainIMG,
  MainContainer,
  ImgWrapper,
  ContentWrapper,
  MainH1,
  MainH2,
  MainH3,
  DescContainer,
  DescImgWrapper,
  DescContentWrapepr,
  DescIMG1,
  DescIMG2,
  DescIMG3,
  DescIMG4,
  DescTitle,
  DescDetail,
} from './MainCss.js';

const MainDetail = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <>
      <MainContainer>
        <ImgWrapper>
          <MainIMG />
        </ImgWrapper>
        <ContentWrapper>
          <MainH1>우리 동네 안전이 궁금하다면,</MainH1>
          <MainH2>MyTownSecurity</MainH2>
          <MainH3>주소를 검색하고 여러분의 의견을 공유해주세요</MainH3>
        </ContentWrapper>
      </MainContainer>
      <DescContainer data-aos='fade-down'>
        <DescImgWrapper>
          <DescIMG1 />
        </DescImgWrapper>
        <DescContentWrapepr>
          <DescTitle>
            주소를 검색하여 경찰서, CCTV의
            <br />
            위치를 확인해보세요.
          </DescTitle>
          <DescDetail>*지도 관련 기능 설명* </DescDetail>
        </DescContentWrapepr>
      </DescContainer>
      <DescContainer data-aos='fade-right'>
        <DescContentWrapepr>
          <DescTitle>
            남겨주신 리뷰를 여러사람들과
            <br />
            공유해보세요.
          </DescTitle>
          <DescDetail>*리뷰 관련 기능 설명* </DescDetail>
        </DescContentWrapepr>
        <DescImgWrapper>
          <DescIMG2 />
        </DescImgWrapper>
      </DescContainer>{' '}
      <DescContainer data-aos='fade-left'>
        <DescImgWrapper>
          <DescIMG3 />
        </DescImgWrapper>
        <DescContentWrapepr>
          <DescTitle>마음에 드는 장소를 찜으로 저장해두세요.</DescTitle>
          <DescDetail>*찜 관련 기능 설명* </DescDetail>
        </DescContentWrapepr>
      </DescContainer>
      <DescContainer data-aos='fade-up'>
        <DescContentWrapepr>
          <DescTitle>
            작성한 리뷰와 찜한 장소들을
            <br />
            마이 페이지에서 관리해보세요.{' '}
          </DescTitle>
          <DescDetail>*마이페이지 관련 기능 설명* </DescDetail>
        </DescContentWrapepr>
        <DescImgWrapper>
          <DescIMG4 />
        </DescImgWrapper>
      </DescContainer>
    </>
  );
};

export default MainDetail;

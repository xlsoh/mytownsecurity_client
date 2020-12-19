import React, { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import Video from '../../videos/mypage.mp4';
import {
  MainIMG,
  MainContainer,
  ImgWrapper,
  ContentWrapper,
  MainTitle,
  MainTextDetail,
  DescContainer,
  DescVideoWrapper,
  DescContentWrapepr,
  DescIMG1,
  DescIMG2,
  DescIMG3,
  DescVideo4,
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
          <MainTitle>
            우리 동네 안전이 궁금해?
            <br />
            응! 나 안전 완전 궁금해!
          </MainTitle>
          <MainTextDetail>
            지금 바로 우리 동네 치안 정보를 검색해 보세요.
          </MainTextDetail>
        </ContentWrapper>
      </MainContainer>
      <DescContainer data-aos='fade-up'>
        <DescVideoWrapper>
          <DescIMG1 />
        </DescVideoWrapper>
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
        <DescVideoWrapper>
          <DescIMG2 />
        </DescVideoWrapper>
      </DescContainer>{' '}
      <DescContainer data-aos='fade-left'>
        <DescVideoWrapper>
          <DescIMG3 />
        </DescVideoWrapper>
        <DescContentWrapepr>
          <DescTitle>마음에 드는 장소를 찜으로 저장해두세요.</DescTitle>
          <DescDetail>*찜 관련 기능 설명* </DescDetail>
        </DescContentWrapepr>
      </DescContainer>
      <DescContainer data-aos='fade-down'>
        <DescContentWrapepr>
          <DescTitle>
            작성한 리뷰와 찜한 장소들을
            <br />
            마이 페이지에서 관리해보세요.{' '}
          </DescTitle>
          <DescDetail>
            ◦ 마이페이지에서 비밀번호를 수정할 수 있습니다.
            <br />
            <br />◦ 작성한 리뷰들과 찜한 목록들을 관리해보세요.
          </DescDetail>
        </DescContentWrapepr>
        <DescVideoWrapper>
          <DescVideo4 autoPlay loop muted src={Video} type='mypage/mp4' />
        </DescVideoWrapper>
      </DescContainer>
    </>
  );
};

export default MainDetail;

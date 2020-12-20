import React, { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import Video1 from '../../videos/search.mp4';
import Video2 from '../../videos/review.mp4';
import Video3 from '../../videos/favorite.mp4';
import Video4 from '../../videos/mypage.mp4';
import {
  MainIMG,
  MainContainer,
  ImgWrapper,
  ContentWrapper,
  MainTitle,
  MainTextDetail,
  MainTextDesc,
  DescContainer,
  DescVideoWrapper,
  DescContentWrapepr,
  DescVideo,
  DescTitle,
  DescDetail,
  DescDetail1,
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
      <MainTextDesc>※ 현재는 서울지역만 서비스를 제공중입니다.</MainTextDesc>
      <DescContainer data-aos='fade-up'>
        <DescVideoWrapper>
          <DescVideo autoPlay loop muted src={Video1} type='serach/mp4' />
        </DescVideoWrapper>
        <DescContentWrapepr>
          <DescTitle>
            주소를 검색하여 경찰서, CCTV 위치를 확인해보세요.
          </DescTitle>
          <DescDetail1>
            ◦ 검색한 주소 주변의 경찰서와 CCTV 위치를 지도에서 확인 할 수
            있습니다.
            <br />
            <br />◦ CCTV, 경찰서 아이콘을 클릭하면 정보를 확인할 수 있습니다.
            <br />
            <br />◦ 검색한 주소의 '구'에 대한 작년도 기준 범죄율을 확인할 수
            있습니다.
          </DescDetail1>
        </DescContentWrapepr>
      </DescContainer>
      <DescContainer data-aos='fade-right'>
        <DescContentWrapepr>
          <DescTitle>
            남겨주신 리뷰를 여러사람들과
            <br />
            공유해보세요.
          </DescTitle>
          <DescDetail>
            ◦ 검색한 주소에 리뷰를 등록하고 리뷰들을 확인할 수 있습니다.
            <br />
            <br />◦ 리뷰 등록시 별점을 통해 만족도를 체크해주세요.
          </DescDetail>
        </DescContentWrapepr>
        <DescVideoWrapper>
          <DescVideo autoPlay loop muted src={Video2} type='review/mp4' />
        </DescVideoWrapper>
      </DescContainer>{' '}
      <DescContainer data-aos='fade-left'>
        <DescVideoWrapper>
          <DescVideo autoPlay loop muted src={Video3} type='favorite/mp4' />
        </DescVideoWrapper>
        <DescContentWrapepr>
          <DescTitle>마음에 드는 장소를 찜해두세요.</DescTitle>
          <DescDetail>
            ◦ 마음에 드는 장소를 자신만의 별칭으로 저장해보세요.
          </DescDetail>
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
          <DescVideo autoPlay loop muted src={Video4} type='mypage/mp4' />
        </DescVideoWrapper>
      </DescContainer>
    </>
  );
};

export default MainDetail;

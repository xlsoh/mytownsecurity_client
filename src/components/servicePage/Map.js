/*global kakao*/
import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import '../../styles/Map.css';
import { cctvs } from '../../data/cctv';
import '../../styles/Map.css';
//import CctvVideo from './CctvVideo';
const { kakao } = window;

const mapstyle = {
  width: '900px',
  height: '700px',
};

const MapWrapper = styled.div`
  display: table;
  position: relative;
  width: 920px;
  height: 720px;
  border: solid;
  border-color: #32e0c4;
`;

function Map({ address, policeStations, favorites, reviews }) {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=6a85830691d46018cca1166f500ad946&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        let el = document.getElementById('map');

        let map = new kakao.maps.Map(el, {
          center: new kakao.maps.LatLng(address.Y, address.X), // 추후 사용자가 입력한 주소의 좌표 변수로 대체 예정
          level: 3,
        });

        //줌 컨트롤러
        var zoomControl = new kakao.maps.ZoomControl();
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

        // kakao.maps.event.addListener(map, 'zoom_changed', function () {
        //   var level = map.getLevel();
        //   var message = '현재 지도 레벨: ' + level;
        //   var levelDiv = document.getElementById('level');
        //   levelDiv.innerHTML = message;
        // });

        // 사용자 찜, 리뷰 마커
        if (favorites) {
          favorites.map(function (favorite) {
            var favorite_imageSrc = 'https://ifh.cc/g/yA2CEy.png',
              favorite_imageSize = new kakao.maps.Size(40, 40),
              favorite_imageOption = { offset: new kakao.maps.Point(30, 65) };

            var favorite_markerImage = new kakao.maps.MarkerImage(
              favorite_imageSrc,
              favorite_imageSize,
              favorite_imageOption
            );
            var favorite_marker = new kakao.maps.Marker({
              position: new kakao.maps.LatLng(
                favorite.postedAt.Y,
                favorite.postedAt.X
              ),
              title: `소재지: ${favorite.postedAt.detail}\n별칭: ${favorite.aliasInput}`,
              image: favorite_markerImage,
            });
            favorite_marker.setMap(map);
          });
        }
        if (reviews) {
          reviews.map(function (review) {
            var review_imageSrc = 'https://ifh.cc/g/kN7yTE.png',
              review_imageSize = new kakao.maps.Size(20, 20),
              review_imageOption = { offset: new kakao.maps.Point(30, 65) };

            var review_markerImage = new kakao.maps.MarkerImage(
              review_imageSrc,
              review_imageSize,
              review_imageOption
            );
            var review_marker = new kakao.maps.Marker({
              position: new kakao.maps.LatLng(
                review.postedAt.Y,
                review.postedAt.X
              ),
              title: `소재지: ${review.postedAt.detail}\n별점: ${review.rating}\n리뷰: ${review.text}`,
              image: review_markerImage,
            });
            review_marker.setMap(map);
          });
        }

        //클러스터러
        var clusterer = new kakao.maps.MarkerClusterer({
          map: map,
          averageCenter: true,
          minLevel: 6,
        });

        //경찰서 마커
        var police_imageSrc = 'https://ifh.cc/g/FWXYgJ.png',
          police_imageSize = new kakao.maps.Size(55, 60),
          police_imageOption = { offset: new kakao.maps.Point(30, 65) };

        var policeStation_markerImage = new kakao.maps.MarkerImage(
          police_imageSrc,
          police_imageSize,
          police_imageOption
        );

        policeStations.map(function (policeStation) {
          var police_marker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(policeStation.Y, policeStation.X),
            title: policeStation.stationName,
            image: policeStation_markerImage,
          });
          police_marker.setMap(map);

          //오버레이
          //   var content = document.createElement('div');
          //   content.className = 'content';
          //   content.innerHTML =
          //     `<div class="overlaybox">` +
          //     `<div class="boxtitle">` +
          //     `${policeStation.stationName}` +
          //     `<div class ="cctv"></div>` +
          //     `</div>` +
          //     `</div>`;

          //   var closeBtn = document.createElement('button');
          //   closeBtn.className = 'close';
          //   closeBtn.innerHTML = `X`;
          //   closeBtn.onclick = function () {
          //     overlay.setMap(null);
          //   };

          //   content.appendChild(closeBtn);

          //   var overlay = new kakao.maps.CustomOverlay({
          //     position: police_marker.getPosition(),
          //     content: content,
          //     xAnchor: 0.33,
          //     yAnchor: 1.19,
          //     clickable: true,
          //   });
          //   kakao.maps.event.addListener(police_marker, 'click', function () {
          //     overlay.setMap(map);
          //   });
        });

        //cctv 마커
        var cctv_imageSrc = 'https://ifh.cc/g/HEqaQd.png',
          cctv_imageOption = { offset: new kakao.maps.Point(30, 65) };

        var cctv_markers = cctvs.map(function (cctv) {
          if (cctv.카메라대수 >= 1 && cctv.카메라대수 < 3) {
            let cctv_imageSize = new kakao.maps.Size(20, 20);
            let cctv_markerImage = new kakao.maps.MarkerImage(
              cctv_imageSrc,
              cctv_imageSize,
              cctv_imageOption
            );
            if (
              cctv.소재지도로명주소 === '' ||
              cctv.소재지도로명주소 === '없음'
            ) {
              return new kakao.maps.Marker({
                position: new kakao.maps.LatLng(cctv.위도, cctv.경도),
                title: `카메라대수: ${cctv.카메라대수}\n설치목적구분: ${cctv.설치목적구분}\n소재지: 등록되지 않음`,
                image: cctv_markerImage,
              });
            } else {
              return new kakao.maps.Marker({
                position: new kakao.maps.LatLng(cctv.위도, cctv.경도),
                title: `카메라대수: ${cctv.카메라대수}\n설치목적구분: ${cctv.설치목적구분}\n소재지: ${cctv.소재지도로명주소}`,
                image: cctv_markerImage,
              });
            }
          } else if (cctv.카메라대수 >= 3 && cctv.카메라대수 < 6) {
            let cctv_imageSize = new kakao.maps.Size(35, 35);
            let cctv_markerImage = new kakao.maps.MarkerImage(
              cctv_imageSrc,
              cctv_imageSize,
              cctv_imageOption
            );
            if (
              cctv.소재지도로명주소 === '' ||
              cctv.소재지도로명주소 === '없음'
            ) {
              return new kakao.maps.Marker({
                position: new kakao.maps.LatLng(cctv.위도, cctv.경도),
                title: `카메라대수: ${cctv.카메라대수}\n설치목적구분: ${cctv.설치목적구분}\n소재지: 등록되지 않음`,
                image: cctv_markerImage,
              });
            } else {
              return new kakao.maps.Marker({
                position: new kakao.maps.LatLng(cctv.위도, cctv.경도),
                title: `카메라대수: ${cctv.카메라대수}\n설치목적구분: ${cctv.설치목적구분}\n소재지: ${cctv.소재지도로명주소}`,
                image: cctv_markerImage,
              });
            }
          } else if (cctv.카메라대수 >= 6 && cctv.카메라대수 < 10) {
            let cctv_imageSize = new kakao.maps.Size(50, 50);
            let cctv_markerImage = new kakao.maps.MarkerImage(
              cctv_imageSrc,
              cctv_imageSize,
              cctv_imageOption
            );
            if (
              cctv.소재지도로명주소 === '' ||
              cctv.소재지도로명주소 === '없음'
            ) {
              return new kakao.maps.Marker({
                position: new kakao.maps.LatLng(cctv.위도, cctv.경도),
                title: `카메라대수: ${cctv.카메라대수}\n설치목적구분: ${cctv.설치목적구분}\n소재지: 등록되지 않음`,
                image: cctv_markerImage,
              });
            } else {
              return new kakao.maps.Marker({
                position: new kakao.maps.LatLng(cctv.위도, cctv.경도),
                title: `카메라대수: ${cctv.카메라대수}\n설치목적구분: ${cctv.설치목적구분}\n소재지: ${cctv.소재지도로명주소}`,
                image: cctv_markerImage,
              });
            }
          } else if (cctv.카메라대수 >= 10 && cctv.카메라대수 < 20) {
            let cctv_imageSize = new kakao.maps.Size(60, 60);
            let cctv_markerImage = new kakao.maps.MarkerImage(
              cctv_imageSrc,
              cctv_imageSize,
              cctv_imageOption
            );
            if (
              cctv.소재지도로명주소 === '' ||
              cctv.소재지도로명주소 === '없음'
            ) {
              return new kakao.maps.Marker({
                position: new kakao.maps.LatLng(cctv.위도, cctv.경도),
                title: `카메라대수: ${cctv.카메라대수}\n설치목적구분: ${cctv.설치목적구분}\n소재지: 등록되지 않음`,
                image: cctv_markerImage,
              });
            } else {
              return new kakao.maps.Marker({
                position: new kakao.maps.LatLng(cctv.위도, cctv.경도),
                title: `카메라대수: ${cctv.카메라대수}\n설치목적구분: ${cctv.설치목적구분}\n소재지: ${cctv.소재지도로명주소}`,
                image: cctv_markerImage,
              });
            }
          } else {
            let cctv_imageSize = new kakao.maps.Size(70, 70);
            let cctv_markerImage = new kakao.maps.MarkerImage(
              cctv_imageSrc,
              cctv_imageSize,
              cctv_imageOption
            );
            if (
              cctv.소재지도로명주소 === '' ||
              cctv.소재지도로명주소 === '없음'
            ) {
              return new kakao.maps.Marker({
                position: new kakao.maps.LatLng(cctv.위도, cctv.경도),
                title: `카메라대수: ${cctv.카메라대수}\n설치목적구분: ${cctv.설치목적구분}\n소재지: 등록되지 않음`,
                image: cctv_markerImage,
              });
            } else {
              return new kakao.maps.Marker({
                position: new kakao.maps.LatLng(cctv.위도, cctv.경도),
                title: `카메라대수: ${cctv.카메라대수}\n설치목적구분: ${cctv.설치목적구분}\n소재지: ${cctv.소재지도로명주소}`,
                image: cctv_markerImage,
              });
            }
          }
        });
        clusterer.addMarkers(cctv_markers);
      });
    };
  });

  return (
    <div>
      <MapWrapper>
        <div id='map' style={mapstyle}></div>
      </MapWrapper>
      {/* <CctvVideo /> */}
    </div>
  );
}
export default withRouter(Map);

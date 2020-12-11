/*global kakao*/
import { useEffect } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import '../../styles/Map.css';
import { policeStations } from '../../data/policeStation';
const { kakao } = window;

function Map({ address }) {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=6a85830691d46018cca1166f500ad946&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        let el = document.getElementById('map');
        let map = new kakao.maps.Map(el, {
          center: new kakao.maps.LatLng(address.longitudeY, address.latitudeX), // 추후 사용자가 입력한 주소의 좌표 변수로 대체 예정
        });

        //마커
        var imageSrc =
            'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png',
          imageSize = new kakao.maps.Size(55, 60),
          imageOption = { offset: new kakao.maps.Point(30, 65) };

        var markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        );

        policeStations.forEach(function (policeStation) {
          var marker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(policeStation.Y, policeStation.X),
            title: policeStation.stationName,
            image: markerImage,
          });
          marker.setMap(map);

          //오버레이
          var closeOverlay = function () {
            overlay.setMap(null);
          };

          var content = document.createElement('div');
          content.className = 'content';
          content.innerHTML =
            `<div class="overlaybox">` +
            `<div class="boxtitle">` +
            `${policeStation.stationName}` +
            `<div class ="cctv"></div>` +
            `</div>` +
            `</div>`;

          var closeBtn = document.createElement('button');
          closeBtn.className = 'close';
          closeBtn.innerHTML = `X`;
          closeBtn.onclick = function () {
            overlay.setMap(null);
          };
          content.appendChild(closeBtn);

          var overlay = new kakao.maps.CustomOverlay({
            position: marker.getPosition(),
            content: content,
            xAnchor: 0.33,
            yAnchor: 1.19,
            clickable: true,
          });
          kakao.maps.event.addListener(marker, 'click', function () {
            overlay.setMap(map);
          });
        });
      });
    };
  });

  const mapstyle = {
    // width: '1920px',
    // height: '1080px',
    width: '800px',
    height: '500px',
  };

  const MapWrapper = styled.div`
    position: initial;
    width: 800px;
    height: 500px;
    box-shadow: 0 5px 16px rgba(0, 0, 0, 0.3);
    z-index: 1;
  `;

  return (
    <div>
      <MapWrapper>
        <div id='map' style={mapstyle}></div>
      </MapWrapper>
    </div>
  );
}
export default withRouter(Map);

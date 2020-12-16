import { useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Redirect, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import '../../styles/Map.css';
import { policeStations } from '../../data/policeStation';
import { cctvs } from '../../data/cctv';
import { DOMParser } from 'xmldom';
const { kakao } = window;
const CCTV_VIDEO_API = '1607779878220';
const MinY = 37.425943;
const MaxY = 37.701609;
const MinX = 126.764886;
const MaxX = 127.182244;

const minY = 37.413294;
const maxY = 37.715133;
const minX = 126.734086;
const maxX = 127.269311;

//http://openapi.its.go.kr:8081/api/NCCTVInfo?key=1607779878220&ReqType=2&MinX=126.734086&MaxX=127.269311&MinY=37.413294&MaxY=37.715133&type=its&CctvType=1
//http://openapi.its.go.kr:8081/api/NCCTVInfo?key=1607779878220&ReqType=2&MinX=126.764886&MaxX=127.182244&MinY=37.425943&MaxY=37.701609&CctvType=1
//const TEST_URL = `http://openapi.its.go.kr:8081/api/NCCTVInfo?key=${CCTV_VIDEO_API}&ReqType=2&MinX=${MinX}&MaxX=${MaxX}&MinY=${MinY}&MaxY=${MaxY}&CctvType=1`;
const TEST_URL = `http://openapi.its.go.kr:8081/api/NCCTVInfo?key=${CCTV_VIDEO_API}&ReqType=2&MinX=${minX}&MaxX=${maxX}&MinY=${minY}&MaxY=${maxY}&type=its&CctvType=1`;
function CctvVideo({ address }) {
  const [cctvList, setCctvList] = useState();

  useEffect(() => {
    fetchCctvVideo()
      .then((res) => {
        console.log(res);
        let xmlDoc = new DOMParser().parseFromString(res, 'text/xml');
        let x = xmlDoc.getElementsByTagName('data');
        console.log(x);
        for (let i = 0; i < x.length; i++) {
          let cctvUrl = x[i].getElementsByTagName('cctvurl')[0].firstChild.data;
          let cctvX = x[i].getElementsByTagName('coordx')[0].firstChild.data;
          let cctvY = x[i].getElementsByTagName('coordy')[0].firstChild.data;

          console.log(cctvUrl);
          console.log(cctvX);
          console.log(cctvY);
        }
        return xmlDoc;
      })
      .catch((error) => console.log(error));
  });

  const fetchCctvVideo = async () => {
    // const resCCTV = await axios.get('http://openapi.its.go.kr/api/NCCTVInfo', {
    //   // headers: {
    //   //   'Content-Type': 'application/xml; charset=utf-8',
    //   //   // "Access-Control-Allow-Origin": "*",
    //   // },
    //   params: {
    //     key: 1607779878220,
    //     ReqType: 2,
    //     type: 'ex',
    //     CctvType: 1,
    //     MinX,
    //     MaxX,
    //     MinY,
    //     MaxY,
    //   },
    // });

    const testRes = await axios.get(TEST_URL);

    return testRes.data;
  };
  return (
    <>
      {cctvList ? (
        <div>
          {cctvList.map((item) => (
            <span>item</span>
          ))}
        </div>
      ) : (
        console.log(cctvList)
      )}
    </>
  );
}
export default withRouter(CctvVideo);

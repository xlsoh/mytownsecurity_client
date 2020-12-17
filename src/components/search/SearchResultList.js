import { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Pagination } from '@material-ui/lab';
import { Box, List, ListItem } from '@chakra-ui/react';

import UsePagination from '../../hooks/Pagenation';
import { API_KEY_LOCATION } from '../../config';
import proj4 from 'proj4';
import axios from 'axios';

function SearchResultList({ searchResults, handleChecked, setLocationXY }) {
  const [checkedAddress, setCheckdAddress] = useState('');
  const [addrObj, setAddrObj] = useState();
  const [page, setPage] = useState(1);
  const PER_PAGE = 5;
  const count = Math.ceil(searchResults.length / PER_PAGE);
  const _DATA = UsePagination(searchResults, PER_PAGE);
  const handlePage = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  const transformation = (x, y) => {
    let firstProjection =
      '+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs'; //from - utmK
    let secondProjection = '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs'; //to - WG84
    let transRes = proj4(firstProjection, secondProjection, [x, y]);

    let latitudeX = transRes[0];
    let longitudeY = transRes[1];
    setLocationXY({ latitudeX, longitudeY });
  };

  useEffect(async () => {
    const fetchRes = await fetchLocation(addrObj);
    if (fetchRes) {
      const { entX, entY } = fetchRes.data.results.juso[0];
      let y = parseFloat(entY);
      let x = parseFloat(entX);
      console.log(y, x);
      transformation(x, y);
    }
  }, [addrObj]);

  // 좌표 API
  const fetchLocation = async (addrObj) => {
    if (addrObj) {
      const { admCd, rnMgtSn, udrtYn, buldMnnm, buldSlno } = addrObj;
      const resLocation = await axios(
        'https://www.juso.go.kr/addrlink/addrCoordApi.do',
        {
          params: {
            confmKey: API_KEY_LOCATION,
            admCd,
            rnMgtSn,
            udrtYn,
            buldSlno,
            buldMnnm,
            resultType: 'json',
          },
        }
      );
      return resLocation;
    } else return;
  };

  return (
    <div>
      <h2>선택주소: {checkedAddress}</h2>

      <Box p='5'>
        <List p='10' pt='3' spacing={5}>
          {_DATA.currentData().map((elem, idx) => (
            <ListItem key={idx}>
              {console.log(elem.gitroadAddr)}
              <input
                type='radio'
                checked={checkedAddress === elem.roadAddr}
                value={elem.roadAddr}
                onChange={(e) => {
                  setCheckdAddress(e.target.value);
                  setAddrObj(elem);
                }}
              />
              &nbsp; {elem.roadAddr}
              <div>&emsp; [지번] {elem.jibunAddr}</div>
            </ListItem>
          ))}
        </List>
        <button
          onClick={() => {
            handleChecked(addrObj);
          }}
        >
          선택
        </button>
        <Pagination
          count={count}
          size='small'
          page={page}
          variant='outlined'
          shape='rounded'
          onChange={handlePage}
        />
      </Box>
    </div>
  );
}

export default withRouter(SearchResultList);

import { useState } from 'react';

import { withRouter } from 'react-router-dom';
import { Pagination } from '@material-ui/lab';
import { Box, List, ListItem } from '@chakra-ui/react';
import UsePagination from './Pagenation';

function MainSearchResult({ searchResults, handleChecked }) {
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

  return (
    <div>
      {console.log(searchResults)}
      <h2>선택주소: {checkedAddress}</h2>

      <Box p="5">
        <List p="10" pt="3" spacing={5}>
          {_DATA.currentData().map((elem, idx) => (
            <ListItem key={idx}>
              {console.log(elem.roadAddr)}
              <input
                type="radio"
                checked={checkedAddress === elem.roadAddr}
                value={elem.roadAddr}
                onChange={(e) => {
                  setCheckdAddress(e.target.value);
                  setAddrObj(elem);
                }}
              />
              {elem.roadAddr}
              <div>&emsp; 지번주소 | {elem.jibunAddr}</div>
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
          size="small"
          page={page}
          variant="outlined"
          shape="rounded"
          onChange={handlePage}
        />
      </Box>
    </div>
  );
}

export default withRouter(MainSearchResult);

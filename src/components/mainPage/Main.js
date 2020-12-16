import { withRouter, useHistory } from 'react-router-dom';
import MainHeader from './MainHeader';
import SearchInput from '../search/SearchInput';
import './main.css';
import '../search/search.css';

function Main({ setAddressId, isToken, setIsToken, userInfo, setUserInfo }) {
  return (
    <>
      <MainHeader
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        isToken={isToken}
        setIsToken={setIsToken}
      />
      <SearchInput setAddressId={setAddressId} />
      <div id='search_background'></div>
    </>
  );
}
export default withRouter(Main);

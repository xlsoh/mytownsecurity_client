import { withRouter, useHistory } from 'react-router-dom';
import MainHeader from './Header';
import SearchInput from '../search/SearchInput';
import MainDetail from './MainDetail';
import '../../styles/font.css';
import { SerchedWrapper } from './MainCss.js';
//import Loading from '../Lodaing';
function Main({
  setAddressId,
  isToken,
  setIsToken,
  userInfo,
  setUserInfo,
  setSearchedAddress,
  searchedAddress,
}) {
  return (
    <>
      <MainHeader
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        isToken={isToken}
        setIsToken={setIsToken}
      />
      <SerchedWrapper>
        <SearchInput
          setAddressId={setAddressId}
          setSearchedAddress={setSearchedAddress}
          searchedAddress={searchedAddress}
        />
      </SerchedWrapper>
      <MainDetail />
      {/* <Loading></Loading> */}
    </>
  );
}
export default withRouter(Main);

import { withRouter, useHistory } from 'react-router-dom';
import MainHeader from './MainHeader';
import SearchInput from '../search/SearchInput';
function Main({ setAddressId, isToken, setIsToken, userInfo, setUserInfo }) {
  return (
    <div>
      <MainHeader
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        isToken={isToken}
        setIsToken={setIsToken}
      />
      <SearchInput setAddressId={setAddressId} />
    </div>
  );
}
export default withRouter(Main);

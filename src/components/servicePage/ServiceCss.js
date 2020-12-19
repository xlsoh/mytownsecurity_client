import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

// Service.js ----------------------------------------------------
export const MiddleTemplate = styled.div`
  display: flex;
  margin: 0 auto;
  flex-direction: row;
  justify-content: center;
`;

export const RightTemplate = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
`;

//CrimeRate.js ----------------------------------------------------
export const Container = styled.div`
  position: relative;
  // top: 200px;
  // left: 30px;
`;

export const CrimeWrapper = styled.div`
  width: 130px;

  border: solid;
  border-width: 2px;
  border-color: #0d7377;
  border-radius: 5px;

  color: #eeeeee;
  display: grid;
  grid-template-columns: 1fr;
  position: relative;
  z-index: 2;
  background: #0d7377;
  //padding: 5px;
  margin: 20px 5px 5px 5px;
  float: left;
`;

export const CrimeDiv = styled.div`
  margin: 23px 10px;
  text-align: center;
`;
export const CrimP = styled.p`
  font-size: 22px;
  padding-top: 1px;
`;
export const CrimeNum = styled.span`
  font-size: 40px;
  color: #ff926b;
`;

//Map.js ----------------------------------------------------
export const mapstyle = {
  width: '900px',
  height: '700px',
};

export const MapWrapper = styled.div`
  display: table;
  position: relative;
  width: 920px;
  height: 720px;
  border: solid;
  border-width: 2px;
  border-color: #0d7377;
`;

// AddFavorite.js --------------------------------------------
export const FavContainer = styled.div`
  position: relative;
  left: -5px;
`;
// export const Button = styled.button`
//   min-width: 50px;
//   padding: 10px 20px;
//   border-radius: 4px;
//   border: none;
//   background: #ffffff;
//   color: red;
//   font-size: 75px;
//   cursor: pointer;
// `;

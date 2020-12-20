import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import {
  Container,
  CrimeWrapper,
  CrimeDiv,
  CrimP,
  CrimeNum,
} from './ServiceCss';

import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
function CrimeRate({ crime }) {
  return (
    <>
      <Container>
        <CrimeWrapper>
          <CrimeDiv>
            <WarningRoundedIcon
              fontSize='small'
              style={{ float: 'left', marginLeft: 10, marginRight: -10 }}
            />
            <CrimP>살인</CrimP>
            <br />
            <CrimeNum>{crime.murder}</CrimeNum>&nbsp;건
          </CrimeDiv>
          <CrimeDiv>
            <WarningRoundedIcon
              fontSize='small'
              style={{ float: 'left', marginLeft: 10, marginRight: -10 }}
            />
            <CrimP>강도</CrimP>
            <br />
            <CrimeNum>{crime.robbery}</CrimeNum>&nbsp;건
          </CrimeDiv>
          <CrimeDiv>
            <WarningRoundedIcon
              fontSize='small'
              style={{ float: 'left', marginLeft: 10, marginRight: -10 }}
            />
            <CrimP>
              강간 <br />
              강제추행
            </CrimP>
            <br />
            <CrimeNum>{crime.rape}</CrimeNum>&nbsp;건
          </CrimeDiv>
          <CrimeDiv>
            <WarningRoundedIcon
              fontSize='small'
              style={{ float: 'left', marginLeft: 10, marginRight: -10 }}
            />
            <CrimP>절도</CrimP>
            <br />
            <CrimeNum>{crime.theft}</CrimeNum>&nbsp;건
          </CrimeDiv>
          <CrimeDiv>
            <WarningRoundedIcon
              fontSize='small'
              style={{ float: 'left', marginLeft: 10, marginRight: -10 }}
            />
            <CrimP>폭력</CrimP>
            <br />
            <CrimeNum>{crime.violence}</CrimeNum>&nbsp;건
          </CrimeDiv>
        </CrimeWrapper>
      </Container>
    </>
  );
}

export default withRouter(CrimeRate);

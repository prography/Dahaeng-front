import React from 'react';
import styled from 'styled-components';
import backIcon from '../../assets/icon/backicon.png';

const SubTitleBlock = styled.div`
  position: fixed;
  width: 100%;
  background: white;
  margin: 0 auto;
  //padding-top: 1rem;
`;

const BackButton = styled.div`
  position: fixed;
  top: 1.4rem;
  left: 0.8rem;
  width: 8px;
`;

const BackButtonImg = styled.img`
  width: 100%;
  transform: rotate(180deg);
`;

//styled(Responsive) ?
const Wrapper = styled.div`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;


const TitleText = styled.div`
  font-size: 1.125rem;
  font-weight: 800;
  letter-spacing: 2px;
  text-align: center;
  margin: 0 auto;
  .title {
    font-size: 1.125rem;
    font-weight: 800;
    letter-spacing: 2px;
    color: #212121;
  }
`;

const SubTitle = ({ title, back, backPage }) => {
  return (
    <SubTitleBlock>
      {back ? (
        <BackButton onClick={backPage}>
          <BackButtonImg src={backIcon} alt="" />
        </BackButton>
      ) : null}
      <Wrapper>
        <TitleText>{title}</TitleText>
      </Wrapper>
    </SubTitleBlock>
  );
};

export default SubTitle;

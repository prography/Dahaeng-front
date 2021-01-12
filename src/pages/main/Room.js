import React from 'react';
import styled from 'styled-components';
import MainJoraeng from '../../components/Joraeng/MainJoraeng';
import { useSelector } from 'react-redux';

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 1024px;
  padding-top: 5rem;
`;
const Character = styled.div`
  min-width: 95px;
  width: 30%;
  z-index: 2;
  margin: 0 auto;
  bottom: -20px;
  position: relative;
`;
const Background = styled.div`
  z-index: 1;
  width: 100%;
  margin: 0 auto;
`;
const BackgroundImg = styled.img`
  width: 100%;
`;
const Etc = styled.div`
  z-index: 3;
  width: 17%;
  margin: 0 auto;
  position: relative;
  bottom: 130px;
  left: 50px;
`;
const EtcImg = styled.img`
  width: 100%;
`;

//hasItems: 서버에서 받아온 실제 착용한 아이템, applyItems: 옷장에서 테스팅해볼 아이템
const Room = ({ hasItems, applyItems, closet }) => {
  const user = useSelector((state) => state.user.user);
  const colors = useSelector((state) => state.user.colors);
  const wornItems = useSelector((state) => state.user.jorang_items);
  console.log(hasItems);
  console.log(applyItems);
  console.log(wornItems);
  return (
    <Wrapper>
      <Character>
        <MainJoraeng
          age={user.jorang_status}
          mainColor={
            closet && applyItems && applyItems.item_type === 'jorang_color'
              ? `#${applyItems.item_detail}`
              : `#${colors[0]}`
          }
          thirdColor={
            closet && applyItems && applyItems.item_type === 'jorang_color'
              ? `#${
                  applyItems.item_detail === 'A26C8F'
                    ? 'EDE3EB'
                    : applyItems.item_detail === 'F8DB5C'
                    ? 'FEF8E1'
                    : applyItems.item_detail === 'FF714D'
                    ? 'FAE3DC'
                    : applyItems.item_detail === '73A38F'
                    ? 'E5EEEB'
                    : applyItems.item_detail === '5CA1D2'
                    ? 'E1EEF7'
                    : ''
                }`
              : `#${colors[2]}`
          }
        />
      </Character>
      <Background>
        {closet &&
        (applyItems.length === 0 || applyItems.item_type !== 'background') &&
        wornItems &&
        wornItems.background ? (
          <BackgroundImg
            src={require(`../../assets/item/background/${
              wornItems && wornItems.background
            }.png`)}
            alt=""
          />
        ) : closet && applyItems && applyItems.item_type === 'background' ? (
          <BackgroundImg
            src={require(`../../assets/item/background/${
              applyItems && applyItems.item_detail
            }.png`)}
            alt=""
          />
        ) : hasItems && hasItems.background ? (
          <BackgroundImg
            src={require(`../../assets/item/background/${hasItems.background}.png`)}
            alt=""
          />
        ) : (
          <BackgroundImg
            src={require(`../../assets/item/background/background-ground.png`)}
            alt=""
          />
        )}
      </Background>
      <Etc>
        {closet &&
        (applyItems.length === 0 || applyItems.item_type !== 'background') &&
        wornItems &&
        wornItems.etc ? (
          <BackgroundImg
            src={require(`../../assets/item/etc/${
              wornItems && wornItems.etc
            }.png`)}
            alt=""
          />
        ) : closet && applyItems && applyItems.item_type === 'etc' ? (
          <EtcImg
            src={require(`../../assets/item/etc/${applyItems.item_detail}.png`)}
            alt=""
          />
        ) : hasItems && hasItems.etc ? (
          <EtcImg
            src={require(`../../assets/item/etc/${hasItems.etc}.png`)}
            alt=""
          />
        ) : null}
      </Etc>
    </Wrapper>
  );
};

export default Room;

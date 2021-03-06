import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecords, searchRecords } from 'store/box';
import styled from 'styled-components';
import FeedBox from './FeedBox.js';
import ThreadBox from './ThreadBox.js';
import Slider from '../../components/Slider';
import searchIcon from 'assets/icon/search.png';
import feed from 'assets/icon/feed.png';
import thread from 'assets/icon/thread.png';
import Responsive from '../../components/common/Responsive.js';

import Modal from '../../components/Modal';
import { deleteRecord } from '../../store/box.js';

const SortingBar = styled.div`
  margin: 0 auto;
  margin-top: 2rem;
  background-color: #ffffff;
  height: 2rem;
`;

const SortingBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ListModeIcon = styled.div`
  width: 1.5rem;
  height: 1rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  height: calc(100vh - 5rem);
  overflow-y: auto;

  @media screen and (max-width: 480px) {
    padding: 10px;
  }
`;

const SearchContent = styled.div`
  height: calc(100vh - 12rem);
  overflow-y: auto;
  padding: 10px;
`;

const SearchWrapper = styled.div`
  background-color: #ffffff;
  margin: 0 auto;
`;

const SearchBar = styled.div`
  width: calc(100% - 0.5rem - 20px);
  margin: 0 auto;
  height: 3rem;
  border: 2px solid #212121;
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.2);
  display: flex;
`;

const SearchIconWrapper = styled.div`
  width: 3rem;
  height: 3rem;
  overflow: hidden;
`;
const SearchIcon = styled.div`
  width: 3rem;
  height: 3rem;
  padding: 14px 12px 8px 12px;
  background: transparent;
  /* cursor: pointer; */
`;

const SearchText = styled.input.attrs((props) => ({
  type: 'text',
  placeholder: '키워드로 내 행복을 검색하세요.',
}))`
  width: 80%;
  padding: 1%;
  border: none;

  &::placeholder {
    color: var(--text-third);
  }
`;

const SearchResult = styled.div`
  font-size: 14px;
  text-align: center;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  color: #212121;
`;

const SearchKeyText = styled.span`
  font-size: 14px;
  color: ${(props) => props.mainColor};
`;

const ModalTitle = styled.div`
  font-size: 18px;
  margin-top: 1rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const ModalButtonField = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0.5rem;
`;

const ModalButtonLeft = styled.button`
  box-sizing: border-box;
  flex: 1;
  margin-right: 0.5rem;
  border: none;
  height: 30px;
  background: ${(props) => props.mainColor};
  color: #ffffff;
`;

const ModalButtonRight = styled.button`
  box-sizing: border-box;
  flex: 1;
  margin-left: 0.5rem;
  border: none;
  height: 30px;
  background: ${(props) => props.thirdColor};
  color: ${(props) => props.mainColor};
`;

const ModalButton = styled.button`
  box-sizing: border-box;
  width: 130px;
  margin: 0 auto;
  border: none;
  height: 30px;
  background: ${(props) => props.mainColor};
  color: #ffffff;
`;

const ModalText = styled.div`
  font-size: 14px;
  text-align: center;
  padding-bottom: 0.5rem;
  color: #212121;
`;

const Box = ({ history }) => {
  const [sortingType, setSortingType] = useState('feed'); //search, feed, thread

  const records = useSelector((state) => state.box.records);
  const searchs = useSelector((state) => state.box.searchs);
  const colors = useSelector((state) => state.user.colors);

  const dispatch = useDispatch();

  const [input, setInput] = useState('');
  const search = () => {
    console.log(input);
    dispatch(searchRecords('detail', input));
  };

  const Delete = (id) => {
    dispatch(getRecords());
    if (records[0].id === id) {
      //마지막 기록은 지울 수 없어요
      console.log('삭제 실패');
      setDeleteFailModal();
    } else {
      dispatch(deleteRecord(id));
    }

    // history.push('/box');
    setOpenModal(!openModal);
  };

  const [openModal, setOpenModal] = useState(false);
  const [recordId, setRecordId] = useState('');
  const setModal = (id) => {
    setOpenModal(!openModal);
    setRecordId(id);
  };

  const [openDeleteFailModal, setOpenDeleteFailModal] = useState(false);
  const setDeleteFailModal = () => {
    setOpenDeleteFailModal(!openDeleteFailModal);
  };

  const onEnter = async (e) => {
    if (e.key === 'Enter') {
      const enterValue = e.target.value;
      if (enterValue.trim()) {
        console.log(enterValue);
        setInput(e.target.value);
        await search();
      }
    }
  };

  const onChange = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    dispatch(getRecords());
  }, [dispatch]);

  console.log(sortingType);

  return (
    <>
      <Responsive style={{ paddingTop: '4vh' }}>
        <Slider history={history} />
        <SortingBar>
          <SortingBox>
            <ListModeIcon onClick={() => setSortingType('search')}>
              <img
                alt=""
                src={searchIcon}
                style={{
                  width: '1rem',
                  height: '1rem',
                  objectFit: 'scale-down',
                }}
              ></img>
            </ListModeIcon>
            <ListModeIcon onClick={() => setSortingType('feed')}>
              <img
                alt=""
                src={feed}
                style={{
                  width: '1rem',
                  height: '1rem',
                  objectFit: 'scale-down',
                }}
              ></img>
            </ListModeIcon>
            <ListModeIcon onClick={() => setSortingType('thread')}>
              <img
                alt=""
                src={thread}
                style={{
                  width: '1rem',
                  height: '1rem',
                  objectFit: 'scale-down',
                }}
              ></img>
            </ListModeIcon>
          </SortingBox>
        </SortingBar>

        {sortingType === 'search' ? (
          <SearchWrapper>
            <SearchBar>
              <SearchIconWrapper>
                <SearchIcon>
                  <img
                    alt=""
                    src={searchIcon}
                    style={{
                      width: '20px',
                      objectFit: 'scale-down',
                    }}
                  />
                </SearchIcon>
              </SearchIconWrapper>
              <SearchText onChange={onChange} onKeyPress={onEnter} />
              {/* <SearchButton onChange={onChange} onClick={() => search(input)}>
                {'검색'}
              </SearchButton> */}
            </SearchBar>
            {searchs ? (
              searchs === null ? (
                <SearchResult>{`검색 결과가 없습니다 :(`}</SearchResult>
              ) : (
                <SearchResult>
                  {`총 `}
                  <SearchKeyText mainColor={`#${colors && colors[0]}`}>
                    {searchs.length}
                  </SearchKeyText>
                  {` 개의 행복을 찾았습니다!`}
                </SearchResult>
              )
            ) : null}
          </SearchWrapper>
        ) : null}

        {/* 기록 결과 나오는 부분 */}
        {sortingType === 'thread' ? (
          <Content>
            {records &&
              records.map((record, index) => {
                return (
                  <ThreadBox
                    record={record}
                    key={index}
                    setModal={setModal}
                  ></ThreadBox>
                );
              })}{' '}
          </Content>
        ) : sortingType === 'feed' ? (
          <Content>
            {records &&
              records.map((record, index) => {
                return (
                  <FeedBox
                    record={record}
                    key={index}
                    setModal={setModal}
                  ></FeedBox>
                );
              })}
          </Content>
        ) : sortingType === 'search' ? (
          <SearchContent>
            {searchs &&
              searchs.map((record, index) => {
                return (
                  <ThreadBox
                    record={record}
                    key={index}
                    // input={input}
                  ></ThreadBox>
                );
              })}
          </SearchContent>
        ) : (
          <ListModeIcon></ListModeIcon>
        )}

        {/* 삭제 팝업 */}
        <Modal
          className="popup"
          openModal={openModal}
          setModal={setModal}
          title={<ModalTitle>{`행복 기록을 정말 삭제하시겠어요?`}</ModalTitle>}
          content={
            <>
              <ModalText>{`한번 삭제한 행복은 되돌릴 수 없습니다 :( `}</ModalText>
            </>
          }
          button={
            <ModalButtonField>
              <ModalButtonLeft
                onClick={() => Delete(recordId)}
                mainColor={`#${colors && colors[0]}`}
              >
                {'확인'}
              </ModalButtonLeft>
              <ModalButtonRight
                onClick={setModal}
                mainColor={`#${colors && colors[0]}`}
                thirdColor={`#${colors && colors[2]}`}
              >
                {'취소'}
              </ModalButtonRight>
            </ModalButtonField>
          }
        ></Modal>

        {/* 삭제 실패 팝업 */}
        <Modal
          className="popup"
          openModal={openDeleteFailModal}
          setModal={setDeleteFailModal}
          title={<ModalTitle>{`행복 기록을 삭제할 수 없습니다 :(`}</ModalTitle>}
          content={
            <>
              <ModalText>{`가장 마지막 행복 기록은 삭제할 수 없어요`}</ModalText>
              <ModalText>{`이 행복까지 사랑해주세요`}</ModalText>
            </>
          }
          button={
            <ModalButtonField>
              <ModalButton
                onClick={setDeleteFailModal}
                mainColor={`#${colors && colors[0]}`}
              >
                {'확인'}
              </ModalButton>
            </ModalButtonField>
          }
        ></Modal>
      </Responsive>
    </>
  );
};

export default Box;

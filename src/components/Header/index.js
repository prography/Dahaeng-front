import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import Slider from '../Slider';

const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

//styled(Responsive) ?
const Wrapper = styled.div`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;

  .title {
    font-size: 1.125rem;
    font-weight: 800;
    letter-spacing: 2px;
  }
`;

const Header = ({ history }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.auth);
  //const user = useSelector((state) => state.user.user);

  const [open, setOpen] = useState(false);
  const anchor = 'left';
  const classes = useStyles();
  // useEffect(() => {
  //   if (!token) {
  //     history.push('/login');
  //   }
  // }, []);

  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <div className="title">Da:haeng</div>
        </Wrapper>
      </HeaderBlock>
      <Slider history={history} />
    </>
  );
};

export default withRouter(Header);

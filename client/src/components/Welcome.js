import { Button, Col, Row } from 'react-bootstrap';
import { BiMessageAltDetail as MessageIcon } from 'react-icons/bi';

const Welcome = (props) => {
  return (
    <div className='chat-welcome-section'>
      <Row className='w-100 justify-content-center'>
        <Col xxl={5} md={7}>
          <div className='p-4 text-center'>
            <div className='avatar-xl mx-auto mb-4'>
              <div className='avatar-title bg-soft-primary rounded-circle'>
                <MessageIcon size={60} />
              </div>
            </div>
            <h4>Welcome to Envoy</h4>
            <p className='text-muted mb-4'>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. cum sociis natoque penatibus et
            </p>
            <Button
              type='button'
              className='btn btn-primary'
              style={{ width: '150px', height: '45px' }}
            >
              Get Started
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Welcome;

import { Col, Row } from 'react-bootstrap';
import { BiMessageAltDetail as MessageIcon } from 'react-icons/bi';

const Welcome = (props) => {
  return (
    <div className='chat-welcome-section'>
      <Row className='w-100 justify-content-center'>
        <Col xxl={5} md={7}>
          <div className='p-4 text-center'>
            <div className='mx-auto mb-4'>
              <div className='bg-soft-primary rounded-circle'>
                <MessageIcon size={60} />
              </div>
            </div>
            <h4>Welcome to Envoy</h4>
            <p className='text-muted mb-4'>
              We are a social networking platform with with focus on realtime messaging, calling, and communication.
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Welcome;

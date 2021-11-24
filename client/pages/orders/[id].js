import { useState } from 'react';
import HeadText from '../../components/HeadText';
import ReviewModal from '../../components/orders/ReviewModal';
import Link from 'next/link';
import { Steps } from 'antd';
const { Step } = Steps;

const SingleOrder = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };
  return (
    <>
      <HeadText
        headText='Order Details'
        subText={`Order details of Product A is showing here.`}
      />
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='card m-2 p-4'>
              {' '}
              <h5>Delivery Address</h5>
              Arindam Pal <br /> AC 166 , Ashoke villa, 2nd floor, Prafulla
              Kanan (N) Keshtopur, Near Nona Pukur / Balak Sangha <br />
              Kolkata - 700101 <br />
              West Bengal <br />
              Phone number 7001722370, 9932046896
            </div>
          </div>
          <div className='col-md-12 '>
            <div className='card m-2 p-4'>
              <h5>
                <Link href='/products/test-product-01'>
                  <a>Test Product 01</a>
                </Link>
              </h5>
              <p>4 GB RAM, 256GN Storage, 865G Snapgragon, 66MP Rear Camera</p>
              <p className='text-info'>$250</p>
              <Steps
                progressDot
                current={0}
                size='small'
                responsive={true}
                calssName='m-4'
                // status='error'
              >
                <Step title='Ordered' description='On 15th Nov, 2021' />
                <Step title='Shipped' description='On 18th Nov, 2021' />
                <Step
                  title='Out For Delivery'
                  description='On 21th Nov, 2021'
                />
                <Step title='Delivered' description='On 24th Nov, 2021' />
                <Step title='Cancelled' description='On 17th Nov, 2021' />
              </Steps>
              <div className='floa-right'>
                <button className='btn btn-link p-2 float-right'>
                  Download Invoice
                </button>
                <button
                  className='btn btn-link p-2 float-right'
                  onClick={showModal}
                >
                  Give rating & review
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ReviewModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </>
  );
};

export default SingleOrder;

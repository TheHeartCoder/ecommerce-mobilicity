import { List } from 'antd';

const ManageAddress = ({
  addresses: { adds },
  setOrderDetails,
  orderDetails,
  setStepNo,
  stepNo,
  placeOrder,
}) => {
  return (
    <>
      <div className='row p-4 card'>
        <div className='col'>
          <List
            itemLayout='horizontal'
            dataSource={adds || []}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={`${item.fullName} (${item.phoneNo})`}
                  description={
                    <>
                      <p>
                        {item.locality} , {item.landmark}, {item.pinNo}
                      </p>
                      <p>
                        {item.fullAddress}, {item.state}
                      </p>
                      <p>{item.phoneNo2}</p>
                    </>
                  }
                />
                {/* <input type='radio' value='' name='checkoutAddress' /> */}
                <button
                  type='button'
                  className='btn btn-sm btn-outline-success m-4'
                  onClick={() => placeOrder(item._id)}
                >
                  Deliver Here & Continue
                </button>
              </List.Item>
            )}
          />
        </div>
      </div>
    </>
  );
};

export default ManageAddress;

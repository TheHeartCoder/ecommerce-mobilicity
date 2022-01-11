import { List, Button } from 'antd';
import {
  PlusSquareOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import HeadText from '../../components/HeadText';
const data = [
  {
    title: 'Mr. Arindam Paul 1 || 7001722370',
  },
  {
    title: 'Mr. Arindam Paul 2 || 7001722370',
  },
  {
    title: 'Mr. Arindam Paul 3 || 7001722370',
  },
  {
    title: 'Mr. Arindam Paul 4 || 7001722370',
  },
  {
    title: 'Mr. Arindam Paul 4 || 7001722370',
  },
];

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { addAddress, getUserAddress } from '../../redux/actions/address';
import toast from 'react-hot-toast';

const initialState = {
  fullName: '',
  phoneNo: '',
  pinNo: '',
  locality: '',
  landmark: '',
  phoneNo2: '',
  fullAddress: '',
  state: '',
};

const MyAddresses = () => {
  const [addressInfo, setAddressInfo] = useState(initialState);
  const [formOpen, setFormOpen] = useState(false);
  const dispatch = useDispatch();

  const addressData = useSelector((state) => state.addressData);
  const { adds, loading, success } = addressData;

  useEffect(() => {
    dispatch(getUserAddress());
  }, []);

  const handleSave = () => {
    Object.keys(addressInfo).forEach(function (key) {
      if (addressInfo[key] === '') {
        toast.error('Please fill all the fields');
        return;
      }
    });
    dispatch(addAddress(addressInfo));
  };

  return (
    <>
      <HeadText
        headText='Your Address'
        subText='Manage your addresses from here'
      />
      <div className='container'>
        <div className='card'>
          <div className='row p-4'>
            <div className='col'>
              <Button
                type='primary'
                className='float-right'
                icon={<PlusSquareOutlined />}
                onClick={() => setFormOpen(true)}
              >
                Add New Address
              </Button>
            </div>
          </div>
          {formOpen && (
            <div className='row p-4'>
              <div className='col-md-4 p-2'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Your full name'
                />
              </div>
              <div className='col-md-4 p-2'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Your phone no'
                />
              </div>
              <div className='col-md-4 p-2'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Your pin no'
                />
              </div>
              <div className='col-md-4 p-2'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Your locality'
                />
              </div>
              <div className='col-md-4 p-2'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Your landmark'
                />
              </div>
              <div className='col-md-4 p-2'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Alternative phone number(Optional)'
                />
              </div>
              <div className='col-md-8 p-2'>
                <textarea
                  className='form-control'
                  placeholder='Full address'
                ></textarea>
              </div>
              <div className='col-md-4 p-2'>
                <select className='form-control'>
                  <option>Select Your State</option>
                  <option>West Bengal</option>
                  <option>Bihar</option>
                  <option>Maharastra</option>
                </select>
              </div>
              <div className='col-md-12 p-2'>
                <button
                  className='btn btn-primary float-right m-2'
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  className='btn btn-secondary float-right m-2'
                  onClick={() => {
                    setAddressInfo(initialState);
                    setFormOpen(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <hr />
          <div className='row p-4'>
            <div className='col'>
              <List
                itemLayout='horizontal'
                dataSource={adds}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      title={item.title}
                      description='AC 166 , Ashoke villa, 2nd floor, Prafulla Kanan (N), Keshtopur, Kolkata, West Bengal - 700101'
                    />

                    <button
                      className='btn btn-outline-dark p-2 m-2'
                      onClick={() => {}}
                    >
                      <EditOutlined />
                    </button>
                    <button
                      className='btn btn-outline-danger p-2'
                      onClick={() => {}}
                    >
                      <DeleteOutlined />
                    </button>
                  </List.Item>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAddresses;

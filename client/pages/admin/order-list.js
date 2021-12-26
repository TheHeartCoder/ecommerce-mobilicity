import HeadText from '../../components/HeadText';
import {
  Button,
  Table,
  Tag,
  Space,
  Pagination,
  Collapse,
  Image,
  Select,
} from 'antd';
import { useState } from 'react';
import ProductFormModal from '../../components/admin/ProductFormModal';

const { Panel } = Collapse;
const { Option } = Select;

const OrderList = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Order Date',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Address',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Customer Name',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Total Price',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Delivery Status',
      dataIndex: 'address',
      key: 'address',
      render: () => (
        <>
          <Select defaultValue='Pending' style={{ width: 120 }}>
            <Option value='Pending'>Pending</Option>
            <Option value='Pending'>Pending</Option>
            <Option value='Pending'>Pending</Option>
            <Option value='Pending'>Pending</Option>
          </Select>
        </>
      ),
    },
    {
      title: 'View Invoice',
      dataIndex: 'address',
      key: 'address',
      render: () => <Button type='primary'>view Invoice</Button>,
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool'],
    },
  ];

  return (
    <>
      <HeadText
        headText='All Orderes'
        subText='Mangae your customers from here'
      />

      <div className='col-md-6 offset-md-3'>
        <Table
          columns={columns}
          dataSource={data}
          className='m-4'
          pagination={false}
        />
      </div>
      <div className='row'>
        <div className='m-auto p-4'>
          <Pagination size='small' total={50} showSizeChanger showQuickJumper />
        </div>
      </div>
      <ProductFormModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </>
  );
};

export default OrderList;

import { Modal, Rate } from 'antd';
const ReviewModal = ({ isModalVisible, setIsModalVisible }) => {
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <Modal
      title={
        <p>
          Give Your rating and feedback for <strong>Product A</strong>{' '}
        </p>
      }
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText='Submit'
    >
      <Rate className='mb-4' allowHalf defaultValue={4.5} />
      <textarea
        className='form-control'
        placeholder={`Give feedback for product a`}
      ></textarea>
    </Modal>
  );
};

export default ReviewModal;

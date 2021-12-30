import { Card, Avatar } from 'antd';

import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const { Meta } = Card;
const ItemsOnCard = ({ item, type }) => {
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [slug, setSlug] = useState('');
  const [redirectionLink, setRedirectionLink] = useState('');

  useEffect(() => {
    if (item && type) {
      switch (type) {
        case 'products':
          setImage(item.images[0].Location);
          setTitle(item.name);
          setDescription(item.highlightDescription);
          setRedirectionLink(`/products/${item.slug}`);
          break;
        case 'categories':
          setImage(item.image.Location);
          setTitle(item.title);
          setDescription(item.description);
          setRedirectionLink(`/products?type=categories&slug=${item.slug}`);
          break;
        case 'brands':
          setImage(item.image.Location);
          setTitle(item.title);
          setDescription(item.description);
          setRedirectionLink(`/products?type=brands&slug=${item.slug}`);
          break;
      }
    }
  }, [item, type]);
  return (
    <Card
      style={{ width: '100% ' }}
      cover={
        <img alt='' src={image} height='430' width='100' className='p-4' />
      }
      actions={
        type === 'products' && [
          <HeartOutlined key='heart' />,
          <ShoppingCartOutlined key='shopping-cart' />,
        ]
      }
    >
      <Meta
        title={
          <Link href={redirectionLink}>
            <a className='text-dark'>{title}</a>
          </Link>
        }
        description={description}
      />
    </Card>
  );
};

export default ItemsOnCard;

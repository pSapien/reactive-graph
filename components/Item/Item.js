import Link from 'next/link';

import Title from '../styles/Title';
import PriceTag from '../styles/PriceTag';
import ItemStyles from '../styles/ItemStyles';
import DeleteItem from '../DeleteItem';
import formatMoney from '../../lib/formatMoney';

export default function Item(props) {
  const { title, price, description, id, image } = props.item;

  return (
    <ItemStyles>
      {image && <img src={image} alt={title} />}
      <Title>
        <Link
          href={{
            pathname: '/item',
            query: { id },
          }}
        >
          <a>{title}</a>
        </Link>
      </Title>
      <PriceTag>{formatMoney(price)}</PriceTag>
      <p>{description}</p>
      <div className="buttonList">
        <Link href={{ pathname: 'update', query: { id } }}>
          <a>Edit</a>
        </Link>
        <button>Add To Cart</button>
        <DeleteItem buttonText="Delete This Item" id={id} />
      </div>
    </ItemStyles>
  );
}

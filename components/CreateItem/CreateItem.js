import gql from 'graphql-tag';
import Router from 'next/router';
import { Mutation } from 'react-apollo';

import Form from '../styles/Form';
import formatMoney from '../../lib/formatMoney';
import ErrorMessage from '../ErrorMessage';

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

export default class CreateItem extends React.Component {
  state = {
    title: '',
    description: '',
    image: '',
    largeImage: '',
    price: 0,
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? Number(value) : value;

    this.setState({ [name]: val });
  };

  render() {
    const { title, description, image, largeImage, price } = this.state;

    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { loading, error }) => {
          return (
            <Form
              onSubmit={async e => {
                e.preventDefault();
                const { data } = await createItem();
                Router.push({
                  pathname: '/item',
                  query: { id: data.createItem.id },
                });
              }}
            >
              <h2>Sell an item</h2>
              <fieldset disabled={loading} aria-busy={loading}>
                <InputField
                  type="text"
                  value={title}
                  text="Title"
                  onChange={this.handleChange}
                />
                <InputField
                  type="number"
                  value={price}
                  text="Price"
                  onChange={this.handleChange}
                />
                <InputField
                  type="text"
                  value={description}
                  text="Description"
                  onChange={this.handleChange}
                  tag="textarea"
                />
                <button type="submit">Submit</button>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

const InputField = props => {
  const { text, onChange, value, title, tag, type } = props;
  const name = text.toLowerCase();
  const TagName = tag || 'input';

  return (
    <label htmlFor={name}>
      {text}
      <TagName
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={text}
        required
      />
    </label>
  );
};

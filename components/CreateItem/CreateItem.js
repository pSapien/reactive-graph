import gql from 'graphql-tag';
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
              onSubmit={e => {
                e.preventDefault();
              }}
            >
              <h2>Sell an item</h2>
              <InputField
                type="text"
                value={title}
                text="Title"
                handleChange={this.handleChange}
              />
              <InputField
                type="number"
                value={price}
                text="Price"
                handleChange={this.handleChange}
              />
              <InputField
                type="text"
                value={description}
                text="Description"
                handleChange={this.handleChange}
                tag="textarea"
              />
              <button type="submit">Submit</button>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

const InputField = props => {
  const { text, handleChange, value, title, tag, type } = props;
  const name = text.toLowerCase();
  const TagName = tag || 'input';

  return (
    <fieldset>
      <label htmlFor={name}>
        {text}
        <TagName
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={text}
          required
        />
      </label>
    </fieldset>
  );
};

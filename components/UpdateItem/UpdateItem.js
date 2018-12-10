import gql from 'graphql-tag';
import axios from 'axios';
import Router from 'next/router';
import { Mutation, Query } from 'react-apollo';

import Form from '../styles/Form';
import Error from '../ErrorMessage';
import formatMoney from '../../lib/formatMoney';

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $price: String
  ) {
    updateItem(
      id: $id
      title: $title
      description: $description
      price: $price
    ) {
      id
    }
  }
`;

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      largeImage
      price
      description
    }
  }
`;

export default class UpdateItem extends React.Component {
  state = {};

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? Number(value) : value;

    this.setState({ [name]: val });
  };

  render() {
    const { id } = this.props;

    return (
      <Query query={SINGLE_ITEM_QUERY} variables={{ id }}>
        {({ data, loading }) => {
          if (loading) return <p>Loading....</p>;

          const { title, description, price } = data.item;

          return (
            <Mutation
              mutation={UPDATE_ITEM_MUTATION}
              variables={{ id, ...this.state }}
            >
              {(updateItem, { loading, error }) => {
                return (
                  <Form
                    data-test="form"
                    onSubmit={async e => {
                      e.preventDefault();
                      await updateItem();
                    }}
                  >
                    <Error error={error} />
                    <fieldset disabled={loading} aria-busy={loading}>
                      <InputField
                        type="text"
                        defaultValue={title}
                        text="Title"
                        onChange={this.handleChange}
                      />
                      <InputField
                        type="number"
                        defaultValue={price}
                        text="Price"
                        onChange={this.handleChange}
                      />
                      <InputField
                        type="text"
                        defaultValue={description}
                        text="Description"
                        onChange={this.handleChange}
                        tag="textarea"
                      />
                      <button type="submit">
                        {loading ? 'Updating Changes' : 'Update Changes'}
                      </button>
                    </fieldset>
                  </Form>
                );
              }}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

const InputField = props => {
  const { text, onChange, value, title, tag, type, defaultValue } = props;
  const name = text.toLowerCase();
  const TagName = tag || 'input';

  return (
    <label htmlFor={name}>
      {text}
      <TagName
        id={name}
        type={type}
        name={name}
        defaultValue={defaultValue}
        onChange={onChange}
        placeholder={text}
        required
      />
    </label>
  );
};

export { SINGLE_ITEM_QUERY };

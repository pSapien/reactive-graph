import gql from 'graphql-tag';
import axios from 'axios';
import Router from 'next/router';
import { Mutation } from 'react-apollo';

import Form from '../styles/Form';
import Error from '../ErrorMessage';
import formatMoney from '../../lib/formatMoney';
import { cloudinaryUploadPreset, cloudinaryAPI } from '../../config';

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
    price: '',
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? Number(value) : value;

    this.setState({ [name]: val });
  };

  uploadFile = async e => {
    const { files } = e.target;

    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('upload_preset', cloudinaryUploadPreset);

    const {
      data: { secure_url, eager },
    } = await axios.post(cloudinaryAPI, formData);

    this.setState({ image: secure_url, largeImage: eager[0].url });
  };

  render() {
    const { title, description, image, largeImage, price } = this.state;

    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { loading, error }) => {
          return (
            <Form
              data-test="form"
              onSubmit={async e => {
                e.preventDefault();
                const { data } = await createItem();
                Router.push({
                  pathname: '/item',
                  query: { id: data.createItem.id },
                });
              }}
            >
              <Error error={error} />
              <fieldset disabled={loading} aria-busy={loading}>
                <InputField
                  type="file"
                  text="File"
                  onChange={this.uploadFile}
                />
                {image && <img width="200" src={image} alt="Upload Preview" />}
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

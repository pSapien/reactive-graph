import Head from 'next/head';
import styled from 'styled-components';
import { Query } from 'react-apollo';

import Error from '../ErrorMessage';
import { SINGLE_ITEM_QUERY } from '../UpdateItem/UpdateItem';

const SingleItemStyles = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: ${({ theme }) => theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .details {
    margin: 3rem;
    font-size: 2rem;
  }
`;

const SingleItem = ({ id }) => (
  <Query query={SINGLE_ITEM_QUERY} variables={{ id }}>
    {({ error, data, loading }) => {
      if (loading) return <p>Loading...</p>;
      if (!data.item) return <p>No Item Found for {id}</p>;

      const { title, description, largeImage } = data.item;

      return (
        <React.Fragment>
          <Error error={error} />
          <SingleItemStyles>
            <Head>
              <title>Reactive Graph | {title}</title>
            </Head>
            <img src={largeImage} alt={title} />
            <div className="details">
              <h2>Viewing {title}</h2>
              <p>{description}</p>
            </div>
          </SingleItemStyles>
          );
        </React.Fragment>
      );
    }}
  </Query>
);

export default SingleItem;

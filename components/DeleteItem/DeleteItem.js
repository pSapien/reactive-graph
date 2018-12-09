import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import Error from '../ErrorMessage';
import { ALL_ITEMS_QUERY } from '../Item/Items';

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

/**
 *
 * @param {Object} cache    - present state of the cache
 * @param {Object} payload  - returned data from the delete mutation
 * @see Mutation - both of the args is passed by the mutation component to update method
 *
 */

function update(cache, payload) {
  function deletedItem(item) {
    return item.id !== payload.data.deleteItem.id;
  }

  const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
  data.items = data.items.filter(deletedItem);
  cache.writeQuery({ query: ALL_ITEMS_QUERY, data });
}

const DeleteItem = ({ buttonText, id }) => (
  <Mutation mutation={DELETE_ITEM_MUTATION} variables={{ id }} update={update}>
    {(deleteItem, { error }) => {
      return (
        <React.Fragment>
          <Error error={error} />
          <button
            onClick={async e => {
              e.preventDefault();
              const deleteItemText = 'Are you sure you want to delete?';
              if (confirm(deleteItemText)) {
                await deleteItem();
              }
            }}
          >
            {buttonText}
          </button>
        </React.Fragment>
      );
    }}
  </Mutation>
);

export default DeleteItem;

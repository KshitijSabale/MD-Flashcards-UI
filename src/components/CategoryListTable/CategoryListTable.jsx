/* eslint react/prop-types: 0 */
import React from 'react';
import {
  TableBody,
  TableHead,
} from '@material-ui/core';
import dayjs from 'dayjs';

import {
  StyledTable,
  ListContainer,
  ListRow,
  ListButton,
  NewItemContainer,
  StyledTextField,
  HeadTableCell,
  ContentTableCell,
  EmptyDataIndicator,
  LoadingIndicator,
} from './styledComponents';

const formatDate = (date) => dayjs(date).format('YYYY/MM/DD');

const capitalize = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

function CategoryListTable({
  title,
  type,
  items,
  dataConfig,
  createNewItem,
  handleRowClick,
  newItemName,
  setNewItemName,
  handleChange,
  shouldRenderAddOption,
  isCreating,
  isLoading,
}) {
  const getItemTable = () => (
    <StyledTable isLoading={isLoading}>
      <TableHead>
        {dataConfig.map(({ header }) => <HeadTableCell key={header}>{header}</HeadTableCell>)}
      </TableHead>
      <TableBody>
        {items.map((row) => (
          <ListRow key={row.id} onClick={() => handleRowClick(row.id)}>
            {dataConfig.map(({ key, isTimestamp }) => (
              <ContentTableCell key={key} columnlength={dataConfig.length}>
                {isTimestamp ? formatDate(row[key]) : row[key]}
              </ContentTableCell>
            ))}
          </ListRow>
        ))}
      </TableBody>
    </StyledTable>
  );

  return (
    <>
      <ListContainer>
        <h3>
          {title}
        </h3>
        {shouldRenderAddOption
        && (
          <ListButton
            onClick={() => {
              if (!newItemName) {
                setNewItemName('');
              }
            }}
          >
            {`Add a New ${capitalize(type)}`}
          </ListButton>
        )}
        {(newItemName || newItemName === '')
        && (
          <div>
            {isCreating && <LoadingIndicator>Creating...</LoadingIndicator>}
            <NewItemContainer isCreating={isCreating}>
              <StyledTextField
                label={`Name Your New ${capitalize(type)}`}
                variant="outlined"
                value={newItemName}
                onChange={handleChange}
              />
              <ListButton
                newitem
                disabled={!newItemName}
                onClick={createNewItem}
              >
                Create
              </ListButton>
            </NewItemContainer>
          </div>
        )}
        {isLoading
        && (
          <LoadingIndicator margintop>Loading...</LoadingIndicator>
        )}
        {(
          items.length
            ? getItemTable()
            : (
              <EmptyDataIndicator>
                {`You currently have no card ${type}s. Create a ${type} above to get started!`}
              </EmptyDataIndicator>
            )
        )}
      </ListContainer>
    </>
  );
}

export default CategoryListTable;

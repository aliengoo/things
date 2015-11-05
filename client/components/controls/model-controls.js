"use strict";

import React, {Component, PropTypes} from 'react';
import Button from './button';
import FaIcon from '../outlets/fa-icon';

export default class ModelControls extends Component {
  render() {
    const {
      isFetching,
      isEditable,
      isNew,
      isValid,
      onEditClick,
      onAbortClick,
      onSaveClick,
      onDeleteClick} = this.props;

    return (
      <div className="model-controls">
        <Button visible={!isEditable && !isNew} onClick={onEditClick} btnStyle="primary" isFetching={isFetching}>
          Edit
          <FaIcon name="fa-pencil"/>
        </Button>
        <Button visible={isEditable || isNew} onClick={onAbortClick} btnStyle="warning" isFetching={isFetching}>
          Abort
          <FaIcon name="fa-pencil"/>
        </Button>
        <Button visible={isEditable || isNew} disabled={!isValid} onClick={onSaveClick} btnStyle="success"
                isFetching={isFetching}>
          Save
          <FaIcon name="fa-upload" spinOnFetching={true} isFetching={isFetching}/>
        </Button>
        <Button visible={!isEditable && !isNew} onClick={onDeleteClick} btnStyle="danger" isFetching={isFetching}>
          Delete
          <FaIcon name="fa-close" spinOnFetching={true} isFetching={isFetching}/>
        </Button>
      </div>
    );
  }
}

ModelControls.PropTypes = {
  isFetching: PropTypes.bool,
  isEditable: PropTypes.bool,
  isValid: PropTypes.bool,
  isNew: PropTypes.bool,
  onEditClick: PropTypes.func.isRequired,
  onAbortClick: PropTypes.func.isRequired,
  onSaveClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};
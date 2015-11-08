"use strict";

import React, {Component, PropTypes} from 'react';
import Button from './../../components/controls/Button';
import FaIcon from '../../components/outlets/FaIcon';

export default class ModelControls extends Component {
  render() {
    const {
      fetching,
      editable,
      isNew,
      isValid,
      onEditClick,
      onAbortClick,
      onSaveClick,
      onDeleteClick} = this.props;

    return (
      <div className="model-controls">
        <Button visible={!editable && !isNew} onClick={onEditClick} btnStyle="primary" fetching={fetching}>
          Edit
          <FaIcon name="fa-pencil"/>
        </Button>
        <Button visible={editable || isNew} onClick={onAbortClick} btnStyle="warning" fetching={fetching}>
          Abort
          <FaIcon name="fa-pencil"/>
        </Button>
        <Button visible={editable || isNew} disabled={!isValid} onClick={onSaveClick} btnStyle="success"
                fetching={fetching}>
          Save
          <FaIcon name="fa-upload" spinOnFetching={true} fetching={fetching}/>
        </Button>
        <Button visible={!editable && !isNew} onClick={onDeleteClick} btnStyle="danger" fetching={fetching}>
          Delete
          <FaIcon name="fa-close" spinOnFetching={true} fetching={fetching}/>
        </Button>
      </div>
    );
  }
}

ModelControls.PropTypes = {
  fetching: PropTypes.bool,
  editable: PropTypes.bool,
  isValid: PropTypes.bool,
  isNew: PropTypes.bool,
  onEditClick: PropTypes.func.isRequired,
  onAbortClick: PropTypes.func.isRequired,
  onSaveClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};
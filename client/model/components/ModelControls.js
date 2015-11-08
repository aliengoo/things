"use strict";
import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import Button from './../../components/controls/Button';
import FaIcon from '../../components/outlets/FaIcon';

export default class ModelControls extends Component {
  render() {
    const {
      containerModel,
      onEditClick,
      onAbortClick,
      onSaveClick,
      onDeleteClick} = this.props;

    const editing = containerModel.editing;
    const isNew = _.get(containerModel, "currentModel._id", undefined) === undefined;
    const fetching = containerModel.fetching;
    const isValid = _.get(containerModel, "modelFormState.valid", false);

    return (
      <div className="model-controls">
        <Button visible={!editing} onClick={onEditClick} btnStyle="primary" fetching={fetching}>
          Edit
          <FaIcon name="fa-pencil"/>
        </Button>
        <Button visible={editing} onClick={onAbortClick} btnStyle="warning" fetching={fetching}>
          Abort
          <FaIcon name="fa-pencil"/>
        </Button>
        <Button visible={editing} disabled={!isValid} onClick={onSaveClick} btnStyle="success"
                fetching={fetching}>
          Save
          <FaIcon name="fa-upload" spinOnFetching={true} fetching={fetching}/>
        </Button>
        <Button visible={!editing && !isNew} onClick={onDeleteClick} btnStyle="danger" fetching={fetching}>
          Delete
          <FaIcon name="fa-close" spinOnFetching={true} fetching={fetching}/>
        </Button>
      </div>
    );
  }
}

ModelControls.PropTypes = {
  containerModel: PropTypes.object.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onAbortClick: PropTypes.func.isRequired,
  onSaveClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};
import React, {Component, PropTypes} from 'react';

export default class ThingsTable extends Component {

  render() {

    const {currentModels} = this.props;

    if (!currentModels || currentModels.length === 0) {
      return (
        <div className="models-table-no-results">
          No results
        </div>);
    }

    return (
      <table className="table">
        <thead>
          <th>
             <td>Name</td>
             <td>Description</td>
          </th>
        </thead>
        <tbody>
        {currentModels.map((thing) => {
          return (
            <tr>
              <td>{thing.name}</td>
              <td>{thing.description}</td>
            </tr>
          );
        })}
        </tbody>
      </table>
    );
  }
}

ThingsTable.propTypes = {
  currentModels: PropTypes.array
};
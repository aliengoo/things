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
          <td></td>
        </th>
        </thead>
        <tbody>
        {currentModels.map((thing) => {
          let link = `/thing/${thing._id}`;

          return (
            <tr>
              <td>{thing.name}</td>
              <td>{thing.description}</td>
              <td><Link to={link}>Open</Link></td>
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
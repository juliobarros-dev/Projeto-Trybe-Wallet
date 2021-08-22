import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Form from '../components/Form';
import Table from '../components/Table';
import EditForm from '../components/EditForm';
import './Wallet.css';

class Wallet extends React.Component {
  render() {
    const { shoudlEdit } = this.props;
    return (
      <main>
        <Header />
        { shoudlEdit ? <EditForm /> : <Form /> }
        <Table />
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  shoudlEdit: state.wallet.edit,
});

Wallet.propTypes = {
  shoudlEdit: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, null)(Wallet);

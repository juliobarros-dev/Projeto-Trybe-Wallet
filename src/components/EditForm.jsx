import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Input from './Input';
import PaymentMethod from './PaymentMethod';
import Tag from './Tag';
import Currencies from './Currencies';

class EditForm extends Component {
  constructor(props) {
    super(props);
    const { expense } = this.props;
    const { value, description, currency, method, tag } = expense[0];
    console.log(expense);

    this.state = {
      value,
      description,
      currency,
      method,
      tag,
    };
    this.handleChange = this.handleChange.bind(this);
    // this.startEditing = this.startEditing.bind(this);
  }

  /* componentDidMount() {
    this.startEditing();
  }

  startEditing() {
    const { expense } = this.props;
    const { value, description, currency, method, tag } = expense;
    this.setState = {
      value,
      description,
      currency,
      method,
      tag,
    };
  } */

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { value, description, currency, method, tag } = this.state;

    const despesasInputProps = {
      type: 'number',
      placeholder: 'Despesa',
      id: 'valueInput',
      labelTxt: 'Valor',
      value,
      name: 'value',
      onChange: this.handleChange,
    };
    const descricaoInputProps = {
      type: 'text',
      placeholder: 'Detalhes da despesa',
      id: 'descriptionInput',
      labelTxt: 'Descrição',
      value: description,
      name: 'description',
      onChange: this.handleChange,
    };
    const currencysSelectProps = {
      value: currency,
      onChange: this.handleChange,
      name: 'currency',
    };
    const paymentMethodProps = {
      value: method,
      name: 'method',
      onChange: this.handleChange,
    };
    const tagSelectProps = {
      value: tag,
      name: 'tag',
      onChange: this.handleChange,
    };

    return (
      <form>
        <Input { ...despesasInputProps } />
        <Input { ...descricaoInputProps } />
        <Currencies { ...currencysSelectProps } />
        <PaymentMethod { ...paymentMethodProps } />
        <Tag { ...tagSelectProps } />
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  expense: state.wallet.expenseToEdit,
});

EditForm.propTypes = {
  expense: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, null)(EditForm);

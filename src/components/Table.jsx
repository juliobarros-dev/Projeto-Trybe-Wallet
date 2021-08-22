import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpense, editForm } from '../actions/index';

class Table extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.editExpense = this.editExpense.bind(this);
  }

  handleClick({ target }) {
    const { name } = target;
    const { removeItem } = this.props;
    const id = name * 1;
    removeItem(id);
  }

  async editExpense({ target }) {
    const { name } = target;
    const { expense, editExpenses } = this.props;
    await editExpenses(expense[name]);
  }

  displayTable() {
    const { expense } = this.props;
    return (
      expense.map((item) => {
        const moeda = item.currency;
        const moedaConvertida = item.exchangeRates[moeda].name;
        const valorConvertido = item.value * item.exchangeRates[item.currency].ask;
        const valorTratado = valorConvertido.toFixed(2);
        const rate = item.exchangeRates[item.currency].ask * 1;

        return (
          <tr key={ item.id }>
            <td>{ item.description }</td>
            <td>{ item.tag }</td>
            <td>{ item.method }</td>
            <td>{ item.value }</td>
            <td>{ moedaConvertida }</td>
            <td>{ rate.toFixed(2) }</td>
            <td>{ valorTratado }</td>
            <td>Real</td>
            <td>
              <button
                type="button"
                name={ item.id }
                onClick={ this.editExpense }
                data-testid="edit-btn"
              >
                Editar
              </button>
              <button
                type="button"
                onClick={ this.handleClick }
                name={ item.id }
                data-testid="delete-btn"
              >
                Excluir
              </button>
            </td>
          </tr>
        );
      })
    );
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { this.displayTable() }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expense: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeItem: (id) => dispatch(removeExpense(id)),
  editExpenses: (expense) => dispatch(editForm(expense)),
});

Table.propTypes = {
  expense: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeItem: PropTypes.func.isRequired,
  editExpenses: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);

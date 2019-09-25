import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/index';
import './shopping-cart-table.css';

const ShoppingCartTable = (props) => {
    const { items, total } = props;

    const renderRow = (item, idx) => {
        return (<tr key={item.id}>
            <td>{idx + 1}</td>
            <td>{item.title}</td>
            <td>{item.quantity}</td>
            <td>${item.total}</td>
            <td>
                <button onClick={() => props.deleteItemFromCart(item.id)}
                        className="btn btn-outline-danger btn-sm float-right">
                    <i className="fa fa-trash-o" />
                </button>
                <button onClick={() => props.addBookToCart(item.id)}
                        className="btn btn-outline-danger btn-sm float-right">
                    <i className="fa fa-plus-circle" />
                </button>
                <button onClick={() => props.deleteBookFromCart(item.id)}
                        className="btn btn-outline-danger btn-sm float-right">
                    <i className="fa fa-minus-circle" />
                </button>
            </td>
        </tr>)
    };

    return (
        <div className="shopping-cart-table">
            <h2>Your Order</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Item</th>
                        <th>Count</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(renderRow)}
                </tbody>
            </table>
            <div className="total">
                Total: ${total}
            </div>
        </div>
    )
};

const mapStateToProps = ({ shoppingCart: { cartItems, orderTotal } }) => {
    return {
        items: cartItems,
        total: orderTotal
    }
};

const mapDispatchToProps = dispatch => {
    const { deleteBookFromCart, 
            addBookToCart, 
            deleteItemFromCart } = bindActionCreators(actions, dispatch);
    return {
        deleteBookFromCart, 
        addBookToCart, 
        deleteItemFromCart
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartTable);
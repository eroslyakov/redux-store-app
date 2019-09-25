function updateCart(id, state, action) {
    const { bookList: { books }, shoppingCart: { cartItems, orderTotal } } = state;
    const book = books.find(book => book.id === id);
    const cartItemId = cartItems.findIndex(item => item.id === id);
    const cartItem = cartItems[cartItemId];

    switch (action) {
        case 'increase':
            if(!cartItem) {
                return {
                    orderTotal: updateOrderTotal(orderTotal, book, action),
                    cartItems: [
                        ...cartItems,
                        increaseBookNumber(id, book)
                    ]
                };
            } else {
                return {
                    orderTotal: updateOrderTotal(orderTotal, book, action),
                    cartItems: [
                        ...cartItems.slice(0, cartItemId),
                        increaseBookNumber(id, book, cartItem),
                        ...cartItems.slice(cartItemId + 1)
                    ]
                };
            };
        case 'decrease':
            if(cartItem.quantity <= 1) {
                return {
                    orderTotal: updateOrderTotal(orderTotal, book, action),
                    cartItems: deleteCartItem(cartItemId, cartItems)
                };
            } else {
                return {
                    orderTotal: updateOrderTotal(orderTotal, book, action),
                    cartItems: [
                        ...cartItems.slice(0, cartItemId),
                        decreaseBookNumber(book, cartItem),
                        ...cartItems.slice(cartItemId + 1)
                    ]
                };
            };
        case 'delete':
            return {
                orderTotal: updateOrderTotal(orderTotal, cartItem, action),
                cartItems: deleteCartItem(cartItemId, cartItems)
            };
        default:
            return;
    };
};

function updateOrderTotal(total, goods, action) {
    switch (action) {
        case 'increase':
            return total + goods.price;
        case 'decrease':
            return total - goods.price;
        case 'delete':
            return total - goods.total;
        default:
            return;
    }
}

function increaseBookNumber(idx, book, item = {}) {
    const { id = idx, title = book.title, quantity = 0, total = 0 } = item;

    return {
            id,
            title,
            quantity: quantity + 1,
            total: total + book.price
        };
};

function decreaseBookNumber(book, item) {
    return {
        ...item,
        total: item.total - book.price,
        quantity: item.quantity - 1
    };
};

function deleteCartItem(idx, items) {
    return [
        ...items.slice(0, idx),
        ...items.slice(idx + 1)
    ];
};

const updateShoppingCart = (state, action) => {
    switch (action.type) {
        case 'ADD_BOOK_TO_CART':
            return updateCart(action.payload, state, 'increase');
        case 'DELETE_BOOK_FROM_CART':
            return updateCart(action.payload, state, 'decrease');
        case 'DELETE_ITEM_FROM_CART':
            return updateCart(action.payload, state, 'delete');
        default:
            return state.shoppingCart;
    };
};

export default updateShoppingCart;
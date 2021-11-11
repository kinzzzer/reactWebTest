import {createContext, useState} from 'react';

const CartContext = createContext();

const CartContextProvider = (props) => {
    const [arrItems, setArrItems] = useState([]); // все товары, которые сейчас в корзине
    const [showItems, setShowItems] = useState(false); // содержимое корзины сейчас показывается?
    const [showAlert, setShowAlert] = useState(null); // сообщение после добавления в корзину

    const append = (item, quantity = 1) => {
        // нужно проверить, нет ли уже такого товара в корзине
        const itemIndex = arrItems.findIndex(value => value.id === item.id);
        if (itemIndex < 0) { // такого товара еще нет
            const newItem = {
                ...item,
                quantity: quantity
            };
            setArrItems([...arrItems, newItem]);
        } else { // такой товар уже есть
            const newItem = {
                ...arrItems[itemIndex],
                quantity: arrItems[itemIndex].quantity + quantity
            };
            const newCart = arrItems.slice(); // копия массива arrItems
            newCart.splice(itemIndex, 1, newItem);
            setArrItems(newCart);
        }
        setShowAlert(item.name + ' добавлен в корзину');
    };

    const remove = (id) => {
        const newCart = arrItems.filter(item => item.id !== id);
        setArrItems(newCart);
    }

    const toggleShow = () => setShowItems(!showItems);

    const hideAlert = () => setShowAlert(null);

    // контекст, который будет доступен всем потомкам
    const value = {
        items: arrItems,
        append: append,
        remove: remove,
        showItems: showItems,
        toggleShow: toggleShow,
        showAlert: showAlert,
        hideAlert: hideAlert,
    };

    return (
        <CartContext.Provider value={value}>
            {props.children}
        </CartContext.Provider>
    );
}

export {CartContext, CartContextProvider};
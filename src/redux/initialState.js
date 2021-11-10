const initialState = {
    userInfo: {
        isAuthenticated: false,
        email: '',
        userName: '',
        userID: '',
        avatarUrl: '',
        productsInCart: 0
    },
    renderProject: true,
    menuStatus: {
        storeMenuStatus: false,
        aboutMenuStatus: false,
        myProductsMenuStatus: false,
        addItemMenuStatus: false,
        cartMenuStatus: false
    }
}

export default initialState;
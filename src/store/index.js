import { createStore } from 'vuex';

export default createStore({
    state:{
        cart:[ ],
    },
    mutations:{
        ADD_CART_PRODUCT (state, payload) {
            console.log(payload);
            state.cart.push({name:payload.name, price:payload.price, brand:payload.brand, img:payload.img});
        },
        DEL_CART_PRODUCT (state, payload) {
            state.cart.splice(payload.index, 1);
        },
    },
    actions:{
        addCartProduct({commit}, payload){
            commit('ADD_CART_PRODUCT', payload);
        },
        delCartProduct({commit}, payload){
            commit('DEl_CART_PRODUCT', payload);
        },

        // ADD_CART_PRODUCT (state, payload) {
        //     console.log("### ADD_PRODUCT");
        //     state.commit(ADD_CART_PRODUCT, payload);
        // },
        // DEL_CART_PRODUCT (state, payload) {
        //     console.log("### DEL_PRODUCT");
        //     state.commit(DEL_CART_PRODUCT, payload);
        // },
    },
})
import { createStore } from 'vuex';
import axios from 'axios';

const resourceHost = "http://localhost:8000";

export default createStore({
    state:{
        cart: [ ],
        accessToken: null,
        user:{
            email:null,
            name:null
        },
    },
    mutations:{
        ADD_CART_PRODUCT (state, payload) {
            state.cart.push({name:payload.name, price:payload.price, brand:payload.brand, img:payload.img});
        },
        DEL_CART_PRODUCT (state, payload) {
            state.cart.splice(payload.index, 1);
        },
        LOGIN(state, data){
            state.user.email = data.email;
            state.user.name = data.name
            state.accessToken = data.token;

            localStorage.accessToken = data.token;
            localStorage.email = data.email;
            localStorage.name = data.name;
        },
        LOGOUT(state){
            state.user.email = null;
            state.user.name = null;
            state.accessToken = null;


            delete localStorage.accessToken;
            delete localStorage.email;
            delete localStorage.name;
        }
    },
    actions:{
        addCartProduct({commit}, payload){
            commit('ADD_CART_PRODUCT', payload);
        },
        delCartProduct({commit}, payload){
            commit('DEl_CART_PRODUCT', payload);
        },
        async login({commit}, {email, password}){
            await axios
                .post(`${resourceHost}/user/login`, {email, password})
                .then(({data}) => {
                    commit('LOGIN', data)
                    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
                })
        },
        logout({commit}){
            commit("LOGOUT");
        }

        // ADD_CART_PRODUCT (state, payload) {
        //     console.log("### ADD_PRODUCT");
        //     state.commit(ADD_CART_PRODUCT, payload);
        // },
        // DEL_CART_PRODUCT (state, payload) {
        //     console.log("### DEL_PRODUCT");
        //     state.commit(DEL_CART_PRODUCT, payload);
        // },
    },
    getters:{
        isAuthenticated (state) {
            state.accessToken = state.accessToken || localStorage.accessToken
            return state.accessToken
        }
    },
})
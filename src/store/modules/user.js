const user = {
    state: {
        userName: ''
    },
    getters: {
        userName: state => state.userName
    },
    mutations: {
        setUserName(state, userName) {
            state.userName = userName
        },
        logout (state, vm) {
            state.userName = ''
            localStorage.clear()
            sessionStorage.clear()
        }
    }
};

export default user;

export const APIs = {

    init(parm?) {

        const host = 'http://localhost:5000/';
        const API = {
            products: `${host}Products`,
            orders: `${host}Orders`,
            users: `${host}Users`,
        }
        return API;
    }
}
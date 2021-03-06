import {
    ip,
    port
} from './server'

let interfaces = {
    "uplaod": 'http://' + ip + ':' + port + "/api/v1/upload",
    "admin":"/api/v1/admins",
    "carousels": "api/v1/carousels",
    "products": "api/v1/products",
    "productDetail": "api/v3/products",
    "personnel": 'api/v1/servants',
    "forums": 'api/v1/topics',
    "posts": "api/v1/posts",
    "comments": "api/v1/comments",
    "users": "api/v1/users",
    "tags": "api/v1/tags",
    "orders": "api/v1/orders/beConfirm",
    "confirmOrder": "api/v1/orders/confirm",
    "modifyOrder": "api/v1/orders/confirmWithReset",
    "nationProducts": "api/v2/productsWithAttendants"
};

export {
    interfaces
}

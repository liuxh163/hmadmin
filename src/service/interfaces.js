import {
    ip,
    port
} from './server'

let interfaces = {
    "uplaod": 'http://' + ip + ':' + port + "/api/v1/upload",
    "uplaod1": "api/v1/upload",
    "carousels": "api/v1/carousels",
    "products": "api/v1/products",
    "personnel": 'api/v1/servants'
};

export {
    interfaces
}

/**
 * Created by CHB on 2018/12/3.
 */
let _ip = ''
let _port = '24651'
// let _port = '4000'

export const release = false // 发布 true | false

if (release === false) {
    _ip = '47.92.131.110'
    // _ip = '10.1.99.7'
} else if (release === true) {
    _ip = '192.168.1.114'
}

export const port = _port
export const ip = _ip

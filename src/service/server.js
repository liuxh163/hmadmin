/**
 * Created by CHB on 2018/12/3.
 */
let _ip = ''
let _port = ''

export const release = true // 发布 true | false

if (release === false) {
    _ip = '10.1.99.7'
    _port = '4000'
} else if (release === true) {
    _ip = '47.92.131.110'
    _port = '24651'
}

export const port = _port
export const ip = _ip

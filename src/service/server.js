/**
 * Created by CHB on 2018/12/3.
 */
let _ip = ''
let _port = ''

export const release = true // 发布 true | false

if (release === false) {
    _ip = '47.92.131.110'
    _port = '24651'
} else if (release === true) {
    _ip = 'http://hmapi.haima101.com'
    _port = '80'
}

export const port = _port
export const ip = _ip

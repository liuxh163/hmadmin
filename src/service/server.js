/**
 * Created by CHB on 2018/12/3.
 */
let _ip = ''
let _port = ''

export const release = false // 发布 true | false

if (release === false) {
    _ip = '192.168.0.99'
    _port = '8080'
} else if (release === true) {
    _ip = 'hmadmin.haima101.com'
    _port = '80'
}

export const port = _port
export const ip = _ip

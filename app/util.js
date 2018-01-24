import axios from 'axios'
import { setTimeout } from 'core-js/library/web/timers';
import { arch } from 'os';

export const getHtml = async (url) => {
    return axios.get(url, {
        headers: {
            'Content-Type': 'text/html'
        },
        timeout: 5000
    }).then((response) => {
        if (response.status === 200) {
            return response.data
        } else {
            throw new Error(response.message)
        }
    })


}

export const getHtmlPost = async (url, args) => {
    let qs = ''
    Object.keys(args).forEach(element => {
        qs += (element + '=' + (args[element])) + '&'
    });
    return axios.post(url, qs, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        timeout: 5000
    }).then((response) => {
        if (response.status === 200) {
            return response.data
        } else {
            throw new Error(response.message)
        }
    })


}
export const wait = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, time)
    })
}
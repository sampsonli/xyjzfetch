import axios from 'axios'
import { setTimeout } from 'core-js/library/web/timers';

export const getHtml = async (url) => {
    return axios.get(url, {
        headers: {
            'Content-Type': 'text/html'
        }
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
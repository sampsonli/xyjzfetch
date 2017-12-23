import cheerio from 'cheerio'
import http from 'http'
import {getHtml} from './util'

export const getCompIdList = async (pn = 1, pgsz = 15) => {

    let resp = await getHtml(`http://jzsc.mohurd.gov.cn/dataservice/query/comp/list?$pg=${pn}&pgsz=${pgsz}`)


    const ids = []
    let $ = cheerio.load(resp)
    $('.cursorDefault tr').each((i, ele) => {
        let href = $(ele).find('a').attr('href')
        if(href) {
            let id = href.substr(href.lastIndexOf('/') + 1)
            ids.push(id)
        }
        
    })
    return ids

}

export const getCompDetail = async (id) => {
    let resp = await getHtml(`http://jzsc.mohurd.gov.cn/dataservice/query/comp/compDetail/${id}`)
    const result = {}
    let $ = cheerio.load(resp)
    let trs = $('.datas_table tbody tr')
    result.tyshxym = trs.eq(0).find('td').text()
    result.qyfddbr = trs.eq(1).find('td').eq(0).text()
    result.qydjzclx = trs.eq(1).find('td').eq(1).text()
    result.qyzcsd = trs.eq(2).find('td').eq(0).text()
    result.qyjydz = trs.eq(3).find('td').eq(0).text()
    return result
}


export const getCompCaDetail = async (id) => {
    let resp = await getHtml(`http://jzsc.mohurd.gov.cn/dataservice/query/comp/caDetailList/${id}`)
    const result = {}
    let $ = cheerio.load(resp)
    // let trs = $('.datas_table tbody tr')
    // result.tyshxym = trs.eq(0).find('td').text()
    // result.qyfddbr = trs.eq(1).find('td').eq(0).text()
    // result.qydjzclx = trs.eq(1).find('td').eq(1).text()
    // result.qyzcsd = trs.eq(2).find('td').eq(0).text()
    // result.qyjydz = trs.eq(3).find('td').eq(0).text()
    return result
}




import cheerio from 'cheerio'
import http from 'http'
import path from 'path'
import fs from 'fs'
import {getHtml, getHtmlPost} from './util'

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


export const getCompAndCidList = async (pn = 1) => {
    let resp = await getHtmlPost(`http://ggzy.jiangxi.gov.cn/jxzbw/CustomQyInfo/sg.aspx`, {
        __VIEWSTATE: '0Vh5fXBZTw4L%2Bl5aS%2BWld6AWtL1Q%2FNoK29qutsdz9mg6nzWnJEkQNi6xoHNN7n6w98Z9hJyQFKVx4qkTDMzDp3kMUet%2FVHkrf' + 
        '4jEkclez%2F9ATGtJIMmtvvSt0lzl7tKRV9Mx4UUy%2BfYC8i%2FgjATteDAR4YEIXhh7szpzVNrk13%2B744NttH8%2F%2F7pQJDmcWpg79Eyk0VO9Ett' + 
        'v3Lsn9XvEtlRhN%2F8rlTA%2FHFapSW%2B%2BUlrgVh%2B3qblhbriUOQcqR25cgrem1UvzB6v5LXai%2BySB58DGfHz499DUQOgPtZtCh4juQK2bYajqj' + 
        'EVe30jnqu%2FHGBSU%2F9881p%2B207Db8TIhG261CHWAOfs71QFHoS9INtWEkiP5J0H0WJM6S2TfoYpPRYDtQPDztCcLZIxeki0mYxESRlql6XpcYBHwK' + 
        'iCt0d8I5bLDTJyPFGHVN4IGMTpPT6LDFQofw%2F41T6tCwAsWwJoWf21UQ61PCxlL49cqyVu5difhtRNFtG12%2FBLhSk6rT50O1gFwbenVDM143jQ5xov' + 
        '7dLN6WcVDezYPh26jnv7CIX%2FOi%2BZyxtkdlEAdZF0Ah4i3AFZYBohoRcrmktItb4c%2Ba2%2FuSMVAkbU6peG5nAFfbIsPTGsEOrc4pOl9jrWUi9gvV' + 
        'U9G0EWwlyqxchoEEr9v826olAzYr22QfUdi6HqCCPxie0YgygzBq4odI1h4Jx2zvZL5ingC31vBAlvkcfBEGLPwys3Hz%2FNhx4adgVyBLzzV79bhJDa3v' + 
        'arE4twSzxU96i444or%2F3mlIdbU2Boxa3VVfGR0XPP37QblDFAz8wgEbYZCcj2d2ynso6Qwwcuznmjn%2F5GeVPAsM%2BSxdXu%2Fxl%2F2ir4Ak%2BNA' +
        'wDPz7Fq5Ima36n4c7s87Nkzvc%2FpprSvYa9AQVrFkiYHE16uK1O5%2BCAZn4WTUhO9PpJ%2B54VQozRPhmsbxlJYNk4jEL8ziXuEvCUryvoTqo%2BnqLD' + 
        'kSmqzz1sQDlau5hPD%2BxYs5Pj2ChqxwseGssJBhAcXJpowuqk12iJMMGdbHN9bSAKwKQO8fNii3JTQ2Q17DEQcLzVV%2FE62aBoPoV7bM%2FjYJ4CF%2F' + 
        'znM%2BvuD8q0n9%2B022xfYoDSPDJTSOLC9ZcjOX6Fq8GYA1iOTDKKKsuSDXssjC9yXeGbQPq3HILbCiP5K07pq5jjK1THmWT0rzJj6x3DXVr55YIsr0jC' +
        'RS48fhRKyed5TtKO1ghj6LMrC54Y4Ji2pDoJc6dPml5KXociBWZtExSSns9gK6WtB5T2KzFPSsOJDmaEl433645SKqhAaR3oI9QfgUGHYKT0AyBeLPoFD%' + 
        '2B1htpt0AOQt1mh7HwShODGQXvm1TeIr0gq8n0ImBr4%2BT%2FCR4F%2BYyg3FgaFD6zh7XfYgoDfGquf6IueSfdjsAW7Me9uACa9z3V8JSY%2BKXyHmta' + 
        'NCeV5j8m2KqUND9VhWpbZALik%2FHAyRE8lGRnBhRU%2B9W%2FfTEJKzaMFD4B2Ge5Pvf2DQ4VKovANMIGvKJRQ7yL6sQNjzCuEv%2Fpmsw19x%2F7ah2d' + 
        'DkeGX5jSIep%2BuSh4hF20UyK1qPTQEIpYUrn%2F8ZHz3MtdRIJIbs0bKrRuekXCcqaQvCL2z4UsST5ckJ3nFZ%2B%2BjucchdJhU7waZARsxnEq0dbA26' + 
        'eaRZHpdn6WeaFIu0j2SVXqaPBjp8Yd4CtMMuJJxouygaVpSKpM06mmeiTQTUnvJBeRmbGEq9OdMUr%2BUOJjuDttpB3GEkBSPAHyFm93UfwHdICnICppzt' + 
        'QFjDcs9C%2F4QrnCp2Ko8k%2BforNrxM2I%2F3vx8id%2Bbs2H%2BUWAOkYgxww6i6oQNo2drMxI2u7efYyh7yHwXdO1O4hR%2BtHUtGR5bgr2Uyl4Mw1S' + 
        '1x7pnux6eydUMLBOvHO3XUkWqOcpomhtYeO5azndtXiWO%2B1D3ej5Uwazr1BKo%2FxQF184Z7D1kBJ6PNlN5BBcU1DMfvKBIXNzKqIymB%2BrZ%2FzHrz' + 
        'Z%2Fl70HCI1Xn%2FA%2Behv%2B0IDmykH2QO%2BThxpHZLPykhakc7mACILrj70mhBzPtShRTwxMjXyRaV2rlfKLiw0%2Fzt3nc1ujvs1bH5bzwNjnlzgn' +
        'ENOy6miuGfNYohsid%2BmMiPICHPddgdhq3nVl%2BMZpTZfoFUefzTyBBf4wAufN7qEWmUvEQNRCSlstLdvrVoBAI%2BxSnPKA90dufu2JkKE5UJj45kWp' +
        '84Xt7oE3%2B%2BRspd%2F8CsURptaQBgwiwxNOK1KR3HY4%2B1L7T%2F2Jgiizl7QeRzri7ljjeGQh993p3hoJo0Lq1Hkl4m07v0VPb6Kv2FlzHR%2FKGp' +
        'aZHCPS2HU9O8s%2FCHeNmHiFQ6JL0Rsv8CIx5BYEMDIPEyOnAIe%2FHhRBnfA5BgxsiMNvg1h1UvY6TsCSSKLxPvZR5lCJBOWyulQhAQR4b97F50Jc0yD5' + 
        'IVwFafgJyjp0Uxf51c7tOdv03B0%2BRAtsgQ1GJKCQMiPqIDHevRSN%2BWiHq4v67QAdBbDdgssk7Hw5QbZLdu6W7%2Fw5szFsjBnR6IGlHQtRcFEwNIfc' + 
        '5I9i2jv1cfhBp53kaJrCXi6xswce0RJdmCcFHz2MAlgcp%2FCzABD9buFeCZkHGPD2NHoVjmZQw3mcVerLuXSN0nFU77r2tY6RDoH5qGHyZd88yyatglXa' +
        'V78YUATOEIBWk0E5YHL2YREWXKU9YUwmcE7OCnj1ZYeI3zQIvsjLg1JqT4uqH6Fh1IjC7OmtfMRPSMidV64mZiqYojPLEvHl3kL%2F3Gt8Fz6OvACChxHp' + 
        'UDDf4ORu0milpw4yun4qQyHTCfS5%2FnFlnYCVVTfQ2zJbIxtgHZ0M2%2BlELFFMrKH7nepiSgi74%2BCRc%2BSq3eXIkLuIv4Hw%2BaFCF%2F10y12llGYvXagRTNebRwgJROaknvBiTHFSN6WwwUjLa1GKaBUd8bPHPfOWLTxFtTJCWsjxY%2B9%2BzBoXCyO26Z5VpNVHUL%2F0BvO%2BmiqM3VoyBfbTsKcoBzMQ62y%2BKEEDjlPaLQlsfdNNEYvEhxEN680dJxDFltvy6LQauh3PUp%2FL26CvJLHTgHlw93NXY9h3uwxYZ3Jgd3lZ65tbIkObj1%2BB7op0eonygdGGCA7zQBXK49uBu2OxRyaBcpJirmJ6Dyf%2B77OSx298uUP%2FZ0LvW61Aio1UzqvI8Ci%2Beg%2FBEoYZFKHOXzMhPkWObtrWnJmM0KbVkgJcYB0LD51Lfp%2BCGt6CY0q4tbDzI03DjkwruYsv7hXhx99WY%2FLwwlnRzxgWLtRPN5HjP0RLY13FdUVR%2FcfuahrZzlBRbz1YIUusHEnF8ZUvau6zrfkD%2F8deISy1YpkEMFqjm%2BzgvPNyQfX50qoAu4OfeTu%2FkdIpRhozdKvktbqMPXOx%2B8tm96Sb6WiE%2BJVz7ZikRBSOSMrnF2ui0BrZ1ZuGcVk4Zz3DedzCyN4hlLcDhAHAREOpcLqOjzL2tdG8cwq0bxKaRJXwgWzC0XMrFcy4CD8Z3ih%2BrN1benfkIx21rSQo6yQn7IJtLPjtUyRRIdwp7PagPl1LzKiFk0LvjmFigaXOCTymjbL7DxGm56S0s8olUcC6qKj3EhjWDs9k6cai75b6ChWP7l4az%2Bj6MsPaqylMOZiWBbvLAYuJtg9yVCWXbnNYAR29shSycdzR7qaGeEybecicpDRCdd1iKh%2FpGYkR%2F6xd835mddxANwb%2FarldofNwS2JSgd3GjiX1rYa2wp2MW78mWSdeIhggbKb9bzb33cSCmJGkiH3NfLsWO5PB5XWhf0UFIWKUxDK7KEGVovqtA1VspxBJBoc12D3x9q7gxaJEV4jIumnV%2Fibw6t6VElkYJsjy8l4%2BvQV9THP93V9y6zaHnOgOJfetn65lW9CG5LCUp%2FW%2FZZ2p5cjoI%2BL6O5FW5GeYwB0dBVEZnKVVcwbnHp6LdvgEJutTWJ2En%2FBlLf%2BfHek3dxMMgwIel7K2gMTFI1uUoXx2iNSB%2BKxXNrH19WtzmwrYJ6JLutEA0YIoMKvpMHiihfk6Iq2ABeWeL3Q30N2we0szeW8Ywj81zdWKpngujvw9IkMz3YW4IpHAyx0oCXbVC0QyoBustaAgg86QGUMJh8g3sFlrfQiWDS%2FXq3gDXfgDvAPJTH2epqDl7iJDeLRuYqEUhnuOypD9JOYXHFAoxkVgx5eC4Ybmd%2BGIa60pcLIzjPpBSII2ykEzUGvHlqbubUUJb0CEIE1OfBHNJVUgln5%2FYI4dCL9wn7N33U1Y8CHJvWKNCx5dzpKGvd9%2Be2bC9hU2Uj%2FA4w0PZ6YoUgtWtnTVLAnG8SPzYVxIY%2BjLvkRvuky5rONB5uyCIT95L8nQifKh2cnmlvLNP%2F0%2FYTZCRY21XqBQdSClrSe74aPP%2BMe1QOCvb19StKxNehszl9TSPebM%2B5ZrTolEFD%2B8Ldm%2BqCKNs5UwsycyuyHJX%2BxxGHbxeiTADQ3nEq8ZJB5Qm5SKyvTIwi1D2aMldXbpMbc1egitPKkOq1I%2BSAghZORrur1lzEot9u2Moa09t6jY2%2FasGdDHYvytBGJ4hJ7q5S784wOt8pOR9NZUak0znlx%2Fn6SnGq6FILqv9Hh%2FF2V3wAyPfOefFdNND%2FJUm%2BYiQG5ytVR4unkUegm9KhRE8rzxbd9BgUKihNGINmWxDx32xmLG9ywvY9YL0x3ElDZdarq1DZ0lT7Skce2k%2FQ1md%2FxvAgA90QarFJO7%2BeIg6Z2r%2FHDw4XZ3pZi9knabasEj0QpD4bAY0QOzOKqzsIDLl5o3jfr1phvINKX9%2BInL8qnZ5GhcU95kpJrr2X7LqBV5AMYrE%2BJ3ffRi1HEJEFVpJrvlSa15hVkLe%2FdHcxX9YNf9cbu2BlCoqmmCVtLt2hwtsyvxAKNvC7zdznWn4uE0kv%2BtdLuo8vyNfJwE9wW5hVd4uYg3hqs5VNQw0CqzyLCaLB%2B%2F4oRQw%2B4EoaRMCylaLnfM752QolJKdaiUxVQFaewXJlBf4%2FheWae6fq4ECzlYh%2Bx%2FizwwCTU1l16VPAe9NpOCyNB9CLNTOdFk2THxoJjh9V9vmWYtFMhKihaZUzkHzikNRAn8UVIJejgj7E46FMImHkX7BqKwdMWzXY9G6M%2BLyWQ5fanA%2FLsl4GPZa8Eo23RKanGGi5052KuWRyGdsYeOxCSB%2BMSd8sDQBrwqLdCbicx2cig5m0Hzb7v3ClWvJZviJZnXaGHc75sV9smUJKXwXkxZbrC8hQDvln9erlbFc%2FSxWXWLbpUcYkzSqf7qQlBY%2BXfMU6lN3fLwSvjiyk1Q%2Bpy3FhgUQ5d7acVO9KmViKj4lF%2BwFHoPEqWcj80DKptPGPY%2BIfwqZqAVzxX0Q%2FHnF9Be4D0IfLcW78OaFCU2TyPQFVyOut5KtRMOYnCSUgKFuzX7Ojg0%2BlqAdT0%2ByRbpIBIxet9CwWrY1kX03hFUJJ8P2pHeukewfqM8i0y4jbOKwD5OgwMBpkLuLm9fIHaEjHOuS7RvPH1c98YkS2ANAuIPOIzWN5p4oJqVXPNzA245o2vh7nNYqcufbjvTWW2DCJgglG%2Fg08PYmJnbGWCjGvhanaE6fib%2F%2FMlK5r3Tr0qEO7t9gNat1yF%2BUFpgIEU4%2FcilFg2ebzfysbTpAq6xaevGbkkmYboPoffs7hqq0Yk%2FQAIibvmBiHiFEEw5%2FOm5E8yWmfq4m5O8KjtxJtxLs2ub4QVMxGFalOyuNgHjrEaGAjKWncok97usRaSuf9ttKYimF7lwC%2BouKZBV9utnGdog61nVxeNl6AV%2B%2Fqqrg3CPqlztd9w3%2BRxRVhvaoV1UQPbvDmJ88714jHau6NWjLN4JHlVo7IhwNotceMIOYQmWh2FP7vi69918BusmKUZUxVS6WTLjhumwbW0GYg5GpVvzfrPU4Teda3sbPmeDqCat5ax6UAboXteaylrnXT5XgHeQXiEUqCTkHtCZkHG0zE6TBCQi9wDHHpHy8jO%2FWxc8pk4iquiCH9WoC6LYE%2FJynB5kuCRd%2FOTdybO%2BsAcjUQjy5ShZM8TYP7HWwTPSU7Xeqft2Us2wy1jTHmQGdmkbgNMa5aTHoRMwyUjomJ4nFZ0xujOHt0fAa7qL8fvj6DtZv2%2F9RLJS3y7%2FsxkQ3ciHmhIO8j3rXAb0En64%2Fw5V6FC%2FZGNnNZkBMlyiUwbmgUGE0D%2F4koZcNEIsREWQPGumDGCeiTH%2F0PnLhYMXMOIb3GXs%2FxaSKqAbdz%2BWhTYcbxj7KMF4XLV0W%2FGbOM5XseiSu0%2BrD4LCB3vu0Ht87ufzW6CNb4LP0rRo7WFxbFacuwgwlYOu2ojs61P0bZw3aU4wlVadJMLNmTRIQTpYRWZTGtQOKTvzw4vmLHmuCSciE7z2V18nY9HajJdEioWyKXUwf9RNkGZTKgU0lCqEfr8fpR0eqd7shAuXl%2BgVCsRz1Xk9RxREdrBJme2c035zGxRMj6UyeC2J3E0dNtZh2tbv7o390A%2FWRkhWzKNMssPkXQj%2BHCU047gIJCwCiIKV4u1lzYnDtdx6ebVCj1JrY%2Bn7SQrP3JCjv1Gh3Ut2T4bJk9mZQqYJFFaj62acBmumoxG%2F4uvmrWh9iK4anItSV45SrCfJXj3hnLwB72ZjPXX1gUQoeULGQsyinffHEqUT1E66GxQz5ILyOWSGG26IkPHuvOfh1lvB8He3p%2BNMTJKI3f75oTF2o4vnj08i%2FjMX97VJuKThRYpaOKYXpEO9l2Y0No6%2B27yj8Pd%2Bt7i2DQ1kyVQYYQnuwCkkSR7YMGilbyttOi4NqTZUeML9b7TDuQkAFt8hFfJIIVIb7jshZDJoQDwp8KqTk52Dg1%2FlUM2elXg9Fo%2Fwda4B%2FhfHoTYSSeGiCvD6Ni82FWtzOeF7JaZc9OUcx0znOHWj403ePYh7MAdcPHJKuDMwhdmoEZZuwfaYKqPsK425vNhK%2BaWVa5ecaAC9Kk0d%2BCLdY3XZkRyLplFDVBfvAxg3u9UXzHKHXMY2cjwvNj29vMU6X85tDNEvo%2Bzv09uUn5PhhMfMchyHQSCV1vAY6pVQJzFxMd649cJGgOEaRNVz4%2BaCJYHqFoNg5Y%2B7jlOsf9yunTNLV7DHP3wGy%2FKOvsPs9z14c6tPlBQ6yZgGmYJbh896OhnDcnicUmvPVdhH5QW9LnjOIgBQ5GMyeYcvft3VpVp9q%2BZtKuWhFoaKWD%2FUch3PK8K0mOagfYDfJ949OuRjXoiWmmfmjbJyXUKlyFraS7rvbyU1P5iCc2zrVD2oYPyREhahetWVlf7YC%2BHeqnReF3jGFsXV42y3MUqw6c1yT8vrwJls%2FPAFf%2BXHixKcQ1SmcMQPp43DAte495FZQ7soZS7wlyUZcAXxrO9k7%2F1nc%2FL31KJ0GgQCGdwwT30ktsl44e2G4%2BtsFUMP08Ozu%2BQoaxc3QrlcG3fJbAk6INYRaoMYquePkYDomz6Wfo0Eo7X4vU40SpLWL8byVM0p0PtlVjTZ%2B73Xb4qUGL3E%2FSPGGTxD3GJBSy1C47O6iKFfPKpqEqPh4Jh2WuIYL%2BDRWyfZ534UG3n4Ad8kBSjjsJ1A5MDJbP3Kg7JdkMKH%2BAEwrMUe4a%2Fi5j8naxduSD9knp3nvsycKVDk2J6v8nhSea1Wc%2FBFjoqLRyuwF1o8JV9s2RXCfcuk2INb3hR94TchBd%2BkAYZTsgT1HnzRmIcDYqXS1A%2Bt%2BPGpcHB3qX9%2BVs38I8Ekvnk0MPY1UgxevciWhAzHqcOInT1YWMlGyHPGW32FHsn30TZnzYOjo51wE%2BtNMIc7hR8DyHTq8%2By4%2BmAKBBAWZlR2A7vyFCULL4WdI9n9uQm5AYGWq%2B%2FCtHlpU7WqoP%2Br97tedqXqmW8fEpsje%2BRt0Zfnsga%2BW0dhUnvjsPd0RA91np7PhEL4Bke1vVnBRh7z%2B6ByxAhb1h0T5P%2FbFPhSdl57H9ftEEcs%2ByMvw11U6duWrcLrvM3f8enfMzGLWTPt1WP8QSLKzMU8p%2FdaRY8cUMPdWVhW0lqqf%2BBeSYrGcK9ObZzKQ%2B43w8e%2BZou8toogn7Q7Bu1UCp1x8GYGZF5tN%2FYZwBEubLMIHZuGp91DJSwyUXrp2EqtRsUXGFYNuLLTnhx%2FdbNgH%2FhAnTvKiQe1ddFvCyPj%2F661a4GLsId%2F0pPUBZLf7kTv8da7ghdEAGxNTOVvjJ04MBtRxQyUU8u91hgg9GJSkqMDbAj%2B0BhznKiw0opGP4agxiYLzBb2JDpKePk9%2BfaomGaRImVPIuoubzPFfj5sjyfVfYKXKYYklxvKNV8YLTujBh2wtKAZfTnhlZn%2FNljpgYCZBkEMcA381tT6Gk8fpKg9iaf%2F7mhhHgkeezbT%2FFZ%2BvFF6N5ql4EoQ0DtGMNT8C9WKzIuFEobDhNCh6DtTy9JZSblBrJuQwSuaZzRHPPFCgotQ86XipqAAUutDd7lGnQYLhTWAGX92KR6IHjbMEjIvaJtOta8J8U8%2BRDh4eDSQRH6ShW4QNhCiCSKw6EyP6Lx%2FI%2B%2F%2B8Db7sBKPzW2V4Q4CTLBI6JvL1r0CYot3wRT66V9uj3dt9IEybYKtlWX1LvQnMvG3QoaFnjoGTRpHb19cWMLHfNjxwlmh1%2BkoHQfXOPyKZLjahE1qrFa2B%2BiiTc6CDZxDOfTCjwwITX6SbkQUsBBZfnENjtUPneDEIxjNWNEVV5IV6vPw5vb1m818eIRogbWFqeoWEgrcB11QUajVD6RIZMeUJ5qXp29QB%2Fds%2BgGHn0sXg6GFzNQMNbUGaAjEbwUB9vTHGamdkRuWCUDVU%2FsZ8vzBEZZsbJlh74ThkqnJRH3rcBArJkLhz5%2BsHcVFwib148a%2Fg1o%2FYSTDoffY6nzD2lD%2FdW5xzZhQYHc4PgiCAabDmDRM1TySe3VQl2AcLF31pO4jQoBCfFx9UrJaW%2Ft3Z6pNmJq4KB5IHmOZaUGXxiMUeVjDWiZkjIP4B5wOwOOgzixsbFj2n%2FaFTfDFC3ImfgSnMfAo6jEJ2ddUVgTPcl9KjhfKB%2B6NdF%2B8wM%2Fdpu9%2F6m%2FsJGPJiCehFCTBAgzvUWHtIzZAdPx0ML8fbg95bMHTrvi4cT%2Flmi8LBZSWYqSp1yz9d3uXA4sYlMd9rsLeRNbrNLMTUzwCiNIf7Qter3LuGwlfLTsbzGEPDBLCIszKaBb3oNVH3U1IDkG7ghU5JaeKO%2FYpVQK5u%2FOuzGbqPHaK2v75C8kJQ4XZMwmQtXu2N97kqCDk16PJm5ZTWReZe7T5jtgNdj2vELtEwxE%2FdWaHvQKadN280M7ii9eOp2XOmy6pRZpJGRFc6txdscO7m2CMOhJuFlPC6%2FPdo12fuP2%2Fd1UwyTC1LZm3nFKKQjaf4vFwHw0qb8SXYKRhODrnsaQdLhUqSi85LKrc2nU1%2BmdeL%2BCPyPmCDLpxkBMptntHEDs5CplYqS5pm7fpIPh1jF%2F40uQKEJmeL7tOGfa3dJFbE2749hrJrlPZM9E4t7pIJi8cXoeI4DaFh963T4HRr9v6FHrrlmgP0%2BaOoshJNGifaDNZh6IHdwJd1BkQ0P634eM6B%2FsFv%2B16FhhaDrmlyFGOq33cOD8s7ySHQzn47ONxTQWQV%2Ft4TlBuOCF8ghPSlasrGHU2xLXHz7iBx1l3I2A2LIq%2B5ogCKcmj7lnu%2FwI1hv%2BAjaNw9CjrYX3C97%2FRM2ulsgRH0gItFxCzSkApICZHZeqVPBY5ZOR606BqwiVMqTgm4C5%2FUQSSuqfXD7TPNsEmdQwXtu%2FlNhpjZGZ8YUMmjT%2F%2FbwNWGWR7kEnXuLcoRNqfE2EVegg0tDupoHvKS9ruaO2I4OOCPlHfynRCp8AAPTn3%2FFY8EmsC7s4nzdGYrq7LjBvxLcC5ts7Kaqh2LpgSTi2v8BsfeFeAMayPjf6wuVizEZ6nnuLisXpzfa819njX1jP5mJ98Obcy0GvlvTN6UA6T5F07jxxkkbmonWEEfDnEMzTugGIUZOnrlHNL%2FuKFMttd8V%2F8g6B7UfI7wMTHi126VijNZuSXjamkuCjWPOYR3h04DT7Gqd25aNgiTAMU9e01wVxe3E0dzYC9Zsn4OfeLNwCcKbqEwEdfBNS2V%2B1U1fG4xH%2Bnzp7y9FQPznYql4tyiC0Xe8NvXQuLvQ%2F1ZIQGkU3TyeQbkiJ8buho16X5j%2FCyJFOxiHNpuIWSuzvoatkBL1mM41f0sqkLMuCvfRQ8uFk%2FtPr5qc3Rn7%2BH6y0Z2%2BvOCkeUTZnRKn6dDrK8YJlEWMwIBCFtdkvovDQ5zhDue0fc0aLQcNoduww5dcgCkLMMo8GKqBdPUDNO6228jO3MZyJ8eD8mheZUbzcQh7dloSbmUdO%2BMhjG5KzYhbewZ1cA%2BszaUu0uq1Ci%2F1BR9M%2F5DmzgsvtDXKa%2FNy7dA%2Fn83pB%2BX3VQcn7Z4AlsBlWfrqhLU0CinIDINzyqkDm4KUkOkYaxhZCOkE3TotBo7yC5iYujY5reWdIv65vo7J767L848mKJhGD9zo3HnliOPDz7jtPchvU6pMEz8AvyLj82EmPiqlxPE%2FcXP%2FaPz8WjLE0YfzSeJk6W4%2F4REeOc6S2%2BsrIaxKka8yRNR2p004ZliyfvC292qcVUsM7kCje8kjo6SRuFyvmG%2FE2flvsKa5aiQ9moopZ3pt%2FnwnJKFwjiVnmpbJ0yxKKHKBwgwjuTTJwXYhCQhjsZ%2Bd3aGMtUekeQ9hW5AGaC19Ic8MEQqrRF6uA%2F2oEybBAUrwZzMACk6OzQ8JKwznUVeArDvlnQSPn8CoK7MuFkfdKjV084liEzDR20Yz2Szw2ol9s%2B3TyeDFAdD5rzMbvc836b2yRRltMk79nEAWSsLUkhaNT6njCTLa6IC%2BmLg2mllSvXVI%2BVi%2Fxq08KzqT3C1ro4yaWw0Tra3kNIoWE%2FmqgceU1ZW158SS6JdnehI7qaFmlJIrqZaWQ%3D%3D',
        __EVENTTARGET: 'Pager',
        __EVENTARGUMENT: pn,
        txtUnitName: '',
        DDLXiaQu: 0,
        txtShowZiZhi: '',
        txtZiZhiCode: '',
        txtZiZhiName: ''
    })
    const result = {}
    let $ = cheerio.load(resp)
    const list = []
    $('#DataGrid1 a').each((i, ele) => {
        let href = $(ele).attr('href')
        if(href) {
            let guid = href.split('?')[1].split('&')[0].split('=')[1]
            list.push({
                guid,
                name: $(ele).text()
            })
    
        }
    })
    
    return list
}


export const getZiZhiList = async (guid) => {
//    ctl00$ScriptManager1=ctl00$ContentPlaceHolder1$UpdatePanel1|ctl00$ContentPlaceHolder1$rdoStatus$1&__EVENTTARGET=ctl00%24ContentPlaceHolder1%24rdoStatus%241&__EVENTARGUMENT=&__LASTFOCUS=&__VIEWSTATE=%2FwEPDwUKMTc4MjU3NDc1NA8WBh4IVmlld1R5cGUFATIeCkRhbldlaUd1aWQFJDA4M2YzMjM4LTI4YjMtNDk1ZC1iYTUxLTMxNDBmYjY2MmY5ZR4OU2VydmVyVGltZVNwYW4HAAAAAABAP0AWAmYPZBYCAgMPZBYIAgUPFgIeBFRleHQFEuaWveW3pei1hOi0qOWIl%2BihqGQCCQ8WBB8DBaQBPHNwYW4gaWQ9c3BhblJldHVybiBjbGFzcz0iUmV0dXJuT3V0IiAgb25tb3VzZW92ZXI9InRoaXMuY2xhc3NOYW1lPSdSZXR1cm5PdmVyJyIgb25tb3VzZW91dD0idGhpcy5jbGFzc05hbWU9J1JldHVybk91dCciIG9uY2xpY2s9J2phdmFzY3JpcHQ6aGlzdG9yeS5nbygtMSknPjwvc3Bhbj4eB1Zpc2libGVoZAILDxYCHwMFpAE8c3BhbiBpZD0iU3Bhbl9jbG9zZSIgY2xhc3M9IkNsb3NlT3V0IiAgb25tb3VzZW92ZXI9InRoaXMuY2xhc3NOYW1lPSdDbG9zZU92ZXInIiBvbmNsaWNrPSdqYXZhc2NyaXB0OndpbmRvdy5jbG9zZSgpOycgb25tb3VzZW91dD0idGhpcy5jbGFzc05hbWU9J0Nsb3NlT3V0JyI%2BPC9zcGFuPmQCDQ9kFgJmD2QWAmYPZBYIAgEPDxYCHwMFHuaWveW3peS8geS4mui1hOi0qOihqOS4tOaXtuihqGRkAgYPZBYCZg9kFgICAQ8QZGQWAWZkAg4PDxYGHg5DdXN0b21JbmZvVGV4dAWOAeiusOW9leaAu%2BaVsO%2B8mjxmb250IGNvbG9yPSJibHVlIj48Yj4wPC9iPjwvZm9udD4g5oC76aG15pWw77yaPGZvbnQgY29sb3I9ImJsdWUiPjxiPjA8L2I%2BPC9mb250PiDlvZPliY3pobXvvJo8Zm9udCBjb2xvcj0icmVkIj48Yj4xPC9iPjwvZm9udD4eC1JlY29yZGNvdW50Zh4QQ3VycmVudFBhZ2VJbmRleAIBZGQCEA88KwALAQAPFggeC18hSXRlbUNvdW50Zh4IRGF0YUtleXMWAB4JUGFnZUNvdW50AgEeFV8hRGF0YVNvdXJjZUl0ZW1Db3VudGZkZGR8eOy1fW3dZnjQuyrEXOZzr9ZxIg%3D%3D&__EVENTVALIDATION=%2FwEWEALI2NmNBgLC3YvaAwLQopvSAgLSktWgBQLTktWgBQLQktWgBQLRktWgBQKHqtiADQKEqtiADQKJxfLuAQL3uvOGAgKI%2BJrmBQKFy4zdBQLGrLf4BALhldWNDwKQ2vtNSR1SlZlKIBJchViFeazwyrQ4eMM%3D&ctl00$ContentPlaceHolder1$HidState=0&ctl00$ContentPlaceHolder1$S_ZiZhiJiBieCode=%E6%89%80%E6%9C%89%E9%80%89%E9%A1%B9&ctl00$ContentPlaceHolder1$rdoStatus=3&

    let resp = await getHtmlPost(`http://ggzy.jiangxi.gov.cn/jxhy/HuiYuanInfoMis_JX/BackEnd/ShiGongZiZhi/ZiZhi_List.aspx?ViewType=2&DanWeiType=131&DanWeiGuid=${guid}`, {
        ctl00$ScriptManager1:'ctl00$ContentPlaceHolder1$UpdatePanel1|ctl00$ContentPlaceHolder1$rdoStatus$1',
        __EVENTTARGET:'ctl00$ContentPlaceHolder1$rdoStatus$1',
        __EVENTARGUMENT:'',
        __LASTFOCUS:'',
        __VIEWSTATE:encodeURIComponent('/wEPDwUKMTc4MjU3NDc1NA8WBh4IVmlld1R5cGUFATIeCkRhbldlaUd1aWQFJDA4M2YzMjM4LTI4YjMtNDk1ZC1iYTUxLTMxNDBmYjY2MmY5ZR4OU2VydmVyVGltZVNwYW4HAAAAAACIU0AWAmYPZBYCAgMPZBYIAgUPFgIeBFRleHQFEuaWveW3pei1hOi0qOWIl+ihqGQCCQ8WBB8DBaQBPHNwYW4gaWQ9c3BhblJldHVybiBjbGFzcz0iUmV0dXJuT3V0IiAgb25tb3VzZW92ZXI9InRoaXMuY2xhc3NOYW1lPSdSZXR1cm5PdmVyJyIgb25tb3VzZW91dD0idGhpcy5jbGFzc05hbWU9J1JldHVybk91dCciIG9uY2xpY2s9J2phdmFzY3JpcHQ6aGlzdG9yeS5nbygtMSknPjwvc3Bhbj4eB1Zpc2libGVoZAILDxYCHwMFpAE8c3BhbiBpZD0iU3Bhbl9jbG9zZSIgY2xhc3M9IkNsb3NlT3V0IiAgb25tb3VzZW92ZXI9InRoaXMuY2xhc3NOYW1lPSdDbG9zZU92ZXInIiBvbmNsaWNrPSdqYXZhc2NyaXB0OndpbmRvdy5jbG9zZSgpOycgb25tb3VzZW91dD0idGhpcy5jbGFzc05hbWU9J0Nsb3NlT3V0JyI+PC9zcGFuPmQCDQ9kFgJmD2QWAmYPZBYIAgEPDxYCHwMFHuaWveW3peS8geS4mui1hOi0qOihqOS4tOaXtuihqGRkAgYPZBYCZg9kFgICAQ8QZGQWAWZkAg4PDxYGHg5DdXN0b21JbmZvVGV4dAWOAeiusOW9leaAu+aVsO+8mjxmb250IGNvbG9yPSJibHVlIj48Yj4wPC9iPjwvZm9udD4g5oC76aG15pWw77yaPGZvbnQgY29sb3I9ImJsdWUiPjxiPjA8L2I+PC9mb250PiDlvZPliY3pobXvvJo8Zm9udCBjb2xvcj0icmVkIj48Yj4xPC9iPjwvZm9udD4eC1JlY29yZGNvdW50Zh4QQ3VycmVudFBhZ2VJbmRleAIBZGQCEA88KwALAQAPFggeC18hSXRlbUNvdW50Zh4IRGF0YUtleXMWAB4JUGFnZUNvdW50AgEeFV8hRGF0YVNvdXJjZUl0ZW1Db3VudGZkZGSOLt3Jb7/PHDzEtTVke3k3R/A4Sw=='),
        __EVENTVALIDATION:encodeURIComponent('/wEWEAKDwub6BQLC3YvaAwLQopvSAgLSktWgBQLTktWgBQLQktWgBQLRktWgBQKHqtiADQKEqtiADQKJxfLuAQL3uvOGAgKI+JrmBQKFy4zdBQLGrLf4BALhldWNDwKQ2vtNJVWUEDWJyGO3XjvbB2K1DEzgQYc='),
        ctl00$ContentPlaceHolder1$HidState:0,
        ctl00$ContentPlaceHolder1$S_ZiZhiJiBieCode:encodeURIComponent('所有选项'),
        ctl00$ContentPlaceHolder1$rdoStatus:3
    })
    const result = {}
    let $ = cheerio.load(resp)
    const list = []
    $('.RowItemsStyle').each((i, ele) => {
        let certno = $(ele).find('td').eq(1).text().replace(/\s*/g, '')
        let name = $(ele).find('td').eq(2).text().replace(/\s*/g, '')
        let expired_time = $(ele).find('td').eq(3).text().replace(/\s*/g, '').split('-').join('/')
        if(expired_time !== '') {
            expired_time = new Date(expired_time)
            list.push({
                certno,
                name,
                expired_time
            })
        } else {
            list.push({
                certno,
                name
            })
        }
        
    })
    
    return list

}

export const getPersonList = async (guid) => {
    let resp = await getHtmlPost(`http://ggzy.jiangxi.gov.cn/jxhy/HuiYuanInfoMis_JX/BackEnd/PMInfo/PM_List.aspx?ViewType=2&DanWeiType=131&DanWeiGuid=${guid}`, {
        ctl00$ScriptManager1:'ctl00$ContentPlaceHolder1$UpdatePanel1|ctl00$ContentPlaceHolder1$rdoStatus$1',
        __EVENTTARGET:'ctl00%24ContentPlaceHolder1%24rdoStatus%241',
        __EVENTARGUMENT: '',
        __LASTFOCUS: '',
        __VIEWSTATE:'%2FwEPDwUJMjEzNTU5NzQ3DxYGHgpEYW5XZWlHdWlkBSRhODA3N2JjNC0wNmIzLTQwNzMtYWVjMy05NzI2OTIwMzk0ZjYeCkRhbldlaVR5cGUFAzEzMR4OU2VydmVyVGltZVNwYW4HAAAAAABwV0AWAmYPZBYCAgMPZBYIAgUPFgIeBFRleHQFD%2BW7uumAoOW4iOWIl%2BihqGQCCQ8WBB8DBaQBPHNwYW4gaWQ9c3BhblJldHVybiBjbGFzcz0iUmV0dXJuT3V0IiAgb25tb3VzZW92ZXI9InRoaXMuY2xhc3NOYW1lPSdSZXR1cm5PdmVyJyIgb25tb3VzZW91dD0idGhpcy5jbGFzc05hbWU9J1JldHVybk91dCciIG9uY2xpY2s9J2phdmFzY3JpcHQ6aGlzdG9yeS5nbygtMSknPjwvc3Bhbj4eB1Zpc2libGVoZAILDxYCHwMFpAE8c3BhbiBpZD0iU3Bhbl9jbG9zZSIgY2xhc3M9IkNsb3NlT3V0IiAgb25tb3VzZW92ZXI9InRoaXMuY2xhc3NOYW1lPSdDbG9zZU92ZXInIiBvbmNsaWNrPSdqYXZhc2NyaXB0OndpbmRvdy5jbG9zZSgpOycgb25tb3VzZW91dD0idGhpcy5jbGFzc05hbWU9J0Nsb3NlT3V0JyI%2BPC9zcGFuPmQCDQ9kFgICAQ9kFgJmD2QWCAIBDw8WAh8DBRjpobnnm67nu4%2FnkIbooajkuLTml7booahkZAIGD2QWAmYPZBYCAgEPEGRkFgFmZAIMDw8WBh4OQ3VzdG9tSW5mb1RleHQFjgHorrDlvZXmgLvmlbDvvJo8Zm9udCBjb2xvcj0iYmx1ZSI%2BPGI%2BMDwvYj48L2ZvbnQ%2BIOaAu%2BmhteaVsO%2B8mjxmb250IGNvbG9yPSJibHVlIj48Yj4wPC9iPjwvZm9udD4g5b2T5YmN6aG177yaPGZvbnQgY29sb3I9InJlZCI%2BPGI%2BMTwvYj48L2ZvbnQ%2BHgtSZWNvcmRjb3VudGYeEEN1cnJlbnRQYWdlSW5kZXgCAWRkAg4PPCsACwEADxYIHgtfIUl0ZW1Db3VudGYeCERhdGFLZXlzFgAeCVBhZ2VDb3VudAIBHhVfIURhdGFTb3VyY2VJdGVtQ291bnRmZGRkEzIo%2BUU2a38Y6za14aPG40SI4Ig%3D',
        __EVENTVALIDATION:'%2FwEWDAKNoeGKBgLC3YvaAwLZn9utDQKgv%2Fb5BwKHqtiADQKEqtiADQKJxfLuAQL3uvOGAgKI%2BJrmBQLGrLf4BALhldWNDwKQ2vtN2oApNbqptDQz5UtiAHUiPwlU%2FO4%3D',
        ctl00$ContentPlaceHolder1$HidState:0,
        ctl00$ContentPlaceHolder1$S_PMGuid:'',
        ctl00$ContentPlaceHolder1$S_PMName:'',
        ctl00$ContentPlaceHolder1$rdoStatus:3
    })
    const result = {}
    let $ = cheerio.load(resp)
    const list = []
    $('.RowItemsStyle').each((i, ele) => {
        let name = $(ele).find('td').eq(2).text().replace(/\s*/g, '')
        let sex = $(ele).find('td').eq(3).text().replace(/\s*/g, '')
        let idcard = $(ele).find('td').eq(4).text().replace(/\s*/g, '')
        let regno = $(ele).find('td').eq(5).find('span').html().replace(/<font[^>]*>.*<\/font>(.*)<br>/, ($0,$1)=>$1)
        let level = $(ele).find('td').eq(6).find('span').text().replace(/<br>/, '')
        let innum =  $(ele).find('td').eq(7).find('span').text().replace(/\s*/g, '')
        let ctime = $(ele).find('td').eq(8).text().replace(/\s*/g, '')
        ctime = new Date(ctime.replace(/^(\d{4})年(\d{2})月(\d{2})日/, ($0,$1,$2,$3) => {
            return [$1, $2, $3].join('/')
        }))
        list.push({
            name,
            sex,
            idcard,
            regno,
            level,
            innum,
            ctime
        })
    })
    
    return list

}


export const getBasicInfo = async (bpath) => {

    const dinfo = fs.readdirSync(bpath)
    const list = []
    dinfo.forEach((file, idx) => {
        if(idx<5) {
            const content = fs.readFileSync(path.join(bpath, file), 'utf-8')
            let $ = cheerio.load(content)
            let trs = $('#ctl00_ContentPlaceHolder1_tdContainer>table>tbody>tr')
            // let name = tbody.find('td').eq(2).text().replace(/\s*/g, '')
            // let sex = $(ele).find('td').eq(3).text().replace(/\s*/g, '')
            // let idcard = $(ele).find('td').eq(4).text().replace(/\s*/g, '')
            // let regno = $(ele).find('td').eq(5).find('span').html().replace(/<font[^>]*>.*<\/font>(.*)<br>/, ($0,$1)=>$1)
            // let level = $(ele).find('td').eq(6).find('span').text().replace(/<br>/, '')
            // let innum =  $(ele).find('td').eq(7).find('span').text().replace(/\s*/g, '')
            // let ctime = $(ele).find('td').eq(8).text().replace(/\s*/g, '')

            // 基本信息
            let name = trs.eq(3).find('td').eq(1).text().replace(/\s*/g, '')
            let regArea = trs.eq(3).find('td').eq(3).text().replace(/\s*/g, '')
            let detailAddr = trs.eq(4).find('td').eq(1).text().replace(/\s*/g, '')

            let post = trs.eq(5).find('td').eq(1).text().replace(/\s*/g, '')
            let netAddr = trs.eq(5).find('td').eq(3).text().replace(/\s*/g, '')
            let email = trs.eq(5).find('td').eq(5).text().replace(/\s*/g, '')

            let gsdjNo = trs.eq(6).find('td').eq(1).text().replace(/\s*/g, '')
            let dsdjNo = trs.eq(6).find('td').eq(3).text().replace(/\s*/g, '')


            // 组织机构代码证
            let zjjgdmzNo = trs.eq(8).find('td').eq(1).text().replace(/\s*/g, '')
            let validendTime = trs.eq(8).find('td').eq(5).text().replace(/\s*/g, '')



            // 企业法定代表人证书
            let fddbr = trs.eq(10).find('td').eq(1).text().replace(/\s*/g, '')
            let idcard = trs.eq(10).find('td').eq(3).text().replace(/\s*/g, '')
            let zhiwu = trs.eq(10).find('td').eq(5).text().replace(/\s*/g, '')

            let zhichen = trs.eq(11).find('td').eq(1).text().replace(/\s*/g, '')
            let phoneNo = trs.eq(11).find('td').eq(3).text().replace(/\s*/g, '')

            // 企业基本帐户
            let khbank = trs.eq(13).find('td').eq(1).text().replace(/\s*/g, '')
            let baseNo = trs.eq(13).find('td').eq(3).text().replace(/\s*/g, '')


            // 联系人信息
            let lxPerson = trs.eq(15).find('td').eq(1).text().replace(/\s*/g, '')
            let mphone = trs.eq(15).find('td').eq(3).text().replace(/\s*/g, '')
            let phone = trs.eq(15).find('td').eq(5).text().replace(/\s*/g, '')

            // 营业执照
            let regNo = trs.eq(18).find('td').eq(1).text().replace(/\s*/g, '')
            let regMoney = trs.eq(18).find('td').eq(5).text().replace(/\s*/g, '')


            let compType = trs.eq(19).find('td').eq(1).text().replace(/\s*/g, '')
            let jyScope = trs.eq(20).find('td').eq(1).text().replace(/\s*/g, '')
            let createDate = trs.eq(21).find('td').eq(1).text().replace(/\s*/g, '')
            let njDate = trs.eq(21).find('td').eq(3).text().replace(/\s*/g, '')
            let yyqx = trs.eq(22).find('td').eq(1).text().replace(/\s*/g, '')

            list.push({
                basic: {
                    name, regArea, detailAddr, post, netAddr, email, gsdjNo, dsdjNo
                },
                zzjgdmz: {
                    zjjgdmzNo, validendTime
                },
                qyfddbrzs: {
                    fddbr, idcard, zhiwu, zhichen, phoneNo
                },
                qyjbzh: {
                    khbank, baseNo
                },
                lxrxx: {
                    lxPerson, mphone, phone
                },
                yyzz: {
                    regNo, regMoney, compType, jyScope, createDate, njDate, yyqx
                }

            })
            // console.log(njDate)
            // console.log(phone)
        }

        console.log(list)
        
        
    })



}
import {connectDatabase} from './app/db'
import {getCompAndCidList, getZiZhiList, getPersonList} from './app/crawling'


(async () => {

    const connect = await connectDatabase('mongodb://localhost/xyjzfetch-test')
    const list = await getCompAndCidList(1);
    // console.log(list)

    let companyList = [], company;
    for(let i = 0; i < list.length; i++) {
      company = {}
      company.name = list[i].name
      company.zizhi = await getZiZhiList(list[i].guid)
      company.plist = await getPersonList(list[i].guid)
      companyList.push(company)
    }

    console.log(JSON.stringify(companyList))


  
      // connect.close()
})()
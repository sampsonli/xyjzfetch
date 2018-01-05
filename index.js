import { connectDatabase } from './app/db'
import { getCompAndCidList, getZiZhiList, getPersonList } from './app/crawling'
import Company from './app/models/company'


(async () => {

  const connect = await connectDatabase('mongodb://localhost/xyjzfetch-test')
  let count = 0, total;
  for (let i = 0; i < 365; i++) {
    const list = await getCompAndCidList(i + 1);
    if(list.length) {
      let companyList = [], company;
      for (let i = 0; i < list.length; i++) {
        company = {}
        company.name = list[i].name
        company.zizhi = await getZiZhiList(list[i].guid)
        company.plist = await getPersonList(list[i].guid)
        companyList.push(company)
      }
  
      for (let i = 0; i < companyList.length; i++) {
        await Company.findOneAndUpdate({ name: companyList[i].name }, companyList[i], { upsert: true })
      }
      total = await Company.count()
      count += list.length
      console.log(`第${i + 1}次抓取，当前抓了${count}条数据， 当前一共有${total}条数据`)
    }
  
  }
  connect.close()
})()
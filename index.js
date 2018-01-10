import { connectDatabase } from './app/db'
import { getCompAndCidList, getZiZhiList, getPersonList, getBasicInfo } from './app/crawling'
import Company from './app/models/company'
import baseInfo from './app/models/baseinfo'



async function getOnePage (pn) {
  const list = await getCompAndCidList(pn);
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
      const total = await Company.count()
      console.log(`第${pn}次抓取， 当前一共有${total}条数据`)
    }
}
(async () => {

  const connect = await connectDatabase('mongodb://localhost/xyjzfetch-test')
  // for (let i = 0; i < 365; i++) {
  //   try {
  //     await getOnePage(i + 1)
  //   } catch (e) {
  //     console.log(`第${i+1}次抓取失败， 失败原因：${e.message}`)
  //   }
  // }
  // 
  let list = getBasicInfo('C:/Users/sampson/Desktop/fjszsgdw/show')
  console.log(list)
  for(let i = 0; i < list.length; i++) {
    await baseInfo.findOneAndUpdate({ name: list[i].name }, list[i], { upsert: true })
  }



  connect.close()
})()
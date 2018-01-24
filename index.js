import { connectDatabase } from './app/db'
import { getCompAndCidList, getZiZhiList, getPersonList, getBasicInfo } from './app/crawling'
import Company from './app/models/company'
import baseInfo from './app/models/baseinfo'
import baseinfo from './app/models/baseinfo';



async function getOnePage(pn) {
  const list = await getCompAndCidList(pn);
  if (list.length) {
    let companyList = [], company;
    for (let i = 0; i < list.length; i++) {
      company = {}
      company.name = list[i].name
      company.zizhi = await getZiZhiList(list[i].guid)
      company.plist = await getPersonList(list[i].guid)
      companyList.push(company)
    }

    for (let i = 0; i < companyList.length; i++) {
      let base = await baseinfo.findOne({ name: companyList[i].name })
      let allinfo = companyList[i]
      if (base) {
        delete base._doc.__v
        delete base._doc._id
        allinfo = { ...base._doc, ...companyList[i] }
        // console.log(allinfo)
        await Company.findOneAndUpdate({ name: companyList[i].name }, allinfo, { upsert: true })
      }
      // await Company.findOneAndUpdate({ name: companyList[i].name }, allinfo, { upsert: true })
    }
    const total = await Company.count()
    console.log(`第${pn}次抓取， 当前一共有${total}条数据`)
  }
}
(async () => {

  const connect = await connectDatabase('mongodb://localhost/xyjzfetch')
  try {
    if (process.env.CRAW_WEB === 'true') {
      for (let i = 316  ; i < 365; i++) {
        try {
          await getOnePage(i + 1)
        } catch (e) {
          console.log(`第${i + 1}次抓取失败， 失败原因：${e.message}`)
        }
      }
  
    } else {
      let list = getBasicInfo('C:/Users/sampson/Desktop/fjszsgdw/show')
      for (let i = 0; i < list.length; i++) {
        await baseInfo.findOneAndUpdate({ name: list[i].name }, list[i], { upsert: true })
      }
    }
  } catch(e) {

    console.error(e.message)
  } finally {
    connect.close()
  }
  
})()
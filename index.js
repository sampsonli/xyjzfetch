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

async function getOne (base) {
  let allinfo = {...base._doc}
  delete allinfo.__v
  delete allinfo._id
  allinfo.zizhi = await getZiZhiList(allinfo.guid)
  allinfo.plist = await getPersonList(allinfo.guid)
  await Company.findOneAndUpdate({ name: allinfo.name }, allinfo, { upsert: true })
}
async function doCraw() {
  let count = await baseinfo.find({}).count()
  for(let i = 360; i< count; i++) {
    let base = (await baseinfo.find({}).skip(i).limit(1))[0]
    try {
      await getOne(base)
      console.log("success one item:" + i)
    } catch(e) {
      console.log("fail one item:" + i + ' and retry...')
      await getOne(base)
      console.log("success one item:" + i)
    }
    

  }
 

}


(async () => {

  const connect = await connectDatabase('mongodb://localhost/xyjzfetch')
  try {
    if (process.env.CRAW_WEB === 'true') {
      await doCraw()
  
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
import {connectDatabase} from './app/db'
import {getCompIdList, getCompDetail} from './app/crawling'


(async () => {

    const connect = await connectDatabase('mongodb://localhost/xyjzfetch-test')
    const idList = await getCompIdList();
    console.log(idList)


      let detail = await getCompDetail('001607220057278907')
      console.log(detail)
      connect.close()
})()
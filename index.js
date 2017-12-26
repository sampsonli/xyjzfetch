import {connectDatabase} from './app/db'
import {getCompAndCidList, getZiZhiList} from './app/crawling'


(async () => {

    // const connect = await connectDatabase('mongodb://localhost/xyjzfetch-test')
    // const result = await getCompAndCidList(1);
    // console.log(result)
  
    try{
      const zizhi = await getZiZhiList('083f3238-28b3-495d-ba51-3140fb662f9e')
      console.log(zizhi)
    }catch(e) {
      console.error(e.message)
    }
    
      // connect.close()
})()
import open_atk_1 from './ragnaJSON/open_atk_1.json'
import open_atk_2 from './ragnaJSON/open_atk_2.json'
import save_atk_1 from './ragnaJSON/save_atk_1.json'
import save_atk_2 from './ragnaJSON/save_atk_2.json'
import save_smeltatk_1 from './ragnaJSON/save_smeltatk_1.json'

export default {
  getItemList(){
    return Array(0).concat(
      open_atk_1, 
      open_atk_2,
      save_atk_1,
      save_atk_2,
      save_smeltatk_1,
    ).sort((obj1, obj2)=>{
      return obj1.name > obj2.name? 1: -1
    }).map((obj, index)=>{
      return {...obj, key:index}
    })
  }
}
/*
  해체 보상(ATK)
    open_atk_1.json : https://cafe.naver.com/ragnarokmmorpg/269290
    open_atk_2.json : https://cafe.naver.com/ragnarokmmorpg/269292  
  저장 보상(ATK)
    save_atk_1.json : https://cafe.naver.com/ragnarokmmorpg/269297
    save_atk_2.json : https://cafe.naver.com/ragnarokmmorpg/269298
  저장 보상(제련ATK)
    save_smeltatk_1.json : https://cafe.naver.com/ragnarokmmorpg/269300

JSON.stringify(
  Array.from(document.querySelectorAll('table')[5].querySelectorAll('tr'))
  .reduce((resultEntry, trObj, trIndex)=>{
    const index = trIndex % 7
    if(index == 0) resultEntry.push({})
    else{
      const thisObj = resultEntry[resultEntry.length-1]
      if(index == 1){
        thisObj.imageSrc = trObj.querySelectorAll('td')[0].querySelector('img').getAttribute('src')
        thisObj.name = trObj.querySelectorAll('td')[1].innerHTML
        thisObj.option = trObj.querySelectorAll('td')[2].innerHTML.split(', ')
      }else if(index == 3){
        thisObj.savePoint = trObj.querySelectorAll('td')[0].innerHTML.split(', ')
        thisObj.openPoint = trObj.querySelectorAll('td')[1].innerHTML.split(', ')
      }else if(index == 5){
        thisObj.recipe = trObj.querySelectorAll('td')[0].innerHTML.split(', ')
      }
    }
    return resultEntry
  }, []).map((trObj)=>{
    const keyword = []
    function mapFunction(obj){
      const thisKey = obj.replace(/[0-9\+\- \개\.\,\%]+$/,'')
      if(!keyword.includes(thisKey)) keyword.push(thisKey)
      const thisValue = obj.replace(/(.*?)([0-9\+\- \개\.\,\%]+$)/,'$2').trim()
      return {
        name: thisKey,
        number: Number(thisValue.replace(/(.*?)([^0-9]*$)/,'$1').replace(/,/g,'')),
        unit: thisValue.replace(/(.*?)([^0-9]*$)/,'$2'),
        origin: obj,
      }
    }
    trObj.option = trObj.option.map(mapFunction)
    trObj.savePoint = trObj.savePoint.map(mapFunction)
    trObj.openPoint = trObj.openPoint.map(mapFunction)
    trObj.recipe = trObj.recipe.map(mapFunction)
    return {...trObj, keyword}
  })
)
*/
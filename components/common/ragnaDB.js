import item from './ragnaJSON/item/item.json'
import open_atk_1 from './ragnaJSON/item/open_atk_1.json'
import open_atk_2 from './ragnaJSON/item/open_atk_2.json'
import save_atk_1 from './ragnaJSON/item/save_atk_1.json'
import save_atk_2 from './ragnaJSON/item/save_atk_2.json'
import save_smeltatk_1 from './ragnaJSON/item/save_smeltatk_1.json'

import food from './ragnaJSON/food/food.json'
import food_recipe from './ragnaJSON/food/food_recipe.json'
import food_luxury_1star from './ragnaJSON/food/food_luxury_1star.json'
import food_luxury_2star from './ragnaJSON/food/food_luxury_2star.json'
import food_luxury_3star from './ragnaJSON/food/food_luxury_3star.json'
import food_luxury_4star from './ragnaJSON/food/food_luxury_4star.json'
import food_luxury_5star from './ragnaJSON/food/food_luxury_5star.json'
import food_bbq_1star from './ragnaJSON/food/food_bbq_1star.json'
import food_bbq_2star from './ragnaJSON/food/food_bbq_2star.json'
import food_bbq_3star from './ragnaJSON/food/food_bbq_3star.json'
import food_bbq_4star from './ragnaJSON/food/food_bbq_4star.json'
import food_bbq_5star from './ragnaJSON/food/food_bbq_5star.json'
import food_magic_1star from './ragnaJSON/food/food_magic_1star.json'
import food_magic_2star from './ragnaJSON/food/food_magic_2star.json'
import food_magic_3star from './ragnaJSON/food/food_magic_3star.json'
import food_magic_4star from './ragnaJSON/food/food_magic_4star.json'
import food_magic_5star from './ragnaJSON/food/food_magic_5star.json'
import food_tea_1star from './ragnaJSON/food/food_tea_1star.json'
import food_tea_2star from './ragnaJSON/food/food_tea_2star.json'
import food_tea_3star from './ragnaJSON/food/food_tea_3star.json'
import food_tea_4star from './ragnaJSON/food/food_tea_4star.json'
import food_tea_5star from './ragnaJSON/food/food_tea_5star.json'

export default {

  getFoodList(){
    return food

    const homepageDic = Array(0).concat(
      food_luxury_1star.map((obj)=>{return {...obj,type:'럭셔리 조리대'}}),
      food_luxury_2star.map((obj)=>{return {...obj,type:'럭셔리 조리대'}}),
      food_luxury_3star.map((obj)=>{return {...obj,type:'럭셔리 조리대'}}),
      food_luxury_4star.map((obj)=>{return {...obj,type:'럭셔리 조리대'}}),
      food_luxury_5star.map((obj)=>{return {...obj,type:'럭셔리 조리대'}}),
      food_bbq_1star.map((obj)=>{return {...obj,type:'모험 바비큐 그릴'}}),
      food_bbq_2star.map((obj)=>{return {...obj,type:'모험 바비큐 그릴'}}),
      food_bbq_3star.map((obj)=>{return {...obj,type:'모험 바비큐 그릴'}}),
      food_bbq_4star.map((obj)=>{return {...obj,type:'모험 바비큐 그릴'}}),
      food_bbq_5star.map((obj)=>{return {...obj,type:'모험 바비큐 그릴'}}),
      food_magic_1star.map((obj)=>{return {...obj,type:'마법의 압력솥'}}),
      food_magic_2star.map((obj)=>{return {...obj,type:'마법의 압력솥'}}),
      food_magic_3star.map((obj)=>{return {...obj,type:'마법의 압력솥'}}),
      food_magic_4star.map((obj)=>{return {...obj,type:'마법의 압력솥'}}),
      food_magic_5star.map((obj)=>{return {...obj,type:'마법의 압력솥'}}),
      food_tea_1star.map((obj)=>{return {...obj,type:'로맨틱 냉음료차'}}),
      food_tea_2star.map((obj)=>{return {...obj,type:'로맨틱 냉음료차'}}),
      food_tea_3star.map((obj)=>{return {...obj,type:'로맨틱 냉음료차'}}),
      food_tea_4star.map((obj)=>{return {...obj,type:'로맨틱 냉음료차'}}),
      food_tea_5star.map((obj)=>{return {...obj,type:'로맨틱 냉음료차'}}),
    ).filter((obj, index, self)=>{
      let indexNumber = undefined
      self.find((selfObj, selfIndex)=>{
        if(selfObj.name==obj.name) indexNumber=selfIndex
      })
      return indexNumber === index
    })
    .map((trObj)=>{
      function mapFunction(obj){
        const thisKey = obj.replace(/[0-9\+\- \개\.\,\%\x\＋]+$/,'')
        const thisValue = obj.replace(/(.*?)([0-9\+\- \개\.\,\%\x\＋]+$)/,'$2').trim()
        return {
          name: thisKey,
          number: Number(thisValue.replace(/([^0-9]*)([0-9]*)([^0-9]*$)/,'$2').replace(/,/g,'')),
          unit: thisValue.replace(/([0-9]*)([^0-9]*$)/,'$2'),
          origin: obj,
        }
      }
      const keyword = []
      function mapFunctionWithKeyword(obj){
        const thisKey = obj.replace(/[0-9\+\- \개\.\,\%\x\＋]+$/,'')
        if(!keyword.includes(thisKey)) keyword.push(thisKey)
        return mapFunction(obj)
      }
      trObj.calory = trObj.calory.map(mapFunction)
      trObj.ingredient = trObj.ingredient.map(mapFunction)
      trObj.nutrition = trObj.nutrition.map(mapFunctionWithKeyword)
      return {...trObj, keyword}
    })
    
    const result = food_recipe.map((obj, index)=>{
      const home = homepageDic.find((home)=>{
        return home.name == obj.이름
      }) || {}

      function htmlToList(str){
        return (str||'').split(', ').map((obj)=>{
          const thisKey = obj.replace(/[0-9\+\- \개\.\,\%]+$/,'')
          // if(!keyword.includes(thisKey)) keyword.push(thisKey)
          const thisValue = obj.replace(/(.*?)([0-9\+\- \개\.\,\%]+$)/,'$2').trim()
          return {
            name: thisKey,
            number: Number(thisValue.replace(/(.*?)([^0-9]*$)/,'$1').replace(/,/g,'')) || '',
            unit: thisValue.replace(/(.*?)([^0-9]*$)/,'$2'),
            origin: obj,
          }
        })
      }

      return {
        ...home,
        name: obj.이름 || home.name,
        difficult: String(obj.등급||'').replace(/[^0-9]/g,''),
        key:index,
        cooking: htmlToList(obj.쿠킹),
        tasting: htmlToList(obj.맛보기),
      }
    })

    console.log('result', JSON.stringify(result))
    return result
  },
  
  getItemList(){
    return item

    const result = Array(0).concat(
      open_atk_1, 
      open_atk_2,
      save_atk_1,
      save_atk_2,
      save_smeltatk_1,
    ).filter((obj, index, self)=>{
      let indexNumber = undefined
      self.find((selfObj, selfIndex)=>{
        if(selfObj.name==obj.name) indexNumber=selfIndex
      })
      return indexNumber === index
    }).sort((obj1, obj2)=>{
      return obj1.name > obj2.name? 1: -1
    }).map((obj, index)=>{
      return {...obj, key:index}
    })

    // const recipeList = []
    // result.map((obj)=>{
    //   obj.recipe.map((obj)=>{
    //     if(!recipeList.includes(obj.name)){
    //       recipeList.push(obj.name)
    //     }
    //   })
    // })
    // recipeList.sort()
    // console.log('recipeList',recipeList)

    console.log('result', JSON.stringify(result))
    return result
  },

  getIngredientList(){
    return ingredientsList
  }
}

const ingredientsList = [
  {date: '20190407', price: 0,    name: "2018.3월 뽑기"}, 
  {date: '20190407', price: 0,    name: "2018.4월 뽑기"}, 
  {date: '20190407', price: 0,    name: "2018.5월 뽑기"}, 
  {date: '20190407', price: 0,    name: "2018.6월 뽑기"}, 
  {date: '20190407', price: 0,    name: "EP 2.0 특전 구매"}, 
  {date: '20190407', price: 1,    name: "가렛"}, 
  {date: '20190407', price: 2,    name: "갈색 염료"}, 
  {date: '20190407', price: 3,    name: "강철"}, 
  {date: '20190407', price: 4,    name: "검은 염료"}, 
  {date: '20190407', price: 5,    name: "괘종시계"}, 
  {date: '20190407', price: 6,    name: "구멍난 빨간 양말"}, 
  {date: '20190407', price: 7,    name: "꿀"}, 
  {date: '20190407', price: 8,    name: "끈적끈적한 액체"}, 
  {date: '20190407', price: 9,    name: "네잎 클로버"}, 
  {date: '20190407', price: 0,    name: "노란 염료"}, 
  {date: '20190407', price: 0,    name: "눈사람"}, 
  {date: '20190407', price: 0,    name: "단단한 껍질"}, 
  {date: '20190407', price: 0,    name: "더듬이"}, 
  {date: '20190407', price: 0,    name: "드래곤의 비늘"}, 
  {date: '20190407', price: 0,    name: "리본 끈"}, 
  {date: '20190407', price: 0,    name: "마녀의 별모래"}, 
  {date: '20190407', price: 0,    name: "마스테라의 열매"}, 
  {date: '20190407', price: 0,    name: "만드라"}, 
  {date: '20190407', price: 0,    name: "망자의 유물"}, 
  {date: '20190407', price: 0,    name: "방울"}, 
  {date: '20190407', price: 0,    name: "별의 모서리"}, 
  {date: '20190407', price: 0,    name: "보따리 도면"}, 
  {date: '20190407', price: 0,    name: "보라 염료"}, 
  {date: '20190407', price: 0,    name: "부드러운 깃털"}, 
  {date: '20190407', price: 0,    name: "부드러운 털"}, 
  {date: '20190407', price: 0,    name: "부드러운털"}, 
  {date: '20190407', price: 0,    name: "부품"}, 
  {date: '20190407', price: 0,    name: "불사의 심장"}, 
  {date: '20190407', price: 0,    name: "브리간"}, 
  {date: '20190407', price: 0,    name: "비정한 마음"}, 
  {date: '20190407', price: 0,    name: "빗빛의 룬"}, 
  {date: '20190407', price: 0,    name: "빛의 알갱이"}, 
  {date: '20190407', price: 0,    name: "빨간 염료"}, 
  {date: '20190407', price: 0,    name: "뼈조각"}, 
  {date: '20190407', price: 0,    name: "사과 쥬스"}, 
  {date: '20190407', price: 0,    name: "사금"}, 
  {date: '20190407', price: 0,    name: "사이파"}, 
  {date: '20190407', price: 0,    name: "사탕"}, 
  {date: '20190407', price: 0,    name: "석탄"}, 
  {date: '20190407', price: 210,    name: "선물 포장지"}, 
  {date: '20190407', price: 0,    name: "성흔"}, 
  {date: '20190407', price: 1,    name: "셀"}, 
  {date: '20190407', price: 0,    name: "송곳니"}, 
  {date: '20190407', price: 0,    name: "수정으로 만든 거울"}, 
  {date: '20190407', price: 0,    name: "시간 왜곡 버튼"}, 
  {date: '20190407', price: 0,    name: "시간의 결정"}, 
  {date: '20190407', price: 0,    name: "시계탑의 열쇠"}, 
  {date: '20190407', price: 0,    name: "심연의 꽃"}, 
  {date: '20190407', price: 0,    name: "썩은 붕대"}, 
  {date: '20190407', price: 0,    name: "아메디스트"}, 
  {date: '20190407', price: 0,    name: "아쿠아마린"}, 
  {date: '20190407', price: 0,    name: "악마의 뿔"}, 
  {date: '20190407', price: 0,    name: "어둠에 잠긴 칼날"}, 
  {date: '20190407', price: 0,    name: "얼음 가루"}, 
  {date: '20190407', price: 0,    name: "얼음 심장"}, 
  {date: '20190407', price: 2,    name: "얼음 조각"}, 
  {date: '20190407', price: 0,    name: "오크워리어 증표"}, 
  {date: '20190407', price: 0,    name: "오크의 손톱"}, 
  {date: '20190407', price: 0,    name: "오크히어로의 증표"}, 
  {date: '20190407', price: 0,    name: "유리구슬"}, 
  {date: '20190407', price: 0,    name: "자르곤"}, 
  {date: '20190407', price: 0,    name: "장미석영"}, 
  {date: '20190407', price: 0,    name: "저주받은 루비"}, 
  {date: '20190407', price: 0,    name: "젤로피"}, 
  {date: '20190407', price: 0,    name: "진주"}, 
  {date: '20190407', price: 0,    name: "질콘"}, 
  {date: '20190407', price: 0,    name: "철"}, 
  {date: '20190407', price: 0,    name: "초록 염료"}, 
  {date: '20190407', price: 0,    name: "크리스마스 화환"}, 
  {date: '20190407', price: 0,    name: "크리스탈 뼈"}, 
  {date: '20190407', price: 0,    name: "토파즈"}, 
  {date: '20190407', price: 0,    name: "투명한 천조각"}, 
  {date: '20190407', price: 0,    name: "파란 염료"}, 
  {date: '20190407', price: 0,    name: "핏빛의 룬"}, 
  {date: '20190407', price: 0,    name: "하얀 염로"}, 
  {date: '20190407', price: 0,    name: "하얀 염료"}, 
  {date: '20190407', price: 0,    name: "하티의 이빨"}, 
  {date: '20190407', price: 0,    name: "혜안"}, 
  {date: '20190407', price: 0,    name: "흑운모"},
]
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
      function htmlToStr(str){
        return str.replace(/\&nbsp\;\<br\>/g,' ')
                  .replace(/\&amp\;/g,'&')
                  .replace(/null/g,'')
      }
      function htmlToList(str){return htmlToStr(str).split(', ')}
      if(index == 1){
        thisObj.imageSrc = trObj.querySelectorAll('td')[0].querySelector('img').getAttribute('src')
        thisObj.name = htmlToStr(trObj.querySelectorAll('td')[1].innerHTML)
        thisObj.firstChar = String.fromCharCode(((thisObj.name.charCodeAt(0) - 44032)/28)/21 + 4352)
        thisObj.option = htmlToList(trObj.querySelectorAll('td')[2].innerHTML)
      }else if(index == 3){
        thisObj.savePoint = htmlToList(trObj.querySelectorAll('td')[0].innerHTML)
        thisObj.openPoint = htmlToList(trObj.querySelectorAll('td')[1].innerHTML)
      }else if(index == 5){
        thisObj.recipe = htmlToList(trObj.querySelectorAll('td')[0].innerHTML)
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
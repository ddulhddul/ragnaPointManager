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

import card from './ragnaJSON/card/card.json'
import card_robe_purple1 from './ragnaJSON/card/card_robe_purple1.json'
import card_accessories_blue1 from './ragnaJSON/card/card_accessories_blue1.json'
import card_robe_white1 from './ragnaJSON/card/card_robe_white1.json'
import card_accessories_green1 from './ragnaJSON/card/card_accessories_green1.json'
import card_shoes_blue1 from './ragnaJSON/card/card_shoes_blue1.json'
import card_accessories_purple1 from './ragnaJSON/card/card_accessories_purple1.json'
import card_shoes_green1 from './ragnaJSON/card/card_shoes_green1.json'
import card_accessories_white1 from './ragnaJSON/card/card_accessories_white1.json'
import card_shoes_purple1 from './ragnaJSON/card/card_shoes_purple1.json'
import card_armor_blue1 from './ragnaJSON/card/card_armor_blue1.json'
import card_shoes_white1 from './ragnaJSON/card/card_shoes_white1.json'
import card_armor_green1 from './ragnaJSON/card/card_armor_green1.json'
import card_subweapon_blue1 from './ragnaJSON/card/card_subweapon_blue1.json'
import card_armor_purple1 from './ragnaJSON/card/card_armor_purple1.json'
import card_subweapon_green1 from './ragnaJSON/card/card_subweapon_green1.json'
import card_armor_white1 from './ragnaJSON/card/card_armor_white1.json'
import card_subweapon_purple1 from './ragnaJSON/card/card_subweapon_purple1.json'
import card_helmet_blue1 from './ragnaJSON/card/card_helmet_blue1.json'
import card_subweapon_white1 from './ragnaJSON/card/card_subweapon_white1.json'
import card_helmet_green1 from './ragnaJSON/card/card_helmet_green1.json'
import card_weapon_blue1 from './ragnaJSON/card/card_weapon_blue1.json'
import card_helmet_purple1 from './ragnaJSON/card/card_helmet_purple1.json'
import card_weapon_green1 from './ragnaJSON/card/card_weapon_green1.json'
import card_helmet_white1 from './ragnaJSON/card/card_helmet_white1.json'
import card_weapon_purple1 from './ragnaJSON/card/card_weapon_purple1.json'
import card_robe_blue1 from './ragnaJSON/card/card_robe_blue1.json'
import card_weapon_white1 from './ragnaJSON/card/card_weapon_white1.json'
import card_robe_green1 from './ragnaJSON/card/card_robe_green1.json'

export default {

  getCardList(){
    return card

    const homepageDic = Array(0).concat(
      card_robe_purple1,
      card_accessories_blue1,
      card_robe_white1,
      card_accessories_green1,
      card_shoes_blue1,
      card_accessories_purple1,
      card_shoes_green1,
      card_accessories_white1,
      card_shoes_purple1,
      card_armor_blue1,
      card_shoes_white1,
      card_armor_green1,
      card_subweapon_blue1,
      card_armor_purple1,
      card_subweapon_green1,
      card_armor_white1,
      card_subweapon_purple1,
      card_helmet_blue1,
      card_subweapon_white1,
      card_helmet_green1,
      card_weapon_blue1,
      card_helmet_purple1,
      card_weapon_green1,
      card_helmet_white1,
      card_weapon_purple1,
      card_robe_blue1,
      card_weapon_white1,
      card_robe_green1,
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
        const thisValue = obj.replace(/(.*?)([0-9\+\- \개\.\,\%\x\＋]+$)/,'$2').trim().replace(/\n/g,'')
        return {
          name: thisKey,
          number: Number(thisValue.replace(/([^0-9]*)([0-9]*)([^0-9]*$)/,'$2').replace(/,/g,'')),
          unit: thisValue.replace(/([0-9]*)([^0-9]*$)/,'$2'),
          origin: obj,
        }
      }
      trObj.openPoint = mapFunction(trObj.openPoint)
      trObj.savePoint = mapFunction(trObj.savePoint)
      trObj.option = trObj.option.split('▶').map((obj)=>obj.trim()).filter((obj)=>obj).map(mapFunction)
      return {...trObj}
    })
    
    console.log('homepageDic', JSON.stringify(homepageDic))
    return homepageDic
  },

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
  },

  getItemImages(){
    return itemImages
  },

  getCardImages(){
    return cardImages
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

const itemImages = {
  '거시기': require('../../assets/images/items/거시기.png'),
  '메이드머리띠': require('../../assets/images/items/메이드머리띠.png'),
  '악마의머리띠': require('../../assets/images/items/악마의머리띠.png'),
  '거짓말쟁이의코': require('../../assets/images/items/거짓말쟁이의코.png'),
  '명검신궁설&천야행': require('../../assets/images/items/명검신궁설&천야행.png'),
  '여우왕의미소': require('../../assets/images/items/여우왕의미소.png'),
  '고양이귀베레모': require('../../assets/images/items/고양이귀베레모.png'),
  '모라신의미소': require('../../assets/images/items/모라신의미소.png'),
  '열혈머리띠': require('../../assets/images/items/열혈머리띠.png'),
  '광대모자': require('../../assets/images/items/광대모자.png'),
  '무표정가면': require('../../assets/images/items/무표정가면.png'),
  '오크투구': require('../../assets/images/items/오크투구.png'),
  '광대코': require('../../assets/images/items/광대코.png'),
  '바포메트주니어모자': require('../../assets/images/items/바포메트주니어모자.png'),
  '오크히어로의투구': require('../../assets/images/items/오크히어로의투구.png'),
  '귀찮은가면': require('../../assets/images/items/귀찮은가면.png'),
  '발그레': require('../../assets/images/items/발그레.png'),
  '위스퍼마스크': require('../../assets/images/items/위스퍼마스크.png'),
  '금색삼연성': require('../../assets/images/items/금색삼연성.png'),
  '벚꽃별빛선': require('../../assets/images/items/벚꽃별빛선.png'),
  '의적안대': require('../../assets/images/items/의적안대.png'),
  '금색크리스마스방울': require('../../assets/images/items/금색크리스마스방울.png'),
  '벚꽃인형': require('../../assets/images/items/벚꽃인형.png'),
  '인큐버스의뿔': require('../../assets/images/items/인큐버스의뿔.png'),
  '깃털모자': require('../../assets/images/items/깃털모자.png'),
  '보따리': require('../../assets/images/items/보따리.png'),
  '장난감못': require('../../assets/images/items/장난감못.png'),
  '나들이모자': require('../../assets/images/items/나들이모자.png'),
  '본헬름': require('../../assets/images/items/본헬름.png'),
  '쥬얼크라운': require('../../assets/images/items/쥬얼크라운.png'),
  '낙원단가방': require('../../assets/images/items/낙원단가방.png'),
  '북쪽나라의오로라': require('../../assets/images/items/북쪽나라의오로라.png'),
  '천자만홍': require('../../assets/images/items/천자만홍.png'),
  '낙원단모자': require('../../assets/images/items/낙원단모자.png'),
  '뻐꾹뻐꾹': require('../../assets/images/items/뻐꾹뻐꾹.png'),
  '초승달머리핀': require('../../assets/images/items/초승달머리핀.png'),
  '노래하는새': require('../../assets/images/items/노래하는새.png'),
  '사막의왕자': require('../../assets/images/items/사막의왕자.png'),
  '촛불': require('../../assets/images/items/촛불.png'),
  '놀란눈가면': require('../../assets/images/items/놀란눈가면.png'),
  '사만바이아': require('../../assets/images/items/사만바이아.png'),
  '카타나': require('../../assets/images/items/카타나.png'),
  '눈가리개': require('../../assets/images/items/눈가리개.png'),
  '사슴뿔': require('../../assets/images/items/사슴뿔.png'),
  '쿠키헤어핀': require('../../assets/images/items/쿠키헤어핀.png'),
  '눈흉터': require('../../assets/images/items/눈흉터.png'),
  '산타모자': require('../../assets/images/items/산타모자.png'),
  '크루이저모자': require('../../assets/images/items/크루이저모자.png'),
  '늦었어요': require('../../assets/images/items/늦었어요.png'),
  '삼형제진주조개': require('../../assets/images/items/삼형제진주조개.png'),
  '크리스마스트리': require('../../assets/images/items/크리스마스트리.png'),
  '다크나이트마스크': require('../../assets/images/items/다크나이트마스크.png'),
  '삿갓': require('../../assets/images/items/삿갓.png'),
  '토끼머리띠': require('../../assets/images/items/토끼머리띠.png'),
  '데비루치모자': require('../../assets/images/items/데비루치모자.png'),
  '샤프헤드기어': require('../../assets/images/items/샤프헤드기어.png'),
  '프론테라군모': require('../../assets/images/items/프론테라군모.png'),
  '돈잃은자의마음': require('../../assets/images/items/돈잃은자의마음.png'),
  '서큐버스의뿔': require('../../assets/images/items/서큐버스의뿔.png'),
  '프리카의서클릿': require('../../assets/images/items/프리카의서클릿.png'),
  '드라큘라의이빨': require('../../assets/images/items/드라큘라의이빨.png'),
  '선물상자': require('../../assets/images/items/선물상자.png'),
  '피라미드의수수께끼': require('../../assets/images/items/피라미드의수수께끼.png'),
  '라디오DJ고래왕자': require('../../assets/images/items/라디오DJ고래왕자.png'),
  '세이지의책': require('../../assets/images/items/세이지의책.png'),
  '하키마스크': require('../../assets/images/items/하키마스크.png'),
  '로드서클릿': require('../../assets/images/items/로드서클릿.png'),
  '소피의우주여행': require('../../assets/images/items/소피의우주여행.png'),
  '학교생활': require('../../assets/images/items/학교생활.png'),
  '루돌프의뿔': require('../../assets/images/items/루돌프의뿔.png'),
  '솜브레로': require('../../assets/images/items/솜브레로.png'),
  '햄스터나팔수': require('../../assets/images/items/햄스터나팔수.png'),
  '마도사의모자': require('../../assets/images/items/마도사의모자.png'),
  '스타더스트': require('../../assets/images/items/스타더스트.png'),
  '향긋한꿀단지': require('../../assets/images/items/향긋한꿀단지.png'),
  '마술사의모자': require('../../assets/images/items/마술사의모자.png'),
  '스팅모자': require('../../assets/images/items/스팅모자.png'),
  '혼자놀기상자': require('../../assets/images/items/혼자놀기상자.png'),
  '마제스틱고우트': require('../../assets/images/items/마제스틱고우트.png'),
  '식탐많은도도리': require('../../assets/images/items/식탐많은도도리.png'),
  '화살주머니': require('../../assets/images/items/화살주머니.png'),
  '망자의머리띠': require('../../assets/images/items/망자의머리띠.png'),
  '신관의가면': require('../../assets/images/items/신관의가면.png'),
  '휴가중인타오군카': require('../../assets/images/items/휴가중인타오군카.png'),
  '머리에박힌나사': require('../../assets/images/items/머리에박힌나사.png'),
  '실버크라운': require('../../assets/images/items/실버크라운.png'),
  '흰수염': require('../../assets/images/items/흰수염.png'),
  '메긴캡': require('../../assets/images/items/메긴캡.png'),
  '아가미헬름': require('../../assets/images/items/아가미헬름.png'),
}

const cardImages = {
  'XMAS쿠키카드': require('../../assets/images/card/XMAS쿠키카드.png'),
  '미스트케이스카드': require('../../assets/images/card/미스트케이스카드.png'),
  '오크히어로카드': require('../../assets/images/card/오크히어로카드.png'),
  '가고일카드': require('../../assets/images/card/가고일카드.png'),
  '미스틸테인카드': require('../../assets/images/card/미스틸테인카드.png'),
  '와일드로즈카드': require('../../assets/images/card/와일드로즈카드.png'),
  '가이아스카드': require('../../assets/images/card/가이아스카드.png'),
  '미이라카드': require('../../assets/images/card/미이라카드.png'),
  '요요카드': require('../../assets/images/card/요요카드.png'),
  '개미알카드': require('../../assets/images/card/개미알카드.png'),
  '바돈카드': require('../../assets/images/card/바돈카드.png'),
  '우드고블린카드': require('../../assets/images/card/우드고블린카드.png'),
  '고블린리더카드': require('../../assets/images/card/고블린리더카드.png'),
  '바소리카드': require('../../assets/images/card/바소리카드.png'),
  '울프카드': require('../../assets/images/card/울프카드.png'),
  '고블린스팀라이더카드': require('../../assets/images/card/고블린스팀라이더카드.png'),
  '바포메트의환영카드': require('../../assets/images/card/바포메트의환영카드.png'),
  '월야화카드': require('../../assets/images/card/월야화카드.png'),
  '고블린아쳐카드': require('../../assets/images/card/고블린아쳐카드.png'),
  '바포메트주니어카드': require('../../assets/images/card/바포메트주니어카드.png'),
  '웜테일카드': require('../../assets/images/card/웜테일카드.png'),
  '고블린카드': require('../../assets/images/card/고블린카드.png'),
  '배회하는자카드': require('../../assets/images/card/배회하는자카드.png'),
  '위스퍼카드': require('../../assets/images/card/위스퍼카드.png'),
  '고스트링카드': require('../../assets/images/card/고스트링카드.png'),
  '백련옥카드': require('../../assets/images/card/백련옥카드.png'),
  '윈드고스트카드': require('../../assets/images/card/윈드고스트카드.png'),
  '골렘카드': require('../../assets/images/card/골렘카드.png'),
  '베릿트카드': require('../../assets/images/card/베릿트카드.png'),
  '윌로우카드': require('../../assets/images/card/윌로우카드.png'),
  '곰인형카드': require('../../assets/images/card/곰인형카드.png'),
  '보컬카드': require('../../assets/images/card/보컬카드.png'),
  '이블드루이드카드': require('../../assets/images/card/이블드루이드카드.png'),
  '공중쁘띠카드': require('../../assets/images/card/공중쁘띠카드.png'),
  '본건카드': require('../../assets/images/card/본건카드.png'),
  '이시스카드': require('../../assets/images/card/이시스카드.png'),
  '구미호카드': require('../../assets/images/card/구미호카드.png'),
  '봉인된백소진카드': require('../../assets/images/card/봉인된백소진카드.png'),
  '이클립스카드': require('../../assets/images/card/이클립스카드.png'),
  '그리폰카드': require('../../assets/images/card/그리폰카드.png'),
  '봉인된베스퍼카드': require('../../assets/images/card/봉인된베스퍼카드.png'),
  '인저스티스카드': require('../../assets/images/card/인저스티스카드.png'),
  '나이트메어카드': require('../../assets/images/card/나이트메어카드.png'),
  '브릴라이트카드': require('../../assets/images/card/브릴라이트카드.png'),
  '인큐버스카드': require('../../assets/images/card/인큐버스카드.png'),
  '노비스카드': require('../../assets/images/card/노비스카드.png'),
  '비타타카드': require('../../assets/images/card/비타타카드.png'),
  '잭카드': require('../../assets/images/card/잭카드.png'),
  '다크로드카드': require('../../assets/images/card/다크로드카드.png'),
  '빅풋카드': require('../../assets/images/card/빅풋카드.png'),
  '제롬카드': require('../../assets/images/card/제롬카드.png'),
  '다크쉐도우카드': require('../../assets/images/card/다크쉐도우카드.png'),
  '쁘띠카드': require('../../assets/images/card/쁘띠카드.png'),
  '조커카드': require('../../assets/images/card/조커카드.png'),
  '다크프리스트카드': require('../../assets/images/card/다크프리스트카드.png'),
  '산타포링카드': require('../../assets/images/card/산타포링카드.png'),
  '지퍼베어카드': require('../../assets/images/card/지퍼베어카드.png'),
  '더스티네스카드': require('../../assets/images/card/더스티네스카드.png'),
  '새끼데저트울프카드': require('../../assets/images/card/새끼데저트울프카드.png'),
  '천하대장군카드': require('../../assets/images/card/천하대장군카드.png'),
  '데비루치카드': require('../../assets/images/card/데비루치카드.png'),
  '샌드맨카드': require('../../assets/images/card/샌드맨카드.png'),
  '촌촌카드': require('../../assets/images/card/촌촌카드.png'),
  '데빌링카드': require('../../assets/images/card/데빌링카드.png'),
  '서큐버스카드': require('../../assets/images/card/서큐버스카드.png'),
  '카라멜카드': require('../../assets/images/card/카라멜카드.png'),
  '데저트울프카드': require('../../assets/images/card/데저트울프카드.png'),
  '세비지카드': require('../../assets/images/card/세비지카드.png'),
  '카호카드': require('../../assets/images/card/카호카드.png'),
  '도깨비카드': require('../../assets/images/card/도깨비카드.png'),
  '센티페데카드': require('../../assets/images/card/센티페데카드.png'),
  '칼리츠버그카드': require('../../assets/images/card/칼리츠버그카드.png'),
  '도나카드': require('../../assets/images/card/도나카드.png'),
  '소드피쉬카드': require('../../assets/images/card/소드피쉬카드.png'),
  '캐럿카드': require('../../assets/images/card/캐럿카드.png'),
  '도둑벌레알카드': require('../../assets/images/card/도둑벌레알카드.png'),
  '소희카드': require('../../assets/images/card/소희카드.png'),
  '코르누스카드': require('../../assets/images/card/코르누스카드.png'),
  '도둑벌레카드': require('../../assets/images/card/도둑벌레카드.png'),
  '솔져스켈레톤카드': require('../../assets/images/card/솔져스켈레톤카드.png'),
  '코볼트아쳐카드': require('../../assets/images/card/코볼트아쳐카드.png'),
  '드라코카드': require('../../assets/images/card/드라코카드.png'),
  '수컷도둑벌레카드': require('../../assets/images/card/수컷도둑벌레카드.png'),
  '코볼트카드': require('../../assets/images/card/코볼트카드.png'),
  '드래곤플라이카드': require('../../assets/images/card/드래곤플라이카드.png'),
  '스모키카드': require('../../assets/images/card/스모키카드.png'),
  '쿠크레카드': require('../../assets/images/card/쿠크레카드.png'),
  '드레이크카드': require('../../assets/images/card/드레이크카드.png'),
  '스켈레톤카드': require('../../assets/images/card/스켈레톤카드.png'),
  '쿠키카드': require('../../assets/images/card/쿠키카드.png'),
  '드레인리어카드': require('../../assets/images/card/드레인리어카드.png'),
  '스켈워커카드': require('../../assets/images/card/스켈워커카드.png'),
  '크램프카드': require('../../assets/images/card/크램프카드.png'),
  '떠돌이늑대카드': require('../../assets/images/card/떠돌이늑대카드.png'),
  '스콜피온카드': require('../../assets/images/card/스콜피온카드.png'),
  '크루이저카드': require('../../assets/images/card/크루이저카드.png'),
  '라이드워드카드': require('../../assets/images/card/라이드워드카드.png'),
  '스템웜카드': require('../../assets/images/card/스템웜카드.png'),
  '크리미카드': require('../../assets/images/card/크리미카드.png'),
  '라플레시아카드': require('../../assets/images/card/라플레시아카드.png'),
  '스트라우프카드': require('../../assets/images/card/스트라우프카드.png'),
  '클락카드': require('../../assets/images/card/클락카드.png'),
  '레이드릭아쳐카드': require('../../assets/images/card/레이드릭아쳐카드.png'),
  '스팅카드': require('../../assets/images/card/스팅카드.png'),
  '타라프로그카드': require('../../assets/images/card/타라프로그카드.png'),
  '레이드릭카드': require('../../assets/images/card/레이드릭카드.png'),
  '스포아카드': require('../../assets/images/card/스포아카드.png'),
  '타로우카드': require('../../assets/images/card/타로우카드.png'),
  '레이쓰카드': require('../../assets/images/card/레이쓰카드.png'),
  '시계탑관리자카드': require('../../assets/images/card/시계탑관리자카드.png'),
  '타임홀더카드': require('../../assets/images/card/타임홀더카드.png'),
  '로다프로그카드': require('../../assets/images/card/로다프로그카드.png'),
  '심연의기사카드': require('../../assets/images/card/심연의기사카드.png'),
  '토드카드': require('../../assets/images/card/토드카드.png'),
  '로커카드': require('../../assets/images/card/로커카드.png'),
  '아가브카드': require('../../assets/images/card/아가브카드.png'),
  '파브르카드': require('../../assets/images/card/파브르카드.png'),
  '로터자이로카드': require('../../assets/images/card/로터자이로카드.png'),
  '아나콘다크카드': require('../../assets/images/card/아나콘다크카드.png'),
  '파사나카드': require('../../assets/images/card/파사나카드.png'),
  '루나틱카드': require('../../assets/images/card/루나틱카드.png'),
  '아놀리안카드': require('../../assets/images/card/아놀리안카드.png'),
  '파이어럿스켈카드': require('../../assets/images/card/파이어럿스켈카드.png'),
  '루시올라베스파카드': require('../../assets/images/card/루시올라베스파카드.png'),
  '아누비스카드': require('../../assets/images/card/아누비스카드.png'),
  '퍼밀리어카드': require('../../assets/images/card/퍼밀리어카드.png'),
  '마르두크카드': require('../../assets/images/card/마르두크카드.png'),
  '아르지오프카드': require('../../assets/images/card/아르지오프카드.png'),
  '퍼씰카드': require('../../assets/images/card/퍼씰카드.png'),
  '마르스카드': require('../../assets/images/card/마르스카드.png'),
  '아울듀크카드': require('../../assets/images/card/아울듀크카드.png'),
  '펑크카드': require('../../assets/images/card/펑크카드.png'),
  '마르크카드': require('../../assets/images/card/마르크카드.png'),
  '아울바론카드': require('../../assets/images/card/아울바론카드.png'),
  '페노메나카드': require('../../assets/images/card/페노메나카드.png'),
  '마리나카드': require('../../assets/images/card/마리나카드.png'),
  '아쳐스켈레톤카드': require('../../assets/images/card/아쳐스켈레톤카드.png'),
  '페러스카드': require('../../assets/images/card/페러스카드.png'),
  '마리오네트카드': require('../../assets/images/card/마리오네트카드.png'),
  '아쿠아엘레멘탈카드': require('../../assets/images/card/아쿠아엘레멘탈카드.png'),
  '페코페코알카드': require('../../assets/images/card/페코페코알카드.png'),
  '마린스피어카드': require('../../assets/images/card/마린스피어카드.png'),
  '아트로스카드': require('../../assets/images/card/아트로스카드.png'),
  '페코페코카드': require('../../assets/images/card/페코페코카드.png'),
  '마스터링카드': require('../../assets/images/card/마스터링카드.png'),
  '알람카드': require('../../assets/images/card/알람카드.png'),
  '포링카드': require('../../assets/images/card/포링카드.png'),
  '마야카드': require('../../assets/images/card/마야카드.png'),
  '암컷도둑벌레카드': require('../../assets/images/card/암컷도둑벌레카드.png'),
  '포이즌스포아카드': require('../../assets/images/card/포이즌스포아카드.png'),
  '마이너우로스카드': require('../../assets/images/card/마이너우로스카드.png'),
  '앙드레카드': require('../../assets/images/card/앙드레카드.png'),
  '푸파카드': require('../../assets/images/card/푸파카드.png'),
  '마타카드': require('../../assets/images/card/마타카드.png'),
  '에기라카드': require('../../assets/images/card/에기라카드.png'),
  '프리오니카드': require('../../assets/images/card/프리오니카드.png'),
  '만드라고라카드': require('../../assets/images/card/만드라고라카드.png'),
  '에드가카드': require('../../assets/images/card/에드가카드.png'),
  '플로라카드': require('../../assets/images/card/플로라카드.png'),
  '만드라씨앗카드': require('../../assets/images/card/만드라씨앗카드.png'),
  '엘더윌로우카드': require('../../assets/images/card/엘더윌로우카드.png'),
  '픽키카드': require('../../assets/images/card/픽키카드.png'),
  '맨블릿카드': require('../../assets/images/card/맨블릿카드.png'),
  '엘더카드': require('../../assets/images/card/엘더카드.png'),
  '하이오크카드': require('../../assets/images/card/하이오크카드.png'),
  '맨티스카드': require('../../assets/images/card/맨티스카드.png'),
  '연수카드': require('../../assets/images/card/연수카드.png'),
  '헌터플라이카드': require('../../assets/images/card/헌터플라이카드.png'),
  '메틀러카드': require('../../assets/images/card/메틀러카드.png'),
  '오본느카드': require('../../assets/images/card/오본느카드.png'),
  '혜군카드': require('../../assets/images/card/혜군카드.png'),
  '묘괴카드': require('../../assets/images/card/묘괴카드.png'),
  '오시리스카드': require('../../assets/images/card/오시리스카드.png'),
  '호넷카드': require('../../assets/images/card/호넷카드.png'),
  '무낙카드': require('../../assets/images/card/무낙카드.png'),
  '오크레이디카드': require('../../assets/images/card/오크레이디카드.png'),
  '호드카드': require('../../assets/images/card/호드카드.png'),
  '무카카드': require('../../assets/images/card/무카카드.png'),
  '오크베이비카드': require('../../assets/images/card/오크베이비카드.png'),
  '호롱카드': require('../../assets/images/card/호롱카드.png'),
  '뮤턴트드래고노이드카드': require('../../assets/images/card/뮤턴트드래고노이드카드.png'),
  '오크스켈레톤카드': require('../../assets/images/card/오크스켈레톤카드.png'),
  '황금도둑벌레카드': require('../../assets/images/card/황금도둑벌레카드.png'),
  '미믹카드': require('../../assets/images/card/미믹카드.png'),
  '오크아쳐카드': require('../../assets/images/card/오크아쳐카드.png'),
  '휀카드': require('../../assets/images/card/휀카드.png'),
  '미스트레스카드': require('../../assets/images/card/미스트레스카드.png'),
  '오크워리어카드': require('../../assets/images/card/오크워리어카드.png'),
  '히드라카드': require('../../assets/images/card/히드라카드.png'),
  '미스트카드': require('../../assets/images/card/미스트카드.png'),
  '오크좀비카드': require('../../assets/images/card/오크좀비카드.png'),  
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
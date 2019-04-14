/*
  럭셔리 조리대
    food_luxury_1star.json: https://cafe.naver.com/ragnarokmmorpg/156805
    food_luxury_2star.json: https://cafe.naver.com/ragnarokmmorpg/156807
    food_luxury_3star.json: https://cafe.naver.com/ragnarokmmorpg/156810
    food_luxury_4star.json: https://cafe.naver.com/ragnarokmmorpg/156812
    food_luxury_5star.json: https://cafe.naver.com/ragnarokmmorpg/156815
  모험 바비큐 그릴
    food_bbq_1star.json: https://cafe.naver.com/ragnarokmmorpg/156819
    food_bbq_2star.json: https://cafe.naver.com/ragnarokmmorpg/156820
    food_bbq_3star.json: https://cafe.naver.com/ragnarokmmorpg/156821
    food_bbq_4star.json: https://cafe.naver.com/ragnarokmmorpg/156822
    food_bbq_5star.json: https://cafe.naver.com/ragnarokmmorpg/156824
  마법의 압력솥
    food_magic_1star.json: https://cafe.naver.com/ragnarokmmorpg/156827
    food_magic_2star.json: https://cafe.naver.com/ragnarokmmorpg/156830
    food_magic_3star.json: https://cafe.naver.com/ragnarokmmorpg/156833
    food_magic_4star.json: https://cafe.naver.com/ragnarokmmorpg/156834
    food_magic_5star.json: https://cafe.naver.com/ragnarokmmorpg/156835
  로맨틱 냉음료차
    food_tea_1star.json: https://cafe.naver.com/ragnarokmmorpg/156837
    food_tea_2star.json: https://cafe.naver.com/ragnarokmmorpg/156839
    food_tea_3star.json: https://cafe.naver.com/ragnarokmmorpg/156840
    food_tea_4star.json: https://cafe.naver.com/ragnarokmmorpg/156841
    food_tea_5star.json: https://cafe.naver.com/ragnarokmmorpg/156842
*/
JSON.stringify(
Array.from(document.querySelectorAll('table')[5].querySelectorAll('tr'))
.reduce((resultEntry, trObj, trIndex)=>{
  const index = trIndex
  if(index == 0) return resultEntry
  else{
    function htmlToStr(str){
      return str.replace(/\&nbsp\;\<br\>/g,' ')
                .replace(/\&amp\;/g,'&')
                .replace(/null/g,'')
                .trim()
    }
    function htmlToList(str){return htmlToStr(str).split('\n').map((obj)=>obj.trim())}
    const $tds = trObj.querySelectorAll('td')
    const resultObj = {}
    resultObj.name = htmlToStr($tds[0].innerText)
    resultObj.firstChar = String.fromCharCode(((resultObj.name.charCodeAt(0) - 44032)/28)/21 + 4352)
    resultObj.difficult = htmlToStr($tds[1].innerText).replace(/[^0-9]/g,'')
    resultObj.nutrition = htmlToList($tds[2].innerText)
    resultObj.calory = htmlToList($tds[3].innerText)
    resultObj.satiety = htmlToStr($tds[4].innerText)
    resultObj.ingredient = htmlToList($tds[5].innerText)
    resultEntry.push(resultObj)
  }
  return resultEntry
}, [])
)
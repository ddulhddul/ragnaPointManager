/*
해체 보상(ATK)
    open_atk_1.json : https://cafe.naver.com/ragnarokmmorpg/269290
    open_atk_2.json : https://cafe.naver.com/ragnarokmmorpg/269292  
저장 보상(ATK)
    save_atk_1.json : https://cafe.naver.com/ragnarokmmorpg/269297
    save_atk_2.json : https://cafe.naver.com/ragnarokmmorpg/269298
저장 보상(제련ATK)
    save_smeltatk_1.json : https://cafe.naver.com/ragnarokmmorpg/269300
해제 보상(MATK)
    open_matk.json : https://cafe.naver.com/ragnarokmmorpg/269301
저장 보상(MATK)
    save_matk1.json : https://cafe.naver.com/ragnarokmmorpg/269303
    save_matk2.json : https://cafe.naver.com/ragnarokmmorpg/269304
저장 보상(제련MATK)
    save_smeltmatk.json : https://cafe.naver.com/ragnarokmmorpg/269305
저장,해제 보상(DEF)
    def.json : https://cafe.naver.com/ragnarokmmorpg/269310
저장,해제 보상(MDEF)
    mdef.json : https://cafe.naver.com/ragnarokmmorpg/269311
저장,해제 보상(FLEE,HIT)
    flee_hit.json : https://cafe.naver.com/ragnarokmmorpg/269313
저장,해제 보상(스텟)
    stat.json : https://cafe.naver.com/ragnarokmmorpg/269314
저장,해제 보상(속성 데미지)
    soksung.json : https://cafe.naver.com/ragnarokmmorpg/269316
저장,해제 보상(종족형 데미지)
    tribe.json : https://cafe.naver.com/ragnarokmmorpg/269317

착용 옵션(ATK,제련ATK)
    wear_atk.json : https://cafe.naver.com/ragnarokmmorpg/269318
착용 옵션(MATK,제련MATK)
    wear_matk.json : https://cafe.naver.com/ragnarokmmorpg/269319
착용 옵션(DEF무시)
    wear_def.json : https://cafe.naver.com/ragnarokmmorpg/269320
착용 옵션(MDEF무시)
    wear_mdef.json : https://cafe.naver.com/ragnarokmmorpg/269322
착용 옵션(STR)
    wear_str.json : https://cafe.naver.com/ragnarokmmorpg/269323
착용 옵션(AGI)
    wear_agi.json : https://cafe.naver.com/ragnarokmmorpg/269324
착용 옵션(VIT)
    wear_vit.json : https://cafe.naver.com/ragnarokmmorpg/269325
착용 옵션(INT)
    wear_int1.json : https://cafe.naver.com/ragnarokmmorpg/269326
    wear_int2.json : https://cafe.naver.com/ragnarokmmorpg/269329
착용 옵션(DEX)
    wear_dex.json : https://cafe.naver.com/ragnarokmmorpg/269330
착용 옵션(LUK)
    wear_luk.json : https://cafe.naver.com/ragnarokmmorpg/269332
    
착용 옵션(인간형,드래곤형)
    wear_dragon.json : https://cafe.naver.com/ragnarokmmorpg/269333
착용 옵션(불사형,곤충형,무형)
    wear_none.json : https://cafe.naver.com/ragnarokmmorpg/269336
착용 옵션(화속성)
    wear_fire.json : https://cafe.naver.com/ragnarokmmorpg/269337
착용 옵션(수속성)
    wear_water.json : https://cafe.naver.com/ragnarokmmorpg/269339
착용 옵션(풍속성)
    wear_wind.json : https://cafe.naver.com/ragnarokmmorpg/269341
착용 옵션(악마형,동물형,식물형)
    wear_devil.json : https://cafe.naver.com/ragnarokmmorpg/269342
착용 옵션(지속성)
    wear_earth.json : https://cafe.naver.com/ragnarokmmorpg/269343
착용 옵션(암속성,불사속성)
    wear_immortal.json : https://cafe.naver.com/ragnarokmmorpg/269344
착용 옵션(성속성,염속성)
    wear_holi.json : https://cafe.naver.com/ragnarokmmorpg/269346
착용 옵션(독속성,무속성)
    wear_poison.json : https://cafe.naver.com/ragnarokmmorpg/269347
    
착용 옵션(이동속도)
    wear_speed.json : https://cafe.naver.com/ragnarokmmorpg/269348
착용 옵션(저항)
    wear_resis.json : https://cafe.naver.com/ragnarokmmorpg/269350
착용 옵션(HP회복,SP회복)
    wear_potion.json : https://cafe.naver.com/ragnarokmmorpg/269351
착용 옵션(스킬)
    wear_skill.json : https://cafe.naver.com/ragnarokmmorpg/269352
착용 옵션(일반 공격)
    wear_normalatk.json : https://cafe.naver.com/ragnarokmmorpg/269353
착용 옵션(제련)
    wear_smelt.json : https://cafe.naver.com/ragnarokmmorpg/269355
착용 옵션(캐스팅)
    wear_casting.json : https://cafe.naver.com/ragnarokmmorpg/269356
    
고양이 상단 X 
    cat_up.json : https://cafe.naver.com/ragnarokmmorpg/269361
별자리
    star.json : https://cafe.naver.com/ragnarokmmorpg/269362
에피소드별 한정특전
    episod.json : https://cafe.naver.com/ragnarokmmorpg/269363
월별 한정특전
    monthly.json : https://cafe.naver.com/ragnarokmmorpg/269365
*/
JSON.stringify(
  Array.from(document.querySelectorAll('table')[5].querySelectorAll('tr'))
  .reduce((resultEntry, trObj, trIndex)=>{
    const index = trIndex % 7
    if(index == 0) resultEntry.push({})
    else{
      const thisObj = resultEntry[resultEntry.length-1]
      function htmlToStr(str){return str}
      function htmlToList(str){return str}
    //   function htmlToStr(str){
    //     return str.replace(/\&nbsp\;\<br\>/g,' ')
    //               .replace(/\&amp\;/g,'&')
    //               .replace(/null/g,'')
    //   }
    //   function htmlToList(str){return htmlToStr(str).split(', ')}
      if(index == 1){
        thisObj.imageSrc = trObj.querySelectorAll('td')[0].querySelector('img').getAttribute('src')
        thisObj.name = htmlToStr(trObj.querySelectorAll('td')[1].innerText)
        // thisObj.firstChar = String.fromCharCode(((thisObj.name.charCodeAt(0) - 44032)/28)/21 + 4352)
        thisObj.option = htmlToList(trObj.querySelectorAll('td')[2].innerText)
      }else if(index == 3){
        thisObj.savePoint = htmlToList(trObj.querySelectorAll('td')[0].innerText)
        thisObj.openPoint = htmlToList(trObj.querySelectorAll('td')[1].innerText)
      }else if(index == 5){
        thisObj.recipe = htmlToList(trObj.querySelectorAll('td')[0].innerText)
      }
    }
    return resultEntry
  }, [])
)
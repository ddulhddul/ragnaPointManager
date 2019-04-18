/*
  무기 카드
    card_weapon_purple1.json: https://cafe.naver.com/ragnarokmmorpg/153932
    card_weapon_blue1.json: https://cafe.naver.com/ragnarokmmorpg/153938
    card_weapon_green1.json: https://cafe.naver.com/ragnarokmmorpg/153942
    card_weapon_white1.json: https://cafe.naver.com/ragnarokmmorpg/153943
  보조 카드
    card_subweapon_purple1.json: https://cafe.naver.com/ragnarokmmorpg/153951
    card_subweapon_blue1.json: https://cafe.naver.com/ragnarokmmorpg/153954
    card_subweapon_green1.json: https://cafe.naver.com/ragnarokmmorpg/153958
    card_subweapon_white1.json: https://cafe.naver.com/ragnarokmmorpg/153964
  갑옷 카드
    card_armor_purple1.json: https://cafe.naver.com/ragnarokmmorpg/153968
    card_armor_blue1.json: https://cafe.naver.com/ragnarokmmorpg/153970
    card_armor_green1.json: https://cafe.naver.com/ragnarokmmorpg/153972
    card_armor_white1.json: https://cafe.naver.com/ragnarokmmorpg/153973
  걸칠것 카드
    card_robe_purple1.json: https://cafe.naver.com/ragnarokmmorpg/153978
    card_robe_blue1.json: https://cafe.naver.com/ragnarokmmorpg/153980
    card_robe_green1.json: https://cafe.naver.com/ragnarokmmorpg/153986
    card_robe_white1.json: https://cafe.naver.com/ragnarokmmorpg/153988
  신발 카드
    card_shoes_purple1.json: https://cafe.naver.com/ragnarokmmorpg/153989
    card_shoes_blue1.json: https://cafe.naver.com/ragnarokmmorpg/154010
    card_shoes_green1.json: https://cafe.naver.com/ragnarokmmorpg/154012
    card_shoes_white1.json: https://cafe.naver.com/ragnarokmmorpg/154013
  액세서리 카드
    card_accessories_purple1.json: https://cafe.naver.com/ragnarokmmorpg/154016
    card_accessories_blue1.json: https://cafe.naver.com/ragnarokmmorpg/154018
    card_accessories_green1.json: https://cafe.naver.com/ragnarokmmorpg/154021
    card_accessories_white1.json: https://cafe.naver.com/ragnarokmmorpg/154023
  투구 카드
    card_helmet_purple1.json: https://cafe.naver.com/ragnarokmmorpg/154025
    card_helmet_blue1.json: https://cafe.naver.com/ragnarokmmorpg/154027
    card_helmet_green1.json: https://cafe.naver.com/ragnarokmmorpg/154028
    card_helmet_white1.json: https://cafe.naver.com/ragnarokmmorpg/154029
*/
JSON.stringify(
    Array.from(document.querySelectorAll('table')[5].querySelectorAll('tr'))
    .reduce((resultEntry, trObj, trIndex) => {
        const index = trIndex % 8
        if (index == 0) resultEntry.push({})
        const thisObj = resultEntry[resultEntry.length - 1]
        function htmlToStr(str) {
            return str.replace(/\&nbsp\;\<br\>/g, ' ')
                .replace(/\&amp\;/g, '&')
                .replace(/null/g, '')
        }
        function htmlToList(str) { return htmlToStr(str).split('<br>') }
        if (index == 0) {
            thisObj.name = trObj.querySelectorAll('td')[0].innerText
        } else if (index == 1) {
            thisObj.imageSrc = trObj.querySelectorAll('td')[0].querySelector('img').getAttribute('src')
            thisObj.position = htmlToStr(trObj.querySelectorAll('td')[2].innerText)
        } else if (index == 2) {
            thisObj.rate = htmlToStr(trObj.querySelectorAll('td')[1].innerText)
        } else if (index == 3) {
            thisObj.monster = htmlToStr(trObj.querySelectorAll('td')[1].innerText)
        } else if (index == 4) {
            thisObj.openPoint = htmlToStr(trObj.querySelectorAll('td')[1].innerText)
        } else if (index == 5) {
            thisObj.savePoint = htmlToStr(trObj.querySelectorAll('td')[1].innerText)
        } else if (index == 6) {
            thisObj.option = htmlToStr(trObj.querySelectorAll('td')[1].innerText)
        }
        return resultEntry
    }, [])
)
import { SQLite } from 'expo'
import React from 'react'
import ragnaDB from '../common/ragnaDB'
const db = SQLite.openDatabase('ragnaPoint.db')

class SqlUtil extends React.Component {

    /* 
        Card
    */
   initCardTable = async (param) => {
        const { res } = await this.queryExecute(`
        SELECT 1 FROM sqlite_master 
        WHERE type='table' 
        AND name='TN_CARD'
        AND EXISTS (
            SELECT 1 
            FROM sqlite_master 
            WHERE name = 'TN_CARD' 
            AND sql LIKE '%name%'
        )
        `, [])
        if (param || res.rows.length == 0) {
            // await this.queryExecute('DROP TABLE IF EXISTS TN_CARD', [])
            const { tx1, res1 } = await this.queryExecute(
                `CREATE TABLE IF NOT EXISTS TN_CARD (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            name VARCHAR(255) UNIQUE,
            saveYn VARCHAR(1) default 'N',
            openYn VARCHAR(1) default 'N'
            )`,
                [])
        }
    }

    listTnCard = async (param = {}, callback = () => {}) => {
        const { res } = await this.queryExecute(
            `SELECT * FROM TN_CARD`,
            []
        )
        return (res.rows||{})._array || []
    }

    selectCardByName = async (param = {}, callback = () => {}) => {
        const { res } = await this.queryExecute(
            `SELECT 
                Card.* 
            FROM TN_CARD Card
            WHERE name = ?`,
            [param.name]
        )
        return ((res.rows||{})._array || [])[0]
    }

    insertCard = async (param = {}, callback = () => {}) => {
        const { res } = await this.queryExecute(
            `insert into TN_CARD (
                name,
                saveYn,
                openYn
            ) values (
                ?, ?, ?
            )`,
            [
                param.name,
                param.saveYn=='Y'?'Y':'N',
                param.openYn=='Y'?'Y':'N',
            ]
        )
        return res
    }

    updateCard = async (param = {}, callback = () => {}) => {
        const { res } = await this.queryExecute(
            `update TN_CARD
            set 
                saveYn = ?,
                openYn = ?
            WHERE name = ?`,
            [
                param.saveYn=='Y'?'Y':'N',
                param.openYn=='Y'?'Y':'N',
                param.name
            ]
        )
        return res
    }
    
    /* 
        Food
    */
    initFoodTable = async (param) => {
        const { res } = await this.queryExecute(`
          SELECT 1 FROM sqlite_master 
          WHERE type='table' 
          AND name='TN_FOOD'
          AND EXISTS (
            SELECT 1 
            FROM sqlite_master 
            WHERE name = 'TN_FOOD' 
            AND sql LIKE '%name%'
          )
        `, [])
        if (param || res.rows.length == 0) {
            // await this.queryExecute('DROP TABLE IF EXISTS TN_FOOD', [])
            const { tx1, res1 } = await this.queryExecute(
                `CREATE TABLE IF NOT EXISTS TN_FOOD (
              id INTEGER PRIMARY KEY AUTOINCREMENT, 
              name VARCHAR(255) UNIQUE,
              cookingYn VARCHAR(1) default 'N',
              tastingYn VARCHAR(1) default 'N'
            )`,
                [])
        }
    }

    listTnFood = async (param = {}, callback = () => {}) => {
        const { res } = await this.queryExecute(
            `SELECT * FROM TN_FOOD`,
            []
        )
        return (res.rows||{})._array || []
    }

    selectFoodByName = async (param = {}, callback = () => {}) => {
        const { res } = await this.queryExecute(
            `SELECT 
                FOOD.* 
            FROM TN_FOOD FOOD
            WHERE name = ?`,
            [param.name]
        )
        return ((res.rows||{})._array || [])[0]
    }

    insertFood = async (param = {}, callback = () => {}) => {
        const { res } = await this.queryExecute(
            `insert into TN_FOOD (
                name,
                cookingYn,
                tastingYn
              ) values (
                ?, ?, ?
              )`,
            [
                param.name,
                param.cookingYn=='Y'?'Y':'N',
                param.tastingYn=='Y'?'Y':'N',
            ]
        )
        return res
    }

    updateFood = async (param = {}, callback = () => {}) => {
        const { res } = await this.queryExecute(
            `update TN_FOOD
            set 
                cookingYn = ?,
                tastingYn = ?
            WHERE name = ?`,
            [
                param.cookingYn=='Y'?'Y':'N',
                param.tastingYn=='Y'?'Y':'N',
                param.name
            ]
        )
        return res
    }

    /* 
        ITem
    */
    listTnItem = async (param = {}, callback = () => {}) => {
        const { res } = await this.queryExecute(
            `SELECT * FROM TN_ITEM`,
            []
        )
        return (res.rows||{})._array || []
    }

    getTnIngredient = async (param = {}, callback = () => {}) => {
        let itemIngredients = ragnaDB.getItemIngredientsList().reduce((entry, obj)=>{
            const name = obj.name
            entry[name] = {...obj, name, displayName: obj.name}
            return entry
        }, {})
        const { res } = await this.queryExecute(
            `SELECT * FROM TN_INGREDIENT`,
            []
            )
        const list = (res.rows||{})._array || []
        list.map((obj)=>{
            if(obj.price && itemIngredients[obj.name]) itemIngredients[obj.name].price = obj.price || 0
        })
        return itemIngredients
    }

    selectItemByName = async (param = {}, callback = () => {}) => {
        const { res } = await this.queryExecute(
            `SELECT 
                ITEM.* 
            FROM TN_ITEM ITEM
            WHERE name = ?`,
            [param.name]
        )
        return ((res.rows||{})._array || [])[0]
    }

    insertItem = async (param = {}, callback = () => {}) => {
        const { res } = await this.queryExecute(
            `insert into TN_ITEM (
                name,
                saveYn,
                openYn
              ) values (
                ?, ?, ?
              )`,
            [
                param.name,
                param.saveYn=='Y'?'Y':'N',
                param.openYn=='Y'?'Y':'N',
            ]
        )
        return res
    }

    updateItem = async (param = {}, callback = () => {}) => {
        const { res } = await this.queryExecute(
            `update TN_ITEM
            set 
                saveYn = ?,
                openYn = ?
            WHERE name = ?`,
            [
                param.saveYn=='Y'?'Y':'N',
                param.openYn=='Y'?'Y':'N',
                param.name
            ]
        )
        return res
    }

    initItemTable = async (param) => {
        const { res } = await this.queryExecute(`
          SELECT 1 FROM sqlite_master 
          WHERE type='table' 
          AND name='TN_ITEM'
          AND EXISTS (
            SELECT 1 
            FROM sqlite_master 
            WHERE name = 'TN_ITEM' 
            AND sql LIKE '%name%'
          )
        `, [])
        if (param || res.rows.length == 0) {
            // await this.queryExecute('DROP TABLE IF EXISTS TN_ITEM', [])
            const { tx1, res1 } = await this.queryExecute(
                `CREATE TABLE IF NOT EXISTS TN_ITEM (
              id INTEGER PRIMARY KEY AUTOINCREMENT, 
              name VARCHAR(255) UNIQUE,
              saveYn VARCHAR(1) default 'N',
              openYn VARCHAR(1) default 'N'
            )`,
                [])
        }
    }

    initIngredientTable = async (param) => {
        const { res } = await this.queryExecute(`
            SELECT 1 FROM sqlite_master 
            WHERE type='table' 
            AND name='TN_INGREDIENT'
            AND EXISTS (
            SELECT 1 
            FROM sqlite_master 
            WHERE name = 'TN_INGREDIENT' 
            AND sql LIKE '%name%'
            )
        `, [])
        let result = res
        if (param || res.rows.length == 0) {
            // await this.queryExecute('DROP TABLE IF EXISTS TN_INGREDIENT', [])
            const { tx1, res1 } = await this.queryExecute(
                `CREATE TABLE IF NOT EXISTS TN_INGREDIENT (
                    id INTEGER PRIMARY KEY AUTOINCREMENT, 
                    name VARCHAR(255) UNIQUE,
                    date VARCHAR(10),
                    price NUMBER default 0
                )`,
            [])
            result = res1
        }
        return result
    }

    insertIngredient = async (obj = {}, callback = () => {}) => {
        const date = new Date()
        const { res } = await this.queryExecute(
            `insert into TN_INGREDIENT (
                name,
                date,
                price
                ) values (
                ?,?,?
            )`,
            [
                obj.name,
                [
                    date.getFullYear(),
                    String(date.getMonth()+1).padStart('0',2),
                    String(date.getDate()).padStart('0',2),
                ].join(''),
                obj.price
            ]
        )
        return res
    }

    updateIngredient = async (param = {}, callback = () => {}) => {
        const date = new Date()
        const { res } = await this.queryExecute(
            `update TN_INGREDIENT
            set 
                price = ?,
                date = ?
            WHERE name = ?`,
            [
                param.price,
                [
                    date.getFullYear(),
                    String(date.getMonth()+1).padStart('0',2),
                    String(date.getDate()).padStart('0',2),
                ].join(''),
                param.name
            ]
        )
        return res
    }

    selectIngredientByName = async (param = {}, callback = () => {}) => {
        const { res } = await this.queryExecute(
            `SELECT
                INGREDIENT.* 
            FROM TN_INGREDIENT INGREDIENT
            WHERE name = ?`,
            [param.name]
        )
        return ((res.rows||{})._array || [])[0]
    }

    queryExecute = async (sql = '', param = [], callback = () => { }) => {
        return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(sql, param,
                (tx, res) => {
                    callback(tx, res)
                    return resolve({ tx, res })
                },
                (...params) => {
                    console.log('db error', ...params)
                    alert(`관리자에게 문의하세요\n이메일: ddulhddul@gmail.com`)
                    reject(...params)
                }
            )
        }))
    }

}

export default SqlUtil
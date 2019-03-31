import { SQLite } from 'expo'
import React from 'react'
const db = SQLite.openDatabase('ragnaPoint.db')

class SqlUtil extends React.Component {

    listTnItem = async (param = {}, callback = () => {}) => {
        const { res } = await this.queryExecute(
            `SELECT * FROM TN_ITEM`,
            []
        )
        return (res.rows||{})._array || []
    }

    selectItemByName = async (param = {}, callback = () => {}) => {
        const { res } = await this.queryExecute(
            `SELECT * 
            FROM TN_ITEM
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
            await this.queryExecute('DROP TABLE IF EXISTS TN_ITEM', [])
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
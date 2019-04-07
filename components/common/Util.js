export default {
    tabColor: 'rgb(243, 156, 18)',
    green: 'rgb(26, 188, 156)',
    grey: 'rgb(190, 190, 190)',
    filterSelected: 'rgb(230, 126, 34)',

    comma(x) {
        return String(x || '').replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    },
}
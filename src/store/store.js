import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    // 产品信息
    prdinfo: {
        id: "",
        nation: '',
        desc: '',
        adultPrice: 0,
        womenPrice: 0,
        companyPrice: 0,
        childPrice: 0,
//         legalProtection: true,
//         advanceCompensation: true,
//         installment: true,
//         lowsetCost: 0,
//         travelCard: true,
        coverId: 0,
        coverpic: [],
        feature: "",
        detail: "",
        routine: "",
        fee: "",
        notice: "",
        hospital: "",
        item: "",
        experts: [],
        operations: [],
        status: ""
    },
}

export const setPrdInfo = 'setPrdInfo'

const mutations = {
    setPrdInfo(state, prdInfo) {
        state.prdinfo = prdInfo;
    },
    setPrdTags(state, tags) {
        state.prdinfo.tags = tags;
    },
}



export default new Vuex.Store({
    state,
    mutations
})

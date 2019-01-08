import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    // 产品信息
    prdinfo: {
        nation: '',
        desc: '',
        cost: 0,
        legalProtection: true,
        advanceCompensation: true,
        installment: true,
        lowsetCost: 0,
        travelCard: true,
        tags: [],
        images: [],
        feature: "",
        detail: "",
        routine: "",
        fee: "",
        notice: "",
        hospital: "",
    },
}

const mutations = {
    setPrdInfo(state, prdInfo) {
        state.prdinfo = prdInfo;
    },
}

export default new Vuex.Store({
    state,
    mutations
})

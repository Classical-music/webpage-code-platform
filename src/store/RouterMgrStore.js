import { defineStore } from "pinia";
import { computed, reactive } from "vue";

let urlId = 0
export const useRouterMgrStore = defineStore('router-mgr', _ => {
    const data = reactive({
        expand: true,
        selItem: null,
        subs: {}
    })

    const isExpand = computed(_ => {
        return data.expand
    })
    function doExpand() {
        data.expand = !data.expand
    }
    const subs = computed(_ => {
        return data.subs
    })
    function genUrl() {
        const urls = Object.keys(data.subs)
        while (true) {
            let url = `/url-${urlId++}`
            if (!urls.includes(url)) return url
        }
        return '/url'
    }
    function addRouter() {
        let url = genUrl()
        data.subs[url] = {
            url: url,
            page: null
        }
    }

    return {
        isExpand,
        doExpand,
        subs,
        addRouter,
    }
})
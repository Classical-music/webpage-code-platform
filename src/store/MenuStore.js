import { defineStore } from "pinia";
import { reactive } from "vue";
import { PageMgr, usePageMenuStore } from '@store/PageMgrStore'
import MenuGroup from "@WidgetMenu/MenuGroup.vue";
import { useRouterMgrStore } from "./RouterMgrStore";
import { useCtrlBaseStore } from "./CtrlBaseStore";

const pageMenu = usePageMenuStore()
const routerMgr = useRouterMgrStore()
const ctrlBase = useCtrlBaseStore()

export const useMenuStore = defineStore('menu', _ => {
    const data = reactive([
        {
            comp: MenuGroup,
            name: 'Page管理',
            expand: true,
            initCb: PageMgr.pageInit,
            subs: pageMenu.data
        },
        {
            comp: MenuGroup,
            name: '路由管理',
            expand: true,
            initCb: routerMgr.init,
            subs: routerMgr.data
        },
        {
            comp: MenuGroup,
            name: '控件管理',
            expand: true,
            subs: [
                {
                    comp: MenuGroup,
                    name: '基础控件',
                    expand: true,
                    initCb: ctrlBase.init,
                    subs: ctrlBase.data
                },
                {
                    comp: MenuGroup,
                    name: '自定义控件',
                    expand: true,
                    subs: []
                }
            ]
        }
    ])

    return {
        data
    }
})

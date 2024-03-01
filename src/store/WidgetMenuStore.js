import MenuGroup from "@WidgetMenu/MenuGroup.vue";
import MenuItem from "@WidgetMenu/MenuItem.vue";

import { defineStore } from "pinia";
import { useDataSetStore } from "./DataSetStore";
import { FileMgr } from "@Utils/FileMgr";

export const useWidgetMenuStore = defineStore('widget-menu', _ => {
    const data = widgetMenuMeta

    return {
        data
    }
})

/**
 * UI控件源数据
 * 属性:
 *  name: 菜单/控件名字
 *  comp: 加载该项的组件
 *  expand: 是否展开
 *  subs: [] 子项数组,
 *  clickCb: 点击该项时的回调
 *  initCb: 初始化该项时的回调
 */
const widgetMenuMeta = {
    createPage: {
        name: '新建',
        comp: MenuGroup,
        expand: true,
        subs: [
            {
                name: '页面',
                comp: MenuItem,
                type: 'Page',
                clickCb: _ => useDataSetStore().resetPage(),
            }
        ]
    },
    pageList: {
        name: 'Page列表',
        comp: MenuGroup,
        expand: true,
        initCb: _ => FileMgr.loadPageList(),
        subs: []
    }
}
    // {
    //     name: '基础控件',
    //     type: 'group',
    //     expand: true,
    //     subs: [
    //         {
    //             name: 'Label',
    //             type: 'item',
    //         },
    //         {
    //             name: 'Button',
    //             type: 'item'
    //         },
    //         {
    //             name: 'LineEdit',
    //             type: 'item'
    //         },
    //         {
    //             name: 'Image',
    //             type: 'item'
    //         }
    //     ]
    // },
    // {
    //     name: '容器控件',
    //     type: 'group',
    //     expand: true,
    //     subs: [
    //         {
    //             name: 'Screen',
    //             type: 'item',
    //         },
    //         {
    //             name: 'Panel',
    //             type: 'item'
    //         }
    //     ]
    // },
    // {
    //     name: '路由控件',
    //     type: 'group',
    //     expand: true,
    //     subs: [
    //         {
    //             name: 'RouterLink',
    //             type: 'item'
    //         },
    //         {
    //             name: 'RouterView',
    //             type: 'item'
    //         }
    //     ]
    // },
    // {
    //     name: '组合控件',
    //     type: 'group',
    //     expand: true,
    //     subs: [
    //         {
    //             name: 'List',
    //             type: 'item'
    //         },
    //         {
    //             name: 'Table',
    //             type: 'item'
    //         },
    //         {
    //             name: 'Tree',
    //             type: 'item'
    //         }
    //     ]
    // }


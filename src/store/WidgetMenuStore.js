import { defineStore } from "pinia";

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
 *  type: 菜单项类型
 *      'group': 分类项
 *      'item': 具体项
 *  isExpand: 是否展开, group时支持
 *  subs: [] group项的子项
 */
const widgetMenuMeta = [
    {
        name: '基础控件',
        type: 'group',
        expand: true,
        subs: [
            {
                name: 'Label',
                type: 'item',
            },
            {
                name: 'Button',
                type: 'item'
            },
            {
                name: 'LineEdit',
                type: 'item'
            },
            {
                name: 'Image',
                type: 'item'
            },
            {
                name: '控件组2',
                type: 'group',
                expand: true,
                subs: [
                    {
                        name: '控件2.1',
                        type: 'item',
                    },
                ]
            }
        ]
    },
    {
        name: '容器控件',
        type: 'group',
        expand: true,
        subs: [
            {
                name: 'Screen',
                type: 'item',
            },
            {
                name: 'Panel',
                type: 'item'
            }
        ]
    },
    {
        name: '路由控件',
        type: 'group',
        expand: true,
        subs: [
            {
                name: 'RouterLink',
                type: 'item'
            },
            {
                name: 'RouterView',
                type: 'item'
            }
        ]
    },
    {
        name: '组合控件',
        type: 'group',
        expand: true,
        subs: [
            {
                name: 'List',
                type: 'item'
            },
            {
                name: 'Table',
                type: 'item'
            },
            {
                name: 'Tree',
                type: 'item'
            }
        ]
    }
]
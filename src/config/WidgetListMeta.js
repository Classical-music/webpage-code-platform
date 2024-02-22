/**
 * UI控件源数据
 * 属性: isExpand: 是否展开
 */
export const widgetListMeta = [
    {
        name: '基础控件',
        type: 'group',
        expand: true,
        subs: [
            {
                name: '控件1',
                type: 'item',
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
]
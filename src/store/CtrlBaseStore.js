import MenuItem from "@WidgetMenu/MenuItem.vue";
import { defineStore } from "pinia";
import { reactive } from "vue";
import { usePageDataStore } from "./PageDataStore";

const pageData = usePageDataStore()

export const useCtrlBaseStore = defineStore('ctrl-base', _ => {
    const data = reactive({
    })

    function init() {
        let names = [
            'Panel', 'Label', 'Image', 'Button',
            'InputText', 'InputPasswd', 'InputFile', 'Check', 'Radio',
            'Dropdown', 'PopupBase', 'ListBase', 'TreeBase', 'TableBase',
        ]
        for (let name of names) {
            data[name] = {
                comp: MenuItem,
                name: name,
                clickCb: addCtrl
            }
        }
    }

    function addCtrl(item) {
        pageData.addItem(item.name)
    }

    return {
        data,
        init,
    }
})
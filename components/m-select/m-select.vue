<templete>
    <view style="width: 80%; margin: auto; margin-bottom: 20px;">
        <!-- <xfl-select 
            :list="list"
            :clearable="false"
            :showItemNum="5" 
            :listShow="true"
            :isCanInput="true"  
            :style_Container="'height: 50px; font-size: 16px;'"
            :placeholder = "'placeholder'"
            :initValue="'苹果'"
            :selectHideType="'hideAll'"
        >
        </xfl-select> -->
				
    </view>
</templete>

<script>

// import xflSelect from '../xfl-select/xfl-select.vue';    

export default {
    data() {
        return {
            list: [       //要展示的数据
                '苹果',
                {value: '香蕉', disabled: true},
                '葡萄',
                '芒果',
                '大白菜',
            ],
        }
    },
    // components: { xflSelect },  //注册为子组件

    /* 
        // 或者在 main.js 中注册为全局组件 
        import xflSelect from './components/xfl-select/xfl-select.vue';
        Vue.component('xfl-select', xflSelect);
    */
}	
</script>
<style>
	
</style>
<template>
	<div :class="className('wrapper')">
		<v-popover>
			<v-input readonly></v-input>
			<template slot="content">
				<div :class="className('pop')">
					<div :class="className('nav')">
					</div>
					<div :class="className('panels')">
					</div>
					<div :class="className('actions')">
					</div>
				</div>
			</template>
		</v-popover>
	</div>
</template>

<script>
    import vPopover from '../popover/popover'
    import vIcon from '../basic/v-icon'
    import vInput from '../basic/v-input'

    export default {
        name: "datepicker",
        data() {
            return {
                value: new Date(),
                weekDict: {
                    1: '一',
                    2: '二',
                    3: '三',
                    4: '四',
                    5: '五',
                    6: '六',
                    7: '日'
                }
            }
        },
        methods: {
            className(name) {
                return `v-date-picker-${name}`
            },
            getFirstDay(date) {
                let {year, month} = this.getYearMonthDay(date)
                return new Date(year, month, 1)
            },
            getLastDay(date) {
                let {year, month} = this.getYearMonthDay(date)
                //获取下一个月的第0天,相当于上一个月的最后一天
                return new Date(year, month + 1, 0)
            },
            getYearMonthDay(date) {
                if (!date instanceof Date) throw TypeError('date must be date instance')
                return {
                    year: date.getFullYear(),
                    month: date.getMonth(),
                    date: date.getDate()
                }

            }
        },
        mounted() {
            console.log(this.getAllDays)
        },
        computed: {
            getAllDays() {
                let firstDay = this.getFirstDay(this.value)
                let lastDay = this.getLastDay(this.value)
                let {year, month} = this.getYearMonthDay(this.value)
                let dayOfMonth = []
                //遍历获取当前月的所有日期
                for (let i = firstDay.getDate(); i <= lastDay.getDate(); i++) {
                    dayOfMonth.push(new Date(year, month, i))
                }
                //根据星期 填充前一月日期,一页显示 42天,保证页面高度,
                let prevArr = []
                //星期从  一 到日顺序所以 正常日期减2, 0的话为5 setDate(0)算最后一天
                let prevDate = firstDay.getDay() ? firstDay.getDay() - 2 : 5
                for (let i = prevDate; i >= 0; i--) {
                    prevArr.push(new Date(year, month, -i))
                }
                //同上
                let nextArr = []
                let nextDate = 42 - (dayOfMonth.length + prevArr.length)
                //从1开始不包括最后一天 0
                for (let i = 1; i <= nextDate; i++) {
                    //  下一个月的日期
                    nextArr.push(new Date(year, month + 1, i))
                }
                return [...prevArr, ...dayOfMonth, ...nextArr]
            }
        },
        props: {},
        components: {
            vPopover,
            vIcon,
            vInput
        }
    }
</script>

<style lang="scss" scoped>

</style>
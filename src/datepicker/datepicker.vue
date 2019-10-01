<template>
	<div :class="className('wrapper')">
		<v-popover position="bottom" :content-styles="{padding:'0px'}">
			<v-input readonly :value="formatDate"></v-input>
			<template slot="content">
				<div :class="className('pop')">
					<div :class="className('nav')">
						<div :class="className('prev')">
							<span @click="onPrevYear">
								<v-icon icon-name="lefttwo"></v-icon>
							</span>
							<span @click="onPrevMonth">
								<v-icon icon-name="left"></v-icon>
							</span>
						</div>
						<div class="date-value">
							<span class="year">
								{{displayDate.year}}年
							</span>
							<span class="month">
								{{displayDate.month+1}}月
							</span>
						</div>
						<div :class="className('next')">
							<span @click="onNextMonth">
								<v-icon icon-name="right"></v-icon>
							</span>
							<span @click="onNextYear">
								<v-icon icon-name="righttwo"></v-icon>
							</span>
						</div>
					</div>
					<div :class="className('panels')">
						<div class="weeks">
							<span v-for="i in 7" class="weekday">
								{{weekDict[i]}}
							</span>
						</div>
						<div class="dates">
							<div class="date-row" v-for=" i in 6">
								<span class="date-cell" v-for="j in 7" :class="{'current-day':isCurrentMonth(i,j)}"
								      @click="onCellSelect(i,j)"
								>
									{{calcVisibleDate(i,j).getDate()}}
								</span>
							</div>
						</div>
					</div>
					<div :class="className('actions')">
						今天
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
            let {year, month, date} = this.getYearMonthDay(this.value)
            return {
                //    区分展示和选中
                displayDate: {year, month, date},
                weekDict: {
                    1: '一',
                    2: '二',
                    3: '三',
                    4: '四',
                    5: '五',
                    6: '六',
                    7: '日'
                },
                pickerColRange: [1, 2, 3, 4, 5, 6, 7],
                pickerRowRange: [1, 2, 3, 4, 5, 6]
            }
        },
        methods: {
            addMonth(n) {
                const {year, month, date} = this.displayDate
                const newDate = new Date(year, month, date)
                this.displayDate = this.getYearMonthDay(new Date(newDate.setMonth(month + n)))
            },
            addYear(n) {
                const {year, month, date} = this.displayDate
                const newDate = new Date(year, month, date)
                this.displayDate = this.getYearMonthDay(new Date(newDate.setFullYear(year + n)))
            },
            onPrevYear() {
                this.addYear(-1)
            },
            onNextYear() {
                this.addYear(1)
            },
            onPrevMonth() {
                this.addMonth(-1)
            },
            onNextMonth() {
                this.addMonth(1)
            },
            onCellSelect(row, col) {
                const date = this.getAllDays[`${(row - 1) * 7 + col - 1}`]
                console.log(date)
                this.$emit('update:value', new Date(date))
            },
            isCurrentMonth(row, col) {
                const date = this.getAllDays[`${(row - 1) * 7 + col - 1}`]
                const {year, month} = this.getYearMonthDay(date)
                return this.displayDate.year === year && this.displayDate.month === month

            },
            calcVisibleDate(row, col) {
                return this.getAllDays[`${(row - 1) * 7 + col - 1}`]
            },
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

        },
        computed: {
            formatDate() {
                const {year, month, date} = this.getYearMonthDay(this.value)
                return `${year}-${month + 1}-${date}`
            },
            getAllDays() {
                const initDate = new Date(this.displayDate.year, this.displayDate.month, 1)
                let firstDay = this.getFirstDay(initDate)
                let dayOfMonth = []
                let prevDate = firstDay.getDay() ? firstDay.getDay() - 1 : 6
                const DAY_MS = 86400 * 1000
                let firstDayOfShow = new Date(firstDay.getTime() - prevDate * DAY_MS)
                for (let i = 0; i < 42; i++) {
                    dayOfMonth.push(new Date(firstDayOfShow.getTime() + i * DAY_MS))
                }
                return dayOfMonth
            }
        },
        props: {
            value: {
                type: Date,
                default: () => new Date()
            }
        },
        components: {
            vPopover,
            vIcon,
            vInput
        }
    }
</script>

<style lang="scss" scoped>
	@import "../../style/var";
	
	.v-date-picker-pop {
		box-sizing: border-box;
		min-width: 278px;
		
		.v-date-picker-actions {
			padding: 0 12px;
			line-height: 38px;
			text-align: center;
		}
		
		.v-date-picker-panels {
			padding: 8px 12px;
			user-select: none;
			border-bottom: 1px solid $gray-border;
			
			.date-row {
				display: flex;
			}
			
			.weeks {
				color: $base-font-color;
				display: flex;
				
				.weekday {
					display: inline-flex;
					align-items: center;
					justify-content: center;
					border-radius: 2px;
					width: 33px;
					height: auto;
					padding: 6px 0;
					margin: 0 auto;
				}
			}
			
			.dates {
				.date-cell {
					cursor: pointer;
					display: inline-flex;
					align-items: center;
					justify-content: center;
					border-radius: 2px;
					width: 24px;
					height: 24px;
					margin: 0 auto;
					color: $base-disabled-gray;
					
					&.current-day {
						color: $base-font-color;
					}
				}
			}
		}
		
		.v-date-picker-nav {
			display: flex;
			padding: 10px 5px;
			justify-content: space-between;
			border-bottom: 1px solid $gray-border;
			
			.v-date-picker-prev, .v-date-picker-next {
				display: inline-flex;
				align-items: center;
			}
			
			svg {
				cursor: pointer;
				margin: 0 5px;
				min-width: 0.8em;
				min-height: 0.8em;
				fill: $light-gray-color;
				transition: .2s linear;
				
				&:hover {
					fill: $base-font-color2;
				}
			}
			
			.date-value {
				font-weight: 500;
				cursor: pointer;
				color: $base-font-color2;
				transition: .2s linear;
				margin: auto;
				
				.year:hover, .month:hover {
					color: $active-primary;
				}
			}
		}
	}
</style>
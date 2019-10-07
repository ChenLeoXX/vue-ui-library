<template>
	<div :class="className('wrapper')" v-out-click="closePanel">
		<v-input readonly :value="formatDate" right-icon="calendar" placeholder="请选择日期" @click="visible = true"></v-input>
		<v-expand :visible="visible" class="expand">
			<div :class="className('pop')">
				<label>
					<input type="text" :value="formatDate" placeholder="请选择日期" @change="matchInput">
				</label>
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
							<span class="year" @click="selectYear">
								{{displayDate.year}}年
							</span>
						<span class="month" @click="selectMonth">
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
								<span class="date-cell" v-for="j in 7"
								      :class="{'current-day':isCurrentMonth(i,j),'today':isToday(i,j),'selectDay':isSelected(i,j)}"
								      @click="onCellSelect(i,j)"
								>
									{{calcVisibleDate(i,j).getDate()}}
								</span>
						</div>
					</div>
				</div>
				<div :class="className('actions')">
					<span @click="clearDate">清除</span>
					<span @click="goToday">今天</span>
				</div>
			</div>
		</v-expand>
	</div>
</template>

<script>
    import vIcon from '../basic/v-icon'
    import vInput from '../basic/v-input'
    import vExpand from '../animations/expand'
    import outClick from '../click-outside'

    export default {
        name: "datepicker",
        directives: {
            outClick
        },
        data() {
            let defaultDate = new Date()
            let {year, month, date} = this.value ? this.getYearMonthDay(this.value) : this.getYearMonthDay(defaultDate)
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
                defaultDate,
                visible: false,
                pickerColRange: [1, 2, 3, 4, 5, 6, 7],
                pickerRowRange: [1, 2, 3, 4, 5, 6],
                yearBase: 0,
                monthBase: 0
            }
        },
        watch: {
            value(val) {
                this.displayDate = this.getYearMonthDay(val)
            }
        },
        methods: {
            matchInput(e) {
                let regx = /^\d{4}-\d{2}-\d{2}$/g
                let res = e.target.value.match(regx)
                let isValid = true
                if (res === null) {
                    return this.$emit('update:value', this.value)
                }
                res[0].split('-').forEach((item, ind) => {
                    let val = parseInt(item)
                    if (ind === 0) {
                        if (val < 1900 || val > 2200) {
                            isValid = false
                        }
                    } else if (ind === 1) {
                        if (val > 12) {
                            isValid = false
                        }
                    } else {
                        if (val > 31) {
                            isValid = false
                        }
                    }
                })
                if (res && isValid) {
                    this.$emit('update:value', new Date(res[0]))
                } else {
                    this.$emit('update:value', this.value)
                }
                this.visible = false
            },
            closePanel() {
                this.visible = false
            },
            selectYear() {
                this.yearBase = this.displayDate.year
            },
            selectMonth() {

            },
            clearDate() {
                this.$emit('update:value', '')
            },
            goToday() {
                this.$emit('update:value', new Date())
                this.$emit('on-change')
                this.displayDate = this.getYearMonthDay(new Date())
                this.visible = false
            },
            isSelected(row, col) {
                const itemDate = this.getAllDays[`${(row - 1) * 7 + col - 1}`]
                return this.compareTime(itemDate, this.value)
            },
            isToday(row, col) {
                const itemDate = this.getAllDays[`${(row - 1) * 7 + col - 1}`]
                return this.compareTime(itemDate, new Date())
            },
            compareTime(date1, date2) {
                const {year, month, date} = this.getYearMonthDay(date1)
                const {year: _year, month: _month, date: _date} = this.getYearMonthDay(date2)
                return _year === year && _month === month && date === _date
            },
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
                this.$emit('update:value', new Date(date))
                this.$emit('on-change')
                // this.$refs.pop.close
                this.visible = false
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
                if (!(date instanceof Date) && typeof date !== 'string') throw TypeError('date must be date instance')
                date = new Date(date)
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
                if (this.value) {
                    const {year, month, date} = this.getYearMonthDay(this.value)
                    return `${year}-${month < 9 ? '0' + (month + 1) : month + 1}-${date < 10 ? '0' + date : date}`
                }
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
                type: Date | String,
                validator(val) {
                    let regx = /^\d{4}-\d{2}-\d{2}$/g
                    if (typeof val === 'string' && val !== '') {
                        return !!val.match(regx)
                    } else if (typeof val === 'object') {
                        return val instanceof Date
                    } else {
                        return true
                    }
                },
                required: true,
            },
        },
        components: {
            vIcon,
            vInput,
            vExpand
        }
    }
</script>

<style lang="scss" scoped>
	@import "../../style/var";
	
	.v-date-picker-wrapper {
		width: 280px;
		position: relative;
		
		.outer-input {
			position: relative;
			
			.v-icon {
				position: absolute;
				right: 5px;
				top: 8px;
				fill: gray;
			}
		}
		.expand {
			position: absolute;
			top: -2px;
			left: -2px;
			width: 100%;
			height: 100%;
		}
	}
	
	.v-date-picker-pop {
		filter: drop-shadow(0 1px 5px rgba(0, 0, 0, 0.15));
		box-sizing: border-box;
		width: 278px;
		position: absolute;
		z-index: 20;
		top: 0;
		background: #ffffff;
		
		input {
			outline: none;
			width: 100%;
			height: 35px;
			font-size: $font-size;
			display: block;
			border: none;
			border-bottom: 1px solid $gray-border;
			-webkit-box-shadow: none;
			box-shadow: none;
			padding: 5px 10px;
			color: $base-font-color;
			
			&::placeholder {
				color: #ddd;
			}
		}
		
		.v-date-picker-actions {
			padding: 0 12px;
			line-height: 38px;
			text-align: right;
			user-select: none;
			
			span {
				cursor: pointer;
				margin-right: .5em;
			}
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
						
						&.selectDay {
							background: $hover-lightblue;
						}
						
						&.today {
							color: $active-primary;
							border: 1px solid $active-primary;
							font-weight: bold;
						}
						
						&:hover {
							background: $hover-lightblue;
						}
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
				user-select: none;
				
				.year:hover, .month:hover {
					color: $active-primary;
				}
			}
		}
	}
</style>
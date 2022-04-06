import moment from "moment";
export function getMonths(pastYearRange, futureYearRange) {
    var currentYear = moment().year();
    var startYear = currentYear - pastYearRange;
    var endYear = currentYear + futureYearRange;
    var months = [];
    for (var i = 0; i < endYear - startYear; i++) {
        var year = startYear + i;
        for (var i_1 = 0; i_1 < 12; i_1++) {
            var id = "";
            if (i_1 < 9) {
                id = year + "-0" + (i_1 + 1);
            }
            else {
                id = year + "-" + (i_1 + 1);
            }
            months.push({
                id: id,
                year: year,
                month: i_1 + 1,
            });
        }
    }
    return months;
}
export function getWeeks(month, startDate, endDate) {
    var today = moment().format("YYYY-MM-DD");
    var currentMonth = moment(month).month();
    var currentDate = moment(month).startOf("month");
    var week = [];
    var weeks = [];
    var dayObj = {};
    do {
        week = [];
        for (var i = 0; i < 7; i++) {
            dayObj = {
                type: null,
                date: null,
                isToday: false,
                isBeforeToday: false,
                isHoliday: false,
            };
            var currentDateString = currentDate.format("YYYY-MM-DD");
            if (i == currentDate.days() && currentDate.month() == currentMonth) {
                if (startDate && startDate === currentDateString) {
                    if (!endDate) {
                        dayObj.type = "single";
                    }
                    else {
                        dayObj.type = "start";
                    }
                }
                if (endDate && endDate == currentDateString) {
                    if (startDate === endDate) {
                        dayObj.type = "single";
                    }
                    else {
                        dayObj.type = "end";
                    }
                }
                if (startDate &&
                    startDate < currentDateString &&
                    endDate &&
                    endDate > currentDateString) {
                    dayObj.type = "between";
                }
                var date = currentDate.clone().format("YYYY-MM-DD");
                var passedDayFromToday = currentDate.diff(moment(), "day") < 0;
                dayObj.date = date;
                if (date === today) {
                    dayObj.isToday = true;
                }
                if (passedDayFromToday) {
                    dayObj.isBeforeToday = true;
                }
                if (i === 0 || i === 6) {
                    dayObj.isHoliday = true;
                }
                week.push(dayObj);
                currentDate.add(1, "day");
            }
            else {
                if (startDate &&
                    endDate &&
                    startDate < startDate &&
                    endDate >= startDate) {
                    dayObj.type = "between";
                }
                week.push(dayObj);
            }
        }
        weeks.push(week);
    } while (currentDate.month() == currentMonth);
    return weeks;
}
//# sourceMappingURL=data.js.map
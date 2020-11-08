

class XDate extends Date{
    
    static now(){
        return new Date();
    }
    
    y2kYear = 50;
    MILLI = "ms";
    SECOND = "s";
    MINUTE = "mi";
    HOUR = "h";
    DAY = "d";
    MONTH = "mo";
    YEAR = "y";

    dayNames = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    monthNumbers = {
        Jan:0,
        Feb:1,
        Mar:2,
        Apr:3,
        May:4,
        Jun:5,
        Jul:6,
        Aug:7,
        Sep:8,
        Oct:9,
        Nov:10,
        Dec:11
    };
    defaultFormat = "m/d/Y";

    static getShortMonthName(month) {
        return XDate.monthNames[month].substring(0, 3);
    }

    formatCodes = {
        d: "this.getDate().toString().padStart(2, '0')",
        D: "this.getShortDayName(this.getDay())", 
        j: "this.getDate()",
        l: "this.dayNames[this.getDay()]",
        N: "(this.getDay() ? this.getDay() : 7)",
        S: "this.getSuffix(this)",
        w: "this.getDay()",
        z: "this.getDayOfYear(this)",
        W: "this.getWeekOfYear(this).toString().padStart(2, '0')",
        F: "this.monthNames[this.getMonth()]",
        m: "(this.getMonth() + 1).toString().padStart(2, '0')",
        M: "this.getShortMonthName(this.getMonth())", 
        n: "(this.getMonth() + 1)",
        t: "this.getDaysInMonth(this)",
        L: "(this.isLeapYear(this) ? 1 : 0)",
        o: "(this.getFullYear() + (this.getWeekOfYear(this) == 1 && this.getMonth() > 0 ? +1 : (this.getWeekOfYear(this) >= 52 && this.getMonth() < 11 ? -1 : 0)))",
        Y: "this.getFullYear().toString().padStart(4, '0')",
        y: "('' + this.getFullYear()).substring(2, 4)",
        a: "(this.getHours() < 12 ? 'am' : 'pm')",
        A: "(this.getHours() < 12 ? 'AM' : 'PM')",
        g: "((this.getHours() % 12) ? this.getHours() % 12 : 12)",
        G: "this.getHours()",
        h: "(this.getHours() % 12) ? this.getHours() % 12 : 12).toString().padStart(2, '0')",
        H: "this.getHours().toString().padStart(2, '0')",
        i: "this.getMinutes().toString().padStart( 2, '0')",
        s: "this.getSeconds().toString().padStart( 2, '0')",
        u: "this.getMilliseconds().toString().padStart( 3, '0')",
        O: "this.getGMTOffset(this)",
        P: "this.getGMTOffset(this, true)",
        T: "this.getTimezone(this)",
        Z: "(this.getTimezoneOffset() * -60)",
        c: function() { 
            for (var c = "Y-m-dTH:i:sP", code = [], i = 0, l = c.length; i < l; ++i) {
                var e = c.charAt(i);
                code.push(e === "T" ? "'T'" : this.getFormatCode(e)); 
            }
            return code.join(" + ");
        },
        U: "Math.round(this.getTime() / 1000)"
    }
    
    getFormatCode(character) {
        var f = this.formatCodes[character];
        if (f) {
            f = eval(f);
        }
        return f || (character);
    }

    format = (format) => {
        var code = [],
            special = false,
            ch = '';
        for (var i = 0; i < format.length; ++i) {
            ch = format.charAt(i);
            if (!special && ch === "\\") {
                special = true;
            } else if (special) {
                special = false;
                code.push(ch);
            } else {
                code.push(this.getFormatCode(ch));
            }
        }
        
        return code.join('');
    }
};

export default XDate;
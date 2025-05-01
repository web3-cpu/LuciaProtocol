export const dates = {
  convert: function (d) {
    return (
      d.constructor === Date ? d :
        d.constructor === Array ? new Date(d[0], d[1], d[2]) :
          d.constructor === Number ? new Date(d) :
            d.constructor === String ? new Date(d) :
              typeof d === "object" ? new Date(d.year, d.month, d.date) :
                NaN
    );
  },
  compare: function (a, b) {
    return (
      isFinite(a = this.convert(a).valueOf()) &&
        isFinite(b = this.convert(b).valueOf()) ?
        (a > b) - (a < b) :
        NaN
    );
  }
}

export function addMinutesToDate(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}


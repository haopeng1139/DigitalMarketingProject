// Slowpost time zones: "8:00 AM their time" computed the same way the server does
// (the recipient's calendar date + N days, at 08:00 in their zone).
(function () {
  var ZONES = [
    ['Pacific/Honolulu', 'Honolulu, USA'], ['America/Anchorage', 'Anchorage, USA'],
    ['America/Los_Angeles', 'Los Angeles · Seattle · Portland, USA'], ['America/Vancouver', 'Vancouver, Canada'],
    ['America/Denver', 'Denver, USA'], ['America/Phoenix', 'Phoenix, USA'], ['America/Chicago', 'Chicago · Austin, USA'],
    ['America/Mexico_City', 'Mexico City, Mexico'], ['America/New_York', 'New York · Boston · Miami, USA'],
    ['America/Toronto', 'Toronto, Canada'], ['America/Bogota', 'Bogotá, Colombia'], ['America/Lima', 'Lima, Peru'],
    ['America/Santiago', 'Santiago, Chile'], ['America/Sao_Paulo', 'São Paulo, Brazil'], ['America/Argentina/Buenos_Aires', 'Buenos Aires, Argentina'],
    ['Atlantic/Reykjavik', 'Reykjavík, Iceland'], ['Europe/London', 'London, UK'], ['Europe/Dublin', 'Dublin, Ireland'],
    ['Europe/Lisbon', 'Lisbon, Portugal'], ['Europe/Madrid', 'Madrid, Spain'], ['Europe/Paris', 'Paris, France'],
    ['Europe/Berlin', 'Berlin, Germany'], ['Europe/Amsterdam', 'Amsterdam, Netherlands'], ['Europe/Rome', 'Rome, Italy'],
    ['Europe/Stockholm', 'Stockholm, Sweden'], ['Europe/Warsaw', 'Warsaw, Poland'], ['Europe/Athens', 'Athens, Greece'],
    ['Europe/Istanbul', 'Istanbul, Türkiye'], ['Europe/Kyiv', 'Kyiv, Ukraine'], ['Europe/Moscow', 'Moscow, Russia'],
    ['Africa/Lagos', 'Lagos, Nigeria'], ['Africa/Cairo', 'Cairo, Egypt'], ['Africa/Nairobi', 'Nairobi, Kenya'],
    ['Africa/Johannesburg', 'Johannesburg, South Africa'], ['Asia/Dubai', 'Dubai, UAE'], ['Asia/Karachi', 'Karachi, Pakistan'],
    ['Asia/Kolkata', 'Mumbai · Delhi, India'], ['Asia/Dhaka', 'Dhaka, Bangladesh'], ['Asia/Bangkok', 'Bangkok, Thailand'],
    ['Asia/Jakarta', 'Jakarta, Indonesia'], ['Asia/Ulaanbaatar', 'Ulaanbaatar, Mongolia'], ['Asia/Shanghai', 'Beijing · Shanghai, China'],
    ['Asia/Hong_Kong', 'Hong Kong'], ['Asia/Singapore', 'Singapore'], ['Asia/Manila', 'Manila, Philippines'],
    ['Asia/Taipei', 'Taipei, Taiwan'], ['Asia/Seoul', 'Seoul, South Korea'], ['Asia/Tokyo', 'Tokyo · Osaka, Japan'],
    ['Australia/Perth', 'Perth, Australia'], ['Australia/Sydney', 'Sydney · Melbourne, Australia'], ['Pacific/Auckland', 'Auckland, New Zealand'],
    ['UTC', 'Coordinated Universal Time (UTC)']
  ];

  function myTz() { try { return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'; } catch (e) { return 'UTC'; } }
  function parts(date, tz) {
    var p = {};
    new Intl.DateTimeFormat('en-US', { timeZone: tz, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })
      .formatToParts(date).forEach(function (x) { p[x.type] = x.value; });
    return { y: +p.year, m: +p.month, d: +p.day, h: +p.hour % 24, mi: +p.minute, s: +p.second };
  }
  function todayIn(tz) { var p = parts(new Date(), tz); return { y: p.y, m: p.m, d: p.d }; }
  function addDays(ymd, n) { var t = new Date(Date.UTC(ymd.y, ymd.m - 1, ymd.d + n)); return { y: t.getUTCFullYear(), m: t.getUTCMonth() + 1, d: t.getUTCDate() }; }
  function iso(ymd) { return ymd.y + '-' + String(ymd.m).padStart(2, '0') + '-' + String(ymd.d).padStart(2, '0'); }
  function parseIso(s) { var a = s.split('-'); return { y: +a[0], m: +a[1], d: +a[2] }; }
  // The instant that is 08:00 on this calendar date in tz (handles daylight saving).
  function at8(ymd, tz) {
    var want = Date.UTC(ymd.y, ymd.m - 1, ymd.d, 8, 0, 0), guess = want;
    for (var i = 0; i < 3; i++) {
      var p = parts(new Date(guess), tz);
      var seen = Date.UTC(p.y, p.m - 1, p.d, p.h, p.mi, p.s);
      guess += want - seen;
    }
    return new Date(guess);
  }
  function fmt(date, tz) {
    return date.toLocaleDateString('en-US', { timeZone: tz, weekday: 'short', month: 'short', day: 'numeric' }) + ' · ' +
      date.toLocaleTimeString('en-US', { timeZone: tz, hour: 'numeric', minute: '2-digit' });
  }
  function fmtTime(date, tz) { return date.toLocaleTimeString('en-US', { timeZone: tz, hour: 'numeric', minute: '2-digit' }); }
  function fmtDayIfDifferent(date, tzA, tzB) {
    var a = parts(date, tzA), b = parts(date, tzB);
    if (a.y === b.y && a.m === b.m && a.d === b.d) return '';
    return 'on ' + date.toLocaleDateString('en-US', { timeZone: tzB, weekday: 'short', month: 'short', day: 'numeric' }) + ' ';
  }
  function label(tz) {
    for (var i = 0; i < ZONES.length; i++) if (ZONES[i][0] === tz) return ZONES[i][1];
    return tz.split('/').pop().replace(/_/g, ' ');
  }
  function fillSelect(sel, current) {
    var mine = myTz(), html = '';
    var known = ZONES.some(function (z) { return z[0] === mine; });
    html += '<option value="' + mine + '">Same as me · ' + label(mine) + '</option>';
    html += '<optgroup label="Cities">' + ZONES.filter(function (z) { return z[0] !== mine; }).map(function (z) {
      return '<option value="' + z[0] + '">' + z[1] + '</option>';
    }).join('') + '</optgroup>';
    if (window.Intl && Intl.supportedValuesOf) {
      try {
        var all = Intl.supportedValuesOf('timeZone').filter(function (z) { return z !== mine && !ZONES.some(function (k) { return k[0] === z; }); });
        html += '<optgroup label="All time zones">' + all.map(function (z) { return '<option value="' + z + '">' + z.replace(/_/g, ' ') + '</option>'; }).join('') + '</optgroup>';
      } catch (e) {}
    }
    sel.innerHTML = html;
    sel.value = current || mine;
    if (sel.value !== (current || mine)) sel.value = mine;
    return known;
  }

  window.SlowpostTime = { myTz: myTz, todayIn: todayIn, addDays: addDays, addDaysIso: function (ymd, n) { return iso(addDays(ymd, n)); }, parseIso: parseIso, at8: at8, fmt: fmt, fmtTime: fmtTime, fmtDayIfDifferent: fmtDayIfDifferent, label: label, fillSelect: fillSelect };
})();

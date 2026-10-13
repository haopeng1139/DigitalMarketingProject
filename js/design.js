// Slowpost stationery: papers, inks, handwriting, stickers, stamps, envelopes and seals.
// Shared by the writing page (letter.html) and the opening page (open.html) so a letter
// looks the same to the person who wrote it and the person who opens it.
(function () {
  var ICON = {
    heart: function (c) { return '<path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10z" fill="' + c + '"></path>'; },
    star: function (c) { return '<polygon points="12,2.5 14.9,8.6 21.5,9.3 16.5,13.8 18,20.5 12,17 6,20.5 7.5,13.8 2.5,9.3 9.1,8.6" fill="' + c + '"></polygon>'; },
    moon: function (c) { return '<path d="M19 15.5A8 8 0 1 1 9 4.5a6.5 6.5 0 0 0 10 11z" fill="' + c + '"></path>'; },
    flower: function (c) { return '<circle cx="12" cy="6.8" r="4.2" fill="' + c + '"></circle><circle cx="17.2" cy="12" r="4.2" fill="' + c + '"></circle><circle cx="12" cy="17.2" r="4.2" fill="' + c + '"></circle><circle cx="6.8" cy="12" r="4.2" fill="' + c + '"></circle><circle cx="12" cy="12" r="3" fill="#F0B93A"></circle>'; },
    sun: function (c) { var s = '<circle cx="12" cy="12" r="5.5" fill="' + c + '"></circle>'; [[12, 2.8], [12, 21.2], [2.8, 12], [21.2, 12], [5.5, 5.5], [18.5, 18.5], [5.5, 18.5], [18.5, 5.5]].forEach(function (p) { s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="1.8" fill="' + c + '"></circle>'; }); return s; },
    cherry: function (c) { return '<path d="M8 14C9 9 12 6 16.5 3.5M16 14.5c-.6-4-.6-7.5.5-11" stroke="#4F7F5A" stroke-width="1.7" fill="none" stroke-linecap="round"></path><circle cx="8" cy="17" r="3.8" fill="' + c + '"></circle><circle cx="16" cy="17.5" r="3.8" fill="' + c + '"></circle>'; },
    cassette: function (c) { return '<rect x="2.5" y="5.5" width="19" height="13" rx="2" fill="' + c + '"></rect><circle cx="8.5" cy="11.5" r="2.3" fill="#FFF8EA"></circle><circle cx="15.5" cy="11.5" r="2.3" fill="#FFF8EA"></circle><rect x="7" y="15.2" width="10" height="1.8" rx=".9" fill="#FFF8EA"></rect>'; },
    smile: function (c) { return '<circle cx="12" cy="12" r="9.5" fill="' + c + '"></circle><circle cx="9" cy="10" r="1.3" fill="#4A3426"></circle><circle cx="15" cy="10" r="1.3" fill="#4A3426"></circle><path d="M8.2 14a4.5 4.5 0 0 0 7.6 0" stroke="#4A3426" stroke-width="1.6" fill="none" stroke-linecap="round"></path>'; },
    cake: function (c) { return '<rect x="4" y="11" width="16" height="9" rx="2" fill="' + c + '"></rect><path d="M4 14c2 1.5 4 1.5 6 0s4-1.5 6 0 4 1.5 4 0" stroke="#FFF8EA" stroke-width="1.5" fill="none"></path><rect x="11" y="5" width="2" height="6" fill="#4A3426"></rect><path d="M12 1.8c1.2 1.4 1.2 2.6 0 3.2-1.2-.6-1.2-1.8 0-3.2z" fill="#E8862E"></path>'; },
    plane: function (c) { return '<path d="M2.5 13.5l19-8-6.5 15-3.2-6.3z" fill="' + c + '"></path><path d="M11.8 14.2l9.7-8.7" stroke="#FFF8EA" stroke-width="1.2"></path>'; }
  };
  function svg(id, color, size) {
    return '<svg viewBox="0 0 24 24" width="' + size + '" height="' + size + '" aria-hidden="true">' + (ICON[id] || ICON.heart)(color) + '</svg>';
  }

  var D = {
    svg: svg,
    PAPERS: [
      { id: 'cream', name: 'Cream lined', bg: 'repeating-linear-gradient(#FFF8EA 0 35px, #E8D9BD 35px 36px)' },
      { id: 'butter', name: 'Butter lined', bg: 'repeating-linear-gradient(#FCF1C9 0 35px, #EBDDA5 35px 36px)' },
      { id: 'blush', name: 'Blush lined', bg: 'repeating-linear-gradient(#FBE6DC 0 35px, #F0CDBE 35px 36px)' },
      { id: 'sky', name: 'Sky lined', bg: 'repeating-linear-gradient(#E3F1F0 0 35px, #C3DFDC 35px 36px)' },
      { id: 'kraft', name: 'Kraft', bg: '#E2C99F' },
      { id: 'dots', name: 'Polka dot', bg: 'radial-gradient(#E0C6A4 2px, transparent 2.5px) 0 0 / 18px 18px, #FFF8EA' }
    ],
    INKS: [
      { id: 'brown', name: 'Brown', color: '#4A3426' }, { id: 'terracotta', name: 'Terracotta', color: '#B5461A' },
      { id: 'teal', name: 'Teal', color: '#23707A' }, { id: 'blue', name: 'Blue', color: '#2F5FA8' }, { id: 'plum', name: 'Plum', color: '#6B3B6E' }
    ],
    FONTS: [
      { id: 'type', name: 'Typewriter', css: "'Space Mono', monospace", size: '16px' },
      { id: 'script', name: 'Cursive', css: "'Homemade Apple', cursive", size: '15px' },
      { id: 'cute', name: 'Cute & round', css: "'Gaegu', cursive", size: '23px' },
      { id: 'serif', name: 'Big & classic', css: "'DM Serif Display', serif", size: '20px' }
    ],
    STAMPS: [
      { id: 'heart', name: 'Love', bg: '#E9A08A', fg: '#FFF8EA' }, { id: 'sun', name: 'Sunny', bg: '#F2A54A', fg: '#FFF3D6' },
      { id: 'flower', name: 'Bloom', bg: '#A8D8DA', fg: '#B5461A' }, { id: 'star', name: 'Star', bg: '#F0B93A', fg: '#B5461A' },
      { id: 'moon', name: 'Night', bg: '#2F4A6B', fg: '#F0B93A' }, { id: 'cassette', name: 'Mixtape', bg: '#4A3426', fg: '#F2A54A' },
      { id: 'cherry', name: 'Cherry', bg: '#FBE6DC', fg: '#B5461A' }, { id: 'plane', name: 'Air mail', bg: '#BFDCE0', fg: '#2F5FA8' }
    ],
    STICKERS: {
      heart: { name: 'Heart', color: '#E0735A' }, star: { name: 'Star', color: '#F2B84A' }, moon: { name: 'Moon', color: '#6C8CD5' },
      flower: { name: 'Flower', color: '#E9A08A' }, sun: { name: 'Sun', color: '#F2A54A' }, cherry: { name: 'Cherries', color: '#C9453A' },
      cassette: { name: 'Mixtape', color: '#23707A' }, smile: { name: 'Smiley', color: '#F0B93A' },
      cake: { name: 'Cake', color: '#E9A08A' }, plane: { name: 'Paper plane', color: '#5B93D6' }
    },
    ENVS: [
      { id: 'cream', name: 'Cream', color: '#F3E3C3' }, { id: 'kraft', name: 'Kraft', color: '#D9B98A' }, { id: 'blush', name: 'Blush', color: '#F2C9B8' },
      { id: 'sky', name: 'Sky', color: '#BFDCE0' }, { id: 'butter', name: 'Butter', color: '#F5DE96' }, { id: 'sage', name: 'Sage', color: '#C9D9B8' }
    ],
    SEALS: [
      { id: 'red', name: 'Red', color: '#A9432A' }, { id: 'teal', name: 'Teal', color: '#23707A' }, { id: 'gold', name: 'Gold', color: '#C9962E' },
      { id: 'blue', name: 'Blue', color: '#2F5FA8' }, { id: 'plum', name: 'Plum', color: '#6B3B6E' }
    ],
    OCCASIONS: {
      birthday: { name: 'Birthday', headline: 'Happy birthday!', paper: 'butter', stickers: ['cake', 'star'], stamp: 'star' },
      graduation: { name: 'Graduation', headline: 'You did it!', paper: 'sky', stickers: ['star', 'sun'], stamp: 'sun' },
      wedding: { name: 'Wedding', headline: 'To the happy couple', paper: 'blush', stickers: ['heart', 'flower'], stamp: 'heart' },
      baby: { name: 'New baby', headline: 'Welcome, little one', paper: 'sky', stickers: ['moon', 'star'], stamp: 'moon' },
      holidays: { name: 'Holidays', headline: 'Happy holidays', paper: 'cream', stickers: ['star', 'cherry'], stamp: 'star' },
      thanks: { name: 'Thank you', headline: 'Thank you', paper: 'butter', stickers: ['flower'], stamp: 'flower' },
      thinking: { name: 'Thinking of you', headline: 'Thinking of you', paper: 'cream', stickers: ['heart'], stamp: 'heart' },
      because: { name: 'Just because', headline: 'Just because', paper: 'dots', stickers: ['smile', 'sun'], stamp: 'sun' }
    },
    SLOTS: [{ l: '82%', t: '2%', r: -12 }, { l: '1%', t: '46%', r: 10 }, { l: '76%', t: '84%', r: -6 }, { l: '36%', t: '90%', r: 8 }, { l: '89%', t: '42%', r: 14 }, { l: '3%', t: '1%', r: -8 }],
    find: function (list, id) { for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i]; return list[0]; }
  };

  // A small header strip for postcards ("Greetings from …") and cards (the occasion's headline).
  D.headerHtml = function (kind, design, esc) {
    if (kind === 'postcard' && design.place) {
      return '<div style="margin: -24px -20px 28px -48px; padding: 14px 18px; border-radius: 6px; background: linear-gradient(#BFDCE0 0 55%, #F2A54A 55% 70%, #E07F55 70% 85%, #4E9A98 85%); font-family: Righteous, sans-serif; line-height: 1.1; color: #4A3426">' +
        '<div style="font: 700 12px \'Space Mono\', monospace; letter-spacing: .12em">GREETINGS FROM</div>' +
        '<div style="font-size: 34px; color: #FFF8EA; text-shadow: 2px 2px 0 #B5461A">' + esc(design.place) + '</div></div>';
    }
    if (kind === 'card' && design.occasion && D.OCCASIONS[design.occasion]) {
      return '<div style="margin: 0 0 24px; font-family: Righteous, sans-serif; font-size: 40px; line-height: 1.05; color: #B5461A; text-shadow: 3px 3px 0 rgba(240,185,58,.6)">' + esc(D.OCCASIONS[design.occasion].headline) + '</div>';
    }
    return '';
  };

  D.stickersHtml = function (ids) {
    return (ids || []).filter(function (id) { return D.STICKERS[id]; }).map(function (id, n) {
      var sl = D.SLOTS[n % D.SLOTS.length];
      return '<span class="stk" style="position: absolute; width: 58px; height: 58px; left: ' + sl.l + '; top: ' + sl.t + '; transform: rotate(' + sl.r + 'deg); pointer-events: none">' + svg(id, D.STICKERS[id].color, 58) + '</span>';
    }).join('');
  };

  // Paper, ink and handwriting for a letter element.
  D.applyPaper = function (el, design) {
    var font = D.find(D.FONTS, design.font);
    el.style.background = D.find(D.PAPERS, design.paper).bg;
    el.style.color = D.find(D.INKS, design.ink).color;
    el.style.fontFamily = font.css;
    el.style.fontSize = font.size;
  };

  window.SlowpostDesign = D;
})();

// Slowpost connection, shared by every page.
// No sign-up: the first visit quietly creates a guest login on this browser and a mailbox for it.
// window.Slowpost.ready() resolves to that mailbox once it exists.
(function () {
  var cfg = window.SLOWPOST_CONFIG || {};
  var configured = !!(cfg.supabaseUrl && cfg.supabaseAnonKey && cfg.supabaseUrl.indexOf('YOUR-') === -1);
  var sb = configured && window.supabase ? window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey) : null;
  var readyPromise = null;

  async function connect() {
    if (!sb) throw new Error('Slowpost is not connected to its database yet.');
    var s = (await sb.auth.getSession()).data.session;
    if (!s) {
      var r = await sb.auth.signInAnonymously();
      if (r.error) throw r.error;
    }
    var m = await sb.rpc('ensure_mailbox');
    if (m.error) throw m.error;
    return m.data;
  }

  var Slowpost = {
    sb: sb,
    configured: !!sb,
    ready: function () {
      if (!readyPromise) readyPromise = connect().catch(function (e) { readyPromise = null; throw e; });
      return readyPromise;
    },
    refreshMailbox: function () { readyPromise = null; return Slowpost.ready(); },
    mediaUrl: async function (path) {
      var r = await sb.storage.from('letter-media').createSignedUrl(path, 60 * 60);
      return r.error ? null : r.data.signedUrl;
    },
    esc: function (s) {
      return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
      });
    },
    // Remember the sender's name on this browser so they don't retype it.
    savedName: function (v) {
      try {
        if (v !== undefined) localStorage.setItem('slowpost:name', v);
        return localStorage.getItem('slowpost:name') || '';
      } catch (e) { return v || ''; }
    }
  };
  window.Slowpost = Slowpost;

  if (sb) Slowpost.ready().catch(function (e) { console.warn('Slowpost:', e.message); });
})();

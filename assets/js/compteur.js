/* AYNEHA - compteur anonyme de visiteurs (ligne en haut de la page).
   Concepteur et créateur : Mahamadou Issiaka MAIGA (MAIGUS)
   SPDX-License-Identifier: GPL-3.0-or-later
   Le navigateur garde un identifiant aléatoire (sans nom, sans adresse IP, sans cookie) et l'envoie
   toutes les 30 secondes à windila.org/compteur/visiteurs.php?site=ayneha. Sans réponse, rien ne s'affiche. */
(function () {
  var en = /^en/i.test(document.documentElement.getAttribute('lang') || ''), fails = 0, bar = null;
  var id = '';
  try { id = localStorage.getItem('ay_vid') || ''; } catch (e) {}
  if (!/^[a-z0-9]{8,32}$/.test(id)) {
    id = ''; for (var i = 0; i < 20; i++) id += Math.floor(Math.random() * 36).toString(36);
    try { localStorage.setItem('ay_vid', id); } catch (e) {}
  }
  function txt(a, n) {
    return en ? a + ' active visitor' + (a > 1 ? 's' : '') + ' out of ' + n + ' today'
              : a + ' visiteur' + (a > 1 ? 's' : '') + ' actif' + (a > 1 ? 's' : '') + ' sur ' + n + ' aujourd\'hui';
  }
  function show(d) {
    if (!bar) {
      bar = document.createElement('div'); bar.setAttribute('role', 'status');
      bar.style.cssText = 'background:#0A1E3F;color:#EAF0FB;font:13px/1.4 system-ui,"Segoe UI",sans-serif;text-align:center;padding:6px 12px';
      document.body.insertBefore(bar, document.body.firstChild);
    }
    bar.innerHTML = '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#F28C28;margin-right:7px;vertical-align:middle"></span>' + txt(d.actifs, d.total);
  }
  function ping() {
    if (fails >= 3 || document.hidden) return;
    fetch('https://windila.org/compteur/visiteurs.php?site=ayneha&id=' + id, { cache: 'no-store' })
      .then(function (r) { if (!r.ok) throw 0; return r.json(); })
      .then(function (d) { if (typeof d.actifs === 'number' && typeof d.total === 'number') { fails = 0; show(d); } else throw 0; })
      .catch(function () { fails++; });
  }
  ping(); setInterval(ping, 30000);
  document.addEventListener('visibilitychange', function () { if (!document.hidden) ping(); });
})();

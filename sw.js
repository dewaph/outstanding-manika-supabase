/* Service worker notifikasi push (taruh satu folder dengan file HTML aplikasi) */
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('push',e=>{
  let d={};try{d=e.data?e.data.json():{}}catch(x){d={title:'Notifikasi',body:e.data?e.data.text():''}}
  e.waitUntil(self.registration.showNotification(d.title||'Notifikasi',{
    body:d.body||'',tag:d.tag||undefined,renotify:!!d.tag,data:{url:self.registration.scope}
  }));
});
self.addEventListener('notificationclick',e=>{
  e.notification.close();
  const u=(e.notification.data&&e.notification.data.url)||'./';
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{
    for(const c of l){if('focus' in c)return c.focus()}
    return self.clients.openWindow(u);
  }));
});

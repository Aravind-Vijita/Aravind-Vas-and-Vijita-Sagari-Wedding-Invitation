/* Aravind & Vijita wedding — Vue 3, no network dependencies. */
(() => {
 'use strict';
 const {createApp} = Vue;
 const target = new Date('2026-11-26T20:33:00+05:30').getTime();
 const details = [
  {id:'wedding',short:'The Wedding',title:'Wedding Ceremony',day:'26',month:'November',weekday:'Thursday',year:'2026',time:'8:33 PM',venue:'C M Convention Hall',city:'Tanuku',img:'./assets/wedding-hall.webp',map:'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent('C M Convention Hall Tanuku Andhra Pradesh'),stamp:'20261126T203300'},
  {id:'reception',short:'The Reception',title:'Wedding Reception',day:'28',month:'November',weekday:'Saturday',year:'2026',time:'11:30 AM',venue:'Subhamasthu Function Hall',city:'Inkollu',img:'./assets/reception-hall.webp',map:'https://www.google.com/maps/search/?api=1&query=Subhamasthu%20function%20hall%2C%20SH%20354%2C%20Inkollu%2C%20Andhra%20Pradesh%20523167&query_place_id=ChIJoWdnhrldSjoRYqh2h9pupPA',stamp:'20261128T113000'}
 ];
 const imgs = [
  {image:'./assets/glimpse-01-riverside.webp',full:'./assets/glimpse-01-riverside-full.webp',alt:"Aravind and Vijita by the waterfront beneath the bridge",crop:'50% 50%'},
  {image:'./assets/glimpse-02-walking.webp',full:'./assets/glimpse-02-walking-full.webp',alt:"Aravind and Vijita walking hand in hand in the city",crop:'50% 50%'},
  {image:'./assets/glimpse-03-standing.webp',full:'./assets/glimpse-03-standing-full.webp',alt:"Aravind and Vijita standing together beneath the bridge",crop:'50% 50%'},
  {image:'./assets/glimpse-04-steps.webp',full:'./assets/glimpse-04-steps-full.webp',alt:"Aravind and Vijita smiling together on the stone steps",crop:'50% 50%'},
  {image:'./assets/glimpse-05-entrance.webp',full:'./assets/glimpse-05-entrance-full.webp',alt:"Aravind and Vijita posing together outside an elegant entrance",crop:'50% 50%'}
 ];
  // YouTube hosts the video; this Cloudflare Pages site embeds the player.
  // The owner sets the original stream's Share URL in live-config.js.
  const configuredLiveLink=String(window.WEDDING_LIVE_URL || '').trim();
  function parseYouTubeId(raw){
    if(/^[a-zA-Z0-9_-]{11}$/.test(raw))return raw;
    try{
      const u=new URL(raw);
      if(u.protocol!=='https:')return '';
      const host=u.hostname.toLowerCase();
      let id='';
      if(host==='youtu.be'||host==='www.youtu.be')id=u.pathname.split('/').filter(Boolean)[0]||'';
      else if(['youtube.com','www.youtube.com','m.youtube.com','www.youtube-nocookie.com','youtube-nocookie.com'].includes(host)){
        const path=u.pathname.split('/').filter(Boolean);
        if(path[0]==='watch')id=u.searchParams.get('v')||'';
        else if(['live','embed','shorts'].includes(path[0]))id=path[1]||'';
      }
      return /^[a-zA-Z0-9_-]{11}$/.test(id)?id:'';
    }catch(_){return ''}
  }
  const liveVideoId=parseYouTubeId(configuredLiveLink);
  const liveWatchUrl=liveVideoId?configuredLiveLink:'';
  // Use the exact Share > Embed player URL supplied by the stream owner.
  // YouTube's si token is preserved; HTTP Referer is sent via the iframe policy.
  // The Cloudflare Pages response also sets strict-origin-when-cross-origin.
  const liveEmbedUrl=liveVideoId?'https://www.youtube.com/embed/'+liveVideoId+'?si=RrZ0RaAnFThISiH0&playsinline=1&controls=1&fs=1':'';

 const nav=[
  {target:'home',label:'Home',icon:'home'},
  {target:'couple',label:'Bride & Groom',icon:'people'},
  {target:'events',label:'Wedding & Reception',icon:'calendar'},
  {target:'live',label:'Wedding Live',icon:'video'},
  {target:'venue',label:'Venue',icon:'pin'},
  {target:'gallery',label:'Glimpse',icon:'photo'},
  {target:'invitation',label:'Invitation',icon:'letter'}
 ];
 const shareText='With our families’ blessings, we joyfully invite you to celebrate the wedding of Aravind Vas & Vijita Sagari!\n\nWedding: Thursday, 26 November 2026, 8:33 PM IST\nC M Convention Hall, Tanuku\n\nReception: Saturday, 28 November 2026, 11:30 AM IST\nSubhamasthu Function Hall, Inkollu\n\nYour presence and blessings mean the world to us.';
 const glyphs={
  home:'<path d="m3 10 9-7 9 7M5 9v12h14V9M9 21v-8h6v8"/>',
  people:'<circle cx="8" cy="7" r="3"/><circle cx="17.3" cy="8.1" r="2.5"/><path d="M2 21v-3c0-3.3 2.6-5.4 6-5.4s6 2.1 6 5.4v3H2Zm13-7.1c3.8-.7 7 1.3 7 4.4V21h-6"/>',
  calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18M8 14h2m3 0h2m-7 4h2m3 0h2"/>',
  pin:'<path d="M20 10c0 5-8 11-8 11s-8-6-8-11a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
  photo:'<rect x="2.5" y="3.5" width="19" height="17" rx="2"/><circle cx="8" cy="9" r="1.5"/><path d="m3 17 6-5 4 4 3-3 5 5"/>',
  letter:'<rect x="2" y="5" width="20" height="14" rx="2"/><path d="m3 7 9 7 9-7"/>',
  video:'<rect x="2" y="4" width="20" height="16" rx="3"/><path d="m10 8 6 4-6 4V8Z"/>',
  play:'<path d="m8 5 11 7-11 7V5Z"/>',
  expand:'<path d="M8 3H3v5M16 3h5v5M8 21H3v-5m13 5h5v-5"/>',
  right:'<path d="M4 12h16m-6-6 6 6-6 6"/>',
  download:'<path d="M12 3v12m-5-5 5 5 5-5M5 17v3h14v-3"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>',
  close:'<path d="M5 5l14 14m0-14L5 19"/>',
  bars:'<path d="M3 6h18M3 12h18M3 18h18"/>',
  left:'<path d="m14 5-7 7 7 7"/>',
  chevron:'<path d="m10 5 7 7-7 7"/>',
  camera:'<path d="M4 7h4l1-2h6l1 2h4v13H4z"/><circle cx="12" cy="13" r="3.5"/>',
  heart:'<path d="M20.5 5.5a5.5 5.5 0 0 0-7.8 0L12 6.2l-.7-.7a5.5 5.5 0 0 0-7.8 7.8L12 21l8.5-7.7a5.5 5.5 0 0 0 0-7.8Z"/>',
  share:'<circle cx="18" cy="5" r="2.5"/><circle cx="5" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m7.2 10.8 8.6-4.6M7.2 13.2l8.6 4.6"/>',
  copy:'<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>'
 };
 const Ico={props:['name','size'],computed:{shape(){return glyphs[this.name]||glyphs.heart}},template:'<svg :width="size || 20" :height="size || 20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" v-html="shape"></svg>'};
 const now=()=>{let n=Math.max(0,target-Date.now());return {days:Math.floor(n/86400000),hours:Math.floor(n%86400000/3600000),minutes:Math.floor(n%3600000/60000),seconds:Math.floor(n%60000/1000),done:n===0}};
 const app=createApp({
  components:{Ico},
  data(){return {nav,events:details,gallery:imgs,galleryIndex:0,selectedImage:0,menuOpen:false,modalOpen:false,galleryModal:false,liveReady:Boolean(liveVideoId),liveUrl:liveWatchUrl,liveEmbedUrl,liveActive:false,counter:now(),toast:'',progress:0,navSelected:'home',timer:null,noticeTimer:null,observer:null,previousFocus:null}},
  computed:{
   countdown(){return [{label:'Days',value:this.counter.days},{label:'Hours',value:String(this.counter.hours).padStart(2,'0')},{label:'Minutes',value:String(this.counter.minutes).padStart(2,'0')},{label:'Seconds',value:String(this.counter.seconds).padStart(2,'0')}]},
   visibleGallery(){return Array.from({length:3},(_,n)=>this.gallery[(this.galleryIndex+n)%this.gallery.length])},
   isPublic(){return location.protocol==='https:' && !/(localhost|127\.0\.0\.1)/.test(location.hostname)},
   publicUrl(){return this.isPublic ? location.href.split('#')[0] : ''},
   cardSrc(){return window.__INVITE_DATA || './assets/original-invitation.png'},
   whatsappUrl(){return 'https://wa.me/?text='+encodeURIComponent(shareText+(this.publicUrl?'\n\nWebsite: '+this.publicUrl:''))},
   canFullscreenIframe(){
     const element=document.documentElement;
     const supported=Boolean(document.fullscreenEnabled || document.webkitFullscreenEnabled);
     return supported && Boolean(element.requestFullscreen || element.webkitRequestFullscreen);
   }
  },
  mounted(){
   this.timer=setInterval(()=>{this.counter=now()},1000);
   window.addEventListener('scroll',this.handleScroll,{passive:true});window.addEventListener('keydown',this.handleKey);
   this.handleScroll();

   // Intelligent image loading: prioritize hero; warm portraits after it loads.
   // Full-size gallery and invitation images are fetched only when opened.
   const warmImg=(src)=>{if(!src)return;const im=new Image();im.decoding='async';im.src=src;};
   const network=navigator.connection||navigator.mozConnection||navigator.webkitConnection;
   const constrained=Boolean(network?.saveData||/^(slow-2g|2g)$/.test(network?.effectiveType||''));
   const warmPortraits=()=>{if(constrained)return;['./assets/groom-royal.webp','./assets/bride-royal-single-bindi.webp'].forEach(warmImg);};
   const hero=document.querySelector('.hero-figure img');
   if(hero){if(hero.complete){if('requestIdleCallback' in window)requestIdleCallback(warmPortraits,{timeout:1900});else setTimeout(warmPortraits,450)}else hero.addEventListener('load',()=>{if('requestIdleCallback' in window)requestIdleCallback(warmPortraits,{timeout:1900});else setTimeout(warmPortraits,450)},{once:true});}
   if('IntersectionObserver' in window){
     this.preloadObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(!entry.isIntersecting)return;
       const section=entry.target;
       section.querySelectorAll('img[loading="lazy"]').forEach(img=>{img.loading='eager';});
       this.preloadObserver.unobserve(section);
     })},{rootMargin:'450px 0px',threshold:0});
     ['couple','venue','gallery','invitation'].forEach(id=>{const section=document.getElementById(id);if(section)this.preloadObserver.observe(section)});
   }
   if('IntersectionObserver' in window){
    this.observer=new IntersectionObserver(entries=>entries.forEach(en=>{if(en.isIntersecting){en.target.classList.add('appeared');this.observer.unobserve(en.target)}}),{threshold:.08,rootMargin:'0px 0px -30px 0px'});
    document.querySelectorAll('.reveal').forEach(e=>this.observer.observe(e));
   }
  },
  beforeUnmount(){clearInterval(this.timer);clearTimeout(this.noticeTimer);window.removeEventListener('scroll',this.handleScroll);window.removeEventListener('keydown',this.handleKey);this.observer?.disconnect();this.preloadObserver?.disconnect();document.body.style.overflow=''},
  methods:{
   handleScroll(){let m=Math.max(1,document.documentElement.scrollHeight-innerHeight);this.progress=Math.round(scrollY/m*100);let ids=['invitation','gallery','venue','live','events','couple','home'];this.navSelected=ids.find(id=>{let e=document.getElementById(id);return e && e.getBoundingClientRect().top<Math.min(innerHeight*.45,250)})||'home'},
   handleKey(e){if(e.key==='Escape'){this.closeModal();this.galleryModal=false;this.menuOpen=false}if(this.galleryModal&&e.key==='ArrowRight')this.nextGallery();if(this.galleryModal&&e.key==='ArrowLeft')this.prevGallery();if(e.key==='Tab'&&this.modalOpen){let nodes=Array.from(document.querySelectorAll('.invitation-modal button'));if(!nodes.length)return;if(e.shiftKey&&document.activeElement===nodes[0]){e.preventDefault();nodes[nodes.length-1].focus()}else if(!e.shiftKey&&document.activeElement===nodes[nodes.length-1]){e.preventDefault();nodes[0].focus()}}},
   navClick(id){this.menuOpen=false;this.navSelected=id},
    playLive(){if(!this.liveReady)return;this.liveActive=true;},
    expandLive(){
      // Give the iframe the full screen so YouTube's actual settings, timeline,
      // and other native controls remain unobstructed. Use the enclosing frame
      // only if the browser rejects fullscreen on the embedded iframe.
      const player=this.$refs.livePlayer;
      const frame=player?.closest('.live-player-frame');
      if(!player || !this.canFullscreenIframe){
        return;
      }
      const request=(element)=>{
        if(!element)return Promise.reject(new Error('Fullscreen not supported'));
        const fn=element.requestFullscreen || element.webkitRequestFullscreen;
        if(!fn)return Promise.reject(new Error('Fullscreen not supported'));
        try{return Promise.resolve(fn.call(element));}
        catch(error){return Promise.reject(error);}
      };
      request(player).catch(()=>request(frame)).catch(()=>{
        // If fullscreen is unsupported, keep the embedded player usable.
      });
    },
   openModal(){this.previousFocus=document.activeElement;this.modalOpen=true;this.menuOpen=false;document.body.style.overflow='hidden';this.$nextTick(()=>document.querySelector('.modal-close')?.focus())},
   closeModal(){if(!this.modalOpen)return;this.modalOpen=false;document.body.style.overflow='';this.$nextTick(()=>this.previousFocus?.focus?.())},
   openGallery(i){this.selectedImage=i;this.galleryModal=true},
   prevGallery(){this.galleryIndex=(this.galleryIndex+this.gallery.length-1)%this.gallery.length;this.selectedImage=this.galleryIndex},
   nextGallery(){this.galleryIndex=(this.galleryIndex+1)%this.gallery.length;this.selectedImage=this.galleryIndex},
   notice(msg){clearTimeout(this.noticeTimer);this.toast=msg;this.noticeTimer=setTimeout(()=>this.toast='',3200)},
   downloadCard(){const a=document.createElement('a');a.href=this.cardSrc;a.download='Aravind-Vijita-Wedding-Invitation.png';document.body.appendChild(a);a.click();a.remove();this.notice('Invitation download started')},
   calendar(event){const esc=x=>String(x).replace(/\\/g,'\\\\').replace(/\n/g,'\\n').replace(/,/g,'\\,').replace(/;/g,'\\;');const stamp=new Date().toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'');let content=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//AravindVijita//Wedding//EN','BEGIN:VEVENT','UID:aravind-vijita-'+event.id+'@wedding.local','DTSTAMP:'+stamp,'DTSTART;TZID=Asia/Kolkata:'+event.stamp,'DURATION:PT1H','SUMMARY:'+esc(event.title+' — Aravind Vas & Vijita Sagari'),'LOCATION:'+esc(event.venue+', '+event.city+', Andhra Pradesh'),'DESCRIPTION:'+esc('Please join us to celebrate with our families.'),'END:VEVENT','END:VCALENDAR'].join('\r\n');let url=URL.createObjectURL(new Blob([content],{type:'text/calendar;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download='aravind-vijita-'+event.id+'.ics';a.click();setTimeout(()=>URL.revokeObjectURL(url),2000);this.notice('Calendar event downloaded')},
   async copyDetails(){let msg=shareText+(this.publicUrl?'\n\n'+this.publicUrl:'');try{await navigator.clipboard.writeText(msg);this.notice('Invitation details copied')}catch(e){const t=document.createElement('textarea');t.value=msg;t.style.cssText='position:fixed;opacity:0';document.body.appendChild(t);t.select();try{document.execCommand('copy');this.notice('Invitation details copied')}catch(e){this.notice('Copy not supported in this browser')}t.remove()}},
   async writeClipboard(value){
     if(navigator.clipboard?.writeText){try{await navigator.clipboard.writeText(value);return true}catch(e){}}
     const textArea=document.createElement('textarea');textArea.value=value;textArea.setAttribute('readonly','');textArea.style.cssText='position:fixed;top:-9999px;left:-9999px';document.body.appendChild(textArea);textArea.select();
     let success=false;try{success=document.execCommand('copy')}catch(e){}textArea.remove();return success;
   },
   async copyLink(){
     if(this.publicUrl){let success=await this.writeClipboard(this.publicUrl);this.notice(success?'Wedding website link copied':'Please copy the link from your browser address bar');}
     else{let success=await this.writeClipboard(shareText);this.notice(success?'Invitation details copied · Publish the site to copy a website link':'Publish the website to get a shareable link');}
   },
   async shareOtherApps(){
     if(navigator.share){try{const data={title:'Aravind Vas and Vijita Sagari Wedding Invitation',text:shareText};if(this.publicUrl)data.url=this.publicUrl;await navigator.share(data);return}catch(e){if(e.name==='AbortError')return}}
     const success=await this.writeClipboard(shareText+(this.publicUrl?'\n\n'+this.publicUrl:''));
     this.notice(success?'Invitation details copied · Paste into your preferred app':'Use WhatsApp or copy the website link after publishing');
   },
   async share(){return this.shareOtherApps()}
  },
  template:`
   <div class="scroll-progress" :style="{width:progress+'%'}" aria-hidden="true"></div>
   <header class="site-header">
     <div class="nav-frame">
       <a href="#home" class="brand" @click="navClick('home')" aria-label="Aravind and Vijita home"><img class="brand-emblem" src="./assets/av-monogram.svg" width="396" height="246" alt="" aria-hidden="true" decoding="async"/></a>
       <nav class="desktop-nav" aria-label="Main navigation"><a v-for="item in nav" :key="item.target" :class="{'active':navSelected===item.target}" :href="'#'+item.target" @click="navClick(item.target)"><Ico :name="item.icon" :size="24"/><span>{{item.label}}</span></a></nav>
       <button class="menu-btn" type="button" @click="menuOpen=!menuOpen" :aria-expanded="menuOpen" aria-controls="mobile-menu" :aria-label="menuOpen?'Close menu':'Open menu'"><Ico :name="menuOpen?'close':'bars'" :size="26"/></button>
     </div>
     <nav v-if="menuOpen" class="mobile-menu" id="mobile-menu" aria-label="Mobile navigation"><a v-for="item in nav" :key="item.target" :href="'#'+item.target" @click="navClick(item.target)"><Ico :name="item.icon" :size="19"/>{{item.label}}</a></nav>
   </header>
   <nav class="phone-quick-tabs" aria-label="Quick access to wedding sections">
     <a v-for="item in nav" :key="'quick-'+item.target" :href="'#'+item.target" :class="{'is-active':navSelected===item.target}" @click="navClick(item.target)"><Ico :name="item.icon" :size="21"/><span>{{({home:'Home',couple:'Couple',events:'Events',venue:'Venue',gallery:'Glimpse',invitation:'Invite',live:'Live'})[item.target] || item.label}}</span></a>
   </nav>
   <main>
     <section id="home" class="hero-section">
       <div class="hero-stage">
         <div class="hero-figure"><picture><source media="(max-width:700px)" srcset="./assets/royal-couple-mobile-wide-single-bindi.webp"/><img src="./assets/royal-couple-home-single-bindi.webp" alt="Aravind Vas and Vijita Sagari in royal traditional wedding attire" width="1254" height="1254" loading="eager" fetchpriority="high" decoding="async"/></picture></div>
         <div class="hero-wording"><div class="hero-floral-top" aria-hidden="true"></div>
            <img class="hero-ganesha" src="./assets/ganesha-maroon.webp" alt="" aria-hidden="true" width="300" height="327"/>
            <p class="family-name">VEERAGANDHAM’s</p><p class="wedding-word">WEDDING INVITATION</p>
            <div class="gold-divider" aria-hidden="true"><span>❀</span></div>
            <p class="hero-invite">Together with our families, we joyfully invite you to share in our happiness as we unite to celebrate our new beginnings.</p>
            <h1 class="hero-script-names" aria-label="Aravind Vas and Vijita Sagari"><span class="hero-script-person">Aravind Vas</span><i aria-hidden="true">&</i><span class="hero-script-person">Vijita Sagari</span></h1><div class="gold-swish" aria-hidden="true"><span>༺</span><span>❀</span><span>༻</span></div>
            
         </div>
         <div class="hero-artwork hero-artwork-right" aria-hidden="true"></div>
         <div class="hero-ivory-vine" aria-hidden="true"></div>
         <div class="hero-lotus-bouquet" aria-hidden="true"></div>
         <div class="falling-petals" aria-hidden="true"><span v-for="i in 12" :key="i" :class="'floating-petal floating-petal-'+i"></span></div>
       </div>
       <div class="countdown-frame"><div class="countdown-scrolled">
          <div class="countdown-fresh-flowers countdown-fresh-flowers-left" aria-hidden="true"></div>
          <div class="countdown-fresh-flowers countdown-fresh-flowers-right" aria-hidden="true"></div>
          <p class="countdown-heading">The Wedding Begins In</p>
          <template v-if="!counter.done"><div class="counter-row" role="timer" aria-label="Time remaining until the wedding"><div v-for="part in countdown" :key="part.label" class="countbox"><strong>{{part.value}}</strong><span>{{part.label}}</span></div></div></template>
          <div v-else class="countdown-finished">A beautiful beginning ♡</div>
       </div></div>
       <div class="gold-border-band" aria-hidden="true"></div>
     </section>

     <div class="royal-body">
       <section id="couple" class="section couple-section couple-reimagined" aria-labelledby="couple-title">
         <div class="container couple-editorial">
           <div class="couple-intro reveal">
             <span class="couple-kicker">Two hearts · One beautiful beginning</span>
             <h2 id="couple-title">Bride <em>&amp;</em> Groom</h2>
             <div class="couple-underliner" aria-hidden="true"><span></span><img src="./assets/lotus-mark.svg" alt="" width="34" height="30"><span></span></div>
           </div>
           <div class="couple-profile-grid">
             <article class="royal-profile royal-profile-groom reveal">
               <div class="royal-profile-top" aria-hidden="true"><span class="royal-profile-arch"></span></div>
               <div class="royal-profile-image"><img src="./assets/groom-royal.webp" alt="Royal traditional portrait of Aravind Vas" width="220" height="220" loading="lazy" decoding="async"/></div>
               <div class="royal-profile-content">
                 <span class="royal-role">THE GROOM</span>
                 <h3>Aravind Vas</h3>
                 <div class="royal-hairline" aria-hidden="true"></div>
                 <span class="royal-kinship">Son of</span>
                 <p>Sri Veeragandham Srinivas<br><span>&amp; Smt. Nagarajakumari</span></p>
               </div>
             </article>
             <div class="royal-connector" aria-hidden="true"><span>&amp;</span></div>
             <article class="royal-profile royal-profile-bride reveal">
               <div class="royal-profile-top" aria-hidden="true"><span class="royal-profile-arch"></span></div>
               <div class="royal-profile-image"><img src="./assets/bride-royal-single-bindi.webp" alt="Royal traditional portrait of Vijita Sagari" width="220" height="220" loading="lazy" decoding="async"/></div>
               <div class="royal-profile-content">
                 <span class="royal-role">THE BRIDE</span>
                 <h3>Vijita Sagari</h3>
                 <div class="royal-hairline" aria-hidden="true"></div>
                 <span class="royal-kinship">Daughter of</span>
                 <p>Sri Bobba Somanadh Chowdary<br><span>&amp; Smt. Radha</span></p>
               </div>
             </article>
           </div>
           <div class="couple-closer" aria-hidden="true"><span></span><span class="couple-closer-heart">♡</span><span></span></div>
         </div>
       </section>

       <section id="events" class="section events-section">
         <div class="container"><div class="section-title reveal"><span>Auspicious celebrations</span><h2>Wedding <em>&</em> Reception</h2><div class="gold-divider"><span>❀</span></div></div>
           <div class="event-grid"><article v-for="event in events" :key="event.id" class="event-card reveal"><i class="card-corner tl"></i><i class="card-corner tr"></i><i class="card-corner bl"></i><i class="card-corner br"></i>
             <div class="event-pill">{{event.short}}</div><div class="event-month">{{event.weekday}}</div><p class="event-date"><strong>{{event.day}}</strong><span>{{event.month}} {{event.year}}</span></p>
             <div class="event-clock"><Ico name="clock" :size="18"/>{{event.time}} IST</div>
             <div class="event-rule"></div><p class="event-venue-kicker">VENUE</p><h3>{{event.venue}}</h3><p class="event-location">{{event.city}}, Andhra Pradesh</p>
             <button type="button" class="event-calendar" @click="calendar(event)"><Ico name="calendar" :size="17"/> Add to calendar</button>
           </article></div>

         </div>
       </section>

        <section id="live" class="section wedding-live-section" aria-labelledby="wedding-live-title">
          <div class="container wedding-live-container">
            <div class="section-title reveal">
              <span>Witness the celebration from wherever you are</span>
              <h2 id="wedding-live-title">Wedding <em>Live</em></h2>
              <div class="gold-divider"><span>❀</span></div>
            </div>
            <p class="wedding-live-intro">Celebrate with Aravind &amp; Vijita, even from miles away.</p>
            <div class="live-player-frame" aria-label="Wedding livestream video area">
              <iframe v-if="liveActive &amp;&amp; liveReady" ref="livePlayer" class="live-embedded-player"
                :src="liveEmbedUrl" title="Aravind and Vijita wedding livestream"
                loading="eager" referrerpolicy="strict-origin-when-cross-origin"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                allowfullscreen webkitallowfullscreen></iframe>
              <div v-else class="live-player-cover">
                <span class="live-symbol"><Ico name="video" :size="42"/></span>
                <div class="live-cover-top">26 November 2026 · 8:33 PM IST</div>
                <h3>Aravind <em>&amp;</em> Vijita</h3>
                
                <p v-if="!liveReady">The livestream will be available here once the wedding broadcast link is connected.</p>
                <button v-if="liveReady" type="button" class="live-play-button" @click="playLive"><Ico name="play" :size="22"/> Watch wedding live</button>
                <span v-else class="live-soon-label">Wedding livestream · Coming soon</span>
              </div>
            </div>
            <div v-if="liveReady" class="live-actions">
              <button v-if="canFullscreenIframe &amp;&amp; liveActive" type="button" class="live-expand-button" @click="expandLive" aria-label="Enter fullscreen wedding livestream"><Ico name="expand" :size="20"/> Full-screen player</button>
              <a v-if="!canFullscreenIframe" class="live-expand-button" :href="liveUrl" target="_blank" rel="noopener noreferrer"><Ico name="expand" :size="20"/> Fullscreen on YouTube</a>
              <a class="live-youtube-button" :href="liveUrl" target="_blank" rel="noopener noreferrer"><Ico name="video" :size="19"/> Watch on YouTube <Ico name="right" :size="17"/></a>
            </div>
          </div>
        </section>

       <section id="venue" class="section venue-section">
         <div class="container"><div class="section-title reveal"><span>With love, we await your presence</span><h2>Our <em>Venues</em></h2><div class="gold-divider"><span>❀</span></div></div>
           <div class="venue-grid"><article v-for="event in events" :key="event.id" class="venue-card reveal"><span class="venue-type">{{event.short}} Venue</span><div class="venue-layout"><div class="venue-description"><div class="venue-pin"><Ico name="pin" :size="26"/></div><h3>{{event.venue}},<br>{{event.city}}</h3><div class="venue-ornament">──── ❀ ────</div><span class="venue-when">{{event.day}} {{event.month}} · {{event.time}} IST</span></div><div class="venue-photo"><img :src="event.img" :alt="'AI illustrative rendering representing '+event.venue+' (not an actual venue photograph)'" width="1280" height="720" loading="lazy" decoding="async"/></div></div><a :href="event.map" target="_blank" rel="noopener noreferrer" class="map-button"><Ico name="pin" :size="18"/> View on Google Maps <Ico name="right" :size="17"/></a></article></div>
         </div>
       </section>

       <section id="gallery" class="section glimpse-section"><div class="container"><div class="glimpse-card reveal"><i class="card-corner tl"></i><i class="card-corner tr"></i><i class="card-corner bl"></i><i class="card-corner br"></i>
         <h2 class="glimpse-script"><Ico name="camera" :size="34"/><img src="./assets/gallery-heading.webp" width="1680" height="150" alt="" aria-hidden="true" loading="lazy"/><span class="sr-only">Glimpse of Our Togetherness</span></h2>
         <div class="glimpse-row"><button type="button" class="slide-arrow" @click="prevGallery" aria-label="Previous gallery images"><Ico name="left" :size="28"/></button>
           <div class="glimpse-images"><button v-for="(image,i) in visibleGallery" :key="galleryIndex+'-'+i" class="glimpse-image" @click="openGallery((galleryIndex+i)%gallery.length)" type="button" :aria-label="'Enlarge '+image.alt"><img :src="image.image" :alt="image.alt" :style="{objectPosition:image.crop}" width="660" height="380" loading="lazy" decoding="async"/></button></div>
           <button type="button" class="slide-arrow" @click="nextGallery" aria-label="Next gallery images"><Ico name="chevron" :size="28"/></button>
         </div><div class="gallery-dots"><button v-for="(entry,i) in gallery" :key="entry.image" type="button" :class="{on:galleryIndex===i}" :aria-label="'Show gallery position '+(i+1)" :aria-pressed="galleryIndex===i" @click="galleryIndex=i"></button></div>
         
       </div></div></section>

       <section id="invitation" class="section invitation-section"><div class="container invitation-grid">
          <div class="invite-copy reveal"><div class="eyebrow">FROM OUR HEARTS TO YOURS</div><h2>A personal<br><em>invitation</em></h2><div class="invite-lotus" aria-hidden="true"><span></span>❀<span></span></div>
             <p>Every unforgettable celebration begins with an invitation. Here is ours, lovingly shared with you and your family.</p>
             <div class="heart-note"><Ico name="heart" :size="26"/><span>We can't wait to celebrate this beautiful moment with you.</span></div>
             <div class="invite-buttons"><button type="button" @click="openModal" class="cta-wine">VIEW FULL INVITATION <Ico name="right" :size="20"/></button><button type="button" @click="downloadCard" class="cta-download"><Ico name="download" :size="20"/> DOWNLOAD CARD</button></div>
          </div>
          <button class="invitation-photo reveal" type="button" @click="openModal" aria-label="View the complete original invitation card"><img src="./assets/invitation-preview.webp" alt="Original royal maroon and ivory wedding invitation image supplied by the family" width="1060" height="1484" loading="lazy" decoding="async"/><span>Tap to view full card</span></button>
       </div></section>

       <section class="closing-section closing-message-only" aria-labelledby="closing-title">
         <div class="closing-flower-corner closing-flower-corner-left" aria-hidden="true"></div>
         <div class="closing-flower-corner closing-flower-corner-right" aria-hidden="true"></div>
         <div class="container closing-inner">
           <img class="closing-ganesha" src="./assets/ganesha-gold.png" width="208" height="287" alt="" aria-hidden="true" loading="lazy"/>
           <h2 id="closing-title">With love, we welcome you.</h2>
           <p>Your presence and blessings will make our celebrations even more special.</p>
         </div>
       </section>
     </div>
   </main>
   <footer class="site-footer"><img class="footer-logo" src="./assets/av-monogram.svg" alt="A heart V gold monogram" width="396" height="246" loading="lazy"/><p>Aravind Vas <em>&</em> Vijita Sagari</p><a href="#home" @click="navClick('home')">Back to top ↑</a></footer>
   <div v-if="toast" class="toast" role="status">{{toast}}</div>
   <div v-if="modalOpen" class="overlay" role="presentation" @click.self="closeModal"><div class="invitation-modal" role="dialog" aria-modal="true" aria-label="Full wedding invitation"><div class="modal-bar"><span>Our personal invitation</span><div><button type="button" @click="downloadCard" aria-label="Download invitation"><Ico name="download" :size="23"/></button><button class="modal-close" type="button" @click="closeModal" aria-label="Close invitation"><Ico name="close" :size="25"/></button></div></div><img :src="cardSrc" alt="Full wedding invitation, including the couple's names and wedding and reception details" width="1060" height="1484"/></div></div>
   <div v-if="galleryModal" class="overlay" role="presentation" @click.self="galleryModal=false"><div class="gallery-modal" role="dialog" aria-modal="true" aria-label="Glimpse of our togetherness photos"><button type="button" class="gallery-close" @click="galleryModal=false" aria-label="Close artwork"><Ico name="close" :size="24"/></button><img :src="gallery[selectedImage].full || gallery[selectedImage].image" :alt="gallery[selectedImage].alt"/><div><button @click="selectedImage=(selectedImage+gallery.length-1)%gallery.length">← Previous</button><button @click="selectedImage=(selectedImage+1)%gallery.length">Next →</button></div></div></div>
  `
 });
 app.mount('#app');
})();

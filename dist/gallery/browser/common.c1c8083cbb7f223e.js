"use strict";(self.webpackChunkgallery=self.webpackChunkgallery||[]).push([[592],{4355:(g,_,e)=>{e.d(_,{r:()=>s});class s{constructor(a,l,r,h,t,i,n,o,p,c,d,v,m,E,P){this._id=a,this.titulo=l,this.subtitulo=r,this.image0url=h,this.image1url=t,this.image2url=i,this.image3url=n,this.image4url=o,this.image5url=p,this.descripcion=c,this.dimension=d,this.characteristics=v,this.link=m,this.link2=E,this.date=P}}},5262:(g,_,e)=>{e.d(_,{V:()=>h});var s=e(9646),u=e(262),a=e(4893),l=e(1695),r=e(8591);let h=(()=>{class t{constructor(n,o){this.paintingService=o}resolve(n,o){return this.paintingService.getPainting(n.params.id).pipe((0,u.K)(c=>(0,s.of)("No data found")))}}return t.\u0275fac=function(n){return new(n||t)(a.LFG(l.gz),a.LFG(r.Q))},t.\u0275prov=a.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},8279:(g,_,e)=>{e.d(_,{W:()=>h});var s=e(9646),u=e(262),a=e(4893),l=e(1695),r=e(8591);let h=(()=>{class t{constructor(n,o){this.activatedRoute=n,this.paintingService=o}resolve(n,o){return this.paintingService.getPaintings().pipe((0,u.K)(p=>(0,s.of)("No data found")))}}return t.\u0275fac=function(n){return new(n||t)(a.LFG(l.gz),a.LFG(r.Q))},t.\u0275prov=a.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},3312:(g,_,e)=>{e.d(_,{d:()=>l});var s=e(520),u=e(3913),a=e(4893);let l=(()=>{class r{constructor(t){this._http=t,this.url=u.x.url}getTokens(){return this._http.get(this.url+"tokens")}getToken(t){return this._http.get(this.url+"token/"+t)}saveToken(t){let i=JSON.stringify(t),n=(new s.WM).set("Content-Type","application/json");return this._http.post(this.url+"savetoken",i,{headers:n})}updateToken(t,i){let n=JSON.stringify(i),o=(new s.WM).set("Content-Type","application/json");return this._http.put(this.url+"token/"+t,n,{headers:o})}getInstagram(t){return this._http.get(`https://graph.instagram.com/v1.0/17841403549294920/media?access_token=${t}&pretty=1&fields=caption%2Cmedia_url%2Cmedia_type%2Cpermalink%2Ctimestamp%2Cusername&limit=6`)}getInstagramNext(t,i){return this._http.get(`https://graph.instagram.com/v1.0/17841403549294920/media?access_token=${t}&pretty=1&fields=caption%2Cmedia_url%2Cmedia_type%2Cpermalink%2Ctimestamp%2Cusername&limit=20&after=${i}`)}}return r.\u0275fac=function(t){return new(t||r)(a.LFG(s.eN))},r.\u0275prov=a.Yz7({token:r,factory:r.\u0275fac}),r})()},8591:(g,_,e)=>{e.d(_,{Q:()=>l});var s=e(520),u=e(3913),a=e(4893);let l=(()=>{class r{constructor(t){this._http=t,this.url=u.x.url}getPaintings(){return this._http.get(this.url+"paintings/?page=1&limit=100")}getPaintingsPagination(t){return this._http.get(`${this.url}paintings/?page=${t}&limit=6`)}getPainting(t){return this._http.get(this.url+"painting/"+t)}create(t){let i=JSON.stringify(t),n=(new s.WM).set("Content-Type","application/json");return this._http.post(this.url+"save",i,{headers:n})}update(t,i){let n=JSON.stringify(i),o=(new s.WM).set("Content-Type","application/json");return this._http.put(this.url+"painting/"+t,n,{headers:o})}delete(t){let i=(new s.WM).set("Content-Type","application/json");return this._http.delete(this.url+"painting/"+t,{headers:i})}deleteImg(t,i){let n=JSON.stringify(t),o=(new s.WM).set("Content-Type","application/json");return this._http.post(this.url+"deleteimg",{params:n,index:i},{headers:o})}}return r.\u0275fac=function(t){return new(t||r)(a.LFG(s.eN))},r.\u0275prov=a.Yz7({token:r,factory:r.\u0275fac}),r})()}}]);
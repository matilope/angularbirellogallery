"use strict";(self.webpackChunkgallery=self.webpackChunkgallery||[]).push([[337],{337:(Z,d,s)=>{s.r(d),s.d(d,{AdminUsersModule:()=>U});var l=s(9808),o=s(1695),u=s(520),m=s(3913),e=s(4893);let h=(()=>{class t{constructor(i){this._http=i,this.url=m.x.url}getUsers(){return this._http.get(this.url+"admin/users")}deleteUser(i){let n=(new u.WM).set("Content-Type","application/json");return this._http.delete(this.url+"admin/user/"+i,{headers:n})}}return t.\u0275fac=function(i){return new(i||t)(e.LFG(u.eN))},t.\u0275prov=e.Yz7({token:t,factory:t.\u0275fac}),t})();var g=s(5226),a=s.n(g),v=s(2313);const f=function(t){return{"router-animation":t}};function A(t,r){if(1&t){const i=e.EpF();e.TgZ(0,"div",7)(1,"div",8)(2,"div",9)(3,"table",10)(4,"thead")(5,"tr")(6,"th",11),e._uU(7,"#"),e.qZA(),e.TgZ(8,"th",11),e._uU(9,"Email"),e.qZA(),e.TgZ(10,"th",11),e._uU(11,"Password"),e.qZA()()(),e.TgZ(12,"tbody")(13,"tr")(14,"th",12),e._uU(15,"1"),e.qZA(),e.TgZ(16,"td"),e._uU(17),e.qZA(),e.TgZ(18,"td"),e._uU(19,"**Private**"),e.qZA()()(),e.TgZ(20,"a",13),e.NdJ("click",function(){const c=e.CHM(i).$implicit;return e.oxw().deleteUser(c._id)}),e._uU(21,"Borrar usuario"),e.qZA()()()()()}if(2&t){const i=r.$implicit,n=e.oxw();e.Q6J("ngClass",e.VKq(2,f,!0===n.animation)),e.xp6(17),e.Oqu(i.email)}}const C=[{path:"",component:(()=>{class t{constructor(i,n,p,c){this._adminService=i,this._router=n,this.titleService=p,this.metaService=c,this.animation=!1,this.url=m.x.url,this.titleService.setTitle("Users | Birello Gallery"),this.metaService.addTag({name:"robots",content:"noindex, nofollow"})}ngOnInit(){window.scroll({top:0,left:0,behavior:"smooth"}),this.suscripcion=this._adminService.getUsers().subscribe({next:i=>{i.users&&(this.animation=!0,this.admins=i.users)}})}deleteUser(i){a().fire({title:"\xbf Estas seguro que quieres eliminar este usuario ?",text:"No vas a poder recuperarlo",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Si, quiero eliminarlo",cancelButtonText:"Cancelar"}).then(n=>{n.isConfirmed?this.suscripciondelete=this._adminService.deleteUser(i).subscribe({next:()=>{a().fire("Eliminado","El usuario ha sido eliminado correctamente","success"),setTimeout(()=>{this._router.navigate(["/admin/show/users"]).then(()=>{window.location.reload()})},2e3)},error:()=>{a().fire("Error","El usuario no se ha eliminado correctamente","error"),setTimeout(()=>{this._router.navigate(["/admin"]).then(()=>{window.location.reload()})},2e3)}}):(a().fire("El usuario se ha salvado y no se ha eliminado"),setTimeout(()=>{this._router.navigate(["/admin"]).then(()=>{window.location.reload()})},2e3))})}ngOnDestroy(){[this.suscripcion,this.suscripciondelete].forEach(i=>null==i?void 0:i.unsubscribe()),this.animation=!1}}return t.\u0275fac=function(i){return new(i||t)(e.Y36(h),e.Y36(o.F0),e.Y36(v.Dx),e.Y36(v.h_))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-adminusers"]],features:[e._Bn([h])],decls:8,vars:1,consts:[[1,"adminregisters",2,"margin-top","20px"],[1,"adminregister"],[1,"container"],["class","row rowresponsiveapi justify-content-center",3,"ngClass",4,"ngFor","ngForOf"],[1,"row"],[1,"col"],["routerLink","/admin",2,"color","white","display","block","margin","0 auto","margin-bottom","16px"],[1,"row","rowresponsiveapi","justify-content-center",3,"ngClass"],[1,"c-col","col-12","col-sm-10","col-md-8","col-lg-6","marginresponsiveindex"],[1,"table-responsive"],[1,"table","table-dark"],["scope","col"],["scope","row"],[1,"btn","deleteuser",3,"click"]],template:function(i,n){1&i&&(e.TgZ(0,"main",0)(1,"section",1)(2,"div",2),e.YNc(3,A,22,4,"div",3),e.TgZ(4,"div",4)(5,"div",5)(6,"a",6),e._uU(7,"Go back to the admin page"),e.qZA()()()()()()),2&i&&(e.xp6(3),e.Q6J("ngForOf",n.admins))},directives:[l.sg,l.mk,o.yS],styles:[""]}),t})()}];let T=(()=>{class t{}return t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[[o.Bz.forChild(C)],o.Bz]}),t})();var w=s(7556),x=s(2993),y=s(455);let U=(()=>{class t{}return t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({providers:[w.e,x.a,{provide:u.TP,useClass:y.N,multi:!0}],imports:[[l.ez,T]]}),t})()}}]);
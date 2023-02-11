goog.provide('shadow.remote.runtime.tap_support');
shadow.remote.runtime.tap_support.tap_subscribe = (function shadow$remote$runtime$tap_support$tap_subscribe(p__41202,p__41203){
var map__41204 = p__41202;
var map__41204__$1 = cljs.core.__destructure_map(map__41204);
var svc = map__41204__$1;
var subs_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41204__$1,new cljs.core.Keyword(null,"subs-ref","subs-ref",-1355989911));
var obj_support = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41204__$1,new cljs.core.Keyword(null,"obj-support","obj-support",1522559229));
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41204__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
var map__41205 = p__41203;
var map__41205__$1 = cljs.core.__destructure_map(map__41205);
var msg = map__41205__$1;
var from = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41205__$1,new cljs.core.Keyword(null,"from","from",1815293044));
var summary = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41205__$1,new cljs.core.Keyword(null,"summary","summary",380847952));
var history__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41205__$1,new cljs.core.Keyword(null,"history","history",-247395220));
var num = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__41205__$1,new cljs.core.Keyword(null,"num","num",1985240673),(10));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(subs_ref,cljs.core.assoc,from,msg);

if(cljs.core.truth_(history__$1)){
return shadow.remote.runtime.shared.reply(runtime,msg,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"tap-subscribed","tap-subscribed",-1882247432),new cljs.core.Keyword(null,"history","history",-247395220),cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (oid){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"oid","oid",-768692334),oid,new cljs.core.Keyword(null,"summary","summary",380847952),shadow.remote.runtime.obj_support.obj_describe_STAR_(obj_support,oid)], null);
}),shadow.remote.runtime.obj_support.get_tap_history(obj_support,num)))], null));
} else {
return null;
}
});
shadow.remote.runtime.tap_support.tap_unsubscribe = (function shadow$remote$runtime$tap_support$tap_unsubscribe(p__41218,p__41219){
var map__41221 = p__41218;
var map__41221__$1 = cljs.core.__destructure_map(map__41221);
var subs_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41221__$1,new cljs.core.Keyword(null,"subs-ref","subs-ref",-1355989911));
var map__41222 = p__41219;
var map__41222__$1 = cljs.core.__destructure_map(map__41222);
var from = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41222__$1,new cljs.core.Keyword(null,"from","from",1815293044));
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(subs_ref,cljs.core.dissoc,from);
});
shadow.remote.runtime.tap_support.request_tap_history = (function shadow$remote$runtime$tap_support$request_tap_history(p__41226,p__41227){
var map__41228 = p__41226;
var map__41228__$1 = cljs.core.__destructure_map(map__41228);
var obj_support = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41228__$1,new cljs.core.Keyword(null,"obj-support","obj-support",1522559229));
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41228__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
var map__41229 = p__41227;
var map__41229__$1 = cljs.core.__destructure_map(map__41229);
var msg = map__41229__$1;
var num = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__41229__$1,new cljs.core.Keyword(null,"num","num",1985240673),(10));
var tap_ids = shadow.remote.runtime.obj_support.get_tap_history(obj_support,num);
return shadow.remote.runtime.shared.reply(runtime,msg,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"tap-history","tap-history",-282803347),new cljs.core.Keyword(null,"oids","oids",-1580877688),tap_ids], null));
});
shadow.remote.runtime.tap_support.tool_disconnect = (function shadow$remote$runtime$tap_support$tool_disconnect(p__41236,tid){
var map__41237 = p__41236;
var map__41237__$1 = cljs.core.__destructure_map(map__41237);
var svc = map__41237__$1;
var subs_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41237__$1,new cljs.core.Keyword(null,"subs-ref","subs-ref",-1355989911));
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(subs_ref,cljs.core.dissoc,tid);
});
shadow.remote.runtime.tap_support.start = (function shadow$remote$runtime$tap_support$start(runtime,obj_support){
var subs_ref = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var tap_fn = (function shadow$remote$runtime$tap_support$start_$_runtime_tap(obj){
if((!((obj == null)))){
var oid = shadow.remote.runtime.obj_support.register(obj_support,obj,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"from","from",1815293044),new cljs.core.Keyword(null,"tap","tap",-1086702463)], null));
var seq__41246 = cljs.core.seq(cljs.core.deref(subs_ref));
var chunk__41247 = null;
var count__41248 = (0);
var i__41249 = (0);
while(true){
if((i__41249 < count__41248)){
var vec__41259 = chunk__41247.cljs$core$IIndexed$_nth$arity$2(null,i__41249);
var tid = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41259,(0),null);
var tap_config = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41259,(1),null);
shadow.remote.runtime.api.relay_msg(runtime,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"tap","tap",-1086702463),new cljs.core.Keyword(null,"to","to",192099007),tid,new cljs.core.Keyword(null,"oid","oid",-768692334),oid], null));


var G__41291 = seq__41246;
var G__41292 = chunk__41247;
var G__41293 = count__41248;
var G__41294 = (i__41249 + (1));
seq__41246 = G__41291;
chunk__41247 = G__41292;
count__41248 = G__41293;
i__41249 = G__41294;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__41246);
if(temp__5804__auto__){
var seq__41246__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__41246__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__41246__$1);
var G__41295 = cljs.core.chunk_rest(seq__41246__$1);
var G__41296 = c__5568__auto__;
var G__41297 = cljs.core.count(c__5568__auto__);
var G__41298 = (0);
seq__41246 = G__41295;
chunk__41247 = G__41296;
count__41248 = G__41297;
i__41249 = G__41298;
continue;
} else {
var vec__41262 = cljs.core.first(seq__41246__$1);
var tid = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41262,(0),null);
var tap_config = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41262,(1),null);
shadow.remote.runtime.api.relay_msg(runtime,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"tap","tap",-1086702463),new cljs.core.Keyword(null,"to","to",192099007),tid,new cljs.core.Keyword(null,"oid","oid",-768692334),oid], null));


var G__41299 = cljs.core.next(seq__41246__$1);
var G__41300 = null;
var G__41301 = (0);
var G__41302 = (0);
seq__41246 = G__41299;
chunk__41247 = G__41300;
count__41248 = G__41301;
i__41249 = G__41302;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return null;
}
});
var svc = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"runtime","runtime",-1331573996),runtime,new cljs.core.Keyword(null,"obj-support","obj-support",1522559229),obj_support,new cljs.core.Keyword(null,"tap-fn","tap-fn",1573556461),tap_fn,new cljs.core.Keyword(null,"subs-ref","subs-ref",-1355989911),subs_ref], null);
shadow.remote.runtime.api.add_extension(runtime,new cljs.core.Keyword("shadow.remote.runtime.tap-support","ext","shadow.remote.runtime.tap-support/ext",1019069674),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"ops","ops",1237330063),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"tap-subscribe","tap-subscribe",411179050),(function (p1__41238_SHARP_){
return shadow.remote.runtime.tap_support.tap_subscribe(svc,p1__41238_SHARP_);
}),new cljs.core.Keyword(null,"tap-unsubscribe","tap-unsubscribe",1183890755),(function (p1__41239_SHARP_){
return shadow.remote.runtime.tap_support.tap_unsubscribe(svc,p1__41239_SHARP_);
}),new cljs.core.Keyword(null,"request-tap-history","request-tap-history",-670837812),(function (p1__41240_SHARP_){
return shadow.remote.runtime.tap_support.request_tap_history(svc,p1__41240_SHARP_);
})], null),new cljs.core.Keyword(null,"on-tool-disconnect","on-tool-disconnect",693464366),(function (p1__41241_SHARP_){
return shadow.remote.runtime.tap_support.tool_disconnect(svc,p1__41241_SHARP_);
})], null));

cljs.core.add_tap(tap_fn);

return svc;
});
shadow.remote.runtime.tap_support.stop = (function shadow$remote$runtime$tap_support$stop(p__41274){
var map__41275 = p__41274;
var map__41275__$1 = cljs.core.__destructure_map(map__41275);
var svc = map__41275__$1;
var tap_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41275__$1,new cljs.core.Keyword(null,"tap-fn","tap-fn",1573556461));
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41275__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
cljs.core.remove_tap(tap_fn);

return shadow.remote.runtime.api.del_extension(runtime,new cljs.core.Keyword("shadow.remote.runtime.tap-support","ext","shadow.remote.runtime.tap-support/ext",1019069674));
});

//# sourceMappingURL=shadow.remote.runtime.tap_support.js.map

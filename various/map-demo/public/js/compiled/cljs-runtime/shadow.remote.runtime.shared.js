goog.provide('shadow.remote.runtime.shared');
shadow.remote.runtime.shared.init_state = (function shadow$remote$runtime$shared$init_state(client_info){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"extensions","extensions",-1103629196),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"ops","ops",1237330063),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"client-info","client-info",1958982504),client_info,new cljs.core.Keyword(null,"call-id-seq","call-id-seq",-1679248218),(0),new cljs.core.Keyword(null,"call-handlers","call-handlers",386605551),cljs.core.PersistentArrayMap.EMPTY], null);
});
shadow.remote.runtime.shared.now = (function shadow$remote$runtime$shared$now(){
return Date.now();
});
shadow.remote.runtime.shared.relay_msg = (function shadow$remote$runtime$shared$relay_msg(runtime,msg){
return shadow.remote.runtime.api.relay_msg(runtime,msg);
});
shadow.remote.runtime.shared.reply = (function shadow$remote$runtime$shared$reply(runtime,p__49255,res){
var map__49256 = p__49255;
var map__49256__$1 = cljs.core.__destructure_map(map__49256);
var call_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49256__$1,new cljs.core.Keyword(null,"call-id","call-id",1043012968));
var from = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49256__$1,new cljs.core.Keyword(null,"from","from",1815293044));
var res__$1 = (function (){var G__49258 = res;
var G__49258__$1 = (cljs.core.truth_(call_id)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__49258,new cljs.core.Keyword(null,"call-id","call-id",1043012968),call_id):G__49258);
if(cljs.core.truth_(from)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__49258__$1,new cljs.core.Keyword(null,"to","to",192099007),from);
} else {
return G__49258__$1;
}
})();
return shadow.remote.runtime.api.relay_msg(runtime,res__$1);
});
shadow.remote.runtime.shared.call = (function shadow$remote$runtime$shared$call(var_args){
var G__49263 = arguments.length;
switch (G__49263) {
case 3:
return shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$3 = (function (runtime,msg,handlers){
return shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$4(runtime,msg,handlers,(0));
}));

(shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$4 = (function (p__49265,msg,handlers,timeout_after_ms){
var map__49266 = p__49265;
var map__49266__$1 = cljs.core.__destructure_map(map__49266);
var runtime = map__49266__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49266__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
var call_id = new cljs.core.Keyword(null,"call-id-seq","call-id-seq",-1679248218).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state_ref,cljs.core.update,new cljs.core.Keyword(null,"call-id-seq","call-id-seq",-1679248218),cljs.core.inc);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state_ref,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"call-handlers","call-handlers",386605551),call_id], null),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"handlers","handlers",79528781),handlers,new cljs.core.Keyword(null,"called-at","called-at",607081160),shadow.remote.runtime.shared.now(),new cljs.core.Keyword(null,"msg","msg",-1386103444),msg,new cljs.core.Keyword(null,"timeout","timeout",-318625318),timeout_after_ms], null));

return shadow.remote.runtime.api.relay_msg(runtime,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(msg,new cljs.core.Keyword(null,"call-id","call-id",1043012968),call_id));
}));

(shadow.remote.runtime.shared.call.cljs$lang$maxFixedArity = 4);

shadow.remote.runtime.shared.trigger_BANG_ = (function shadow$remote$runtime$shared$trigger_BANG_(var_args){
var args__4824__auto__ = [];
var len__4818__auto___49449 = arguments.length;
var i__4819__auto___49450 = (0);
while(true){
if((i__4819__auto___49450 < len__4818__auto___49449)){
args__4824__auto__.push((arguments[i__4819__auto___49450]));

var G__49452 = (i__4819__auto___49450 + (1));
i__4819__auto___49450 = G__49452;
continue;
} else {
}
break;
}

var argseq__4825__auto__ = ((((2) < args__4824__auto__.length))?(new cljs.core.IndexedSeq(args__4824__auto__.slice((2)),(0),null)):null);
return shadow.remote.runtime.shared.trigger_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__4825__auto__);
});

(shadow.remote.runtime.shared.trigger_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (p__49286,ev,args){
var map__49287 = p__49286;
var map__49287__$1 = cljs.core.__destructure_map(map__49287);
var runtime = map__49287__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49287__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
var seq__49292 = cljs.core.seq(cljs.core.vals(new cljs.core.Keyword(null,"extensions","extensions",-1103629196).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref))));
var chunk__49295 = null;
var count__49296 = (0);
var i__49297 = (0);
while(true){
if((i__49297 < count__49296)){
var ext = chunk__49295.cljs$core$IIndexed$_nth$arity$2(null,i__49297);
var ev_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(ext,ev);
if(cljs.core.truth_(ev_fn)){
cljs.core.apply.cljs$core$IFn$_invoke$arity$2(ev_fn,args);


var G__49455 = seq__49292;
var G__49456 = chunk__49295;
var G__49457 = count__49296;
var G__49458 = (i__49297 + (1));
seq__49292 = G__49455;
chunk__49295 = G__49456;
count__49296 = G__49457;
i__49297 = G__49458;
continue;
} else {
var G__49459 = seq__49292;
var G__49460 = chunk__49295;
var G__49461 = count__49296;
var G__49462 = (i__49297 + (1));
seq__49292 = G__49459;
chunk__49295 = G__49460;
count__49296 = G__49461;
i__49297 = G__49462;
continue;
}
} else {
var temp__5753__auto__ = cljs.core.seq(seq__49292);
if(temp__5753__auto__){
var seq__49292__$1 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__49292__$1)){
var c__4638__auto__ = cljs.core.chunk_first(seq__49292__$1);
var G__49463 = cljs.core.chunk_rest(seq__49292__$1);
var G__49464 = c__4638__auto__;
var G__49465 = cljs.core.count(c__4638__auto__);
var G__49466 = (0);
seq__49292 = G__49463;
chunk__49295 = G__49464;
count__49296 = G__49465;
i__49297 = G__49466;
continue;
} else {
var ext = cljs.core.first(seq__49292__$1);
var ev_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(ext,ev);
if(cljs.core.truth_(ev_fn)){
cljs.core.apply.cljs$core$IFn$_invoke$arity$2(ev_fn,args);


var G__49467 = cljs.core.next(seq__49292__$1);
var G__49468 = null;
var G__49469 = (0);
var G__49470 = (0);
seq__49292 = G__49467;
chunk__49295 = G__49468;
count__49296 = G__49469;
i__49297 = G__49470;
continue;
} else {
var G__49471 = cljs.core.next(seq__49292__$1);
var G__49472 = null;
var G__49473 = (0);
var G__49474 = (0);
seq__49292 = G__49471;
chunk__49295 = G__49472;
count__49296 = G__49473;
i__49297 = G__49474;
continue;
}
}
} else {
return null;
}
}
break;
}
}));

(shadow.remote.runtime.shared.trigger_BANG_.cljs$lang$maxFixedArity = (2));

/** @this {Function} */
(shadow.remote.runtime.shared.trigger_BANG_.cljs$lang$applyTo = (function (seq49268){
var G__49269 = cljs.core.first(seq49268);
var seq49268__$1 = cljs.core.next(seq49268);
var G__49270 = cljs.core.first(seq49268__$1);
var seq49268__$2 = cljs.core.next(seq49268__$1);
var self__4805__auto__ = this;
return self__4805__auto__.cljs$core$IFn$_invoke$arity$variadic(G__49269,G__49270,seq49268__$2);
}));

shadow.remote.runtime.shared.welcome = (function shadow$remote$runtime$shared$welcome(p__49312,p__49313){
var map__49314 = p__49312;
var map__49314__$1 = cljs.core.__destructure_map(map__49314);
var runtime = map__49314__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49314__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
var map__49315 = p__49313;
var map__49315__$1 = cljs.core.__destructure_map(map__49315);
var msg = map__49315__$1;
var client_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49315__$1,new cljs.core.Keyword(null,"client-id","client-id",-464622140));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state_ref,cljs.core.assoc,new cljs.core.Keyword(null,"client-id","client-id",-464622140),client_id);

var map__49318 = cljs.core.deref(state_ref);
var map__49318__$1 = cljs.core.__destructure_map(map__49318);
var client_info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49318__$1,new cljs.core.Keyword(null,"client-info","client-info",1958982504));
var extensions = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49318__$1,new cljs.core.Keyword(null,"extensions","extensions",-1103629196));
shadow.remote.runtime.shared.relay_msg(runtime,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"hello","hello",-245025397),new cljs.core.Keyword(null,"client-info","client-info",1958982504),client_info], null));

return shadow.remote.runtime.shared.trigger_BANG_(runtime,new cljs.core.Keyword(null,"on-welcome","on-welcome",1895317125));
});
shadow.remote.runtime.shared.ping = (function shadow$remote$runtime$shared$ping(runtime,msg){
return shadow.remote.runtime.shared.reply(runtime,msg,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"pong","pong",-172484958)], null));
});
shadow.remote.runtime.shared.get_client_id = (function shadow$remote$runtime$shared$get_client_id(p__49327){
var map__49328 = p__49327;
var map__49328__$1 = cljs.core.__destructure_map(map__49328);
var runtime = map__49328__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49328__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
var or__4212__auto__ = new cljs.core.Keyword(null,"client-id","client-id",-464622140).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref));
if(cljs.core.truth_(or__4212__auto__)){
return or__4212__auto__;
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("runtime has no assigned runtime-id",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"runtime","runtime",-1331573996),runtime], null));
}
});
shadow.remote.runtime.shared.request_supported_ops = (function shadow$remote$runtime$shared$request_supported_ops(p__49330,msg){
var map__49336 = p__49330;
var map__49336__$1 = cljs.core.__destructure_map(map__49336);
var runtime = map__49336__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49336__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
return shadow.remote.runtime.shared.reply(runtime,msg,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"supported-ops","supported-ops",337914702),new cljs.core.Keyword(null,"ops","ops",1237330063),cljs.core.disj.cljs$core$IFn$_invoke$arity$variadic(cljs.core.set(cljs.core.keys(new cljs.core.Keyword(null,"ops","ops",1237330063).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref)))),new cljs.core.Keyword(null,"welcome","welcome",-578152123),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"unknown-relay-op","unknown-relay-op",170832753),new cljs.core.Keyword(null,"unknown-op","unknown-op",1900385996),new cljs.core.Keyword(null,"request-supported-ops","request-supported-ops",-1034994502),new cljs.core.Keyword(null,"tool-disconnect","tool-disconnect",189103996)], 0))], null));
});
shadow.remote.runtime.shared.unknown_relay_op = (function shadow$remote$runtime$shared$unknown_relay_op(msg){
return console.warn("unknown-relay-op",msg);
});
shadow.remote.runtime.shared.unknown_op = (function shadow$remote$runtime$shared$unknown_op(msg){
return console.warn("unknown-op",msg);
});
shadow.remote.runtime.shared.add_extension_STAR_ = (function shadow$remote$runtime$shared$add_extension_STAR_(p__49343,key,p__49344){
var map__49345 = p__49343;
var map__49345__$1 = cljs.core.__destructure_map(map__49345);
var state = map__49345__$1;
var extensions = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49345__$1,new cljs.core.Keyword(null,"extensions","extensions",-1103629196));
var map__49346 = p__49344;
var map__49346__$1 = cljs.core.__destructure_map(map__49346);
var spec = map__49346__$1;
var ops = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49346__$1,new cljs.core.Keyword(null,"ops","ops",1237330063));
if(cljs.core.contains_QMARK_(extensions,key)){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("extension already registered",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),key,new cljs.core.Keyword(null,"spec","spec",347520401),spec], null));
} else {
}

return cljs.core.reduce_kv((function (state__$1,op_kw,op_handler){
if(cljs.core.truth_(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state__$1,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ops","ops",1237330063),op_kw], null)))){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("op already registered",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),key,new cljs.core.Keyword(null,"op","op",-1882987955),op_kw], null));
} else {
}

return cljs.core.assoc_in(state__$1,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ops","ops",1237330063),op_kw], null),op_handler);
}),cljs.core.assoc_in(state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"extensions","extensions",-1103629196),key], null),spec),ops);
});
shadow.remote.runtime.shared.add_extension = (function shadow$remote$runtime$shared$add_extension(p__49348,key,spec){
var map__49349 = p__49348;
var map__49349__$1 = cljs.core.__destructure_map(map__49349);
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49349__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state_ref,shadow.remote.runtime.shared.add_extension_STAR_,key,spec);
});
shadow.remote.runtime.shared.add_defaults = (function shadow$remote$runtime$shared$add_defaults(runtime){
return shadow.remote.runtime.shared.add_extension(runtime,new cljs.core.Keyword("shadow.remote.runtime.shared","defaults","shadow.remote.runtime.shared/defaults",-1821257543),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"ops","ops",1237330063),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"welcome","welcome",-578152123),(function (p1__49350_SHARP_){
return shadow.remote.runtime.shared.welcome(runtime,p1__49350_SHARP_);
}),new cljs.core.Keyword(null,"unknown-relay-op","unknown-relay-op",170832753),(function (p1__49351_SHARP_){
return shadow.remote.runtime.shared.unknown_relay_op(p1__49351_SHARP_);
}),new cljs.core.Keyword(null,"unknown-op","unknown-op",1900385996),(function (p1__49352_SHARP_){
return shadow.remote.runtime.shared.unknown_op(p1__49352_SHARP_);
}),new cljs.core.Keyword(null,"ping","ping",-1670114784),(function (p1__49353_SHARP_){
return shadow.remote.runtime.shared.ping(runtime,p1__49353_SHARP_);
}),new cljs.core.Keyword(null,"request-supported-ops","request-supported-ops",-1034994502),(function (p1__49354_SHARP_){
return shadow.remote.runtime.shared.request_supported_ops(runtime,p1__49354_SHARP_);
})], null)], null));
});
shadow.remote.runtime.shared.del_extension_STAR_ = (function shadow$remote$runtime$shared$del_extension_STAR_(state,key){
var ext = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"extensions","extensions",-1103629196),key], null));
if(cljs.core.not(ext)){
return state;
} else {
return cljs.core.reduce_kv((function (state__$1,op_kw,op_handler){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(state__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ops","ops",1237330063)], null),cljs.core.dissoc,op_kw);
}),cljs.core.update.cljs$core$IFn$_invoke$arity$4(state,new cljs.core.Keyword(null,"extensions","extensions",-1103629196),cljs.core.dissoc,key),new cljs.core.Keyword(null,"ops","ops",1237330063).cljs$core$IFn$_invoke$arity$1(ext));
}
});
shadow.remote.runtime.shared.del_extension = (function shadow$remote$runtime$shared$del_extension(p__49378,key){
var map__49379 = p__49378;
var map__49379__$1 = cljs.core.__destructure_map(map__49379);
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49379__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(state_ref,shadow.remote.runtime.shared.del_extension_STAR_,key);
});
shadow.remote.runtime.shared.unhandled_call_result = (function shadow$remote$runtime$shared$unhandled_call_result(call_config,msg){
return console.warn("unhandled call result",msg,call_config);
});
shadow.remote.runtime.shared.unhandled_client_not_found = (function shadow$remote$runtime$shared$unhandled_client_not_found(p__49382,msg){
var map__49383 = p__49382;
var map__49383__$1 = cljs.core.__destructure_map(map__49383);
var runtime = map__49383__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49383__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
return shadow.remote.runtime.shared.trigger_BANG_.cljs$core$IFn$_invoke$arity$variadic(runtime,new cljs.core.Keyword(null,"on-client-not-found","on-client-not-found",-642452849),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([msg], 0));
});
shadow.remote.runtime.shared.reply_unknown_op = (function shadow$remote$runtime$shared$reply_unknown_op(runtime,msg){
return shadow.remote.runtime.shared.reply(runtime,msg,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"unknown-op","unknown-op",1900385996),new cljs.core.Keyword(null,"msg","msg",-1386103444),msg], null));
});
shadow.remote.runtime.shared.process = (function shadow$remote$runtime$shared$process(p__49386,p__49387){
var map__49388 = p__49386;
var map__49388__$1 = cljs.core.__destructure_map(map__49388);
var runtime = map__49388__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49388__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
var map__49389 = p__49387;
var map__49389__$1 = cljs.core.__destructure_map(map__49389);
var msg = map__49389__$1;
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49389__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
var call_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49389__$1,new cljs.core.Keyword(null,"call-id","call-id",1043012968));
var state = cljs.core.deref(state_ref);
var op_handler = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ops","ops",1237330063),op], null));
if(cljs.core.truth_(call_id)){
var cfg = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"call-handlers","call-handlers",386605551),call_id], null));
var call_handler = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cfg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"handlers","handlers",79528781),op], null));
if(cljs.core.truth_(call_handler)){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(state_ref,cljs.core.update,new cljs.core.Keyword(null,"call-handlers","call-handlers",386605551),cljs.core.dissoc,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([call_id], 0));

return (call_handler.cljs$core$IFn$_invoke$arity$1 ? call_handler.cljs$core$IFn$_invoke$arity$1(msg) : call_handler.call(null,msg));
} else {
if(cljs.core.truth_(op_handler)){
return (op_handler.cljs$core$IFn$_invoke$arity$1 ? op_handler.cljs$core$IFn$_invoke$arity$1(msg) : op_handler.call(null,msg));
} else {
return shadow.remote.runtime.shared.unhandled_call_result(cfg,msg);

}
}
} else {
if(cljs.core.truth_(op_handler)){
return (op_handler.cljs$core$IFn$_invoke$arity$1 ? op_handler.cljs$core$IFn$_invoke$arity$1(msg) : op_handler.call(null,msg));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"client-not-found","client-not-found",-1754042614),op)){
return shadow.remote.runtime.shared.unhandled_client_not_found(runtime,msg);
} else {
return shadow.remote.runtime.shared.reply_unknown_op(runtime,msg);

}
}
}
});
shadow.remote.runtime.shared.run_on_idle = (function shadow$remote$runtime$shared$run_on_idle(state_ref){
var seq__49401 = cljs.core.seq(cljs.core.vals(new cljs.core.Keyword(null,"extensions","extensions",-1103629196).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref))));
var chunk__49403 = null;
var count__49404 = (0);
var i__49405 = (0);
while(true){
if((i__49405 < count__49404)){
var map__49422 = chunk__49403.cljs$core$IIndexed$_nth$arity$2(null,i__49405);
var map__49422__$1 = cljs.core.__destructure_map(map__49422);
var on_idle = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49422__$1,new cljs.core.Keyword(null,"on-idle","on-idle",2044706602));
if(cljs.core.truth_(on_idle)){
(on_idle.cljs$core$IFn$_invoke$arity$0 ? on_idle.cljs$core$IFn$_invoke$arity$0() : on_idle.call(null));


var G__49553 = seq__49401;
var G__49554 = chunk__49403;
var G__49555 = count__49404;
var G__49556 = (i__49405 + (1));
seq__49401 = G__49553;
chunk__49403 = G__49554;
count__49404 = G__49555;
i__49405 = G__49556;
continue;
} else {
var G__49557 = seq__49401;
var G__49558 = chunk__49403;
var G__49559 = count__49404;
var G__49560 = (i__49405 + (1));
seq__49401 = G__49557;
chunk__49403 = G__49558;
count__49404 = G__49559;
i__49405 = G__49560;
continue;
}
} else {
var temp__5753__auto__ = cljs.core.seq(seq__49401);
if(temp__5753__auto__){
var seq__49401__$1 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__49401__$1)){
var c__4638__auto__ = cljs.core.chunk_first(seq__49401__$1);
var G__49563 = cljs.core.chunk_rest(seq__49401__$1);
var G__49564 = c__4638__auto__;
var G__49565 = cljs.core.count(c__4638__auto__);
var G__49566 = (0);
seq__49401 = G__49563;
chunk__49403 = G__49564;
count__49404 = G__49565;
i__49405 = G__49566;
continue;
} else {
var map__49431 = cljs.core.first(seq__49401__$1);
var map__49431__$1 = cljs.core.__destructure_map(map__49431);
var on_idle = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49431__$1,new cljs.core.Keyword(null,"on-idle","on-idle",2044706602));
if(cljs.core.truth_(on_idle)){
(on_idle.cljs$core$IFn$_invoke$arity$0 ? on_idle.cljs$core$IFn$_invoke$arity$0() : on_idle.call(null));


var G__49567 = cljs.core.next(seq__49401__$1);
var G__49568 = null;
var G__49569 = (0);
var G__49570 = (0);
seq__49401 = G__49567;
chunk__49403 = G__49568;
count__49404 = G__49569;
i__49405 = G__49570;
continue;
} else {
var G__49574 = cljs.core.next(seq__49401__$1);
var G__49575 = null;
var G__49576 = (0);
var G__49577 = (0);
seq__49401 = G__49574;
chunk__49403 = G__49575;
count__49404 = G__49576;
i__49405 = G__49577;
continue;
}
}
} else {
return null;
}
}
break;
}
});

//# sourceMappingURL=shadow.remote.runtime.shared.js.map

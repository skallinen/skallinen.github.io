goog.provide('day8.re_frame_10x.fx.local_storage');
/**
 * LocalStorage is not available in sandboxed iframes, so check
 *   window.localStorage and use the fake storage mechanism if it's not available.
 *   re-frame-10x settings will not persist, but it will work.
 */
day8.re_frame_10x.fx.local_storage.storage_mechanism = (function (){try{if(cljs.core.truth_(localStorage)){
return (new goog.storage.mechanism.HTML5LocalStorage());
} else {
return null;
}
}catch (e42154){if((e42154 instanceof Error)){
var _ = e42154;
return (new goog.testing.storage.FakeMechanism());
} else {
throw e42154;

}
}})();
day8.re_frame_10x.fx.local_storage.storage = (new goog.storage.Storage(day8.re_frame_10x.fx.local_storage.storage_mechanism));
day8.re_frame_10x.fx.local_storage.safe_prefix = "day8.re-frame-10x.";
day8.re_frame_10x.fx.local_storage.safe_key = (function day8$re_frame_10x$fx$local_storage$safe_key(key){

return [day8.re_frame_10x.fx.local_storage.safe_prefix,cljs.core.str.cljs$core$IFn$_invoke$arity$1(key)].join('');
});
/**
 * Loads a re-frame-10x value from local storage.
 */
day8.re_frame_10x.fx.local_storage.load = (function day8$re_frame_10x$fx$local_storage$load(var_args){
var G__42158 = arguments.length;
switch (G__42158) {
case 1:
return day8.re_frame_10x.fx.local_storage.load.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return day8.re_frame_10x.fx.local_storage.load.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(day8.re_frame_10x.fx.local_storage.load.cljs$core$IFn$_invoke$arity$1 = (function (key){
return day8.re_frame_10x.fx.local_storage.load.cljs$core$IFn$_invoke$arity$2(key,null);
}));

(day8.re_frame_10x.fx.local_storage.load.cljs$core$IFn$_invoke$arity$2 = (function (key,not_found){
var value = day8.re_frame_10x.fx.local_storage.storage.get(day8.re_frame_10x.fx.local_storage.safe_key(key));
if((void 0 === value)){
return not_found;
} else {
return cljs.reader.read_string.cljs$core$IFn$_invoke$arity$1(value);
}
}));

(day8.re_frame_10x.fx.local_storage.load.cljs$lang$maxFixedArity = 2);

day8.re_frame_10x.fx.local_storage.all_keys = (function day8$re_frame_10x$fx$local_storage$all_keys(){
try{return Object.keys(localStorage);
}catch (e42161){if((e42161 instanceof Error)){
var _ = e42161;
return cljs.core.PersistentVector.EMPTY;
} else {
throw e42161;

}
}});
/**
 * Deletes all re-frame-10x config keys
 */
day8.re_frame_10x.fx.local_storage.delete_all_keys_BANG_ = (function day8$re_frame_10x$fx$local_storage$delete_all_keys_BANG_(){
var seq__42164 = cljs.core.seq(day8.re_frame_10x.fx.local_storage.all_keys());
var chunk__42165 = null;
var count__42166 = (0);
var i__42167 = (0);
while(true){
if((i__42167 < count__42166)){
var k = chunk__42165.cljs$core$IIndexed$_nth$arity$2(null,i__42167);
if(clojure.string.starts_with_QMARK_(k,day8.re_frame_10x.fx.local_storage.safe_prefix)){
day8.re_frame_10x.fx.local_storage.storage.remove(k);
} else {
}


var G__42209 = seq__42164;
var G__42210 = chunk__42165;
var G__42211 = count__42166;
var G__42212 = (i__42167 + (1));
seq__42164 = G__42209;
chunk__42165 = G__42210;
count__42166 = G__42211;
i__42167 = G__42212;
continue;
} else {
var temp__5753__auto__ = cljs.core.seq(seq__42164);
if(temp__5753__auto__){
var seq__42164__$1 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__42164__$1)){
var c__4638__auto__ = cljs.core.chunk_first(seq__42164__$1);
var G__42213 = cljs.core.chunk_rest(seq__42164__$1);
var G__42214 = c__4638__auto__;
var G__42215 = cljs.core.count(c__4638__auto__);
var G__42216 = (0);
seq__42164 = G__42213;
chunk__42165 = G__42214;
count__42166 = G__42215;
i__42167 = G__42216;
continue;
} else {
var k = cljs.core.first(seq__42164__$1);
if(clojure.string.starts_with_QMARK_(k,day8.re_frame_10x.fx.local_storage.safe_prefix)){
day8.re_frame_10x.fx.local_storage.storage.remove(k);
} else {
}


var G__42217 = cljs.core.next(seq__42164__$1);
var G__42218 = null;
var G__42219 = (0);
var G__42220 = (0);
seq__42164 = G__42217;
chunk__42165 = G__42218;
count__42166 = G__42219;
i__42167 = G__42220;
continue;
}
} else {
return null;
}
}
break;
}
});
day8.re_frame_10x.fx.local_storage.save = (function day8$re_frame_10x$fx$local_storage$save(var_args){
var G__42184 = arguments.length;
switch (G__42184) {
case 1:
return day8.re_frame_10x.fx.local_storage.save.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
var args_arr__4839__auto__ = [];
var len__4818__auto___42222 = arguments.length;
var i__4819__auto___42223 = (0);
while(true){
if((i__4819__auto___42223 < len__4818__auto___42222)){
args_arr__4839__auto__.push((arguments[i__4819__auto___42223]));

var G__42224 = (i__4819__auto___42223 + (1));
i__4819__auto___42223 = G__42224;
continue;
} else {
}
break;
}

var argseq__4840__auto__ = (new cljs.core.IndexedSeq(args_arr__4839__auto__.slice((1)),(0),null));
return day8.re_frame_10x.fx.local_storage.save.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__4840__auto__);

}
});

(day8.re_frame_10x.fx.local_storage.save.cljs$core$IFn$_invoke$arity$1 = (function (key){
return day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.core.after((function (db){
return day8.re_frame_10x.fx.local_storage.storage.set(day8.re_frame_10x.fx.local_storage.safe_key(key),cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([db], 0)));
}));
}));

(day8.re_frame_10x.fx.local_storage.save.cljs$core$IFn$_invoke$arity$variadic = (function (key,ks){
return day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.core.after((function (db){
return cljs.core.run_BANG_((function (k){
var v = ((cljs.core.vector_QMARK_(k))?cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(db,k):cljs.core.get.cljs$core$IFn$_invoke$arity$2(db,k));
return day8.re_frame_10x.fx.local_storage.storage.set(day8.re_frame_10x.fx.local_storage.safe_key(key),cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([v], 0)));
}),ks);
}));
}));

/** @this {Function} */
(day8.re_frame_10x.fx.local_storage.save.cljs$lang$applyTo = (function (seq42182){
var G__42183 = cljs.core.first(seq42182);
var seq42182__$1 = cljs.core.next(seq42182);
var self__4805__auto__ = this;
return self__4805__auto__.cljs$core$IFn$_invoke$arity$variadic(G__42183,seq42182__$1);
}));

(day8.re_frame_10x.fx.local_storage.save.cljs$lang$maxFixedArity = (1));

day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.core.reg_cofx(new cljs.core.Keyword("day8.re-frame-10x.fx.local-storage","load","day8.re-frame-10x.fx.local-storage/load",1482432658),(function (coeffects,p__42199){
var map__42200 = p__42199;
var map__42200__$1 = cljs.core.__destructure_map(map__42200);
var key = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42200__$1,new cljs.core.Keyword(null,"key","key",-1516042587));
var or = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42200__$1,new cljs.core.Keyword(null,"or","or",235744169));
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(coeffects,cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(key),day8.re_frame_10x.fx.local_storage.load.cljs$core$IFn$_invoke$arity$2(key,or));
}));

//# sourceMappingURL=day8.re_frame_10x.fx.local_storage.js.map

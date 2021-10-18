goog.provide('shadow.cljs.devtools.client.browser');
shadow.cljs.devtools.client.browser.devtools_msg = (function shadow$cljs$devtools$client$browser$devtools_msg(var_args){
var args__4824__auto__ = [];
var len__4818__auto___55278 = arguments.length;
var i__4819__auto___55279 = (0);
while(true){
if((i__4819__auto___55279 < len__4818__auto___55278)){
args__4824__auto__.push((arguments[i__4819__auto___55279]));

var G__55280 = (i__4819__auto___55279 + (1));
i__4819__auto___55279 = G__55280;
continue;
} else {
}
break;
}

var argseq__4825__auto__ = ((((1) < args__4824__auto__.length))?(new cljs.core.IndexedSeq(args__4824__auto__.slice((1)),(0),null)):null);
return shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__4825__auto__);
});

(shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic = (function (msg,args){
if(shadow.cljs.devtools.client.env.log){
if(cljs.core.seq(shadow.cljs.devtools.client.env.log_style)){
return console.log.apply(console,cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [["%cshadow-cljs: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg)].join(''),shadow.cljs.devtools.client.env.log_style], null),args)));
} else {
return console.log.apply(console,cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [["shadow-cljs: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg)].join('')], null),args)));
}
} else {
return null;
}
}));

(shadow.cljs.devtools.client.browser.devtools_msg.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(shadow.cljs.devtools.client.browser.devtools_msg.cljs$lang$applyTo = (function (seq55003){
var G__55004 = cljs.core.first(seq55003);
var seq55003__$1 = cljs.core.next(seq55003);
var self__4805__auto__ = this;
return self__4805__auto__.cljs$core$IFn$_invoke$arity$variadic(G__55004,seq55003__$1);
}));

shadow.cljs.devtools.client.browser.script_eval = (function shadow$cljs$devtools$client$browser$script_eval(code){
return goog.globalEval(code);
});
shadow.cljs.devtools.client.browser.do_js_load = (function shadow$cljs$devtools$client$browser$do_js_load(sources){
var seq__55011 = cljs.core.seq(sources);
var chunk__55012 = null;
var count__55013 = (0);
var i__55014 = (0);
while(true){
if((i__55014 < count__55013)){
var map__55024 = chunk__55012.cljs$core$IIndexed$_nth$arity$2(null,i__55014);
var map__55024__$1 = cljs.core.__destructure_map(map__55024);
var src = map__55024__$1;
var resource_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55024__$1,new cljs.core.Keyword(null,"resource-id","resource-id",-1308422582));
var output_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55024__$1,new cljs.core.Keyword(null,"output-name","output-name",-1769107767));
var resource_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55024__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
var js = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55024__$1,new cljs.core.Keyword(null,"js","js",1768080579));
$CLJS.SHADOW_ENV.setLoaded(output_name);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load JS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([resource_name], 0));

shadow.cljs.devtools.client.env.before_load_src(src);

try{shadow.cljs.devtools.client.browser.script_eval([cljs.core.str.cljs$core$IFn$_invoke$arity$1(js),"\n//# sourceURL=",cljs.core.str.cljs$core$IFn$_invoke$arity$1($CLJS.SHADOW_ENV.scriptBase),cljs.core.str.cljs$core$IFn$_invoke$arity$1(output_name)].join(''));
}catch (e55025){var e_55281 = e55025;
if(shadow.cljs.devtools.client.env.log){
console.error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name)].join(''),e_55281);
} else {
}

throw (new Error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name),": ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(e_55281.message)].join('')));
}

var G__55282 = seq__55011;
var G__55283 = chunk__55012;
var G__55284 = count__55013;
var G__55285 = (i__55014 + (1));
seq__55011 = G__55282;
chunk__55012 = G__55283;
count__55013 = G__55284;
i__55014 = G__55285;
continue;
} else {
var temp__5753__auto__ = cljs.core.seq(seq__55011);
if(temp__5753__auto__){
var seq__55011__$1 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__55011__$1)){
var c__4638__auto__ = cljs.core.chunk_first(seq__55011__$1);
var G__55286 = cljs.core.chunk_rest(seq__55011__$1);
var G__55287 = c__4638__auto__;
var G__55288 = cljs.core.count(c__4638__auto__);
var G__55289 = (0);
seq__55011 = G__55286;
chunk__55012 = G__55287;
count__55013 = G__55288;
i__55014 = G__55289;
continue;
} else {
var map__55030 = cljs.core.first(seq__55011__$1);
var map__55030__$1 = cljs.core.__destructure_map(map__55030);
var src = map__55030__$1;
var resource_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55030__$1,new cljs.core.Keyword(null,"resource-id","resource-id",-1308422582));
var output_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55030__$1,new cljs.core.Keyword(null,"output-name","output-name",-1769107767));
var resource_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55030__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
var js = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55030__$1,new cljs.core.Keyword(null,"js","js",1768080579));
$CLJS.SHADOW_ENV.setLoaded(output_name);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load JS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([resource_name], 0));

shadow.cljs.devtools.client.env.before_load_src(src);

try{shadow.cljs.devtools.client.browser.script_eval([cljs.core.str.cljs$core$IFn$_invoke$arity$1(js),"\n//# sourceURL=",cljs.core.str.cljs$core$IFn$_invoke$arity$1($CLJS.SHADOW_ENV.scriptBase),cljs.core.str.cljs$core$IFn$_invoke$arity$1(output_name)].join(''));
}catch (e55031){var e_55291 = e55031;
if(shadow.cljs.devtools.client.env.log){
console.error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name)].join(''),e_55291);
} else {
}

throw (new Error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name),": ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(e_55291.message)].join('')));
}

var G__55292 = cljs.core.next(seq__55011__$1);
var G__55293 = null;
var G__55294 = (0);
var G__55295 = (0);
seq__55011 = G__55292;
chunk__55012 = G__55293;
count__55013 = G__55294;
i__55014 = G__55295;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.cljs.devtools.client.browser.do_js_reload = (function shadow$cljs$devtools$client$browser$do_js_reload(msg,sources,complete_fn,failure_fn){
return shadow.cljs.devtools.client.env.do_js_reload.cljs$core$IFn$_invoke$arity$4(cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(msg,new cljs.core.Keyword(null,"log-missing-fn","log-missing-fn",732676765),(function (fn_sym){
return null;
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"log-call-async","log-call-async",183826192),(function (fn_sym){
return shadow.cljs.devtools.client.browser.devtools_msg(["call async ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym)].join(''));
}),new cljs.core.Keyword(null,"log-call","log-call",412404391),(function (fn_sym){
return shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym)].join(''));
})], 0)),(function (){
return shadow.cljs.devtools.client.browser.do_js_load(sources);
}),complete_fn,failure_fn);
});
/**
 * when (require '["some-str" :as x]) is done at the REPL we need to manually call the shadow.js.require for it
 * since the file only adds the shadow$provide. only need to do this for shadow-js.
 */
shadow.cljs.devtools.client.browser.do_js_requires = (function shadow$cljs$devtools$client$browser$do_js_requires(js_requires){
var seq__55040 = cljs.core.seq(js_requires);
var chunk__55041 = null;
var count__55042 = (0);
var i__55043 = (0);
while(true){
if((i__55043 < count__55042)){
var js_ns = chunk__55041.cljs$core$IIndexed$_nth$arity$2(null,i__55043);
var require_str_55300 = ["var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns)," = shadow.js.require(\"",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns),"\");"].join('');
shadow.cljs.devtools.client.browser.script_eval(require_str_55300);


var G__55301 = seq__55040;
var G__55302 = chunk__55041;
var G__55303 = count__55042;
var G__55304 = (i__55043 + (1));
seq__55040 = G__55301;
chunk__55041 = G__55302;
count__55042 = G__55303;
i__55043 = G__55304;
continue;
} else {
var temp__5753__auto__ = cljs.core.seq(seq__55040);
if(temp__5753__auto__){
var seq__55040__$1 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__55040__$1)){
var c__4638__auto__ = cljs.core.chunk_first(seq__55040__$1);
var G__55305 = cljs.core.chunk_rest(seq__55040__$1);
var G__55306 = c__4638__auto__;
var G__55307 = cljs.core.count(c__4638__auto__);
var G__55308 = (0);
seq__55040 = G__55305;
chunk__55041 = G__55306;
count__55042 = G__55307;
i__55043 = G__55308;
continue;
} else {
var js_ns = cljs.core.first(seq__55040__$1);
var require_str_55309 = ["var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns)," = shadow.js.require(\"",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns),"\");"].join('');
shadow.cljs.devtools.client.browser.script_eval(require_str_55309);


var G__55310 = cljs.core.next(seq__55040__$1);
var G__55311 = null;
var G__55312 = (0);
var G__55313 = (0);
seq__55040 = G__55310;
chunk__55041 = G__55311;
count__55042 = G__55312;
i__55043 = G__55313;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.cljs.devtools.client.browser.handle_build_complete = (function shadow$cljs$devtools$client$browser$handle_build_complete(runtime,p__55055){
var map__55056 = p__55055;
var map__55056__$1 = cljs.core.__destructure_map(map__55056);
var msg = map__55056__$1;
var info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55056__$1,new cljs.core.Keyword(null,"info","info",-317069002));
var reload_info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55056__$1,new cljs.core.Keyword(null,"reload-info","reload-info",1648088086));
var warnings = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.distinct.cljs$core$IFn$_invoke$arity$1((function (){var iter__4611__auto__ = (function shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__55057(s__55058){
return (new cljs.core.LazySeq(null,(function (){
var s__55058__$1 = s__55058;
while(true){
var temp__5753__auto__ = cljs.core.seq(s__55058__$1);
if(temp__5753__auto__){
var xs__6308__auto__ = temp__5753__auto__;
var map__55063 = cljs.core.first(xs__6308__auto__);
var map__55063__$1 = cljs.core.__destructure_map(map__55063);
var src = map__55063__$1;
var resource_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55063__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
var warnings = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55063__$1,new cljs.core.Keyword(null,"warnings","warnings",-735437651));
if(cljs.core.not(new cljs.core.Keyword(null,"from-jar","from-jar",1050932827).cljs$core$IFn$_invoke$arity$1(src))){
var iterys__4607__auto__ = ((function (s__55058__$1,map__55063,map__55063__$1,src,resource_name,warnings,xs__6308__auto__,temp__5753__auto__,map__55056,map__55056__$1,msg,info,reload_info){
return (function shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__55057_$_iter__55059(s__55060){
return (new cljs.core.LazySeq(null,((function (s__55058__$1,map__55063,map__55063__$1,src,resource_name,warnings,xs__6308__auto__,temp__5753__auto__,map__55056,map__55056__$1,msg,info,reload_info){
return (function (){
var s__55060__$1 = s__55060;
while(true){
var temp__5753__auto____$1 = cljs.core.seq(s__55060__$1);
if(temp__5753__auto____$1){
var s__55060__$2 = temp__5753__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__55060__$2)){
var c__4609__auto__ = cljs.core.chunk_first(s__55060__$2);
var size__4610__auto__ = cljs.core.count(c__4609__auto__);
var b__55062 = cljs.core.chunk_buffer(size__4610__auto__);
if((function (){var i__55061 = (0);
while(true){
if((i__55061 < size__4610__auto__)){
var warning = cljs.core._nth(c__4609__auto__,i__55061);
cljs.core.chunk_append(b__55062,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(warning,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100),resource_name));

var G__55314 = (i__55061 + (1));
i__55061 = G__55314;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__55062),shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__55057_$_iter__55059(cljs.core.chunk_rest(s__55060__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__55062),null);
}
} else {
var warning = cljs.core.first(s__55060__$2);
return cljs.core.cons(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(warning,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100),resource_name),shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__55057_$_iter__55059(cljs.core.rest(s__55060__$2)));
}
} else {
return null;
}
break;
}
});})(s__55058__$1,map__55063,map__55063__$1,src,resource_name,warnings,xs__6308__auto__,temp__5753__auto__,map__55056,map__55056__$1,msg,info,reload_info))
,null,null));
});})(s__55058__$1,map__55063,map__55063__$1,src,resource_name,warnings,xs__6308__auto__,temp__5753__auto__,map__55056,map__55056__$1,msg,info,reload_info))
;
var fs__4608__auto__ = cljs.core.seq(iterys__4607__auto__(warnings));
if(fs__4608__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__4608__auto__,shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__55057(cljs.core.rest(s__55058__$1)));
} else {
var G__55315 = cljs.core.rest(s__55058__$1);
s__55058__$1 = G__55315;
continue;
}
} else {
var G__55316 = cljs.core.rest(s__55058__$1);
s__55058__$1 = G__55316;
continue;
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__4611__auto__(new cljs.core.Keyword(null,"sources","sources",-321166424).cljs$core$IFn$_invoke$arity$1(info));
})()));
if(shadow.cljs.devtools.client.env.log){
var seq__55074_55317 = cljs.core.seq(warnings);
var chunk__55075_55318 = null;
var count__55076_55319 = (0);
var i__55077_55320 = (0);
while(true){
if((i__55077_55320 < count__55076_55319)){
var map__55081_55321 = chunk__55075_55318.cljs$core$IIndexed$_nth$arity$2(null,i__55077_55320);
var map__55081_55322__$1 = cljs.core.__destructure_map(map__55081_55321);
var w_55323 = map__55081_55322__$1;
var msg_55324__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55081_55322__$1,new cljs.core.Keyword(null,"msg","msg",-1386103444));
var line_55325 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55081_55322__$1,new cljs.core.Keyword(null,"line","line",212345235));
var column_55326 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55081_55322__$1,new cljs.core.Keyword(null,"column","column",2078222095));
var resource_name_55327 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55081_55322__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
console.warn(["BUILD-WARNING in ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name_55327)," at [",cljs.core.str.cljs$core$IFn$_invoke$arity$1(line_55325),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(column_55326),"]\n\t",cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg_55324__$1)].join(''));


var G__55328 = seq__55074_55317;
var G__55329 = chunk__55075_55318;
var G__55330 = count__55076_55319;
var G__55331 = (i__55077_55320 + (1));
seq__55074_55317 = G__55328;
chunk__55075_55318 = G__55329;
count__55076_55319 = G__55330;
i__55077_55320 = G__55331;
continue;
} else {
var temp__5753__auto___55332 = cljs.core.seq(seq__55074_55317);
if(temp__5753__auto___55332){
var seq__55074_55333__$1 = temp__5753__auto___55332;
if(cljs.core.chunked_seq_QMARK_(seq__55074_55333__$1)){
var c__4638__auto___55334 = cljs.core.chunk_first(seq__55074_55333__$1);
var G__55335 = cljs.core.chunk_rest(seq__55074_55333__$1);
var G__55336 = c__4638__auto___55334;
var G__55337 = cljs.core.count(c__4638__auto___55334);
var G__55338 = (0);
seq__55074_55317 = G__55335;
chunk__55075_55318 = G__55336;
count__55076_55319 = G__55337;
i__55077_55320 = G__55338;
continue;
} else {
var map__55085_55339 = cljs.core.first(seq__55074_55333__$1);
var map__55085_55340__$1 = cljs.core.__destructure_map(map__55085_55339);
var w_55341 = map__55085_55340__$1;
var msg_55342__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55085_55340__$1,new cljs.core.Keyword(null,"msg","msg",-1386103444));
var line_55343 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55085_55340__$1,new cljs.core.Keyword(null,"line","line",212345235));
var column_55344 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55085_55340__$1,new cljs.core.Keyword(null,"column","column",2078222095));
var resource_name_55345 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55085_55340__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
console.warn(["BUILD-WARNING in ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name_55345)," at [",cljs.core.str.cljs$core$IFn$_invoke$arity$1(line_55343),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(column_55344),"]\n\t",cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg_55342__$1)].join(''));


var G__55346 = cljs.core.next(seq__55074_55333__$1);
var G__55347 = null;
var G__55348 = (0);
var G__55349 = (0);
seq__55074_55317 = G__55346;
chunk__55075_55318 = G__55347;
count__55076_55319 = G__55348;
i__55077_55320 = G__55349;
continue;
}
} else {
}
}
break;
}
} else {
}

if((!(shadow.cljs.devtools.client.env.autoload))){
return shadow.cljs.devtools.client.hud.load_end_success();
} else {
if(((cljs.core.empty_QMARK_(warnings)) || (shadow.cljs.devtools.client.env.ignore_warnings))){
var sources_to_get = shadow.cljs.devtools.client.env.filter_reload_sources(info,reload_info);
if(cljs.core.not(cljs.core.seq(sources_to_get))){
return shadow.cljs.devtools.client.hud.load_end_success();
} else {
if(cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"after-load","after-load",-1278503285)], null)))){
} else {
shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("reloading code but no :after-load hooks are configured!",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["https://shadow-cljs.github.io/docs/UsersGuide.html#_lifecycle_hooks"], 0));
}

return shadow.cljs.devtools.client.shared.load_sources(runtime,sources_to_get,(function (p1__55054_SHARP_){
return shadow.cljs.devtools.client.browser.do_js_reload(msg,p1__55054_SHARP_,shadow.cljs.devtools.client.hud.load_end_success,shadow.cljs.devtools.client.hud.load_failure);
}));
}
} else {
return null;
}
}
});
shadow.cljs.devtools.client.browser.page_load_uri = (cljs.core.truth_(goog.global.document)?goog.Uri.parse(document.location.href):null);
shadow.cljs.devtools.client.browser.match_paths = (function shadow$cljs$devtools$client$browser$match_paths(old,new$){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("file",shadow.cljs.devtools.client.browser.page_load_uri.getScheme())){
var rel_new = cljs.core.subs.cljs$core$IFn$_invoke$arity$2(new$,(1));
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(old,rel_new)) || (clojure.string.starts_with_QMARK_(old,[rel_new,"?"].join(''))))){
return rel_new;
} else {
return null;
}
} else {
var node_uri = goog.Uri.parse(old);
var node_uri_resolved = shadow.cljs.devtools.client.browser.page_load_uri.resolve(node_uri);
var node_abs = node_uri_resolved.getPath();
var and__4210__auto__ = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$1(shadow.cljs.devtools.client.browser.page_load_uri.hasSameDomainAs(node_uri))) || (cljs.core.not(node_uri.hasDomain())));
if(and__4210__auto__){
var and__4210__auto____$1 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(node_abs,new$);
if(and__4210__auto____$1){
return new$;
} else {
return and__4210__auto____$1;
}
} else {
return and__4210__auto__;
}
}
});
shadow.cljs.devtools.client.browser.handle_asset_update = (function shadow$cljs$devtools$client$browser$handle_asset_update(p__55099){
var map__55100 = p__55099;
var map__55100__$1 = cljs.core.__destructure_map(map__55100);
var msg = map__55100__$1;
var updates = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55100__$1,new cljs.core.Keyword(null,"updates","updates",2013983452));
var seq__55101 = cljs.core.seq(updates);
var chunk__55103 = null;
var count__55104 = (0);
var i__55105 = (0);
while(true){
if((i__55105 < count__55104)){
var path = chunk__55103.cljs$core$IIndexed$_nth$arity$2(null,i__55105);
if(clojure.string.ends_with_QMARK_(path,"css")){
var seq__55164_55351 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(document.querySelectorAll("link[rel=\"stylesheet\"]")));
var chunk__55168_55352 = null;
var count__55169_55353 = (0);
var i__55170_55354 = (0);
while(true){
if((i__55170_55354 < count__55169_55353)){
var node_55355 = chunk__55168_55352.cljs$core$IIndexed$_nth$arity$2(null,i__55170_55354);
if(cljs.core.not(node_55355.shadow$old)){
var path_match_55357 = shadow.cljs.devtools.client.browser.match_paths(node_55355.getAttribute("href"),path);
if(cljs.core.truth_(path_match_55357)){
var new_link_55358 = (function (){var G__55176 = node_55355.cloneNode(true);
G__55176.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_55357),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__55176;
})();
(node_55355.shadow$old = true);

(new_link_55358.onload = ((function (seq__55164_55351,chunk__55168_55352,count__55169_55353,i__55170_55354,seq__55101,chunk__55103,count__55104,i__55105,new_link_55358,path_match_55357,node_55355,path,map__55100,map__55100__$1,msg,updates){
return (function (e){
return goog.dom.removeNode(node_55355);
});})(seq__55164_55351,chunk__55168_55352,count__55169_55353,i__55170_55354,seq__55101,chunk__55103,count__55104,i__55105,new_link_55358,path_match_55357,node_55355,path,map__55100,map__55100__$1,msg,updates))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_55357], 0));

goog.dom.insertSiblingAfter(new_link_55358,node_55355);


var G__55362 = seq__55164_55351;
var G__55363 = chunk__55168_55352;
var G__55364 = count__55169_55353;
var G__55365 = (i__55170_55354 + (1));
seq__55164_55351 = G__55362;
chunk__55168_55352 = G__55363;
count__55169_55353 = G__55364;
i__55170_55354 = G__55365;
continue;
} else {
var G__55366 = seq__55164_55351;
var G__55367 = chunk__55168_55352;
var G__55368 = count__55169_55353;
var G__55369 = (i__55170_55354 + (1));
seq__55164_55351 = G__55366;
chunk__55168_55352 = G__55367;
count__55169_55353 = G__55368;
i__55170_55354 = G__55369;
continue;
}
} else {
var G__55370 = seq__55164_55351;
var G__55371 = chunk__55168_55352;
var G__55372 = count__55169_55353;
var G__55373 = (i__55170_55354 + (1));
seq__55164_55351 = G__55370;
chunk__55168_55352 = G__55371;
count__55169_55353 = G__55372;
i__55170_55354 = G__55373;
continue;
}
} else {
var temp__5753__auto___55374 = cljs.core.seq(seq__55164_55351);
if(temp__5753__auto___55374){
var seq__55164_55375__$1 = temp__5753__auto___55374;
if(cljs.core.chunked_seq_QMARK_(seq__55164_55375__$1)){
var c__4638__auto___55376 = cljs.core.chunk_first(seq__55164_55375__$1);
var G__55377 = cljs.core.chunk_rest(seq__55164_55375__$1);
var G__55378 = c__4638__auto___55376;
var G__55379 = cljs.core.count(c__4638__auto___55376);
var G__55380 = (0);
seq__55164_55351 = G__55377;
chunk__55168_55352 = G__55378;
count__55169_55353 = G__55379;
i__55170_55354 = G__55380;
continue;
} else {
var node_55381 = cljs.core.first(seq__55164_55375__$1);
if(cljs.core.not(node_55381.shadow$old)){
var path_match_55382 = shadow.cljs.devtools.client.browser.match_paths(node_55381.getAttribute("href"),path);
if(cljs.core.truth_(path_match_55382)){
var new_link_55383 = (function (){var G__55177 = node_55381.cloneNode(true);
G__55177.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_55382),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__55177;
})();
(node_55381.shadow$old = true);

(new_link_55383.onload = ((function (seq__55164_55351,chunk__55168_55352,count__55169_55353,i__55170_55354,seq__55101,chunk__55103,count__55104,i__55105,new_link_55383,path_match_55382,node_55381,seq__55164_55375__$1,temp__5753__auto___55374,path,map__55100,map__55100__$1,msg,updates){
return (function (e){
return goog.dom.removeNode(node_55381);
});})(seq__55164_55351,chunk__55168_55352,count__55169_55353,i__55170_55354,seq__55101,chunk__55103,count__55104,i__55105,new_link_55383,path_match_55382,node_55381,seq__55164_55375__$1,temp__5753__auto___55374,path,map__55100,map__55100__$1,msg,updates))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_55382], 0));

goog.dom.insertSiblingAfter(new_link_55383,node_55381);


var G__55384 = cljs.core.next(seq__55164_55375__$1);
var G__55385 = null;
var G__55386 = (0);
var G__55387 = (0);
seq__55164_55351 = G__55384;
chunk__55168_55352 = G__55385;
count__55169_55353 = G__55386;
i__55170_55354 = G__55387;
continue;
} else {
var G__55388 = cljs.core.next(seq__55164_55375__$1);
var G__55389 = null;
var G__55390 = (0);
var G__55391 = (0);
seq__55164_55351 = G__55388;
chunk__55168_55352 = G__55389;
count__55169_55353 = G__55390;
i__55170_55354 = G__55391;
continue;
}
} else {
var G__55392 = cljs.core.next(seq__55164_55375__$1);
var G__55393 = null;
var G__55394 = (0);
var G__55395 = (0);
seq__55164_55351 = G__55392;
chunk__55168_55352 = G__55393;
count__55169_55353 = G__55394;
i__55170_55354 = G__55395;
continue;
}
}
} else {
}
}
break;
}


var G__55396 = seq__55101;
var G__55397 = chunk__55103;
var G__55398 = count__55104;
var G__55399 = (i__55105 + (1));
seq__55101 = G__55396;
chunk__55103 = G__55397;
count__55104 = G__55398;
i__55105 = G__55399;
continue;
} else {
var G__55400 = seq__55101;
var G__55401 = chunk__55103;
var G__55402 = count__55104;
var G__55403 = (i__55105 + (1));
seq__55101 = G__55400;
chunk__55103 = G__55401;
count__55104 = G__55402;
i__55105 = G__55403;
continue;
}
} else {
var temp__5753__auto__ = cljs.core.seq(seq__55101);
if(temp__5753__auto__){
var seq__55101__$1 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__55101__$1)){
var c__4638__auto__ = cljs.core.chunk_first(seq__55101__$1);
var G__55404 = cljs.core.chunk_rest(seq__55101__$1);
var G__55405 = c__4638__auto__;
var G__55406 = cljs.core.count(c__4638__auto__);
var G__55407 = (0);
seq__55101 = G__55404;
chunk__55103 = G__55405;
count__55104 = G__55406;
i__55105 = G__55407;
continue;
} else {
var path = cljs.core.first(seq__55101__$1);
if(clojure.string.ends_with_QMARK_(path,"css")){
var seq__55178_55408 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(document.querySelectorAll("link[rel=\"stylesheet\"]")));
var chunk__55182_55409 = null;
var count__55183_55410 = (0);
var i__55184_55411 = (0);
while(true){
if((i__55184_55411 < count__55183_55410)){
var node_55412 = chunk__55182_55409.cljs$core$IIndexed$_nth$arity$2(null,i__55184_55411);
if(cljs.core.not(node_55412.shadow$old)){
var path_match_55413 = shadow.cljs.devtools.client.browser.match_paths(node_55412.getAttribute("href"),path);
if(cljs.core.truth_(path_match_55413)){
var new_link_55414 = (function (){var G__55194 = node_55412.cloneNode(true);
G__55194.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_55413),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__55194;
})();
(node_55412.shadow$old = true);

(new_link_55414.onload = ((function (seq__55178_55408,chunk__55182_55409,count__55183_55410,i__55184_55411,seq__55101,chunk__55103,count__55104,i__55105,new_link_55414,path_match_55413,node_55412,path,seq__55101__$1,temp__5753__auto__,map__55100,map__55100__$1,msg,updates){
return (function (e){
return goog.dom.removeNode(node_55412);
});})(seq__55178_55408,chunk__55182_55409,count__55183_55410,i__55184_55411,seq__55101,chunk__55103,count__55104,i__55105,new_link_55414,path_match_55413,node_55412,path,seq__55101__$1,temp__5753__auto__,map__55100,map__55100__$1,msg,updates))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_55413], 0));

goog.dom.insertSiblingAfter(new_link_55414,node_55412);


var G__55415 = seq__55178_55408;
var G__55416 = chunk__55182_55409;
var G__55417 = count__55183_55410;
var G__55418 = (i__55184_55411 + (1));
seq__55178_55408 = G__55415;
chunk__55182_55409 = G__55416;
count__55183_55410 = G__55417;
i__55184_55411 = G__55418;
continue;
} else {
var G__55419 = seq__55178_55408;
var G__55420 = chunk__55182_55409;
var G__55421 = count__55183_55410;
var G__55422 = (i__55184_55411 + (1));
seq__55178_55408 = G__55419;
chunk__55182_55409 = G__55420;
count__55183_55410 = G__55421;
i__55184_55411 = G__55422;
continue;
}
} else {
var G__55423 = seq__55178_55408;
var G__55424 = chunk__55182_55409;
var G__55425 = count__55183_55410;
var G__55426 = (i__55184_55411 + (1));
seq__55178_55408 = G__55423;
chunk__55182_55409 = G__55424;
count__55183_55410 = G__55425;
i__55184_55411 = G__55426;
continue;
}
} else {
var temp__5753__auto___55427__$1 = cljs.core.seq(seq__55178_55408);
if(temp__5753__auto___55427__$1){
var seq__55178_55428__$1 = temp__5753__auto___55427__$1;
if(cljs.core.chunked_seq_QMARK_(seq__55178_55428__$1)){
var c__4638__auto___55429 = cljs.core.chunk_first(seq__55178_55428__$1);
var G__55430 = cljs.core.chunk_rest(seq__55178_55428__$1);
var G__55431 = c__4638__auto___55429;
var G__55432 = cljs.core.count(c__4638__auto___55429);
var G__55433 = (0);
seq__55178_55408 = G__55430;
chunk__55182_55409 = G__55431;
count__55183_55410 = G__55432;
i__55184_55411 = G__55433;
continue;
} else {
var node_55434 = cljs.core.first(seq__55178_55428__$1);
if(cljs.core.not(node_55434.shadow$old)){
var path_match_55435 = shadow.cljs.devtools.client.browser.match_paths(node_55434.getAttribute("href"),path);
if(cljs.core.truth_(path_match_55435)){
var new_link_55436 = (function (){var G__55203 = node_55434.cloneNode(true);
G__55203.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_55435),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__55203;
})();
(node_55434.shadow$old = true);

(new_link_55436.onload = ((function (seq__55178_55408,chunk__55182_55409,count__55183_55410,i__55184_55411,seq__55101,chunk__55103,count__55104,i__55105,new_link_55436,path_match_55435,node_55434,seq__55178_55428__$1,temp__5753__auto___55427__$1,path,seq__55101__$1,temp__5753__auto__,map__55100,map__55100__$1,msg,updates){
return (function (e){
return goog.dom.removeNode(node_55434);
});})(seq__55178_55408,chunk__55182_55409,count__55183_55410,i__55184_55411,seq__55101,chunk__55103,count__55104,i__55105,new_link_55436,path_match_55435,node_55434,seq__55178_55428__$1,temp__5753__auto___55427__$1,path,seq__55101__$1,temp__5753__auto__,map__55100,map__55100__$1,msg,updates))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_55435], 0));

goog.dom.insertSiblingAfter(new_link_55436,node_55434);


var G__55437 = cljs.core.next(seq__55178_55428__$1);
var G__55438 = null;
var G__55439 = (0);
var G__55440 = (0);
seq__55178_55408 = G__55437;
chunk__55182_55409 = G__55438;
count__55183_55410 = G__55439;
i__55184_55411 = G__55440;
continue;
} else {
var G__55441 = cljs.core.next(seq__55178_55428__$1);
var G__55442 = null;
var G__55443 = (0);
var G__55444 = (0);
seq__55178_55408 = G__55441;
chunk__55182_55409 = G__55442;
count__55183_55410 = G__55443;
i__55184_55411 = G__55444;
continue;
}
} else {
var G__55445 = cljs.core.next(seq__55178_55428__$1);
var G__55446 = null;
var G__55447 = (0);
var G__55448 = (0);
seq__55178_55408 = G__55445;
chunk__55182_55409 = G__55446;
count__55183_55410 = G__55447;
i__55184_55411 = G__55448;
continue;
}
}
} else {
}
}
break;
}


var G__55449 = cljs.core.next(seq__55101__$1);
var G__55450 = null;
var G__55451 = (0);
var G__55452 = (0);
seq__55101 = G__55449;
chunk__55103 = G__55450;
count__55104 = G__55451;
i__55105 = G__55452;
continue;
} else {
var G__55453 = cljs.core.next(seq__55101__$1);
var G__55454 = null;
var G__55455 = (0);
var G__55456 = (0);
seq__55101 = G__55453;
chunk__55103 = G__55454;
count__55104 = G__55455;
i__55105 = G__55456;
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
shadow.cljs.devtools.client.browser.global_eval = (function shadow$cljs$devtools$client$browser$global_eval(js){
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2("undefined",typeof(module))){
return eval(js);
} else {
return (0,eval)(js);;
}
});
shadow.cljs.devtools.client.browser.repl_init = (function shadow$cljs$devtools$client$browser$repl_init(runtime,p__55209){
var map__55213 = p__55209;
var map__55213__$1 = cljs.core.__destructure_map(map__55213);
var repl_state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55213__$1,new cljs.core.Keyword(null,"repl-state","repl-state",-1733780387));
return shadow.cljs.devtools.client.shared.load_sources(runtime,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.remove.cljs$core$IFn$_invoke$arity$2(shadow.cljs.devtools.client.env.src_is_loaded_QMARK_,new cljs.core.Keyword(null,"repl-sources","repl-sources",723867535).cljs$core$IFn$_invoke$arity$1(repl_state))),(function (sources){
shadow.cljs.devtools.client.browser.do_js_load(sources);

return shadow.cljs.devtools.client.browser.devtools_msg("ready!");
}));
});
shadow.cljs.devtools.client.browser.runtime_info = (((typeof SHADOW_CONFIG !== 'undefined'))?shadow.json.to_clj.cljs$core$IFn$_invoke$arity$1(SHADOW_CONFIG):null);
shadow.cljs.devtools.client.browser.client_info = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([shadow.cljs.devtools.client.browser.runtime_info,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"host","host",-1558485167),(cljs.core.truth_(goog.global.document)?new cljs.core.Keyword(null,"browser","browser",828191719):new cljs.core.Keyword(null,"browser-worker","browser-worker",1638998282)),new cljs.core.Keyword(null,"user-agent","user-agent",1220426212),[(cljs.core.truth_(goog.userAgent.OPERA)?"Opera":(cljs.core.truth_(goog.userAgent.product.CHROME)?"Chrome":(cljs.core.truth_(goog.userAgent.IE)?"MSIE":(cljs.core.truth_(goog.userAgent.EDGE)?"Edge":(cljs.core.truth_(goog.userAgent.GECKO)?"Firefox":(cljs.core.truth_(goog.userAgent.SAFARI)?"Safari":(cljs.core.truth_(goog.userAgent.WEBKIT)?"Webkit":null)))))))," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(goog.userAgent.VERSION)," [",cljs.core.str.cljs$core$IFn$_invoke$arity$1(goog.userAgent.PLATFORM),"]"].join(''),new cljs.core.Keyword(null,"dom","dom",-1236537922),(!((goog.global.document == null)))], null)], 0));
if((typeof shadow !== 'undefined') && (typeof shadow.cljs !== 'undefined') && (typeof shadow.cljs.devtools !== 'undefined') && (typeof shadow.cljs.devtools.client !== 'undefined') && (typeof shadow.cljs.devtools.client.browser !== 'undefined') && (typeof shadow.cljs.devtools.client.browser.ws_was_welcome_ref !== 'undefined')){
} else {
shadow.cljs.devtools.client.browser.ws_was_welcome_ref = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(false);
}
if(((shadow.cljs.devtools.client.env.enabled) && ((shadow.cljs.devtools.client.env.worker_client_id > (0))))){
(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$remote$runtime$api$IEvalJS$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$remote$runtime$api$IEvalJS$_js_eval$arity$2 = (function (this$,code){
var this$__$1 = this;
return shadow.cljs.devtools.client.browser.global_eval(code);
}));

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$do_invoke$arity$2 = (function (this$,p__55231){
var map__55232 = p__55231;
var map__55232__$1 = cljs.core.__destructure_map(map__55232);
var _ = map__55232__$1;
var js = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55232__$1,new cljs.core.Keyword(null,"js","js",1768080579));
var this$__$1 = this;
return shadow.cljs.devtools.client.browser.global_eval(js);
}));

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$do_repl_init$arity$4 = (function (runtime,p__55234,done,error){
var map__55235 = p__55234;
var map__55235__$1 = cljs.core.__destructure_map(map__55235);
var repl_sources = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55235__$1,new cljs.core.Keyword(null,"repl-sources","repl-sources",723867535));
var runtime__$1 = this;
return shadow.cljs.devtools.client.shared.load_sources(runtime__$1,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.remove.cljs$core$IFn$_invoke$arity$2(shadow.cljs.devtools.client.env.src_is_loaded_QMARK_,repl_sources)),(function (sources){
shadow.cljs.devtools.client.browser.do_js_load(sources);

return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
}));
}));

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$do_repl_require$arity$4 = (function (runtime,p__55243,done,error){
var map__55244 = p__55243;
var map__55244__$1 = cljs.core.__destructure_map(map__55244);
var msg = map__55244__$1;
var sources = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55244__$1,new cljs.core.Keyword(null,"sources","sources",-321166424));
var reload_namespaces = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55244__$1,new cljs.core.Keyword(null,"reload-namespaces","reload-namespaces",250210134));
var js_requires = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55244__$1,new cljs.core.Keyword(null,"js-requires","js-requires",-1311472051));
var runtime__$1 = this;
var sources_to_load = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.remove.cljs$core$IFn$_invoke$arity$2((function (p__55245){
var map__55246 = p__55245;
var map__55246__$1 = cljs.core.__destructure_map(map__55246);
var src = map__55246__$1;
var provides = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55246__$1,new cljs.core.Keyword(null,"provides","provides",-1634397992));
var and__4210__auto__ = shadow.cljs.devtools.client.env.src_is_loaded_QMARK_(src);
if(cljs.core.truth_(and__4210__auto__)){
return cljs.core.not(cljs.core.some(reload_namespaces,provides));
} else {
return and__4210__auto__;
}
}),sources));
if(cljs.core.not(cljs.core.seq(sources_to_load))){
var G__55250 = cljs.core.PersistentVector.EMPTY;
return (done.cljs$core$IFn$_invoke$arity$1 ? done.cljs$core$IFn$_invoke$arity$1(G__55250) : done.call(null,G__55250));
} else {
return shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$3(runtime__$1,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"cljs-load-sources","cljs-load-sources",-1458295962),new cljs.core.Keyword(null,"to","to",192099007),shadow.cljs.devtools.client.env.worker_client_id,new cljs.core.Keyword(null,"sources","sources",-321166424),cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"resource-id","resource-id",-1308422582)),sources_to_load)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cljs-sources","cljs-sources",31121610),(function (p__55254){
var map__55255 = p__55254;
var map__55255__$1 = cljs.core.__destructure_map(map__55255);
var msg__$1 = map__55255__$1;
var sources__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55255__$1,new cljs.core.Keyword(null,"sources","sources",-321166424));
try{shadow.cljs.devtools.client.browser.do_js_load(sources__$1);

if(cljs.core.seq(js_requires)){
shadow.cljs.devtools.client.browser.do_js_requires(js_requires);
} else {
}

return (done.cljs$core$IFn$_invoke$arity$1 ? done.cljs$core$IFn$_invoke$arity$1(sources_to_load) : done.call(null,sources_to_load));
}catch (e55256){var ex = e55256;
return (error.cljs$core$IFn$_invoke$arity$1 ? error.cljs$core$IFn$_invoke$arity$1(ex) : error.call(null,ex));
}})], null));
}
}));

shadow.cljs.devtools.client.shared.add_plugin_BANG_(new cljs.core.Keyword("shadow.cljs.devtools.client.browser","client","shadow.cljs.devtools.client.browser/client",-1461019282),cljs.core.PersistentHashSet.EMPTY,(function (p__55257){
var map__55258 = p__55257;
var map__55258__$1 = cljs.core.__destructure_map(map__55258);
var env = map__55258__$1;
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55258__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
var svc = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"runtime","runtime",-1331573996),runtime], null);
shadow.remote.runtime.api.add_extension(runtime,new cljs.core.Keyword("shadow.cljs.devtools.client.browser","client","shadow.cljs.devtools.client.browser/client",-1461019282),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"on-welcome","on-welcome",1895317125),(function (){
cljs.core.reset_BANG_(shadow.cljs.devtools.client.browser.ws_was_welcome_ref,true);

shadow.cljs.devtools.client.hud.connection_error_clear_BANG_();

shadow.cljs.devtools.client.env.patch_goog_BANG_();

return shadow.cljs.devtools.client.browser.devtools_msg(["#",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"client-id","client-id",-464622140).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(new cljs.core.Keyword(null,"state-ref","state-ref",2127874952).cljs$core$IFn$_invoke$arity$1(runtime))))," ready!"].join(''));
}),new cljs.core.Keyword(null,"on-disconnect","on-disconnect",-809021814),(function (e){
if(cljs.core.truth_(cljs.core.deref(shadow.cljs.devtools.client.browser.ws_was_welcome_ref))){
shadow.cljs.devtools.client.hud.connection_error("The Websocket connection was closed!");

return cljs.core.reset_BANG_(shadow.cljs.devtools.client.browser.ws_was_welcome_ref,false);
} else {
return null;
}
}),new cljs.core.Keyword(null,"on-reconnect","on-reconnect",1239988702),(function (e){
return shadow.cljs.devtools.client.hud.connection_error("Reconnecting ...");
}),new cljs.core.Keyword(null,"ops","ops",1237330063),new cljs.core.PersistentArrayMap(null, 8, [new cljs.core.Keyword(null,"access-denied","access-denied",959449406),(function (msg){
cljs.core.reset_BANG_(shadow.cljs.devtools.client.browser.ws_was_welcome_ref,false);

return shadow.cljs.devtools.client.hud.connection_error(["Stale Output! Your loaded JS was not produced by the running shadow-cljs instance."," Is the watch for this build running?"].join(''));
}),new cljs.core.Keyword(null,"cljs-runtime-init","cljs-runtime-init",1305890232),(function (msg){
return shadow.cljs.devtools.client.browser.repl_init(runtime,msg);
}),new cljs.core.Keyword(null,"cljs-asset-update","cljs-asset-update",1224093028),(function (p__55267){
var map__55268 = p__55267;
var map__55268__$1 = cljs.core.__destructure_map(map__55268);
var msg = map__55268__$1;
var updates = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55268__$1,new cljs.core.Keyword(null,"updates","updates",2013983452));
return shadow.cljs.devtools.client.browser.handle_asset_update(msg);
}),new cljs.core.Keyword(null,"cljs-build-configure","cljs-build-configure",-2089891268),(function (msg){
return null;
}),new cljs.core.Keyword(null,"cljs-build-start","cljs-build-start",-725781241),(function (msg){
shadow.cljs.devtools.client.hud.hud_hide();

shadow.cljs.devtools.client.hud.load_start();

return shadow.cljs.devtools.client.env.run_custom_notify_BANG_(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(msg,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"build-start","build-start",-959649480)));
}),new cljs.core.Keyword(null,"cljs-build-complete","cljs-build-complete",273626153),(function (msg){
var msg__$1 = shadow.cljs.devtools.client.env.add_warnings_to_info(msg);
shadow.cljs.devtools.client.hud.hud_warnings(msg__$1);

shadow.cljs.devtools.client.browser.handle_build_complete(runtime,msg__$1);

return shadow.cljs.devtools.client.env.run_custom_notify_BANG_(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(msg__$1,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"build-complete","build-complete",-501868472)));
}),new cljs.core.Keyword(null,"cljs-build-failure","cljs-build-failure",1718154990),(function (msg){
shadow.cljs.devtools.client.hud.load_end();

shadow.cljs.devtools.client.hud.hud_error(msg);

return shadow.cljs.devtools.client.env.run_custom_notify_BANG_(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(msg,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"build-failure","build-failure",-2107487466)));
}),new cljs.core.Keyword("shadow.cljs.devtools.client.env","worker-notify","shadow.cljs.devtools.client.env/worker-notify",-1456820670),(function (p__55274){
var map__55275 = p__55274;
var map__55275__$1 = cljs.core.__destructure_map(map__55275);
var event_op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55275__$1,new cljs.core.Keyword(null,"event-op","event-op",200358057));
var client_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55275__$1,new cljs.core.Keyword(null,"client-id","client-id",-464622140));
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"client-disconnect","client-disconnect",640227957),event_op)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(client_id,shadow.cljs.devtools.client.env.worker_client_id)))){
shadow.cljs.devtools.client.hud.connection_error_clear_BANG_();

return shadow.cljs.devtools.client.hud.connection_error("The watch for this build was stopped!");
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"client-connect","client-connect",-1113973888),event_op)){
shadow.cljs.devtools.client.hud.connection_error_clear_BANG_();

return shadow.cljs.devtools.client.hud.connection_error("The watch for this build was restarted. Reload required!");
} else {
return null;
}
}
})], null)], null));

return svc;
}),(function (p__55276){
var map__55277 = p__55276;
var map__55277__$1 = cljs.core.__destructure_map(map__55277);
var svc = map__55277__$1;
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55277__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
return shadow.remote.runtime.api.del_extension(runtime,new cljs.core.Keyword("shadow.cljs.devtools.client.browser","client","shadow.cljs.devtools.client.browser/client",-1461019282));
}));

shadow.cljs.devtools.client.shared.init_runtime_BANG_(shadow.cljs.devtools.client.browser.client_info,shadow.cljs.devtools.client.websocket.start,shadow.cljs.devtools.client.websocket.send,shadow.cljs.devtools.client.websocket.stop);
} else {
}

//# sourceMappingURL=shadow.cljs.devtools.client.browser.js.map

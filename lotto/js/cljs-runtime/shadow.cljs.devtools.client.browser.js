goog.provide('shadow.cljs.devtools.client.browser');
shadow.cljs.devtools.client.browser.devtools_msg = (function shadow$cljs$devtools$client$browser$devtools_msg(var_args){
var args__5775__auto__ = [];
var len__5769__auto___42967 = arguments.length;
var i__5770__auto___42968 = (0);
while(true){
if((i__5770__auto___42968 < len__5769__auto___42967)){
args__5775__auto__.push((arguments[i__5770__auto___42968]));

var G__42969 = (i__5770__auto___42968 + (1));
i__5770__auto___42968 = G__42969;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
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
(shadow.cljs.devtools.client.browser.devtools_msg.cljs$lang$applyTo = (function (seq42683){
var G__42684 = cljs.core.first(seq42683);
var seq42683__$1 = cljs.core.next(seq42683);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__42684,seq42683__$1);
}));

shadow.cljs.devtools.client.browser.script_eval = (function shadow$cljs$devtools$client$browser$script_eval(code){
return goog.globalEval(code);
});
shadow.cljs.devtools.client.browser.do_js_load = (function shadow$cljs$devtools$client$browser$do_js_load(sources){
var seq__42687 = cljs.core.seq(sources);
var chunk__42688 = null;
var count__42689 = (0);
var i__42690 = (0);
while(true){
if((i__42690 < count__42689)){
var map__42695 = chunk__42688.cljs$core$IIndexed$_nth$arity$2(null,i__42690);
var map__42695__$1 = cljs.core.__destructure_map(map__42695);
var src = map__42695__$1;
var resource_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42695__$1,new cljs.core.Keyword(null,"resource-id","resource-id",-1308422582));
var output_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42695__$1,new cljs.core.Keyword(null,"output-name","output-name",-1769107767));
var resource_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42695__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
var js = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42695__$1,new cljs.core.Keyword(null,"js","js",1768080579));
$CLJS.SHADOW_ENV.setLoaded(output_name);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load JS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([resource_name], 0));

shadow.cljs.devtools.client.env.before_load_src(src);

try{shadow.cljs.devtools.client.browser.script_eval([cljs.core.str.cljs$core$IFn$_invoke$arity$1(js),"\n//# sourceURL=",cljs.core.str.cljs$core$IFn$_invoke$arity$1($CLJS.SHADOW_ENV.scriptBase),cljs.core.str.cljs$core$IFn$_invoke$arity$1(output_name)].join(''));
}catch (e42697){var e_42970 = e42697;
if(shadow.cljs.devtools.client.env.log){
console.error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name)].join(''),e_42970);
} else {
}

throw (new Error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name),": ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(e_42970.message)].join('')));
}

var G__42971 = seq__42687;
var G__42972 = chunk__42688;
var G__42973 = count__42689;
var G__42974 = (i__42690 + (1));
seq__42687 = G__42971;
chunk__42688 = G__42972;
count__42689 = G__42973;
i__42690 = G__42974;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__42687);
if(temp__5804__auto__){
var seq__42687__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__42687__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__42687__$1);
var G__42975 = cljs.core.chunk_rest(seq__42687__$1);
var G__42976 = c__5568__auto__;
var G__42977 = cljs.core.count(c__5568__auto__);
var G__42978 = (0);
seq__42687 = G__42975;
chunk__42688 = G__42976;
count__42689 = G__42977;
i__42690 = G__42978;
continue;
} else {
var map__42699 = cljs.core.first(seq__42687__$1);
var map__42699__$1 = cljs.core.__destructure_map(map__42699);
var src = map__42699__$1;
var resource_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42699__$1,new cljs.core.Keyword(null,"resource-id","resource-id",-1308422582));
var output_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42699__$1,new cljs.core.Keyword(null,"output-name","output-name",-1769107767));
var resource_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42699__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
var js = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42699__$1,new cljs.core.Keyword(null,"js","js",1768080579));
$CLJS.SHADOW_ENV.setLoaded(output_name);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load JS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([resource_name], 0));

shadow.cljs.devtools.client.env.before_load_src(src);

try{shadow.cljs.devtools.client.browser.script_eval([cljs.core.str.cljs$core$IFn$_invoke$arity$1(js),"\n//# sourceURL=",cljs.core.str.cljs$core$IFn$_invoke$arity$1($CLJS.SHADOW_ENV.scriptBase),cljs.core.str.cljs$core$IFn$_invoke$arity$1(output_name)].join(''));
}catch (e42700){var e_42979 = e42700;
if(shadow.cljs.devtools.client.env.log){
console.error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name)].join(''),e_42979);
} else {
}

throw (new Error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name),": ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(e_42979.message)].join('')));
}

var G__42980 = cljs.core.next(seq__42687__$1);
var G__42981 = null;
var G__42982 = (0);
var G__42983 = (0);
seq__42687 = G__42980;
chunk__42688 = G__42981;
count__42689 = G__42982;
i__42690 = G__42983;
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
var seq__42701 = cljs.core.seq(js_requires);
var chunk__42702 = null;
var count__42703 = (0);
var i__42704 = (0);
while(true){
if((i__42704 < count__42703)){
var js_ns = chunk__42702.cljs$core$IIndexed$_nth$arity$2(null,i__42704);
var require_str_42984 = ["var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns)," = shadow.js.require(\"",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns),"\");"].join('');
shadow.cljs.devtools.client.browser.script_eval(require_str_42984);


var G__42985 = seq__42701;
var G__42986 = chunk__42702;
var G__42987 = count__42703;
var G__42988 = (i__42704 + (1));
seq__42701 = G__42985;
chunk__42702 = G__42986;
count__42703 = G__42987;
i__42704 = G__42988;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__42701);
if(temp__5804__auto__){
var seq__42701__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__42701__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__42701__$1);
var G__42989 = cljs.core.chunk_rest(seq__42701__$1);
var G__42990 = c__5568__auto__;
var G__42991 = cljs.core.count(c__5568__auto__);
var G__42992 = (0);
seq__42701 = G__42989;
chunk__42702 = G__42990;
count__42703 = G__42991;
i__42704 = G__42992;
continue;
} else {
var js_ns = cljs.core.first(seq__42701__$1);
var require_str_42993 = ["var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns)," = shadow.js.require(\"",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns),"\");"].join('');
shadow.cljs.devtools.client.browser.script_eval(require_str_42993);


var G__42994 = cljs.core.next(seq__42701__$1);
var G__42995 = null;
var G__42996 = (0);
var G__42997 = (0);
seq__42701 = G__42994;
chunk__42702 = G__42995;
count__42703 = G__42996;
i__42704 = G__42997;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.cljs.devtools.client.browser.handle_build_complete = (function shadow$cljs$devtools$client$browser$handle_build_complete(runtime,p__42706){
var map__42707 = p__42706;
var map__42707__$1 = cljs.core.__destructure_map(map__42707);
var msg = map__42707__$1;
var info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42707__$1,new cljs.core.Keyword(null,"info","info",-317069002));
var reload_info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42707__$1,new cljs.core.Keyword(null,"reload-info","reload-info",1648088086));
var warnings = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.distinct.cljs$core$IFn$_invoke$arity$1((function (){var iter__5523__auto__ = (function shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__42708(s__42709){
return (new cljs.core.LazySeq(null,(function (){
var s__42709__$1 = s__42709;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__42709__$1);
if(temp__5804__auto__){
var xs__6360__auto__ = temp__5804__auto__;
var map__42714 = cljs.core.first(xs__6360__auto__);
var map__42714__$1 = cljs.core.__destructure_map(map__42714);
var src = map__42714__$1;
var resource_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42714__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
var warnings = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42714__$1,new cljs.core.Keyword(null,"warnings","warnings",-735437651));
if(cljs.core.not(new cljs.core.Keyword(null,"from-jar","from-jar",1050932827).cljs$core$IFn$_invoke$arity$1(src))){
var iterys__5519__auto__ = ((function (s__42709__$1,map__42714,map__42714__$1,src,resource_name,warnings,xs__6360__auto__,temp__5804__auto__,map__42707,map__42707__$1,msg,info,reload_info){
return (function shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__42708_$_iter__42710(s__42711){
return (new cljs.core.LazySeq(null,((function (s__42709__$1,map__42714,map__42714__$1,src,resource_name,warnings,xs__6360__auto__,temp__5804__auto__,map__42707,map__42707__$1,msg,info,reload_info){
return (function (){
var s__42711__$1 = s__42711;
while(true){
var temp__5804__auto____$1 = cljs.core.seq(s__42711__$1);
if(temp__5804__auto____$1){
var s__42711__$2 = temp__5804__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__42711__$2)){
var c__5521__auto__ = cljs.core.chunk_first(s__42711__$2);
var size__5522__auto__ = cljs.core.count(c__5521__auto__);
var b__42713 = cljs.core.chunk_buffer(size__5522__auto__);
if((function (){var i__42712 = (0);
while(true){
if((i__42712 < size__5522__auto__)){
var warning = cljs.core._nth(c__5521__auto__,i__42712);
cljs.core.chunk_append(b__42713,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(warning,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100),resource_name));

var G__42998 = (i__42712 + (1));
i__42712 = G__42998;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__42713),shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__42708_$_iter__42710(cljs.core.chunk_rest(s__42711__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__42713),null);
}
} else {
var warning = cljs.core.first(s__42711__$2);
return cljs.core.cons(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(warning,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100),resource_name),shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__42708_$_iter__42710(cljs.core.rest(s__42711__$2)));
}
} else {
return null;
}
break;
}
});})(s__42709__$1,map__42714,map__42714__$1,src,resource_name,warnings,xs__6360__auto__,temp__5804__auto__,map__42707,map__42707__$1,msg,info,reload_info))
,null,null));
});})(s__42709__$1,map__42714,map__42714__$1,src,resource_name,warnings,xs__6360__auto__,temp__5804__auto__,map__42707,map__42707__$1,msg,info,reload_info))
;
var fs__5520__auto__ = cljs.core.seq(iterys__5519__auto__(warnings));
if(fs__5520__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5520__auto__,shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__42708(cljs.core.rest(s__42709__$1)));
} else {
var G__42999 = cljs.core.rest(s__42709__$1);
s__42709__$1 = G__42999;
continue;
}
} else {
var G__43000 = cljs.core.rest(s__42709__$1);
s__42709__$1 = G__43000;
continue;
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__(new cljs.core.Keyword(null,"sources","sources",-321166424).cljs$core$IFn$_invoke$arity$1(info));
})()));
if(shadow.cljs.devtools.client.env.log){
var seq__42715_43001 = cljs.core.seq(warnings);
var chunk__42716_43002 = null;
var count__42717_43003 = (0);
var i__42718_43004 = (0);
while(true){
if((i__42718_43004 < count__42717_43003)){
var map__42721_43005 = chunk__42716_43002.cljs$core$IIndexed$_nth$arity$2(null,i__42718_43004);
var map__42721_43006__$1 = cljs.core.__destructure_map(map__42721_43005);
var w_43007 = map__42721_43006__$1;
var msg_43008__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42721_43006__$1,new cljs.core.Keyword(null,"msg","msg",-1386103444));
var line_43009 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42721_43006__$1,new cljs.core.Keyword(null,"line","line",212345235));
var column_43010 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42721_43006__$1,new cljs.core.Keyword(null,"column","column",2078222095));
var resource_name_43011 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42721_43006__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
console.warn(["BUILD-WARNING in ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name_43011)," at [",cljs.core.str.cljs$core$IFn$_invoke$arity$1(line_43009),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(column_43010),"]\n\t",cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg_43008__$1)].join(''));


var G__43012 = seq__42715_43001;
var G__43013 = chunk__42716_43002;
var G__43014 = count__42717_43003;
var G__43015 = (i__42718_43004 + (1));
seq__42715_43001 = G__43012;
chunk__42716_43002 = G__43013;
count__42717_43003 = G__43014;
i__42718_43004 = G__43015;
continue;
} else {
var temp__5804__auto___43016 = cljs.core.seq(seq__42715_43001);
if(temp__5804__auto___43016){
var seq__42715_43017__$1 = temp__5804__auto___43016;
if(cljs.core.chunked_seq_QMARK_(seq__42715_43017__$1)){
var c__5568__auto___43018 = cljs.core.chunk_first(seq__42715_43017__$1);
var G__43019 = cljs.core.chunk_rest(seq__42715_43017__$1);
var G__43020 = c__5568__auto___43018;
var G__43021 = cljs.core.count(c__5568__auto___43018);
var G__43022 = (0);
seq__42715_43001 = G__43019;
chunk__42716_43002 = G__43020;
count__42717_43003 = G__43021;
i__42718_43004 = G__43022;
continue;
} else {
var map__42722_43023 = cljs.core.first(seq__42715_43017__$1);
var map__42722_43024__$1 = cljs.core.__destructure_map(map__42722_43023);
var w_43025 = map__42722_43024__$1;
var msg_43026__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42722_43024__$1,new cljs.core.Keyword(null,"msg","msg",-1386103444));
var line_43027 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42722_43024__$1,new cljs.core.Keyword(null,"line","line",212345235));
var column_43028 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42722_43024__$1,new cljs.core.Keyword(null,"column","column",2078222095));
var resource_name_43029 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42722_43024__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
console.warn(["BUILD-WARNING in ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name_43029)," at [",cljs.core.str.cljs$core$IFn$_invoke$arity$1(line_43027),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(column_43028),"]\n\t",cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg_43026__$1)].join(''));


var G__43030 = cljs.core.next(seq__42715_43017__$1);
var G__43031 = null;
var G__43032 = (0);
var G__43033 = (0);
seq__42715_43001 = G__43030;
chunk__42716_43002 = G__43031;
count__42717_43003 = G__43032;
i__42718_43004 = G__43033;
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

return shadow.cljs.devtools.client.shared.load_sources(runtime,sources_to_get,(function (p1__42705_SHARP_){
return shadow.cljs.devtools.client.browser.do_js_reload(msg,p1__42705_SHARP_,shadow.cljs.devtools.client.hud.load_end_success,shadow.cljs.devtools.client.hud.load_failure);
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
var and__5043__auto__ = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$1(shadow.cljs.devtools.client.browser.page_load_uri.hasSameDomainAs(node_uri))) || (cljs.core.not(node_uri.hasDomain())));
if(and__5043__auto__){
var and__5043__auto____$1 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(node_abs,new$);
if(and__5043__auto____$1){
return new$;
} else {
return and__5043__auto____$1;
}
} else {
return and__5043__auto__;
}
}
});
shadow.cljs.devtools.client.browser.handle_asset_update = (function shadow$cljs$devtools$client$browser$handle_asset_update(p__42723){
var map__42724 = p__42723;
var map__42724__$1 = cljs.core.__destructure_map(map__42724);
var msg = map__42724__$1;
var updates = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42724__$1,new cljs.core.Keyword(null,"updates","updates",2013983452));
var reload_info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42724__$1,new cljs.core.Keyword(null,"reload-info","reload-info",1648088086));
var seq__42725 = cljs.core.seq(updates);
var chunk__42727 = null;
var count__42728 = (0);
var i__42729 = (0);
while(true){
if((i__42729 < count__42728)){
var path = chunk__42727.cljs$core$IIndexed$_nth$arity$2(null,i__42729);
if(clojure.string.ends_with_QMARK_(path,"css")){
var seq__42839_43034 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(document.querySelectorAll("link[rel=\"stylesheet\"]")));
var chunk__42843_43035 = null;
var count__42844_43036 = (0);
var i__42845_43037 = (0);
while(true){
if((i__42845_43037 < count__42844_43036)){
var node_43038 = chunk__42843_43035.cljs$core$IIndexed$_nth$arity$2(null,i__42845_43037);
if(cljs.core.not(node_43038.shadow$old)){
var path_match_43039 = shadow.cljs.devtools.client.browser.match_paths(node_43038.getAttribute("href"),path);
if(cljs.core.truth_(path_match_43039)){
var new_link_43040 = (function (){var G__42871 = node_43038.cloneNode(true);
G__42871.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_43039),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__42871;
})();
(node_43038.shadow$old = true);

(new_link_43040.onload = ((function (seq__42839_43034,chunk__42843_43035,count__42844_43036,i__42845_43037,seq__42725,chunk__42727,count__42728,i__42729,new_link_43040,path_match_43039,node_43038,path,map__42724,map__42724__$1,msg,updates,reload_info){
return (function (e){
var seq__42872_43041 = cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"asset-load","asset-load",-1925902322)], null)));
var chunk__42874_43042 = null;
var count__42875_43043 = (0);
var i__42876_43044 = (0);
while(true){
if((i__42876_43044 < count__42875_43043)){
var map__42880_43045 = chunk__42874_43042.cljs$core$IIndexed$_nth$arity$2(null,i__42876_43044);
var map__42880_43046__$1 = cljs.core.__destructure_map(map__42880_43045);
var task_43047 = map__42880_43046__$1;
var fn_str_43048 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42880_43046__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_43049 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42880_43046__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_43050 = goog.getObjectByName(fn_str_43048,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_43049)].join(''));

(fn_obj_43050.cljs$core$IFn$_invoke$arity$2 ? fn_obj_43050.cljs$core$IFn$_invoke$arity$2(path,new_link_43040) : fn_obj_43050.call(null,path,new_link_43040));


var G__43051 = seq__42872_43041;
var G__43052 = chunk__42874_43042;
var G__43053 = count__42875_43043;
var G__43054 = (i__42876_43044 + (1));
seq__42872_43041 = G__43051;
chunk__42874_43042 = G__43052;
count__42875_43043 = G__43053;
i__42876_43044 = G__43054;
continue;
} else {
var temp__5804__auto___43055 = cljs.core.seq(seq__42872_43041);
if(temp__5804__auto___43055){
var seq__42872_43056__$1 = temp__5804__auto___43055;
if(cljs.core.chunked_seq_QMARK_(seq__42872_43056__$1)){
var c__5568__auto___43057 = cljs.core.chunk_first(seq__42872_43056__$1);
var G__43058 = cljs.core.chunk_rest(seq__42872_43056__$1);
var G__43059 = c__5568__auto___43057;
var G__43060 = cljs.core.count(c__5568__auto___43057);
var G__43061 = (0);
seq__42872_43041 = G__43058;
chunk__42874_43042 = G__43059;
count__42875_43043 = G__43060;
i__42876_43044 = G__43061;
continue;
} else {
var map__42881_43062 = cljs.core.first(seq__42872_43056__$1);
var map__42881_43063__$1 = cljs.core.__destructure_map(map__42881_43062);
var task_43064 = map__42881_43063__$1;
var fn_str_43065 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42881_43063__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_43066 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42881_43063__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_43067 = goog.getObjectByName(fn_str_43065,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_43066)].join(''));

(fn_obj_43067.cljs$core$IFn$_invoke$arity$2 ? fn_obj_43067.cljs$core$IFn$_invoke$arity$2(path,new_link_43040) : fn_obj_43067.call(null,path,new_link_43040));


var G__43068 = cljs.core.next(seq__42872_43056__$1);
var G__43069 = null;
var G__43070 = (0);
var G__43071 = (0);
seq__42872_43041 = G__43068;
chunk__42874_43042 = G__43069;
count__42875_43043 = G__43070;
i__42876_43044 = G__43071;
continue;
}
} else {
}
}
break;
}

return goog.dom.removeNode(node_43038);
});})(seq__42839_43034,chunk__42843_43035,count__42844_43036,i__42845_43037,seq__42725,chunk__42727,count__42728,i__42729,new_link_43040,path_match_43039,node_43038,path,map__42724,map__42724__$1,msg,updates,reload_info))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_43039], 0));

goog.dom.insertSiblingAfter(new_link_43040,node_43038);


var G__43072 = seq__42839_43034;
var G__43073 = chunk__42843_43035;
var G__43074 = count__42844_43036;
var G__43075 = (i__42845_43037 + (1));
seq__42839_43034 = G__43072;
chunk__42843_43035 = G__43073;
count__42844_43036 = G__43074;
i__42845_43037 = G__43075;
continue;
} else {
var G__43076 = seq__42839_43034;
var G__43077 = chunk__42843_43035;
var G__43078 = count__42844_43036;
var G__43079 = (i__42845_43037 + (1));
seq__42839_43034 = G__43076;
chunk__42843_43035 = G__43077;
count__42844_43036 = G__43078;
i__42845_43037 = G__43079;
continue;
}
} else {
var G__43080 = seq__42839_43034;
var G__43081 = chunk__42843_43035;
var G__43082 = count__42844_43036;
var G__43083 = (i__42845_43037 + (1));
seq__42839_43034 = G__43080;
chunk__42843_43035 = G__43081;
count__42844_43036 = G__43082;
i__42845_43037 = G__43083;
continue;
}
} else {
var temp__5804__auto___43084 = cljs.core.seq(seq__42839_43034);
if(temp__5804__auto___43084){
var seq__42839_43085__$1 = temp__5804__auto___43084;
if(cljs.core.chunked_seq_QMARK_(seq__42839_43085__$1)){
var c__5568__auto___43086 = cljs.core.chunk_first(seq__42839_43085__$1);
var G__43087 = cljs.core.chunk_rest(seq__42839_43085__$1);
var G__43088 = c__5568__auto___43086;
var G__43089 = cljs.core.count(c__5568__auto___43086);
var G__43090 = (0);
seq__42839_43034 = G__43087;
chunk__42843_43035 = G__43088;
count__42844_43036 = G__43089;
i__42845_43037 = G__43090;
continue;
} else {
var node_43091 = cljs.core.first(seq__42839_43085__$1);
if(cljs.core.not(node_43091.shadow$old)){
var path_match_43092 = shadow.cljs.devtools.client.browser.match_paths(node_43091.getAttribute("href"),path);
if(cljs.core.truth_(path_match_43092)){
var new_link_43093 = (function (){var G__42882 = node_43091.cloneNode(true);
G__42882.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_43092),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__42882;
})();
(node_43091.shadow$old = true);

(new_link_43093.onload = ((function (seq__42839_43034,chunk__42843_43035,count__42844_43036,i__42845_43037,seq__42725,chunk__42727,count__42728,i__42729,new_link_43093,path_match_43092,node_43091,seq__42839_43085__$1,temp__5804__auto___43084,path,map__42724,map__42724__$1,msg,updates,reload_info){
return (function (e){
var seq__42883_43094 = cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"asset-load","asset-load",-1925902322)], null)));
var chunk__42885_43095 = null;
var count__42886_43096 = (0);
var i__42887_43097 = (0);
while(true){
if((i__42887_43097 < count__42886_43096)){
var map__42891_43098 = chunk__42885_43095.cljs$core$IIndexed$_nth$arity$2(null,i__42887_43097);
var map__42891_43099__$1 = cljs.core.__destructure_map(map__42891_43098);
var task_43100 = map__42891_43099__$1;
var fn_str_43101 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42891_43099__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_43102 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42891_43099__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_43103 = goog.getObjectByName(fn_str_43101,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_43102)].join(''));

(fn_obj_43103.cljs$core$IFn$_invoke$arity$2 ? fn_obj_43103.cljs$core$IFn$_invoke$arity$2(path,new_link_43093) : fn_obj_43103.call(null,path,new_link_43093));


var G__43104 = seq__42883_43094;
var G__43105 = chunk__42885_43095;
var G__43106 = count__42886_43096;
var G__43107 = (i__42887_43097 + (1));
seq__42883_43094 = G__43104;
chunk__42885_43095 = G__43105;
count__42886_43096 = G__43106;
i__42887_43097 = G__43107;
continue;
} else {
var temp__5804__auto___43108__$1 = cljs.core.seq(seq__42883_43094);
if(temp__5804__auto___43108__$1){
var seq__42883_43109__$1 = temp__5804__auto___43108__$1;
if(cljs.core.chunked_seq_QMARK_(seq__42883_43109__$1)){
var c__5568__auto___43110 = cljs.core.chunk_first(seq__42883_43109__$1);
var G__43111 = cljs.core.chunk_rest(seq__42883_43109__$1);
var G__43112 = c__5568__auto___43110;
var G__43113 = cljs.core.count(c__5568__auto___43110);
var G__43114 = (0);
seq__42883_43094 = G__43111;
chunk__42885_43095 = G__43112;
count__42886_43096 = G__43113;
i__42887_43097 = G__43114;
continue;
} else {
var map__42892_43115 = cljs.core.first(seq__42883_43109__$1);
var map__42892_43116__$1 = cljs.core.__destructure_map(map__42892_43115);
var task_43117 = map__42892_43116__$1;
var fn_str_43118 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42892_43116__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_43119 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42892_43116__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_43120 = goog.getObjectByName(fn_str_43118,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_43119)].join(''));

(fn_obj_43120.cljs$core$IFn$_invoke$arity$2 ? fn_obj_43120.cljs$core$IFn$_invoke$arity$2(path,new_link_43093) : fn_obj_43120.call(null,path,new_link_43093));


var G__43121 = cljs.core.next(seq__42883_43109__$1);
var G__43122 = null;
var G__43123 = (0);
var G__43124 = (0);
seq__42883_43094 = G__43121;
chunk__42885_43095 = G__43122;
count__42886_43096 = G__43123;
i__42887_43097 = G__43124;
continue;
}
} else {
}
}
break;
}

return goog.dom.removeNode(node_43091);
});})(seq__42839_43034,chunk__42843_43035,count__42844_43036,i__42845_43037,seq__42725,chunk__42727,count__42728,i__42729,new_link_43093,path_match_43092,node_43091,seq__42839_43085__$1,temp__5804__auto___43084,path,map__42724,map__42724__$1,msg,updates,reload_info))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_43092], 0));

goog.dom.insertSiblingAfter(new_link_43093,node_43091);


var G__43125 = cljs.core.next(seq__42839_43085__$1);
var G__43126 = null;
var G__43127 = (0);
var G__43128 = (0);
seq__42839_43034 = G__43125;
chunk__42843_43035 = G__43126;
count__42844_43036 = G__43127;
i__42845_43037 = G__43128;
continue;
} else {
var G__43129 = cljs.core.next(seq__42839_43085__$1);
var G__43130 = null;
var G__43131 = (0);
var G__43132 = (0);
seq__42839_43034 = G__43129;
chunk__42843_43035 = G__43130;
count__42844_43036 = G__43131;
i__42845_43037 = G__43132;
continue;
}
} else {
var G__43133 = cljs.core.next(seq__42839_43085__$1);
var G__43134 = null;
var G__43135 = (0);
var G__43136 = (0);
seq__42839_43034 = G__43133;
chunk__42843_43035 = G__43134;
count__42844_43036 = G__43135;
i__42845_43037 = G__43136;
continue;
}
}
} else {
}
}
break;
}


var G__43137 = seq__42725;
var G__43138 = chunk__42727;
var G__43139 = count__42728;
var G__43140 = (i__42729 + (1));
seq__42725 = G__43137;
chunk__42727 = G__43138;
count__42728 = G__43139;
i__42729 = G__43140;
continue;
} else {
var G__43141 = seq__42725;
var G__43142 = chunk__42727;
var G__43143 = count__42728;
var G__43144 = (i__42729 + (1));
seq__42725 = G__43141;
chunk__42727 = G__43142;
count__42728 = G__43143;
i__42729 = G__43144;
continue;
}
} else {
var temp__5804__auto__ = cljs.core.seq(seq__42725);
if(temp__5804__auto__){
var seq__42725__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__42725__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__42725__$1);
var G__43145 = cljs.core.chunk_rest(seq__42725__$1);
var G__43146 = c__5568__auto__;
var G__43147 = cljs.core.count(c__5568__auto__);
var G__43148 = (0);
seq__42725 = G__43145;
chunk__42727 = G__43146;
count__42728 = G__43147;
i__42729 = G__43148;
continue;
} else {
var path = cljs.core.first(seq__42725__$1);
if(clojure.string.ends_with_QMARK_(path,"css")){
var seq__42893_43149 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(document.querySelectorAll("link[rel=\"stylesheet\"]")));
var chunk__42897_43150 = null;
var count__42898_43151 = (0);
var i__42899_43152 = (0);
while(true){
if((i__42899_43152 < count__42898_43151)){
var node_43153 = chunk__42897_43150.cljs$core$IIndexed$_nth$arity$2(null,i__42899_43152);
if(cljs.core.not(node_43153.shadow$old)){
var path_match_43154 = shadow.cljs.devtools.client.browser.match_paths(node_43153.getAttribute("href"),path);
if(cljs.core.truth_(path_match_43154)){
var new_link_43155 = (function (){var G__42925 = node_43153.cloneNode(true);
G__42925.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_43154),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__42925;
})();
(node_43153.shadow$old = true);

(new_link_43155.onload = ((function (seq__42893_43149,chunk__42897_43150,count__42898_43151,i__42899_43152,seq__42725,chunk__42727,count__42728,i__42729,new_link_43155,path_match_43154,node_43153,path,seq__42725__$1,temp__5804__auto__,map__42724,map__42724__$1,msg,updates,reload_info){
return (function (e){
var seq__42926_43156 = cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"asset-load","asset-load",-1925902322)], null)));
var chunk__42928_43157 = null;
var count__42929_43158 = (0);
var i__42930_43159 = (0);
while(true){
if((i__42930_43159 < count__42929_43158)){
var map__42934_43160 = chunk__42928_43157.cljs$core$IIndexed$_nth$arity$2(null,i__42930_43159);
var map__42934_43161__$1 = cljs.core.__destructure_map(map__42934_43160);
var task_43162 = map__42934_43161__$1;
var fn_str_43163 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42934_43161__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_43164 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42934_43161__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_43165 = goog.getObjectByName(fn_str_43163,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_43164)].join(''));

(fn_obj_43165.cljs$core$IFn$_invoke$arity$2 ? fn_obj_43165.cljs$core$IFn$_invoke$arity$2(path,new_link_43155) : fn_obj_43165.call(null,path,new_link_43155));


var G__43166 = seq__42926_43156;
var G__43167 = chunk__42928_43157;
var G__43168 = count__42929_43158;
var G__43169 = (i__42930_43159 + (1));
seq__42926_43156 = G__43166;
chunk__42928_43157 = G__43167;
count__42929_43158 = G__43168;
i__42930_43159 = G__43169;
continue;
} else {
var temp__5804__auto___43170__$1 = cljs.core.seq(seq__42926_43156);
if(temp__5804__auto___43170__$1){
var seq__42926_43171__$1 = temp__5804__auto___43170__$1;
if(cljs.core.chunked_seq_QMARK_(seq__42926_43171__$1)){
var c__5568__auto___43172 = cljs.core.chunk_first(seq__42926_43171__$1);
var G__43173 = cljs.core.chunk_rest(seq__42926_43171__$1);
var G__43174 = c__5568__auto___43172;
var G__43175 = cljs.core.count(c__5568__auto___43172);
var G__43176 = (0);
seq__42926_43156 = G__43173;
chunk__42928_43157 = G__43174;
count__42929_43158 = G__43175;
i__42930_43159 = G__43176;
continue;
} else {
var map__42935_43177 = cljs.core.first(seq__42926_43171__$1);
var map__42935_43178__$1 = cljs.core.__destructure_map(map__42935_43177);
var task_43179 = map__42935_43178__$1;
var fn_str_43180 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42935_43178__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_43181 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42935_43178__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_43182 = goog.getObjectByName(fn_str_43180,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_43181)].join(''));

(fn_obj_43182.cljs$core$IFn$_invoke$arity$2 ? fn_obj_43182.cljs$core$IFn$_invoke$arity$2(path,new_link_43155) : fn_obj_43182.call(null,path,new_link_43155));


var G__43183 = cljs.core.next(seq__42926_43171__$1);
var G__43184 = null;
var G__43185 = (0);
var G__43186 = (0);
seq__42926_43156 = G__43183;
chunk__42928_43157 = G__43184;
count__42929_43158 = G__43185;
i__42930_43159 = G__43186;
continue;
}
} else {
}
}
break;
}

return goog.dom.removeNode(node_43153);
});})(seq__42893_43149,chunk__42897_43150,count__42898_43151,i__42899_43152,seq__42725,chunk__42727,count__42728,i__42729,new_link_43155,path_match_43154,node_43153,path,seq__42725__$1,temp__5804__auto__,map__42724,map__42724__$1,msg,updates,reload_info))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_43154], 0));

goog.dom.insertSiblingAfter(new_link_43155,node_43153);


var G__43187 = seq__42893_43149;
var G__43188 = chunk__42897_43150;
var G__43189 = count__42898_43151;
var G__43190 = (i__42899_43152 + (1));
seq__42893_43149 = G__43187;
chunk__42897_43150 = G__43188;
count__42898_43151 = G__43189;
i__42899_43152 = G__43190;
continue;
} else {
var G__43191 = seq__42893_43149;
var G__43192 = chunk__42897_43150;
var G__43193 = count__42898_43151;
var G__43194 = (i__42899_43152 + (1));
seq__42893_43149 = G__43191;
chunk__42897_43150 = G__43192;
count__42898_43151 = G__43193;
i__42899_43152 = G__43194;
continue;
}
} else {
var G__43195 = seq__42893_43149;
var G__43196 = chunk__42897_43150;
var G__43197 = count__42898_43151;
var G__43198 = (i__42899_43152 + (1));
seq__42893_43149 = G__43195;
chunk__42897_43150 = G__43196;
count__42898_43151 = G__43197;
i__42899_43152 = G__43198;
continue;
}
} else {
var temp__5804__auto___43199__$1 = cljs.core.seq(seq__42893_43149);
if(temp__5804__auto___43199__$1){
var seq__42893_43200__$1 = temp__5804__auto___43199__$1;
if(cljs.core.chunked_seq_QMARK_(seq__42893_43200__$1)){
var c__5568__auto___43201 = cljs.core.chunk_first(seq__42893_43200__$1);
var G__43202 = cljs.core.chunk_rest(seq__42893_43200__$1);
var G__43203 = c__5568__auto___43201;
var G__43204 = cljs.core.count(c__5568__auto___43201);
var G__43205 = (0);
seq__42893_43149 = G__43202;
chunk__42897_43150 = G__43203;
count__42898_43151 = G__43204;
i__42899_43152 = G__43205;
continue;
} else {
var node_43206 = cljs.core.first(seq__42893_43200__$1);
if(cljs.core.not(node_43206.shadow$old)){
var path_match_43207 = shadow.cljs.devtools.client.browser.match_paths(node_43206.getAttribute("href"),path);
if(cljs.core.truth_(path_match_43207)){
var new_link_43208 = (function (){var G__42936 = node_43206.cloneNode(true);
G__42936.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_43207),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__42936;
})();
(node_43206.shadow$old = true);

(new_link_43208.onload = ((function (seq__42893_43149,chunk__42897_43150,count__42898_43151,i__42899_43152,seq__42725,chunk__42727,count__42728,i__42729,new_link_43208,path_match_43207,node_43206,seq__42893_43200__$1,temp__5804__auto___43199__$1,path,seq__42725__$1,temp__5804__auto__,map__42724,map__42724__$1,msg,updates,reload_info){
return (function (e){
var seq__42937_43209 = cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"asset-load","asset-load",-1925902322)], null)));
var chunk__42939_43210 = null;
var count__42940_43211 = (0);
var i__42941_43212 = (0);
while(true){
if((i__42941_43212 < count__42940_43211)){
var map__42945_43213 = chunk__42939_43210.cljs$core$IIndexed$_nth$arity$2(null,i__42941_43212);
var map__42945_43214__$1 = cljs.core.__destructure_map(map__42945_43213);
var task_43215 = map__42945_43214__$1;
var fn_str_43216 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42945_43214__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_43217 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42945_43214__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_43218 = goog.getObjectByName(fn_str_43216,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_43217)].join(''));

(fn_obj_43218.cljs$core$IFn$_invoke$arity$2 ? fn_obj_43218.cljs$core$IFn$_invoke$arity$2(path,new_link_43208) : fn_obj_43218.call(null,path,new_link_43208));


var G__43219 = seq__42937_43209;
var G__43220 = chunk__42939_43210;
var G__43221 = count__42940_43211;
var G__43222 = (i__42941_43212 + (1));
seq__42937_43209 = G__43219;
chunk__42939_43210 = G__43220;
count__42940_43211 = G__43221;
i__42941_43212 = G__43222;
continue;
} else {
var temp__5804__auto___43223__$2 = cljs.core.seq(seq__42937_43209);
if(temp__5804__auto___43223__$2){
var seq__42937_43224__$1 = temp__5804__auto___43223__$2;
if(cljs.core.chunked_seq_QMARK_(seq__42937_43224__$1)){
var c__5568__auto___43225 = cljs.core.chunk_first(seq__42937_43224__$1);
var G__43226 = cljs.core.chunk_rest(seq__42937_43224__$1);
var G__43227 = c__5568__auto___43225;
var G__43228 = cljs.core.count(c__5568__auto___43225);
var G__43229 = (0);
seq__42937_43209 = G__43226;
chunk__42939_43210 = G__43227;
count__42940_43211 = G__43228;
i__42941_43212 = G__43229;
continue;
} else {
var map__42946_43230 = cljs.core.first(seq__42937_43224__$1);
var map__42946_43231__$1 = cljs.core.__destructure_map(map__42946_43230);
var task_43232 = map__42946_43231__$1;
var fn_str_43233 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42946_43231__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_43234 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42946_43231__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_43235 = goog.getObjectByName(fn_str_43233,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_43234)].join(''));

(fn_obj_43235.cljs$core$IFn$_invoke$arity$2 ? fn_obj_43235.cljs$core$IFn$_invoke$arity$2(path,new_link_43208) : fn_obj_43235.call(null,path,new_link_43208));


var G__43236 = cljs.core.next(seq__42937_43224__$1);
var G__43237 = null;
var G__43238 = (0);
var G__43239 = (0);
seq__42937_43209 = G__43236;
chunk__42939_43210 = G__43237;
count__42940_43211 = G__43238;
i__42941_43212 = G__43239;
continue;
}
} else {
}
}
break;
}

return goog.dom.removeNode(node_43206);
});})(seq__42893_43149,chunk__42897_43150,count__42898_43151,i__42899_43152,seq__42725,chunk__42727,count__42728,i__42729,new_link_43208,path_match_43207,node_43206,seq__42893_43200__$1,temp__5804__auto___43199__$1,path,seq__42725__$1,temp__5804__auto__,map__42724,map__42724__$1,msg,updates,reload_info))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_43207], 0));

goog.dom.insertSiblingAfter(new_link_43208,node_43206);


var G__43240 = cljs.core.next(seq__42893_43200__$1);
var G__43241 = null;
var G__43242 = (0);
var G__43243 = (0);
seq__42893_43149 = G__43240;
chunk__42897_43150 = G__43241;
count__42898_43151 = G__43242;
i__42899_43152 = G__43243;
continue;
} else {
var G__43244 = cljs.core.next(seq__42893_43200__$1);
var G__43245 = null;
var G__43246 = (0);
var G__43247 = (0);
seq__42893_43149 = G__43244;
chunk__42897_43150 = G__43245;
count__42898_43151 = G__43246;
i__42899_43152 = G__43247;
continue;
}
} else {
var G__43248 = cljs.core.next(seq__42893_43200__$1);
var G__43249 = null;
var G__43250 = (0);
var G__43251 = (0);
seq__42893_43149 = G__43248;
chunk__42897_43150 = G__43249;
count__42898_43151 = G__43250;
i__42899_43152 = G__43251;
continue;
}
}
} else {
}
}
break;
}


var G__43252 = cljs.core.next(seq__42725__$1);
var G__43253 = null;
var G__43254 = (0);
var G__43255 = (0);
seq__42725 = G__43252;
chunk__42727 = G__43253;
count__42728 = G__43254;
i__42729 = G__43255;
continue;
} else {
var G__43256 = cljs.core.next(seq__42725__$1);
var G__43257 = null;
var G__43258 = (0);
var G__43259 = (0);
seq__42725 = G__43256;
chunk__42727 = G__43257;
count__42728 = G__43258;
i__42729 = G__43259;
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
shadow.cljs.devtools.client.browser.repl_init = (function shadow$cljs$devtools$client$browser$repl_init(runtime,p__42947){
var map__42948 = p__42947;
var map__42948__$1 = cljs.core.__destructure_map(map__42948);
var repl_state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42948__$1,new cljs.core.Keyword(null,"repl-state","repl-state",-1733780387));
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

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$do_invoke$arity$2 = (function (this$,p__42949){
var map__42950 = p__42949;
var map__42950__$1 = cljs.core.__destructure_map(map__42950);
var _ = map__42950__$1;
var js = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42950__$1,new cljs.core.Keyword(null,"js","js",1768080579));
var this$__$1 = this;
return shadow.cljs.devtools.client.browser.global_eval(js);
}));

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$do_repl_init$arity$4 = (function (runtime,p__42951,done,error){
var map__42952 = p__42951;
var map__42952__$1 = cljs.core.__destructure_map(map__42952);
var repl_sources = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42952__$1,new cljs.core.Keyword(null,"repl-sources","repl-sources",723867535));
var runtime__$1 = this;
return shadow.cljs.devtools.client.shared.load_sources(runtime__$1,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.remove.cljs$core$IFn$_invoke$arity$2(shadow.cljs.devtools.client.env.src_is_loaded_QMARK_,repl_sources)),(function (sources){
shadow.cljs.devtools.client.browser.do_js_load(sources);

return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
}));
}));

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$do_repl_require$arity$4 = (function (runtime,p__42953,done,error){
var map__42954 = p__42953;
var map__42954__$1 = cljs.core.__destructure_map(map__42954);
var msg = map__42954__$1;
var sources = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42954__$1,new cljs.core.Keyword(null,"sources","sources",-321166424));
var reload_namespaces = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42954__$1,new cljs.core.Keyword(null,"reload-namespaces","reload-namespaces",250210134));
var js_requires = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42954__$1,new cljs.core.Keyword(null,"js-requires","js-requires",-1311472051));
var runtime__$1 = this;
var sources_to_load = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.remove.cljs$core$IFn$_invoke$arity$2((function (p__42955){
var map__42956 = p__42955;
var map__42956__$1 = cljs.core.__destructure_map(map__42956);
var src = map__42956__$1;
var provides = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42956__$1,new cljs.core.Keyword(null,"provides","provides",-1634397992));
var and__5043__auto__ = shadow.cljs.devtools.client.env.src_is_loaded_QMARK_(src);
if(cljs.core.truth_(and__5043__auto__)){
return cljs.core.not(cljs.core.some(reload_namespaces,provides));
} else {
return and__5043__auto__;
}
}),sources));
if(cljs.core.not(cljs.core.seq(sources_to_load))){
var G__42957 = cljs.core.PersistentVector.EMPTY;
return (done.cljs$core$IFn$_invoke$arity$1 ? done.cljs$core$IFn$_invoke$arity$1(G__42957) : done.call(null,G__42957));
} else {
return shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$3(runtime__$1,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"cljs-load-sources","cljs-load-sources",-1458295962),new cljs.core.Keyword(null,"to","to",192099007),shadow.cljs.devtools.client.env.worker_client_id,new cljs.core.Keyword(null,"sources","sources",-321166424),cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"resource-id","resource-id",-1308422582)),sources_to_load)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cljs-sources","cljs-sources",31121610),(function (p__42958){
var map__42959 = p__42958;
var map__42959__$1 = cljs.core.__destructure_map(map__42959);
var msg__$1 = map__42959__$1;
var sources__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42959__$1,new cljs.core.Keyword(null,"sources","sources",-321166424));
try{shadow.cljs.devtools.client.browser.do_js_load(sources__$1);

if(cljs.core.seq(js_requires)){
shadow.cljs.devtools.client.browser.do_js_requires(js_requires);
} else {
}

return (done.cljs$core$IFn$_invoke$arity$1 ? done.cljs$core$IFn$_invoke$arity$1(sources_to_load) : done.call(null,sources_to_load));
}catch (e42960){var ex = e42960;
return (error.cljs$core$IFn$_invoke$arity$1 ? error.cljs$core$IFn$_invoke$arity$1(ex) : error.call(null,ex));
}})], null));
}
}));

shadow.cljs.devtools.client.shared.add_plugin_BANG_(new cljs.core.Keyword("shadow.cljs.devtools.client.browser","client","shadow.cljs.devtools.client.browser/client",-1461019282),cljs.core.PersistentHashSet.EMPTY,(function (p__42961){
var map__42962 = p__42961;
var map__42962__$1 = cljs.core.__destructure_map(map__42962);
var env = map__42962__$1;
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42962__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
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
}),new cljs.core.Keyword(null,"cljs-asset-update","cljs-asset-update",1224093028),(function (msg){
return shadow.cljs.devtools.client.browser.handle_asset_update(msg);
}),new cljs.core.Keyword(null,"cljs-build-configure","cljs-build-configure",-2089891268),(function (msg){
return null;
}),new cljs.core.Keyword(null,"cljs-build-start","cljs-build-start",-725781241),(function (msg){
shadow.cljs.devtools.client.hud.hud_hide();

shadow.cljs.devtools.client.hud.load_start();

return shadow.cljs.devtools.client.env.run_custom_notify_BANG_(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(msg,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"build-start","build-start",-959649480)));
}),new cljs.core.Keyword(null,"cljs-build-complete","cljs-build-complete",273626153),(function (msg){
var msg__$1 = shadow.cljs.devtools.client.env.add_warnings_to_info(msg);
shadow.cljs.devtools.client.hud.connection_error_clear_BANG_();

shadow.cljs.devtools.client.hud.hud_warnings(msg__$1);

shadow.cljs.devtools.client.browser.handle_build_complete(runtime,msg__$1);

return shadow.cljs.devtools.client.env.run_custom_notify_BANG_(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(msg__$1,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"build-complete","build-complete",-501868472)));
}),new cljs.core.Keyword(null,"cljs-build-failure","cljs-build-failure",1718154990),(function (msg){
shadow.cljs.devtools.client.hud.load_end();

shadow.cljs.devtools.client.hud.hud_error(msg);

return shadow.cljs.devtools.client.env.run_custom_notify_BANG_(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(msg,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"build-failure","build-failure",-2107487466)));
}),new cljs.core.Keyword("shadow.cljs.devtools.client.env","worker-notify","shadow.cljs.devtools.client.env/worker-notify",-1456820670),(function (p__42963){
var map__42964 = p__42963;
var map__42964__$1 = cljs.core.__destructure_map(map__42964);
var event_op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42964__$1,new cljs.core.Keyword(null,"event-op","event-op",200358057));
var client_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42964__$1,new cljs.core.Keyword(null,"client-id","client-id",-464622140));
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
}),(function (p__42965){
var map__42966 = p__42965;
var map__42966__$1 = cljs.core.__destructure_map(map__42966);
var svc = map__42966__$1;
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42966__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
return shadow.remote.runtime.api.del_extension(runtime,new cljs.core.Keyword("shadow.cljs.devtools.client.browser","client","shadow.cljs.devtools.client.browser/client",-1461019282));
}));

shadow.cljs.devtools.client.shared.init_runtime_BANG_(shadow.cljs.devtools.client.browser.client_info,shadow.cljs.devtools.client.websocket.start,shadow.cljs.devtools.client.websocket.send,shadow.cljs.devtools.client.websocket.stop);
} else {
}

//# sourceMappingURL=shadow.cljs.devtools.client.browser.js.map

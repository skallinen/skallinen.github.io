goog.provide('re_frame.trace');
re_frame.trace.id = cljs.core.atom.cljs$core$IFn$_invoke$arity$1((0));
re_frame.trace._STAR_current_trace_STAR_ = null;
re_frame.trace.reset_tracing_BANG_ = (function re_frame$trace$reset_tracing_BANG_(){
return cljs.core.reset_BANG_(re_frame.trace.id,(0));
});
/**
 * @define {boolean}
 */
re_frame.trace.trace_enabled_QMARK_ = goog.define("re_frame.trace.trace_enabled_QMARK_",false);
/**
 * See https://groups.google.com/d/msg/clojurescript/jk43kmYiMhA/IHglVr_TPdgJ for more details
 */
re_frame.trace.is_trace_enabled_QMARK_ = (function re_frame$trace$is_trace_enabled_QMARK_(){
return re_frame.trace.trace_enabled_QMARK_;
});
re_frame.trace.trace_cbs = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
if((typeof re_frame !== 'undefined') && (typeof re_frame.trace !== 'undefined') && (typeof re_frame.trace.traces !== 'undefined')){
} else {
re_frame.trace.traces = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.EMPTY);
}
if((typeof re_frame !== 'undefined') && (typeof re_frame.trace !== 'undefined') && (typeof re_frame.trace.next_delivery !== 'undefined')){
} else {
re_frame.trace.next_delivery = cljs.core.atom.cljs$core$IFn$_invoke$arity$1((0));
}
/**
 * Registers a tracing callback function which will receive a collection of one or more traces.
 *   Will replace an existing callback function if it shares the same key.
 */
re_frame.trace.register_trace_cb = (function re_frame$trace$register_trace_cb(key,f){
if(re_frame.trace.trace_enabled_QMARK_){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(re_frame.trace.trace_cbs,cljs.core.assoc,key,f);
} else {
return re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Tracing is not enabled. Please set {\"re_frame.trace.trace_enabled_QMARK_\" true} in :closure-defines. See: https://github.com/day8/re-frame-10x#installation."], 0));
}
});
re_frame.trace.remove_trace_cb = (function re_frame$trace$remove_trace_cb(key){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(re_frame.trace.trace_cbs,cljs.core.dissoc,key);

return null;
});
re_frame.trace.next_id = (function re_frame$trace$next_id(){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(re_frame.trace.id,cljs.core.inc);
});
re_frame.trace.start_trace = (function re_frame$trace$start_trace(p__42162){
var map__42163 = p__42162;
var map__42163__$1 = cljs.core.__destructure_map(map__42163);
var operation = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42163__$1,new cljs.core.Keyword(null,"operation","operation",-1267664310));
var op_type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42163__$1,new cljs.core.Keyword(null,"op-type","op-type",-1636141668));
var tags = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42163__$1,new cljs.core.Keyword(null,"tags","tags",1771418977));
var child_of = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42163__$1,new cljs.core.Keyword(null,"child-of","child-of",-903376662));
return new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"id","id",-1388402092),re_frame.trace.next_id(),new cljs.core.Keyword(null,"operation","operation",-1267664310),operation,new cljs.core.Keyword(null,"op-type","op-type",-1636141668),op_type,new cljs.core.Keyword(null,"tags","tags",1771418977),tags,new cljs.core.Keyword(null,"child-of","child-of",-903376662),(function (){var or__4212__auto__ = child_of;
if(cljs.core.truth_(or__4212__auto__)){
return or__4212__auto__;
} else {
return new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(re_frame.trace._STAR_current_trace_STAR_);
}
})(),new cljs.core.Keyword(null,"start","start",-355208981),re_frame.interop.now()], null);
});
re_frame.trace.debounce_time = (50);
re_frame.trace.debounce = (function re_frame$trace$debounce(f,interval){
return goog.functions.debounce(f,interval);
});
re_frame.trace.schedule_debounce = re_frame.trace.debounce((function re_frame$trace$tracing_cb_debounced(){
var seq__42168_42225 = cljs.core.seq(cljs.core.deref(re_frame.trace.trace_cbs));
var chunk__42169_42226 = null;
var count__42170_42227 = (0);
var i__42171_42228 = (0);
while(true){
if((i__42171_42228 < count__42170_42227)){
var vec__42190_42229 = chunk__42169_42226.cljs$core$IIndexed$_nth$arity$2(null,i__42171_42228);
var k_42230 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42190_42229,(0),null);
var cb_42231 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42190_42229,(1),null);
try{var G__42194_42232 = cljs.core.deref(re_frame.trace.traces);
(cb_42231.cljs$core$IFn$_invoke$arity$1 ? cb_42231.cljs$core$IFn$_invoke$arity$1(G__42194_42232) : cb_42231.call(null,G__42194_42232));
}catch (e42193){var e_42233 = e42193;
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"error","error",-978969032),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Error thrown from trace cb",k_42230,"while storing",cljs.core.deref(re_frame.trace.traces),e_42233], 0));
}

var G__42234 = seq__42168_42225;
var G__42235 = chunk__42169_42226;
var G__42236 = count__42170_42227;
var G__42237 = (i__42171_42228 + (1));
seq__42168_42225 = G__42234;
chunk__42169_42226 = G__42235;
count__42170_42227 = G__42236;
i__42171_42228 = G__42237;
continue;
} else {
var temp__5753__auto___42238 = cljs.core.seq(seq__42168_42225);
if(temp__5753__auto___42238){
var seq__42168_42239__$1 = temp__5753__auto___42238;
if(cljs.core.chunked_seq_QMARK_(seq__42168_42239__$1)){
var c__4638__auto___42240 = cljs.core.chunk_first(seq__42168_42239__$1);
var G__42241 = cljs.core.chunk_rest(seq__42168_42239__$1);
var G__42242 = c__4638__auto___42240;
var G__42243 = cljs.core.count(c__4638__auto___42240);
var G__42244 = (0);
seq__42168_42225 = G__42241;
chunk__42169_42226 = G__42242;
count__42170_42227 = G__42243;
i__42171_42228 = G__42244;
continue;
} else {
var vec__42196_42245 = cljs.core.first(seq__42168_42239__$1);
var k_42246 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42196_42245,(0),null);
var cb_42247 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42196_42245,(1),null);
try{var G__42202_42248 = cljs.core.deref(re_frame.trace.traces);
(cb_42247.cljs$core$IFn$_invoke$arity$1 ? cb_42247.cljs$core$IFn$_invoke$arity$1(G__42202_42248) : cb_42247.call(null,G__42202_42248));
}catch (e42201){var e_42249 = e42201;
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"error","error",-978969032),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Error thrown from trace cb",k_42246,"while storing",cljs.core.deref(re_frame.trace.traces),e_42249], 0));
}

var G__42250 = cljs.core.next(seq__42168_42239__$1);
var G__42251 = null;
var G__42252 = (0);
var G__42253 = (0);
seq__42168_42225 = G__42250;
chunk__42169_42226 = G__42251;
count__42170_42227 = G__42252;
i__42171_42228 = G__42253;
continue;
}
} else {
}
}
break;
}

return cljs.core.reset_BANG_(re_frame.trace.traces,cljs.core.PersistentVector.EMPTY);
}),re_frame.trace.debounce_time);
re_frame.trace.run_tracing_callbacks_BANG_ = (function re_frame$trace$run_tracing_callbacks_BANG_(now){
if(((cljs.core.deref(re_frame.trace.next_delivery) - (25)) < now)){
(re_frame.trace.schedule_debounce.cljs$core$IFn$_invoke$arity$0 ? re_frame.trace.schedule_debounce.cljs$core$IFn$_invoke$arity$0() : re_frame.trace.schedule_debounce.call(null));

return cljs.core.reset_BANG_(re_frame.trace.next_delivery,(now + re_frame.trace.debounce_time));
} else {
return null;
}
});

//# sourceMappingURL=re_frame.trace.js.map

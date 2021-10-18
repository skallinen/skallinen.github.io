goog.provide('re_frame.fx');
re_frame.fx.kind = new cljs.core.Keyword(null,"fx","fx",-1237829572);
if(cljs.core.truth_((re_frame.registrar.kinds.cljs$core$IFn$_invoke$arity$1 ? re_frame.registrar.kinds.cljs$core$IFn$_invoke$arity$1(re_frame.fx.kind) : re_frame.registrar.kinds.call(null,re_frame.fx.kind)))){
} else {
throw (new Error("Assert failed: (re-frame.registrar/kinds kind)"));
}
re_frame.fx.reg_fx = (function re_frame$fx$reg_fx(id,handler){
return re_frame.registrar.register_handler(re_frame.fx.kind,id,handler);
});
/**
 * An interceptor whose `:after` actions the contents of `:effects`. As a result,
 *   this interceptor is Domino 3.
 * 
 *   This interceptor is silently added (by reg-event-db etc) to the front of
 *   interceptor chains for all events.
 * 
 *   For each key in `:effects` (a map), it calls the registered `effects handler`
 *   (see `reg-fx` for registration of effect handlers).
 * 
 *   So, if `:effects` was:
 *    {:dispatch  [:hello 42]
 *     :db        {...}
 *     :undo      "set flag"}
 * 
 *   it will call the registered effect handlers for each of the map's keys:
 *   `:dispatch`, `:undo` and `:db`. When calling each handler, provides the map
 *   value for that key - so in the example above the effect handler for :dispatch
 *   will be given one arg `[:hello 42]`.
 * 
 *   You cannot rely on the ordering in which effects are executed, other than that
 *   `:db` is guaranteed to be executed first.
 */
re_frame.fx.do_fx = re_frame.interceptor.__GT_interceptor.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"id","id",-1388402092),new cljs.core.Keyword(null,"do-fx","do-fx",1194163050),new cljs.core.Keyword(null,"after","after",594996914),(function re_frame$fx$do_fx_after(context){
if(re_frame.trace.is_trace_enabled_QMARK_()){
var _STAR_current_trace_STAR__orig_val__42951 = re_frame.trace._STAR_current_trace_STAR_;
var _STAR_current_trace_STAR__temp_val__42952 = re_frame.trace.start_trace(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"op-type","op-type",-1636141668),new cljs.core.Keyword("event","do-fx","event/do-fx",1357330452)], null));
(re_frame.trace._STAR_current_trace_STAR_ = _STAR_current_trace_STAR__temp_val__42952);

try{try{var effects = new cljs.core.Keyword(null,"effects","effects",-282369292).cljs$core$IFn$_invoke$arity$1(context);
var effects_without_db = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(effects,new cljs.core.Keyword(null,"db","db",993250759));
var temp__5753__auto___43169 = new cljs.core.Keyword(null,"db","db",993250759).cljs$core$IFn$_invoke$arity$1(effects);
if(cljs.core.truth_(temp__5753__auto___43169)){
var new_db_43170 = temp__5753__auto___43169;
var fexpr__42963_43171 = re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(re_frame.fx.kind,new cljs.core.Keyword(null,"db","db",993250759),false);
(fexpr__42963_43171.cljs$core$IFn$_invoke$arity$1 ? fexpr__42963_43171.cljs$core$IFn$_invoke$arity$1(new_db_43170) : fexpr__42963_43171.call(null,new_db_43170));
} else {
}

var seq__42966 = cljs.core.seq(effects_without_db);
var chunk__42967 = null;
var count__42968 = (0);
var i__42969 = (0);
while(true){
if((i__42969 < count__42968)){
var vec__42993 = chunk__42967.cljs$core$IIndexed$_nth$arity$2(null,i__42969);
var effect_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42993,(0),null);
var effect_value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42993,(1),null);
var temp__5751__auto___43173 = re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(re_frame.fx.kind,effect_key,false);
if(cljs.core.truth_(temp__5751__auto___43173)){
var effect_fn_43174 = temp__5751__auto___43173;
(effect_fn_43174.cljs$core$IFn$_invoke$arity$1 ? effect_fn_43174.cljs$core$IFn$_invoke$arity$1(effect_value) : effect_fn_43174.call(null,effect_value));
} else {
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: no handler registered for effect:",effect_key,". Ignoring."], 0));
}


var G__43175 = seq__42966;
var G__43176 = chunk__42967;
var G__43177 = count__42968;
var G__43178 = (i__42969 + (1));
seq__42966 = G__43175;
chunk__42967 = G__43176;
count__42968 = G__43177;
i__42969 = G__43178;
continue;
} else {
var temp__5753__auto__ = cljs.core.seq(seq__42966);
if(temp__5753__auto__){
var seq__42966__$1 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__42966__$1)){
var c__4638__auto__ = cljs.core.chunk_first(seq__42966__$1);
var G__43179 = cljs.core.chunk_rest(seq__42966__$1);
var G__43180 = c__4638__auto__;
var G__43181 = cljs.core.count(c__4638__auto__);
var G__43182 = (0);
seq__42966 = G__43179;
chunk__42967 = G__43180;
count__42968 = G__43181;
i__42969 = G__43182;
continue;
} else {
var vec__43005 = cljs.core.first(seq__42966__$1);
var effect_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__43005,(0),null);
var effect_value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__43005,(1),null);
var temp__5751__auto___43183 = re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(re_frame.fx.kind,effect_key,false);
if(cljs.core.truth_(temp__5751__auto___43183)){
var effect_fn_43186 = temp__5751__auto___43183;
(effect_fn_43186.cljs$core$IFn$_invoke$arity$1 ? effect_fn_43186.cljs$core$IFn$_invoke$arity$1(effect_value) : effect_fn_43186.call(null,effect_value));
} else {
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: no handler registered for effect:",effect_key,". Ignoring."], 0));
}


var G__43191 = cljs.core.next(seq__42966__$1);
var G__43192 = null;
var G__43193 = (0);
var G__43194 = (0);
seq__42966 = G__43191;
chunk__42967 = G__43192;
count__42968 = G__43193;
i__42969 = G__43194;
continue;
}
} else {
return null;
}
}
break;
}
}finally {if(re_frame.trace.is_trace_enabled_QMARK_()){
var end__42134__auto___43195 = re_frame.interop.now();
var duration__42135__auto___43196 = (end__42134__auto___43195 - new cljs.core.Keyword(null,"start","start",-355208981).cljs$core$IFn$_invoke$arity$1(re_frame.trace._STAR_current_trace_STAR_));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(re_frame.trace.traces,cljs.core.conj,cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(re_frame.trace._STAR_current_trace_STAR_,new cljs.core.Keyword(null,"duration","duration",1444101068),duration__42135__auto___43196,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"end","end",-268185958),re_frame.interop.now()], 0)));

re_frame.trace.run_tracing_callbacks_BANG_(end__42134__auto___43195);
} else {
}
}}finally {(re_frame.trace._STAR_current_trace_STAR_ = _STAR_current_trace_STAR__orig_val__42951);
}} else {
var effects = new cljs.core.Keyword(null,"effects","effects",-282369292).cljs$core$IFn$_invoke$arity$1(context);
var effects_without_db = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(effects,new cljs.core.Keyword(null,"db","db",993250759));
var temp__5753__auto___43197 = new cljs.core.Keyword(null,"db","db",993250759).cljs$core$IFn$_invoke$arity$1(effects);
if(cljs.core.truth_(temp__5753__auto___43197)){
var new_db_43199 = temp__5753__auto___43197;
var fexpr__43022_43200 = re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(re_frame.fx.kind,new cljs.core.Keyword(null,"db","db",993250759),false);
(fexpr__43022_43200.cljs$core$IFn$_invoke$arity$1 ? fexpr__43022_43200.cljs$core$IFn$_invoke$arity$1(new_db_43199) : fexpr__43022_43200.call(null,new_db_43199));
} else {
}

var seq__43024 = cljs.core.seq(effects_without_db);
var chunk__43025 = null;
var count__43026 = (0);
var i__43027 = (0);
while(true){
if((i__43027 < count__43026)){
var vec__43049 = chunk__43025.cljs$core$IIndexed$_nth$arity$2(null,i__43027);
var effect_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__43049,(0),null);
var effect_value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__43049,(1),null);
var temp__5751__auto___43201 = re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(re_frame.fx.kind,effect_key,false);
if(cljs.core.truth_(temp__5751__auto___43201)){
var effect_fn_43202 = temp__5751__auto___43201;
(effect_fn_43202.cljs$core$IFn$_invoke$arity$1 ? effect_fn_43202.cljs$core$IFn$_invoke$arity$1(effect_value) : effect_fn_43202.call(null,effect_value));
} else {
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: no handler registered for effect:",effect_key,". Ignoring."], 0));
}


var G__43203 = seq__43024;
var G__43204 = chunk__43025;
var G__43205 = count__43026;
var G__43206 = (i__43027 + (1));
seq__43024 = G__43203;
chunk__43025 = G__43204;
count__43026 = G__43205;
i__43027 = G__43206;
continue;
} else {
var temp__5753__auto__ = cljs.core.seq(seq__43024);
if(temp__5753__auto__){
var seq__43024__$1 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__43024__$1)){
var c__4638__auto__ = cljs.core.chunk_first(seq__43024__$1);
var G__43211 = cljs.core.chunk_rest(seq__43024__$1);
var G__43212 = c__4638__auto__;
var G__43213 = cljs.core.count(c__4638__auto__);
var G__43214 = (0);
seq__43024 = G__43211;
chunk__43025 = G__43212;
count__43026 = G__43213;
i__43027 = G__43214;
continue;
} else {
var vec__43068 = cljs.core.first(seq__43024__$1);
var effect_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__43068,(0),null);
var effect_value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__43068,(1),null);
var temp__5751__auto___43217 = re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(re_frame.fx.kind,effect_key,false);
if(cljs.core.truth_(temp__5751__auto___43217)){
var effect_fn_43218 = temp__5751__auto___43217;
(effect_fn_43218.cljs$core$IFn$_invoke$arity$1 ? effect_fn_43218.cljs$core$IFn$_invoke$arity$1(effect_value) : effect_fn_43218.call(null,effect_value));
} else {
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: no handler registered for effect:",effect_key,". Ignoring."], 0));
}


var G__43219 = cljs.core.next(seq__43024__$1);
var G__43220 = null;
var G__43221 = (0);
var G__43222 = (0);
seq__43024 = G__43219;
chunk__43025 = G__43220;
count__43026 = G__43221;
i__43027 = G__43222;
continue;
}
} else {
return null;
}
}
break;
}
}
})], 0));
re_frame.fx.dispatch_later = (function re_frame$fx$dispatch_later(p__43083){
var map__43084 = p__43083;
var map__43084__$1 = cljs.core.__destructure_map(map__43084);
var effect = map__43084__$1;
var ms = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__43084__$1,new cljs.core.Keyword(null,"ms","ms",-1152709733));
var dispatch = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__43084__$1,new cljs.core.Keyword(null,"dispatch","dispatch",1319337009));
if(((cljs.core.empty_QMARK_(dispatch)) || ((!(typeof ms === 'number'))))){
return re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"error","error",-978969032),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: ignoring bad :dispatch-later value:",effect], 0));
} else {
return re_frame.interop.set_timeout_BANG_((function (){
return re_frame.router.dispatch(dispatch);
}),ms);
}
});
re_frame.fx.reg_fx(new cljs.core.Keyword(null,"dispatch-later","dispatch-later",291951390),(function (value){
if(cljs.core.map_QMARK_(value)){
return re_frame.fx.dispatch_later(value);
} else {
var seq__43085 = cljs.core.seq(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,value));
var chunk__43086 = null;
var count__43087 = (0);
var i__43088 = (0);
while(true){
if((i__43088 < count__43087)){
var effect = chunk__43086.cljs$core$IIndexed$_nth$arity$2(null,i__43088);
re_frame.fx.dispatch_later(effect);


var G__43224 = seq__43085;
var G__43225 = chunk__43086;
var G__43226 = count__43087;
var G__43227 = (i__43088 + (1));
seq__43085 = G__43224;
chunk__43086 = G__43225;
count__43087 = G__43226;
i__43088 = G__43227;
continue;
} else {
var temp__5753__auto__ = cljs.core.seq(seq__43085);
if(temp__5753__auto__){
var seq__43085__$1 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__43085__$1)){
var c__4638__auto__ = cljs.core.chunk_first(seq__43085__$1);
var G__43228 = cljs.core.chunk_rest(seq__43085__$1);
var G__43229 = c__4638__auto__;
var G__43230 = cljs.core.count(c__4638__auto__);
var G__43231 = (0);
seq__43085 = G__43228;
chunk__43086 = G__43229;
count__43087 = G__43230;
i__43088 = G__43231;
continue;
} else {
var effect = cljs.core.first(seq__43085__$1);
re_frame.fx.dispatch_later(effect);


var G__43232 = cljs.core.next(seq__43085__$1);
var G__43233 = null;
var G__43234 = (0);
var G__43235 = (0);
seq__43085 = G__43232;
chunk__43086 = G__43233;
count__43087 = G__43234;
i__43088 = G__43235;
continue;
}
} else {
return null;
}
}
break;
}
}
}));
re_frame.fx.reg_fx(new cljs.core.Keyword(null,"fx","fx",-1237829572),(function (seq_of_effects){
if((!(cljs.core.sequential_QMARK_(seq_of_effects)))){
return re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"error","error",-978969032),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: \":fx\" effect expects a seq, but was given ",cljs.core.type(seq_of_effects)], 0));
} else {
var seq__43089 = cljs.core.seq(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,seq_of_effects));
var chunk__43090 = null;
var count__43091 = (0);
var i__43092 = (0);
while(true){
if((i__43092 < count__43091)){
var vec__43105 = chunk__43090.cljs$core$IIndexed$_nth$arity$2(null,i__43092);
var effect_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__43105,(0),null);
var effect_value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__43105,(1),null);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"db","db",993250759),effect_key)){
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: \":fx\" effect should not contain a :db effect"], 0));
} else {
}

var temp__5751__auto___43243 = re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(re_frame.fx.kind,effect_key,false);
if(cljs.core.truth_(temp__5751__auto___43243)){
var effect_fn_43244 = temp__5751__auto___43243;
(effect_fn_43244.cljs$core$IFn$_invoke$arity$1 ? effect_fn_43244.cljs$core$IFn$_invoke$arity$1(effect_value) : effect_fn_43244.call(null,effect_value));
} else {
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: in \":fx\" effect found ",effect_key," which has no associated handler. Ignoring."], 0));
}


var G__43245 = seq__43089;
var G__43246 = chunk__43090;
var G__43247 = count__43091;
var G__43248 = (i__43092 + (1));
seq__43089 = G__43245;
chunk__43090 = G__43246;
count__43091 = G__43247;
i__43092 = G__43248;
continue;
} else {
var temp__5753__auto__ = cljs.core.seq(seq__43089);
if(temp__5753__auto__){
var seq__43089__$1 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__43089__$1)){
var c__4638__auto__ = cljs.core.chunk_first(seq__43089__$1);
var G__43249 = cljs.core.chunk_rest(seq__43089__$1);
var G__43250 = c__4638__auto__;
var G__43251 = cljs.core.count(c__4638__auto__);
var G__43252 = (0);
seq__43089 = G__43249;
chunk__43090 = G__43250;
count__43091 = G__43251;
i__43092 = G__43252;
continue;
} else {
var vec__43109 = cljs.core.first(seq__43089__$1);
var effect_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__43109,(0),null);
var effect_value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__43109,(1),null);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"db","db",993250759),effect_key)){
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: \":fx\" effect should not contain a :db effect"], 0));
} else {
}

var temp__5751__auto___43253 = re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(re_frame.fx.kind,effect_key,false);
if(cljs.core.truth_(temp__5751__auto___43253)){
var effect_fn_43254 = temp__5751__auto___43253;
(effect_fn_43254.cljs$core$IFn$_invoke$arity$1 ? effect_fn_43254.cljs$core$IFn$_invoke$arity$1(effect_value) : effect_fn_43254.call(null,effect_value));
} else {
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: in \":fx\" effect found ",effect_key," which has no associated handler. Ignoring."], 0));
}


var G__43255 = cljs.core.next(seq__43089__$1);
var G__43256 = null;
var G__43257 = (0);
var G__43258 = (0);
seq__43089 = G__43255;
chunk__43090 = G__43256;
count__43091 = G__43257;
i__43092 = G__43258;
continue;
}
} else {
return null;
}
}
break;
}
}
}));
re_frame.fx.reg_fx(new cljs.core.Keyword(null,"dispatch","dispatch",1319337009),(function (value){
if((!(cljs.core.vector_QMARK_(value)))){
return re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"error","error",-978969032),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: ignoring bad :dispatch value. Expected a vector, but got:",value], 0));
} else {
return re_frame.router.dispatch(value);
}
}));
re_frame.fx.reg_fx(new cljs.core.Keyword(null,"dispatch-n","dispatch-n",-504469236),(function (value){
if((!(cljs.core.sequential_QMARK_(value)))){
return re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"error","error",-978969032),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: ignoring bad :dispatch-n value. Expected a collection, but got:",value], 0));
} else {
var seq__43118 = cljs.core.seq(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,value));
var chunk__43119 = null;
var count__43120 = (0);
var i__43121 = (0);
while(true){
if((i__43121 < count__43120)){
var event = chunk__43119.cljs$core$IIndexed$_nth$arity$2(null,i__43121);
re_frame.router.dispatch(event);


var G__43259 = seq__43118;
var G__43260 = chunk__43119;
var G__43261 = count__43120;
var G__43262 = (i__43121 + (1));
seq__43118 = G__43259;
chunk__43119 = G__43260;
count__43120 = G__43261;
i__43121 = G__43262;
continue;
} else {
var temp__5753__auto__ = cljs.core.seq(seq__43118);
if(temp__5753__auto__){
var seq__43118__$1 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__43118__$1)){
var c__4638__auto__ = cljs.core.chunk_first(seq__43118__$1);
var G__43264 = cljs.core.chunk_rest(seq__43118__$1);
var G__43265 = c__4638__auto__;
var G__43266 = cljs.core.count(c__4638__auto__);
var G__43267 = (0);
seq__43118 = G__43264;
chunk__43119 = G__43265;
count__43120 = G__43266;
i__43121 = G__43267;
continue;
} else {
var event = cljs.core.first(seq__43118__$1);
re_frame.router.dispatch(event);


var G__43268 = cljs.core.next(seq__43118__$1);
var G__43269 = null;
var G__43270 = (0);
var G__43271 = (0);
seq__43118 = G__43268;
chunk__43119 = G__43269;
count__43120 = G__43270;
i__43121 = G__43271;
continue;
}
} else {
return null;
}
}
break;
}
}
}));
re_frame.fx.reg_fx(new cljs.core.Keyword(null,"deregister-event-handler","deregister-event-handler",-1096518994),(function (value){
var clear_event = cljs.core.partial.cljs$core$IFn$_invoke$arity$2(re_frame.registrar.clear_handlers,re_frame.events.kind);
if(cljs.core.sequential_QMARK_(value)){
var seq__43132 = cljs.core.seq(value);
var chunk__43133 = null;
var count__43134 = (0);
var i__43135 = (0);
while(true){
if((i__43135 < count__43134)){
var event = chunk__43133.cljs$core$IIndexed$_nth$arity$2(null,i__43135);
clear_event(event);


var G__43272 = seq__43132;
var G__43273 = chunk__43133;
var G__43274 = count__43134;
var G__43275 = (i__43135 + (1));
seq__43132 = G__43272;
chunk__43133 = G__43273;
count__43134 = G__43274;
i__43135 = G__43275;
continue;
} else {
var temp__5753__auto__ = cljs.core.seq(seq__43132);
if(temp__5753__auto__){
var seq__43132__$1 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__43132__$1)){
var c__4638__auto__ = cljs.core.chunk_first(seq__43132__$1);
var G__43276 = cljs.core.chunk_rest(seq__43132__$1);
var G__43277 = c__4638__auto__;
var G__43278 = cljs.core.count(c__4638__auto__);
var G__43279 = (0);
seq__43132 = G__43276;
chunk__43133 = G__43277;
count__43134 = G__43278;
i__43135 = G__43279;
continue;
} else {
var event = cljs.core.first(seq__43132__$1);
clear_event(event);


var G__43280 = cljs.core.next(seq__43132__$1);
var G__43281 = null;
var G__43282 = (0);
var G__43283 = (0);
seq__43132 = G__43280;
chunk__43133 = G__43281;
count__43134 = G__43282;
i__43135 = G__43283;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return clear_event(value);
}
}));
re_frame.fx.reg_fx(new cljs.core.Keyword(null,"db","db",993250759),(function (value){
if((!((cljs.core.deref(re_frame.db.app_db) === value)))){
return cljs.core.reset_BANG_(re_frame.db.app_db,value);
} else {
return null;
}
}));

//# sourceMappingURL=re_frame.fx.js.map

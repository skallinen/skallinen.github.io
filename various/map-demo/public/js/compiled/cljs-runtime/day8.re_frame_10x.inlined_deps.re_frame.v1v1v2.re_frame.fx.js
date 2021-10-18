goog.provide('day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.fx');
day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.fx.kind = new cljs.core.Keyword(null,"fx","fx",-1237829572);
if(cljs.core.truth_((day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.registrar.kinds.cljs$core$IFn$_invoke$arity$1 ? day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.registrar.kinds.cljs$core$IFn$_invoke$arity$1(day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.fx.kind) : day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.registrar.kinds.call(null,day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.fx.kind)))){
} else {
throw (new Error("Assert failed: (day8.re-frame-10x.inlined-deps.re-frame.v1v1v2.re-frame.registrar/kinds kind)"));
}
day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.fx.reg_fx = (function day8$re_frame_10x$inlined_deps$re_frame$v1v1v2$re_frame$fx$reg_fx(id,handler){
return day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.registrar.register_handler(day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.fx.kind,id,handler);
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
day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.fx.do_fx = day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.interceptor.__GT_interceptor.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"id","id",-1388402092),new cljs.core.Keyword(null,"do-fx","do-fx",1194163050),new cljs.core.Keyword(null,"after","after",594996914),(function day8$re_frame_10x$inlined_deps$re_frame$v1v1v2$re_frame$fx$do_fx_after(context){
if(day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.trace.is_trace_enabled_QMARK_()){
var _STAR_current_trace_STAR__orig_val__38322 = day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.trace._STAR_current_trace_STAR_;
var _STAR_current_trace_STAR__temp_val__38323 = day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.trace.start_trace(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"op-type","op-type",-1636141668),new cljs.core.Keyword("event","do-fx","event/do-fx",1357330452)], null));
(day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.trace._STAR_current_trace_STAR_ = _STAR_current_trace_STAR__temp_val__38323);

try{try{var effects = new cljs.core.Keyword(null,"effects","effects",-282369292).cljs$core$IFn$_invoke$arity$1(context);
var effects_without_db = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(effects,new cljs.core.Keyword(null,"db","db",993250759));
var temp__5753__auto___38567 = new cljs.core.Keyword(null,"db","db",993250759).cljs$core$IFn$_invoke$arity$1(effects);
if(cljs.core.truth_(temp__5753__auto___38567)){
var new_db_38568 = temp__5753__auto___38567;
var fexpr__38339_38569 = day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.fx.kind,new cljs.core.Keyword(null,"db","db",993250759),false);
(fexpr__38339_38569.cljs$core$IFn$_invoke$arity$1 ? fexpr__38339_38569.cljs$core$IFn$_invoke$arity$1(new_db_38568) : fexpr__38339_38569.call(null,new_db_38568));
} else {
}

var seq__38340 = cljs.core.seq(effects_without_db);
var chunk__38341 = null;
var count__38342 = (0);
var i__38343 = (0);
while(true){
if((i__38343 < count__38342)){
var vec__38371 = chunk__38341.cljs$core$IIndexed$_nth$arity$2(null,i__38343);
var effect_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38371,(0),null);
var effect_value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38371,(1),null);
var temp__5751__auto___38570 = day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.fx.kind,effect_key,false);
if(cljs.core.truth_(temp__5751__auto___38570)){
var effect_fn_38577 = temp__5751__auto___38570;
(effect_fn_38577.cljs$core$IFn$_invoke$arity$1 ? effect_fn_38577.cljs$core$IFn$_invoke$arity$1(effect_value) : effect_fn_38577.call(null,effect_value));
} else {
day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: no handler registered for effect:",effect_key,". Ignoring."], 0));
}


var G__38578 = seq__38340;
var G__38579 = chunk__38341;
var G__38580 = count__38342;
var G__38581 = (i__38343 + (1));
seq__38340 = G__38578;
chunk__38341 = G__38579;
count__38342 = G__38580;
i__38343 = G__38581;
continue;
} else {
var temp__5753__auto__ = cljs.core.seq(seq__38340);
if(temp__5753__auto__){
var seq__38340__$1 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__38340__$1)){
var c__4638__auto__ = cljs.core.chunk_first(seq__38340__$1);
var G__38582 = cljs.core.chunk_rest(seq__38340__$1);
var G__38583 = c__4638__auto__;
var G__38584 = cljs.core.count(c__4638__auto__);
var G__38585 = (0);
seq__38340 = G__38582;
chunk__38341 = G__38583;
count__38342 = G__38584;
i__38343 = G__38585;
continue;
} else {
var vec__38406 = cljs.core.first(seq__38340__$1);
var effect_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38406,(0),null);
var effect_value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38406,(1),null);
var temp__5751__auto___38586 = day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.fx.kind,effect_key,false);
if(cljs.core.truth_(temp__5751__auto___38586)){
var effect_fn_38588 = temp__5751__auto___38586;
(effect_fn_38588.cljs$core$IFn$_invoke$arity$1 ? effect_fn_38588.cljs$core$IFn$_invoke$arity$1(effect_value) : effect_fn_38588.call(null,effect_value));
} else {
day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: no handler registered for effect:",effect_key,". Ignoring."], 0));
}


var G__38598 = cljs.core.next(seq__38340__$1);
var G__38599 = null;
var G__38600 = (0);
var G__38601 = (0);
seq__38340 = G__38598;
chunk__38341 = G__38599;
count__38342 = G__38600;
i__38343 = G__38601;
continue;
}
} else {
return null;
}
}
break;
}
}finally {if(day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.trace.is_trace_enabled_QMARK_()){
var end__37519__auto___38602 = day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.interop.now();
var duration__37520__auto___38603 = (end__37519__auto___38602 - new cljs.core.Keyword(null,"start","start",-355208981).cljs$core$IFn$_invoke$arity$1(day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.trace._STAR_current_trace_STAR_));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.trace.traces,cljs.core.conj,cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.trace._STAR_current_trace_STAR_,new cljs.core.Keyword(null,"duration","duration",1444101068),duration__37520__auto___38603,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"end","end",-268185958),day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.interop.now()], 0)));

day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.trace.run_tracing_callbacks_BANG_(end__37519__auto___38602);
} else {
}
}}finally {(day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.trace._STAR_current_trace_STAR_ = _STAR_current_trace_STAR__orig_val__38322);
}} else {
var effects = new cljs.core.Keyword(null,"effects","effects",-282369292).cljs$core$IFn$_invoke$arity$1(context);
var effects_without_db = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(effects,new cljs.core.Keyword(null,"db","db",993250759));
var temp__5753__auto___38604 = new cljs.core.Keyword(null,"db","db",993250759).cljs$core$IFn$_invoke$arity$1(effects);
if(cljs.core.truth_(temp__5753__auto___38604)){
var new_db_38605 = temp__5753__auto___38604;
var fexpr__38414_38606 = day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.fx.kind,new cljs.core.Keyword(null,"db","db",993250759),false);
(fexpr__38414_38606.cljs$core$IFn$_invoke$arity$1 ? fexpr__38414_38606.cljs$core$IFn$_invoke$arity$1(new_db_38605) : fexpr__38414_38606.call(null,new_db_38605));
} else {
}

var seq__38419 = cljs.core.seq(effects_without_db);
var chunk__38420 = null;
var count__38421 = (0);
var i__38422 = (0);
while(true){
if((i__38422 < count__38421)){
var vec__38460 = chunk__38420.cljs$core$IIndexed$_nth$arity$2(null,i__38422);
var effect_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38460,(0),null);
var effect_value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38460,(1),null);
var temp__5751__auto___38609 = day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.fx.kind,effect_key,false);
if(cljs.core.truth_(temp__5751__auto___38609)){
var effect_fn_38610 = temp__5751__auto___38609;
(effect_fn_38610.cljs$core$IFn$_invoke$arity$1 ? effect_fn_38610.cljs$core$IFn$_invoke$arity$1(effect_value) : effect_fn_38610.call(null,effect_value));
} else {
day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: no handler registered for effect:",effect_key,". Ignoring."], 0));
}


var G__38611 = seq__38419;
var G__38612 = chunk__38420;
var G__38613 = count__38421;
var G__38614 = (i__38422 + (1));
seq__38419 = G__38611;
chunk__38420 = G__38612;
count__38421 = G__38613;
i__38422 = G__38614;
continue;
} else {
var temp__5753__auto__ = cljs.core.seq(seq__38419);
if(temp__5753__auto__){
var seq__38419__$1 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__38419__$1)){
var c__4638__auto__ = cljs.core.chunk_first(seq__38419__$1);
var G__38615 = cljs.core.chunk_rest(seq__38419__$1);
var G__38616 = c__4638__auto__;
var G__38617 = cljs.core.count(c__4638__auto__);
var G__38618 = (0);
seq__38419 = G__38615;
chunk__38420 = G__38616;
count__38421 = G__38617;
i__38422 = G__38618;
continue;
} else {
var vec__38469 = cljs.core.first(seq__38419__$1);
var effect_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38469,(0),null);
var effect_value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38469,(1),null);
var temp__5751__auto___38619 = day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.fx.kind,effect_key,false);
if(cljs.core.truth_(temp__5751__auto___38619)){
var effect_fn_38620 = temp__5751__auto___38619;
(effect_fn_38620.cljs$core$IFn$_invoke$arity$1 ? effect_fn_38620.cljs$core$IFn$_invoke$arity$1(effect_value) : effect_fn_38620.call(null,effect_value));
} else {
day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: no handler registered for effect:",effect_key,". Ignoring."], 0));
}


var G__38621 = cljs.core.next(seq__38419__$1);
var G__38622 = null;
var G__38623 = (0);
var G__38624 = (0);
seq__38419 = G__38621;
chunk__38420 = G__38622;
count__38421 = G__38623;
i__38422 = G__38624;
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
day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.fx.dispatch_later = (function day8$re_frame_10x$inlined_deps$re_frame$v1v1v2$re_frame$fx$dispatch_later(p__38474){
var map__38475 = p__38474;
var map__38475__$1 = cljs.core.__destructure_map(map__38475);
var effect = map__38475__$1;
var ms = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38475__$1,new cljs.core.Keyword(null,"ms","ms",-1152709733));
var dispatch = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38475__$1,new cljs.core.Keyword(null,"dispatch","dispatch",1319337009));
if(((cljs.core.empty_QMARK_(dispatch)) || ((!(typeof ms === 'number'))))){
return day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"error","error",-978969032),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: ignoring bad :dispatch-later value:",effect], 0));
} else {
return day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.interop.set_timeout_BANG_((function (){
return day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.router.dispatch(dispatch);
}),ms);
}
});
day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.fx.reg_fx(new cljs.core.Keyword(null,"dispatch-later","dispatch-later",291951390),(function (value){
if(cljs.core.map_QMARK_(value)){
return day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.fx.dispatch_later(value);
} else {
var seq__38480 = cljs.core.seq(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,value));
var chunk__38481 = null;
var count__38482 = (0);
var i__38483 = (0);
while(true){
if((i__38483 < count__38482)){
var effect = chunk__38481.cljs$core$IIndexed$_nth$arity$2(null,i__38483);
day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.fx.dispatch_later(effect);


var G__38625 = seq__38480;
var G__38626 = chunk__38481;
var G__38627 = count__38482;
var G__38628 = (i__38483 + (1));
seq__38480 = G__38625;
chunk__38481 = G__38626;
count__38482 = G__38627;
i__38483 = G__38628;
continue;
} else {
var temp__5753__auto__ = cljs.core.seq(seq__38480);
if(temp__5753__auto__){
var seq__38480__$1 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__38480__$1)){
var c__4638__auto__ = cljs.core.chunk_first(seq__38480__$1);
var G__38629 = cljs.core.chunk_rest(seq__38480__$1);
var G__38630 = c__4638__auto__;
var G__38631 = cljs.core.count(c__4638__auto__);
var G__38632 = (0);
seq__38480 = G__38629;
chunk__38481 = G__38630;
count__38482 = G__38631;
i__38483 = G__38632;
continue;
} else {
var effect = cljs.core.first(seq__38480__$1);
day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.fx.dispatch_later(effect);


var G__38633 = cljs.core.next(seq__38480__$1);
var G__38634 = null;
var G__38635 = (0);
var G__38636 = (0);
seq__38480 = G__38633;
chunk__38481 = G__38634;
count__38482 = G__38635;
i__38483 = G__38636;
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
day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.fx.reg_fx(new cljs.core.Keyword(null,"fx","fx",-1237829572),(function (seq_of_effects){
if((!(cljs.core.sequential_QMARK_(seq_of_effects)))){
return day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"error","error",-978969032),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: \":fx\" effect expects a seq, but was given ",cljs.core.type(seq_of_effects)], 0));
} else {
var seq__38495 = cljs.core.seq(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,seq_of_effects));
var chunk__38496 = null;
var count__38497 = (0);
var i__38498 = (0);
while(true){
if((i__38498 < count__38497)){
var vec__38512 = chunk__38496.cljs$core$IIndexed$_nth$arity$2(null,i__38498);
var effect_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38512,(0),null);
var effect_value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38512,(1),null);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"db","db",993250759),effect_key)){
day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: \":fx\" effect should not contain a :db effect"], 0));
} else {
}

var temp__5751__auto___38641 = day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.fx.kind,effect_key,false);
if(cljs.core.truth_(temp__5751__auto___38641)){
var effect_fn_38642 = temp__5751__auto___38641;
(effect_fn_38642.cljs$core$IFn$_invoke$arity$1 ? effect_fn_38642.cljs$core$IFn$_invoke$arity$1(effect_value) : effect_fn_38642.call(null,effect_value));
} else {
day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: in \":fx\" effect found ",effect_key," which has no associated handler. Ignoring."], 0));
}


var G__38643 = seq__38495;
var G__38644 = chunk__38496;
var G__38645 = count__38497;
var G__38646 = (i__38498 + (1));
seq__38495 = G__38643;
chunk__38496 = G__38644;
count__38497 = G__38645;
i__38498 = G__38646;
continue;
} else {
var temp__5753__auto__ = cljs.core.seq(seq__38495);
if(temp__5753__auto__){
var seq__38495__$1 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__38495__$1)){
var c__4638__auto__ = cljs.core.chunk_first(seq__38495__$1);
var G__38647 = cljs.core.chunk_rest(seq__38495__$1);
var G__38648 = c__4638__auto__;
var G__38649 = cljs.core.count(c__4638__auto__);
var G__38650 = (0);
seq__38495 = G__38647;
chunk__38496 = G__38648;
count__38497 = G__38649;
i__38498 = G__38650;
continue;
} else {
var vec__38520 = cljs.core.first(seq__38495__$1);
var effect_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38520,(0),null);
var effect_value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38520,(1),null);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"db","db",993250759),effect_key)){
day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: \":fx\" effect should not contain a :db effect"], 0));
} else {
}

var temp__5751__auto___38652 = day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.fx.kind,effect_key,false);
if(cljs.core.truth_(temp__5751__auto___38652)){
var effect_fn_38654 = temp__5751__auto___38652;
(effect_fn_38654.cljs$core$IFn$_invoke$arity$1 ? effect_fn_38654.cljs$core$IFn$_invoke$arity$1(effect_value) : effect_fn_38654.call(null,effect_value));
} else {
day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: in \":fx\" effect found ",effect_key," which has no associated handler. Ignoring."], 0));
}


var G__38655 = cljs.core.next(seq__38495__$1);
var G__38656 = null;
var G__38657 = (0);
var G__38658 = (0);
seq__38495 = G__38655;
chunk__38496 = G__38656;
count__38497 = G__38657;
i__38498 = G__38658;
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
day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.fx.reg_fx(new cljs.core.Keyword(null,"dispatch","dispatch",1319337009),(function (value){
if((!(cljs.core.vector_QMARK_(value)))){
return day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"error","error",-978969032),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: ignoring bad :dispatch value. Expected a vector, but got:",value], 0));
} else {
return day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.router.dispatch(value);
}
}));
day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.fx.reg_fx(new cljs.core.Keyword(null,"dispatch-n","dispatch-n",-504469236),(function (value){
if((!(cljs.core.sequential_QMARK_(value)))){
return day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"error","error",-978969032),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: ignoring bad :dispatch-n value. Expected a collection, but got:",value], 0));
} else {
var seq__38529 = cljs.core.seq(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,value));
var chunk__38530 = null;
var count__38531 = (0);
var i__38532 = (0);
while(true){
if((i__38532 < count__38531)){
var event = chunk__38530.cljs$core$IIndexed$_nth$arity$2(null,i__38532);
day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.router.dispatch(event);


var G__38671 = seq__38529;
var G__38672 = chunk__38530;
var G__38673 = count__38531;
var G__38674 = (i__38532 + (1));
seq__38529 = G__38671;
chunk__38530 = G__38672;
count__38531 = G__38673;
i__38532 = G__38674;
continue;
} else {
var temp__5753__auto__ = cljs.core.seq(seq__38529);
if(temp__5753__auto__){
var seq__38529__$1 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__38529__$1)){
var c__4638__auto__ = cljs.core.chunk_first(seq__38529__$1);
var G__38679 = cljs.core.chunk_rest(seq__38529__$1);
var G__38680 = c__4638__auto__;
var G__38681 = cljs.core.count(c__4638__auto__);
var G__38682 = (0);
seq__38529 = G__38679;
chunk__38530 = G__38680;
count__38531 = G__38681;
i__38532 = G__38682;
continue;
} else {
var event = cljs.core.first(seq__38529__$1);
day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.router.dispatch(event);


var G__38687 = cljs.core.next(seq__38529__$1);
var G__38688 = null;
var G__38689 = (0);
var G__38690 = (0);
seq__38529 = G__38687;
chunk__38530 = G__38688;
count__38531 = G__38689;
i__38532 = G__38690;
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
day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.fx.reg_fx(new cljs.core.Keyword(null,"deregister-event-handler","deregister-event-handler",-1096518994),(function (value){
var clear_event = cljs.core.partial.cljs$core$IFn$_invoke$arity$2(day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.registrar.clear_handlers,day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.events.kind);
if(cljs.core.sequential_QMARK_(value)){
var seq__38547 = cljs.core.seq(value);
var chunk__38548 = null;
var count__38549 = (0);
var i__38550 = (0);
while(true){
if((i__38550 < count__38549)){
var event = chunk__38548.cljs$core$IIndexed$_nth$arity$2(null,i__38550);
clear_event(event);


var G__38693 = seq__38547;
var G__38694 = chunk__38548;
var G__38695 = count__38549;
var G__38696 = (i__38550 + (1));
seq__38547 = G__38693;
chunk__38548 = G__38694;
count__38549 = G__38695;
i__38550 = G__38696;
continue;
} else {
var temp__5753__auto__ = cljs.core.seq(seq__38547);
if(temp__5753__auto__){
var seq__38547__$1 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__38547__$1)){
var c__4638__auto__ = cljs.core.chunk_first(seq__38547__$1);
var G__38697 = cljs.core.chunk_rest(seq__38547__$1);
var G__38698 = c__4638__auto__;
var G__38699 = cljs.core.count(c__4638__auto__);
var G__38700 = (0);
seq__38547 = G__38697;
chunk__38548 = G__38698;
count__38549 = G__38699;
i__38550 = G__38700;
continue;
} else {
var event = cljs.core.first(seq__38547__$1);
clear_event(event);


var G__38703 = cljs.core.next(seq__38547__$1);
var G__38704 = null;
var G__38705 = (0);
var G__38706 = (0);
seq__38547 = G__38703;
chunk__38548 = G__38704;
count__38549 = G__38705;
i__38550 = G__38706;
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
day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.fx.reg_fx(new cljs.core.Keyword(null,"db","db",993250759),(function (value){
if((!((cljs.core.deref(day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.db.app_db) === value)))){
return cljs.core.reset_BANG_(day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.db.app_db,value);
} else {
return null;
}
}));

//# sourceMappingURL=day8.re_frame_10x.inlined_deps.re_frame.v1v1v2.re_frame.fx.js.map

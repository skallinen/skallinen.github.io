goog.provide('devtools.format');

/**
 * @interface
 */
devtools.format.IDevtoolsFormat = function(){};

var devtools$format$IDevtoolsFormat$_header$dyn_34300 = (function (value){
var x__4509__auto__ = (((value == null))?null:value);
var m__4510__auto__ = (devtools.format._header[goog.typeOf(x__4509__auto__)]);
if((!((m__4510__auto__ == null)))){
return (m__4510__auto__.cljs$core$IFn$_invoke$arity$1 ? m__4510__auto__.cljs$core$IFn$_invoke$arity$1(value) : m__4510__auto__.call(null,value));
} else {
var m__4508__auto__ = (devtools.format._header["_"]);
if((!((m__4508__auto__ == null)))){
return (m__4508__auto__.cljs$core$IFn$_invoke$arity$1 ? m__4508__auto__.cljs$core$IFn$_invoke$arity$1(value) : m__4508__auto__.call(null,value));
} else {
throw cljs.core.missing_protocol("IDevtoolsFormat.-header",value);
}
}
});
devtools.format._header = (function devtools$format$_header(value){
if((((!((value == null)))) && ((!((value.devtools$format$IDevtoolsFormat$_header$arity$1 == null)))))){
return value.devtools$format$IDevtoolsFormat$_header$arity$1(value);
} else {
return devtools$format$IDevtoolsFormat$_header$dyn_34300(value);
}
});

var devtools$format$IDevtoolsFormat$_has_body$dyn_34308 = (function (value){
var x__4509__auto__ = (((value == null))?null:value);
var m__4510__auto__ = (devtools.format._has_body[goog.typeOf(x__4509__auto__)]);
if((!((m__4510__auto__ == null)))){
return (m__4510__auto__.cljs$core$IFn$_invoke$arity$1 ? m__4510__auto__.cljs$core$IFn$_invoke$arity$1(value) : m__4510__auto__.call(null,value));
} else {
var m__4508__auto__ = (devtools.format._has_body["_"]);
if((!((m__4508__auto__ == null)))){
return (m__4508__auto__.cljs$core$IFn$_invoke$arity$1 ? m__4508__auto__.cljs$core$IFn$_invoke$arity$1(value) : m__4508__auto__.call(null,value));
} else {
throw cljs.core.missing_protocol("IDevtoolsFormat.-has-body",value);
}
}
});
devtools.format._has_body = (function devtools$format$_has_body(value){
if((((!((value == null)))) && ((!((value.devtools$format$IDevtoolsFormat$_has_body$arity$1 == null)))))){
return value.devtools$format$IDevtoolsFormat$_has_body$arity$1(value);
} else {
return devtools$format$IDevtoolsFormat$_has_body$dyn_34308(value);
}
});

var devtools$format$IDevtoolsFormat$_body$dyn_34317 = (function (value){
var x__4509__auto__ = (((value == null))?null:value);
var m__4510__auto__ = (devtools.format._body[goog.typeOf(x__4509__auto__)]);
if((!((m__4510__auto__ == null)))){
return (m__4510__auto__.cljs$core$IFn$_invoke$arity$1 ? m__4510__auto__.cljs$core$IFn$_invoke$arity$1(value) : m__4510__auto__.call(null,value));
} else {
var m__4508__auto__ = (devtools.format._body["_"]);
if((!((m__4508__auto__ == null)))){
return (m__4508__auto__.cljs$core$IFn$_invoke$arity$1 ? m__4508__auto__.cljs$core$IFn$_invoke$arity$1(value) : m__4508__auto__.call(null,value));
} else {
throw cljs.core.missing_protocol("IDevtoolsFormat.-body",value);
}
}
});
devtools.format._body = (function devtools$format$_body(value){
if((((!((value == null)))) && ((!((value.devtools$format$IDevtoolsFormat$_body$arity$1 == null)))))){
return value.devtools$format$IDevtoolsFormat$_body$arity$1(value);
} else {
return devtools$format$IDevtoolsFormat$_body$dyn_34317(value);
}
});

devtools.format.setup_BANG_ = (function devtools$format$setup_BANG_(){
if(cljs.core.truth_(devtools.format._STAR_setup_done_STAR_)){
return null;
} else {
(devtools.format._STAR_setup_done_STAR_ = true);

devtools.format.make_template_fn = (function (){var temp__5751__auto__ = (devtools.context.get_root.call(null)["devtools"]);
if(cljs.core.truth_(temp__5751__auto__)){
var o33923 = temp__5751__auto__;
var temp__5751__auto____$1 = (o33923["formatters"]);
if(cljs.core.truth_(temp__5751__auto____$1)){
var o33924 = temp__5751__auto____$1;
var temp__5751__auto____$2 = (o33924["templating"]);
if(cljs.core.truth_(temp__5751__auto____$2)){
var o33925 = temp__5751__auto____$2;
return (o33925["make_template"]);
} else {
return null;
}
} else {
return null;
}
} else {
return null;
}
})();

devtools.format.make_group_fn = (function (){var temp__5751__auto__ = (devtools.context.get_root.call(null)["devtools"]);
if(cljs.core.truth_(temp__5751__auto__)){
var o33934 = temp__5751__auto__;
var temp__5751__auto____$1 = (o33934["formatters"]);
if(cljs.core.truth_(temp__5751__auto____$1)){
var o33935 = temp__5751__auto____$1;
var temp__5751__auto____$2 = (o33935["templating"]);
if(cljs.core.truth_(temp__5751__auto____$2)){
var o33936 = temp__5751__auto____$2;
return (o33936["make_group"]);
} else {
return null;
}
} else {
return null;
}
} else {
return null;
}
})();

devtools.format.make_reference_fn = (function (){var temp__5751__auto__ = (devtools.context.get_root.call(null)["devtools"]);
if(cljs.core.truth_(temp__5751__auto__)){
var o33950 = temp__5751__auto__;
var temp__5751__auto____$1 = (o33950["formatters"]);
if(cljs.core.truth_(temp__5751__auto____$1)){
var o33951 = temp__5751__auto____$1;
var temp__5751__auto____$2 = (o33951["templating"]);
if(cljs.core.truth_(temp__5751__auto____$2)){
var o33952 = temp__5751__auto____$2;
return (o33952["make_reference"]);
} else {
return null;
}
} else {
return null;
}
} else {
return null;
}
})();

devtools.format.make_surrogate_fn = (function (){var temp__5751__auto__ = (devtools.context.get_root.call(null)["devtools"]);
if(cljs.core.truth_(temp__5751__auto__)){
var o33960 = temp__5751__auto__;
var temp__5751__auto____$1 = (o33960["formatters"]);
if(cljs.core.truth_(temp__5751__auto____$1)){
var o33962 = temp__5751__auto____$1;
var temp__5751__auto____$2 = (o33962["templating"]);
if(cljs.core.truth_(temp__5751__auto____$2)){
var o33963 = temp__5751__auto____$2;
return (o33963["make_surrogate"]);
} else {
return null;
}
} else {
return null;
}
} else {
return null;
}
})();

devtools.format.render_markup_fn = (function (){var temp__5751__auto__ = (devtools.context.get_root.call(null)["devtools"]);
if(cljs.core.truth_(temp__5751__auto__)){
var o33968 = temp__5751__auto__;
var temp__5751__auto____$1 = (o33968["formatters"]);
if(cljs.core.truth_(temp__5751__auto____$1)){
var o33969 = temp__5751__auto____$1;
var temp__5751__auto____$2 = (o33969["templating"]);
if(cljs.core.truth_(temp__5751__auto____$2)){
var o33970 = temp__5751__auto____$2;
return (o33970["render_markup"]);
} else {
return null;
}
} else {
return null;
}
} else {
return null;
}
})();

devtools.format._LT_header_GT__fn = (function (){var temp__5751__auto__ = (devtools.context.get_root.call(null)["devtools"]);
if(cljs.core.truth_(temp__5751__auto__)){
var o33980 = temp__5751__auto__;
var temp__5751__auto____$1 = (o33980["formatters"]);
if(cljs.core.truth_(temp__5751__auto____$1)){
var o33981 = temp__5751__auto____$1;
var temp__5751__auto____$2 = (o33981["markup"]);
if(cljs.core.truth_(temp__5751__auto____$2)){
var o33982 = temp__5751__auto____$2;
return (o33982["_LT_header_GT_"]);
} else {
return null;
}
} else {
return null;
}
} else {
return null;
}
})();

devtools.format._LT_standard_body_GT__fn = (function (){var temp__5751__auto__ = (devtools.context.get_root.call(null)["devtools"]);
if(cljs.core.truth_(temp__5751__auto__)){
var o33996 = temp__5751__auto__;
var temp__5751__auto____$1 = (o33996["formatters"]);
if(cljs.core.truth_(temp__5751__auto____$1)){
var o33998 = temp__5751__auto____$1;
var temp__5751__auto____$2 = (o33998["markup"]);
if(cljs.core.truth_(temp__5751__auto____$2)){
var o33999 = temp__5751__auto____$2;
return (o33999["_LT_standard_body_GT_"]);
} else {
return null;
}
} else {
return null;
}
} else {
return null;
}
})();

if(cljs.core.truth_(devtools.format.make_template_fn)){
} else {
throw (new Error("Assert failed: make-template-fn"));
}

if(cljs.core.truth_(devtools.format.make_group_fn)){
} else {
throw (new Error("Assert failed: make-group-fn"));
}

if(cljs.core.truth_(devtools.format.make_reference_fn)){
} else {
throw (new Error("Assert failed: make-reference-fn"));
}

if(cljs.core.truth_(devtools.format.make_surrogate_fn)){
} else {
throw (new Error("Assert failed: make-surrogate-fn"));
}

if(cljs.core.truth_(devtools.format.render_markup_fn)){
} else {
throw (new Error("Assert failed: render-markup-fn"));
}

if(cljs.core.truth_(devtools.format._LT_header_GT__fn)){
} else {
throw (new Error("Assert failed: <header>-fn"));
}

if(cljs.core.truth_(devtools.format._LT_standard_body_GT__fn)){
return null;
} else {
throw (new Error("Assert failed: <standard-body>-fn"));
}
}
});
devtools.format.render_markup = (function devtools$format$render_markup(var_args){
var args__4824__auto__ = [];
var len__4818__auto___34393 = arguments.length;
var i__4819__auto___34394 = (0);
while(true){
if((i__4819__auto___34394 < len__4818__auto___34393)){
args__4824__auto__.push((arguments[i__4819__auto___34394]));

var G__34400 = (i__4819__auto___34394 + (1));
i__4819__auto___34394 = G__34400;
continue;
} else {
}
break;
}

var argseq__4825__auto__ = ((((0) < args__4824__auto__.length))?(new cljs.core.IndexedSeq(args__4824__auto__.slice((0)),(0),null)):null);
return devtools.format.render_markup.cljs$core$IFn$_invoke$arity$variadic(argseq__4825__auto__);
});

(devtools.format.render_markup.cljs$core$IFn$_invoke$arity$variadic = (function (args){
devtools.format.setup_BANG_();

return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(devtools.format.render_markup_fn,args);
}));

(devtools.format.render_markup.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(devtools.format.render_markup.cljs$lang$applyTo = (function (seq34016){
var self__4806__auto__ = this;
return self__4806__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq34016));
}));

devtools.format.make_template = (function devtools$format$make_template(var_args){
var args__4824__auto__ = [];
var len__4818__auto___34415 = arguments.length;
var i__4819__auto___34419 = (0);
while(true){
if((i__4819__auto___34419 < len__4818__auto___34415)){
args__4824__auto__.push((arguments[i__4819__auto___34419]));

var G__34421 = (i__4819__auto___34419 + (1));
i__4819__auto___34419 = G__34421;
continue;
} else {
}
break;
}

var argseq__4825__auto__ = ((((0) < args__4824__auto__.length))?(new cljs.core.IndexedSeq(args__4824__auto__.slice((0)),(0),null)):null);
return devtools.format.make_template.cljs$core$IFn$_invoke$arity$variadic(argseq__4825__auto__);
});

(devtools.format.make_template.cljs$core$IFn$_invoke$arity$variadic = (function (args){
devtools.format.setup_BANG_();

return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(devtools.format.make_template_fn,args);
}));

(devtools.format.make_template.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(devtools.format.make_template.cljs$lang$applyTo = (function (seq34035){
var self__4806__auto__ = this;
return self__4806__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq34035));
}));

devtools.format.make_group = (function devtools$format$make_group(var_args){
var args__4824__auto__ = [];
var len__4818__auto___34436 = arguments.length;
var i__4819__auto___34438 = (0);
while(true){
if((i__4819__auto___34438 < len__4818__auto___34436)){
args__4824__auto__.push((arguments[i__4819__auto___34438]));

var G__34440 = (i__4819__auto___34438 + (1));
i__4819__auto___34438 = G__34440;
continue;
} else {
}
break;
}

var argseq__4825__auto__ = ((((0) < args__4824__auto__.length))?(new cljs.core.IndexedSeq(args__4824__auto__.slice((0)),(0),null)):null);
return devtools.format.make_group.cljs$core$IFn$_invoke$arity$variadic(argseq__4825__auto__);
});

(devtools.format.make_group.cljs$core$IFn$_invoke$arity$variadic = (function (args){
devtools.format.setup_BANG_();

return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(devtools.format.make_group_fn,args);
}));

(devtools.format.make_group.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(devtools.format.make_group.cljs$lang$applyTo = (function (seq34059){
var self__4806__auto__ = this;
return self__4806__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq34059));
}));

devtools.format.make_surrogate = (function devtools$format$make_surrogate(var_args){
var args__4824__auto__ = [];
var len__4818__auto___34453 = arguments.length;
var i__4819__auto___34454 = (0);
while(true){
if((i__4819__auto___34454 < len__4818__auto___34453)){
args__4824__auto__.push((arguments[i__4819__auto___34454]));

var G__34455 = (i__4819__auto___34454 + (1));
i__4819__auto___34454 = G__34455;
continue;
} else {
}
break;
}

var argseq__4825__auto__ = ((((0) < args__4824__auto__.length))?(new cljs.core.IndexedSeq(args__4824__auto__.slice((0)),(0),null)):null);
return devtools.format.make_surrogate.cljs$core$IFn$_invoke$arity$variadic(argseq__4825__auto__);
});

(devtools.format.make_surrogate.cljs$core$IFn$_invoke$arity$variadic = (function (args){
devtools.format.setup_BANG_();

return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(devtools.format.make_surrogate_fn,args);
}));

(devtools.format.make_surrogate.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(devtools.format.make_surrogate.cljs$lang$applyTo = (function (seq34085){
var self__4806__auto__ = this;
return self__4806__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq34085));
}));

devtools.format.template = (function devtools$format$template(var_args){
var args__4824__auto__ = [];
var len__4818__auto___34467 = arguments.length;
var i__4819__auto___34468 = (0);
while(true){
if((i__4819__auto___34468 < len__4818__auto___34467)){
args__4824__auto__.push((arguments[i__4819__auto___34468]));

var G__34469 = (i__4819__auto___34468 + (1));
i__4819__auto___34468 = G__34469;
continue;
} else {
}
break;
}

var argseq__4825__auto__ = ((((0) < args__4824__auto__.length))?(new cljs.core.IndexedSeq(args__4824__auto__.slice((0)),(0),null)):null);
return devtools.format.template.cljs$core$IFn$_invoke$arity$variadic(argseq__4825__auto__);
});

(devtools.format.template.cljs$core$IFn$_invoke$arity$variadic = (function (args){
devtools.format.setup_BANG_();

return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(devtools.format.make_template_fn,args);
}));

(devtools.format.template.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(devtools.format.template.cljs$lang$applyTo = (function (seq34108){
var self__4806__auto__ = this;
return self__4806__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq34108));
}));

devtools.format.group = (function devtools$format$group(var_args){
var args__4824__auto__ = [];
var len__4818__auto___34479 = arguments.length;
var i__4819__auto___34481 = (0);
while(true){
if((i__4819__auto___34481 < len__4818__auto___34479)){
args__4824__auto__.push((arguments[i__4819__auto___34481]));

var G__34483 = (i__4819__auto___34481 + (1));
i__4819__auto___34481 = G__34483;
continue;
} else {
}
break;
}

var argseq__4825__auto__ = ((((0) < args__4824__auto__.length))?(new cljs.core.IndexedSeq(args__4824__auto__.slice((0)),(0),null)):null);
return devtools.format.group.cljs$core$IFn$_invoke$arity$variadic(argseq__4825__auto__);
});

(devtools.format.group.cljs$core$IFn$_invoke$arity$variadic = (function (args){
devtools.format.setup_BANG_();

return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(devtools.format.make_group_fn,args);
}));

(devtools.format.group.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(devtools.format.group.cljs$lang$applyTo = (function (seq34140){
var self__4806__auto__ = this;
return self__4806__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq34140));
}));

devtools.format.surrogate = (function devtools$format$surrogate(var_args){
var args__4824__auto__ = [];
var len__4818__auto___34493 = arguments.length;
var i__4819__auto___34495 = (0);
while(true){
if((i__4819__auto___34495 < len__4818__auto___34493)){
args__4824__auto__.push((arguments[i__4819__auto___34495]));

var G__34503 = (i__4819__auto___34495 + (1));
i__4819__auto___34495 = G__34503;
continue;
} else {
}
break;
}

var argseq__4825__auto__ = ((((0) < args__4824__auto__.length))?(new cljs.core.IndexedSeq(args__4824__auto__.slice((0)),(0),null)):null);
return devtools.format.surrogate.cljs$core$IFn$_invoke$arity$variadic(argseq__4825__auto__);
});

(devtools.format.surrogate.cljs$core$IFn$_invoke$arity$variadic = (function (args){
devtools.format.setup_BANG_();

return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(devtools.format.make_surrogate_fn,args);
}));

(devtools.format.surrogate.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(devtools.format.surrogate.cljs$lang$applyTo = (function (seq34159){
var self__4806__auto__ = this;
return self__4806__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq34159));
}));

devtools.format.reference = (function devtools$format$reference(var_args){
var args__4824__auto__ = [];
var len__4818__auto___34513 = arguments.length;
var i__4819__auto___34515 = (0);
while(true){
if((i__4819__auto___34515 < len__4818__auto___34513)){
args__4824__auto__.push((arguments[i__4819__auto___34515]));

var G__34517 = (i__4819__auto___34515 + (1));
i__4819__auto___34515 = G__34517;
continue;
} else {
}
break;
}

var argseq__4825__auto__ = ((((1) < args__4824__auto__.length))?(new cljs.core.IndexedSeq(args__4824__auto__.slice((1)),(0),null)):null);
return devtools.format.reference.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__4825__auto__);
});

(devtools.format.reference.cljs$core$IFn$_invoke$arity$variadic = (function (object,p__34201){
var vec__34208 = p__34201;
var state_override = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34208,(0),null);
devtools.format.setup_BANG_();

return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(devtools.format.make_reference_fn,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [object,(function (p1__34183_SHARP_){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([p1__34183_SHARP_,state_override], 0));
})], null));
}));

(devtools.format.reference.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(devtools.format.reference.cljs$lang$applyTo = (function (seq34187){
var G__34188 = cljs.core.first(seq34187);
var seq34187__$1 = cljs.core.next(seq34187);
var self__4805__auto__ = this;
return self__4805__auto__.cljs$core$IFn$_invoke$arity$variadic(G__34188,seq34187__$1);
}));

devtools.format.standard_reference = (function devtools$format$standard_reference(target){
devtools.format.setup_BANG_();

var G__34223 = new cljs.core.Keyword(null,"ol","ol",932524051);
var G__34224 = new cljs.core.Keyword(null,"standard-ol-style","standard-ol-style",2143825615);
var G__34225 = (function (){var G__34228 = new cljs.core.Keyword(null,"li","li",723558921);
var G__34229 = new cljs.core.Keyword(null,"standard-li-style","standard-li-style",413442955);
var G__34230 = (devtools.format.make_reference_fn.cljs$core$IFn$_invoke$arity$1 ? devtools.format.make_reference_fn.cljs$core$IFn$_invoke$arity$1(target) : devtools.format.make_reference_fn.call(null,target));
return (devtools.format.make_template_fn.cljs$core$IFn$_invoke$arity$3 ? devtools.format.make_template_fn.cljs$core$IFn$_invoke$arity$3(G__34228,G__34229,G__34230) : devtools.format.make_template_fn.call(null,G__34228,G__34229,G__34230));
})();
return (devtools.format.make_template_fn.cljs$core$IFn$_invoke$arity$3 ? devtools.format.make_template_fn.cljs$core$IFn$_invoke$arity$3(G__34223,G__34224,G__34225) : devtools.format.make_template_fn.call(null,G__34223,G__34224,G__34225));
});
devtools.format.build_header = (function devtools$format$build_header(var_args){
var args__4824__auto__ = [];
var len__4818__auto___34546 = arguments.length;
var i__4819__auto___34549 = (0);
while(true){
if((i__4819__auto___34549 < len__4818__auto___34546)){
args__4824__auto__.push((arguments[i__4819__auto___34549]));

var G__34554 = (i__4819__auto___34549 + (1));
i__4819__auto___34549 = G__34554;
continue;
} else {
}
break;
}

var argseq__4825__auto__ = ((((0) < args__4824__auto__.length))?(new cljs.core.IndexedSeq(args__4824__auto__.slice((0)),(0),null)):null);
return devtools.format.build_header.cljs$core$IFn$_invoke$arity$variadic(argseq__4825__auto__);
});

(devtools.format.build_header.cljs$core$IFn$_invoke$arity$variadic = (function (args){
devtools.format.setup_BANG_();

return devtools.format.render_markup.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.apply.cljs$core$IFn$_invoke$arity$2(devtools.format._LT_header_GT__fn,args)], 0));
}));

(devtools.format.build_header.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(devtools.format.build_header.cljs$lang$applyTo = (function (seq34241){
var self__4806__auto__ = this;
return self__4806__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq34241));
}));

devtools.format.standard_body_template = (function devtools$format$standard_body_template(var_args){
var args__4824__auto__ = [];
var len__4818__auto___34566 = arguments.length;
var i__4819__auto___34567 = (0);
while(true){
if((i__4819__auto___34567 < len__4818__auto___34566)){
args__4824__auto__.push((arguments[i__4819__auto___34567]));

var G__34568 = (i__4819__auto___34567 + (1));
i__4819__auto___34567 = G__34568;
continue;
} else {
}
break;
}

var argseq__4825__auto__ = ((((1) < args__4824__auto__.length))?(new cljs.core.IndexedSeq(args__4824__auto__.slice((1)),(0),null)):null);
return devtools.format.standard_body_template.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__4825__auto__);
});

(devtools.format.standard_body_template.cljs$core$IFn$_invoke$arity$variadic = (function (lines,rest){
devtools.format.setup_BANG_();

var args = cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (x){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [x], null);
}),lines)], null),rest);
return devtools.format.render_markup.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.apply.cljs$core$IFn$_invoke$arity$2(devtools.format._LT_standard_body_GT__fn,args)], 0));
}));

(devtools.format.standard_body_template.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(devtools.format.standard_body_template.cljs$lang$applyTo = (function (seq34260){
var G__34262 = cljs.core.first(seq34260);
var seq34260__$1 = cljs.core.next(seq34260);
var self__4805__auto__ = this;
return self__4805__auto__.cljs$core$IFn$_invoke$arity$variadic(G__34262,seq34260__$1);
}));


//# sourceMappingURL=devtools.format.js.map

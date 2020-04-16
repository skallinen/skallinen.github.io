// Compiled by ClojureScript 1.10.597 {}
goog.provide('devtools.format');
goog.require('cljs.core');
goog.require('devtools.context');

/**
 * @interface
 */
devtools.format.IDevtoolsFormat = function(){};

devtools.format._header = (function devtools$format$_header(value){
if((((!((value == null)))) && ((!((value.devtools$format$IDevtoolsFormat$_header$arity$1 == null)))))){
return value.devtools$format$IDevtoolsFormat$_header$arity$1(value);
} else {
var x__4487__auto__ = (((value == null))?null:value);
var m__4488__auto__ = (devtools.format._header[goog.typeOf(x__4487__auto__)]);
if((!((m__4488__auto__ == null)))){
return m__4488__auto__.call(null,value);
} else {
var m__4485__auto__ = (devtools.format._header["_"]);
if((!((m__4485__auto__ == null)))){
return m__4485__auto__.call(null,value);
} else {
throw cljs.core.missing_protocol.call(null,"IDevtoolsFormat.-header",value);
}
}
}
});

devtools.format._has_body = (function devtools$format$_has_body(value){
if((((!((value == null)))) && ((!((value.devtools$format$IDevtoolsFormat$_has_body$arity$1 == null)))))){
return value.devtools$format$IDevtoolsFormat$_has_body$arity$1(value);
} else {
var x__4487__auto__ = (((value == null))?null:value);
var m__4488__auto__ = (devtools.format._has_body[goog.typeOf(x__4487__auto__)]);
if((!((m__4488__auto__ == null)))){
return m__4488__auto__.call(null,value);
} else {
var m__4485__auto__ = (devtools.format._has_body["_"]);
if((!((m__4485__auto__ == null)))){
return m__4485__auto__.call(null,value);
} else {
throw cljs.core.missing_protocol.call(null,"IDevtoolsFormat.-has-body",value);
}
}
}
});

devtools.format._body = (function devtools$format$_body(value){
if((((!((value == null)))) && ((!((value.devtools$format$IDevtoolsFormat$_body$arity$1 == null)))))){
return value.devtools$format$IDevtoolsFormat$_body$arity$1(value);
} else {
var x__4487__auto__ = (((value == null))?null:value);
var m__4488__auto__ = (devtools.format._body[goog.typeOf(x__4487__auto__)]);
if((!((m__4488__auto__ == null)))){
return m__4488__auto__.call(null,value);
} else {
var m__4485__auto__ = (devtools.format._body["_"]);
if((!((m__4485__auto__ == null)))){
return m__4485__auto__.call(null,value);
} else {
throw cljs.core.missing_protocol.call(null,"IDevtoolsFormat.-body",value);
}
}
}
});

devtools.format.setup_BANG_ = (function devtools$format$setup_BANG_(){
if(cljs.core.truth_(devtools.format._STAR_setup_done_STAR_)){
return null;
} else {
(devtools.format._STAR_setup_done_STAR_ = true);

devtools.format.make_template_fn = (function (){var temp__5733__auto__ = (devtools.context.get_root.call(null)["devtools"]);
if(cljs.core.truth_(temp__5733__auto__)){
var o23911 = temp__5733__auto__;
var temp__5733__auto____$1 = (o23911["formatters"]);
if(cljs.core.truth_(temp__5733__auto____$1)){
var o23912 = temp__5733__auto____$1;
var temp__5733__auto____$2 = (o23912["templating"]);
if(cljs.core.truth_(temp__5733__auto____$2)){
var o23913 = temp__5733__auto____$2;
return (o23913["make_template"]);
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

devtools.format.make_group_fn = (function (){var temp__5733__auto__ = (devtools.context.get_root.call(null)["devtools"]);
if(cljs.core.truth_(temp__5733__auto__)){
var o23914 = temp__5733__auto__;
var temp__5733__auto____$1 = (o23914["formatters"]);
if(cljs.core.truth_(temp__5733__auto____$1)){
var o23915 = temp__5733__auto____$1;
var temp__5733__auto____$2 = (o23915["templating"]);
if(cljs.core.truth_(temp__5733__auto____$2)){
var o23916 = temp__5733__auto____$2;
return (o23916["make_group"]);
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

devtools.format.make_reference_fn = (function (){var temp__5733__auto__ = (devtools.context.get_root.call(null)["devtools"]);
if(cljs.core.truth_(temp__5733__auto__)){
var o23917 = temp__5733__auto__;
var temp__5733__auto____$1 = (o23917["formatters"]);
if(cljs.core.truth_(temp__5733__auto____$1)){
var o23918 = temp__5733__auto____$1;
var temp__5733__auto____$2 = (o23918["templating"]);
if(cljs.core.truth_(temp__5733__auto____$2)){
var o23919 = temp__5733__auto____$2;
return (o23919["make_reference"]);
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

devtools.format.make_surrogate_fn = (function (){var temp__5733__auto__ = (devtools.context.get_root.call(null)["devtools"]);
if(cljs.core.truth_(temp__5733__auto__)){
var o23920 = temp__5733__auto__;
var temp__5733__auto____$1 = (o23920["formatters"]);
if(cljs.core.truth_(temp__5733__auto____$1)){
var o23921 = temp__5733__auto____$1;
var temp__5733__auto____$2 = (o23921["templating"]);
if(cljs.core.truth_(temp__5733__auto____$2)){
var o23922 = temp__5733__auto____$2;
return (o23922["make_surrogate"]);
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

devtools.format.render_markup_fn = (function (){var temp__5733__auto__ = (devtools.context.get_root.call(null)["devtools"]);
if(cljs.core.truth_(temp__5733__auto__)){
var o23923 = temp__5733__auto__;
var temp__5733__auto____$1 = (o23923["formatters"]);
if(cljs.core.truth_(temp__5733__auto____$1)){
var o23924 = temp__5733__auto____$1;
var temp__5733__auto____$2 = (o23924["templating"]);
if(cljs.core.truth_(temp__5733__auto____$2)){
var o23925 = temp__5733__auto____$2;
return (o23925["render_markup"]);
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

devtools.format._LT_header_GT__fn = (function (){var temp__5733__auto__ = (devtools.context.get_root.call(null)["devtools"]);
if(cljs.core.truth_(temp__5733__auto__)){
var o23926 = temp__5733__auto__;
var temp__5733__auto____$1 = (o23926["formatters"]);
if(cljs.core.truth_(temp__5733__auto____$1)){
var o23927 = temp__5733__auto____$1;
var temp__5733__auto____$2 = (o23927["markup"]);
if(cljs.core.truth_(temp__5733__auto____$2)){
var o23928 = temp__5733__auto____$2;
return (o23928["_LT_header_GT_"]);
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

devtools.format._LT_standard_body_GT__fn = (function (){var temp__5733__auto__ = (devtools.context.get_root.call(null)["devtools"]);
if(cljs.core.truth_(temp__5733__auto__)){
var o23929 = temp__5733__auto__;
var temp__5733__auto____$1 = (o23929["formatters"]);
if(cljs.core.truth_(temp__5733__auto____$1)){
var o23930 = temp__5733__auto____$1;
var temp__5733__auto____$2 = (o23930["markup"]);
if(cljs.core.truth_(temp__5733__auto____$2)){
var o23931 = temp__5733__auto____$2;
return (o23931["_LT_standard_body_GT_"]);
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
var args__4795__auto__ = [];
var len__4789__auto___23933 = arguments.length;
var i__4790__auto___23934 = (0);
while(true){
if((i__4790__auto___23934 < len__4789__auto___23933)){
args__4795__auto__.push((arguments[i__4790__auto___23934]));

var G__23935 = (i__4790__auto___23934 + (1));
i__4790__auto___23934 = G__23935;
continue;
} else {
}
break;
}

var argseq__4796__auto__ = ((((0) < args__4795__auto__.length))?(new cljs.core.IndexedSeq(args__4795__auto__.slice((0)),(0),null)):null);
return devtools.format.render_markup.cljs$core$IFn$_invoke$arity$variadic(argseq__4796__auto__);
});

(devtools.format.render_markup.cljs$core$IFn$_invoke$arity$variadic = (function (args){
devtools.format.setup_BANG_.call(null);

return cljs.core.apply.call(null,devtools.format.render_markup_fn,args);
}));

(devtools.format.render_markup.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(devtools.format.render_markup.cljs$lang$applyTo = (function (seq23932){
var self__4777__auto__ = this;
return self__4777__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq23932));
}));

devtools.format.make_template = (function devtools$format$make_template(var_args){
var args__4795__auto__ = [];
var len__4789__auto___23937 = arguments.length;
var i__4790__auto___23938 = (0);
while(true){
if((i__4790__auto___23938 < len__4789__auto___23937)){
args__4795__auto__.push((arguments[i__4790__auto___23938]));

var G__23939 = (i__4790__auto___23938 + (1));
i__4790__auto___23938 = G__23939;
continue;
} else {
}
break;
}

var argseq__4796__auto__ = ((((0) < args__4795__auto__.length))?(new cljs.core.IndexedSeq(args__4795__auto__.slice((0)),(0),null)):null);
return devtools.format.make_template.cljs$core$IFn$_invoke$arity$variadic(argseq__4796__auto__);
});

(devtools.format.make_template.cljs$core$IFn$_invoke$arity$variadic = (function (args){
devtools.format.setup_BANG_.call(null);

return cljs.core.apply.call(null,devtools.format.make_template_fn,args);
}));

(devtools.format.make_template.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(devtools.format.make_template.cljs$lang$applyTo = (function (seq23936){
var self__4777__auto__ = this;
return self__4777__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq23936));
}));

devtools.format.make_group = (function devtools$format$make_group(var_args){
var args__4795__auto__ = [];
var len__4789__auto___23941 = arguments.length;
var i__4790__auto___23942 = (0);
while(true){
if((i__4790__auto___23942 < len__4789__auto___23941)){
args__4795__auto__.push((arguments[i__4790__auto___23942]));

var G__23943 = (i__4790__auto___23942 + (1));
i__4790__auto___23942 = G__23943;
continue;
} else {
}
break;
}

var argseq__4796__auto__ = ((((0) < args__4795__auto__.length))?(new cljs.core.IndexedSeq(args__4795__auto__.slice((0)),(0),null)):null);
return devtools.format.make_group.cljs$core$IFn$_invoke$arity$variadic(argseq__4796__auto__);
});

(devtools.format.make_group.cljs$core$IFn$_invoke$arity$variadic = (function (args){
devtools.format.setup_BANG_.call(null);

return cljs.core.apply.call(null,devtools.format.make_group_fn,args);
}));

(devtools.format.make_group.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(devtools.format.make_group.cljs$lang$applyTo = (function (seq23940){
var self__4777__auto__ = this;
return self__4777__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq23940));
}));

devtools.format.make_surrogate = (function devtools$format$make_surrogate(var_args){
var args__4795__auto__ = [];
var len__4789__auto___23945 = arguments.length;
var i__4790__auto___23946 = (0);
while(true){
if((i__4790__auto___23946 < len__4789__auto___23945)){
args__4795__auto__.push((arguments[i__4790__auto___23946]));

var G__23947 = (i__4790__auto___23946 + (1));
i__4790__auto___23946 = G__23947;
continue;
} else {
}
break;
}

var argseq__4796__auto__ = ((((0) < args__4795__auto__.length))?(new cljs.core.IndexedSeq(args__4795__auto__.slice((0)),(0),null)):null);
return devtools.format.make_surrogate.cljs$core$IFn$_invoke$arity$variadic(argseq__4796__auto__);
});

(devtools.format.make_surrogate.cljs$core$IFn$_invoke$arity$variadic = (function (args){
devtools.format.setup_BANG_.call(null);

return cljs.core.apply.call(null,devtools.format.make_surrogate_fn,args);
}));

(devtools.format.make_surrogate.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(devtools.format.make_surrogate.cljs$lang$applyTo = (function (seq23944){
var self__4777__auto__ = this;
return self__4777__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq23944));
}));

devtools.format.template = (function devtools$format$template(var_args){
var args__4795__auto__ = [];
var len__4789__auto___23949 = arguments.length;
var i__4790__auto___23950 = (0);
while(true){
if((i__4790__auto___23950 < len__4789__auto___23949)){
args__4795__auto__.push((arguments[i__4790__auto___23950]));

var G__23951 = (i__4790__auto___23950 + (1));
i__4790__auto___23950 = G__23951;
continue;
} else {
}
break;
}

var argseq__4796__auto__ = ((((0) < args__4795__auto__.length))?(new cljs.core.IndexedSeq(args__4795__auto__.slice((0)),(0),null)):null);
return devtools.format.template.cljs$core$IFn$_invoke$arity$variadic(argseq__4796__auto__);
});

(devtools.format.template.cljs$core$IFn$_invoke$arity$variadic = (function (args){
devtools.format.setup_BANG_.call(null);

return cljs.core.apply.call(null,devtools.format.make_template_fn,args);
}));

(devtools.format.template.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(devtools.format.template.cljs$lang$applyTo = (function (seq23948){
var self__4777__auto__ = this;
return self__4777__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq23948));
}));

devtools.format.group = (function devtools$format$group(var_args){
var args__4795__auto__ = [];
var len__4789__auto___23953 = arguments.length;
var i__4790__auto___23954 = (0);
while(true){
if((i__4790__auto___23954 < len__4789__auto___23953)){
args__4795__auto__.push((arguments[i__4790__auto___23954]));

var G__23955 = (i__4790__auto___23954 + (1));
i__4790__auto___23954 = G__23955;
continue;
} else {
}
break;
}

var argseq__4796__auto__ = ((((0) < args__4795__auto__.length))?(new cljs.core.IndexedSeq(args__4795__auto__.slice((0)),(0),null)):null);
return devtools.format.group.cljs$core$IFn$_invoke$arity$variadic(argseq__4796__auto__);
});

(devtools.format.group.cljs$core$IFn$_invoke$arity$variadic = (function (args){
devtools.format.setup_BANG_.call(null);

return cljs.core.apply.call(null,devtools.format.make_group_fn,args);
}));

(devtools.format.group.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(devtools.format.group.cljs$lang$applyTo = (function (seq23952){
var self__4777__auto__ = this;
return self__4777__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq23952));
}));

devtools.format.surrogate = (function devtools$format$surrogate(var_args){
var args__4795__auto__ = [];
var len__4789__auto___23957 = arguments.length;
var i__4790__auto___23958 = (0);
while(true){
if((i__4790__auto___23958 < len__4789__auto___23957)){
args__4795__auto__.push((arguments[i__4790__auto___23958]));

var G__23959 = (i__4790__auto___23958 + (1));
i__4790__auto___23958 = G__23959;
continue;
} else {
}
break;
}

var argseq__4796__auto__ = ((((0) < args__4795__auto__.length))?(new cljs.core.IndexedSeq(args__4795__auto__.slice((0)),(0),null)):null);
return devtools.format.surrogate.cljs$core$IFn$_invoke$arity$variadic(argseq__4796__auto__);
});

(devtools.format.surrogate.cljs$core$IFn$_invoke$arity$variadic = (function (args){
devtools.format.setup_BANG_.call(null);

return cljs.core.apply.call(null,devtools.format.make_surrogate_fn,args);
}));

(devtools.format.surrogate.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(devtools.format.surrogate.cljs$lang$applyTo = (function (seq23956){
var self__4777__auto__ = this;
return self__4777__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq23956));
}));

devtools.format.reference = (function devtools$format$reference(var_args){
var args__4795__auto__ = [];
var len__4789__auto___23967 = arguments.length;
var i__4790__auto___23968 = (0);
while(true){
if((i__4790__auto___23968 < len__4789__auto___23967)){
args__4795__auto__.push((arguments[i__4790__auto___23968]));

var G__23969 = (i__4790__auto___23968 + (1));
i__4790__auto___23968 = G__23969;
continue;
} else {
}
break;
}

var argseq__4796__auto__ = ((((1) < args__4795__auto__.length))?(new cljs.core.IndexedSeq(args__4795__auto__.slice((1)),(0),null)):null);
return devtools.format.reference.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__4796__auto__);
});

(devtools.format.reference.cljs$core$IFn$_invoke$arity$variadic = (function (object,p__23963){
var vec__23964 = p__23963;
var state_override = cljs.core.nth.call(null,vec__23964,(0),null);
devtools.format.setup_BANG_.call(null);

return cljs.core.apply.call(null,devtools.format.make_reference_fn,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [object,(function (p1__23960_SHARP_){
return cljs.core.merge.call(null,p1__23960_SHARP_,state_override);
})], null));
}));

(devtools.format.reference.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(devtools.format.reference.cljs$lang$applyTo = (function (seq23961){
var G__23962 = cljs.core.first.call(null,seq23961);
var seq23961__$1 = cljs.core.next.call(null,seq23961);
var self__4776__auto__ = this;
return self__4776__auto__.cljs$core$IFn$_invoke$arity$variadic(G__23962,seq23961__$1);
}));

devtools.format.standard_reference = (function devtools$format$standard_reference(target){
devtools.format.setup_BANG_.call(null);

return devtools.format.make_template_fn.call(null,new cljs.core.Keyword(null,"ol","ol",932524051),new cljs.core.Keyword(null,"standard-ol-style","standard-ol-style",2143825615),devtools.format.make_template_fn.call(null,new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.Keyword(null,"standard-li-style","standard-li-style",413442955),devtools.format.make_reference_fn.call(null,target)));
});
devtools.format.build_header = (function devtools$format$build_header(var_args){
var args__4795__auto__ = [];
var len__4789__auto___23971 = arguments.length;
var i__4790__auto___23972 = (0);
while(true){
if((i__4790__auto___23972 < len__4789__auto___23971)){
args__4795__auto__.push((arguments[i__4790__auto___23972]));

var G__23973 = (i__4790__auto___23972 + (1));
i__4790__auto___23972 = G__23973;
continue;
} else {
}
break;
}

var argseq__4796__auto__ = ((((0) < args__4795__auto__.length))?(new cljs.core.IndexedSeq(args__4795__auto__.slice((0)),(0),null)):null);
return devtools.format.build_header.cljs$core$IFn$_invoke$arity$variadic(argseq__4796__auto__);
});

(devtools.format.build_header.cljs$core$IFn$_invoke$arity$variadic = (function (args){
devtools.format.setup_BANG_.call(null);

return devtools.format.render_markup.call(null,cljs.core.apply.call(null,devtools.format._LT_header_GT__fn,args));
}));

(devtools.format.build_header.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(devtools.format.build_header.cljs$lang$applyTo = (function (seq23970){
var self__4777__auto__ = this;
return self__4777__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq23970));
}));

devtools.format.standard_body_template = (function devtools$format$standard_body_template(var_args){
var args__4795__auto__ = [];
var len__4789__auto___23976 = arguments.length;
var i__4790__auto___23977 = (0);
while(true){
if((i__4790__auto___23977 < len__4789__auto___23976)){
args__4795__auto__.push((arguments[i__4790__auto___23977]));

var G__23978 = (i__4790__auto___23977 + (1));
i__4790__auto___23977 = G__23978;
continue;
} else {
}
break;
}

var argseq__4796__auto__ = ((((1) < args__4795__auto__.length))?(new cljs.core.IndexedSeq(args__4795__auto__.slice((1)),(0),null)):null);
return devtools.format.standard_body_template.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__4796__auto__);
});

(devtools.format.standard_body_template.cljs$core$IFn$_invoke$arity$variadic = (function (lines,rest){
devtools.format.setup_BANG_.call(null);

var args = cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.map.call(null,(function (x){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [x], null);
}),lines)], null),rest);
return devtools.format.render_markup.call(null,cljs.core.apply.call(null,devtools.format._LT_standard_body_GT__fn,args));
}));

(devtools.format.standard_body_template.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(devtools.format.standard_body_template.cljs$lang$applyTo = (function (seq23974){
var G__23975 = cljs.core.first.call(null,seq23974);
var seq23974__$1 = cljs.core.next.call(null,seq23974);
var self__4776__auto__ = this;
return self__4776__auto__.cljs$core$IFn$_invoke$arity$variadic(G__23975,seq23974__$1);
}));


//# sourceMappingURL=format.js.map?rel=1587041645971

goog.provide('day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler');
/**
 * The current compiler flags.
 */
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler._STAR_flags_STAR_ = new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"pretty-print?","pretty-print?",1932217158),true,new cljs.core.Keyword(null,"preamble","preamble",1641040241),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"output-to","output-to",-965533968),null,new cljs.core.Keyword(null,"vendors","vendors",-153040496),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"auto-prefix","auto-prefix",1484803466),cljs.core.PersistentHashSet.EMPTY,new cljs.core.Keyword(null,"media-expressions","media-expressions",1920421643),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"nesting-behavior","nesting-behavior",-1555995755),new cljs.core.Keyword(null,"default","default",-1987822328)], null)], null);
/**
 * Retun a function to call when rendering a media expression.
 *   The returned function accepts two arguments: the media
 *   expression being evaluated and the current media expression context.
 *   Both arguments are maps. This is used to provide semantics for nested
 *   media queries.  Also used to support feature queries.
 */
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.media_expression_behavior = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"merge","merge",-1804319409),(function (expr,context){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([context,expr], 0));
}),new cljs.core.Keyword(null,"default","default",-1987822328),(function (expr,_){
return expr;
})], null);
/**
 * The current parent selector context.
 */
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler._STAR_selector_context_STAR_ = null;
/**
 * The current media query context.
 */
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler._STAR_media_query_context_STAR_ = null;
/**
 * Return the current list of browser vendors specified in `*flags*`.
 */
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.vendors = (function day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$vendors(){
return cljs.core.seq(new cljs.core.Keyword(null,"vendors","vendors",-153040496).cljs$core$IFn$_invoke$arity$1(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler._STAR_flags_STAR_));
});
/**
 * Return the current list of auto-prefixed properties specified in `*flags*`.
 */
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.auto_prefixed_properties = (function day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$auto_prefixed_properties(){
return cljs.core.set(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.name,new cljs.core.Keyword(null,"auto-prefix","auto-prefix",1484803466).cljs$core$IFn$_invoke$arity$1(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler._STAR_flags_STAR_)));
});
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.auto_prefix_QMARK_ = (function day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$auto_prefix_QMARK_(property){
return cljs.core.contains_QMARK_(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.auto_prefixed_properties(),property);
});
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.top_level_expression_QMARK_ = (function day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$top_level_expression_QMARK_(x){
var or__4212__auto__ = (day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.util.rule_QMARK_.cljs$core$IFn$_invoke$arity$1 ? day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.util.rule_QMARK_.cljs$core$IFn$_invoke$arity$1(x) : day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.util.rule_QMARK_.call(null,x));
if(cljs.core.truth_(or__4212__auto__)){
return or__4212__auto__;
} else {
return ((day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.util.at_import_QMARK_(x)) || (((day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.util.at_media_QMARK_(x)) || (((day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.util.at_supports_QMARK_(x)) || (day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.util.at_keyframes_QMARK_(x)))))));
}
});
/**
 * Return a vector of [(filter pred coll) (remove pred coll)].
 */
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.divide_vec = (function day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$divide_vec(pred,coll){
return cljs.core.juxt.cljs$core$IFn$_invoke$arity$2(cljs.core.filter,cljs.core.remove)(pred,coll);
});

/**
 * @interface
 */
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.IExpandable = function(){};

var day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$IExpandable$expand$dyn_42010 = (function (this$){
var x__4509__auto__ = (((this$ == null))?null:this$);
var m__4510__auto__ = (day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.expand[goog.typeOf(x__4509__auto__)]);
if((!((m__4510__auto__ == null)))){
return (m__4510__auto__.cljs$core$IFn$_invoke$arity$1 ? m__4510__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__4510__auto__.call(null,this$));
} else {
var m__4508__auto__ = (day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.expand["_"]);
if((!((m__4508__auto__ == null)))){
return (m__4508__auto__.cljs$core$IFn$_invoke$arity$1 ? m__4508__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__4508__auto__.call(null,this$));
} else {
throw cljs.core.missing_protocol("IExpandable.expand",this$);
}
}
});
/**
 * Return a list containing the expanded form of `this`.
 */
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.expand = (function day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$expand(this$){
if((((!((this$ == null)))) && ((!((this$.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$IExpandable$expand$arity$1 == null)))))){
return this$.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$IExpandable$expand$arity$1(this$);
} else {
return day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$IExpandable$expand$dyn_42010(this$);
}
});

/**
 * Like flatten but only affects seqs.
 */
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.expand_seqs = (function day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$expand_seqs(coll){
return cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic((function (x){
if(cljs.core.seq_QMARK_(x)){
return (day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.expand_seqs.cljs$core$IFn$_invoke$arity$1 ? day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.expand_seqs.cljs$core$IFn$_invoke$arity$1(x) : day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.expand_seqs.call(null,x));
} else {
return (new cljs.core.List(null,x,null,(1),null));
}
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([coll], 0));
});
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.expand_declaration_1 = (function day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$expand_declaration_1(declaration){
if(cljs.core.map_QMARK_(declaration)){
} else {
throw (new Error("Assert failed: (map? declaration)"));
}

var prefix = (function (p1__41803_SHARP_,p2__41804_SHARP_){
return day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.util.as_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([p1__41803_SHARP_,"-",p2__41804_SHARP_], 0));
});
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (m,p__41811){
var vec__41812 = p__41811;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41812,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41812,(1),null);
if(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.util.hash_map_QMARK_(v)){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (m1,p__41815){
var vec__41816 = p__41815;
var k1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41816,(0),null);
var v1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41816,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(m1,prefix(k,k1),v1);
}),m,(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.expand_declaration_1.cljs$core$IFn$_invoke$arity$1 ? day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.expand_declaration_1.cljs$core$IFn$_invoke$arity$1(v) : day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.expand_declaration_1.call(null,v)));
} else {
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(m,day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.util.to_str(k),v);
}
}),cljs.core.empty(declaration),declaration);
});
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.expand_declaration = (function day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$expand_declaration(declaration){
if(cljs.core.empty_QMARK_(declaration)){
return declaration;
} else {
return cljs.core.with_meta(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.expand_declaration_1(declaration),cljs.core.meta(declaration));
}
});
/**
 * Matches a single "&" or "&" follow by one or more
 *   non-whitespace characters.
 */
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.parent_selector_re = /^&(?:\S+)?$/;
/**
 * Extract the selector portion of a parent selector reference.
 */
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.extract_reference = (function day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$extract_reference(selector){
var temp__5753__auto__ = cljs.core.re_find(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.parent_selector_re,day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.util.to_str(cljs.core.last(selector)));
if(cljs.core.truth_(temp__5753__auto__)){
var reference = temp__5753__auto__;
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.rest(reference));
} else {
return null;
}
});
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.expand_selector_reference = (function day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$expand_selector_reference(selector){
var temp__5751__auto__ = day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.extract_reference(selector);
if(cljs.core.truth_(temp__5751__auto__)){
var reference = temp__5751__auto__;
var parent = cljs.core.butlast(selector);
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.butlast(parent),(new cljs.core.List(null,day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.util.as_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.last(parent),reference], 0)),null,(1),null)));
} else {
return selector;
}
});
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.expand_selector = (function day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$expand_selector(selector,parent){
var selector__$1 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.selectors.css_selector,selector);
var selector__$2 = ((cljs.core.seq(parent))?cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.flatten,day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.util.cartesian_product.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([parent,selector__$1], 0))):cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.list,selector__$1));
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.expand_selector_reference,selector__$2);
});
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.expand_rule = (function day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$expand_rule(rule){
var vec__41819 = cljs.core.split_with(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.selectors.selector_QMARK_,rule);
var selector = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41819,(0),null);
var children = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41819,(1),null);
var selector__$1 = day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.expand_selector(selector,day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler._STAR_selector_context_STAR_);
var children__$1 = day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.expand(children);
var vec__41822 = day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.divide_vec(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.util.declaration_QMARK_,children__$1);
var declarations = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41822,(0),null);
var xs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41822,(1),null);
var ys = (function (){var _STAR_selector_context_STAR__orig_val__41825 = day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler._STAR_selector_context_STAR_;
var _STAR_selector_context_STAR__temp_val__41826 = ((cljs.core.seq(selector__$1))?selector__$1:day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler._STAR_selector_context_STAR_);
(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler._STAR_selector_context_STAR_ = _STAR_selector_context_STAR__temp_val__41826);

try{return cljs.core.doall.cljs$core$IFn$_invoke$arity$1(cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.expand,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([xs], 0)));
}finally {(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler._STAR_selector_context_STAR_ = _STAR_selector_context_STAR__orig_val__41825);
}})();
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(ys,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector__$1], null),cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.expand,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([declarations], 0))));
});
if((typeof day8 !== 'undefined') && (typeof day8.re_frame_10x !== 'undefined') && (typeof day8.re_frame_10x.inlined_deps !== 'undefined') && (typeof day8.re_frame_10x.inlined_deps.garden !== 'undefined') && (typeof day8.re_frame_10x.inlined_deps.garden.v1v3v10 !== 'undefined') && (typeof day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden !== 'undefined') && (typeof day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler !== 'undefined') && (typeof day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.expand_at_rule !== 'undefined')){
} else {
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.expand_at_rule = (function (){var method_table__4701__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var prefer_table__4702__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var method_cache__4703__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var cached_hierarchy__4704__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var hierarchy__4705__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),(function (){var fexpr__41829 = cljs.core.get_global_hierarchy;
return (fexpr__41829.cljs$core$IFn$_invoke$arity$0 ? fexpr__41829.cljs$core$IFn$_invoke$arity$0() : fexpr__41829.call(null));
})());
return (new cljs.core.MultiFn(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("day8.re-frame-10x.inlined-deps.garden.v1v3v10.garden.compiler","expand-at-rule"),new cljs.core.Keyword(null,"identifier","identifier",-805503498),new cljs.core.Keyword(null,"default","default",-1987822328),hierarchy__4705__auto__,method_table__4701__auto__,prefer_table__4702__auto__,method_cache__4703__auto__,cached_hierarchy__4704__auto__));
})();
}
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.expand_at_rule.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"default","default",-1987822328),(function (at_rule){
return (new cljs.core.List(null,at_rule,null,(1),null));
}));
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.expand_at_rule.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"keyframes","keyframes",-1437976012),(function (p__41830){
var map__41831 = p__41830;
var map__41831__$1 = cljs.core.__destructure_map(map__41831);
var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41831__$1,new cljs.core.Keyword(null,"value","value",305978217));
var map__41832 = value;
var map__41832__$1 = cljs.core.__destructure_map(map__41832);
var identifier = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41832__$1,new cljs.core.Keyword(null,"identifier","identifier",-805503498));
var frames = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41832__$1,new cljs.core.Keyword(null,"frames","frames",1765687497));
return (new cljs.core.List(null,(new day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.types.CSSAtRule(new cljs.core.Keyword(null,"keyframes","keyframes",-1437976012),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"identifier","identifier",-805503498),day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.util.to_str(identifier),new cljs.core.Keyword(null,"frames","frames",1765687497),cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.expand,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([frames], 0))], null),null,null,null)),null,(1),null));
}));
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.expand_media_query_expression = (function day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$expand_media_query_expression(expression){
var temp__5751__auto__ = (function (){var G__41833 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler._STAR_flags_STAR_,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"media-expressions","media-expressions",1920421643),new cljs.core.Keyword(null,"nesting-behavior","nesting-behavior",-1555995755)], null));
return (day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.media_expression_behavior.cljs$core$IFn$_invoke$arity$1 ? day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.media_expression_behavior.cljs$core$IFn$_invoke$arity$1(G__41833) : day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.media_expression_behavior.call(null,G__41833));
})();
if(cljs.core.truth_(temp__5751__auto__)){
var f = temp__5751__auto__;
return (f.cljs$core$IFn$_invoke$arity$2 ? f.cljs$core$IFn$_invoke$arity$2(expression,day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler._STAR_media_query_context_STAR_) : f.call(null,expression,day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler._STAR_media_query_context_STAR_));
} else {
return expression;
}
});
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.expand_at_rule.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"media","media",-1066138403),(function (p__41836){
var map__41837 = p__41836;
var map__41837__$1 = cljs.core.__destructure_map(map__41837);
var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41837__$1,new cljs.core.Keyword(null,"value","value",305978217));
var map__41838 = value;
var map__41838__$1 = cljs.core.__destructure_map(map__41838);
var media_queries = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41838__$1,new cljs.core.Keyword(null,"media-queries","media-queries",-1563277678));
var rules = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41838__$1,new cljs.core.Keyword(null,"rules","rules",1198912366));
var media_queries__$1 = day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.expand_media_query_expression(media_queries);
var xs = (function (){var _STAR_media_query_context_STAR__orig_val__41842 = day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler._STAR_media_query_context_STAR_;
var _STAR_media_query_context_STAR__temp_val__41843 = media_queries__$1;
(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler._STAR_media_query_context_STAR_ = _STAR_media_query_context_STAR__temp_val__41843);

try{return cljs.core.doall.cljs$core$IFn$_invoke$arity$1(cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.expand,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.expand(rules)], 0)));
}finally {(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler._STAR_media_query_context_STAR_ = _STAR_media_query_context_STAR__orig_val__41842);
}})();
var vec__41839 = day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.divide_vec(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.util.at_media_QMARK_,xs);
var subqueries = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41839,(0),null);
var rules__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41839,(1),null);
return cljs.core.cons((new day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.types.CSSAtRule(new cljs.core.Keyword(null,"media","media",-1066138403),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"media-queries","media-queries",-1563277678),media_queries__$1,new cljs.core.Keyword(null,"rules","rules",1198912366),rules__$1], null),null,null,null)),subqueries);
}));
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.expand_at_rule.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"feature","feature",27242652),(function (p__41844){
var map__41845 = p__41844;
var map__41845__$1 = cljs.core.__destructure_map(map__41845);
var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41845__$1,new cljs.core.Keyword(null,"value","value",305978217));
var map__41847 = value;
var map__41847__$1 = cljs.core.__destructure_map(map__41847);
var feature_queries = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41847__$1,new cljs.core.Keyword(null,"feature-queries","feature-queries",-1340998408));
var rules = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41847__$1,new cljs.core.Keyword(null,"rules","rules",1198912366));
var feature_queries__$1 = day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.expand_media_query_expression(feature_queries);
var xs = (function (){var _STAR_media_query_context_STAR__orig_val__41852 = day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler._STAR_media_query_context_STAR_;
var _STAR_media_query_context_STAR__temp_val__41853 = feature_queries__$1;
(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler._STAR_media_query_context_STAR_ = _STAR_media_query_context_STAR__temp_val__41853);

try{return cljs.core.doall.cljs$core$IFn$_invoke$arity$1(cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.expand,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.expand(rules)], 0)));
}finally {(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler._STAR_media_query_context_STAR_ = _STAR_media_query_context_STAR__orig_val__41852);
}})();
var vec__41848 = day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.divide_vec(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.util.at_supports_QMARK_,xs);
var subqueries = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41848,(0),null);
var rules__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41848,(1),null);
return cljs.core.cons((new day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.types.CSSAtRule(new cljs.core.Keyword(null,"feature","feature",27242652),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"feature-queries","feature-queries",-1340998408),feature_queries__$1,new cljs.core.Keyword(null,"rules","rules",1198912366),rules__$1], null),null,null,null)),subqueries);
}));
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.expand_stylesheet = (function day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$expand_stylesheet(xs){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.concat,cljs.core.map.cljs$core$IFn$_invoke$arity$2(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.expand,day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.expand(xs)));
});
goog.object.set(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.IExpandable,"null",true);

goog.object.set(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.expand,"null",(function (this$){
return null;
}));

(cljs.core.IndexedSeq.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$IExpandable$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.IndexedSeq.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$IExpandable$expand$arity$1 = (function (this$){
var this$__$1 = this;
return day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.expand_seqs(this$__$1);
}));

(cljs.core.LazySeq.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$IExpandable$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.LazySeq.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$IExpandable$expand$arity$1 = (function (this$){
var this$__$1 = this;
return day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.expand_seqs(this$__$1);
}));

(cljs.core.NodeSeq.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$IExpandable$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.NodeSeq.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$IExpandable$expand$arity$1 = (function (this$){
var this$__$1 = this;
return day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.expand_seqs(this$__$1);
}));

(cljs.core.BlackNode.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$IExpandable$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.BlackNode.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$IExpandable$expand$arity$1 = (function (this$){
var this$__$1 = this;
return day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.expand_rule(this$__$1);
}));

(cljs.core.PersistentArrayMapSeq.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$IExpandable$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.PersistentArrayMapSeq.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$IExpandable$expand$arity$1 = (function (this$){
var this$__$1 = this;
return day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.expand_seqs(this$__$1);
}));

(cljs.core.ChunkedSeq.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$IExpandable$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.ChunkedSeq.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$IExpandable$expand$arity$1 = (function (this$){
var this$__$1 = this;
return day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.expand_seqs(this$__$1);
}));

(cljs.core.Cons.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$IExpandable$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.Cons.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$IExpandable$expand$arity$1 = (function (this$){
var this$__$1 = this;
return day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.expand_seqs(this$__$1);
}));

(cljs.core.RSeq.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$IExpandable$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.RSeq.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$IExpandable$expand$arity$1 = (function (this$){
var this$__$1 = this;
return day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.expand_seqs(this$__$1);
}));

(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.types.CSSFunction.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$IExpandable$ = cljs.core.PROTOCOL_SENTINEL);

(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.types.CSSFunction.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$IExpandable$expand$arity$1 = (function (this$){
var this$__$1 = this;
return (new cljs.core.List(null,this$__$1,null,(1),null));
}));

(cljs.core.PersistentHashMap.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$IExpandable$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.PersistentHashMap.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$IExpandable$expand$arity$1 = (function (this$){
var this$__$1 = this;
return (new cljs.core.List(null,day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.expand_declaration(this$__$1),null,(1),null));
}));

(cljs.core.ArrayNodeSeq.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$IExpandable$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.ArrayNodeSeq.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$IExpandable$expand$arity$1 = (function (this$){
var this$__$1 = this;
return day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.expand_seqs(this$__$1);
}));

(cljs.core.Subvec.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$IExpandable$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.Subvec.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$IExpandable$expand$arity$1 = (function (this$){
var this$__$1 = this;
return day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.expand_rule(this$__$1);
}));

goog.object.set(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.IExpandable,"_",true);

goog.object.set(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.expand,"_",(function (this$){
return (new cljs.core.List(null,this$,null,(1),null));
}));

(cljs.core.PersistentTreeMap.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$IExpandable$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.PersistentTreeMap.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$IExpandable$expand$arity$1 = (function (this$){
var this$__$1 = this;
return (new cljs.core.List(null,day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.expand_declaration(this$__$1),null,(1),null));
}));

(cljs.core.ChunkedCons.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$IExpandable$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.ChunkedCons.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$IExpandable$expand$arity$1 = (function (this$){
var this$__$1 = this;
return day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.expand_seqs(this$__$1);
}));

(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.types.CSSAtRule.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$IExpandable$ = cljs.core.PROTOCOL_SENTINEL);

(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.types.CSSAtRule.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$IExpandable$expand$arity$1 = (function (this$){
var this$__$1 = this;
return day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.expand_at_rule.cljs$core$IFn$_invoke$arity$1(this$__$1);
}));

(cljs.core.RedNode.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$IExpandable$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.RedNode.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$IExpandable$expand$arity$1 = (function (this$){
var this$__$1 = this;
return day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.expand_rule(this$__$1);
}));

(cljs.core.PersistentVector.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$IExpandable$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.PersistentVector.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$IExpandable$expand$arity$1 = (function (this$){
var this$__$1 = this;
return day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.expand_rule(this$__$1);
}));

(cljs.core.PersistentArrayMap.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$IExpandable$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.PersistentArrayMap.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$IExpandable$expand$arity$1 = (function (this$){
var this$__$1 = this;
return (new cljs.core.List(null,day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.expand_declaration(this$__$1),null,(1),null));
}));

(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.color.CSSColor.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$IExpandable$ = cljs.core.PROTOCOL_SENTINEL);

(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.color.CSSColor.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$IExpandable$expand$arity$1 = (function (this$){
var this$__$1 = this;
return (new cljs.core.List(null,this$__$1,null,(1),null));
}));

(cljs.core.List.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$IExpandable$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.List.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$IExpandable$expand$arity$1 = (function (this$){
var this$__$1 = this;
return day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.expand_seqs(this$__$1);
}));

/**
 * @interface
 */
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.CSSRenderer = function(){};

var day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$CSSRenderer$render_css$dyn_42049 = (function (this$){
var x__4509__auto__ = (((this$ == null))?null:this$);
var m__4510__auto__ = (day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_css[goog.typeOf(x__4509__auto__)]);
if((!((m__4510__auto__ == null)))){
return (m__4510__auto__.cljs$core$IFn$_invoke$arity$1 ? m__4510__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__4510__auto__.call(null,this$));
} else {
var m__4508__auto__ = (day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_css["_"]);
if((!((m__4508__auto__ == null)))){
return (m__4508__auto__.cljs$core$IFn$_invoke$arity$1 ? m__4508__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__4508__auto__.call(null,this$));
} else {
throw cljs.core.missing_protocol("CSSRenderer.render-css",this$);
}
}
});
/**
 * Convert a Clojure data type in to a string of CSS.
 */
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_css = (function day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$render_css(this$){
if((((!((this$ == null)))) && ((!((this$.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$CSSRenderer$render_css$arity$1 == null)))))){
return this$.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$CSSRenderer$render_css$arity$1(this$);
} else {
return day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$CSSRenderer$render_css$dyn_42049(this$);
}
});

day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.comma = ", ";
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.colon = ": ";
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.semicolon = ";";
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.l_brace = " {\n";
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.r_brace = "\n}";
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.l_brace_1 = " {\n\n";
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.r_brace_1 = "\n\n}";
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.rule_sep = "\n\n";
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.indent = "  ";
/**
 * Return a space separated list of values.
 */
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.space_separated_list = (function day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$space_separated_list(var_args){
var G__41857 = arguments.length;
switch (G__41857) {
case 1:
return day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.space_separated_list.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.space_separated_list.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.space_separated_list.cljs$core$IFn$_invoke$arity$1 = (function (xs){
return day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.space_separated_list.cljs$core$IFn$_invoke$arity$2(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_css,xs);
}));

(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.space_separated_list.cljs$core$IFn$_invoke$arity$2 = (function (f,xs){
return clojure.string.join.cljs$core$IFn$_invoke$arity$2(" ",cljs.core.map.cljs$core$IFn$_invoke$arity$2(f,xs));
}));

(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.space_separated_list.cljs$lang$maxFixedArity = 2);

/**
 * Return a comma separated list of values. Subsequences are joined with
 * spaces.
 */
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.comma_separated_list = (function day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$comma_separated_list(var_args){
var G__41864 = arguments.length;
switch (G__41864) {
case 1:
return day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.comma_separated_list.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.comma_separated_list.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.comma_separated_list.cljs$core$IFn$_invoke$arity$1 = (function (xs){
return day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.comma_separated_list.cljs$core$IFn$_invoke$arity$2(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_css,xs);
}));

(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.comma_separated_list.cljs$core$IFn$_invoke$arity$2 = (function (f,xs){
var ys = (function (){var iter__4611__auto__ = (function day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$iter__41865(s__41866){
return (new cljs.core.LazySeq(null,(function (){
var s__41866__$1 = s__41866;
while(true){
var temp__5753__auto__ = cljs.core.seq(s__41866__$1);
if(temp__5753__auto__){
var s__41866__$2 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(s__41866__$2)){
var c__4609__auto__ = cljs.core.chunk_first(s__41866__$2);
var size__4610__auto__ = cljs.core.count(c__4609__auto__);
var b__41868 = cljs.core.chunk_buffer(size__4610__auto__);
if((function (){var i__41867 = (0);
while(true){
if((i__41867 < size__4610__auto__)){
var x = cljs.core._nth(c__4609__auto__,i__41867);
cljs.core.chunk_append(b__41868,((cljs.core.sequential_QMARK_(x))?day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.space_separated_list.cljs$core$IFn$_invoke$arity$2(f,x):(f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(x) : f.call(null,x))));

var G__42061 = (i__41867 + (1));
i__41867 = G__42061;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__41868),day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$iter__41865(cljs.core.chunk_rest(s__41866__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__41868),null);
}
} else {
var x = cljs.core.first(s__41866__$2);
return cljs.core.cons(((cljs.core.sequential_QMARK_(x))?day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.space_separated_list.cljs$core$IFn$_invoke$arity$2(f,x):(f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(x) : f.call(null,x))),day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$iter__41865(cljs.core.rest(s__41866__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__4611__auto__(xs);
})();
return clojure.string.join.cljs$core$IFn$_invoke$arity$2(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.comma,ys);
}));

(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.comma_separated_list.cljs$lang$maxFixedArity = 2);

day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.rule_join = (function day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$rule_join(xs){
return clojure.string.join.cljs$core$IFn$_invoke$arity$2(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.rule_sep,xs);
});
/**
 * Match the start of a line if the characters immediately
 *   after it are spaces or used in a CSS id (#), class (.), or tag name.
 */
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.indent_loc_re = (new RegExp("(?=[ A-Za-z#.}-]+)^","gm"));
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.indent_str = (function day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$indent_str(s){
return s.replace(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.indent_loc_re,day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.indent);
});
/**
 * Render the value portion of a declaration.
 */
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_value = (function day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$render_value(x){
if(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.util.at_keyframes_QMARK_(x)){
return day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.util.to_str(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(x,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"value","value",305978217),new cljs.core.Keyword(null,"identifier","identifier",-805503498)], null)));
} else {
return day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_css(x);
}
});
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_property_and_value = (function day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$render_property_and_value(p__41874){
var vec__41875 = p__41874;
var prop = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41875,(0),null);
var val = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41875,(1),null);
if(cljs.core.set_QMARK_(val)){
return clojure.string.join.cljs$core$IFn$_invoke$arity$2("\n",cljs.core.map.cljs$core$IFn$_invoke$arity$2(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_property_and_value,cljs.core.partition.cljs$core$IFn$_invoke$arity$2((2),cljs.core.interleave.cljs$core$IFn$_invoke$arity$2(cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(prop),val))));
} else {
var val__$1 = ((cljs.core.sequential_QMARK_(val))?day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.comma_separated_list.cljs$core$IFn$_invoke$arity$2(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_value,val):day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_value(val));
return day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.util.as_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([prop,day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.colon,val__$1,day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.semicolon], 0));
}
});
/**
 * For each block in `declaration`, add sequence of blocks
 * returned from calling `f` on the block.
 */
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.add_blocks = (function day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$add_blocks(f,declaration){
return cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic((function (p1__41878_SHARP_){
return cljs.core.cons(p1__41878_SHARP_,(f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(p1__41878_SHARP_) : f.call(null,p1__41878_SHARP_)));
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([declaration], 0));
});
/**
 * Sequence of blocks with their properties prefixed by
 * each vendor in `vendors`.
 */
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.prefixed_blocks = (function day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$prefixed_blocks(vendors,p__41882){
var vec__41883 = p__41882;
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41883,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41883,(1),null);
var iter__4611__auto__ = (function day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$prefixed_blocks_$_iter__41887(s__41888){
return (new cljs.core.LazySeq(null,(function (){
var s__41888__$1 = s__41888;
while(true){
var temp__5753__auto__ = cljs.core.seq(s__41888__$1);
if(temp__5753__auto__){
var s__41888__$2 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(s__41888__$2)){
var c__4609__auto__ = cljs.core.chunk_first(s__41888__$2);
var size__4610__auto__ = cljs.core.count(c__4609__auto__);
var b__41890 = cljs.core.chunk_buffer(size__4610__auto__);
if((function (){var i__41889 = (0);
while(true){
if((i__41889 < size__4610__auto__)){
var vendor = cljs.core._nth(c__4609__auto__,i__41889);
cljs.core.chunk_append(b__41890,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.util.vendor_prefix(vendor,cljs.core.name(p)),v], null));

var G__42071 = (i__41889 + (1));
i__41889 = G__42071;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__41890),day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$prefixed_blocks_$_iter__41887(cljs.core.chunk_rest(s__41888__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__41890),null);
}
} else {
var vendor = cljs.core.first(s__41888__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.util.vendor_prefix(vendor,cljs.core.name(p)),v], null),day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$prefixed_blocks_$_iter__41887(cljs.core.rest(s__41888__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__4611__auto__(vendors);
});
/**
 * Add prefixes to all blocks in `declaration` using
 * vendor prefixes in `vendors`.
 */
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.prefix_all_properties = (function day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$prefix_all_properties(vendors,declaration){
return day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.add_blocks(cljs.core.partial.cljs$core$IFn$_invoke$arity$2(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.prefixed_blocks,vendors),declaration);
});
/**
 * Add prefixes to all blocks in `declaration` when property
 * is in the `:auto-prefix` set.
 */
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.prefix_auto_properties = (function day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$prefix_auto_properties(vendors,declaration){
return day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.add_blocks((function (block){
var vec__41893 = block;
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41893,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41893,(1),null);
if(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.auto_prefix_QMARK_(cljs.core.name(p))){
return day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.prefixed_blocks(vendors,block);
} else {
return null;
}
}),declaration);
});
/**
 * Prefix properties within a `declaration` if `{:prefix true}` is
 * set in its meta, or if a property is in the `:auto-prefix` set.
 */
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.prefix_declaration = (function day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$prefix_declaration(declaration){
var vendors = (function (){var or__4212__auto__ = new cljs.core.Keyword(null,"vendors","vendors",-153040496).cljs$core$IFn$_invoke$arity$1(cljs.core.meta(declaration));
if(cljs.core.truth_(or__4212__auto__)){
return or__4212__auto__;
} else {
return day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.vendors();
}
})();
var prefix_fn = (cljs.core.truth_(new cljs.core.Keyword(null,"prefix","prefix",-265908465).cljs$core$IFn$_invoke$arity$1(cljs.core.meta(declaration)))?day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.prefix_all_properties:day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.prefix_auto_properties);
return (prefix_fn.cljs$core$IFn$_invoke$arity$2 ? prefix_fn.cljs$core$IFn$_invoke$arity$2(vendors,declaration) : prefix_fn.call(null,vendors,declaration));
});
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_declaration = (function day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$render_declaration(declaration){
return clojure.string.join.cljs$core$IFn$_invoke$arity$2("\n",cljs.core.map.cljs$core$IFn$_invoke$arity$2(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_property_and_value,day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.prefix_declaration(declaration)));
});
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_selector = (function day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$render_selector(selector){
return day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.comma_separated_list.cljs$core$IFn$_invoke$arity$1(selector);
});
/**
 * Convert a vector to a CSS rule string. The vector is expected to be
 *   fully expanded.
 */
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_rule = (function day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$render_rule(p__41898){
var vec__41899 = p__41898;
var selector = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41899,(0),null);
var declarations = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41899,(1),null);
var rule = vec__41899;
if(((cljs.core.seq(rule)) && (cljs.core.every_QMARK_(cljs.core.seq,rule)))){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_selector(selector)),day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.l_brace,cljs.core.str.cljs$core$IFn$_invoke$arity$1(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.indent_str(clojure.string.join.cljs$core$IFn$_invoke$arity$2("\n",cljs.core.map.cljs$core$IFn$_invoke$arity$2(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_css,declarations)))),day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.r_brace].join('');
} else {
return null;
}
});
/**
 * Render the individual components of a media expression.
 */
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_media_expr_part = (function day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$render_media_expr_part(p__41902){
var vec__41903 = p__41902;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41903,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41903,(1),null);
var vec__41906 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_value,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,v], null));
var sk = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41906,(0),null);
var sv = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41906,(1),null);
if(v === true){
return sk;
} else {
if(v === false){
return ["not ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(sk)].join('');
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("only",sv)){
return ["only ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(sk)].join('');
} else {
if(cljs.core.truth_((function (){var and__4210__auto__ = v;
if(cljs.core.truth_(and__4210__auto__)){
return cljs.core.seq(sv);
} else {
return and__4210__auto__;
}
})())){
return ["(",cljs.core.str.cljs$core$IFn$_invoke$arity$1(sk),day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.colon,cljs.core.str.cljs$core$IFn$_invoke$arity$1(sv),")"].join('');
} else {
return ["(",cljs.core.str.cljs$core$IFn$_invoke$arity$1(sk),")"].join('');
}

}
}
}
});
/**
 * Make a media query expession from one or more maps. Keys are not
 *   validated but values have the following semantics:
 * 
 *  `true`  as in `{:screen true}`  == "screen"
 *  `false` as in `{:screen false}` == "not screen"
 *  `:only` as in `{:screen :only}  == "only screen"
 */
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_media_expr = (function day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$render_media_expr(expr){
if(cljs.core.sequential_QMARK_(expr)){
return day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.comma_separated_list.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_media_expr,expr));
} else {
return clojure.string.join.cljs$core$IFn$_invoke$arity$2(" and ",cljs.core.map.cljs$core$IFn$_invoke$arity$2(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_media_expr_part,expr));
}
});
/**
 * Render the individual components of a query expression.
 */
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_feature_expr_part = (function day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$render_feature_expr_part(p__41912){
var vec__41913 = p__41912;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41913,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41913,(1),null);
var vec__41916 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_value,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,v], null));
var sk = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41916,(0),null);
var sv = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41916,(1),null);
if(cljs.core.truth_((function (){var and__4210__auto__ = v;
if(cljs.core.truth_(and__4210__auto__)){
return cljs.core.seq(sv);
} else {
return and__4210__auto__;
}
})())){
return ["(",cljs.core.str.cljs$core$IFn$_invoke$arity$1(sk),day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.colon,cljs.core.str.cljs$core$IFn$_invoke$arity$1(sv),")"].join('');
} else {
return ["(",cljs.core.str.cljs$core$IFn$_invoke$arity$1(sk),")"].join('');
}
});
/**
 * Make a query expression from one or more maps. Keys are not
 *   validated.
 */
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_feature_expr = (function day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$render_feature_expr(expr){
if(cljs.core.sequential_QMARK_(expr)){
return day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.comma_separated_list.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_feature_expr,expr));
} else {
return clojure.string.join.cljs$core$IFn$_invoke$arity$2(" and ",cljs.core.map.cljs$core$IFn$_invoke$arity$2(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_feature_expr_part,expr));
}
});
/**
 * Render a CSSUnit.
 */
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_unit = (function day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$render_unit(css_unit){
var map__41920 = css_unit;
var map__41920__$1 = cljs.core.__destructure_map(map__41920);
var magnitude = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41920__$1,new cljs.core.Keyword(null,"magnitude","magnitude",1924274222));
var unit = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41920__$1,new cljs.core.Keyword(null,"unit","unit",375175175));
var magnitude__$1 = magnitude;
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(magnitude__$1),cljs.core.name(unit)].join('');
});
/**
 * Render a CSS function.
 */
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_function = (function day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$render_function(css_function){
var map__41924 = css_function;
var map__41924__$1 = cljs.core.__destructure_map(map__41924);
var f = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41924__$1,new cljs.core.Keyword(null,"f","f",-1597136552));
var args = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41924__$1,new cljs.core.Keyword(null,"args","args",1315556576));
var args__$1 = ((cljs.core.sequential_QMARK_(args))?day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.comma_separated_list.cljs$core$IFn$_invoke$arity$1(args):day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.util.to_str(args));
return day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.util.format.cljs$core$IFn$_invoke$arity$variadic("%s(%s)",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.util.to_str(f),args__$1], 0));
});
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_color = (function day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$render_color(c){
var temp__5751__auto__ = new cljs.core.Keyword(null,"alpha","alpha",-1574982441).cljs$core$IFn$_invoke$arity$1(c);
if(cljs.core.truth_(temp__5751__auto__)){
var a = temp__5751__auto__;
var map__41926 = day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.color.as_hsl(c);
var map__41926__$1 = cljs.core.__destructure_map(map__41926);
var hue = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41926__$1,new cljs.core.Keyword(null,"hue","hue",-508078848));
var saturation = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41926__$1,new cljs.core.Keyword(null,"saturation","saturation",-14247929));
var lightness = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41926__$1,new cljs.core.Keyword(null,"lightness","lightness",-2040901930));
var vec__41927 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.units.percent,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [saturation,lightness], null));
var s = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41927,(0),null);
var l = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41927,(1),null);
return day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.util.format.cljs$core$IFn$_invoke$arity$variadic("hsla(%s)",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.comma_separated_list.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [hue,s,l,a], null))], 0));
} else {
return day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.color.as_hex(c);
}
});
if((typeof day8 !== 'undefined') && (typeof day8.re_frame_10x !== 'undefined') && (typeof day8.re_frame_10x.inlined_deps !== 'undefined') && (typeof day8.re_frame_10x.inlined_deps.garden !== 'undefined') && (typeof day8.re_frame_10x.inlined_deps.garden.v1v3v10 !== 'undefined') && (typeof day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden !== 'undefined') && (typeof day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler !== 'undefined') && (typeof day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_at_rule !== 'undefined')){
} else {
/**
 * Render a CSS at-rule
 */
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_at_rule = (function (){var method_table__4701__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var prefer_table__4702__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var method_cache__4703__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var cached_hierarchy__4704__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var hierarchy__4705__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),(function (){var fexpr__41930 = cljs.core.get_global_hierarchy;
return (fexpr__41930.cljs$core$IFn$_invoke$arity$0 ? fexpr__41930.cljs$core$IFn$_invoke$arity$0() : fexpr__41930.call(null));
})());
return (new cljs.core.MultiFn(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("day8.re-frame-10x.inlined-deps.garden.v1v3v10.garden.compiler","render-at-rule"),new cljs.core.Keyword(null,"identifier","identifier",-805503498),new cljs.core.Keyword(null,"default","default",-1987822328),hierarchy__4705__auto__,method_table__4701__auto__,prefer_table__4702__auto__,method_cache__4703__auto__,cached_hierarchy__4704__auto__));
})();
}
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_at_rule.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"default","default",-1987822328),(function (_){
return null;
}));
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_at_rule.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"import","import",-1399500709),(function (p__41931){
var map__41932 = p__41931;
var map__41932__$1 = cljs.core.__destructure_map(map__41932);
var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41932__$1,new cljs.core.Keyword(null,"value","value",305978217));
var map__41934 = value;
var map__41934__$1 = cljs.core.__destructure_map(map__41934);
var url = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41934__$1,new cljs.core.Keyword(null,"url","url",276297046));
var media_queries = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41934__$1,new cljs.core.Keyword(null,"media-queries","media-queries",-1563277678));
var url__$1 = ((typeof url === 'string')?day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.util.wrap_quotes(url):day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_css(url));
var queries = (cljs.core.truth_(media_queries)?day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_media_expr(media_queries):null);
return ["@import ",cljs.core.str.cljs$core$IFn$_invoke$arity$1((cljs.core.truth_(queries)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(url__$1)," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(queries)].join(''):url__$1)),day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.semicolon].join('');
}));
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_at_rule.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"keyframes","keyframes",-1437976012),(function (p__41936){
var map__41937 = p__41936;
var map__41937__$1 = cljs.core.__destructure_map(map__41937);
var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41937__$1,new cljs.core.Keyword(null,"value","value",305978217));
var map__41938 = value;
var map__41938__$1 = cljs.core.__destructure_map(map__41938);
var identifier = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41938__$1,new cljs.core.Keyword(null,"identifier","identifier",-805503498));
var frames = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41938__$1,new cljs.core.Keyword(null,"frames","frames",1765687497));
if(cljs.core.seq(frames)){
var body = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.util.to_str(identifier)),day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.l_brace_1,cljs.core.str.cljs$core$IFn$_invoke$arity$1(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.indent_str(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.rule_join(cljs.core.map.cljs$core$IFn$_invoke$arity$2(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_css,frames)))),day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.r_brace_1].join('');
var prefix = (function (vendor){
return ["@",day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.util.vendor_prefix(vendor,"keyframes ")].join('');
});
return day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.rule_join(cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__41935_SHARP_){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__41935_SHARP_),body].join('');
}),cljs.core.cons("@keyframes ",cljs.core.map.cljs$core$IFn$_invoke$arity$2(prefix,day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.vendors()))));
} else {
return null;
}
}));
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_at_rule.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"media","media",-1066138403),(function (p__41941){
var map__41942 = p__41941;
var map__41942__$1 = cljs.core.__destructure_map(map__41942);
var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41942__$1,new cljs.core.Keyword(null,"value","value",305978217));
var map__41943 = value;
var map__41943__$1 = cljs.core.__destructure_map(map__41943);
var media_queries = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41943__$1,new cljs.core.Keyword(null,"media-queries","media-queries",-1563277678));
var rules = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41943__$1,new cljs.core.Keyword(null,"rules","rules",1198912366));
if(cljs.core.seq(rules)){
return ["@media ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_media_expr(media_queries)),day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.l_brace_1,cljs.core.str.cljs$core$IFn$_invoke$arity$1(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.indent_str(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.rule_join(cljs.core.map.cljs$core$IFn$_invoke$arity$2(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_css,rules)))),day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.r_brace_1].join('');
} else {
return null;
}
}));
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_at_rule.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"feature","feature",27242652),(function (p__41944){
var map__41945 = p__41944;
var map__41945__$1 = cljs.core.__destructure_map(map__41945);
var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41945__$1,new cljs.core.Keyword(null,"value","value",305978217));
var map__41946 = value;
var map__41946__$1 = cljs.core.__destructure_map(map__41946);
var feature_queries = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41946__$1,new cljs.core.Keyword(null,"feature-queries","feature-queries",-1340998408));
var rules = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41946__$1,new cljs.core.Keyword(null,"rules","rules",1198912366));
if(cljs.core.seq(rules)){
return ["@supports ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_feature_expr(feature_queries)),day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.l_brace_1,cljs.core.str.cljs$core$IFn$_invoke$arity$1(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.indent_str(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.rule_join(cljs.core.map.cljs$core$IFn$_invoke$arity$2(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_css,rules)))),day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.r_brace_1].join('');
} else {
return null;
}
}));
goog.object.set(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.CSSRenderer,"null",true);

goog.object.set(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_css,"null",(function (this$){
return "";
}));

(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.color.CSSColor.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$CSSRenderer$ = cljs.core.PROTOCOL_SENTINEL);

(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.color.CSSColor.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$CSSRenderer$render_css$arity$1 = (function (this$){
var this$__$1 = this;
return day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_color(this$__$1);
}));

(cljs.core.IndexedSeq.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$CSSRenderer$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.IndexedSeq.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$CSSRenderer$render_css$arity$1 = (function (this$){
var this$__$1 = this;
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_css,this$__$1);
}));

(cljs.core.LazySeq.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$CSSRenderer$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.LazySeq.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$CSSRenderer$render_css$arity$1 = (function (this$){
var this$__$1 = this;
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_css,this$__$1);
}));

(cljs.core.NodeSeq.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$CSSRenderer$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.NodeSeq.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$CSSRenderer$render_css$arity$1 = (function (this$){
var this$__$1 = this;
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_css,this$__$1);
}));

(cljs.core.BlackNode.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$CSSRenderer$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.BlackNode.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$CSSRenderer$render_css$arity$1 = (function (this$){
var this$__$1 = this;
return day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_rule(this$__$1);
}));

(cljs.core.PersistentArrayMapSeq.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$CSSRenderer$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.PersistentArrayMapSeq.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$CSSRenderer$render_css$arity$1 = (function (this$){
var this$__$1 = this;
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_css,this$__$1);
}));

(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.types.CSSUnit.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$CSSRenderer$ = cljs.core.PROTOCOL_SENTINEL);

(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.types.CSSUnit.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$CSSRenderer$render_css$arity$1 = (function (this$){
var this$__$1 = this;
return day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_unit(this$__$1);
}));

(cljs.core.ChunkedSeq.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$CSSRenderer$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.ChunkedSeq.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$CSSRenderer$render_css$arity$1 = (function (this$){
var this$__$1 = this;
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_css,this$__$1);
}));

(cljs.core.Cons.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$CSSRenderer$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.Cons.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$CSSRenderer$render_css$arity$1 = (function (this$){
var this$__$1 = this;
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_css,this$__$1);
}));

(cljs.core.RSeq.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$CSSRenderer$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.RSeq.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$CSSRenderer$render_css$arity$1 = (function (this$){
var this$__$1 = this;
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_css,this$__$1);
}));

goog.object.set(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.CSSRenderer,"number",true);

goog.object.set(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_css,"number",(function (this$){
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(this$);
}));

(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.types.CSSFunction.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$CSSRenderer$ = cljs.core.PROTOCOL_SENTINEL);

(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.types.CSSFunction.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$CSSRenderer$render_css$arity$1 = (function (this$){
var this$__$1 = this;
return day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_function(this$__$1);
}));

(cljs.core.PersistentHashMap.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$CSSRenderer$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.PersistentHashMap.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$CSSRenderer$render_css$arity$1 = (function (this$){
var this$__$1 = this;
return day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_declaration(this$__$1);
}));

(cljs.core.ArrayNodeSeq.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$CSSRenderer$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.ArrayNodeSeq.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$CSSRenderer$render_css$arity$1 = (function (this$){
var this$__$1 = this;
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_css,this$__$1);
}));

(cljs.core.Subvec.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$CSSRenderer$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.Subvec.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$CSSRenderer$render_css$arity$1 = (function (this$){
var this$__$1 = this;
return day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_rule(this$__$1);
}));

goog.object.set(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.CSSRenderer,"_",true);

goog.object.set(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_css,"_",(function (this$){
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(this$);
}));

(cljs.core.PersistentTreeMap.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$CSSRenderer$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.PersistentTreeMap.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$CSSRenderer$render_css$arity$1 = (function (this$){
var this$__$1 = this;
return day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_declaration(this$__$1);
}));

(cljs.core.ChunkedCons.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$CSSRenderer$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.ChunkedCons.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$CSSRenderer$render_css$arity$1 = (function (this$){
var this$__$1 = this;
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_css,this$__$1);
}));

(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.types.CSSAtRule.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$CSSRenderer$ = cljs.core.PROTOCOL_SENTINEL);

(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.types.CSSAtRule.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$CSSRenderer$render_css$arity$1 = (function (this$){
var this$__$1 = this;
return day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_at_rule.cljs$core$IFn$_invoke$arity$1(this$__$1);
}));

(cljs.core.RedNode.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$CSSRenderer$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.RedNode.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$CSSRenderer$render_css$arity$1 = (function (this$){
var this$__$1 = this;
return day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_rule(this$__$1);
}));

(cljs.core.PersistentVector.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$CSSRenderer$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.PersistentVector.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$CSSRenderer$render_css$arity$1 = (function (this$){
var this$__$1 = this;
return day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_rule(this$__$1);
}));

(cljs.core.Keyword.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$CSSRenderer$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.Keyword.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$CSSRenderer$render_css$arity$1 = (function (this$){
var this$__$1 = this;
return cljs.core.name(this$__$1);
}));

(cljs.core.PersistentArrayMap.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$CSSRenderer$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.PersistentArrayMap.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$CSSRenderer$render_css$arity$1 = (function (this$){
var this$__$1 = this;
return day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_declaration(this$__$1);
}));

(cljs.core.List.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$CSSRenderer$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.List.prototype.day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$CSSRenderer$render_css$arity$1 = (function (this$){
var this$__$1 = this;
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_css,this$__$1);
}));
/**
 * Convert a sequence of maps into CSS for use with the HTML style
 * attribute.
 */
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.compile_style = (function day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$compile_style(ms){
return cljs.core.first(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_css(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.expand(cljs.core.reduce.cljs$core$IFn$_invoke$arity$2(cljs.core.merge,cljs.core.filter.cljs$core$IFn$_invoke$arity$2(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.util.declaration_QMARK_,ms)))));
});
/**
 * Return a string of CSS.
 */
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.do_compile = (function day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$do_compile(flags,rules){
var _STAR_flags_STAR__orig_val__41979 = day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler._STAR_flags_STAR_;
var _STAR_flags_STAR__temp_val__41980 = flags;
(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler._STAR_flags_STAR_ = _STAR_flags_STAR__temp_val__41980);

try{return day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.rule_join(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,cljs.core.map.cljs$core$IFn$_invoke$arity$2(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.render_css,cljs.core.filter.cljs$core$IFn$_invoke$arity$2(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.top_level_expression_QMARK_,day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.expand_stylesheet(rules)))));
}finally {(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler._STAR_flags_STAR_ = _STAR_flags_STAR__orig_val__41979);
}});
/**
 * Prefix stylesheet with files in preamble. Not available in
 *   ClojureScript.
 */
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.do_preamble = (function day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$do_preamble(p__41985,stylesheet){
var map__41986 = p__41985;
var map__41986__$1 = cljs.core.__destructure_map(map__41986);
var preamble = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41986__$1,new cljs.core.Keyword(null,"preamble","preamble",1641040241));
return stylesheet;
});
/**
 * Compress CSS if the pretty-print(?) flag is true.
 */
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.do_compression = (function day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$do_compression(p__41990,stylesheet){
var map__41992 = p__41990;
var map__41992__$1 = cljs.core.__destructure_map(map__41992);
var pretty_print_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41992__$1,new cljs.core.Keyword(null,"pretty-print?","pretty-print?",1932217158));
var pretty_print = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41992__$1,new cljs.core.Keyword(null,"pretty-print","pretty-print",-1314067013));
if(cljs.core.truth_((function (){var or__4212__auto__ = pretty_print_QMARK_;
if(cljs.core.truth_(or__4212__auto__)){
return or__4212__auto__;
} else {
return pretty_print;
}
})())){
return stylesheet;
} else {
return day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compression.compress_stylesheet(stylesheet);
}
});
/**
 * Write contents of stylesheet to disk.
 */
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.do_output_to = (function day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$do_output_to(p__41996,stylesheet){
var map__41997 = p__41996;
var map__41997__$1 = cljs.core.__destructure_map(map__41997);
var output_to = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41997__$1,new cljs.core.Keyword(null,"output-to","output-to",-965533968));
return stylesheet;
});
/**
 * Convert any number of Clojure data structures to CSS.
 */
day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.compile_css = (function day8$re_frame_10x$inlined_deps$garden$v1v3v10$garden$compiler$compile_css(var_args){
var args__4824__auto__ = [];
var len__4818__auto___42122 = arguments.length;
var i__4819__auto___42123 = (0);
while(true){
if((i__4819__auto___42123 < len__4818__auto___42122)){
args__4824__auto__.push((arguments[i__4819__auto___42123]));

var G__42124 = (i__4819__auto___42123 + (1));
i__4819__auto___42123 = G__42124;
continue;
} else {
}
break;
}

var argseq__4825__auto__ = ((((1) < args__4824__auto__.length))?(new cljs.core.IndexedSeq(args__4824__auto__.slice((1)),(0),null)):null);
return day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.compile_css.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__4825__auto__);
});

(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.compile_css.cljs$core$IFn$_invoke$arity$variadic = (function (flags,rules){
var vec__42007 = (cljs.core.truth_((function (){var and__4210__auto__ = day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.util.hash_map_QMARK_(flags);
if(and__4210__auto__){
return cljs.core.some(cljs.core.set(cljs.core.keys(flags)),cljs.core.keys(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler._STAR_flags_STAR_));
} else {
return and__4210__auto__;
}
})())?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler._STAR_flags_STAR_,flags], 0)),rules], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler._STAR_flags_STAR_,cljs.core.cons(flags,rules)], null));
var flags__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42007,(0),null);
var rules__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42007,(1),null);
return day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.do_output_to(flags__$1,day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.do_compression(flags__$1,day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.do_preamble(flags__$1,day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.do_compile(flags__$1,rules__$1))));
}));

(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.compile_css.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.compile_css.cljs$lang$applyTo = (function (seq41998){
var G__41999 = cljs.core.first(seq41998);
var seq41998__$1 = cljs.core.next(seq41998);
var self__4805__auto__ = this;
return self__4805__auto__.cljs$core$IFn$_invoke$arity$variadic(G__41999,seq41998__$1);
}));


//# sourceMappingURL=day8.re_frame_10x.inlined_deps.garden.v1v3v10.garden.compiler.js.map

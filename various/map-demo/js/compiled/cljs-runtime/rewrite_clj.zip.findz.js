goog.provide('rewrite_clj.zip.findz');
rewrite_clj.zip.findz.tag_predicate = (function rewrite_clj$zip$findz$tag_predicate(var_args){
var args__4824__auto__ = [];
var len__4818__auto___45716 = arguments.length;
var i__4819__auto___45717 = (0);
while(true){
if((i__4819__auto___45717 < len__4818__auto___45716)){
args__4824__auto__.push((arguments[i__4819__auto___45717]));

var G__45718 = (i__4819__auto___45717 + (1));
i__4819__auto___45717 = G__45718;
continue;
} else {
}
break;
}

var argseq__4825__auto__ = ((((1) < args__4824__auto__.length))?(new cljs.core.IndexedSeq(args__4824__auto__.slice((1)),(0),null)):null);
return rewrite_clj.zip.findz.tag_predicate.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__4825__auto__);
});

(rewrite_clj.zip.findz.tag_predicate.cljs$core$IFn$_invoke$arity$variadic = (function (t,p__45453){
var vec__45454 = p__45453;
var additional = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45454,(0),null);
if(cljs.core.truth_(additional)){
return (function (node){
var and__4210__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(rewrite_clj.zip.base.tag(node),t);
if(and__4210__auto__){
return (additional.cljs$core$IFn$_invoke$arity$1 ? additional.cljs$core$IFn$_invoke$arity$1(node) : additional.call(null,node));
} else {
return and__4210__auto__;
}
});
} else {
return (function (p1__45448_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(rewrite_clj.zip.base.tag(p1__45448_SHARP_),t);
});
}
}));

(rewrite_clj.zip.findz.tag_predicate.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(rewrite_clj.zip.findz.tag_predicate.cljs$lang$applyTo = (function (seq45449){
var G__45450 = cljs.core.first(seq45449);
var seq45449__$1 = cljs.core.next(seq45449);
var self__4805__auto__ = this;
return self__4805__auto__.cljs$core$IFn$_invoke$arity$variadic(G__45450,seq45449__$1);
}));

rewrite_clj.zip.findz.in_range_QMARK_ = (function rewrite_clj$zip$findz$in_range_QMARK_(p__45463,p__45464){
var map__45465 = p__45463;
var map__45465__$1 = cljs.core.__destructure_map(map__45465);
var row = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45465__$1,new cljs.core.Keyword(null,"row","row",-570139521));
var col = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45465__$1,new cljs.core.Keyword(null,"col","col",-1959363084));
var end_row = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45465__$1,new cljs.core.Keyword(null,"end-row","end-row",-545103581));
var end_col = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45465__$1,new cljs.core.Keyword(null,"end-col","end-col",-724155879));
var map__45466 = p__45464;
var map__45466__$1 = cljs.core.__destructure_map(map__45466);
var r = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45466__$1,new cljs.core.Keyword(null,"row","row",-570139521));
var c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45466__$1,new cljs.core.Keyword(null,"col","col",-1959363084));
var and__4210__auto__ = (r >= row);
if(and__4210__auto__){
var and__4210__auto____$1 = (r <= end_row);
if(and__4210__auto____$1){
var and__4210__auto____$2 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(r,row))?(c >= col):true);
if(and__4210__auto____$2){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(r,end_row)){
return (c <= end_col);
} else {
return true;
}
} else {
return and__4210__auto____$2;
}
} else {
return and__4210__auto____$1;
}
} else {
return and__4210__auto__;
}
});
/**
 * Find node satisfying the given predicate by repeatedly
 * applying the given movement function to the initial zipper
 * location.
 */
rewrite_clj.zip.findz.find = (function rewrite_clj$zip$findz$find(var_args){
var G__45476 = arguments.length;
switch (G__45476) {
case 2:
return rewrite_clj.zip.findz.find.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return rewrite_clj.zip.findz.find.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(rewrite_clj.zip.findz.find.cljs$core$IFn$_invoke$arity$2 = (function (zloc,p_QMARK_){
return rewrite_clj.zip.findz.find.cljs$core$IFn$_invoke$arity$3(zloc,rewrite_clj.zip.move.right,p_QMARK_);
}));

(rewrite_clj.zip.findz.find.cljs$core$IFn$_invoke$arity$3 = (function (zloc,f,p_QMARK_){
return cljs.core.first(cljs.core.drop_while.cljs$core$IFn$_invoke$arity$2(cljs.core.complement(p_QMARK_),cljs.core.take_while.cljs$core$IFn$_invoke$arity$2(cljs.core.complement(rewrite_clj.zip.move.end_QMARK_),cljs.core.take_while.cljs$core$IFn$_invoke$arity$2(cljs.core.identity,cljs.core.iterate(f,zloc)))));
}));

(rewrite_clj.zip.findz.find.cljs$lang$maxFixedArity = 3);

/**
 * Find last node (if more than one node) that is in range of pos and
 *   satisfying the given predicate depth first from initial zipper
 *   location.
 */
rewrite_clj.zip.findz.find_last_by_pos = (function rewrite_clj$zip$findz$find_last_by_pos(var_args){
var G__45492 = arguments.length;
switch (G__45492) {
case 2:
return rewrite_clj.zip.findz.find_last_by_pos.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return rewrite_clj.zip.findz.find_last_by_pos.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(rewrite_clj.zip.findz.find_last_by_pos.cljs$core$IFn$_invoke$arity$2 = (function (zloc,pos){
return rewrite_clj.zip.findz.find_last_by_pos.cljs$core$IFn$_invoke$arity$3(zloc,pos,cljs.core.constantly(true));
}));

(rewrite_clj.zip.findz.find_last_by_pos.cljs$core$IFn$_invoke$arity$3 = (function (zloc,pos,p_QMARK_){
return cljs.core.last(cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__45490_SHARP_){
var and__4210__auto__ = (p_QMARK_.cljs$core$IFn$_invoke$arity$1 ? p_QMARK_.cljs$core$IFn$_invoke$arity$1(p1__45490_SHARP_) : p_QMARK_.call(null,p1__45490_SHARP_));
if(cljs.core.truth_(and__4210__auto__)){
return rewrite_clj.zip.findz.in_range_QMARK_(cljs.core.meta(clojure.zip.node(p1__45490_SHARP_)),pos);
} else {
return and__4210__auto__;
}
}),cljs.core.take_while.cljs$core$IFn$_invoke$arity$2(cljs.core.complement(rewrite_clj.zip.move.end_QMARK_),cljs.core.take_while.cljs$core$IFn$_invoke$arity$2(cljs.core.identity,cljs.core.iterate(clojure.zip.next,zloc)))));
}));

(rewrite_clj.zip.findz.find_last_by_pos.cljs$lang$maxFixedArity = 3);

/**
 * Find node satisfying the given predicate by traversing
 * the zipper in a depth-first way.
 */
rewrite_clj.zip.findz.find_depth_first = (function rewrite_clj$zip$findz$find_depth_first(zloc,p_QMARK_){
return rewrite_clj.zip.findz.find.cljs$core$IFn$_invoke$arity$3(zloc,rewrite_clj.zip.move.next,p_QMARK_);
});
/**
 * Find node other than the current zipper location matching
 * the given predicate by applying the given movement function
 * to the initial zipper location.
 */
rewrite_clj.zip.findz.find_next = (function rewrite_clj$zip$findz$find_next(var_args){
var G__45517 = arguments.length;
switch (G__45517) {
case 2:
return rewrite_clj.zip.findz.find_next.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return rewrite_clj.zip.findz.find_next.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(rewrite_clj.zip.findz.find_next.cljs$core$IFn$_invoke$arity$2 = (function (zloc,p_QMARK_){
return rewrite_clj.zip.findz.find_next.cljs$core$IFn$_invoke$arity$3(zloc,rewrite_clj.zip.move.right,p_QMARK_);
}));

(rewrite_clj.zip.findz.find_next.cljs$core$IFn$_invoke$arity$3 = (function (zloc,f,p_QMARK_){
var G__45529 = zloc;
var G__45529__$1 = (((G__45529 == null))?null:(f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(G__45529) : f.call(null,G__45529)));
if((G__45529__$1 == null)){
return null;
} else {
return rewrite_clj.zip.findz.find.cljs$core$IFn$_invoke$arity$3(G__45529__$1,f,p_QMARK_);
}
}));

(rewrite_clj.zip.findz.find_next.cljs$lang$maxFixedArity = 3);

/**
 * Find node other than the current zipper location matching
 * the given predicate by traversing the zipper in a
 * depth-first way.
 */
rewrite_clj.zip.findz.find_next_depth_first = (function rewrite_clj$zip$findz$find_next_depth_first(zloc,p_QMARK_){
return rewrite_clj.zip.findz.find_next.cljs$core$IFn$_invoke$arity$3(zloc,rewrite_clj.zip.move.next,p_QMARK_);
});
/**
 * Find node with the given tag by repeatedly applying the given
 * movement function to the initial zipper location.
 */
rewrite_clj.zip.findz.find_tag = (function rewrite_clj$zip$findz$find_tag(var_args){
var G__45538 = arguments.length;
switch (G__45538) {
case 2:
return rewrite_clj.zip.findz.find_tag.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return rewrite_clj.zip.findz.find_tag.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(rewrite_clj.zip.findz.find_tag.cljs$core$IFn$_invoke$arity$2 = (function (zloc,t){
return rewrite_clj.zip.findz.find_tag.cljs$core$IFn$_invoke$arity$3(zloc,rewrite_clj.zip.move.right,t);
}));

(rewrite_clj.zip.findz.find_tag.cljs$core$IFn$_invoke$arity$3 = (function (zloc,f,t){
return rewrite_clj.zip.findz.find.cljs$core$IFn$_invoke$arity$3(zloc,f,(function (p1__45533_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(rewrite_clj.zip.base.tag(p1__45533_SHARP_),t);
}));
}));

(rewrite_clj.zip.findz.find_tag.cljs$lang$maxFixedArity = 3);

/**
 * Find node other than the current zipper location with the
 * given tag by repeatedly applying the given movement function to
 * the initial zipper location.
 */
rewrite_clj.zip.findz.find_next_tag = (function rewrite_clj$zip$findz$find_next_tag(var_args){
var G__45543 = arguments.length;
switch (G__45543) {
case 2:
return rewrite_clj.zip.findz.find_next_tag.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return rewrite_clj.zip.findz.find_next_tag.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(rewrite_clj.zip.findz.find_next_tag.cljs$core$IFn$_invoke$arity$2 = (function (zloc,t){
return rewrite_clj.zip.findz.find_next_tag.cljs$core$IFn$_invoke$arity$3(zloc,rewrite_clj.zip.move.right,t);
}));

(rewrite_clj.zip.findz.find_next_tag.cljs$core$IFn$_invoke$arity$3 = (function (zloc,f,t){
return rewrite_clj.zip.findz.find_next.cljs$core$IFn$_invoke$arity$3(zloc,f,rewrite_clj.zip.findz.tag_predicate(t));
}));

(rewrite_clj.zip.findz.find_next_tag.cljs$lang$maxFixedArity = 3);

/**
 * Find node with the given tag and pos depth-first from initial zipper location.
 */
rewrite_clj.zip.findz.find_tag_by_pos = (function rewrite_clj$zip$findz$find_tag_by_pos(zloc,pos,t){
return rewrite_clj.zip.findz.find_last_by_pos.cljs$core$IFn$_invoke$arity$3(zloc,pos,(function (p1__45549_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(rewrite_clj.zip.base.tag(p1__45549_SHARP_),t);
}));
});
/**
 * Find token node matching the given predicate by applying the
 * given movement function to the initial zipper location, defaulting
 * to `right`.
 */
rewrite_clj.zip.findz.find_token = (function rewrite_clj$zip$findz$find_token(var_args){
var G__45551 = arguments.length;
switch (G__45551) {
case 2:
return rewrite_clj.zip.findz.find_token.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return rewrite_clj.zip.findz.find_token.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(rewrite_clj.zip.findz.find_token.cljs$core$IFn$_invoke$arity$2 = (function (zloc,p_QMARK_){
return rewrite_clj.zip.findz.find_token.cljs$core$IFn$_invoke$arity$3(zloc,rewrite_clj.zip.move.right,p_QMARK_);
}));

(rewrite_clj.zip.findz.find_token.cljs$core$IFn$_invoke$arity$3 = (function (zloc,f,p_QMARK_){
return rewrite_clj.zip.findz.find.cljs$core$IFn$_invoke$arity$3(zloc,f,rewrite_clj.zip.findz.tag_predicate.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"token","token",-1211463215),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([p_QMARK_], 0)));
}));

(rewrite_clj.zip.findz.find_token.cljs$lang$maxFixedArity = 3);

/**
 * Find next token node matching the given predicate by applying the
 * given movement function to the initial zipper location, defaulting
 * to `right`.
 */
rewrite_clj.zip.findz.find_next_token = (function rewrite_clj$zip$findz$find_next_token(var_args){
var G__45562 = arguments.length;
switch (G__45562) {
case 2:
return rewrite_clj.zip.findz.find_next_token.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return rewrite_clj.zip.findz.find_next_token.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(rewrite_clj.zip.findz.find_next_token.cljs$core$IFn$_invoke$arity$2 = (function (zloc,p_QMARK_){
return rewrite_clj.zip.findz.find_next_token.cljs$core$IFn$_invoke$arity$3(zloc,rewrite_clj.zip.move.right,p_QMARK_);
}));

(rewrite_clj.zip.findz.find_next_token.cljs$core$IFn$_invoke$arity$3 = (function (zloc,f,p_QMARK_){
return rewrite_clj.zip.findz.find_token.cljs$core$IFn$_invoke$arity$3((f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(zloc) : f.call(null,zloc)),f,p_QMARK_);
}));

(rewrite_clj.zip.findz.find_next_token.cljs$lang$maxFixedArity = 3);

/**
 * Find token node whose value matches the given one by applying the
 * given movement function to the initial zipper location, defaulting
 * to `right`.
 */
rewrite_clj.zip.findz.find_value = (function rewrite_clj$zip$findz$find_value(var_args){
var G__45694 = arguments.length;
switch (G__45694) {
case 2:
return rewrite_clj.zip.findz.find_value.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return rewrite_clj.zip.findz.find_value.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(rewrite_clj.zip.findz.find_value.cljs$core$IFn$_invoke$arity$2 = (function (zloc,v){
return rewrite_clj.zip.findz.find_value.cljs$core$IFn$_invoke$arity$3(zloc,rewrite_clj.zip.move.right,v);
}));

(rewrite_clj.zip.findz.find_value.cljs$core$IFn$_invoke$arity$3 = (function (zloc,f,v){
var p_QMARK_ = ((cljs.core.set_QMARK_(v))?cljs.core.comp.cljs$core$IFn$_invoke$arity$2(v,rewrite_clj.zip.base.sexpr):(function (p1__45690_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(rewrite_clj.zip.base.sexpr(p1__45690_SHARP_),v);
}));
return rewrite_clj.zip.findz.find_token.cljs$core$IFn$_invoke$arity$3(zloc,f,p_QMARK_);
}));

(rewrite_clj.zip.findz.find_value.cljs$lang$maxFixedArity = 3);

/**
 * Find next token node whose value matches the given one by applying the
 * given movement function to the initial zipper location, defaulting
 * to `right`.
 */
rewrite_clj.zip.findz.find_next_value = (function rewrite_clj$zip$findz$find_next_value(var_args){
var G__45710 = arguments.length;
switch (G__45710) {
case 2:
return rewrite_clj.zip.findz.find_next_value.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return rewrite_clj.zip.findz.find_next_value.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(rewrite_clj.zip.findz.find_next_value.cljs$core$IFn$_invoke$arity$2 = (function (zloc,v){
return rewrite_clj.zip.findz.find_next_value.cljs$core$IFn$_invoke$arity$3(zloc,rewrite_clj.zip.move.right,v);
}));

(rewrite_clj.zip.findz.find_next_value.cljs$core$IFn$_invoke$arity$3 = (function (zloc,f,v){
return rewrite_clj.zip.findz.find_value.cljs$core$IFn$_invoke$arity$3((f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(zloc) : f.call(null,zloc)),f,v);
}));

(rewrite_clj.zip.findz.find_next_value.cljs$lang$maxFixedArity = 3);


//# sourceMappingURL=rewrite_clj.zip.findz.js.map
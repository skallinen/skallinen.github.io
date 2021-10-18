goog.provide('day8.re_frame_10x.tools.string');
/**
 * Return a pluralized phrase, appending an s to the singular form if no plural is provided.
 *   For example:
 *   (pluralize 5 "month") => "5 months"
 *   (pluralize 1 "month") => "1 month"
 *   (pluralize 1 "radius" "radii") => "1 radius"
 *   (pluralize 9 "radius" "radii") => "9 radii"
 *   From https://github.com/flatland/useful/blob/194950/src/flatland/useful/string.clj#L25-L33
 */
day8.re_frame_10x.tools.string.pluralize = (function day8$re_frame_10x$tools$string$pluralize(var_args){
var args__4824__auto__ = [];
var len__4818__auto___46056 = arguments.length;
var i__4819__auto___46057 = (0);
while(true){
if((i__4819__auto___46057 < len__4818__auto___46056)){
args__4824__auto__.push((arguments[i__4819__auto___46057]));

var G__46058 = (i__4819__auto___46057 + (1));
i__4819__auto___46057 = G__46058;
continue;
} else {
}
break;
}

var argseq__4825__auto__ = ((((2) < args__4824__auto__.length))?(new cljs.core.IndexedSeq(args__4824__auto__.slice((2)),(0),null)):null);
return day8.re_frame_10x.tools.string.pluralize.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__4825__auto__);
});

(day8.re_frame_10x.tools.string.pluralize.cljs$core$IFn$_invoke$arity$variadic = (function (num,singular,p__46036){
var vec__46037 = p__46036;
var plural = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__46037,(0),null);
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(num)," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((1),num))?singular:(function (){var or__4212__auto__ = plural;
if(cljs.core.truth_(or__4212__auto__)){
return or__4212__auto__;
} else {
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(singular),"s"].join('');
}
})()))].join('');
}));

(day8.re_frame_10x.tools.string.pluralize.cljs$lang$maxFixedArity = (2));

/** @this {Function} */
(day8.re_frame_10x.tools.string.pluralize.cljs$lang$applyTo = (function (seq46032){
var G__46033 = cljs.core.first(seq46032);
var seq46032__$1 = cljs.core.next(seq46032);
var G__46034 = cljs.core.first(seq46032__$1);
var seq46032__$2 = cljs.core.next(seq46032__$1);
var self__4805__auto__ = this;
return self__4805__auto__.cljs$core$IFn$_invoke$arity$variadic(G__46033,G__46034,seq46032__$2);
}));

/**
 * Same as pluralize, but doesn't prepend the number to the pluralized string.
 */
day8.re_frame_10x.tools.string.pluralize_ = (function day8$re_frame_10x$tools$string$pluralize_(var_args){
var args__4824__auto__ = [];
var len__4818__auto___46060 = arguments.length;
var i__4819__auto___46061 = (0);
while(true){
if((i__4819__auto___46061 < len__4818__auto___46060)){
args__4824__auto__.push((arguments[i__4819__auto___46061]));

var G__46062 = (i__4819__auto___46061 + (1));
i__4819__auto___46061 = G__46062;
continue;
} else {
}
break;
}

var argseq__4825__auto__ = ((((2) < args__4824__auto__.length))?(new cljs.core.IndexedSeq(args__4824__auto__.slice((2)),(0),null)):null);
return day8.re_frame_10x.tools.string.pluralize_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__4825__auto__);
});

(day8.re_frame_10x.tools.string.pluralize_.cljs$core$IFn$_invoke$arity$variadic = (function (num,singular,p__46046){
var vec__46047 = p__46046;
var plural = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__46047,(0),null);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((1),num)){
return singular;
} else {
var or__4212__auto__ = plural;
if(cljs.core.truth_(or__4212__auto__)){
return or__4212__auto__;
} else {
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(singular),"s"].join('');
}
}
}));

(day8.re_frame_10x.tools.string.pluralize_.cljs$lang$maxFixedArity = (2));

/** @this {Function} */
(day8.re_frame_10x.tools.string.pluralize_.cljs$lang$applyTo = (function (seq46042){
var G__46043 = cljs.core.first(seq46042);
var seq46042__$1 = cljs.core.next(seq46042);
var G__46044 = cljs.core.first(seq46042__$1);
var seq46042__$2 = cljs.core.next(seq46042__$1);
var self__4805__auto__ = this;
return self__4805__auto__.cljs$core$IFn$_invoke$arity$variadic(G__46043,G__46044,seq46042__$2);
}));


//# sourceMappingURL=day8.re_frame_10x.tools.string.js.map

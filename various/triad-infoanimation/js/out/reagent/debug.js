// Compiled by ClojureScript 1.10.597 {}
goog.provide('reagent.debug');
goog.require('cljs.core');
reagent.debug.has_console = (typeof console !== 'undefined');
reagent.debug.tracking = false;
if((typeof reagent !== 'undefined') && (typeof reagent.debug !== 'undefined') && (typeof reagent.debug.warnings !== 'undefined')){
} else {
reagent.debug.warnings = cljs.core.atom.call(null,null);
}
if((typeof reagent !== 'undefined') && (typeof reagent.debug !== 'undefined') && (typeof reagent.debug.track_console !== 'undefined')){
} else {
reagent.debug.track_console = (function (){var o = ({});
(o.warn = (function() { 
var G__28856__delegate = function (args){
return cljs.core.swap_BANG_.call(null,reagent.debug.warnings,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"warn","warn",-436710552)], null),cljs.core.conj,cljs.core.apply.call(null,cljs.core.str,args));
};
var G__28856 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__28857__i = 0, G__28857__a = new Array(arguments.length -  0);
while (G__28857__i < G__28857__a.length) {G__28857__a[G__28857__i] = arguments[G__28857__i + 0]; ++G__28857__i;}
  args = new cljs.core.IndexedSeq(G__28857__a,0,null);
} 
return G__28856__delegate.call(this,args);};
G__28856.cljs$lang$maxFixedArity = 0;
G__28856.cljs$lang$applyTo = (function (arglist__28858){
var args = cljs.core.seq(arglist__28858);
return G__28856__delegate(args);
});
G__28856.cljs$core$IFn$_invoke$arity$variadic = G__28856__delegate;
return G__28856;
})()
);

(o.error = (function() { 
var G__28859__delegate = function (args){
return cljs.core.swap_BANG_.call(null,reagent.debug.warnings,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"error","error",-978969032)], null),cljs.core.conj,cljs.core.apply.call(null,cljs.core.str,args));
};
var G__28859 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__28860__i = 0, G__28860__a = new Array(arguments.length -  0);
while (G__28860__i < G__28860__a.length) {G__28860__a[G__28860__i] = arguments[G__28860__i + 0]; ++G__28860__i;}
  args = new cljs.core.IndexedSeq(G__28860__a,0,null);
} 
return G__28859__delegate.call(this,args);};
G__28859.cljs$lang$maxFixedArity = 0;
G__28859.cljs$lang$applyTo = (function (arglist__28861){
var args = cljs.core.seq(arglist__28861);
return G__28859__delegate(args);
});
G__28859.cljs$core$IFn$_invoke$arity$variadic = G__28859__delegate;
return G__28859;
})()
);

return o;
})();
}
reagent.debug.track_warnings = (function reagent$debug$track_warnings(f){
(reagent.debug.tracking = true);

cljs.core.reset_BANG_.call(null,reagent.debug.warnings,null);

f.call(null);

var warns = cljs.core.deref.call(null,reagent.debug.warnings);
cljs.core.reset_BANG_.call(null,reagent.debug.warnings,null);

(reagent.debug.tracking = false);

return warns;
});

//# sourceMappingURL=debug.js.map?rel=1587041651857

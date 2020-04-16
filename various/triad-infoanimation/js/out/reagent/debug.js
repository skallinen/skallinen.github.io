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
var G__28857__delegate = function (args){
return cljs.core.swap_BANG_.call(null,reagent.debug.warnings,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"warn","warn",-436710552)], null),cljs.core.conj,cljs.core.apply.call(null,cljs.core.str,args));
};
var G__28857 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__28858__i = 0, G__28858__a = new Array(arguments.length -  0);
while (G__28858__i < G__28858__a.length) {G__28858__a[G__28858__i] = arguments[G__28858__i + 0]; ++G__28858__i;}
  args = new cljs.core.IndexedSeq(G__28858__a,0,null);
} 
return G__28857__delegate.call(this,args);};
G__28857.cljs$lang$maxFixedArity = 0;
G__28857.cljs$lang$applyTo = (function (arglist__28859){
var args = cljs.core.seq(arglist__28859);
return G__28857__delegate(args);
});
G__28857.cljs$core$IFn$_invoke$arity$variadic = G__28857__delegate;
return G__28857;
})()
);

(o.error = (function() { 
var G__28860__delegate = function (args){
return cljs.core.swap_BANG_.call(null,reagent.debug.warnings,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"error","error",-978969032)], null),cljs.core.conj,cljs.core.apply.call(null,cljs.core.str,args));
};
var G__28860 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__28861__i = 0, G__28861__a = new Array(arguments.length -  0);
while (G__28861__i < G__28861__a.length) {G__28861__a[G__28861__i] = arguments[G__28861__i + 0]; ++G__28861__i;}
  args = new cljs.core.IndexedSeq(G__28861__a,0,null);
} 
return G__28860__delegate.call(this,args);};
G__28860.cljs$lang$maxFixedArity = 0;
G__28860.cljs$lang$applyTo = (function (arglist__28862){
var args = cljs.core.seq(arglist__28862);
return G__28860__delegate(args);
});
G__28860.cljs$core$IFn$_invoke$arity$variadic = G__28860__delegate;
return G__28860;
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

//# sourceMappingURL=debug.js.map?rel=1587042622259

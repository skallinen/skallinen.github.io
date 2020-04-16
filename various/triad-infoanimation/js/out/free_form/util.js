// Compiled by ClojureScript 1.10.597 {}
goog.provide('free_form.util');
goog.require('cljs.core');
free_form.util.field_QMARK_ = (function free_form$util$field_QMARK_(node){
return ((cljs.core.coll_QMARK_.call(null,node)) && (cljs.core._EQ_.call(null,new cljs.core.Keyword("free-form","field","free-form/field",-703377161),cljs.core.first.call(null,node))));
});
free_form.util.key__GT_keys = (function free_form$util$key__GT_keys(m){
if(cljs.core.contains_QMARK_.call(null,m,new cljs.core.Keyword(null,"key","key",-1516042587))){
if(cljs.core.contains_QMARK_.call(null,m,new cljs.core.Keyword(null,"keys","keys",1068423698))){
throw (new Error("key->keys expects a map with :key or :keys, not both"));
} else {
return cljs.core.assoc.call(null,m,new cljs.core.Keyword(null,"keys","keys",1068423698),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"key","key",-1516042587).cljs$core$IFn$_invoke$arity$1(m)], null));
}
} else {
return m;
}
});
/**
 * The second element in structure that represents an input is the attributes, as in :type, :key, etc.
 */
free_form.util.attributes_index = (1);

//# sourceMappingURL=util.js.map?rel=1587042623933

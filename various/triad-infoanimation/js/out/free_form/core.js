// Compiled by ClojureScript 1.10.597 {}
goog.provide('free_form.core');
goog.require('cljs.core');
goog.require('clojure.string');
goog.require('clojure.walk');
goog.require('free_form.extension');
goog.require('free_form.util');
free_form.core.extract_attributes = (function free_form$core$extract_attributes(node,key){
var attributes = cljs.core.get.call(null,node,free_form.util.attributes_index);
var re_attributes = key.call(null,attributes);
var attributes__$1 = cljs.core.dissoc.call(null,attributes,key);
var keys = (function (){var or__4185__auto__ = new cljs.core.Keyword(null,"keys","keys",1068423698).cljs$core$IFn$_invoke$arity$1(re_attributes);
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"key","key",-1516042587).cljs$core$IFn$_invoke$arity$1(re_attributes)], null);
}
})();
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [attributes__$1,re_attributes,keys], null);
});
free_form.core.input_QMARK_ = (function free_form$core$input_QMARK_(node){
return ((cljs.core.coll_QMARK_.call(null,node)) && (cljs.core.contains_QMARK_.call(null,cljs.core.second.call(null,node),new cljs.core.Keyword("free-form","input","free-form/input",228451328))));
});
free_form.core.js_event_value = (function free_form$core$js_event_value(event){
var target = event.target;
var G__29650 = target.type;
switch (G__29650) {
case "checkbox":
return target.checked;

break;
default:
return target.value;

}
});
free_form.core.extract_event_value = (function free_form$core$extract_event_value(event){
if(((cljs.core.boolean_QMARK_.call(null,event)) || (typeof event === 'string'))){
return event;
} else {
return free_form.core.js_event_value.call(null,event);
}
});
free_form.core.first_non_nil = (function free_form$core$first_non_nil(var_args){
var args__4795__auto__ = [];
var len__4789__auto___29653 = arguments.length;
var i__4790__auto___29654 = (0);
while(true){
if((i__4790__auto___29654 < len__4789__auto___29653)){
args__4795__auto__.push((arguments[i__4790__auto___29654]));

var G__29655 = (i__4790__auto___29654 + (1));
i__4790__auto___29654 = G__29655;
continue;
} else {
}
break;
}

var argseq__4796__auto__ = ((((0) < args__4795__auto__.length))?(new cljs.core.IndexedSeq(args__4795__auto__.slice((0)),(0),null)):null);
return free_form.core.first_non_nil.cljs$core$IFn$_invoke$arity$variadic(argseq__4796__auto__);
});

(free_form.core.first_non_nil.cljs$core$IFn$_invoke$arity$variadic = (function (coll){
return cljs.core.first.call(null,cljs.core.filter.call(null,cljs.core.complement.call(null,cljs.core.nil_QMARK_),coll));
}));

(free_form.core.first_non_nil.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(free_form.core.first_non_nil.cljs$lang$applyTo = (function (seq29652){
var self__4777__auto__ = this;
return self__4777__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq29652));
}));

free_form.core.bind_input = (function free_form$core$bind_input(values,errors,on_change,node){
if((!(free_form.core.input_QMARK_.call(null,node)))){
return node;
} else {
var vec__29658 = free_form.core.extract_attributes.call(null,node,new cljs.core.Keyword("free-form","input","free-form/input",228451328));
var attributes = cljs.core.nth.call(null,vec__29658,(0),null);
var free_form_attributes = cljs.core.nth.call(null,vec__29658,(1),null);
var keys = cljs.core.nth.call(null,vec__29658,(2),null);
var map__29661 = free_form_attributes;
var map__29661__$1 = (((((!((map__29661 == null))))?(((((map__29661.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__29661.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__29661):map__29661);
var value_on = cljs.core.get.call(null,map__29661__$1,new cljs.core.Keyword(null,"value-on","value-on",793040241));
var error_on = cljs.core.get.call(null,map__29661__$1,new cljs.core.Keyword(null,"error-on","error-on",-1977855177));
var extra_error_keys = cljs.core.get.call(null,map__29661__$1,new cljs.core.Keyword(null,"extra-error-keys","extra-error-keys",1784896497));
var on_change_fn = (function (p1__29656_SHARP_){
return on_change.call(null,keys,free_form.core.extract_event_value.call(null,p1__29656_SHARP_));
});
var value_on__$1 = (function (){var or__4185__auto__ = value_on;
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
var G__29663 = new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(attributes);
var G__29663__$1 = (((G__29663 instanceof cljs.core.Keyword))?G__29663.fqn:null);
switch (G__29663__$1) {
case "checkbox":
case "radio":
return new cljs.core.Keyword(null,"default-checked","default-checked",1039965863);

break;
default:
return new cljs.core.Keyword(null,"value","value",305978217);

}
}
})();
var value = (function (){var G__29664 = new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(attributes);
var G__29664__$1 = (((G__29664 instanceof cljs.core.Keyword))?G__29664.fqn:null);
switch (G__29664__$1) {
case "checkbox":
return cljs.core._EQ_.call(null,true,cljs.core.get_in.call(null,values,keys));

break;
case "radio":
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(attributes),cljs.core.get_in.call(null,values,keys));

break;
default:
return free_form.core.first_non_nil.call(null,cljs.core.get_in.call(null,values,keys),new cljs.core.Keyword(null,"blank-value","blank-value",-1213237793).cljs$core$IFn$_invoke$arity$1(free_form_attributes),"");

}
})();
var input_errors = cljs.core.get_in.call(null,errors,keys);
return cljs.core.assoc.call(null,node,free_form.util.attributes_index,(function (){var G__29665 = attributes;
var G__29665__$1 = cljs.core.assoc.call(null,G__29665,new cljs.core.Keyword(null,"on-change","on-change",-732046149),on_change_fn)
;
var G__29665__$2 = cljs.core.assoc.call(null,G__29665__$1,value_on__$1,value)
;
var G__29665__$3 = (cljs.core.truth_((function (){var and__4174__auto__ = error_on;
if(cljs.core.truth_(and__4174__auto__)){
return input_errors;
} else {
return and__4174__auto__;
}
})())?cljs.core.assoc.call(null,G__29665__$2,error_on,clojure.string.join.call(null," ",input_errors)):G__29665__$2);
if(cljs.core.truth_((function (){var and__4174__auto__ = extra_error_keys;
if(cljs.core.truth_(and__4174__auto__)){
return cljs.core.some.call(null,(function (p1__29657_SHARP_){
return cljs.core.get_in.call(null,errors,p1__29657_SHARP_);
}),extra_error_keys);
} else {
return and__4174__auto__;
}
})())){
return cljs.core.assoc.call(null,G__29665__$3,error_on," ");
} else {
return G__29665__$3;
}
})());
}
});
/**
 * Tests whether the node should be marked with an error class should the field have an associated error.
 */
free_form.core.error_class_QMARK_ = (function free_form$core$error_class_QMARK_(node){
return ((cljs.core.coll_QMARK_.call(null,node)) && (cljs.core.contains_QMARK_.call(null,cljs.core.second.call(null,node),new cljs.core.Keyword("free-form","error-class","free-form/error-class",159754118))));
});
free_form.core.bind_error_class = (function free_form$core$bind_error_class(errors,node){
if((!(free_form.core.error_class_QMARK_.call(null,node)))){
return node;
} else {
var vec__29670 = free_form.core.extract_attributes.call(null,node,new cljs.core.Keyword("free-form","error-class","free-form/error-class",159754118));
var attributes = cljs.core.nth.call(null,vec__29670,(0),null);
var re_attributes = cljs.core.nth.call(null,vec__29670,(1),null);
var keys = cljs.core.nth.call(null,vec__29670,(2),null);
return cljs.core.assoc.call(null,node,free_form.util.attributes_index,((cljs.core.not_any_QMARK_.call(null,(function (p1__29668_SHARP_){
return cljs.core.get_in.call(null,errors,p1__29668_SHARP_);
}),cljs.core.conj.call(null,new cljs.core.Keyword(null,"extra-keys","extra-keys",-1845607319).cljs$core$IFn$_invoke$arity$1(re_attributes),keys)))?attributes:cljs.core.update.call(null,attributes,new cljs.core.Keyword(null,"class","class",-2030961996),(function (p1__29669_SHARP_){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var or__4185__auto__ = new cljs.core.Keyword(null,"error","error",-978969032).cljs$core$IFn$_invoke$arity$1(re_attributes);
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
return "error";
}
})()),cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__29669_SHARP_)].join('');
}))));
}
});
free_form.core.error_messages_QMARK_ = (function free_form$core$error_messages_QMARK_(node){
return ((cljs.core.coll_QMARK_.call(null,node)) && (cljs.core.contains_QMARK_.call(null,cljs.core.second.call(null,node),new cljs.core.Keyword("free-form","error-message","free-form/error-message",-1957745210))));
});
free_form.core.bind_error_messages = (function free_form$core$bind_error_messages(errors,node){
if((!(free_form.core.error_messages_QMARK_.call(null,node)))){
return node;
} else {
var vec__29674 = free_form.core.extract_attributes.call(null,node,new cljs.core.Keyword("free-form","error-message","free-form/error-message",-1957745210));
var attributes = cljs.core.nth.call(null,vec__29674,(0),null);
var _ = cljs.core.nth.call(null,vec__29674,(1),null);
var keys = cljs.core.nth.call(null,vec__29674,(2),null);
var temp__5733__auto__ = cljs.core.get_in.call(null,errors,keys);
if(cljs.core.truth_(temp__5733__auto__)){
var errors__$1 = temp__5733__auto__;
return cljs.core.vec.call(null,cljs.core.concat.call(null,cljs.core.drop_last.call(null,cljs.core.assoc.call(null,node,free_form.util.attributes_index,attributes)),cljs.core.map.call(null,(function (p1__29673_SHARP_){
return cljs.core.conj.call(null,cljs.core.get.call(null,node,(2)),p1__29673_SHARP_);
}),errors__$1)));
} else {
return null;
}
}
});
free_form.core.warn_of_leftovers = (function free_form$core$warn_of_leftovers(node){
var attrs_29678 = cljs.core.get.call(null,node,free_form.util.attributes_index);
if(cljs.core.truth_(((cljs.core.map_QMARK_.call(null,attrs_29678))?cljs.core.some.call(null,(function (p1__29677_SHARP_){
return cljs.core._EQ_.call(null,"free-form",cljs.core.namespace.call(null,p1__29677_SHARP_));
}),cljs.core.keys.call(null,attrs_29678)):false))){
console.error("There are free-form-looking leftovers on",cljs.core.pr_str.call(null,node));
} else {
}

return node;
});
free_form.core.form = (function free_form$core$form(var_args){
var G__29686 = arguments.length;
switch (G__29686) {
case 4:
return free_form.core.form.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return free_form.core.form.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(free_form.core.form.cljs$core$IFn$_invoke$arity$4 = (function (values,errors,on_change,html){
return free_form.core.form.call(null,values,errors,on_change,cljs.core.PersistentVector.EMPTY,html);
}));

(free_form.core.form.cljs$core$IFn$_invoke$arity$5 = (function (values,errors,on_change,extensions,html){
var errors__$1 = (function (){var or__4185__auto__ = errors;
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
var extensions__$1 = ((cljs.core.sequential_QMARK_.call(null,extensions))?extensions:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [extensions], null));
var inner_fn = (function (html__$1){
return clojure.walk.postwalk.call(null,(function (p1__29681_SHARP_){
return free_form.core.bind_error_messages.call(null,errors__$1,p1__29681_SHARP_);
}),clojure.walk.postwalk.call(null,(function (p1__29680_SHARP_){
return free_form.core.bind_error_class.call(null,errors__$1,p1__29680_SHARP_);
}),clojure.walk.postwalk.call(null,(function (p1__29679_SHARP_){
return free_form.core.bind_input.call(null,values,errors__$1,on_change,p1__29679_SHARP_);
}),html__$1)));
});
return clojure.walk.postwalk.call(null,(function (p1__29682_SHARP_){
return free_form.core.warn_of_leftovers.call(null,p1__29682_SHARP_);
}),cljs.core.reduce.call(null,(function (p1__29684_SHARP_,p2__29683_SHARP_){
return free_form.extension.extension.call(null,p2__29683_SHARP_,p1__29684_SHARP_);
}),inner_fn,extensions__$1).call(null,html));
}));

(free_form.core.form.cljs$lang$maxFixedArity = 5);


//# sourceMappingURL=core.js.map?rel=1587041653633

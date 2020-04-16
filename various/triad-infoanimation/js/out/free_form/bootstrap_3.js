// Compiled by ClojureScript 1.10.597 {}
goog.provide('free_form.bootstrap_3');
goog.require('cljs.core');
goog.require('clojure.walk');
goog.require('clojure.string');
goog.require('free_form.util');
goog.require('free_form.extension');
free_form.bootstrap_3.expand_bootstrap_3_input = (function free_form$bootstrap_3$expand_bootstrap_3_input(id,keys,type,placeholder,options){
var G__29365 = type;
var G__29365__$1 = (((G__29365 instanceof cljs.core.Keyword))?G__29365.fqn:null);
switch (G__29365__$1) {
case "select":
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"select.form-control","select.form-control",696610397),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword("free-form","input","free-form/input",228451328),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keys","keys",1068423698),keys], null),new cljs.core.Keyword(null,"type","type",1174270348),type,new cljs.core.Keyword(null,"id","id",-1388402092),id,new cljs.core.Keyword(null,"placeholder","placeholder",-104873083),placeholder], null),(function (){var generate_option = (function free_form$bootstrap_3$expand_bootstrap_3_input_$_generate_option(p__29370){
var vec__29371 = p__29370;
var value = cljs.core.nth.call(null,vec__29371,(0),null);
var name = cljs.core.nth.call(null,vec__29371,(1),null);
if(cljs.core.sequential_QMARK_.call(null,name)){
return cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"optgroup","optgroup",1738282218),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"label","label",1718410804),value], null),cljs.core.map.call(null,free_form$bootstrap_3$expand_bootstrap_3_input_$_generate_option,cljs.core.partition.call(null,(2),name))], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),value], null));
} else {
return cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"option","option",65132272),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",305978217),value], null),name], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),value], null));
}
});
return cljs.core.map.call(null,generate_option,cljs.core.partition.call(null,(2),options));
})()], null);

break;
case "textarea":
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"textarea.form-control","textarea.form-control",-1690362789),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword("free-form","input","free-form/input",228451328),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keys","keys",1068423698),keys], null),new cljs.core.Keyword(null,"type","type",1174270348),type,new cljs.core.Keyword(null,"id","id",-1388402092),id], null)], null);

break;
case "checkbox":
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword("free-form","input","free-form/input",228451328),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keys","keys",1068423698),keys], null),new cljs.core.Keyword(null,"type","type",1174270348),type,new cljs.core.Keyword(null,"id","id",-1388402092),id], null)], null);

break;
case "radio":
return cljs.core.map.call(null,(function (p__29374){
var vec__29375 = p__29374;
var value = cljs.core.nth.call(null,vec__29375,(0),null);
var name = cljs.core.nth.call(null,vec__29375,(1),null);
return cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword("free-form","input","free-form/input",228451328),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keys","keys",1068423698),keys], null),new cljs.core.Keyword(null,"type","type",1174270348),type,new cljs.core.Keyword(null,"name","name",1843675177),id,new cljs.core.Keyword(null,"value","value",305978217),value], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"name","name",1843675177),name], null));
}),cljs.core.partition.call(null,(2),options));

break;
default:
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input.form-control","input.form-control",-1123419636),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword("free-form","input","free-form/input",228451328),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keys","keys",1068423698),keys], null),new cljs.core.Keyword(null,"type","type",1174270348),type,new cljs.core.Keyword(null,"id","id",-1388402092),id,new cljs.core.Keyword(null,"placeholder","placeholder",-104873083),placeholder], null)], null);

}
});
free_form.bootstrap_3.expand_bootstrap_3_fields = (function free_form$bootstrap_3$expand_bootstrap_3_fields(node){
if(free_form.util.field_QMARK_.call(null,node)){
var map__29379 = free_form.util.key__GT_keys.call(null,cljs.core.second.call(null,node));
var map__29379__$1 = (((((!((map__29379 == null))))?(((((map__29379.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__29379.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__29379):map__29379);
var type = cljs.core.get.call(null,map__29379__$1,new cljs.core.Keyword(null,"type","type",1174270348));
var keys = cljs.core.get.call(null,map__29379__$1,new cljs.core.Keyword(null,"keys","keys",1068423698));
var extra_validation_error_keys = cljs.core.get.call(null,map__29379__$1,new cljs.core.Keyword(null,"extra-validation-error-keys","extra-validation-error-keys",1796957437));
var label = cljs.core.get.call(null,map__29379__$1,new cljs.core.Keyword(null,"label","label",1718410804));
var placeholder = cljs.core.get.call(null,map__29379__$1,new cljs.core.Keyword(null,"placeholder","placeholder",-104873083));
var options = cljs.core.get.call(null,map__29379__$1,new cljs.core.Keyword(null,"options","options",99638489));
var id = clojure.string.join.call(null,"-",cljs.core.map.call(null,cljs.core.name,keys));
var G__29381 = type;
var G__29381__$1 = (((G__29381 instanceof cljs.core.Keyword))?G__29381.fqn:null);
switch (G__29381__$1) {
case "checkbox":
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.checkbox","div.checkbox",389009838),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("free-form","error-class","free-form/error-class",159754118),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"keys","keys",1068423698),keys,new cljs.core.Keyword(null,"extra-keys","extra-keys",-1845607319),extra_validation_error_keys,new cljs.core.Keyword(null,"error","error",-978969032),"has-error"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label","label",1718410804),free_form.bootstrap_3.expand_bootstrap_3_input.call(null,id,keys,type,placeholder,options),label], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.text-danger","div.text-danger",-1781819271),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("free-form","error-message","free-form/error-message",-1957745210),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keys","keys",1068423698),keys], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309)], null)], null)], null);

break;
case "radio":
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("free-form","error-class","free-form/error-class",159754118),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"keys","keys",1068423698),keys,new cljs.core.Keyword(null,"extra-keys","extra-keys",-1845607319),extra_validation_error_keys,new cljs.core.Keyword(null,"error","error",-978969032),"has-error"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label","label",1718410804),label], null),cljs.core.map.call(null,(function (input){
return cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.radio","div.radio",1435221667),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label","label",1718410804),input,new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,input))], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),[id,"-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.get_in.call(null,input,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1),new cljs.core.Keyword(null,"value","value",305978217)], null)))].join('')], null));
}),free_form.bootstrap_3.expand_bootstrap_3_input.call(null,id,keys,type,placeholder,options)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.text-danger","div.text-danger",-1781819271),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("free-form","error-message","free-form/error-message",-1957745210),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keys","keys",1068423698),keys], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309)], null)], null)], null);

break;
default:
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.form-group","div.form-group",-1721134770),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("free-form","error-class","free-form/error-class",159754118),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"keys","keys",1068423698),keys,new cljs.core.Keyword(null,"extra-keys","extra-keys",-1845607319),extra_validation_error_keys,new cljs.core.Keyword(null,"error","error",-978969032),"has-error"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label.control-label","label.control-label",-528524585),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"for","for",-1323786319),id], null),label], null),free_form.bootstrap_3.expand_bootstrap_3_input.call(null,id,keys,type,placeholder,options),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.text-danger","div.text-danger",-1781819271),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("free-form","error-message","free-form/error-message",-1957745210),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keys","keys",1068423698),keys], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309)], null)], null)], null);

}
} else {
return node;
}
});
free_form.bootstrap_3.expand_bootstrap_3_horizontal_fields = (function free_form$bootstrap_3$expand_bootstrap_3_horizontal_fields(node){
if(free_form.util.field_QMARK_.call(null,node)){
var map__29383 = free_form.util.key__GT_keys.call(null,cljs.core.second.call(null,node));
var map__29383__$1 = (((((!((map__29383 == null))))?(((((map__29383.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__29383.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__29383):map__29383);
var type = cljs.core.get.call(null,map__29383__$1,new cljs.core.Keyword(null,"type","type",1174270348));
var keys = cljs.core.get.call(null,map__29383__$1,new cljs.core.Keyword(null,"keys","keys",1068423698));
var extra_validation_error_keys = cljs.core.get.call(null,map__29383__$1,new cljs.core.Keyword(null,"extra-validation-error-keys","extra-validation-error-keys",1796957437));
var label = cljs.core.get.call(null,map__29383__$1,new cljs.core.Keyword(null,"label","label",1718410804));
var placeholder = cljs.core.get.call(null,map__29383__$1,new cljs.core.Keyword(null,"placeholder","placeholder",-104873083));
var options = cljs.core.get.call(null,map__29383__$1,new cljs.core.Keyword(null,"options","options",99638489));
var id = clojure.string.join.call(null,"-",cljs.core.map.call(null,cljs.core.name,keys));
var G__29385 = type;
var G__29385__$1 = (((G__29385 instanceof cljs.core.Keyword))?G__29385.fqn:null);
switch (G__29385__$1) {
case "checkbox":
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.form-group","div.form-group",-1721134770),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("free-form","error-class","free-form/error-class",159754118),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"keys","keys",1068423698),keys,new cljs.core.Keyword(null,"extra-keys","extra-keys",-1845607319),extra_validation_error_keys,new cljs.core.Keyword(null,"error","error",-978969032),"has-error"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.col-sm-offset-2.col-sm-10","div.col-sm-offset-2.col-sm-10",353212848),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.checkbox","div.checkbox",389009838),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label","label",1718410804),free_form.bootstrap_3.expand_bootstrap_3_input.call(null,id,keys,type,placeholder,options),label], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.text-danger","div.text-danger",-1781819271),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("free-form","error-message","free-form/error-message",-1957745210),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keys","keys",1068423698),keys], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309)], null)], null)], null)], null);

break;
case "radio":
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.form-group","div.form-group",-1721134770),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("free-form","error-class","free-form/error-class",159754118),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"keys","keys",1068423698),keys,new cljs.core.Keyword(null,"extra-keys","extra-keys",-1845607319),extra_validation_error_keys,new cljs.core.Keyword(null,"error","error",-978969032),"has-error"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label.col-sm-2.control-label","label.col-sm-2.control-label",-947311669),label], null),cljs.core.conj.call(null,cljs.core.into.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.col-sm-10","div.col-sm-10",353164674)], null),cljs.core.map.call(null,(function (input){
return cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.radio","div.radio",1435221667),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label","label",1718410804),input,new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,input))], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),[id,"-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.get_in.call(null,input,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1),new cljs.core.Keyword(null,"value","value",305978217)], null)))].join('')], null));
}),free_form.bootstrap_3.expand_bootstrap_3_input.call(null,id,keys,type,placeholder,options))),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.text-danger","div.text-danger",-1781819271),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("free-form","error-message","free-form/error-message",-1957745210),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keys","keys",1068423698),keys], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309)], null)], null))], null);

break;
default:
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.form-group","div.form-group",-1721134770),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("free-form","error-class","free-form/error-class",159754118),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"keys","keys",1068423698),keys,new cljs.core.Keyword(null,"extra-keys","extra-keys",-1845607319),extra_validation_error_keys,new cljs.core.Keyword(null,"error","error",-978969032),"has-error"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label.col-sm-2.control-label","label.col-sm-2.control-label",-947311669),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"for","for",-1323786319),id], null),label], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.col-sm-10","div.col-sm-10",353164674),free_form.bootstrap_3.expand_bootstrap_3_input.call(null,id,keys,type,placeholder,options),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.text-danger","div.text-danger",-1781819271),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("free-form","error-message","free-form/error-message",-1957745210),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keys","keys",1068423698),keys], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309)], null)], null)], null)], null);

}
} else {
return node;
}
});
free_form.bootstrap_3.expand_bootstrap_3_inline_fields = (function free_form$bootstrap_3$expand_bootstrap_3_inline_fields(node){
if(free_form.util.field_QMARK_.call(null,node)){
var map__29387 = free_form.util.key__GT_keys.call(null,cljs.core.second.call(null,node));
var map__29387__$1 = (((((!((map__29387 == null))))?(((((map__29387.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__29387.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__29387):map__29387);
var type = cljs.core.get.call(null,map__29387__$1,new cljs.core.Keyword(null,"type","type",1174270348));
var keys = cljs.core.get.call(null,map__29387__$1,new cljs.core.Keyword(null,"keys","keys",1068423698));
var extra_validation_error_keys = cljs.core.get.call(null,map__29387__$1,new cljs.core.Keyword(null,"extra-validation-error-keys","extra-validation-error-keys",1796957437));
var label = cljs.core.get.call(null,map__29387__$1,new cljs.core.Keyword(null,"label","label",1718410804));
var placeholder = cljs.core.get.call(null,map__29387__$1,new cljs.core.Keyword(null,"placeholder","placeholder",-104873083));
var options = cljs.core.get.call(null,map__29387__$1,new cljs.core.Keyword(null,"options","options",99638489));
var id = clojure.string.join.call(null,"-",cljs.core.map.call(null,cljs.core.name,keys));
var G__29389 = type;
var G__29389__$1 = (((G__29389 instanceof cljs.core.Keyword))?G__29389.fqn:null);
switch (G__29389__$1) {
case "checkbox":
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.form-group","div.form-group",-1721134770),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label.checkbox-inline","label.checkbox-inline",175190793),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("free-form","error-class","free-form/error-class",159754118),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"keys","keys",1068423698),keys,new cljs.core.Keyword(null,"extra-keys","extra-keys",-1845607319),extra_validation_error_keys,new cljs.core.Keyword(null,"error","error",-978969032),"has-error"], null)], null),free_form.bootstrap_3.expand_bootstrap_3_input.call(null,id,keys,type,placeholder,options),label], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.text-danger","div.text-danger",-1781819271),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("free-form","error-message","free-form/error-message",-1957745210),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keys","keys",1068423698),keys], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309)], null)], null)], null);

break;
case "radio":
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.form-group","div.form-group",-1721134770),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("free-form","error-class","free-form/error-class",159754118),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"keys","keys",1068423698),keys,new cljs.core.Keyword(null,"extra-keys","extra-keys",-1845607319),extra_validation_error_keys,new cljs.core.Keyword(null,"error","error",-978969032),"has-error"], null)], null),(cljs.core.truth_(label)?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label","label",1718410804),label], null):null),cljs.core.map.call(null,(function (input){
return cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.radio-inline","div.radio-inline",-1747242838),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label","label",1718410804),input,new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,input))], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),[id,"-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.get_in.call(null,input,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1),new cljs.core.Keyword(null,"value","value",305978217)], null)))].join('')], null));
}),free_form.bootstrap_3.expand_bootstrap_3_input.call(null,id,keys,type,placeholder,options)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.text-danger","div.text-danger",-1781819271),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("free-form","error-message","free-form/error-message",-1957745210),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keys","keys",1068423698),keys], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309)], null)], null)], null);

break;
default:
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.form-group","div.form-group",-1721134770),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("free-form","error-class","free-form/error-class",159754118),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"keys","keys",1068423698),keys,new cljs.core.Keyword(null,"extra-keys","extra-keys",-1845607319),extra_validation_error_keys,new cljs.core.Keyword(null,"error","error",-978969032),"has-error"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label.control-label","label.control-label",-528524585),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"for","for",-1323786319),id], null),label], null)," ",free_form.bootstrap_3.expand_bootstrap_3_input.call(null,id,keys,type,placeholder,options)," ",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.text-danger","div.text-danger",-1781819271),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("free-form","error-message","free-form/error-message",-1957745210),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keys","keys",1068423698),keys], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309)], null)], null)], null);

}
} else {
return node;
}
});
free_form.bootstrap_3.bootstrap_3_form_horizontal_QMARK_ = (function free_form$bootstrap_3$bootstrap_3_form_horizontal_QMARK_(node){
return ((cljs.core.coll_QMARK_.call(null,node)) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"form.form-horizontal","form.form-horizontal",-1605711052),cljs.core.first.call(null,node))));
});
free_form.bootstrap_3.bootstrap_3_form_inline_QMARK_ = (function free_form$bootstrap_3$bootstrap_3_form_inline_QMARK_(node){
return ((cljs.core.coll_QMARK_.call(null,node)) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"form.form-inline","form.form-inline",1823626904),cljs.core.first.call(null,node))));
});
free_form.bootstrap_3.expand_bootstrap_3_form = (function free_form$bootstrap_3$expand_bootstrap_3_form(node){
if(free_form.bootstrap_3.bootstrap_3_form_horizontal_QMARK_.call(null,node)){
return clojure.walk.postwalk.call(null,free_form.bootstrap_3.expand_bootstrap_3_horizontal_fields,node);
} else {
if(free_form.bootstrap_3.bootstrap_3_form_inline_QMARK_.call(null,node)){
return clojure.walk.postwalk.call(null,free_form.bootstrap_3.expand_bootstrap_3_inline_fields,node);
} else {
return clojure.walk.postwalk.call(null,free_form.bootstrap_3.expand_bootstrap_3_fields,node);

}
}
});
cljs.core._add_method.call(null,free_form.extension.extension,new cljs.core.Keyword(null,"bootstrap-3","bootstrap-3",535840793),(function (_extension_name,inner_fn){
return (function (html){
return inner_fn.call(null,clojure.walk.prewalk.call(null,free_form.bootstrap_3.expand_bootstrap_3_form,html));
});
}));

//# sourceMappingURL=bootstrap_3.js.map

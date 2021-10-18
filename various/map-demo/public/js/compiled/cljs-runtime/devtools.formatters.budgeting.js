goog.provide('devtools.formatters.budgeting');
devtools.formatters.budgeting.header_expander_depth_cost = (2);
devtools.formatters.budgeting.over_budget_values = (((typeof WeakSet !== 'undefined'))?(new WeakSet()):cljs.core.volatile_BANG_(cljs.core.PersistentHashSet.EMPTY));
devtools.formatters.budgeting.add_over_budget_value_BANG_ = (function devtools$formatters$budgeting$add_over_budget_value_BANG_(value){
if(cljs.core.volatile_QMARK_(devtools.formatters.budgeting.over_budget_values)){
return cljs.core.vreset_BANG_(devtools.formatters.budgeting.over_budget_values,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(devtools.formatters.budgeting.over_budget_values),value));
} else {
var o__33771__auto__ = devtools.formatters.budgeting.over_budget_values;
return (o__33771__auto__["add"]).call(o__33771__auto__,value);
}
});
devtools.formatters.budgeting.delete_over_budget_value_BANG_ = (function devtools$formatters$budgeting$delete_over_budget_value_BANG_(value){
if(cljs.core.volatile_QMARK_(devtools.formatters.budgeting.over_budget_values)){
return cljs.core.vreset_BANG_(devtools.formatters.budgeting.over_budget_values,cljs.core.disj.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(devtools.formatters.budgeting.over_budget_values),value));
} else {
var o__33771__auto__ = devtools.formatters.budgeting.over_budget_values;
return (o__33771__auto__["delete"]).call(o__33771__auto__,value);
}
});
devtools.formatters.budgeting.has_over_budget_value_QMARK_ = (function devtools$formatters$budgeting$has_over_budget_value_QMARK_(value){
if(cljs.core.volatile_QMARK_(devtools.formatters.budgeting.over_budget_values)){
return cljs.core.contains_QMARK_(cljs.core.deref(devtools.formatters.budgeting.over_budget_values),value);
} else {
var o__33771__auto__ = devtools.formatters.budgeting.over_budget_values;
return (o__33771__auto__["has"]).call(o__33771__auto__,value);
}
});
devtools.formatters.budgeting.object_reference_QMARK_ = (function devtools$formatters$budgeting$object_reference_QMARK_(json_ml){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.first(json_ml),"object");
});
devtools.formatters.budgeting.determine_depth = (function devtools$formatters$budgeting$determine_depth(json_ml){
if(cljs.core.array_QMARK_(json_ml)){
return (cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.max,cljs.core.map.cljs$core$IFn$_invoke$arity$2(devtools.formatters.budgeting.determine_depth,json_ml)) + (1));
} else {
return (0);
}
});
devtools.formatters.budgeting.has_any_object_reference_QMARK_ = (function devtools$formatters$budgeting$has_any_object_reference_QMARK_(json_ml){
if(cljs.core.array_QMARK_(json_ml)){
if(devtools.formatters.budgeting.object_reference_QMARK_(json_ml)){
return true;
} else {
return cljs.core.some(devtools.formatters.budgeting.has_any_object_reference_QMARK_,json_ml);
}
} else {
return null;
}
});
devtools.formatters.budgeting.transfer_remaining_depth_budget_BANG_ = (function devtools$formatters$budgeting$transfer_remaining_depth_budget_BANG_(object_reference,depth_budget){
if((!((depth_budget < (0))))){
} else {
throw (new Error("Assert failed: (not (neg? depth-budget))"));
}

var data = cljs.core.second(object_reference);
var _ = ((cljs.core.object_QMARK_(data))?null:(function(){throw (new Error("Assert failed: (object? data)"))})());
var config = (data["config"]);
var G__40130 = data;
var target__33793__auto__ = G__40130;
if(cljs.core.truth_(target__33793__auto__)){
} else {
throw (new Error(["Assert failed: ",["unable to locate object path ",null," in ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__40130)].join(''),"\n","target__33793__auto__"].join('')));
}

(target__33793__auto__["config"] = devtools.formatters.state.set_depth_budget(config,depth_budget));

return G__40130;
});
devtools.formatters.budgeting.distribute_budget_BANG_ = (function devtools$formatters$budgeting$distribute_budget_BANG_(json_ml,depth_budget){
if((!((depth_budget < (0))))){
} else {
throw (new Error("Assert failed: (not (neg? depth-budget))"));
}

if(cljs.core.array_QMARK_(json_ml)){
var new_depth_budget_40165 = (depth_budget - (1));
if(devtools.formatters.budgeting.object_reference_QMARK_(json_ml)){
devtools.formatters.budgeting.transfer_remaining_depth_budget_BANG_(json_ml,new_depth_budget_40165);
} else {
var seq__40134_40166 = cljs.core.seq(json_ml);
var chunk__40136_40167 = null;
var count__40137_40168 = (0);
var i__40138_40169 = (0);
while(true){
if((i__40138_40169 < count__40137_40168)){
var item_40170 = chunk__40136_40167.cljs$core$IIndexed$_nth$arity$2(null,i__40138_40169);
(devtools.formatters.budgeting.distribute_budget_BANG_.cljs$core$IFn$_invoke$arity$2 ? devtools.formatters.budgeting.distribute_budget_BANG_.cljs$core$IFn$_invoke$arity$2(item_40170,new_depth_budget_40165) : devtools.formatters.budgeting.distribute_budget_BANG_.call(null,item_40170,new_depth_budget_40165));


var G__40171 = seq__40134_40166;
var G__40172 = chunk__40136_40167;
var G__40173 = count__40137_40168;
var G__40174 = (i__40138_40169 + (1));
seq__40134_40166 = G__40171;
chunk__40136_40167 = G__40172;
count__40137_40168 = G__40173;
i__40138_40169 = G__40174;
continue;
} else {
var temp__5753__auto___40175 = cljs.core.seq(seq__40134_40166);
if(temp__5753__auto___40175){
var seq__40134_40176__$1 = temp__5753__auto___40175;
if(cljs.core.chunked_seq_QMARK_(seq__40134_40176__$1)){
var c__4638__auto___40177 = cljs.core.chunk_first(seq__40134_40176__$1);
var G__40178 = cljs.core.chunk_rest(seq__40134_40176__$1);
var G__40179 = c__4638__auto___40177;
var G__40180 = cljs.core.count(c__4638__auto___40177);
var G__40181 = (0);
seq__40134_40166 = G__40178;
chunk__40136_40167 = G__40179;
count__40137_40168 = G__40180;
i__40138_40169 = G__40181;
continue;
} else {
var item_40182 = cljs.core.first(seq__40134_40176__$1);
(devtools.formatters.budgeting.distribute_budget_BANG_.cljs$core$IFn$_invoke$arity$2 ? devtools.formatters.budgeting.distribute_budget_BANG_.cljs$core$IFn$_invoke$arity$2(item_40182,new_depth_budget_40165) : devtools.formatters.budgeting.distribute_budget_BANG_.call(null,item_40182,new_depth_budget_40165));


var G__40183 = cljs.core.next(seq__40134_40176__$1);
var G__40184 = null;
var G__40185 = (0);
var G__40186 = (0);
seq__40134_40166 = G__40183;
chunk__40136_40167 = G__40184;
count__40137_40168 = G__40185;
i__40138_40169 = G__40186;
continue;
}
} else {
}
}
break;
}
}
} else {
}

return json_ml;
});
devtools.formatters.budgeting.was_over_budget_QMARK__BANG_ = (function devtools$formatters$budgeting$was_over_budget_QMARK__BANG_(value){
if(cljs.core.truth_(devtools.formatters.budgeting.has_over_budget_value_QMARK_(value))){
devtools.formatters.budgeting.delete_over_budget_value_BANG_(value);

return true;
} else {
return null;
}
});
devtools.formatters.budgeting.alter_json_ml_to_fit_in_remaining_budget_BANG_ = (function devtools$formatters$budgeting$alter_json_ml_to_fit_in_remaining_budget_BANG_(value,json_ml){
var temp__5751__auto__ = devtools.formatters.helpers.pref(new cljs.core.Keyword(null,"initial-hierarchy-depth-budget","initial-hierarchy-depth-budget",-482715807));
if(cljs.core.truth_(temp__5751__auto__)){
var initial_hierarchy_depth_budget = temp__5751__auto__;
var remaining_depth_budget = (function (){var or__4212__auto__ = devtools.formatters.state.get_depth_budget();
if(cljs.core.truth_(or__4212__auto__)){
return or__4212__auto__;
} else {
return (initial_hierarchy_depth_budget - (1));
}
})();
var depth = devtools.formatters.budgeting.determine_depth(json_ml);
var final_QMARK_ = cljs.core.not(devtools.formatters.budgeting.has_any_object_reference_QMARK_(json_ml));
var needed_depth = ((final_QMARK_)?depth:(depth + devtools.formatters.budgeting.header_expander_depth_cost));
if((remaining_depth_budget >= needed_depth)){
return devtools.formatters.budgeting.distribute_budget_BANG_(json_ml,remaining_depth_budget);
} else {
var expander_ml = devtools.formatters.templating.render_markup(devtools.formatters.markup._LT_header_expander_GT_(value));
devtools.formatters.budgeting.add_over_budget_value_BANG_(value);

return expander_ml;
}
} else {
return json_ml;
}
});

//# sourceMappingURL=devtools.formatters.budgeting.js.map

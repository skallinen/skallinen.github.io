goog.provide('map_demo.subs');
re_frame.core.reg_sub.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword("map-demo.subs","loading?","map-demo.subs/loading?",-1486567426),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(function (db){
return new cljs.core.Keyword(null,"loading?","loading?",1905707049).cljs$core$IFn$_invoke$arity$1(db);
})], 0));
re_frame.core.reg_sub.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword("map-demo.subs","loaded?","map-demo.subs/loaded?",-131659955),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(function (db){
return new cljs.core.Keyword(null,"loaded?","loaded?",-1108015206).cljs$core$IFn$_invoke$arity$1(db);
})], 0));
re_frame.core.reg_sub.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword("map-demo.subs","markers","map-demo.subs/markers",729435678),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(function (db){
return new cljs.core.Keyword(null,"markers","markers",-246919693).cljs$core$IFn$_invoke$arity$1(db);
})], 0));
/**
 * Helper function to filter coll of maps according to value in key
 */
map_demo.subs.filter_kv = (function map_demo$subs$filter_kv(m,k,v){
return cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__36609_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$2(p1__36609_SHARP_,k),v);
}),m);
});
re_frame.core.reg_sub.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword("map-demo.subs","markers-filtered","map-demo.subs/markers-filtered",672728275),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(function (_){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("map-demo.subs","markers","map-demo.subs/markers",729435678)], null)),re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("map-demo.subs","ta-is-checked","map-demo.subs/ta-is-checked",727201122)], null)),re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("map-demo.subs","traffic-effects-is-checked","map-demo.subs/traffic-effects-is-checked",-1025962886)], null))], null);
}),(function (p__36612){
var vec__36613 = p__36612;
var markers = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36613,(0),null);
var only_ta_QMARK_ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36613,(1),null);
var only_traffic_effect_3_QMARK_ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36613,(2),null);
return (function (p1__36611_SHARP_){
if(cljs.core.truth_(only_ta_QMARK_)){
return map_demo.subs.filter_kv(p1__36611_SHARP_,new cljs.core.Keyword(null,"type","type",1174270348),"ta");
} else {
return p1__36611_SHARP_;
}
})((function (p1__36610_SHARP_){
if(cljs.core.truth_(only_traffic_effect_3_QMARK_)){
return map_demo.subs.filter_kv(p1__36610_SHARP_,new cljs.core.Keyword(null,"estimated-traffic-effect","estimated-traffic-effect",277892274),"3");
} else {
return p1__36610_SHARP_;
}
})(markers));
})], 0));
re_frame.core.reg_sub.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword("map-demo.subs","show-jobs","map-demo.subs/show-jobs",1174373082),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(function (db){
return new cljs.core.Keyword(null,"markers","markers",-246919693).cljs$core$IFn$_invoke$arity$1(db);
})], 0));
re_frame.core.reg_sub.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword("map-demo.subs","ta-is-checked","map-demo.subs/ta-is-checked",727201122),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(function (db,_){
return new cljs.core.Keyword(null,"ta-is-checked","ta-is-checked",-382847657).cljs$core$IFn$_invoke$arity$1(db);
})], 0));
re_frame.core.reg_sub.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword("map-demo.subs","traffic-effects-is-checked","map-demo.subs/traffic-effects-is-checked",-1025962886),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(function (db,_){
return new cljs.core.Keyword(null,"traffic-effects-is-checked","traffic-effects-is-checked",11471589).cljs$core$IFn$_invoke$arity$1(db);
})], 0));

//# sourceMappingURL=map_demo.subs.js.map

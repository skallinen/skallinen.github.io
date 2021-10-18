goog.provide('map_demo.events');
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("map-demo.events","initialize-db","map-demo.events/initialize-db",-1841037271),((day8.re_frame.tracing.is_trace_enabled_QMARK_())?(function (_,___$1){
var _PLUS_debux_dbg_opts_PLUS_ = null;
try{day8.re_frame.debux.common.util.send_form_BANG_(cljs.core.list(new cljs.core.Symbol(null,"fn-traced*","fn-traced*",-2067995546,null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"_","_",-1201019570,null),new cljs.core.Symbol(null,"_","_",-1201019570,null)], null),new cljs.core.Symbol("db","default-db","db/default-db",-1149096552,null)));

var result__37005__auto__ = map_demo.db.default_db;
day8.re_frame.debux.common.util.send_trace_BANG_(new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"num-seen","num-seen",-1576518431),1,new cljs.core.Keyword(null,"syntax-order","syntax-order",-990682045),(1),new cljs.core.Keyword(null,"result","result",1415092211),result__37005__auto__,new cljs.core.Keyword(null,"form","form",-1624062471),new cljs.core.Symbol("db","default-db","db/default-db",-1149096552,null),new cljs.core.Keyword(null,"indent-level","indent-level",-258835684),(0)], null));

return result__37005__auto__;
}catch (e37116){var e = e37116;
throw e;
}}):(function (_,___$1){
return map_demo.db.default_db;
})));
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("map-demo.events","fetch-jobs","map-demo.events/fetch-jobs",1691350892),(function (p__37117,_){
var map__37118 = p__37117;
var map__37118__$1 = cljs.core.__destructure_map(map__37118);
var db = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37118__$1,new cljs.core.Keyword(null,"db","db",993250759));
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"db","db",993250759),cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"loading?","loading?",1905707049),true),new cljs.core.Keyword(null,"http-xhrio","http-xhrio",1846166714),new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"get","get",1683182755),new cljs.core.Keyword(null,"uri","uri",-774711847),"./jobs.json",new cljs.core.Keyword(null,"timeout","timeout",-318625318),(8000),new cljs.core.Keyword(null,"response-format","response-format",1664465322),ajax.core.json_response_format(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keywords?","keywords?",764949733),true], null)),new cljs.core.Keyword(null,"on-success","on-success",1786904109),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("map-demo.events","fetch-jobs-success","map-demo.events/fetch-jobs-success",1743652076)], null),new cljs.core.Keyword(null,"on-failure","on-failure",842888245),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("map-demo.events","fetch-jobs-failed","map-demo.events/fetch-jobs-failed",-616081761)], null)], null)], null);
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("map-demo.events","fetch-jobs-failed","map-demo.events/fetch-jobs-failed",-616081761),(function (_,___$1){
return alert("Ooops. Something went wrong. Might be a network issue. Try to reload the page again.");
}));
map_demo.events.fetch_jobs_success_handler = (function map_demo$events$fetch_jobs_success_handler(db,p__37126){
var vec__37127 = p__37126;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37127,(0),null);
var map__37130 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37127,(1),null);
var map__37130__$1 = cljs.core.__destructure_map(map__37130);
var features = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37130__$1,new cljs.core.Keyword(null,"features","features",-1146962336));
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"loading?","loading?",1905707049),false),new cljs.core.Keyword(null,"loaded?","loaded?",-1108015206),true),new cljs.core.Keyword(null,"markers","markers",-246919693),cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__37125_SHARP_){
return cljs.core.zipmap(new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"lng","lng",1667213918),new cljs.core.Keyword(null,"lat","lat",-580793929),new cljs.core.Keyword(null,"estimated-traffic-effect","estimated-traffic-effect",277892274),new cljs.core.Keyword(null,"comment","comment",532206069),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"status","status",-1997798413),new cljs.core.Keyword(null,"type","type",1174270348)], null),p1__37125_SHARP_);
}),cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.flatten,cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.juxt.cljs$core$IFn$_invoke$arity$variadic((function (p1__37119_SHARP_){
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(p1__37119_SHARP_,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"geometry","geometry",-405034994),new cljs.core.Keyword(null,"coordinates","coordinates",-1225332668)], null));
}),(function (p1__37120_SHARP_){
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(p1__37120_SHARP_,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"properties","properties",685819552),new cljs.core.Keyword(null,"estimated-traffic-effect","estimated-traffic-effect",277892274)], null));
}),(function (p1__37121_SHARP_){
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(p1__37121_SHARP_,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"properties","properties",685819552),new cljs.core.Keyword(null,"comment","comment",532206069)], null));
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(function (p1__37122_SHARP_){
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(p1__37122_SHARP_,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"properties","properties",685819552),new cljs.core.Keyword(null,"name","name",1843675177)], null));
}),(function (p1__37123_SHARP_){
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(p1__37123_SHARP_,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"properties","properties",685819552),new cljs.core.Keyword(null,"status","status",-1997798413)], null));
}),(function (p1__37124_SHARP_){
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(p1__37124_SHARP_,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"properties","properties",685819552),new cljs.core.Keyword(null,"type","type",1174270348)], null));
})], 0)),features))));
});
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("map-demo.events","fetch-jobs-success","map-demo.events/fetch-jobs-success",1743652076),map_demo.events.fetch_jobs_success_handler);
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("map-demo.events","loading?","map-demo.events/loading?",-485455704),(function (db,p__37131){
var vec__37132 = p__37131;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37132,(0),null);
var val = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37132,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"loading?","loading?",1905707049),val);
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("map-demo.events","ta-change-checkbox","map-demo.events/ta-change-checkbox",726761032),(function (db,p__37135){
var vec__37136 = p__37135;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37136,(0),null);
var new_value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37136,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"ta-is-checked","ta-is-checked",-382847657),new_value);
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("map-demo.events","traffic-effects-change-checkbox","map-demo.events/traffic-effects-change-checkbox",2141664975),(function (db,p__37139){
var vec__37140 = p__37139;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37140,(0),null);
var new_value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37140,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"traffic-effects-is-checked","traffic-effects-is-checked",11471589),new_value);
}));

//# sourceMappingURL=map_demo.events.js.map

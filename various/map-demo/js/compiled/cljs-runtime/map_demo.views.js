goog.provide('map_demo.views');
/**
 * Inner counterpart of the main component for the keeping the stateful map
 */
map_demo.views.gmap_inner = (function map_demo$views$gmap_inner(){
var update = (function (comp){
var map__38942 = reagent.core.props(comp);
var map__38942__$1 = cljs.core.__destructure_map(map__38942);
var markers = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38942__$1,new cljs.core.Keyword(null,"markers","markers",-246919693));
map_demo.map_effects.delete_markers_BANG_();

return cljs.core.doall.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (marker){
var map__38943 = marker;
var map__38943__$1 = cljs.core.__destructure_map(map__38943);
var lat = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38943__$1,new cljs.core.Keyword(null,"lat","lat",-580793929));
var lng = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38943__$1,new cljs.core.Keyword(null,"lng","lng",1667213918));
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38943__$1,new cljs.core.Keyword(null,"name","name",1843675177));
return map_demo.map_effects.create_marker_BANG_(lat,lng,name);
}),markers));
});
return reagent.core.create_class.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"reagent-render","reagent-render",-985383853),(function (comp){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#map-canvas","div#map-canvas",1711905736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"height","height",1025178622),"80vh"], null)], null)], null)], null);
}),new cljs.core.Keyword(null,"component-did-mount","component-did-mount",-1126910518),(function (){
return map_demo.map_effects.create_map_BANG_(new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"lat","lat",-580793929),map_demo.config.lat,new cljs.core.Keyword(null,"lng","lng",1667213918),map_demo.config.lng,new cljs.core.Keyword(null,"api-key","api-key",1037904031),map_demo.config.apiKey,new cljs.core.Keyword(null,"el","el",-1618201118),"map-canvas"], null));
}),new cljs.core.Keyword(null,"component-did-update","component-did-update",-1468549173),update,new cljs.core.Keyword(null,"display-name","display-name",694513143),"gmap-inner"], null));
});
/**
 * Wrapper component for the (stateful) map
 */
map_demo.views.gmap_outer = (function map_demo$views$gmap_outer(){
var markers = re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("map-demo.subs","markers-filtered","map-demo.subs/markers-filtered",672728275)], null));
return (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [map_demo.views.gmap_inner,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"markers","markers",-246919693),cljs.core.deref(markers)], null)], null);
});
});
/**
 * Listing the selected jobs.
 */
map_demo.views.jobs_listing = (function map_demo$views$jobs_listing(){
var job_list = cljs.core.deref(re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("map-demo.subs","markers-filtered","map-demo.subs/markers-filtered",672728275)], null)));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.job-list","div.job-list",1570490007),(cljs.core.truth_(job_list)?cljs.core.doall.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__38944){
var map__38945 = p__38944;
var map__38945__$1 = cljs.core.__destructure_map(map__38945);
var lat = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38945__$1,new cljs.core.Keyword(null,"lat","lat",-580793929));
var lng = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38945__$1,new cljs.core.Keyword(null,"lng","lng",1667213918));
var estimated_traffic_effect = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38945__$1,new cljs.core.Keyword(null,"estimated-traffic-effect","estimated-traffic-effect",277892274));
var comment = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38945__$1,new cljs.core.Keyword(null,"comment","comment",532206069));
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38945__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var status = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38945__$1,new cljs.core.Keyword(null,"status","status",-1997798413));
var type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38945__$1,new cljs.core.Keyword(null,"type","type",1174270348));
return cljs.core.with_meta(new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.job","button.job",1329386123),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return map_demo.map_effects.center(lat,lng,map_demo.config.zoomed_in);
})], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),name], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),["Traffic effect: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(estimated_traffic_effect)].join('')], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),"Type: ",type], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),status], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),comment], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),name], null));
}),job_list)):null)], null);
});
/**
 * Component for filtering job list where :type is 'ta'
 */
map_demo.views.ta_checkbox_input = (function map_demo$views$ta_checkbox_input(){
var is_checked = re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("map-demo.subs","ta-is-checked","map-demo.subs/ta-is-checked",727201122)], null));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button","button",1456579943),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("map-demo.events","ta-change-checkbox","map-demo.events/ta-change-checkbox",726761032),cljs.core.not(cljs.core.deref(is_checked))], null));
}),new cljs.core.Keyword(null,"style","style",-496642736),(cljs.core.truth_(cljs.core.deref(is_checked))?new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"background-color","background-color",570434026),"#CCC"], null):null)], null),[(cljs.core.truth_(cljs.core.deref(is_checked))?" \u2611 ":" \u2610 "),"Show only TAs"].join('')], null);
});
/**
 * Component for filtering job list where :estimated-trafffic-effect is '3'
 */
map_demo.views.traffic_effects_checkbox_input = (function map_demo$views$traffic_effects_checkbox_input(){
var is_checked = re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("map-demo.subs","traffic-effects-is-checked","map-demo.subs/traffic-effects-is-checked",-1025962886)], null));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button","button",1456579943),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("map-demo.events","traffic-effects-change-checkbox","map-demo.events/traffic-effects-change-checkbox",2141664975),cljs.core.not(cljs.core.deref(is_checked))], null));
}),new cljs.core.Keyword(null,"style","style",-496642736),(cljs.core.truth_(cljs.core.deref(is_checked))?new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"background-color","background-color",570434026),"#CCC"], null):null)], null),[(cljs.core.truth_(cljs.core.deref(is_checked))?" \u2611 ":" \u2610 "),"Show only Traffic Effects 3"].join('')], null);
});
map_demo.views.main_panel = (function map_demo$views$main_panel(){
var jobs_loaded_QMARK_ = cljs.core.deref(re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("map-demo.subs","loaded?","map-demo.subs/loaded?",-131659955)], null)));
var loading_QMARK_ = re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("map-demo.subs","loading?","map-demo.subs/loading?",-1486567426)], null));
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),(cljs.core.truth_(cljs.core.deref(loading_QMARK_))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h1","h1",-1896887462),"Loading Demo Map Job Browser..."], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h1","h1",-1896887462),"Demo Map Job Browser"], null)),(cljs.core.truth_(jobs_loaded_QMARK_)?null:new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button","button",1456579943),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("map-demo.events","fetch-jobs","map-demo.events/fetch-jobs",1691350892)], null));
})], null),"Show jobs"], null)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button","button",1456579943),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return map_demo.map_effects.center(map_demo.config.lat,map_demo.config.lng,map_demo.config.zoom);
})], null),"Recenter Map"], null),(cljs.core.truth_(jobs_loaded_QMARK_)?new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [map_demo.views.ta_checkbox_input], null):null),(cljs.core.truth_(jobs_loaded_QMARK_)?new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [map_demo.views.traffic_effects_checkbox_input], null):null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.main-panel","div.main-panel",-705688759),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [map_demo.views.gmap_outer], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [map_demo.views.jobs_listing], null)], null)], null)], null);
});

//# sourceMappingURL=map_demo.views.js.map

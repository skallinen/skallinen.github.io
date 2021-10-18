goog.provide('map_demo.views');
var module$node_modules$google_maps$lib$cjs$index=shadow.js.require("module$node_modules$google_maps$lib$cjs$index", {});
map_demo.views.apiKey = "AIzaSyAtiNz4AG_kKIAc3jA-kBssJCrdjv0olsg";
map_demo.views.global_map = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
map_demo.views.with_map = (function map_demo$views$with_map(key){
return (new module$node_modules$google_maps$lib$cjs$index.Loader(cljs.core.clj__GT_js(key))).load();
});
map_demo.views.latlng = (function map_demo$views$latlng(lat,lng){
return new cljs.core.PersistentArrayMap(null, 2, ["lat",lat,"lng",lng], null);
});
map_demo.views.create_map_BANG_ = (function map_demo$views$create_map_BANG_(p__39958){
var map__39959 = p__39958;
var map__39959__$1 = cljs.core.__destructure_map(map__39959);
var lat = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39959__$1,new cljs.core.Keyword(null,"lat","lat",-580793929));
var lng = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39959__$1,new cljs.core.Keyword(null,"lng","lng",1667213918));
var api_key = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39959__$1,new cljs.core.Keyword(null,"api-key","api-key",1037904031));
var el = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39959__$1,new cljs.core.Keyword(null,"el","el",-1618201118));
return map_demo.views.with_map(api_key).then((function (wrapper){
var themap = (new wrapper.maps.Map(document.getElementById(el),cljs.core.clj__GT_js(new cljs.core.PersistentArrayMap(null, 2, ["center",map_demo.views.latlng(lat,lng),"zoom",(9)], null))));
return cljs.core.reset_BANG_(map_demo.views.global_map,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"map","map",1371690461),themap,new cljs.core.Keyword(null,"wrapper","wrapper",-969103524),wrapper,new cljs.core.Keyword(null,"markers","markers",-246919693),cljs.core.PersistentVector.EMPTY], null));
}));
});
map_demo.views.create_marker_BANG_ = (function map_demo$views$create_marker_BANG_(lat,lng){
var map__39960 = cljs.core.deref(map_demo.views.global_map);
var map__39960__$1 = cljs.core.__destructure_map(map__39960);
var themap = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39960__$1,new cljs.core.Keyword(null,"map","map",1371690461));
var wrapper = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39960__$1,new cljs.core.Keyword(null,"wrapper","wrapper",-969103524));
var marker = (new wrapper.maps.Marker(cljs.core.clj__GT_js(new cljs.core.PersistentArrayMap(null, 3, ["position",map_demo.views.latlng(lat,lng),"map",themap,"title","whaaa?"], null))));
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(map_demo.views.global_map,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"markers","markers",-246919693)], null),cljs.core.conj,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([marker], 0));
});
map_demo.views.delete_markers_BANG_ = (function map_demo$views$delete_markers_BANG_(){
var markers = new cljs.core.Keyword(null,"markers","markers",-246919693).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(map_demo.views.global_map));
if(cljs.core.empty_QMARK_(markers)){
} else {
cljs.core.doall.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (mrk){
return (mrk.setMap.cljs$core$IFn$_invoke$arity$1 ? mrk.setMap.cljs$core$IFn$_invoke$arity$1(null) : mrk.setMap.call(null,null));
}),markers));
}

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(map_demo.views.global_map,cljs.core.assoc,new cljs.core.Keyword(null,"markers","markers",-246919693),cljs.core.PersistentVector.EMPTY);
});
map_demo.views.display_feature = (function map_demo$views$display_feature(p__39961){
var map__39962 = p__39961;
var map__39962__$1 = cljs.core.__destructure_map(map__39962);
var map__39963 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39962__$1,new cljs.core.Keyword(null,"geometry","geometry",-405034994));
var map__39963__$1 = cljs.core.__destructure_map(map__39963);
var coordinates = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39963__$1,new cljs.core.Keyword(null,"coordinates","coordinates",-1225332668));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),cljs.core.first(coordinates)], null);
});
map_demo.views.gmap_inner = (function map_demo$views$gmap_inner(){
var update = (function (comp){
var map__39964 = reagent.core.props(comp);
var map__39964__$1 = cljs.core.__destructure_map(map__39964);
var markers = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39964__$1,new cljs.core.Keyword(null,"markers","markers",-246919693));
var lat = new cljs.core.Keyword(null,"lat","lat",-580793929).cljs$core$IFn$_invoke$arity$1(cljs.core.first(markers));
var lng = new cljs.core.Keyword(null,"lng","lng",1667213918).cljs$core$IFn$_invoke$arity$1(cljs.core.first(markers));
map_demo.views.delete_markers_BANG_();

return cljs.core.doall.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (marker){
var map__39965 = marker;
var map__39965__$1 = cljs.core.__destructure_map(map__39965);
var lat__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39965__$1,new cljs.core.Keyword(null,"lat","lat",-580793929));
var lng__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39965__$1,new cljs.core.Keyword(null,"lng","lng",1667213918));
map_demo.views.create_marker_BANG_(lat__$1,lng__$1);

return cljs.core.prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["marker",lat__$1,lng__$1], 0));
}),markers));
});
return reagent.core.create_class.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"reagent-render","reagent-render",-985383853),(function (comp){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h4","h4",2004862993),"Map"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#map-canvas","div#map-canvas",1711905736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"height","height",1025178622),"80vh"], null)], null)], null)], null);
}),new cljs.core.Keyword(null,"component-did-mount","component-did-mount",-1126910518),(function (){
return map_demo.views.create_map_BANG_(new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"lat","lat",-580793929),55.42,new cljs.core.Keyword(null,"lng","lng",1667213918),13.11,new cljs.core.Keyword(null,"api-key","api-key",1037904031),map_demo.views.apiKey,new cljs.core.Keyword(null,"el","el",-1618201118),"map-canvas"], null));
}),new cljs.core.Keyword(null,"component-did-update","component-did-update",-1468549173),update,new cljs.core.Keyword(null,"display-name","display-name",694513143),"gmap-inner"], null));
});
map_demo.views.gmap_outer = (function map_demo$views$gmap_outer(){
var markers = re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("map-demo.subs","markers","map-demo.subs/markers",729435678)], null));
return (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [map_demo.views.gmap_inner,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"markers","markers",-246919693),cljs.core.deref(markers)], null)], null);
});
});
map_demo.views.styles = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"root-container","root-container",-407011396),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"height","height",1025178622),"100%"], null),new cljs.core.Keyword(null,"map","map",1371690461),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"border","border",1444987323),(0),new cljs.core.Keyword(null,"align-self","align-self",1475936794),"flex-end",new cljs.core.Keyword(null,"height","height",1025178622),"100vh",new cljs.core.Keyword(null,"width","width",-384071477),"100%",new cljs.core.Keyword(null,"zIndex","zIndex",-1588341609),(0)], null)], null);
map_demo.views.main_panel = (function map_demo$views$main_panel(){
var loading = re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("map-demo.subs","loading","map-demo.subs/loading",-1916829336)], null));
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h1","h1",-1896887462),"Hello from yay"], null),(cljs.core.truth_(cljs.core.deref(loading))?"loading...":null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button","button",1456579943),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("map-demo.events","fetch-tickets","map-demo.events/fetch-tickets",564812742)], null));
})], null),"Load data"], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [map_demo.views.gmap_outer], null)], null);
});

//# sourceMappingURL=map_demo.views.js.map

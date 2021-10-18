goog.provide('map_demo.map_effects');
var module$node_modules$google_maps$lib$cjs$index=shadow.js.require("module$node_modules$google_maps$lib$cjs$index", {});
map_demo.map_effects.global_gmap = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
/**
 * Wrap context to map object
 */
map_demo.map_effects.with_map = (function map_demo$map_effects$with_map(key){
return (new module$node_modules$google_maps$lib$cjs$index.Loader(cljs.core.clj__GT_js(key))).load();
});
/**
 * Helper to format lat lng into a map
 */
map_demo.map_effects.latlng = (function map_demo$map_effects$latlng(lat,lng){
return new cljs.core.PersistentArrayMap(null, 2, ["lat",lat,"lng",lng], null);
});
/**
 * Create the stateful map object
 */
map_demo.map_effects.create_map_BANG_ = (function map_demo$map_effects$create_map_BANG_(p__34599){
var map__34600 = p__34599;
var map__34600__$1 = cljs.core.__destructure_map(map__34600);
var lat = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34600__$1,new cljs.core.Keyword(null,"lat","lat",-580793929));
var lng = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34600__$1,new cljs.core.Keyword(null,"lng","lng",1667213918));
var api_key = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34600__$1,new cljs.core.Keyword(null,"api-key","api-key",1037904031));
var el = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34600__$1,new cljs.core.Keyword(null,"el","el",-1618201118));
return map_demo.map_effects.with_map(api_key).then((function (wrapper){
var gmaps = wrapper.maps.Map;
var m = (new gmaps(document.getElementById(el),cljs.core.clj__GT_js(new cljs.core.PersistentArrayMap(null, 3, ["center",map_demo.map_effects.latlng(lat,lng),"zoom",map_demo.config.zoom,"styles",map_demo.config.map_styles], null))));
return cljs.core.reset_BANG_(map_demo.map_effects.global_gmap,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"map","map",1371690461),m,new cljs.core.Keyword(null,"wrapper","wrapper",-969103524),wrapper,new cljs.core.Keyword(null,"markers","markers",-246919693),cljs.core.PersistentVector.EMPTY], null));
}));
});
/**
 * Create a marker (stateful)
 */
map_demo.map_effects.create_marker_BANG_ = (function map_demo$map_effects$create_marker_BANG_(lat,lng,name){
var map__34601 = cljs.core.deref(map_demo.map_effects.global_gmap);
var map__34601__$1 = cljs.core.__destructure_map(map__34601);
var gmap = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34601__$1,new cljs.core.Keyword(null,"map","map",1371690461));
var wrapper = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34601__$1,new cljs.core.Keyword(null,"wrapper","wrapper",-969103524));
var Marker = wrapper.maps.Marker;
var marker = (new Marker(cljs.core.clj__GT_js(new cljs.core.PersistentArrayMap(null, 4, ["position",map_demo.map_effects.latlng(lat,lng),"map",gmap,"title",name,"icon","./marker.png"], null))));
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(map_demo.map_effects.global_gmap,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"markers","markers",-246919693)], null),cljs.core.conj,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([marker], 0));
});
/**
 * Delete all markers in map object
 */
map_demo.map_effects.delete_markers_BANG_ = (function map_demo$map_effects$delete_markers_BANG_(){
var markers = new cljs.core.Keyword(null,"markers","markers",-246919693).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(map_demo.map_effects.global_gmap));
if(cljs.core.empty_QMARK_(markers)){
return null;
} else {
return cljs.core.doall.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (mrks){
return mrks.setMap(null);
}),markers));
}
});
/**
 * Center map at lat lng with selected zoom level
 */
map_demo.map_effects.center = (function map_demo$map_effects$center(lat,lng,level){
var m = new cljs.core.Keyword(null,"map","map",1371690461).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(map_demo.map_effects.global_gmap));
m.setZoom(level);

return m.panTo(cljs.core.clj__GT_js(map_demo.map_effects.latlng(lat,lng)));
});

//# sourceMappingURL=map_demo.map_effects.js.map

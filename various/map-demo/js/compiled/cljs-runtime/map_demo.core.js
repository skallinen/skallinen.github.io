goog.provide('map_demo.core');
map_demo.core.dev_setup = (function map_demo$core$dev_setup(){
if(map_demo.config.debug_QMARK_){
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["dev mode"], 0));
} else {
return null;
}
});
map_demo.core.mount_root = (function map_demo$core$mount_root(){
re_frame.core.clear_subscription_cache_BANG_();

var root_el = document.getElementById("app");
reagent.dom.unmount_component_at_node(root_el);

return reagent.dom.render.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [map_demo.views.main_panel], null),root_el);
});
map_demo.core.init = (function map_demo$core$init(){
re_frame.core.dispatch_sync(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("map-demo.events","initialize-db","map-demo.events/initialize-db",-1841037271)], null));

map_demo.core.dev_setup();

return map_demo.core.mount_root();
});

//# sourceMappingURL=map_demo.core.js.map

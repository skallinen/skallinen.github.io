// Compiled by ClojureScript 1.10.597 {}
goog.provide('figwheel.client.file_reloading');
goog.require('cljs.core');
goog.require('figwheel.client.utils');
goog.require('goog.Uri');
goog.require('goog.string');
goog.require('goog.object');
goog.require('goog.net.jsloader');
goog.require('goog.html.legacyconversions');
goog.require('clojure.string');
goog.require('clojure.set');
goog.require('cljs.core.async');
goog.require('goog.async.Deferred');
if((typeof figwheel !== 'undefined') && (typeof figwheel.client !== 'undefined') && (typeof figwheel.client.file_reloading !== 'undefined') && (typeof figwheel.client.file_reloading.figwheel_meta_pragmas !== 'undefined')){
} else {
figwheel.client.file_reloading.figwheel_meta_pragmas = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
}
figwheel.client.file_reloading.on_jsload_custom_event = (function figwheel$client$file_reloading$on_jsload_custom_event(url){
return figwheel.client.utils.dispatch_custom_event.call(null,"figwheel.js-reload",url);
});
figwheel.client.file_reloading.before_jsload_custom_event = (function figwheel$client$file_reloading$before_jsload_custom_event(files){
return figwheel.client.utils.dispatch_custom_event.call(null,"figwheel.before-js-reload",files);
});
figwheel.client.file_reloading.on_cssload_custom_event = (function figwheel$client$file_reloading$on_cssload_custom_event(files){
return figwheel.client.utils.dispatch_custom_event.call(null,"figwheel.css-reload",files);
});
figwheel.client.file_reloading.namespace_file_map_QMARK_ = (function figwheel$client$file_reloading$namespace_file_map_QMARK_(m){
var or__4185__auto__ = ((cljs.core.map_QMARK_.call(null,m)) && (typeof new cljs.core.Keyword(null,"namespace","namespace",-377510372).cljs$core$IFn$_invoke$arity$1(m) === 'string') && ((((new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(m) == null)) || (typeof new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(m) === 'string'))) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(m),new cljs.core.Keyword(null,"namespace","namespace",-377510372))));
if(or__4185__auto__){
return or__4185__auto__;
} else {
cljs.core.println.call(null,"Error not namespace-file-map",cljs.core.pr_str.call(null,m));

return false;
}
});
figwheel.client.file_reloading.add_cache_buster = (function figwheel$client$file_reloading$add_cache_buster(url){

return goog.Uri.parse(url).makeUnique();
});
figwheel.client.file_reloading.name__GT_path = (function figwheel$client$file_reloading$name__GT_path(ns){

return goog.object.get(goog.dependencies_.nameToPath,ns);
});
figwheel.client.file_reloading.provided_QMARK_ = (function figwheel$client$file_reloading$provided_QMARK_(ns){
return goog.object.get(goog.dependencies_.written,figwheel.client.file_reloading.name__GT_path.call(null,ns));
});
figwheel.client.file_reloading.immutable_ns_QMARK_ = (function figwheel$client$file_reloading$immutable_ns_QMARK_(name){
var or__4185__auto__ = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, ["cljs.nodejs",null,"goog",null,"cljs.core",null], null), null).call(null,name);
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
return ((goog.string.startsWith("clojure.",name)) || (goog.string.startsWith("goog.",name)));
}
});
figwheel.client.file_reloading.get_requires = (function figwheel$client$file_reloading$get_requires(ns){
return cljs.core.set.call(null,cljs.core.filter.call(null,(function (p1__29918_SHARP_){
return cljs.core.not.call(null,figwheel.client.file_reloading.immutable_ns_QMARK_.call(null,p1__29918_SHARP_));
}),goog.object.getKeys(goog.object.get(goog.dependencies_.requires,figwheel.client.file_reloading.name__GT_path.call(null,ns)))));
});
if((typeof figwheel !== 'undefined') && (typeof figwheel.client !== 'undefined') && (typeof figwheel.client.file_reloading !== 'undefined') && (typeof figwheel.client.file_reloading.dependency_data !== 'undefined')){
} else {
figwheel.client.file_reloading.dependency_data = cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"pathToName","pathToName",-1236616181),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"dependents","dependents",136812837),cljs.core.PersistentArrayMap.EMPTY], null));
}
figwheel.client.file_reloading.path_to_name_BANG_ = (function figwheel$client$file_reloading$path_to_name_BANG_(path,name){
return cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.dependency_data,cljs.core.update_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pathToName","pathToName",-1236616181),path], null),cljs.core.fnil.call(null,clojure.set.union,cljs.core.PersistentHashSet.EMPTY),cljs.core.PersistentHashSet.createAsIfByAssoc([name]));
});
/**
 * Setup a path to name dependencies map.
 * That goes from path -> #{ ns-names }
 */
figwheel.client.file_reloading.setup_path__GT_name_BANG_ = (function figwheel$client$file_reloading$setup_path__GT_name_BANG_(){
var nameToPath = goog.object.filter(goog.dependencies_.nameToPath,(function (v,k,o){
return goog.string.startsWith(v,"../");
}));
return goog.object.forEach(nameToPath,(function (v,k,o){
return figwheel.client.file_reloading.path_to_name_BANG_.call(null,v,k);
}));
});
/**
 * returns a set of namespaces defined by a path
 */
figwheel.client.file_reloading.path__GT_name = (function figwheel$client$file_reloading$path__GT_name(path){
return cljs.core.get_in.call(null,cljs.core.deref.call(null,figwheel.client.file_reloading.dependency_data),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pathToName","pathToName",-1236616181),path], null));
});
figwheel.client.file_reloading.name_to_parent_BANG_ = (function figwheel$client$file_reloading$name_to_parent_BANG_(ns,parent_ns){
return cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.dependency_data,cljs.core.update_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"dependents","dependents",136812837),ns], null),cljs.core.fnil.call(null,clojure.set.union,cljs.core.PersistentHashSet.EMPTY),cljs.core.PersistentHashSet.createAsIfByAssoc([parent_ns]));
});
/**
 * This reverses the goog.dependencies_.requires for looking up ns-dependents.
 */
figwheel.client.file_reloading.setup_ns__GT_dependents_BANG_ = (function figwheel$client$file_reloading$setup_ns__GT_dependents_BANG_(){
var requires = goog.object.filter(goog.dependencies_.requires,(function (v,k,o){
return goog.string.startsWith(k,"../");
}));
return goog.object.forEach(requires,(function (v,k,_){
return goog.object.forEach(v,(function (v_SINGLEQUOTE_,k_SINGLEQUOTE_,___$1){
var seq__29919 = cljs.core.seq.call(null,figwheel.client.file_reloading.path__GT_name.call(null,k));
var chunk__29920 = null;
var count__29921 = (0);
var i__29922 = (0);
while(true){
if((i__29922 < count__29921)){
var n = cljs.core._nth.call(null,chunk__29920,i__29922);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,k_SINGLEQUOTE_,n);


var G__29923 = seq__29919;
var G__29924 = chunk__29920;
var G__29925 = count__29921;
var G__29926 = (i__29922 + (1));
seq__29919 = G__29923;
chunk__29920 = G__29924;
count__29921 = G__29925;
i__29922 = G__29926;
continue;
} else {
var temp__5735__auto__ = cljs.core.seq.call(null,seq__29919);
if(temp__5735__auto__){
var seq__29919__$1 = temp__5735__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__29919__$1)){
var c__4609__auto__ = cljs.core.chunk_first.call(null,seq__29919__$1);
var G__29927 = cljs.core.chunk_rest.call(null,seq__29919__$1);
var G__29928 = c__4609__auto__;
var G__29929 = cljs.core.count.call(null,c__4609__auto__);
var G__29930 = (0);
seq__29919 = G__29927;
chunk__29920 = G__29928;
count__29921 = G__29929;
i__29922 = G__29930;
continue;
} else {
var n = cljs.core.first.call(null,seq__29919__$1);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,k_SINGLEQUOTE_,n);


var G__29931 = cljs.core.next.call(null,seq__29919__$1);
var G__29932 = null;
var G__29933 = (0);
var G__29934 = (0);
seq__29919 = G__29931;
chunk__29920 = G__29932;
count__29921 = G__29933;
i__29922 = G__29934;
continue;
}
} else {
return null;
}
}
break;
}
}));
}));
});
figwheel.client.file_reloading.ns__GT_dependents = (function figwheel$client$file_reloading$ns__GT_dependents(ns){
return cljs.core.get_in.call(null,cljs.core.deref.call(null,figwheel.client.file_reloading.dependency_data),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"dependents","dependents",136812837),ns], null));
});
figwheel.client.file_reloading.in_upper_level_QMARK_ = (function figwheel$client$file_reloading$in_upper_level_QMARK_(topo_state,current_depth,dep){
return cljs.core.some.call(null,(function (p__29935){
var vec__29936 = p__29935;
var _ = cljs.core.nth.call(null,vec__29936,(0),null);
var v = cljs.core.nth.call(null,vec__29936,(1),null);
var and__4174__auto__ = v;
if(cljs.core.truth_(and__4174__auto__)){
return v.call(null,dep);
} else {
return and__4174__auto__;
}
}),cljs.core.filter.call(null,(function (p__29939){
var vec__29940 = p__29939;
var k = cljs.core.nth.call(null,vec__29940,(0),null);
var v = cljs.core.nth.call(null,vec__29940,(1),null);
return (k > current_depth);
}),topo_state));
});
figwheel.client.file_reloading.build_topo_sort = (function figwheel$client$file_reloading$build_topo_sort(get_deps){
var get_deps__$1 = cljs.core.memoize.call(null,get_deps);
var topo_sort_helper_STAR_ = (function figwheel$client$file_reloading$build_topo_sort_$_topo_sort_helper_STAR_(x,depth,state){
var deps = get_deps__$1.call(null,x);
if(cljs.core.empty_QMARK_.call(null,deps)){
return null;
} else {
return topo_sort_STAR_.call(null,deps,depth,state);
}
});
var topo_sort_STAR_ = (function() {
var figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR_ = null;
var figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR___1 = (function (deps){
return figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR_.call(null,deps,(0),cljs.core.atom.call(null,cljs.core.sorted_map.call(null)));
});
var figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR___3 = (function (deps,depth,state){
cljs.core.swap_BANG_.call(null,state,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [depth], null),cljs.core.fnil.call(null,cljs.core.into,cljs.core.PersistentHashSet.EMPTY),deps);

var seq__29952_29960 = cljs.core.seq.call(null,deps);
var chunk__29953_29961 = null;
var count__29954_29962 = (0);
var i__29955_29963 = (0);
while(true){
if((i__29955_29963 < count__29954_29962)){
var dep_29964 = cljs.core._nth.call(null,chunk__29953_29961,i__29955_29963);
if(cljs.core.truth_((function (){var and__4174__auto__ = dep_29964;
if(cljs.core.truth_(and__4174__auto__)){
return cljs.core.not.call(null,figwheel.client.file_reloading.in_upper_level_QMARK_.call(null,cljs.core.deref.call(null,state),depth,dep_29964));
} else {
return and__4174__auto__;
}
})())){
topo_sort_helper_STAR_.call(null,dep_29964,(depth + (1)),state);
} else {
}


var G__29965 = seq__29952_29960;
var G__29966 = chunk__29953_29961;
var G__29967 = count__29954_29962;
var G__29968 = (i__29955_29963 + (1));
seq__29952_29960 = G__29965;
chunk__29953_29961 = G__29966;
count__29954_29962 = G__29967;
i__29955_29963 = G__29968;
continue;
} else {
var temp__5735__auto___29969 = cljs.core.seq.call(null,seq__29952_29960);
if(temp__5735__auto___29969){
var seq__29952_29970__$1 = temp__5735__auto___29969;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__29952_29970__$1)){
var c__4609__auto___29971 = cljs.core.chunk_first.call(null,seq__29952_29970__$1);
var G__29972 = cljs.core.chunk_rest.call(null,seq__29952_29970__$1);
var G__29973 = c__4609__auto___29971;
var G__29974 = cljs.core.count.call(null,c__4609__auto___29971);
var G__29975 = (0);
seq__29952_29960 = G__29972;
chunk__29953_29961 = G__29973;
count__29954_29962 = G__29974;
i__29955_29963 = G__29975;
continue;
} else {
var dep_29976 = cljs.core.first.call(null,seq__29952_29970__$1);
if(cljs.core.truth_((function (){var and__4174__auto__ = dep_29976;
if(cljs.core.truth_(and__4174__auto__)){
return cljs.core.not.call(null,figwheel.client.file_reloading.in_upper_level_QMARK_.call(null,cljs.core.deref.call(null,state),depth,dep_29976));
} else {
return and__4174__auto__;
}
})())){
topo_sort_helper_STAR_.call(null,dep_29976,(depth + (1)),state);
} else {
}


var G__29977 = cljs.core.next.call(null,seq__29952_29970__$1);
var G__29978 = null;
var G__29979 = (0);
var G__29980 = (0);
seq__29952_29960 = G__29977;
chunk__29953_29961 = G__29978;
count__29954_29962 = G__29979;
i__29955_29963 = G__29980;
continue;
}
} else {
}
}
break;
}

if(cljs.core._EQ_.call(null,depth,(0))){
return elim_dups_STAR_.call(null,cljs.core.reverse.call(null,cljs.core.vals.call(null,cljs.core.deref.call(null,state))));
} else {
return null;
}
});
figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR_ = function(deps,depth,state){
switch(arguments.length){
case 1:
return figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR___1.call(this,deps);
case 3:
return figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR___3.call(this,deps,depth,state);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR_.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR___1;
figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR_.cljs$core$IFn$_invoke$arity$3 = figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR___3;
return figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR_;
})()
;
var elim_dups_STAR_ = (function figwheel$client$file_reloading$build_topo_sort_$_elim_dups_STAR_(p__29956){
var vec__29957 = p__29956;
var seq__29958 = cljs.core.seq.call(null,vec__29957);
var first__29959 = cljs.core.first.call(null,seq__29958);
var seq__29958__$1 = cljs.core.next.call(null,seq__29958);
var x = first__29959;
var xs = seq__29958__$1;
if((x == null)){
return cljs.core.List.EMPTY;
} else {
return cljs.core.cons.call(null,x,figwheel$client$file_reloading$build_topo_sort_$_elim_dups_STAR_.call(null,cljs.core.map.call(null,(function (p1__29943_SHARP_){
return clojure.set.difference.call(null,p1__29943_SHARP_,x);
}),xs)));
}
});
return topo_sort_STAR_;
});
figwheel.client.file_reloading.get_all_dependencies = (function figwheel$client$file_reloading$get_all_dependencies(ns){
var topo_sort_SINGLEQUOTE_ = figwheel.client.file_reloading.build_topo_sort.call(null,figwheel.client.file_reloading.get_requires);
return cljs.core.apply.call(null,cljs.core.concat,topo_sort_SINGLEQUOTE_.call(null,cljs.core.set.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [ns], null))));
});
figwheel.client.file_reloading.get_all_dependents = (function figwheel$client$file_reloading$get_all_dependents(nss){
var topo_sort_SINGLEQUOTE_ = figwheel.client.file_reloading.build_topo_sort.call(null,figwheel.client.file_reloading.ns__GT_dependents);
return cljs.core.filter.call(null,cljs.core.comp.call(null,cljs.core.not,figwheel.client.file_reloading.immutable_ns_QMARK_),cljs.core.reverse.call(null,cljs.core.apply.call(null,cljs.core.concat,topo_sort_SINGLEQUOTE_.call(null,cljs.core.set.call(null,nss)))));
});
figwheel.client.file_reloading.unprovide_BANG_ = (function figwheel$client$file_reloading$unprovide_BANG_(ns){
var path = figwheel.client.file_reloading.name__GT_path.call(null,ns);
goog.object.remove(goog.dependencies_.visited,path);

goog.object.remove(goog.dependencies_.written,path);

return goog.object.remove(goog.dependencies_.written,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(goog.basePath),cljs.core.str.cljs$core$IFn$_invoke$arity$1(path)].join(''));
});
figwheel.client.file_reloading.resolve_ns = (function figwheel$client$file_reloading$resolve_ns(ns){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(goog.basePath),cljs.core.str.cljs$core$IFn$_invoke$arity$1(figwheel.client.file_reloading.name__GT_path.call(null,ns))].join('');
});
figwheel.client.file_reloading.addDependency = (function figwheel$client$file_reloading$addDependency(path,provides,requires){
var seq__29981 = cljs.core.seq.call(null,provides);
var chunk__29982 = null;
var count__29983 = (0);
var i__29984 = (0);
while(true){
if((i__29984 < count__29983)){
var prov = cljs.core._nth.call(null,chunk__29982,i__29984);
figwheel.client.file_reloading.path_to_name_BANG_.call(null,path,prov);

var seq__29993_30001 = cljs.core.seq.call(null,requires);
var chunk__29994_30002 = null;
var count__29995_30003 = (0);
var i__29996_30004 = (0);
while(true){
if((i__29996_30004 < count__29995_30003)){
var req_30005 = cljs.core._nth.call(null,chunk__29994_30002,i__29996_30004);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,req_30005,prov);


var G__30006 = seq__29993_30001;
var G__30007 = chunk__29994_30002;
var G__30008 = count__29995_30003;
var G__30009 = (i__29996_30004 + (1));
seq__29993_30001 = G__30006;
chunk__29994_30002 = G__30007;
count__29995_30003 = G__30008;
i__29996_30004 = G__30009;
continue;
} else {
var temp__5735__auto___30010 = cljs.core.seq.call(null,seq__29993_30001);
if(temp__5735__auto___30010){
var seq__29993_30011__$1 = temp__5735__auto___30010;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__29993_30011__$1)){
var c__4609__auto___30012 = cljs.core.chunk_first.call(null,seq__29993_30011__$1);
var G__30013 = cljs.core.chunk_rest.call(null,seq__29993_30011__$1);
var G__30014 = c__4609__auto___30012;
var G__30015 = cljs.core.count.call(null,c__4609__auto___30012);
var G__30016 = (0);
seq__29993_30001 = G__30013;
chunk__29994_30002 = G__30014;
count__29995_30003 = G__30015;
i__29996_30004 = G__30016;
continue;
} else {
var req_30017 = cljs.core.first.call(null,seq__29993_30011__$1);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,req_30017,prov);


var G__30018 = cljs.core.next.call(null,seq__29993_30011__$1);
var G__30019 = null;
var G__30020 = (0);
var G__30021 = (0);
seq__29993_30001 = G__30018;
chunk__29994_30002 = G__30019;
count__29995_30003 = G__30020;
i__29996_30004 = G__30021;
continue;
}
} else {
}
}
break;
}


var G__30022 = seq__29981;
var G__30023 = chunk__29982;
var G__30024 = count__29983;
var G__30025 = (i__29984 + (1));
seq__29981 = G__30022;
chunk__29982 = G__30023;
count__29983 = G__30024;
i__29984 = G__30025;
continue;
} else {
var temp__5735__auto__ = cljs.core.seq.call(null,seq__29981);
if(temp__5735__auto__){
var seq__29981__$1 = temp__5735__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__29981__$1)){
var c__4609__auto__ = cljs.core.chunk_first.call(null,seq__29981__$1);
var G__30026 = cljs.core.chunk_rest.call(null,seq__29981__$1);
var G__30027 = c__4609__auto__;
var G__30028 = cljs.core.count.call(null,c__4609__auto__);
var G__30029 = (0);
seq__29981 = G__30026;
chunk__29982 = G__30027;
count__29983 = G__30028;
i__29984 = G__30029;
continue;
} else {
var prov = cljs.core.first.call(null,seq__29981__$1);
figwheel.client.file_reloading.path_to_name_BANG_.call(null,path,prov);

var seq__29997_30030 = cljs.core.seq.call(null,requires);
var chunk__29998_30031 = null;
var count__29999_30032 = (0);
var i__30000_30033 = (0);
while(true){
if((i__30000_30033 < count__29999_30032)){
var req_30034 = cljs.core._nth.call(null,chunk__29998_30031,i__30000_30033);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,req_30034,prov);


var G__30035 = seq__29997_30030;
var G__30036 = chunk__29998_30031;
var G__30037 = count__29999_30032;
var G__30038 = (i__30000_30033 + (1));
seq__29997_30030 = G__30035;
chunk__29998_30031 = G__30036;
count__29999_30032 = G__30037;
i__30000_30033 = G__30038;
continue;
} else {
var temp__5735__auto___30039__$1 = cljs.core.seq.call(null,seq__29997_30030);
if(temp__5735__auto___30039__$1){
var seq__29997_30040__$1 = temp__5735__auto___30039__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__29997_30040__$1)){
var c__4609__auto___30041 = cljs.core.chunk_first.call(null,seq__29997_30040__$1);
var G__30042 = cljs.core.chunk_rest.call(null,seq__29997_30040__$1);
var G__30043 = c__4609__auto___30041;
var G__30044 = cljs.core.count.call(null,c__4609__auto___30041);
var G__30045 = (0);
seq__29997_30030 = G__30042;
chunk__29998_30031 = G__30043;
count__29999_30032 = G__30044;
i__30000_30033 = G__30045;
continue;
} else {
var req_30046 = cljs.core.first.call(null,seq__29997_30040__$1);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,req_30046,prov);


var G__30047 = cljs.core.next.call(null,seq__29997_30040__$1);
var G__30048 = null;
var G__30049 = (0);
var G__30050 = (0);
seq__29997_30030 = G__30047;
chunk__29998_30031 = G__30048;
count__29999_30032 = G__30049;
i__30000_30033 = G__30050;
continue;
}
} else {
}
}
break;
}


var G__30051 = cljs.core.next.call(null,seq__29981__$1);
var G__30052 = null;
var G__30053 = (0);
var G__30054 = (0);
seq__29981 = G__30051;
chunk__29982 = G__30052;
count__29983 = G__30053;
i__29984 = G__30054;
continue;
}
} else {
return null;
}
}
break;
}
});
figwheel.client.file_reloading.figwheel_require = (function figwheel$client$file_reloading$figwheel_require(src,reload){
(goog.require = figwheel.client.file_reloading.figwheel_require);

if(cljs.core._EQ_.call(null,reload,"reload-all")){
var seq__30055_30059 = cljs.core.seq.call(null,figwheel.client.file_reloading.get_all_dependencies.call(null,src));
var chunk__30056_30060 = null;
var count__30057_30061 = (0);
var i__30058_30062 = (0);
while(true){
if((i__30058_30062 < count__30057_30061)){
var ns_30063 = cljs.core._nth.call(null,chunk__30056_30060,i__30058_30062);
figwheel.client.file_reloading.unprovide_BANG_.call(null,ns_30063);


var G__30064 = seq__30055_30059;
var G__30065 = chunk__30056_30060;
var G__30066 = count__30057_30061;
var G__30067 = (i__30058_30062 + (1));
seq__30055_30059 = G__30064;
chunk__30056_30060 = G__30065;
count__30057_30061 = G__30066;
i__30058_30062 = G__30067;
continue;
} else {
var temp__5735__auto___30068 = cljs.core.seq.call(null,seq__30055_30059);
if(temp__5735__auto___30068){
var seq__30055_30069__$1 = temp__5735__auto___30068;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__30055_30069__$1)){
var c__4609__auto___30070 = cljs.core.chunk_first.call(null,seq__30055_30069__$1);
var G__30071 = cljs.core.chunk_rest.call(null,seq__30055_30069__$1);
var G__30072 = c__4609__auto___30070;
var G__30073 = cljs.core.count.call(null,c__4609__auto___30070);
var G__30074 = (0);
seq__30055_30059 = G__30071;
chunk__30056_30060 = G__30072;
count__30057_30061 = G__30073;
i__30058_30062 = G__30074;
continue;
} else {
var ns_30075 = cljs.core.first.call(null,seq__30055_30069__$1);
figwheel.client.file_reloading.unprovide_BANG_.call(null,ns_30075);


var G__30076 = cljs.core.next.call(null,seq__30055_30069__$1);
var G__30077 = null;
var G__30078 = (0);
var G__30079 = (0);
seq__30055_30059 = G__30076;
chunk__30056_30060 = G__30077;
count__30057_30061 = G__30078;
i__30058_30062 = G__30079;
continue;
}
} else {
}
}
break;
}
} else {
}

if(cljs.core.truth_(reload)){
figwheel.client.file_reloading.unprovide_BANG_.call(null,src);
} else {
}

return goog.require_figwheel_backup_(src);
});
/**
 * Reusable browser REPL bootstrapping. Patches the essential functions
 *   in goog.base to support re-loading of namespaces after page load.
 */
figwheel.client.file_reloading.bootstrap_goog_base = (function figwheel$client$file_reloading$bootstrap_goog_base(){
if(cljs.core.truth_(COMPILED)){
return null;
} else {
(goog.require_figwheel_backup_ = (function (){var or__4185__auto__ = goog.require__;
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
return goog.require;
}
})());

(goog.isProvided_ = (function (name){
return false;
}));

figwheel.client.file_reloading.setup_path__GT_name_BANG_.call(null);

figwheel.client.file_reloading.setup_ns__GT_dependents_BANG_.call(null);

(goog.addDependency_figwheel_backup_ = goog.addDependency);

(goog.addDependency = (function() { 
var G__30080__delegate = function (args){
cljs.core.apply.call(null,figwheel.client.file_reloading.addDependency,args);

return cljs.core.apply.call(null,goog.addDependency_figwheel_backup_,args);
};
var G__30080 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__30081__i = 0, G__30081__a = new Array(arguments.length -  0);
while (G__30081__i < G__30081__a.length) {G__30081__a[G__30081__i] = arguments[G__30081__i + 0]; ++G__30081__i;}
  args = new cljs.core.IndexedSeq(G__30081__a,0,null);
} 
return G__30080__delegate.call(this,args);};
G__30080.cljs$lang$maxFixedArity = 0;
G__30080.cljs$lang$applyTo = (function (arglist__30082){
var args = cljs.core.seq(arglist__30082);
return G__30080__delegate(args);
});
G__30080.cljs$core$IFn$_invoke$arity$variadic = G__30080__delegate;
return G__30080;
})()
);

goog.constructNamespace_("cljs.user");

(goog.global.CLOSURE_IMPORT_SCRIPT = figwheel.client.file_reloading.queued_file_reload);

return (goog.require = figwheel.client.file_reloading.figwheel_require);
}
});
figwheel.client.file_reloading.patch_goog_base = (function figwheel$client$file_reloading$patch_goog_base(){
if((typeof figwheel !== 'undefined') && (typeof figwheel.client !== 'undefined') && (typeof figwheel.client.file_reloading !== 'undefined') && (typeof figwheel.client.file_reloading.bootstrapped_cljs !== 'undefined')){
return null;
} else {
return (
figwheel.client.file_reloading.bootstrapped_cljs = (function (){
figwheel.client.file_reloading.bootstrap_goog_base.call(null);

return true;
})()
)
;
}
});
figwheel.client.file_reloading.gloader = (((typeof goog !== 'undefined') && (typeof goog.net !== 'undefined') && (typeof goog.net.jsloader !== 'undefined') && (typeof goog.net.jsloader.safeLoad !== 'undefined'))?(function (p1__30083_SHARP_,p2__30084_SHARP_){
return goog.net.jsloader.safeLoad(goog.html.legacyconversions.trustedResourceUrlFromString(cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__30083_SHARP_)),p2__30084_SHARP_);
}):(((typeof goog !== 'undefined') && (typeof goog.net !== 'undefined') && (typeof goog.net.jsloader !== 'undefined') && (typeof goog.net.jsloader.load !== 'undefined'))?(function (p1__30085_SHARP_,p2__30086_SHARP_){
return goog.net.jsloader.load(cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__30085_SHARP_),p2__30086_SHARP_);
}):(function(){throw cljs.core.ex_info.call(null,"No remote script loading function found.",cljs.core.PersistentArrayMap.EMPTY)})()
));
figwheel.client.file_reloading.reload_file_in_html_env = (function figwheel$client$file_reloading$reload_file_in_html_env(request_url,callback){

var G__30087 = figwheel.client.file_reloading.gloader.call(null,figwheel.client.file_reloading.add_cache_buster.call(null,request_url),({"cleanupWhenDone": true}));
G__30087.addCallback((function (){
return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [true], null));
}));

G__30087.addErrback((function (){
return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [false], null));
}));

return G__30087;
});
figwheel.client.file_reloading.write_script_tag_import = figwheel.client.file_reloading.reload_file_in_html_env;
goog.exportSymbol('figwheel.client.file_reloading.write_script_tag_import', figwheel.client.file_reloading.write_script_tag_import);
figwheel.client.file_reloading.worker_import_script = (function figwheel$client$file_reloading$worker_import_script(request_url,callback){

return callback.call(null,(function (){try{self.importScripts(figwheel.client.file_reloading.add_cache_buster.call(null,request_url));

return true;
}catch (e30088){if((e30088 instanceof Error)){
var e = e30088;
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),["Figwheel: Error loading file ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(request_url)].join(''));

figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),e.stack);

return false;
} else {
throw e30088;

}
}})());
});
goog.exportSymbol('figwheel.client.file_reloading.worker_import_script', figwheel.client.file_reloading.worker_import_script);
figwheel.client.file_reloading.create_node_script_import_fn = (function figwheel$client$file_reloading$create_node_script_import_fn(){
var node_path_lib = require("path");
var util_pattern = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(node_path_lib.sep),cljs.core.str.cljs$core$IFn$_invoke$arity$1(node_path_lib.join("goog","bootstrap","nodejs.js"))].join('');
var util_path = goog.object.findKey(require.cache,(function (v,k,o){
return goog.string.endsWith(k,util_pattern);
}));
var parts = cljs.core.pop.call(null,cljs.core.pop.call(null,clojure.string.split.call(null,util_path,/[\/\\]/)));
var root_path = clojure.string.join.call(null,node_path_lib.sep,parts);
return (function (request_url,callback){

var cache_path = node_path_lib.resolve(root_path,request_url);
goog.object.remove(require.cache,cache_path);

return callback.call(null,(function (){try{return require(cache_path);
}catch (e30089){if((e30089 instanceof Error)){
var e = e30089;
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),["Figwheel: Error loading file ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cache_path)].join(''));

figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),e.stack);

return false;
} else {
throw e30089;

}
}})());
});
});
goog.exportSymbol('figwheel.client.file_reloading.create_node_script_import_fn', figwheel.client.file_reloading.create_node_script_import_fn);
figwheel.client.file_reloading.reload_file_STAR_ = (function (){var pred__30090 = cljs.core._EQ_;
var expr__30091 = figwheel.client.utils.host_env_QMARK_.call(null);
if(cljs.core.truth_(pred__30090.call(null,new cljs.core.Keyword(null,"node","node",581201198),expr__30091))){
return figwheel.client.file_reloading.create_node_script_import_fn.call(null);
} else {
if(cljs.core.truth_(pred__30090.call(null,new cljs.core.Keyword(null,"html","html",-998796897),expr__30091))){
return figwheel.client.file_reloading.write_script_tag_import;
} else {
if(cljs.core.truth_(pred__30090.call(null,new cljs.core.Keyword(null,"worker","worker",938239996),expr__30091))){
return figwheel.client.file_reloading.worker_import_script;
} else {
return (function (a,b){
throw "Reload not defined for this platform";
});
}
}
}
})();
figwheel.client.file_reloading.reload_file = (function figwheel$client$file_reloading$reload_file(p__30093,callback){
var map__30094 = p__30093;
var map__30094__$1 = (((((!((map__30094 == null))))?(((((map__30094.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__30094.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__30094):map__30094);
var file_msg = map__30094__$1;
var request_url = cljs.core.get.call(null,map__30094__$1,new cljs.core.Keyword(null,"request-url","request-url",2100346596));

figwheel.client.utils.debug_prn.call(null,["FigWheel: Attempting to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(request_url)].join(''));

return (function (){var or__4185__auto__ = goog.object.get(goog.global,"FIGWHEEL_IMPORT_SCRIPT");
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
return figwheel.client.file_reloading.reload_file_STAR_;
}
})().call(null,request_url,(function (success_QMARK_){
if(cljs.core.truth_(success_QMARK_)){
figwheel.client.utils.debug_prn.call(null,["FigWheel: Successfully loaded ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(request_url)].join(''));

return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.assoc.call(null,file_msg,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375),true)], null));
} else {
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),["Figwheel: Error loading file ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(request_url)].join(''));

return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [file_msg], null));
}
}));
});
if((typeof figwheel !== 'undefined') && (typeof figwheel.client !== 'undefined') && (typeof figwheel.client.file_reloading !== 'undefined') && (typeof figwheel.client.file_reloading.reload_chan !== 'undefined')){
} else {
figwheel.client.file_reloading.reload_chan = cljs.core.async.chan.call(null);
}
if((typeof figwheel !== 'undefined') && (typeof figwheel.client !== 'undefined') && (typeof figwheel.client.file_reloading !== 'undefined') && (typeof figwheel.client.file_reloading.on_load_callbacks !== 'undefined')){
} else {
figwheel.client.file_reloading.on_load_callbacks = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
}
if((typeof figwheel !== 'undefined') && (typeof figwheel.client !== 'undefined') && (typeof figwheel.client.file_reloading !== 'undefined') && (typeof figwheel.client.file_reloading.dependencies_loaded !== 'undefined')){
} else {
figwheel.client.file_reloading.dependencies_loaded = cljs.core.atom.call(null,cljs.core.PersistentVector.EMPTY);
}
figwheel.client.file_reloading.blocking_load = (function figwheel$client$file_reloading$blocking_load(url){
var out = cljs.core.async.chan.call(null);
figwheel.client.file_reloading.reload_file.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"request-url","request-url",2100346596),url], null),(function (file_msg){
cljs.core.async.put_BANG_.call(null,out,file_msg);

return cljs.core.async.close_BANG_.call(null,out);
}));

return out;
});
if((typeof figwheel !== 'undefined') && (typeof figwheel.client !== 'undefined') && (typeof figwheel.client.file_reloading !== 'undefined') && (typeof figwheel.client.file_reloading.reloader_loop !== 'undefined')){
} else {
figwheel.client.file_reloading.reloader_loop = (function (){var c__26681__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26682__auto__ = (function (){var switch__26586__auto__ = (function (state_30132){
var state_val_30133 = (state_30132[(1)]);
if((state_val_30133 === (7))){
var inst_30128 = (state_30132[(2)]);
var state_30132__$1 = state_30132;
var statearr_30134_30160 = state_30132__$1;
(statearr_30134_30160[(2)] = inst_30128);

(statearr_30134_30160[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30133 === (1))){
var state_30132__$1 = state_30132;
var statearr_30135_30161 = state_30132__$1;
(statearr_30135_30161[(2)] = null);

(statearr_30135_30161[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30133 === (4))){
var inst_30098 = (state_30132[(7)]);
var inst_30098__$1 = (state_30132[(2)]);
var state_30132__$1 = (function (){var statearr_30136 = state_30132;
(statearr_30136[(7)] = inst_30098__$1);

return statearr_30136;
})();
if(cljs.core.truth_(inst_30098__$1)){
var statearr_30137_30162 = state_30132__$1;
(statearr_30137_30162[(1)] = (5));

} else {
var statearr_30138_30163 = state_30132__$1;
(statearr_30138_30163[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30133 === (15))){
var inst_30113 = (state_30132[(8)]);
var inst_30111 = (state_30132[(9)]);
var inst_30115 = inst_30113.call(null,inst_30111);
var state_30132__$1 = state_30132;
var statearr_30139_30164 = state_30132__$1;
(statearr_30139_30164[(2)] = inst_30115);

(statearr_30139_30164[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30133 === (13))){
var inst_30122 = (state_30132[(2)]);
var state_30132__$1 = state_30132;
var statearr_30140_30165 = state_30132__$1;
(statearr_30140_30165[(2)] = inst_30122);

(statearr_30140_30165[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30133 === (6))){
var state_30132__$1 = state_30132;
var statearr_30141_30166 = state_30132__$1;
(statearr_30141_30166[(2)] = null);

(statearr_30141_30166[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30133 === (17))){
var inst_30119 = (state_30132[(2)]);
var state_30132__$1 = state_30132;
var statearr_30142_30167 = state_30132__$1;
(statearr_30142_30167[(2)] = inst_30119);

(statearr_30142_30167[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30133 === (3))){
var inst_30130 = (state_30132[(2)]);
var state_30132__$1 = state_30132;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_30132__$1,inst_30130);
} else {
if((state_val_30133 === (12))){
var state_30132__$1 = state_30132;
var statearr_30143_30168 = state_30132__$1;
(statearr_30143_30168[(2)] = null);

(statearr_30143_30168[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30133 === (2))){
var state_30132__$1 = state_30132;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_30132__$1,(4),figwheel.client.file_reloading.reload_chan);
} else {
if((state_val_30133 === (11))){
var inst_30103 = (state_30132[(10)]);
var inst_30109 = figwheel.client.file_reloading.blocking_load.call(null,inst_30103);
var state_30132__$1 = state_30132;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_30132__$1,(14),inst_30109);
} else {
if((state_val_30133 === (9))){
var inst_30103 = (state_30132[(10)]);
var state_30132__$1 = state_30132;
if(cljs.core.truth_(inst_30103)){
var statearr_30144_30169 = state_30132__$1;
(statearr_30144_30169[(1)] = (11));

} else {
var statearr_30145_30170 = state_30132__$1;
(statearr_30145_30170[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30133 === (5))){
var inst_30098 = (state_30132[(7)]);
var inst_30104 = (state_30132[(11)]);
var inst_30103 = cljs.core.nth.call(null,inst_30098,(0),null);
var inst_30104__$1 = cljs.core.nth.call(null,inst_30098,(1),null);
var state_30132__$1 = (function (){var statearr_30146 = state_30132;
(statearr_30146[(10)] = inst_30103);

(statearr_30146[(11)] = inst_30104__$1);

return statearr_30146;
})();
if(cljs.core.truth_(inst_30104__$1)){
var statearr_30147_30171 = state_30132__$1;
(statearr_30147_30171[(1)] = (8));

} else {
var statearr_30148_30172 = state_30132__$1;
(statearr_30148_30172[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30133 === (14))){
var inst_30103 = (state_30132[(10)]);
var inst_30113 = (state_30132[(8)]);
var inst_30111 = (state_30132[(2)]);
var inst_30112 = cljs.core.deref.call(null,figwheel.client.file_reloading.on_load_callbacks);
var inst_30113__$1 = cljs.core.get.call(null,inst_30112,inst_30103);
var state_30132__$1 = (function (){var statearr_30149 = state_30132;
(statearr_30149[(8)] = inst_30113__$1);

(statearr_30149[(9)] = inst_30111);

return statearr_30149;
})();
if(cljs.core.truth_(inst_30113__$1)){
var statearr_30150_30173 = state_30132__$1;
(statearr_30150_30173[(1)] = (15));

} else {
var statearr_30151_30174 = state_30132__$1;
(statearr_30151_30174[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30133 === (16))){
var inst_30111 = (state_30132[(9)]);
var inst_30117 = cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.dependencies_loaded,cljs.core.conj,inst_30111);
var state_30132__$1 = state_30132;
var statearr_30152_30175 = state_30132__$1;
(statearr_30152_30175[(2)] = inst_30117);

(statearr_30152_30175[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30133 === (10))){
var inst_30124 = (state_30132[(2)]);
var state_30132__$1 = (function (){var statearr_30153 = state_30132;
(statearr_30153[(12)] = inst_30124);

return statearr_30153;
})();
var statearr_30154_30176 = state_30132__$1;
(statearr_30154_30176[(2)] = null);

(statearr_30154_30176[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30133 === (8))){
var inst_30104 = (state_30132[(11)]);
var inst_30106 = eval(inst_30104);
var state_30132__$1 = state_30132;
var statearr_30155_30177 = state_30132__$1;
(statearr_30155_30177[(2)] = inst_30106);

(statearr_30155_30177[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var figwheel$client$file_reloading$state_machine__26587__auto__ = null;
var figwheel$client$file_reloading$state_machine__26587__auto____0 = (function (){
var statearr_30156 = [null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_30156[(0)] = figwheel$client$file_reloading$state_machine__26587__auto__);

(statearr_30156[(1)] = (1));

return statearr_30156;
});
var figwheel$client$file_reloading$state_machine__26587__auto____1 = (function (state_30132){
while(true){
var ret_value__26588__auto__ = (function (){try{while(true){
var result__26589__auto__ = switch__26586__auto__.call(null,state_30132);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26589__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26589__auto__;
}
break;
}
}catch (e30157){if((e30157 instanceof Object)){
var ex__26590__auto__ = e30157;
var statearr_30158_30178 = state_30132;
(statearr_30158_30178[(5)] = ex__26590__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_30132);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e30157;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26588__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__30179 = state_30132;
state_30132 = G__30179;
continue;
} else {
return ret_value__26588__auto__;
}
break;
}
});
figwheel$client$file_reloading$state_machine__26587__auto__ = function(state_30132){
switch(arguments.length){
case 0:
return figwheel$client$file_reloading$state_machine__26587__auto____0.call(this);
case 1:
return figwheel$client$file_reloading$state_machine__26587__auto____1.call(this,state_30132);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloading$state_machine__26587__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloading$state_machine__26587__auto____0;
figwheel$client$file_reloading$state_machine__26587__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloading$state_machine__26587__auto____1;
return figwheel$client$file_reloading$state_machine__26587__auto__;
})()
})();
var state__26683__auto__ = (function (){var statearr_30159 = f__26682__auto__.call(null);
(statearr_30159[(6)] = c__26681__auto__);

return statearr_30159;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26683__auto__);
}));

return c__26681__auto__;
})();
}
figwheel.client.file_reloading.queued_file_reload = (function figwheel$client$file_reloading$queued_file_reload(var_args){
var G__30181 = arguments.length;
switch (G__30181) {
case 1:
return figwheel.client.file_reloading.queued_file_reload.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return figwheel.client.file_reloading.queued_file_reload.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(figwheel.client.file_reloading.queued_file_reload.cljs$core$IFn$_invoke$arity$1 = (function (url){
return figwheel.client.file_reloading.queued_file_reload.call(null,url,null);
}));

(figwheel.client.file_reloading.queued_file_reload.cljs$core$IFn$_invoke$arity$2 = (function (url,opt_source_text){
return cljs.core.async.put_BANG_.call(null,figwheel.client.file_reloading.reload_chan,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [url,opt_source_text], null));
}));

(figwheel.client.file_reloading.queued_file_reload.cljs$lang$maxFixedArity = 2);

figwheel.client.file_reloading.require_with_callback = (function figwheel$client$file_reloading$require_with_callback(p__30183,callback){
var map__30184 = p__30183;
var map__30184__$1 = (((((!((map__30184 == null))))?(((((map__30184.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__30184.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__30184):map__30184);
var file_msg = map__30184__$1;
var namespace = cljs.core.get.call(null,map__30184__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
var request_url = figwheel.client.file_reloading.resolve_ns.call(null,namespace);
cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.on_load_callbacks,cljs.core.assoc,request_url,(function (file_msg_SINGLEQUOTE_){
cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.on_load_callbacks,cljs.core.dissoc,request_url);

return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge.call(null,file_msg,cljs.core.select_keys.call(null,file_msg_SINGLEQUOTE_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375)], null)))], null));
}));

return figwheel.client.file_reloading.figwheel_require.call(null,cljs.core.name.call(null,namespace),true);
});
figwheel.client.file_reloading.figwheel_no_load_QMARK_ = (function figwheel$client$file_reloading$figwheel_no_load_QMARK_(p__30186){
var map__30187 = p__30186;
var map__30187__$1 = (((((!((map__30187 == null))))?(((((map__30187.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__30187.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__30187):map__30187);
var file_msg = map__30187__$1;
var namespace = cljs.core.get.call(null,map__30187__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
var meta_pragmas = cljs.core.get.call(null,cljs.core.deref.call(null,figwheel.client.file_reloading.figwheel_meta_pragmas),cljs.core.name.call(null,namespace));
return new cljs.core.Keyword(null,"figwheel-no-load","figwheel-no-load",-555840179).cljs$core$IFn$_invoke$arity$1(meta_pragmas);
});
figwheel.client.file_reloading.ns_exists_QMARK_ = (function figwheel$client$file_reloading$ns_exists_QMARK_(namespace){
return (!((cljs.core.reduce.call(null,cljs.core.fnil.call(null,goog.object.get,({})),goog.global,clojure.string.split.call(null,cljs.core.name.call(null,namespace),".")) == null)));
});
figwheel.client.file_reloading.reload_file_QMARK_ = (function figwheel$client$file_reloading$reload_file_QMARK_(p__30189){
var map__30190 = p__30189;
var map__30190__$1 = (((((!((map__30190 == null))))?(((((map__30190.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__30190.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__30190):map__30190);
var file_msg = map__30190__$1;
var namespace = cljs.core.get.call(null,map__30190__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));

var meta_pragmas = cljs.core.get.call(null,cljs.core.deref.call(null,figwheel.client.file_reloading.figwheel_meta_pragmas),cljs.core.name.call(null,namespace));
if(cljs.core.not.call(null,figwheel.client.file_reloading.figwheel_no_load_QMARK_.call(null,file_msg))){
var or__4185__auto__ = new cljs.core.Keyword(null,"figwheel-always","figwheel-always",799819691).cljs$core$IFn$_invoke$arity$1(meta_pragmas);
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
var or__4185__auto____$1 = new cljs.core.Keyword(null,"figwheel-load","figwheel-load",1316089175).cljs$core$IFn$_invoke$arity$1(meta_pragmas);
if(cljs.core.truth_(or__4185__auto____$1)){
return or__4185__auto____$1;
} else {
var or__4185__auto____$2 = figwheel.client.file_reloading.provided_QMARK_.call(null,cljs.core.name.call(null,namespace));
if(cljs.core.truth_(or__4185__auto____$2)){
return or__4185__auto____$2;
} else {
return figwheel.client.file_reloading.ns_exists_QMARK_.call(null,namespace);
}
}
}
} else {
return false;
}
});
figwheel.client.file_reloading.js_reload = (function figwheel$client$file_reloading$js_reload(p__30192,callback){
var map__30193 = p__30192;
var map__30193__$1 = (((((!((map__30193 == null))))?(((((map__30193.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__30193.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__30193):map__30193);
var file_msg = map__30193__$1;
var request_url = cljs.core.get.call(null,map__30193__$1,new cljs.core.Keyword(null,"request-url","request-url",2100346596));
var namespace = cljs.core.get.call(null,map__30193__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));

if(cljs.core.truth_(figwheel.client.file_reloading.reload_file_QMARK_.call(null,file_msg))){
return figwheel.client.file_reloading.require_with_callback.call(null,file_msg,callback);
} else {
figwheel.client.utils.debug_prn.call(null,["Figwheel: Not trying to load file ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(request_url)].join(''));

return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [file_msg], null));
}
});
figwheel.client.file_reloading.reload_js_file = (function figwheel$client$file_reloading$reload_js_file(file_msg){
var out = cljs.core.async.chan.call(null);
figwheel.client.file_reloading.js_reload.call(null,file_msg,(function (url){
cljs.core.async.put_BANG_.call(null,out,url);

return cljs.core.async.close_BANG_.call(null,out);
}));

return out;
});
/**
 * Returns a chanel with one collection of loaded filenames on it.
 */
figwheel.client.file_reloading.load_all_js_files = (function figwheel$client$file_reloading$load_all_js_files(files){
var out = cljs.core.async.chan.call(null);
var c__26681__auto___30243 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26682__auto__ = (function (){var switch__26586__auto__ = (function (state_30228){
var state_val_30229 = (state_30228[(1)]);
if((state_val_30229 === (1))){
var inst_30202 = cljs.core.seq.call(null,files);
var inst_30203 = cljs.core.first.call(null,inst_30202);
var inst_30204 = cljs.core.next.call(null,inst_30202);
var inst_30205 = files;
var state_30228__$1 = (function (){var statearr_30230 = state_30228;
(statearr_30230[(7)] = inst_30204);

(statearr_30230[(8)] = inst_30205);

(statearr_30230[(9)] = inst_30203);

return statearr_30230;
})();
var statearr_30231_30244 = state_30228__$1;
(statearr_30231_30244[(2)] = null);

(statearr_30231_30244[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30229 === (2))){
var inst_30211 = (state_30228[(10)]);
var inst_30205 = (state_30228[(8)]);
var inst_30210 = cljs.core.seq.call(null,inst_30205);
var inst_30211__$1 = cljs.core.first.call(null,inst_30210);
var inst_30212 = cljs.core.next.call(null,inst_30210);
var inst_30213 = (inst_30211__$1 == null);
var inst_30214 = cljs.core.not.call(null,inst_30213);
var state_30228__$1 = (function (){var statearr_30232 = state_30228;
(statearr_30232[(11)] = inst_30212);

(statearr_30232[(10)] = inst_30211__$1);

return statearr_30232;
})();
if(inst_30214){
var statearr_30233_30245 = state_30228__$1;
(statearr_30233_30245[(1)] = (4));

} else {
var statearr_30234_30246 = state_30228__$1;
(statearr_30234_30246[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30229 === (3))){
var inst_30226 = (state_30228[(2)]);
var state_30228__$1 = state_30228;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_30228__$1,inst_30226);
} else {
if((state_val_30229 === (4))){
var inst_30211 = (state_30228[(10)]);
var inst_30216 = figwheel.client.file_reloading.reload_js_file.call(null,inst_30211);
var state_30228__$1 = state_30228;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_30228__$1,(7),inst_30216);
} else {
if((state_val_30229 === (5))){
var inst_30222 = cljs.core.async.close_BANG_.call(null,out);
var state_30228__$1 = state_30228;
var statearr_30235_30247 = state_30228__$1;
(statearr_30235_30247[(2)] = inst_30222);

(statearr_30235_30247[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30229 === (6))){
var inst_30224 = (state_30228[(2)]);
var state_30228__$1 = state_30228;
var statearr_30236_30248 = state_30228__$1;
(statearr_30236_30248[(2)] = inst_30224);

(statearr_30236_30248[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30229 === (7))){
var inst_30212 = (state_30228[(11)]);
var inst_30218 = (state_30228[(2)]);
var inst_30219 = cljs.core.async.put_BANG_.call(null,out,inst_30218);
var inst_30205 = inst_30212;
var state_30228__$1 = (function (){var statearr_30237 = state_30228;
(statearr_30237[(12)] = inst_30219);

(statearr_30237[(8)] = inst_30205);

return statearr_30237;
})();
var statearr_30238_30249 = state_30228__$1;
(statearr_30238_30249[(2)] = null);

(statearr_30238_30249[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
});
return (function() {
var figwheel$client$file_reloading$load_all_js_files_$_state_machine__26587__auto__ = null;
var figwheel$client$file_reloading$load_all_js_files_$_state_machine__26587__auto____0 = (function (){
var statearr_30239 = [null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_30239[(0)] = figwheel$client$file_reloading$load_all_js_files_$_state_machine__26587__auto__);

(statearr_30239[(1)] = (1));

return statearr_30239;
});
var figwheel$client$file_reloading$load_all_js_files_$_state_machine__26587__auto____1 = (function (state_30228){
while(true){
var ret_value__26588__auto__ = (function (){try{while(true){
var result__26589__auto__ = switch__26586__auto__.call(null,state_30228);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26589__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26589__auto__;
}
break;
}
}catch (e30240){if((e30240 instanceof Object)){
var ex__26590__auto__ = e30240;
var statearr_30241_30250 = state_30228;
(statearr_30241_30250[(5)] = ex__26590__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_30228);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e30240;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26588__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__30251 = state_30228;
state_30228 = G__30251;
continue;
} else {
return ret_value__26588__auto__;
}
break;
}
});
figwheel$client$file_reloading$load_all_js_files_$_state_machine__26587__auto__ = function(state_30228){
switch(arguments.length){
case 0:
return figwheel$client$file_reloading$load_all_js_files_$_state_machine__26587__auto____0.call(this);
case 1:
return figwheel$client$file_reloading$load_all_js_files_$_state_machine__26587__auto____1.call(this,state_30228);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloading$load_all_js_files_$_state_machine__26587__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloading$load_all_js_files_$_state_machine__26587__auto____0;
figwheel$client$file_reloading$load_all_js_files_$_state_machine__26587__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloading$load_all_js_files_$_state_machine__26587__auto____1;
return figwheel$client$file_reloading$load_all_js_files_$_state_machine__26587__auto__;
})()
})();
var state__26683__auto__ = (function (){var statearr_30242 = f__26682__auto__.call(null);
(statearr_30242[(6)] = c__26681__auto___30243);

return statearr_30242;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26683__auto__);
}));


return cljs.core.async.into.call(null,cljs.core.PersistentVector.EMPTY,out);
});
figwheel.client.file_reloading.eval_body = (function figwheel$client$file_reloading$eval_body(p__30252,opts){
var map__30253 = p__30252;
var map__30253__$1 = (((((!((map__30253 == null))))?(((((map__30253.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__30253.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__30253):map__30253);
var eval_body = cljs.core.get.call(null,map__30253__$1,new cljs.core.Keyword(null,"eval-body","eval-body",-907279883));
var file = cljs.core.get.call(null,map__30253__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
if(cljs.core.truth_((function (){var and__4174__auto__ = eval_body;
if(cljs.core.truth_(and__4174__auto__)){
return typeof eval_body === 'string';
} else {
return and__4174__auto__;
}
})())){
var code = eval_body;
try{figwheel.client.utils.debug_prn.call(null,["Evaling file ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(file)].join(''));

return figwheel.client.utils.eval_helper.call(null,code,opts);
}catch (e30255){var e = e30255;
return figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),["Unable to evaluate ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(file)].join(''));
}} else {
return null;
}
});
figwheel.client.file_reloading.expand_files = (function figwheel$client$file_reloading$expand_files(files){
var deps = figwheel.client.file_reloading.get_all_dependents.call(null,cljs.core.map.call(null,new cljs.core.Keyword(null,"namespace","namespace",-377510372),files));
return cljs.core.filter.call(null,cljs.core.comp.call(null,cljs.core.not,cljs.core.partial.call(null,cljs.core.re_matches,/figwheel\.connect.*/),new cljs.core.Keyword(null,"namespace","namespace",-377510372)),cljs.core.map.call(null,(function (n){
var temp__5733__auto__ = cljs.core.first.call(null,cljs.core.filter.call(null,(function (p1__30256_SHARP_){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"namespace","namespace",-377510372).cljs$core$IFn$_invoke$arity$1(p1__30256_SHARP_),n);
}),files));
if(cljs.core.truth_(temp__5733__auto__)){
var file_msg = temp__5733__auto__;
return file_msg;
} else {
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"namespace","namespace",-377510372),new cljs.core.Keyword(null,"namespace","namespace",-377510372),n], null);
}
}),deps));
});
figwheel.client.file_reloading.sort_files = (function figwheel$client$file_reloading$sort_files(files){
if((cljs.core.count.call(null,files) <= (1))){
return files;
} else {
var keep_files = cljs.core.set.call(null,cljs.core.keep.call(null,new cljs.core.Keyword(null,"namespace","namespace",-377510372),files));
return cljs.core.filter.call(null,cljs.core.comp.call(null,keep_files,new cljs.core.Keyword(null,"namespace","namespace",-377510372)),figwheel.client.file_reloading.expand_files.call(null,files));
}
});
figwheel.client.file_reloading.get_figwheel_always = (function figwheel$client$file_reloading$get_figwheel_always(){
return cljs.core.map.call(null,(function (p__30257){
var vec__30258 = p__30257;
var k = cljs.core.nth.call(null,vec__30258,(0),null);
var v = cljs.core.nth.call(null,vec__30258,(1),null);
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"namespace","namespace",-377510372),k,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"namespace","namespace",-377510372)], null);
}),cljs.core.filter.call(null,(function (p__30261){
var vec__30262 = p__30261;
var k = cljs.core.nth.call(null,vec__30262,(0),null);
var v = cljs.core.nth.call(null,vec__30262,(1),null);
return new cljs.core.Keyword(null,"figwheel-always","figwheel-always",799819691).cljs$core$IFn$_invoke$arity$1(v);
}),cljs.core.deref.call(null,figwheel.client.file_reloading.figwheel_meta_pragmas)));
});
figwheel.client.file_reloading.reload_js_files = (function figwheel$client$file_reloading$reload_js_files(p__30268,p__30269){
var map__30270 = p__30268;
var map__30270__$1 = (((((!((map__30270 == null))))?(((((map__30270.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__30270.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__30270):map__30270);
var opts = map__30270__$1;
var before_jsload = cljs.core.get.call(null,map__30270__$1,new cljs.core.Keyword(null,"before-jsload","before-jsload",-847513128));
var on_jsload = cljs.core.get.call(null,map__30270__$1,new cljs.core.Keyword(null,"on-jsload","on-jsload",-395756602));
var reload_dependents = cljs.core.get.call(null,map__30270__$1,new cljs.core.Keyword(null,"reload-dependents","reload-dependents",-956865430));
var map__30271 = p__30269;
var map__30271__$1 = (((((!((map__30271 == null))))?(((((map__30271.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__30271.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__30271):map__30271);
var msg = map__30271__$1;
var files = cljs.core.get.call(null,map__30271__$1,new cljs.core.Keyword(null,"files","files",-472457450));
var figwheel_meta = cljs.core.get.call(null,map__30271__$1,new cljs.core.Keyword(null,"figwheel-meta","figwheel-meta",-225970237));
var recompile_dependents = cljs.core.get.call(null,map__30271__$1,new cljs.core.Keyword(null,"recompile-dependents","recompile-dependents",523804171));
if(cljs.core.empty_QMARK_.call(null,figwheel_meta)){
} else {
cljs.core.reset_BANG_.call(null,figwheel.client.file_reloading.figwheel_meta_pragmas,figwheel_meta);
}

var c__26681__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26682__auto__ = (function (){var switch__26586__auto__ = (function (state_30425){
var state_val_30426 = (state_30425[(1)]);
if((state_val_30426 === (7))){
var inst_30287 = (state_30425[(7)]);
var inst_30285 = (state_30425[(8)]);
var inst_30288 = (state_30425[(9)]);
var inst_30286 = (state_30425[(10)]);
var inst_30293 = cljs.core._nth.call(null,inst_30286,inst_30288);
var inst_30294 = figwheel.client.file_reloading.eval_body.call(null,inst_30293,opts);
var inst_30295 = (inst_30288 + (1));
var tmp30427 = inst_30287;
var tmp30428 = inst_30285;
var tmp30429 = inst_30286;
var inst_30285__$1 = tmp30428;
var inst_30286__$1 = tmp30429;
var inst_30287__$1 = tmp30427;
var inst_30288__$1 = inst_30295;
var state_30425__$1 = (function (){var statearr_30430 = state_30425;
(statearr_30430[(7)] = inst_30287__$1);

(statearr_30430[(8)] = inst_30285__$1);

(statearr_30430[(9)] = inst_30288__$1);

(statearr_30430[(11)] = inst_30294);

(statearr_30430[(10)] = inst_30286__$1);

return statearr_30430;
})();
var statearr_30431_30514 = state_30425__$1;
(statearr_30431_30514[(2)] = null);

(statearr_30431_30514[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30426 === (20))){
var inst_30328 = (state_30425[(12)]);
var inst_30336 = figwheel.client.file_reloading.sort_files.call(null,inst_30328);
var state_30425__$1 = state_30425;
var statearr_30432_30515 = state_30425__$1;
(statearr_30432_30515[(2)] = inst_30336);

(statearr_30432_30515[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30426 === (27))){
var state_30425__$1 = state_30425;
var statearr_30433_30516 = state_30425__$1;
(statearr_30433_30516[(2)] = null);

(statearr_30433_30516[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30426 === (1))){
var inst_30277 = (state_30425[(13)]);
var inst_30274 = before_jsload.call(null,files);
var inst_30275 = figwheel.client.file_reloading.before_jsload_custom_event.call(null,files);
var inst_30276 = (function (){return (function (p1__30265_SHARP_){
return new cljs.core.Keyword(null,"eval-body","eval-body",-907279883).cljs$core$IFn$_invoke$arity$1(p1__30265_SHARP_);
});
})();
var inst_30277__$1 = cljs.core.filter.call(null,inst_30276,files);
var inst_30278 = cljs.core.not_empty.call(null,inst_30277__$1);
var state_30425__$1 = (function (){var statearr_30434 = state_30425;
(statearr_30434[(13)] = inst_30277__$1);

(statearr_30434[(14)] = inst_30275);

(statearr_30434[(15)] = inst_30274);

return statearr_30434;
})();
if(cljs.core.truth_(inst_30278)){
var statearr_30435_30517 = state_30425__$1;
(statearr_30435_30517[(1)] = (2));

} else {
var statearr_30436_30518 = state_30425__$1;
(statearr_30436_30518[(1)] = (3));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30426 === (24))){
var state_30425__$1 = state_30425;
var statearr_30437_30519 = state_30425__$1;
(statearr_30437_30519[(2)] = null);

(statearr_30437_30519[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30426 === (39))){
var inst_30378 = (state_30425[(16)]);
var state_30425__$1 = state_30425;
var statearr_30438_30520 = state_30425__$1;
(statearr_30438_30520[(2)] = inst_30378);

(statearr_30438_30520[(1)] = (40));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30426 === (46))){
var inst_30420 = (state_30425[(2)]);
var state_30425__$1 = state_30425;
var statearr_30439_30521 = state_30425__$1;
(statearr_30439_30521[(2)] = inst_30420);

(statearr_30439_30521[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30426 === (4))){
var inst_30322 = (state_30425[(2)]);
var inst_30323 = cljs.core.List.EMPTY;
var inst_30324 = cljs.core.reset_BANG_.call(null,figwheel.client.file_reloading.dependencies_loaded,inst_30323);
var inst_30325 = (function (){return (function (p1__30266_SHARP_){
var and__4174__auto__ = new cljs.core.Keyword(null,"namespace","namespace",-377510372).cljs$core$IFn$_invoke$arity$1(p1__30266_SHARP_);
if(cljs.core.truth_(and__4174__auto__)){
return ((cljs.core.not.call(null,new cljs.core.Keyword(null,"eval-body","eval-body",-907279883).cljs$core$IFn$_invoke$arity$1(p1__30266_SHARP_))) && (cljs.core.not.call(null,figwheel.client.file_reloading.figwheel_no_load_QMARK_.call(null,p1__30266_SHARP_))));
} else {
return and__4174__auto__;
}
});
})();
var inst_30326 = cljs.core.filter.call(null,inst_30325,files);
var inst_30327 = figwheel.client.file_reloading.get_figwheel_always.call(null);
var inst_30328 = cljs.core.concat.call(null,inst_30326,inst_30327);
var state_30425__$1 = (function (){var statearr_30440 = state_30425;
(statearr_30440[(17)] = inst_30322);

(statearr_30440[(12)] = inst_30328);

(statearr_30440[(18)] = inst_30324);

return statearr_30440;
})();
if(cljs.core.truth_(reload_dependents)){
var statearr_30441_30522 = state_30425__$1;
(statearr_30441_30522[(1)] = (16));

} else {
var statearr_30442_30523 = state_30425__$1;
(statearr_30442_30523[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30426 === (15))){
var inst_30312 = (state_30425[(2)]);
var state_30425__$1 = state_30425;
var statearr_30443_30524 = state_30425__$1;
(statearr_30443_30524[(2)] = inst_30312);

(statearr_30443_30524[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30426 === (21))){
var inst_30338 = (state_30425[(19)]);
var inst_30338__$1 = (state_30425[(2)]);
var inst_30339 = figwheel.client.file_reloading.load_all_js_files.call(null,inst_30338__$1);
var state_30425__$1 = (function (){var statearr_30444 = state_30425;
(statearr_30444[(19)] = inst_30338__$1);

return statearr_30444;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_30425__$1,(22),inst_30339);
} else {
if((state_val_30426 === (31))){
var inst_30423 = (state_30425[(2)]);
var state_30425__$1 = state_30425;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_30425__$1,inst_30423);
} else {
if((state_val_30426 === (32))){
var inst_30378 = (state_30425[(16)]);
var inst_30383 = inst_30378.cljs$lang$protocol_mask$partition0$;
var inst_30384 = (inst_30383 & (64));
var inst_30385 = inst_30378.cljs$core$ISeq$;
var inst_30386 = (cljs.core.PROTOCOL_SENTINEL === inst_30385);
var inst_30387 = ((inst_30384) || (inst_30386));
var state_30425__$1 = state_30425;
if(cljs.core.truth_(inst_30387)){
var statearr_30445_30525 = state_30425__$1;
(statearr_30445_30525[(1)] = (35));

} else {
var statearr_30446_30526 = state_30425__$1;
(statearr_30446_30526[(1)] = (36));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30426 === (40))){
var inst_30400 = (state_30425[(20)]);
var inst_30399 = (state_30425[(2)]);
var inst_30400__$1 = cljs.core.get.call(null,inst_30399,new cljs.core.Keyword(null,"figwheel-no-load","figwheel-no-load",-555840179));
var inst_30401 = cljs.core.get.call(null,inst_30399,new cljs.core.Keyword(null,"not-required","not-required",-950359114));
var inst_30402 = cljs.core.not_empty.call(null,inst_30400__$1);
var state_30425__$1 = (function (){var statearr_30447 = state_30425;
(statearr_30447[(20)] = inst_30400__$1);

(statearr_30447[(21)] = inst_30401);

return statearr_30447;
})();
if(cljs.core.truth_(inst_30402)){
var statearr_30448_30527 = state_30425__$1;
(statearr_30448_30527[(1)] = (41));

} else {
var statearr_30449_30528 = state_30425__$1;
(statearr_30449_30528[(1)] = (42));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30426 === (33))){
var state_30425__$1 = state_30425;
var statearr_30450_30529 = state_30425__$1;
(statearr_30450_30529[(2)] = false);

(statearr_30450_30529[(1)] = (34));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30426 === (13))){
var inst_30298 = (state_30425[(22)]);
var inst_30302 = cljs.core.chunk_first.call(null,inst_30298);
var inst_30303 = cljs.core.chunk_rest.call(null,inst_30298);
var inst_30304 = cljs.core.count.call(null,inst_30302);
var inst_30285 = inst_30303;
var inst_30286 = inst_30302;
var inst_30287 = inst_30304;
var inst_30288 = (0);
var state_30425__$1 = (function (){var statearr_30451 = state_30425;
(statearr_30451[(7)] = inst_30287);

(statearr_30451[(8)] = inst_30285);

(statearr_30451[(9)] = inst_30288);

(statearr_30451[(10)] = inst_30286);

return statearr_30451;
})();
var statearr_30452_30530 = state_30425__$1;
(statearr_30452_30530[(2)] = null);

(statearr_30452_30530[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30426 === (22))){
var inst_30342 = (state_30425[(23)]);
var inst_30338 = (state_30425[(19)]);
var inst_30346 = (state_30425[(24)]);
var inst_30341 = (state_30425[(25)]);
var inst_30341__$1 = (state_30425[(2)]);
var inst_30342__$1 = cljs.core.filter.call(null,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375),inst_30341__$1);
var inst_30343 = (function (){var all_files = inst_30338;
var res_SINGLEQUOTE_ = inst_30341__$1;
var res = inst_30342__$1;
return (function (p1__30267_SHARP_){
return cljs.core.not.call(null,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375).cljs$core$IFn$_invoke$arity$1(p1__30267_SHARP_));
});
})();
var inst_30344 = cljs.core.filter.call(null,inst_30343,inst_30341__$1);
var inst_30345 = cljs.core.deref.call(null,figwheel.client.file_reloading.dependencies_loaded);
var inst_30346__$1 = cljs.core.filter.call(null,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375),inst_30345);
var inst_30347 = cljs.core.not_empty.call(null,inst_30346__$1);
var state_30425__$1 = (function (){var statearr_30453 = state_30425;
(statearr_30453[(26)] = inst_30344);

(statearr_30453[(23)] = inst_30342__$1);

(statearr_30453[(24)] = inst_30346__$1);

(statearr_30453[(25)] = inst_30341__$1);

return statearr_30453;
})();
if(cljs.core.truth_(inst_30347)){
var statearr_30454_30531 = state_30425__$1;
(statearr_30454_30531[(1)] = (23));

} else {
var statearr_30455_30532 = state_30425__$1;
(statearr_30455_30532[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30426 === (36))){
var state_30425__$1 = state_30425;
var statearr_30456_30533 = state_30425__$1;
(statearr_30456_30533[(2)] = false);

(statearr_30456_30533[(1)] = (37));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30426 === (41))){
var inst_30400 = (state_30425[(20)]);
var inst_30404 = cljs.core.comp.call(null,figwheel.client.file_reloading.name__GT_path,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
var inst_30405 = cljs.core.map.call(null,inst_30404,inst_30400);
var inst_30406 = cljs.core.pr_str.call(null,inst_30405);
var inst_30407 = ["figwheel-no-load meta-data: ",inst_30406].join('');
var inst_30408 = figwheel.client.utils.log.call(null,inst_30407);
var state_30425__$1 = state_30425;
var statearr_30457_30534 = state_30425__$1;
(statearr_30457_30534[(2)] = inst_30408);

(statearr_30457_30534[(1)] = (43));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30426 === (43))){
var inst_30401 = (state_30425[(21)]);
var inst_30411 = (state_30425[(2)]);
var inst_30412 = cljs.core.not_empty.call(null,inst_30401);
var state_30425__$1 = (function (){var statearr_30458 = state_30425;
(statearr_30458[(27)] = inst_30411);

return statearr_30458;
})();
if(cljs.core.truth_(inst_30412)){
var statearr_30459_30535 = state_30425__$1;
(statearr_30459_30535[(1)] = (44));

} else {
var statearr_30460_30536 = state_30425__$1;
(statearr_30460_30536[(1)] = (45));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30426 === (29))){
var inst_30344 = (state_30425[(26)]);
var inst_30378 = (state_30425[(16)]);
var inst_30342 = (state_30425[(23)]);
var inst_30338 = (state_30425[(19)]);
var inst_30346 = (state_30425[(24)]);
var inst_30341 = (state_30425[(25)]);
var inst_30374 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: NOT loading these files ");
var inst_30377 = (function (){var all_files = inst_30338;
var res_SINGLEQUOTE_ = inst_30341;
var res = inst_30342;
var files_not_loaded = inst_30344;
var dependencies_that_loaded = inst_30346;
return (function (p__30376){
var map__30461 = p__30376;
var map__30461__$1 = (((((!((map__30461 == null))))?(((((map__30461.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__30461.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__30461):map__30461);
var namespace = cljs.core.get.call(null,map__30461__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
var meta_data = cljs.core.get.call(null,cljs.core.deref.call(null,figwheel.client.file_reloading.figwheel_meta_pragmas),cljs.core.name.call(null,namespace));
if((meta_data == null)){
return new cljs.core.Keyword(null,"not-required","not-required",-950359114);
} else {
if(cljs.core.truth_(meta_data.call(null,new cljs.core.Keyword(null,"figwheel-no-load","figwheel-no-load",-555840179)))){
return new cljs.core.Keyword(null,"figwheel-no-load","figwheel-no-load",-555840179);
} else {
return new cljs.core.Keyword(null,"not-required","not-required",-950359114);

}
}
});
})();
var inst_30378__$1 = cljs.core.group_by.call(null,inst_30377,inst_30344);
var inst_30380 = (inst_30378__$1 == null);
var inst_30381 = cljs.core.not.call(null,inst_30380);
var state_30425__$1 = (function (){var statearr_30463 = state_30425;
(statearr_30463[(16)] = inst_30378__$1);

(statearr_30463[(28)] = inst_30374);

return statearr_30463;
})();
if(inst_30381){
var statearr_30464_30537 = state_30425__$1;
(statearr_30464_30537[(1)] = (32));

} else {
var statearr_30465_30538 = state_30425__$1;
(statearr_30465_30538[(1)] = (33));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30426 === (44))){
var inst_30401 = (state_30425[(21)]);
var inst_30414 = cljs.core.map.call(null,new cljs.core.Keyword(null,"file","file",-1269645878),inst_30401);
var inst_30415 = cljs.core.pr_str.call(null,inst_30414);
var inst_30416 = ["not required: ",inst_30415].join('');
var inst_30417 = figwheel.client.utils.log.call(null,inst_30416);
var state_30425__$1 = state_30425;
var statearr_30466_30539 = state_30425__$1;
(statearr_30466_30539[(2)] = inst_30417);

(statearr_30466_30539[(1)] = (46));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30426 === (6))){
var inst_30319 = (state_30425[(2)]);
var state_30425__$1 = state_30425;
var statearr_30467_30540 = state_30425__$1;
(statearr_30467_30540[(2)] = inst_30319);

(statearr_30467_30540[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30426 === (28))){
var inst_30344 = (state_30425[(26)]);
var inst_30371 = (state_30425[(2)]);
var inst_30372 = cljs.core.not_empty.call(null,inst_30344);
var state_30425__$1 = (function (){var statearr_30468 = state_30425;
(statearr_30468[(29)] = inst_30371);

return statearr_30468;
})();
if(cljs.core.truth_(inst_30372)){
var statearr_30469_30541 = state_30425__$1;
(statearr_30469_30541[(1)] = (29));

} else {
var statearr_30470_30542 = state_30425__$1;
(statearr_30470_30542[(1)] = (30));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30426 === (25))){
var inst_30342 = (state_30425[(23)]);
var inst_30358 = (state_30425[(2)]);
var inst_30359 = cljs.core.not_empty.call(null,inst_30342);
var state_30425__$1 = (function (){var statearr_30471 = state_30425;
(statearr_30471[(30)] = inst_30358);

return statearr_30471;
})();
if(cljs.core.truth_(inst_30359)){
var statearr_30472_30543 = state_30425__$1;
(statearr_30472_30543[(1)] = (26));

} else {
var statearr_30473_30544 = state_30425__$1;
(statearr_30473_30544[(1)] = (27));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30426 === (34))){
var inst_30394 = (state_30425[(2)]);
var state_30425__$1 = state_30425;
if(cljs.core.truth_(inst_30394)){
var statearr_30474_30545 = state_30425__$1;
(statearr_30474_30545[(1)] = (38));

} else {
var statearr_30475_30546 = state_30425__$1;
(statearr_30475_30546[(1)] = (39));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30426 === (17))){
var state_30425__$1 = state_30425;
var statearr_30476_30547 = state_30425__$1;
(statearr_30476_30547[(2)] = recompile_dependents);

(statearr_30476_30547[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30426 === (3))){
var state_30425__$1 = state_30425;
var statearr_30477_30548 = state_30425__$1;
(statearr_30477_30548[(2)] = null);

(statearr_30477_30548[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30426 === (12))){
var inst_30315 = (state_30425[(2)]);
var state_30425__$1 = state_30425;
var statearr_30478_30549 = state_30425__$1;
(statearr_30478_30549[(2)] = inst_30315);

(statearr_30478_30549[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30426 === (2))){
var inst_30277 = (state_30425[(13)]);
var inst_30284 = cljs.core.seq.call(null,inst_30277);
var inst_30285 = inst_30284;
var inst_30286 = null;
var inst_30287 = (0);
var inst_30288 = (0);
var state_30425__$1 = (function (){var statearr_30479 = state_30425;
(statearr_30479[(7)] = inst_30287);

(statearr_30479[(8)] = inst_30285);

(statearr_30479[(9)] = inst_30288);

(statearr_30479[(10)] = inst_30286);

return statearr_30479;
})();
var statearr_30480_30550 = state_30425__$1;
(statearr_30480_30550[(2)] = null);

(statearr_30480_30550[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30426 === (23))){
var inst_30344 = (state_30425[(26)]);
var inst_30342 = (state_30425[(23)]);
var inst_30338 = (state_30425[(19)]);
var inst_30346 = (state_30425[(24)]);
var inst_30341 = (state_30425[(25)]);
var inst_30349 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: loaded these dependencies");
var inst_30351 = (function (){var all_files = inst_30338;
var res_SINGLEQUOTE_ = inst_30341;
var res = inst_30342;
var files_not_loaded = inst_30344;
var dependencies_that_loaded = inst_30346;
return (function (p__30350){
var map__30481 = p__30350;
var map__30481__$1 = (((((!((map__30481 == null))))?(((((map__30481.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__30481.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__30481):map__30481);
var request_url = cljs.core.get.call(null,map__30481__$1,new cljs.core.Keyword(null,"request-url","request-url",2100346596));
return clojure.string.replace.call(null,request_url,goog.basePath,"");
});
})();
var inst_30352 = cljs.core.reverse.call(null,inst_30346);
var inst_30353 = cljs.core.map.call(null,inst_30351,inst_30352);
var inst_30354 = cljs.core.pr_str.call(null,inst_30353);
var inst_30355 = figwheel.client.utils.log.call(null,inst_30354);
var state_30425__$1 = (function (){var statearr_30483 = state_30425;
(statearr_30483[(31)] = inst_30349);

return statearr_30483;
})();
var statearr_30484_30551 = state_30425__$1;
(statearr_30484_30551[(2)] = inst_30355);

(statearr_30484_30551[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30426 === (35))){
var state_30425__$1 = state_30425;
var statearr_30485_30552 = state_30425__$1;
(statearr_30485_30552[(2)] = true);

(statearr_30485_30552[(1)] = (37));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30426 === (19))){
var inst_30328 = (state_30425[(12)]);
var inst_30334 = figwheel.client.file_reloading.expand_files.call(null,inst_30328);
var state_30425__$1 = state_30425;
var statearr_30486_30553 = state_30425__$1;
(statearr_30486_30553[(2)] = inst_30334);

(statearr_30486_30553[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30426 === (11))){
var state_30425__$1 = state_30425;
var statearr_30487_30554 = state_30425__$1;
(statearr_30487_30554[(2)] = null);

(statearr_30487_30554[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30426 === (9))){
var inst_30317 = (state_30425[(2)]);
var state_30425__$1 = state_30425;
var statearr_30488_30555 = state_30425__$1;
(statearr_30488_30555[(2)] = inst_30317);

(statearr_30488_30555[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30426 === (5))){
var inst_30287 = (state_30425[(7)]);
var inst_30288 = (state_30425[(9)]);
var inst_30290 = (inst_30288 < inst_30287);
var inst_30291 = inst_30290;
var state_30425__$1 = state_30425;
if(cljs.core.truth_(inst_30291)){
var statearr_30489_30556 = state_30425__$1;
(statearr_30489_30556[(1)] = (7));

} else {
var statearr_30490_30557 = state_30425__$1;
(statearr_30490_30557[(1)] = (8));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30426 === (14))){
var inst_30298 = (state_30425[(22)]);
var inst_30307 = cljs.core.first.call(null,inst_30298);
var inst_30308 = figwheel.client.file_reloading.eval_body.call(null,inst_30307,opts);
var inst_30309 = cljs.core.next.call(null,inst_30298);
var inst_30285 = inst_30309;
var inst_30286 = null;
var inst_30287 = (0);
var inst_30288 = (0);
var state_30425__$1 = (function (){var statearr_30491 = state_30425;
(statearr_30491[(7)] = inst_30287);

(statearr_30491[(8)] = inst_30285);

(statearr_30491[(9)] = inst_30288);

(statearr_30491[(32)] = inst_30308);

(statearr_30491[(10)] = inst_30286);

return statearr_30491;
})();
var statearr_30492_30558 = state_30425__$1;
(statearr_30492_30558[(2)] = null);

(statearr_30492_30558[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30426 === (45))){
var state_30425__$1 = state_30425;
var statearr_30493_30559 = state_30425__$1;
(statearr_30493_30559[(2)] = null);

(statearr_30493_30559[(1)] = (46));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30426 === (26))){
var inst_30344 = (state_30425[(26)]);
var inst_30342 = (state_30425[(23)]);
var inst_30338 = (state_30425[(19)]);
var inst_30346 = (state_30425[(24)]);
var inst_30341 = (state_30425[(25)]);
var inst_30361 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: loaded these files");
var inst_30363 = (function (){var all_files = inst_30338;
var res_SINGLEQUOTE_ = inst_30341;
var res = inst_30342;
var files_not_loaded = inst_30344;
var dependencies_that_loaded = inst_30346;
return (function (p__30362){
var map__30494 = p__30362;
var map__30494__$1 = (((((!((map__30494 == null))))?(((((map__30494.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__30494.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__30494):map__30494);
var namespace = cljs.core.get.call(null,map__30494__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
var file = cljs.core.get.call(null,map__30494__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
if(cljs.core.truth_(namespace)){
return figwheel.client.file_reloading.name__GT_path.call(null,cljs.core.name.call(null,namespace));
} else {
return file;
}
});
})();
var inst_30364 = cljs.core.map.call(null,inst_30363,inst_30342);
var inst_30365 = cljs.core.pr_str.call(null,inst_30364);
var inst_30366 = figwheel.client.utils.log.call(null,inst_30365);
var inst_30367 = (function (){var all_files = inst_30338;
var res_SINGLEQUOTE_ = inst_30341;
var res = inst_30342;
var files_not_loaded = inst_30344;
var dependencies_that_loaded = inst_30346;
return (function (){
figwheel.client.file_reloading.on_jsload_custom_event.call(null,res);

return cljs.core.apply.call(null,on_jsload,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [res], null));
});
})();
var inst_30368 = setTimeout(inst_30367,(10));
var state_30425__$1 = (function (){var statearr_30496 = state_30425;
(statearr_30496[(33)] = inst_30361);

(statearr_30496[(34)] = inst_30366);

return statearr_30496;
})();
var statearr_30497_30560 = state_30425__$1;
(statearr_30497_30560[(2)] = inst_30368);

(statearr_30497_30560[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30426 === (16))){
var state_30425__$1 = state_30425;
var statearr_30498_30561 = state_30425__$1;
(statearr_30498_30561[(2)] = reload_dependents);

(statearr_30498_30561[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30426 === (38))){
var inst_30378 = (state_30425[(16)]);
var inst_30396 = cljs.core.apply.call(null,cljs.core.hash_map,inst_30378);
var state_30425__$1 = state_30425;
var statearr_30499_30562 = state_30425__$1;
(statearr_30499_30562[(2)] = inst_30396);

(statearr_30499_30562[(1)] = (40));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30426 === (30))){
var state_30425__$1 = state_30425;
var statearr_30500_30563 = state_30425__$1;
(statearr_30500_30563[(2)] = null);

(statearr_30500_30563[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30426 === (10))){
var inst_30298 = (state_30425[(22)]);
var inst_30300 = cljs.core.chunked_seq_QMARK_.call(null,inst_30298);
var state_30425__$1 = state_30425;
if(inst_30300){
var statearr_30501_30564 = state_30425__$1;
(statearr_30501_30564[(1)] = (13));

} else {
var statearr_30502_30565 = state_30425__$1;
(statearr_30502_30565[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30426 === (18))){
var inst_30332 = (state_30425[(2)]);
var state_30425__$1 = state_30425;
if(cljs.core.truth_(inst_30332)){
var statearr_30503_30566 = state_30425__$1;
(statearr_30503_30566[(1)] = (19));

} else {
var statearr_30504_30567 = state_30425__$1;
(statearr_30504_30567[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30426 === (42))){
var state_30425__$1 = state_30425;
var statearr_30505_30568 = state_30425__$1;
(statearr_30505_30568[(2)] = null);

(statearr_30505_30568[(1)] = (43));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30426 === (37))){
var inst_30391 = (state_30425[(2)]);
var state_30425__$1 = state_30425;
var statearr_30506_30569 = state_30425__$1;
(statearr_30506_30569[(2)] = inst_30391);

(statearr_30506_30569[(1)] = (34));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30426 === (8))){
var inst_30285 = (state_30425[(8)]);
var inst_30298 = (state_30425[(22)]);
var inst_30298__$1 = cljs.core.seq.call(null,inst_30285);
var state_30425__$1 = (function (){var statearr_30507 = state_30425;
(statearr_30507[(22)] = inst_30298__$1);

return statearr_30507;
})();
if(inst_30298__$1){
var statearr_30508_30570 = state_30425__$1;
(statearr_30508_30570[(1)] = (10));

} else {
var statearr_30509_30571 = state_30425__$1;
(statearr_30509_30571[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var figwheel$client$file_reloading$reload_js_files_$_state_machine__26587__auto__ = null;
var figwheel$client$file_reloading$reload_js_files_$_state_machine__26587__auto____0 = (function (){
var statearr_30510 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_30510[(0)] = figwheel$client$file_reloading$reload_js_files_$_state_machine__26587__auto__);

(statearr_30510[(1)] = (1));

return statearr_30510;
});
var figwheel$client$file_reloading$reload_js_files_$_state_machine__26587__auto____1 = (function (state_30425){
while(true){
var ret_value__26588__auto__ = (function (){try{while(true){
var result__26589__auto__ = switch__26586__auto__.call(null,state_30425);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26589__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26589__auto__;
}
break;
}
}catch (e30511){if((e30511 instanceof Object)){
var ex__26590__auto__ = e30511;
var statearr_30512_30572 = state_30425;
(statearr_30512_30572[(5)] = ex__26590__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_30425);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e30511;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26588__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__30573 = state_30425;
state_30425 = G__30573;
continue;
} else {
return ret_value__26588__auto__;
}
break;
}
});
figwheel$client$file_reloading$reload_js_files_$_state_machine__26587__auto__ = function(state_30425){
switch(arguments.length){
case 0:
return figwheel$client$file_reloading$reload_js_files_$_state_machine__26587__auto____0.call(this);
case 1:
return figwheel$client$file_reloading$reload_js_files_$_state_machine__26587__auto____1.call(this,state_30425);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloading$reload_js_files_$_state_machine__26587__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloading$reload_js_files_$_state_machine__26587__auto____0;
figwheel$client$file_reloading$reload_js_files_$_state_machine__26587__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloading$reload_js_files_$_state_machine__26587__auto____1;
return figwheel$client$file_reloading$reload_js_files_$_state_machine__26587__auto__;
})()
})();
var state__26683__auto__ = (function (){var statearr_30513 = f__26682__auto__.call(null);
(statearr_30513[(6)] = c__26681__auto__);

return statearr_30513;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26683__auto__);
}));

return c__26681__auto__;
});
figwheel.client.file_reloading.current_links = (function figwheel$client$file_reloading$current_links(){
return Array.prototype.slice.call(document.getElementsByTagName("link"));
});
figwheel.client.file_reloading.truncate_url = (function figwheel$client$file_reloading$truncate_url(url){
return clojure.string.replace_first.call(null,clojure.string.replace_first.call(null,clojure.string.replace_first.call(null,clojure.string.replace_first.call(null,cljs.core.first.call(null,clojure.string.split.call(null,url,/\?/)),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(location.protocol),"//"].join(''),""),".*://",""),/^\/\//,""),/[^\\/]*/,"");
});
figwheel.client.file_reloading.matches_file_QMARK_ = (function figwheel$client$file_reloading$matches_file_QMARK_(p__30576,link){
var map__30577 = p__30576;
var map__30577__$1 = (((((!((map__30577 == null))))?(((((map__30577.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__30577.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__30577):map__30577);
var file = cljs.core.get.call(null,map__30577__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
var temp__5735__auto__ = link.href;
if(cljs.core.truth_(temp__5735__auto__)){
var link_href = temp__5735__auto__;
var match = clojure.string.join.call(null,"/",cljs.core.take_while.call(null,cljs.core.identity,cljs.core.map.call(null,(function (p1__30574_SHARP_,p2__30575_SHARP_){
if(cljs.core._EQ_.call(null,p1__30574_SHARP_,p2__30575_SHARP_)){
return p1__30574_SHARP_;
} else {
return false;
}
}),cljs.core.reverse.call(null,clojure.string.split.call(null,file,"/")),cljs.core.reverse.call(null,clojure.string.split.call(null,figwheel.client.file_reloading.truncate_url.call(null,link_href),"/")))));
var match_length = ((match).length);
var file_name_length = cljs.core.count.call(null,cljs.core.last.call(null,clojure.string.split.call(null,file,"/")));
if((match_length >= file_name_length)){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"link","link",-1769163468),link,new cljs.core.Keyword(null,"link-href","link-href",-250644450),link_href,new cljs.core.Keyword(null,"match-length","match-length",1101537310),match_length,new cljs.core.Keyword(null,"current-url-length","current-url-length",380404083),((figwheel.client.file_reloading.truncate_url.call(null,link_href)).length)], null);
} else {
return null;
}
} else {
return null;
}
});
figwheel.client.file_reloading.get_correct_link = (function figwheel$client$file_reloading$get_correct_link(f_data){
var temp__5735__auto__ = cljs.core.first.call(null,cljs.core.sort_by.call(null,(function (p__30580){
var map__30581 = p__30580;
var map__30581__$1 = (((((!((map__30581 == null))))?(((((map__30581.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__30581.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__30581):map__30581);
var match_length = cljs.core.get.call(null,map__30581__$1,new cljs.core.Keyword(null,"match-length","match-length",1101537310));
var current_url_length = cljs.core.get.call(null,map__30581__$1,new cljs.core.Keyword(null,"current-url-length","current-url-length",380404083));
return (current_url_length - match_length);
}),cljs.core.keep.call(null,(function (p1__30579_SHARP_){
return figwheel.client.file_reloading.matches_file_QMARK_.call(null,f_data,p1__30579_SHARP_);
}),figwheel.client.file_reloading.current_links.call(null))));
if(cljs.core.truth_(temp__5735__auto__)){
var res = temp__5735__auto__;
return new cljs.core.Keyword(null,"link","link",-1769163468).cljs$core$IFn$_invoke$arity$1(res);
} else {
return null;
}
});
figwheel.client.file_reloading.clone_link = (function figwheel$client$file_reloading$clone_link(link,url){
var clone = document.createElement("link");
(clone.rel = "stylesheet");

(clone.media = link.media);

(clone.disabled = link.disabled);

(clone.href = figwheel.client.file_reloading.add_cache_buster.call(null,url));

return clone;
});
figwheel.client.file_reloading.create_link = (function figwheel$client$file_reloading$create_link(url){
var link = document.createElement("link");
(link.rel = "stylesheet");

(link.href = figwheel.client.file_reloading.add_cache_buster.call(null,url));

return link;
});
figwheel.client.file_reloading.distinctify = (function figwheel$client$file_reloading$distinctify(key,seqq){
return cljs.core.vals.call(null,cljs.core.reduce.call(null,(function (p1__30583_SHARP_,p2__30584_SHARP_){
return cljs.core.assoc.call(null,p1__30583_SHARP_,cljs.core.get.call(null,p2__30584_SHARP_,key),p2__30584_SHARP_);
}),cljs.core.PersistentArrayMap.EMPTY,seqq));
});
figwheel.client.file_reloading.add_link_to_document = (function figwheel$client$file_reloading$add_link_to_document(orig_link,klone,finished_fn){
var parent = orig_link.parentNode;
if(cljs.core._EQ_.call(null,orig_link,parent.lastChild)){
parent.appendChild(klone);
} else {
parent.insertBefore(klone,orig_link.nextSibling);
}

return setTimeout((function (){
parent.removeChild(orig_link);

return finished_fn.call(null);
}),(300));
});
if((typeof figwheel !== 'undefined') && (typeof figwheel.client !== 'undefined') && (typeof figwheel.client.file_reloading !== 'undefined') && (typeof figwheel.client.file_reloading.reload_css_deferred_chain !== 'undefined')){
} else {
figwheel.client.file_reloading.reload_css_deferred_chain = cljs.core.atom.call(null,goog.async.Deferred.succeed());
}
figwheel.client.file_reloading.reload_css_file = (function figwheel$client$file_reloading$reload_css_file(f_data,fin){
var temp__5733__auto__ = figwheel.client.file_reloading.get_correct_link.call(null,f_data);
if(cljs.core.truth_(temp__5733__auto__)){
var link = temp__5733__auto__;
return figwheel.client.file_reloading.add_link_to_document.call(null,link,figwheel.client.file_reloading.clone_link.call(null,link,link.href),(function (){
return fin.call(null,cljs.core.assoc.call(null,f_data,new cljs.core.Keyword(null,"loaded","loaded",-1246482293),true));
}));
} else {
return fin.call(null,f_data);
}
});
figwheel.client.file_reloading.reload_css_files_STAR_ = (function figwheel$client$file_reloading$reload_css_files_STAR_(deferred,f_datas,on_cssload){
return figwheel.client.utils.liftContD.call(null,figwheel.client.utils.mapConcatD.call(null,deferred,figwheel.client.file_reloading.reload_css_file,f_datas),(function (f_datas_SINGLEQUOTE_,fin){
var loaded_f_datas_30585 = cljs.core.filter.call(null,new cljs.core.Keyword(null,"loaded","loaded",-1246482293),f_datas_SINGLEQUOTE_);
figwheel.client.file_reloading.on_cssload_custom_event.call(null,loaded_f_datas_30585);

if(cljs.core.fn_QMARK_.call(null,on_cssload)){
on_cssload.call(null,loaded_f_datas_30585);
} else {
}

return fin.call(null);
}));
});
figwheel.client.file_reloading.reload_css_files = (function figwheel$client$file_reloading$reload_css_files(p__30586,p__30587){
var map__30588 = p__30586;
var map__30588__$1 = (((((!((map__30588 == null))))?(((((map__30588.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__30588.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__30588):map__30588);
var on_cssload = cljs.core.get.call(null,map__30588__$1,new cljs.core.Keyword(null,"on-cssload","on-cssload",1825432318));
var map__30589 = p__30587;
var map__30589__$1 = (((((!((map__30589 == null))))?(((((map__30589.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__30589.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__30589):map__30589);
var files_msg = map__30589__$1;
var files = cljs.core.get.call(null,map__30589__$1,new cljs.core.Keyword(null,"files","files",-472457450));
if(figwheel.client.utils.html_env_QMARK_.call(null)){
var temp__5735__auto__ = cljs.core.not_empty.call(null,figwheel.client.file_reloading.distinctify.call(null,new cljs.core.Keyword(null,"file","file",-1269645878),files));
if(cljs.core.truth_(temp__5735__auto__)){
var f_datas = temp__5735__auto__;
return cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.reload_css_deferred_chain,figwheel.client.file_reloading.reload_css_files_STAR_,f_datas,on_cssload);
} else {
return null;
}
} else {
return null;
}
});

//# sourceMappingURL=file_reloading.js.map?rel=1587042625269

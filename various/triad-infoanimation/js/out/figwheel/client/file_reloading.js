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
return cljs.core.set.call(null,cljs.core.filter.call(null,(function (p1__29917_SHARP_){
return cljs.core.not.call(null,figwheel.client.file_reloading.immutable_ns_QMARK_.call(null,p1__29917_SHARP_));
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
var seq__29918 = cljs.core.seq.call(null,figwheel.client.file_reloading.path__GT_name.call(null,k));
var chunk__29919 = null;
var count__29920 = (0);
var i__29921 = (0);
while(true){
if((i__29921 < count__29920)){
var n = cljs.core._nth.call(null,chunk__29919,i__29921);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,k_SINGLEQUOTE_,n);


var G__29922 = seq__29918;
var G__29923 = chunk__29919;
var G__29924 = count__29920;
var G__29925 = (i__29921 + (1));
seq__29918 = G__29922;
chunk__29919 = G__29923;
count__29920 = G__29924;
i__29921 = G__29925;
continue;
} else {
var temp__5735__auto__ = cljs.core.seq.call(null,seq__29918);
if(temp__5735__auto__){
var seq__29918__$1 = temp__5735__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__29918__$1)){
var c__4609__auto__ = cljs.core.chunk_first.call(null,seq__29918__$1);
var G__29926 = cljs.core.chunk_rest.call(null,seq__29918__$1);
var G__29927 = c__4609__auto__;
var G__29928 = cljs.core.count.call(null,c__4609__auto__);
var G__29929 = (0);
seq__29918 = G__29926;
chunk__29919 = G__29927;
count__29920 = G__29928;
i__29921 = G__29929;
continue;
} else {
var n = cljs.core.first.call(null,seq__29918__$1);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,k_SINGLEQUOTE_,n);


var G__29930 = cljs.core.next.call(null,seq__29918__$1);
var G__29931 = null;
var G__29932 = (0);
var G__29933 = (0);
seq__29918 = G__29930;
chunk__29919 = G__29931;
count__29920 = G__29932;
i__29921 = G__29933;
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
return cljs.core.some.call(null,(function (p__29934){
var vec__29935 = p__29934;
var _ = cljs.core.nth.call(null,vec__29935,(0),null);
var v = cljs.core.nth.call(null,vec__29935,(1),null);
var and__4174__auto__ = v;
if(cljs.core.truth_(and__4174__auto__)){
return v.call(null,dep);
} else {
return and__4174__auto__;
}
}),cljs.core.filter.call(null,(function (p__29938){
var vec__29939 = p__29938;
var k = cljs.core.nth.call(null,vec__29939,(0),null);
var v = cljs.core.nth.call(null,vec__29939,(1),null);
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

var seq__29951_29959 = cljs.core.seq.call(null,deps);
var chunk__29952_29960 = null;
var count__29953_29961 = (0);
var i__29954_29962 = (0);
while(true){
if((i__29954_29962 < count__29953_29961)){
var dep_29963 = cljs.core._nth.call(null,chunk__29952_29960,i__29954_29962);
if(cljs.core.truth_((function (){var and__4174__auto__ = dep_29963;
if(cljs.core.truth_(and__4174__auto__)){
return cljs.core.not.call(null,figwheel.client.file_reloading.in_upper_level_QMARK_.call(null,cljs.core.deref.call(null,state),depth,dep_29963));
} else {
return and__4174__auto__;
}
})())){
topo_sort_helper_STAR_.call(null,dep_29963,(depth + (1)),state);
} else {
}


var G__29964 = seq__29951_29959;
var G__29965 = chunk__29952_29960;
var G__29966 = count__29953_29961;
var G__29967 = (i__29954_29962 + (1));
seq__29951_29959 = G__29964;
chunk__29952_29960 = G__29965;
count__29953_29961 = G__29966;
i__29954_29962 = G__29967;
continue;
} else {
var temp__5735__auto___29968 = cljs.core.seq.call(null,seq__29951_29959);
if(temp__5735__auto___29968){
var seq__29951_29969__$1 = temp__5735__auto___29968;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__29951_29969__$1)){
var c__4609__auto___29970 = cljs.core.chunk_first.call(null,seq__29951_29969__$1);
var G__29971 = cljs.core.chunk_rest.call(null,seq__29951_29969__$1);
var G__29972 = c__4609__auto___29970;
var G__29973 = cljs.core.count.call(null,c__4609__auto___29970);
var G__29974 = (0);
seq__29951_29959 = G__29971;
chunk__29952_29960 = G__29972;
count__29953_29961 = G__29973;
i__29954_29962 = G__29974;
continue;
} else {
var dep_29975 = cljs.core.first.call(null,seq__29951_29969__$1);
if(cljs.core.truth_((function (){var and__4174__auto__ = dep_29975;
if(cljs.core.truth_(and__4174__auto__)){
return cljs.core.not.call(null,figwheel.client.file_reloading.in_upper_level_QMARK_.call(null,cljs.core.deref.call(null,state),depth,dep_29975));
} else {
return and__4174__auto__;
}
})())){
topo_sort_helper_STAR_.call(null,dep_29975,(depth + (1)),state);
} else {
}


var G__29976 = cljs.core.next.call(null,seq__29951_29969__$1);
var G__29977 = null;
var G__29978 = (0);
var G__29979 = (0);
seq__29951_29959 = G__29976;
chunk__29952_29960 = G__29977;
count__29953_29961 = G__29978;
i__29954_29962 = G__29979;
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
var elim_dups_STAR_ = (function figwheel$client$file_reloading$build_topo_sort_$_elim_dups_STAR_(p__29955){
var vec__29956 = p__29955;
var seq__29957 = cljs.core.seq.call(null,vec__29956);
var first__29958 = cljs.core.first.call(null,seq__29957);
var seq__29957__$1 = cljs.core.next.call(null,seq__29957);
var x = first__29958;
var xs = seq__29957__$1;
if((x == null)){
return cljs.core.List.EMPTY;
} else {
return cljs.core.cons.call(null,x,figwheel$client$file_reloading$build_topo_sort_$_elim_dups_STAR_.call(null,cljs.core.map.call(null,(function (p1__29942_SHARP_){
return clojure.set.difference.call(null,p1__29942_SHARP_,x);
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
var seq__29980 = cljs.core.seq.call(null,provides);
var chunk__29981 = null;
var count__29982 = (0);
var i__29983 = (0);
while(true){
if((i__29983 < count__29982)){
var prov = cljs.core._nth.call(null,chunk__29981,i__29983);
figwheel.client.file_reloading.path_to_name_BANG_.call(null,path,prov);

var seq__29992_30000 = cljs.core.seq.call(null,requires);
var chunk__29993_30001 = null;
var count__29994_30002 = (0);
var i__29995_30003 = (0);
while(true){
if((i__29995_30003 < count__29994_30002)){
var req_30004 = cljs.core._nth.call(null,chunk__29993_30001,i__29995_30003);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,req_30004,prov);


var G__30005 = seq__29992_30000;
var G__30006 = chunk__29993_30001;
var G__30007 = count__29994_30002;
var G__30008 = (i__29995_30003 + (1));
seq__29992_30000 = G__30005;
chunk__29993_30001 = G__30006;
count__29994_30002 = G__30007;
i__29995_30003 = G__30008;
continue;
} else {
var temp__5735__auto___30009 = cljs.core.seq.call(null,seq__29992_30000);
if(temp__5735__auto___30009){
var seq__29992_30010__$1 = temp__5735__auto___30009;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__29992_30010__$1)){
var c__4609__auto___30011 = cljs.core.chunk_first.call(null,seq__29992_30010__$1);
var G__30012 = cljs.core.chunk_rest.call(null,seq__29992_30010__$1);
var G__30013 = c__4609__auto___30011;
var G__30014 = cljs.core.count.call(null,c__4609__auto___30011);
var G__30015 = (0);
seq__29992_30000 = G__30012;
chunk__29993_30001 = G__30013;
count__29994_30002 = G__30014;
i__29995_30003 = G__30015;
continue;
} else {
var req_30016 = cljs.core.first.call(null,seq__29992_30010__$1);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,req_30016,prov);


var G__30017 = cljs.core.next.call(null,seq__29992_30010__$1);
var G__30018 = null;
var G__30019 = (0);
var G__30020 = (0);
seq__29992_30000 = G__30017;
chunk__29993_30001 = G__30018;
count__29994_30002 = G__30019;
i__29995_30003 = G__30020;
continue;
}
} else {
}
}
break;
}


var G__30021 = seq__29980;
var G__30022 = chunk__29981;
var G__30023 = count__29982;
var G__30024 = (i__29983 + (1));
seq__29980 = G__30021;
chunk__29981 = G__30022;
count__29982 = G__30023;
i__29983 = G__30024;
continue;
} else {
var temp__5735__auto__ = cljs.core.seq.call(null,seq__29980);
if(temp__5735__auto__){
var seq__29980__$1 = temp__5735__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__29980__$1)){
var c__4609__auto__ = cljs.core.chunk_first.call(null,seq__29980__$1);
var G__30025 = cljs.core.chunk_rest.call(null,seq__29980__$1);
var G__30026 = c__4609__auto__;
var G__30027 = cljs.core.count.call(null,c__4609__auto__);
var G__30028 = (0);
seq__29980 = G__30025;
chunk__29981 = G__30026;
count__29982 = G__30027;
i__29983 = G__30028;
continue;
} else {
var prov = cljs.core.first.call(null,seq__29980__$1);
figwheel.client.file_reloading.path_to_name_BANG_.call(null,path,prov);

var seq__29996_30029 = cljs.core.seq.call(null,requires);
var chunk__29997_30030 = null;
var count__29998_30031 = (0);
var i__29999_30032 = (0);
while(true){
if((i__29999_30032 < count__29998_30031)){
var req_30033 = cljs.core._nth.call(null,chunk__29997_30030,i__29999_30032);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,req_30033,prov);


var G__30034 = seq__29996_30029;
var G__30035 = chunk__29997_30030;
var G__30036 = count__29998_30031;
var G__30037 = (i__29999_30032 + (1));
seq__29996_30029 = G__30034;
chunk__29997_30030 = G__30035;
count__29998_30031 = G__30036;
i__29999_30032 = G__30037;
continue;
} else {
var temp__5735__auto___30038__$1 = cljs.core.seq.call(null,seq__29996_30029);
if(temp__5735__auto___30038__$1){
var seq__29996_30039__$1 = temp__5735__auto___30038__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__29996_30039__$1)){
var c__4609__auto___30040 = cljs.core.chunk_first.call(null,seq__29996_30039__$1);
var G__30041 = cljs.core.chunk_rest.call(null,seq__29996_30039__$1);
var G__30042 = c__4609__auto___30040;
var G__30043 = cljs.core.count.call(null,c__4609__auto___30040);
var G__30044 = (0);
seq__29996_30029 = G__30041;
chunk__29997_30030 = G__30042;
count__29998_30031 = G__30043;
i__29999_30032 = G__30044;
continue;
} else {
var req_30045 = cljs.core.first.call(null,seq__29996_30039__$1);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,req_30045,prov);


var G__30046 = cljs.core.next.call(null,seq__29996_30039__$1);
var G__30047 = null;
var G__30048 = (0);
var G__30049 = (0);
seq__29996_30029 = G__30046;
chunk__29997_30030 = G__30047;
count__29998_30031 = G__30048;
i__29999_30032 = G__30049;
continue;
}
} else {
}
}
break;
}


var G__30050 = cljs.core.next.call(null,seq__29980__$1);
var G__30051 = null;
var G__30052 = (0);
var G__30053 = (0);
seq__29980 = G__30050;
chunk__29981 = G__30051;
count__29982 = G__30052;
i__29983 = G__30053;
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
var seq__30054_30058 = cljs.core.seq.call(null,figwheel.client.file_reloading.get_all_dependencies.call(null,src));
var chunk__30055_30059 = null;
var count__30056_30060 = (0);
var i__30057_30061 = (0);
while(true){
if((i__30057_30061 < count__30056_30060)){
var ns_30062 = cljs.core._nth.call(null,chunk__30055_30059,i__30057_30061);
figwheel.client.file_reloading.unprovide_BANG_.call(null,ns_30062);


var G__30063 = seq__30054_30058;
var G__30064 = chunk__30055_30059;
var G__30065 = count__30056_30060;
var G__30066 = (i__30057_30061 + (1));
seq__30054_30058 = G__30063;
chunk__30055_30059 = G__30064;
count__30056_30060 = G__30065;
i__30057_30061 = G__30066;
continue;
} else {
var temp__5735__auto___30067 = cljs.core.seq.call(null,seq__30054_30058);
if(temp__5735__auto___30067){
var seq__30054_30068__$1 = temp__5735__auto___30067;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__30054_30068__$1)){
var c__4609__auto___30069 = cljs.core.chunk_first.call(null,seq__30054_30068__$1);
var G__30070 = cljs.core.chunk_rest.call(null,seq__30054_30068__$1);
var G__30071 = c__4609__auto___30069;
var G__30072 = cljs.core.count.call(null,c__4609__auto___30069);
var G__30073 = (0);
seq__30054_30058 = G__30070;
chunk__30055_30059 = G__30071;
count__30056_30060 = G__30072;
i__30057_30061 = G__30073;
continue;
} else {
var ns_30074 = cljs.core.first.call(null,seq__30054_30068__$1);
figwheel.client.file_reloading.unprovide_BANG_.call(null,ns_30074);


var G__30075 = cljs.core.next.call(null,seq__30054_30068__$1);
var G__30076 = null;
var G__30077 = (0);
var G__30078 = (0);
seq__30054_30058 = G__30075;
chunk__30055_30059 = G__30076;
count__30056_30060 = G__30077;
i__30057_30061 = G__30078;
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
var G__30079__delegate = function (args){
cljs.core.apply.call(null,figwheel.client.file_reloading.addDependency,args);

return cljs.core.apply.call(null,goog.addDependency_figwheel_backup_,args);
};
var G__30079 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__30080__i = 0, G__30080__a = new Array(arguments.length -  0);
while (G__30080__i < G__30080__a.length) {G__30080__a[G__30080__i] = arguments[G__30080__i + 0]; ++G__30080__i;}
  args = new cljs.core.IndexedSeq(G__30080__a,0,null);
} 
return G__30079__delegate.call(this,args);};
G__30079.cljs$lang$maxFixedArity = 0;
G__30079.cljs$lang$applyTo = (function (arglist__30081){
var args = cljs.core.seq(arglist__30081);
return G__30079__delegate(args);
});
G__30079.cljs$core$IFn$_invoke$arity$variadic = G__30079__delegate;
return G__30079;
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
figwheel.client.file_reloading.gloader = (((typeof goog !== 'undefined') && (typeof goog.net !== 'undefined') && (typeof goog.net.jsloader !== 'undefined') && (typeof goog.net.jsloader.safeLoad !== 'undefined'))?(function (p1__30082_SHARP_,p2__30083_SHARP_){
return goog.net.jsloader.safeLoad(goog.html.legacyconversions.trustedResourceUrlFromString(cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__30082_SHARP_)),p2__30083_SHARP_);
}):(((typeof goog !== 'undefined') && (typeof goog.net !== 'undefined') && (typeof goog.net.jsloader !== 'undefined') && (typeof goog.net.jsloader.load !== 'undefined'))?(function (p1__30084_SHARP_,p2__30085_SHARP_){
return goog.net.jsloader.load(cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__30084_SHARP_),p2__30085_SHARP_);
}):(function(){throw cljs.core.ex_info.call(null,"No remote script loading function found.",cljs.core.PersistentArrayMap.EMPTY)})()
));
figwheel.client.file_reloading.reload_file_in_html_env = (function figwheel$client$file_reloading$reload_file_in_html_env(request_url,callback){

var G__30086 = figwheel.client.file_reloading.gloader.call(null,figwheel.client.file_reloading.add_cache_buster.call(null,request_url),({"cleanupWhenDone": true}));
G__30086.addCallback((function (){
return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [true], null));
}));

G__30086.addErrback((function (){
return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [false], null));
}));

return G__30086;
});
figwheel.client.file_reloading.write_script_tag_import = figwheel.client.file_reloading.reload_file_in_html_env;
goog.exportSymbol('figwheel.client.file_reloading.write_script_tag_import', figwheel.client.file_reloading.write_script_tag_import);
figwheel.client.file_reloading.worker_import_script = (function figwheel$client$file_reloading$worker_import_script(request_url,callback){

return callback.call(null,(function (){try{self.importScripts(figwheel.client.file_reloading.add_cache_buster.call(null,request_url));

return true;
}catch (e30087){if((e30087 instanceof Error)){
var e = e30087;
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),["Figwheel: Error loading file ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(request_url)].join(''));

figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),e.stack);

return false;
} else {
throw e30087;

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
}catch (e30088){if((e30088 instanceof Error)){
var e = e30088;
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),["Figwheel: Error loading file ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cache_path)].join(''));

figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),e.stack);

return false;
} else {
throw e30088;

}
}})());
});
});
goog.exportSymbol('figwheel.client.file_reloading.create_node_script_import_fn', figwheel.client.file_reloading.create_node_script_import_fn);
figwheel.client.file_reloading.reload_file_STAR_ = (function (){var pred__30089 = cljs.core._EQ_;
var expr__30090 = figwheel.client.utils.host_env_QMARK_.call(null);
if(cljs.core.truth_(pred__30089.call(null,new cljs.core.Keyword(null,"node","node",581201198),expr__30090))){
return figwheel.client.file_reloading.create_node_script_import_fn.call(null);
} else {
if(cljs.core.truth_(pred__30089.call(null,new cljs.core.Keyword(null,"html","html",-998796897),expr__30090))){
return figwheel.client.file_reloading.write_script_tag_import;
} else {
if(cljs.core.truth_(pred__30089.call(null,new cljs.core.Keyword(null,"worker","worker",938239996),expr__30090))){
return figwheel.client.file_reloading.worker_import_script;
} else {
return (function (a,b){
throw "Reload not defined for this platform";
});
}
}
}
})();
figwheel.client.file_reloading.reload_file = (function figwheel$client$file_reloading$reload_file(p__30092,callback){
var map__30093 = p__30092;
var map__30093__$1 = (((((!((map__30093 == null))))?(((((map__30093.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__30093.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__30093):map__30093);
var file_msg = map__30093__$1;
var request_url = cljs.core.get.call(null,map__30093__$1,new cljs.core.Keyword(null,"request-url","request-url",2100346596));

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
figwheel.client.file_reloading.reloader_loop = (function (){var c__26680__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26681__auto__ = (function (){var switch__26585__auto__ = (function (state_30131){
var state_val_30132 = (state_30131[(1)]);
if((state_val_30132 === (7))){
var inst_30127 = (state_30131[(2)]);
var state_30131__$1 = state_30131;
var statearr_30133_30159 = state_30131__$1;
(statearr_30133_30159[(2)] = inst_30127);

(statearr_30133_30159[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30132 === (1))){
var state_30131__$1 = state_30131;
var statearr_30134_30160 = state_30131__$1;
(statearr_30134_30160[(2)] = null);

(statearr_30134_30160[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30132 === (4))){
var inst_30097 = (state_30131[(7)]);
var inst_30097__$1 = (state_30131[(2)]);
var state_30131__$1 = (function (){var statearr_30135 = state_30131;
(statearr_30135[(7)] = inst_30097__$1);

return statearr_30135;
})();
if(cljs.core.truth_(inst_30097__$1)){
var statearr_30136_30161 = state_30131__$1;
(statearr_30136_30161[(1)] = (5));

} else {
var statearr_30137_30162 = state_30131__$1;
(statearr_30137_30162[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30132 === (15))){
var inst_30110 = (state_30131[(8)]);
var inst_30112 = (state_30131[(9)]);
var inst_30114 = inst_30112.call(null,inst_30110);
var state_30131__$1 = state_30131;
var statearr_30138_30163 = state_30131__$1;
(statearr_30138_30163[(2)] = inst_30114);

(statearr_30138_30163[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30132 === (13))){
var inst_30121 = (state_30131[(2)]);
var state_30131__$1 = state_30131;
var statearr_30139_30164 = state_30131__$1;
(statearr_30139_30164[(2)] = inst_30121);

(statearr_30139_30164[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30132 === (6))){
var state_30131__$1 = state_30131;
var statearr_30140_30165 = state_30131__$1;
(statearr_30140_30165[(2)] = null);

(statearr_30140_30165[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30132 === (17))){
var inst_30118 = (state_30131[(2)]);
var state_30131__$1 = state_30131;
var statearr_30141_30166 = state_30131__$1;
(statearr_30141_30166[(2)] = inst_30118);

(statearr_30141_30166[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30132 === (3))){
var inst_30129 = (state_30131[(2)]);
var state_30131__$1 = state_30131;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_30131__$1,inst_30129);
} else {
if((state_val_30132 === (12))){
var state_30131__$1 = state_30131;
var statearr_30142_30167 = state_30131__$1;
(statearr_30142_30167[(2)] = null);

(statearr_30142_30167[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30132 === (2))){
var state_30131__$1 = state_30131;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_30131__$1,(4),figwheel.client.file_reloading.reload_chan);
} else {
if((state_val_30132 === (11))){
var inst_30102 = (state_30131[(10)]);
var inst_30108 = figwheel.client.file_reloading.blocking_load.call(null,inst_30102);
var state_30131__$1 = state_30131;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_30131__$1,(14),inst_30108);
} else {
if((state_val_30132 === (9))){
var inst_30102 = (state_30131[(10)]);
var state_30131__$1 = state_30131;
if(cljs.core.truth_(inst_30102)){
var statearr_30143_30168 = state_30131__$1;
(statearr_30143_30168[(1)] = (11));

} else {
var statearr_30144_30169 = state_30131__$1;
(statearr_30144_30169[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30132 === (5))){
var inst_30103 = (state_30131[(11)]);
var inst_30097 = (state_30131[(7)]);
var inst_30102 = cljs.core.nth.call(null,inst_30097,(0),null);
var inst_30103__$1 = cljs.core.nth.call(null,inst_30097,(1),null);
var state_30131__$1 = (function (){var statearr_30145 = state_30131;
(statearr_30145[(11)] = inst_30103__$1);

(statearr_30145[(10)] = inst_30102);

return statearr_30145;
})();
if(cljs.core.truth_(inst_30103__$1)){
var statearr_30146_30170 = state_30131__$1;
(statearr_30146_30170[(1)] = (8));

} else {
var statearr_30147_30171 = state_30131__$1;
(statearr_30147_30171[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30132 === (14))){
var inst_30102 = (state_30131[(10)]);
var inst_30112 = (state_30131[(9)]);
var inst_30110 = (state_30131[(2)]);
var inst_30111 = cljs.core.deref.call(null,figwheel.client.file_reloading.on_load_callbacks);
var inst_30112__$1 = cljs.core.get.call(null,inst_30111,inst_30102);
var state_30131__$1 = (function (){var statearr_30148 = state_30131;
(statearr_30148[(8)] = inst_30110);

(statearr_30148[(9)] = inst_30112__$1);

return statearr_30148;
})();
if(cljs.core.truth_(inst_30112__$1)){
var statearr_30149_30172 = state_30131__$1;
(statearr_30149_30172[(1)] = (15));

} else {
var statearr_30150_30173 = state_30131__$1;
(statearr_30150_30173[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30132 === (16))){
var inst_30110 = (state_30131[(8)]);
var inst_30116 = cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.dependencies_loaded,cljs.core.conj,inst_30110);
var state_30131__$1 = state_30131;
var statearr_30151_30174 = state_30131__$1;
(statearr_30151_30174[(2)] = inst_30116);

(statearr_30151_30174[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30132 === (10))){
var inst_30123 = (state_30131[(2)]);
var state_30131__$1 = (function (){var statearr_30152 = state_30131;
(statearr_30152[(12)] = inst_30123);

return statearr_30152;
})();
var statearr_30153_30175 = state_30131__$1;
(statearr_30153_30175[(2)] = null);

(statearr_30153_30175[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30132 === (8))){
var inst_30103 = (state_30131[(11)]);
var inst_30105 = eval(inst_30103);
var state_30131__$1 = state_30131;
var statearr_30154_30176 = state_30131__$1;
(statearr_30154_30176[(2)] = inst_30105);

(statearr_30154_30176[(1)] = (10));


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
var figwheel$client$file_reloading$state_machine__26586__auto__ = null;
var figwheel$client$file_reloading$state_machine__26586__auto____0 = (function (){
var statearr_30155 = [null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_30155[(0)] = figwheel$client$file_reloading$state_machine__26586__auto__);

(statearr_30155[(1)] = (1));

return statearr_30155;
});
var figwheel$client$file_reloading$state_machine__26586__auto____1 = (function (state_30131){
while(true){
var ret_value__26587__auto__ = (function (){try{while(true){
var result__26588__auto__ = switch__26585__auto__.call(null,state_30131);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26588__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26588__auto__;
}
break;
}
}catch (e30156){if((e30156 instanceof Object)){
var ex__26589__auto__ = e30156;
var statearr_30157_30177 = state_30131;
(statearr_30157_30177[(5)] = ex__26589__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_30131);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e30156;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26587__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__30178 = state_30131;
state_30131 = G__30178;
continue;
} else {
return ret_value__26587__auto__;
}
break;
}
});
figwheel$client$file_reloading$state_machine__26586__auto__ = function(state_30131){
switch(arguments.length){
case 0:
return figwheel$client$file_reloading$state_machine__26586__auto____0.call(this);
case 1:
return figwheel$client$file_reloading$state_machine__26586__auto____1.call(this,state_30131);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloading$state_machine__26586__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloading$state_machine__26586__auto____0;
figwheel$client$file_reloading$state_machine__26586__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloading$state_machine__26586__auto____1;
return figwheel$client$file_reloading$state_machine__26586__auto__;
})()
})();
var state__26682__auto__ = (function (){var statearr_30158 = f__26681__auto__.call(null);
(statearr_30158[(6)] = c__26680__auto__);

return statearr_30158;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26682__auto__);
}));

return c__26680__auto__;
})();
}
figwheel.client.file_reloading.queued_file_reload = (function figwheel$client$file_reloading$queued_file_reload(var_args){
var G__30180 = arguments.length;
switch (G__30180) {
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

figwheel.client.file_reloading.require_with_callback = (function figwheel$client$file_reloading$require_with_callback(p__30182,callback){
var map__30183 = p__30182;
var map__30183__$1 = (((((!((map__30183 == null))))?(((((map__30183.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__30183.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__30183):map__30183);
var file_msg = map__30183__$1;
var namespace = cljs.core.get.call(null,map__30183__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
var request_url = figwheel.client.file_reloading.resolve_ns.call(null,namespace);
cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.on_load_callbacks,cljs.core.assoc,request_url,(function (file_msg_SINGLEQUOTE_){
cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.on_load_callbacks,cljs.core.dissoc,request_url);

return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge.call(null,file_msg,cljs.core.select_keys.call(null,file_msg_SINGLEQUOTE_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375)], null)))], null));
}));

return figwheel.client.file_reloading.figwheel_require.call(null,cljs.core.name.call(null,namespace),true);
});
figwheel.client.file_reloading.figwheel_no_load_QMARK_ = (function figwheel$client$file_reloading$figwheel_no_load_QMARK_(p__30185){
var map__30186 = p__30185;
var map__30186__$1 = (((((!((map__30186 == null))))?(((((map__30186.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__30186.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__30186):map__30186);
var file_msg = map__30186__$1;
var namespace = cljs.core.get.call(null,map__30186__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
var meta_pragmas = cljs.core.get.call(null,cljs.core.deref.call(null,figwheel.client.file_reloading.figwheel_meta_pragmas),cljs.core.name.call(null,namespace));
return new cljs.core.Keyword(null,"figwheel-no-load","figwheel-no-load",-555840179).cljs$core$IFn$_invoke$arity$1(meta_pragmas);
});
figwheel.client.file_reloading.ns_exists_QMARK_ = (function figwheel$client$file_reloading$ns_exists_QMARK_(namespace){
return (!((cljs.core.reduce.call(null,cljs.core.fnil.call(null,goog.object.get,({})),goog.global,clojure.string.split.call(null,cljs.core.name.call(null,namespace),".")) == null)));
});
figwheel.client.file_reloading.reload_file_QMARK_ = (function figwheel$client$file_reloading$reload_file_QMARK_(p__30188){
var map__30189 = p__30188;
var map__30189__$1 = (((((!((map__30189 == null))))?(((((map__30189.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__30189.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__30189):map__30189);
var file_msg = map__30189__$1;
var namespace = cljs.core.get.call(null,map__30189__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));

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
figwheel.client.file_reloading.js_reload = (function figwheel$client$file_reloading$js_reload(p__30191,callback){
var map__30192 = p__30191;
var map__30192__$1 = (((((!((map__30192 == null))))?(((((map__30192.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__30192.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__30192):map__30192);
var file_msg = map__30192__$1;
var request_url = cljs.core.get.call(null,map__30192__$1,new cljs.core.Keyword(null,"request-url","request-url",2100346596));
var namespace = cljs.core.get.call(null,map__30192__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));

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
var c__26680__auto___30242 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26681__auto__ = (function (){var switch__26585__auto__ = (function (state_30227){
var state_val_30228 = (state_30227[(1)]);
if((state_val_30228 === (1))){
var inst_30201 = cljs.core.seq.call(null,files);
var inst_30202 = cljs.core.first.call(null,inst_30201);
var inst_30203 = cljs.core.next.call(null,inst_30201);
var inst_30204 = files;
var state_30227__$1 = (function (){var statearr_30229 = state_30227;
(statearr_30229[(7)] = inst_30204);

(statearr_30229[(8)] = inst_30202);

(statearr_30229[(9)] = inst_30203);

return statearr_30229;
})();
var statearr_30230_30243 = state_30227__$1;
(statearr_30230_30243[(2)] = null);

(statearr_30230_30243[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30228 === (2))){
var inst_30204 = (state_30227[(7)]);
var inst_30210 = (state_30227[(10)]);
var inst_30209 = cljs.core.seq.call(null,inst_30204);
var inst_30210__$1 = cljs.core.first.call(null,inst_30209);
var inst_30211 = cljs.core.next.call(null,inst_30209);
var inst_30212 = (inst_30210__$1 == null);
var inst_30213 = cljs.core.not.call(null,inst_30212);
var state_30227__$1 = (function (){var statearr_30231 = state_30227;
(statearr_30231[(11)] = inst_30211);

(statearr_30231[(10)] = inst_30210__$1);

return statearr_30231;
})();
if(inst_30213){
var statearr_30232_30244 = state_30227__$1;
(statearr_30232_30244[(1)] = (4));

} else {
var statearr_30233_30245 = state_30227__$1;
(statearr_30233_30245[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30228 === (3))){
var inst_30225 = (state_30227[(2)]);
var state_30227__$1 = state_30227;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_30227__$1,inst_30225);
} else {
if((state_val_30228 === (4))){
var inst_30210 = (state_30227[(10)]);
var inst_30215 = figwheel.client.file_reloading.reload_js_file.call(null,inst_30210);
var state_30227__$1 = state_30227;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_30227__$1,(7),inst_30215);
} else {
if((state_val_30228 === (5))){
var inst_30221 = cljs.core.async.close_BANG_.call(null,out);
var state_30227__$1 = state_30227;
var statearr_30234_30246 = state_30227__$1;
(statearr_30234_30246[(2)] = inst_30221);

(statearr_30234_30246[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30228 === (6))){
var inst_30223 = (state_30227[(2)]);
var state_30227__$1 = state_30227;
var statearr_30235_30247 = state_30227__$1;
(statearr_30235_30247[(2)] = inst_30223);

(statearr_30235_30247[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30228 === (7))){
var inst_30211 = (state_30227[(11)]);
var inst_30217 = (state_30227[(2)]);
var inst_30218 = cljs.core.async.put_BANG_.call(null,out,inst_30217);
var inst_30204 = inst_30211;
var state_30227__$1 = (function (){var statearr_30236 = state_30227;
(statearr_30236[(12)] = inst_30218);

(statearr_30236[(7)] = inst_30204);

return statearr_30236;
})();
var statearr_30237_30248 = state_30227__$1;
(statearr_30237_30248[(2)] = null);

(statearr_30237_30248[(1)] = (2));


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
var figwheel$client$file_reloading$load_all_js_files_$_state_machine__26586__auto__ = null;
var figwheel$client$file_reloading$load_all_js_files_$_state_machine__26586__auto____0 = (function (){
var statearr_30238 = [null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_30238[(0)] = figwheel$client$file_reloading$load_all_js_files_$_state_machine__26586__auto__);

(statearr_30238[(1)] = (1));

return statearr_30238;
});
var figwheel$client$file_reloading$load_all_js_files_$_state_machine__26586__auto____1 = (function (state_30227){
while(true){
var ret_value__26587__auto__ = (function (){try{while(true){
var result__26588__auto__ = switch__26585__auto__.call(null,state_30227);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26588__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26588__auto__;
}
break;
}
}catch (e30239){if((e30239 instanceof Object)){
var ex__26589__auto__ = e30239;
var statearr_30240_30249 = state_30227;
(statearr_30240_30249[(5)] = ex__26589__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_30227);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e30239;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26587__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__30250 = state_30227;
state_30227 = G__30250;
continue;
} else {
return ret_value__26587__auto__;
}
break;
}
});
figwheel$client$file_reloading$load_all_js_files_$_state_machine__26586__auto__ = function(state_30227){
switch(arguments.length){
case 0:
return figwheel$client$file_reloading$load_all_js_files_$_state_machine__26586__auto____0.call(this);
case 1:
return figwheel$client$file_reloading$load_all_js_files_$_state_machine__26586__auto____1.call(this,state_30227);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloading$load_all_js_files_$_state_machine__26586__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloading$load_all_js_files_$_state_machine__26586__auto____0;
figwheel$client$file_reloading$load_all_js_files_$_state_machine__26586__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloading$load_all_js_files_$_state_machine__26586__auto____1;
return figwheel$client$file_reloading$load_all_js_files_$_state_machine__26586__auto__;
})()
})();
var state__26682__auto__ = (function (){var statearr_30241 = f__26681__auto__.call(null);
(statearr_30241[(6)] = c__26680__auto___30242);

return statearr_30241;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26682__auto__);
}));


return cljs.core.async.into.call(null,cljs.core.PersistentVector.EMPTY,out);
});
figwheel.client.file_reloading.eval_body = (function figwheel$client$file_reloading$eval_body(p__30251,opts){
var map__30252 = p__30251;
var map__30252__$1 = (((((!((map__30252 == null))))?(((((map__30252.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__30252.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__30252):map__30252);
var eval_body = cljs.core.get.call(null,map__30252__$1,new cljs.core.Keyword(null,"eval-body","eval-body",-907279883));
var file = cljs.core.get.call(null,map__30252__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
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
}catch (e30254){var e = e30254;
return figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),["Unable to evaluate ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(file)].join(''));
}} else {
return null;
}
});
figwheel.client.file_reloading.expand_files = (function figwheel$client$file_reloading$expand_files(files){
var deps = figwheel.client.file_reloading.get_all_dependents.call(null,cljs.core.map.call(null,new cljs.core.Keyword(null,"namespace","namespace",-377510372),files));
return cljs.core.filter.call(null,cljs.core.comp.call(null,cljs.core.not,cljs.core.partial.call(null,cljs.core.re_matches,/figwheel\.connect.*/),new cljs.core.Keyword(null,"namespace","namespace",-377510372)),cljs.core.map.call(null,(function (n){
var temp__5733__auto__ = cljs.core.first.call(null,cljs.core.filter.call(null,(function (p1__30255_SHARP_){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"namespace","namespace",-377510372).cljs$core$IFn$_invoke$arity$1(p1__30255_SHARP_),n);
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
return cljs.core.map.call(null,(function (p__30256){
var vec__30257 = p__30256;
var k = cljs.core.nth.call(null,vec__30257,(0),null);
var v = cljs.core.nth.call(null,vec__30257,(1),null);
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"namespace","namespace",-377510372),k,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"namespace","namespace",-377510372)], null);
}),cljs.core.filter.call(null,(function (p__30260){
var vec__30261 = p__30260;
var k = cljs.core.nth.call(null,vec__30261,(0),null);
var v = cljs.core.nth.call(null,vec__30261,(1),null);
return new cljs.core.Keyword(null,"figwheel-always","figwheel-always",799819691).cljs$core$IFn$_invoke$arity$1(v);
}),cljs.core.deref.call(null,figwheel.client.file_reloading.figwheel_meta_pragmas)));
});
figwheel.client.file_reloading.reload_js_files = (function figwheel$client$file_reloading$reload_js_files(p__30267,p__30268){
var map__30269 = p__30267;
var map__30269__$1 = (((((!((map__30269 == null))))?(((((map__30269.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__30269.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__30269):map__30269);
var opts = map__30269__$1;
var before_jsload = cljs.core.get.call(null,map__30269__$1,new cljs.core.Keyword(null,"before-jsload","before-jsload",-847513128));
var on_jsload = cljs.core.get.call(null,map__30269__$1,new cljs.core.Keyword(null,"on-jsload","on-jsload",-395756602));
var reload_dependents = cljs.core.get.call(null,map__30269__$1,new cljs.core.Keyword(null,"reload-dependents","reload-dependents",-956865430));
var map__30270 = p__30268;
var map__30270__$1 = (((((!((map__30270 == null))))?(((((map__30270.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__30270.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__30270):map__30270);
var msg = map__30270__$1;
var files = cljs.core.get.call(null,map__30270__$1,new cljs.core.Keyword(null,"files","files",-472457450));
var figwheel_meta = cljs.core.get.call(null,map__30270__$1,new cljs.core.Keyword(null,"figwheel-meta","figwheel-meta",-225970237));
var recompile_dependents = cljs.core.get.call(null,map__30270__$1,new cljs.core.Keyword(null,"recompile-dependents","recompile-dependents",523804171));
if(cljs.core.empty_QMARK_.call(null,figwheel_meta)){
} else {
cljs.core.reset_BANG_.call(null,figwheel.client.file_reloading.figwheel_meta_pragmas,figwheel_meta);
}

var c__26680__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26681__auto__ = (function (){var switch__26585__auto__ = (function (state_30424){
var state_val_30425 = (state_30424[(1)]);
if((state_val_30425 === (7))){
var inst_30287 = (state_30424[(7)]);
var inst_30285 = (state_30424[(8)]);
var inst_30286 = (state_30424[(9)]);
var inst_30284 = (state_30424[(10)]);
var inst_30292 = cljs.core._nth.call(null,inst_30285,inst_30287);
var inst_30293 = figwheel.client.file_reloading.eval_body.call(null,inst_30292,opts);
var inst_30294 = (inst_30287 + (1));
var tmp30426 = inst_30285;
var tmp30427 = inst_30286;
var tmp30428 = inst_30284;
var inst_30284__$1 = tmp30428;
var inst_30285__$1 = tmp30426;
var inst_30286__$1 = tmp30427;
var inst_30287__$1 = inst_30294;
var state_30424__$1 = (function (){var statearr_30429 = state_30424;
(statearr_30429[(7)] = inst_30287__$1);

(statearr_30429[(8)] = inst_30285__$1);

(statearr_30429[(11)] = inst_30293);

(statearr_30429[(9)] = inst_30286__$1);

(statearr_30429[(10)] = inst_30284__$1);

return statearr_30429;
})();
var statearr_30430_30513 = state_30424__$1;
(statearr_30430_30513[(2)] = null);

(statearr_30430_30513[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30425 === (20))){
var inst_30327 = (state_30424[(12)]);
var inst_30335 = figwheel.client.file_reloading.sort_files.call(null,inst_30327);
var state_30424__$1 = state_30424;
var statearr_30431_30514 = state_30424__$1;
(statearr_30431_30514[(2)] = inst_30335);

(statearr_30431_30514[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30425 === (27))){
var state_30424__$1 = state_30424;
var statearr_30432_30515 = state_30424__$1;
(statearr_30432_30515[(2)] = null);

(statearr_30432_30515[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30425 === (1))){
var inst_30276 = (state_30424[(13)]);
var inst_30273 = before_jsload.call(null,files);
var inst_30274 = figwheel.client.file_reloading.before_jsload_custom_event.call(null,files);
var inst_30275 = (function (){return (function (p1__30264_SHARP_){
return new cljs.core.Keyword(null,"eval-body","eval-body",-907279883).cljs$core$IFn$_invoke$arity$1(p1__30264_SHARP_);
});
})();
var inst_30276__$1 = cljs.core.filter.call(null,inst_30275,files);
var inst_30277 = cljs.core.not_empty.call(null,inst_30276__$1);
var state_30424__$1 = (function (){var statearr_30433 = state_30424;
(statearr_30433[(14)] = inst_30273);

(statearr_30433[(13)] = inst_30276__$1);

(statearr_30433[(15)] = inst_30274);

return statearr_30433;
})();
if(cljs.core.truth_(inst_30277)){
var statearr_30434_30516 = state_30424__$1;
(statearr_30434_30516[(1)] = (2));

} else {
var statearr_30435_30517 = state_30424__$1;
(statearr_30435_30517[(1)] = (3));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30425 === (24))){
var state_30424__$1 = state_30424;
var statearr_30436_30518 = state_30424__$1;
(statearr_30436_30518[(2)] = null);

(statearr_30436_30518[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30425 === (39))){
var inst_30377 = (state_30424[(16)]);
var state_30424__$1 = state_30424;
var statearr_30437_30519 = state_30424__$1;
(statearr_30437_30519[(2)] = inst_30377);

(statearr_30437_30519[(1)] = (40));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30425 === (46))){
var inst_30419 = (state_30424[(2)]);
var state_30424__$1 = state_30424;
var statearr_30438_30520 = state_30424__$1;
(statearr_30438_30520[(2)] = inst_30419);

(statearr_30438_30520[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30425 === (4))){
var inst_30321 = (state_30424[(2)]);
var inst_30322 = cljs.core.List.EMPTY;
var inst_30323 = cljs.core.reset_BANG_.call(null,figwheel.client.file_reloading.dependencies_loaded,inst_30322);
var inst_30324 = (function (){return (function (p1__30265_SHARP_){
var and__4174__auto__ = new cljs.core.Keyword(null,"namespace","namespace",-377510372).cljs$core$IFn$_invoke$arity$1(p1__30265_SHARP_);
if(cljs.core.truth_(and__4174__auto__)){
return ((cljs.core.not.call(null,new cljs.core.Keyword(null,"eval-body","eval-body",-907279883).cljs$core$IFn$_invoke$arity$1(p1__30265_SHARP_))) && (cljs.core.not.call(null,figwheel.client.file_reloading.figwheel_no_load_QMARK_.call(null,p1__30265_SHARP_))));
} else {
return and__4174__auto__;
}
});
})();
var inst_30325 = cljs.core.filter.call(null,inst_30324,files);
var inst_30326 = figwheel.client.file_reloading.get_figwheel_always.call(null);
var inst_30327 = cljs.core.concat.call(null,inst_30325,inst_30326);
var state_30424__$1 = (function (){var statearr_30439 = state_30424;
(statearr_30439[(12)] = inst_30327);

(statearr_30439[(17)] = inst_30323);

(statearr_30439[(18)] = inst_30321);

return statearr_30439;
})();
if(cljs.core.truth_(reload_dependents)){
var statearr_30440_30521 = state_30424__$1;
(statearr_30440_30521[(1)] = (16));

} else {
var statearr_30441_30522 = state_30424__$1;
(statearr_30441_30522[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30425 === (15))){
var inst_30311 = (state_30424[(2)]);
var state_30424__$1 = state_30424;
var statearr_30442_30523 = state_30424__$1;
(statearr_30442_30523[(2)] = inst_30311);

(statearr_30442_30523[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30425 === (21))){
var inst_30337 = (state_30424[(19)]);
var inst_30337__$1 = (state_30424[(2)]);
var inst_30338 = figwheel.client.file_reloading.load_all_js_files.call(null,inst_30337__$1);
var state_30424__$1 = (function (){var statearr_30443 = state_30424;
(statearr_30443[(19)] = inst_30337__$1);

return statearr_30443;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_30424__$1,(22),inst_30338);
} else {
if((state_val_30425 === (31))){
var inst_30422 = (state_30424[(2)]);
var state_30424__$1 = state_30424;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_30424__$1,inst_30422);
} else {
if((state_val_30425 === (32))){
var inst_30377 = (state_30424[(16)]);
var inst_30382 = inst_30377.cljs$lang$protocol_mask$partition0$;
var inst_30383 = (inst_30382 & (64));
var inst_30384 = inst_30377.cljs$core$ISeq$;
var inst_30385 = (cljs.core.PROTOCOL_SENTINEL === inst_30384);
var inst_30386 = ((inst_30383) || (inst_30385));
var state_30424__$1 = state_30424;
if(cljs.core.truth_(inst_30386)){
var statearr_30444_30524 = state_30424__$1;
(statearr_30444_30524[(1)] = (35));

} else {
var statearr_30445_30525 = state_30424__$1;
(statearr_30445_30525[(1)] = (36));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30425 === (40))){
var inst_30399 = (state_30424[(20)]);
var inst_30398 = (state_30424[(2)]);
var inst_30399__$1 = cljs.core.get.call(null,inst_30398,new cljs.core.Keyword(null,"figwheel-no-load","figwheel-no-load",-555840179));
var inst_30400 = cljs.core.get.call(null,inst_30398,new cljs.core.Keyword(null,"not-required","not-required",-950359114));
var inst_30401 = cljs.core.not_empty.call(null,inst_30399__$1);
var state_30424__$1 = (function (){var statearr_30446 = state_30424;
(statearr_30446[(20)] = inst_30399__$1);

(statearr_30446[(21)] = inst_30400);

return statearr_30446;
})();
if(cljs.core.truth_(inst_30401)){
var statearr_30447_30526 = state_30424__$1;
(statearr_30447_30526[(1)] = (41));

} else {
var statearr_30448_30527 = state_30424__$1;
(statearr_30448_30527[(1)] = (42));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30425 === (33))){
var state_30424__$1 = state_30424;
var statearr_30449_30528 = state_30424__$1;
(statearr_30449_30528[(2)] = false);

(statearr_30449_30528[(1)] = (34));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30425 === (13))){
var inst_30297 = (state_30424[(22)]);
var inst_30301 = cljs.core.chunk_first.call(null,inst_30297);
var inst_30302 = cljs.core.chunk_rest.call(null,inst_30297);
var inst_30303 = cljs.core.count.call(null,inst_30301);
var inst_30284 = inst_30302;
var inst_30285 = inst_30301;
var inst_30286 = inst_30303;
var inst_30287 = (0);
var state_30424__$1 = (function (){var statearr_30450 = state_30424;
(statearr_30450[(7)] = inst_30287);

(statearr_30450[(8)] = inst_30285);

(statearr_30450[(9)] = inst_30286);

(statearr_30450[(10)] = inst_30284);

return statearr_30450;
})();
var statearr_30451_30529 = state_30424__$1;
(statearr_30451_30529[(2)] = null);

(statearr_30451_30529[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30425 === (22))){
var inst_30337 = (state_30424[(19)]);
var inst_30345 = (state_30424[(23)]);
var inst_30341 = (state_30424[(24)]);
var inst_30340 = (state_30424[(25)]);
var inst_30340__$1 = (state_30424[(2)]);
var inst_30341__$1 = cljs.core.filter.call(null,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375),inst_30340__$1);
var inst_30342 = (function (){var all_files = inst_30337;
var res_SINGLEQUOTE_ = inst_30340__$1;
var res = inst_30341__$1;
return (function (p1__30266_SHARP_){
return cljs.core.not.call(null,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375).cljs$core$IFn$_invoke$arity$1(p1__30266_SHARP_));
});
})();
var inst_30343 = cljs.core.filter.call(null,inst_30342,inst_30340__$1);
var inst_30344 = cljs.core.deref.call(null,figwheel.client.file_reloading.dependencies_loaded);
var inst_30345__$1 = cljs.core.filter.call(null,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375),inst_30344);
var inst_30346 = cljs.core.not_empty.call(null,inst_30345__$1);
var state_30424__$1 = (function (){var statearr_30452 = state_30424;
(statearr_30452[(26)] = inst_30343);

(statearr_30452[(23)] = inst_30345__$1);

(statearr_30452[(24)] = inst_30341__$1);

(statearr_30452[(25)] = inst_30340__$1);

return statearr_30452;
})();
if(cljs.core.truth_(inst_30346)){
var statearr_30453_30530 = state_30424__$1;
(statearr_30453_30530[(1)] = (23));

} else {
var statearr_30454_30531 = state_30424__$1;
(statearr_30454_30531[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30425 === (36))){
var state_30424__$1 = state_30424;
var statearr_30455_30532 = state_30424__$1;
(statearr_30455_30532[(2)] = false);

(statearr_30455_30532[(1)] = (37));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30425 === (41))){
var inst_30399 = (state_30424[(20)]);
var inst_30403 = cljs.core.comp.call(null,figwheel.client.file_reloading.name__GT_path,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
var inst_30404 = cljs.core.map.call(null,inst_30403,inst_30399);
var inst_30405 = cljs.core.pr_str.call(null,inst_30404);
var inst_30406 = ["figwheel-no-load meta-data: ",inst_30405].join('');
var inst_30407 = figwheel.client.utils.log.call(null,inst_30406);
var state_30424__$1 = state_30424;
var statearr_30456_30533 = state_30424__$1;
(statearr_30456_30533[(2)] = inst_30407);

(statearr_30456_30533[(1)] = (43));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30425 === (43))){
var inst_30400 = (state_30424[(21)]);
var inst_30410 = (state_30424[(2)]);
var inst_30411 = cljs.core.not_empty.call(null,inst_30400);
var state_30424__$1 = (function (){var statearr_30457 = state_30424;
(statearr_30457[(27)] = inst_30410);

return statearr_30457;
})();
if(cljs.core.truth_(inst_30411)){
var statearr_30458_30534 = state_30424__$1;
(statearr_30458_30534[(1)] = (44));

} else {
var statearr_30459_30535 = state_30424__$1;
(statearr_30459_30535[(1)] = (45));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30425 === (29))){
var inst_30337 = (state_30424[(19)]);
var inst_30377 = (state_30424[(16)]);
var inst_30343 = (state_30424[(26)]);
var inst_30345 = (state_30424[(23)]);
var inst_30341 = (state_30424[(24)]);
var inst_30340 = (state_30424[(25)]);
var inst_30373 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: NOT loading these files ");
var inst_30376 = (function (){var all_files = inst_30337;
var res_SINGLEQUOTE_ = inst_30340;
var res = inst_30341;
var files_not_loaded = inst_30343;
var dependencies_that_loaded = inst_30345;
return (function (p__30375){
var map__30460 = p__30375;
var map__30460__$1 = (((((!((map__30460 == null))))?(((((map__30460.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__30460.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__30460):map__30460);
var namespace = cljs.core.get.call(null,map__30460__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
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
var inst_30377__$1 = cljs.core.group_by.call(null,inst_30376,inst_30343);
var inst_30379 = (inst_30377__$1 == null);
var inst_30380 = cljs.core.not.call(null,inst_30379);
var state_30424__$1 = (function (){var statearr_30462 = state_30424;
(statearr_30462[(16)] = inst_30377__$1);

(statearr_30462[(28)] = inst_30373);

return statearr_30462;
})();
if(inst_30380){
var statearr_30463_30536 = state_30424__$1;
(statearr_30463_30536[(1)] = (32));

} else {
var statearr_30464_30537 = state_30424__$1;
(statearr_30464_30537[(1)] = (33));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30425 === (44))){
var inst_30400 = (state_30424[(21)]);
var inst_30413 = cljs.core.map.call(null,new cljs.core.Keyword(null,"file","file",-1269645878),inst_30400);
var inst_30414 = cljs.core.pr_str.call(null,inst_30413);
var inst_30415 = ["not required: ",inst_30414].join('');
var inst_30416 = figwheel.client.utils.log.call(null,inst_30415);
var state_30424__$1 = state_30424;
var statearr_30465_30538 = state_30424__$1;
(statearr_30465_30538[(2)] = inst_30416);

(statearr_30465_30538[(1)] = (46));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30425 === (6))){
var inst_30318 = (state_30424[(2)]);
var state_30424__$1 = state_30424;
var statearr_30466_30539 = state_30424__$1;
(statearr_30466_30539[(2)] = inst_30318);

(statearr_30466_30539[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30425 === (28))){
var inst_30343 = (state_30424[(26)]);
var inst_30370 = (state_30424[(2)]);
var inst_30371 = cljs.core.not_empty.call(null,inst_30343);
var state_30424__$1 = (function (){var statearr_30467 = state_30424;
(statearr_30467[(29)] = inst_30370);

return statearr_30467;
})();
if(cljs.core.truth_(inst_30371)){
var statearr_30468_30540 = state_30424__$1;
(statearr_30468_30540[(1)] = (29));

} else {
var statearr_30469_30541 = state_30424__$1;
(statearr_30469_30541[(1)] = (30));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30425 === (25))){
var inst_30341 = (state_30424[(24)]);
var inst_30357 = (state_30424[(2)]);
var inst_30358 = cljs.core.not_empty.call(null,inst_30341);
var state_30424__$1 = (function (){var statearr_30470 = state_30424;
(statearr_30470[(30)] = inst_30357);

return statearr_30470;
})();
if(cljs.core.truth_(inst_30358)){
var statearr_30471_30542 = state_30424__$1;
(statearr_30471_30542[(1)] = (26));

} else {
var statearr_30472_30543 = state_30424__$1;
(statearr_30472_30543[(1)] = (27));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30425 === (34))){
var inst_30393 = (state_30424[(2)]);
var state_30424__$1 = state_30424;
if(cljs.core.truth_(inst_30393)){
var statearr_30473_30544 = state_30424__$1;
(statearr_30473_30544[(1)] = (38));

} else {
var statearr_30474_30545 = state_30424__$1;
(statearr_30474_30545[(1)] = (39));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30425 === (17))){
var state_30424__$1 = state_30424;
var statearr_30475_30546 = state_30424__$1;
(statearr_30475_30546[(2)] = recompile_dependents);

(statearr_30475_30546[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30425 === (3))){
var state_30424__$1 = state_30424;
var statearr_30476_30547 = state_30424__$1;
(statearr_30476_30547[(2)] = null);

(statearr_30476_30547[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30425 === (12))){
var inst_30314 = (state_30424[(2)]);
var state_30424__$1 = state_30424;
var statearr_30477_30548 = state_30424__$1;
(statearr_30477_30548[(2)] = inst_30314);

(statearr_30477_30548[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30425 === (2))){
var inst_30276 = (state_30424[(13)]);
var inst_30283 = cljs.core.seq.call(null,inst_30276);
var inst_30284 = inst_30283;
var inst_30285 = null;
var inst_30286 = (0);
var inst_30287 = (0);
var state_30424__$1 = (function (){var statearr_30478 = state_30424;
(statearr_30478[(7)] = inst_30287);

(statearr_30478[(8)] = inst_30285);

(statearr_30478[(9)] = inst_30286);

(statearr_30478[(10)] = inst_30284);

return statearr_30478;
})();
var statearr_30479_30549 = state_30424__$1;
(statearr_30479_30549[(2)] = null);

(statearr_30479_30549[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30425 === (23))){
var inst_30337 = (state_30424[(19)]);
var inst_30343 = (state_30424[(26)]);
var inst_30345 = (state_30424[(23)]);
var inst_30341 = (state_30424[(24)]);
var inst_30340 = (state_30424[(25)]);
var inst_30348 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: loaded these dependencies");
var inst_30350 = (function (){var all_files = inst_30337;
var res_SINGLEQUOTE_ = inst_30340;
var res = inst_30341;
var files_not_loaded = inst_30343;
var dependencies_that_loaded = inst_30345;
return (function (p__30349){
var map__30480 = p__30349;
var map__30480__$1 = (((((!((map__30480 == null))))?(((((map__30480.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__30480.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__30480):map__30480);
var request_url = cljs.core.get.call(null,map__30480__$1,new cljs.core.Keyword(null,"request-url","request-url",2100346596));
return clojure.string.replace.call(null,request_url,goog.basePath,"");
});
})();
var inst_30351 = cljs.core.reverse.call(null,inst_30345);
var inst_30352 = cljs.core.map.call(null,inst_30350,inst_30351);
var inst_30353 = cljs.core.pr_str.call(null,inst_30352);
var inst_30354 = figwheel.client.utils.log.call(null,inst_30353);
var state_30424__$1 = (function (){var statearr_30482 = state_30424;
(statearr_30482[(31)] = inst_30348);

return statearr_30482;
})();
var statearr_30483_30550 = state_30424__$1;
(statearr_30483_30550[(2)] = inst_30354);

(statearr_30483_30550[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30425 === (35))){
var state_30424__$1 = state_30424;
var statearr_30484_30551 = state_30424__$1;
(statearr_30484_30551[(2)] = true);

(statearr_30484_30551[(1)] = (37));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30425 === (19))){
var inst_30327 = (state_30424[(12)]);
var inst_30333 = figwheel.client.file_reloading.expand_files.call(null,inst_30327);
var state_30424__$1 = state_30424;
var statearr_30485_30552 = state_30424__$1;
(statearr_30485_30552[(2)] = inst_30333);

(statearr_30485_30552[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30425 === (11))){
var state_30424__$1 = state_30424;
var statearr_30486_30553 = state_30424__$1;
(statearr_30486_30553[(2)] = null);

(statearr_30486_30553[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30425 === (9))){
var inst_30316 = (state_30424[(2)]);
var state_30424__$1 = state_30424;
var statearr_30487_30554 = state_30424__$1;
(statearr_30487_30554[(2)] = inst_30316);

(statearr_30487_30554[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30425 === (5))){
var inst_30287 = (state_30424[(7)]);
var inst_30286 = (state_30424[(9)]);
var inst_30289 = (inst_30287 < inst_30286);
var inst_30290 = inst_30289;
var state_30424__$1 = state_30424;
if(cljs.core.truth_(inst_30290)){
var statearr_30488_30555 = state_30424__$1;
(statearr_30488_30555[(1)] = (7));

} else {
var statearr_30489_30556 = state_30424__$1;
(statearr_30489_30556[(1)] = (8));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30425 === (14))){
var inst_30297 = (state_30424[(22)]);
var inst_30306 = cljs.core.first.call(null,inst_30297);
var inst_30307 = figwheel.client.file_reloading.eval_body.call(null,inst_30306,opts);
var inst_30308 = cljs.core.next.call(null,inst_30297);
var inst_30284 = inst_30308;
var inst_30285 = null;
var inst_30286 = (0);
var inst_30287 = (0);
var state_30424__$1 = (function (){var statearr_30490 = state_30424;
(statearr_30490[(32)] = inst_30307);

(statearr_30490[(7)] = inst_30287);

(statearr_30490[(8)] = inst_30285);

(statearr_30490[(9)] = inst_30286);

(statearr_30490[(10)] = inst_30284);

return statearr_30490;
})();
var statearr_30491_30557 = state_30424__$1;
(statearr_30491_30557[(2)] = null);

(statearr_30491_30557[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30425 === (45))){
var state_30424__$1 = state_30424;
var statearr_30492_30558 = state_30424__$1;
(statearr_30492_30558[(2)] = null);

(statearr_30492_30558[(1)] = (46));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30425 === (26))){
var inst_30337 = (state_30424[(19)]);
var inst_30343 = (state_30424[(26)]);
var inst_30345 = (state_30424[(23)]);
var inst_30341 = (state_30424[(24)]);
var inst_30340 = (state_30424[(25)]);
var inst_30360 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: loaded these files");
var inst_30362 = (function (){var all_files = inst_30337;
var res_SINGLEQUOTE_ = inst_30340;
var res = inst_30341;
var files_not_loaded = inst_30343;
var dependencies_that_loaded = inst_30345;
return (function (p__30361){
var map__30493 = p__30361;
var map__30493__$1 = (((((!((map__30493 == null))))?(((((map__30493.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__30493.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__30493):map__30493);
var namespace = cljs.core.get.call(null,map__30493__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
var file = cljs.core.get.call(null,map__30493__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
if(cljs.core.truth_(namespace)){
return figwheel.client.file_reloading.name__GT_path.call(null,cljs.core.name.call(null,namespace));
} else {
return file;
}
});
})();
var inst_30363 = cljs.core.map.call(null,inst_30362,inst_30341);
var inst_30364 = cljs.core.pr_str.call(null,inst_30363);
var inst_30365 = figwheel.client.utils.log.call(null,inst_30364);
var inst_30366 = (function (){var all_files = inst_30337;
var res_SINGLEQUOTE_ = inst_30340;
var res = inst_30341;
var files_not_loaded = inst_30343;
var dependencies_that_loaded = inst_30345;
return (function (){
figwheel.client.file_reloading.on_jsload_custom_event.call(null,res);

return cljs.core.apply.call(null,on_jsload,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [res], null));
});
})();
var inst_30367 = setTimeout(inst_30366,(10));
var state_30424__$1 = (function (){var statearr_30495 = state_30424;
(statearr_30495[(33)] = inst_30365);

(statearr_30495[(34)] = inst_30360);

return statearr_30495;
})();
var statearr_30496_30559 = state_30424__$1;
(statearr_30496_30559[(2)] = inst_30367);

(statearr_30496_30559[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30425 === (16))){
var state_30424__$1 = state_30424;
var statearr_30497_30560 = state_30424__$1;
(statearr_30497_30560[(2)] = reload_dependents);

(statearr_30497_30560[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30425 === (38))){
var inst_30377 = (state_30424[(16)]);
var inst_30395 = cljs.core.apply.call(null,cljs.core.hash_map,inst_30377);
var state_30424__$1 = state_30424;
var statearr_30498_30561 = state_30424__$1;
(statearr_30498_30561[(2)] = inst_30395);

(statearr_30498_30561[(1)] = (40));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30425 === (30))){
var state_30424__$1 = state_30424;
var statearr_30499_30562 = state_30424__$1;
(statearr_30499_30562[(2)] = null);

(statearr_30499_30562[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30425 === (10))){
var inst_30297 = (state_30424[(22)]);
var inst_30299 = cljs.core.chunked_seq_QMARK_.call(null,inst_30297);
var state_30424__$1 = state_30424;
if(inst_30299){
var statearr_30500_30563 = state_30424__$1;
(statearr_30500_30563[(1)] = (13));

} else {
var statearr_30501_30564 = state_30424__$1;
(statearr_30501_30564[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30425 === (18))){
var inst_30331 = (state_30424[(2)]);
var state_30424__$1 = state_30424;
if(cljs.core.truth_(inst_30331)){
var statearr_30502_30565 = state_30424__$1;
(statearr_30502_30565[(1)] = (19));

} else {
var statearr_30503_30566 = state_30424__$1;
(statearr_30503_30566[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30425 === (42))){
var state_30424__$1 = state_30424;
var statearr_30504_30567 = state_30424__$1;
(statearr_30504_30567[(2)] = null);

(statearr_30504_30567[(1)] = (43));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30425 === (37))){
var inst_30390 = (state_30424[(2)]);
var state_30424__$1 = state_30424;
var statearr_30505_30568 = state_30424__$1;
(statearr_30505_30568[(2)] = inst_30390);

(statearr_30505_30568[(1)] = (34));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30425 === (8))){
var inst_30297 = (state_30424[(22)]);
var inst_30284 = (state_30424[(10)]);
var inst_30297__$1 = cljs.core.seq.call(null,inst_30284);
var state_30424__$1 = (function (){var statearr_30506 = state_30424;
(statearr_30506[(22)] = inst_30297__$1);

return statearr_30506;
})();
if(inst_30297__$1){
var statearr_30507_30569 = state_30424__$1;
(statearr_30507_30569[(1)] = (10));

} else {
var statearr_30508_30570 = state_30424__$1;
(statearr_30508_30570[(1)] = (11));

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
var figwheel$client$file_reloading$reload_js_files_$_state_machine__26586__auto__ = null;
var figwheel$client$file_reloading$reload_js_files_$_state_machine__26586__auto____0 = (function (){
var statearr_30509 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_30509[(0)] = figwheel$client$file_reloading$reload_js_files_$_state_machine__26586__auto__);

(statearr_30509[(1)] = (1));

return statearr_30509;
});
var figwheel$client$file_reloading$reload_js_files_$_state_machine__26586__auto____1 = (function (state_30424){
while(true){
var ret_value__26587__auto__ = (function (){try{while(true){
var result__26588__auto__ = switch__26585__auto__.call(null,state_30424);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26588__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26588__auto__;
}
break;
}
}catch (e30510){if((e30510 instanceof Object)){
var ex__26589__auto__ = e30510;
var statearr_30511_30571 = state_30424;
(statearr_30511_30571[(5)] = ex__26589__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_30424);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e30510;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26587__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__30572 = state_30424;
state_30424 = G__30572;
continue;
} else {
return ret_value__26587__auto__;
}
break;
}
});
figwheel$client$file_reloading$reload_js_files_$_state_machine__26586__auto__ = function(state_30424){
switch(arguments.length){
case 0:
return figwheel$client$file_reloading$reload_js_files_$_state_machine__26586__auto____0.call(this);
case 1:
return figwheel$client$file_reloading$reload_js_files_$_state_machine__26586__auto____1.call(this,state_30424);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloading$reload_js_files_$_state_machine__26586__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloading$reload_js_files_$_state_machine__26586__auto____0;
figwheel$client$file_reloading$reload_js_files_$_state_machine__26586__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloading$reload_js_files_$_state_machine__26586__auto____1;
return figwheel$client$file_reloading$reload_js_files_$_state_machine__26586__auto__;
})()
})();
var state__26682__auto__ = (function (){var statearr_30512 = f__26681__auto__.call(null);
(statearr_30512[(6)] = c__26680__auto__);

return statearr_30512;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26682__auto__);
}));

return c__26680__auto__;
});
figwheel.client.file_reloading.current_links = (function figwheel$client$file_reloading$current_links(){
return Array.prototype.slice.call(document.getElementsByTagName("link"));
});
figwheel.client.file_reloading.truncate_url = (function figwheel$client$file_reloading$truncate_url(url){
return clojure.string.replace_first.call(null,clojure.string.replace_first.call(null,clojure.string.replace_first.call(null,clojure.string.replace_first.call(null,cljs.core.first.call(null,clojure.string.split.call(null,url,/\?/)),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(location.protocol),"//"].join(''),""),".*://",""),/^\/\//,""),/[^\\/]*/,"");
});
figwheel.client.file_reloading.matches_file_QMARK_ = (function figwheel$client$file_reloading$matches_file_QMARK_(p__30575,link){
var map__30576 = p__30575;
var map__30576__$1 = (((((!((map__30576 == null))))?(((((map__30576.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__30576.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__30576):map__30576);
var file = cljs.core.get.call(null,map__30576__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
var temp__5735__auto__ = link.href;
if(cljs.core.truth_(temp__5735__auto__)){
var link_href = temp__5735__auto__;
var match = clojure.string.join.call(null,"/",cljs.core.take_while.call(null,cljs.core.identity,cljs.core.map.call(null,(function (p1__30573_SHARP_,p2__30574_SHARP_){
if(cljs.core._EQ_.call(null,p1__30573_SHARP_,p2__30574_SHARP_)){
return p1__30573_SHARP_;
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
var temp__5735__auto__ = cljs.core.first.call(null,cljs.core.sort_by.call(null,(function (p__30579){
var map__30580 = p__30579;
var map__30580__$1 = (((((!((map__30580 == null))))?(((((map__30580.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__30580.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__30580):map__30580);
var match_length = cljs.core.get.call(null,map__30580__$1,new cljs.core.Keyword(null,"match-length","match-length",1101537310));
var current_url_length = cljs.core.get.call(null,map__30580__$1,new cljs.core.Keyword(null,"current-url-length","current-url-length",380404083));
return (current_url_length - match_length);
}),cljs.core.keep.call(null,(function (p1__30578_SHARP_){
return figwheel.client.file_reloading.matches_file_QMARK_.call(null,f_data,p1__30578_SHARP_);
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
return cljs.core.vals.call(null,cljs.core.reduce.call(null,(function (p1__30582_SHARP_,p2__30583_SHARP_){
return cljs.core.assoc.call(null,p1__30582_SHARP_,cljs.core.get.call(null,p2__30583_SHARP_,key),p2__30583_SHARP_);
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
var loaded_f_datas_30584 = cljs.core.filter.call(null,new cljs.core.Keyword(null,"loaded","loaded",-1246482293),f_datas_SINGLEQUOTE_);
figwheel.client.file_reloading.on_cssload_custom_event.call(null,loaded_f_datas_30584);

if(cljs.core.fn_QMARK_.call(null,on_cssload)){
on_cssload.call(null,loaded_f_datas_30584);
} else {
}

return fin.call(null);
}));
});
figwheel.client.file_reloading.reload_css_files = (function figwheel$client$file_reloading$reload_css_files(p__30585,p__30586){
var map__30587 = p__30585;
var map__30587__$1 = (((((!((map__30587 == null))))?(((((map__30587.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__30587.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__30587):map__30587);
var on_cssload = cljs.core.get.call(null,map__30587__$1,new cljs.core.Keyword(null,"on-cssload","on-cssload",1825432318));
var map__30588 = p__30586;
var map__30588__$1 = (((((!((map__30588 == null))))?(((((map__30588.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__30588.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__30588):map__30588);
var files_msg = map__30588__$1;
var files = cljs.core.get.call(null,map__30588__$1,new cljs.core.Keyword(null,"files","files",-472457450));
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

//# sourceMappingURL=file_reloading.js.map?rel=1587041654846

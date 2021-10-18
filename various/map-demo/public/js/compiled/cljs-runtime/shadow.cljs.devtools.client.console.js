goog.provide('shadow.cljs.devtools.client.console');
shadow.cljs.devtools.client.console.push_all = (function shadow$cljs$devtools$client$console$push_all(arr,item){
if(cljs.core.vector_QMARK_(item)){
var seq__46979 = cljs.core.seq(item);
var chunk__46980 = null;
var count__46981 = (0);
var i__46982 = (0);
while(true){
if((i__46982 < count__46981)){
var it = chunk__46980.cljs$core$IIndexed$_nth$arity$2(null,i__46982);
arr.push(it);


var G__47101 = seq__46979;
var G__47102 = chunk__46980;
var G__47103 = count__46981;
var G__47104 = (i__46982 + (1));
seq__46979 = G__47101;
chunk__46980 = G__47102;
count__46981 = G__47103;
i__46982 = G__47104;
continue;
} else {
var temp__5753__auto__ = cljs.core.seq(seq__46979);
if(temp__5753__auto__){
var seq__46979__$1 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__46979__$1)){
var c__4638__auto__ = cljs.core.chunk_first(seq__46979__$1);
var G__47105 = cljs.core.chunk_rest(seq__46979__$1);
var G__47106 = c__4638__auto__;
var G__47107 = cljs.core.count(c__4638__auto__);
var G__47108 = (0);
seq__46979 = G__47105;
chunk__46980 = G__47106;
count__46981 = G__47107;
i__46982 = G__47108;
continue;
} else {
var it = cljs.core.first(seq__46979__$1);
arr.push(it);


var G__47109 = cljs.core.next(seq__46979__$1);
var G__47110 = null;
var G__47111 = (0);
var G__47112 = (0);
seq__46979 = G__47109;
chunk__46980 = G__47110;
count__46981 = G__47111;
i__46982 = G__47112;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return arr.push(item);
}
});
shadow.cljs.devtools.client.console.object_ref = (function shadow$cljs$devtools$client$console$object_ref(obj){
if(cljs.core.truth_(obj)){
return ["object",({"object": obj})];
} else {
return null;
}
});
shadow.cljs.devtools.client.console.map__GT_style = (function shadow$cljs$devtools$client$console$map__GT_style(m){
return ({"style": clojure.string.join.cljs$core$IFn$_invoke$arity$2("",cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__47000){
var vec__47001 = p__47000;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47001,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47001,(1),null);
return [cljs.core.name(k),": ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(v),";"].join('');
}),m))});
});
shadow.cljs.devtools.client.console.clj__GT_jsonml = (function shadow$cljs$devtools$client$console$clj__GT_jsonml(struct){
if((struct == null)){
return null;
} else {
if(cljs.core.array_QMARK_(struct)){
return struct;
} else {
if(cljs.core.vector_QMARK_(struct)){
var vec__47006 = struct;
var seq__47007 = cljs.core.seq(vec__47006);
var first__47008 = cljs.core.first(seq__47007);
var seq__47007__$1 = cljs.core.next(seq__47007);
var tag = first__47008;
var first__47008__$1 = cljs.core.first(seq__47007__$1);
var seq__47007__$2 = cljs.core.next(seq__47007__$1);
var attrs = first__47008__$1;
var children = seq__47007__$2;
var js = [cljs.core.name(tag),shadow.cljs.devtools.client.console.map__GT_style(attrs)];
var seq__47012_47114 = cljs.core.seq(children);
var chunk__47013_47115 = null;
var count__47014_47116 = (0);
var i__47015_47117 = (0);
while(true){
if((i__47015_47117 < count__47014_47116)){
var child_47118 = chunk__47013_47115.cljs$core$IIndexed$_nth$arity$2(null,i__47015_47117);
shadow.cljs.devtools.client.console.push_all(js,(shadow.cljs.devtools.client.console.clj__GT_jsonml.cljs$core$IFn$_invoke$arity$1 ? shadow.cljs.devtools.client.console.clj__GT_jsonml.cljs$core$IFn$_invoke$arity$1(child_47118) : shadow.cljs.devtools.client.console.clj__GT_jsonml.call(null,child_47118)));


var G__47119 = seq__47012_47114;
var G__47120 = chunk__47013_47115;
var G__47121 = count__47014_47116;
var G__47122 = (i__47015_47117 + (1));
seq__47012_47114 = G__47119;
chunk__47013_47115 = G__47120;
count__47014_47116 = G__47121;
i__47015_47117 = G__47122;
continue;
} else {
var temp__5753__auto___47123 = cljs.core.seq(seq__47012_47114);
if(temp__5753__auto___47123){
var seq__47012_47124__$1 = temp__5753__auto___47123;
if(cljs.core.chunked_seq_QMARK_(seq__47012_47124__$1)){
var c__4638__auto___47125 = cljs.core.chunk_first(seq__47012_47124__$1);
var G__47126 = cljs.core.chunk_rest(seq__47012_47124__$1);
var G__47127 = c__4638__auto___47125;
var G__47128 = cljs.core.count(c__4638__auto___47125);
var G__47129 = (0);
seq__47012_47114 = G__47126;
chunk__47013_47115 = G__47127;
count__47014_47116 = G__47128;
i__47015_47117 = G__47129;
continue;
} else {
var child_47130 = cljs.core.first(seq__47012_47124__$1);
shadow.cljs.devtools.client.console.push_all(js,(shadow.cljs.devtools.client.console.clj__GT_jsonml.cljs$core$IFn$_invoke$arity$1 ? shadow.cljs.devtools.client.console.clj__GT_jsonml.cljs$core$IFn$_invoke$arity$1(child_47130) : shadow.cljs.devtools.client.console.clj__GT_jsonml.call(null,child_47130)));


var G__47131 = cljs.core.next(seq__47012_47124__$1);
var G__47132 = null;
var G__47133 = (0);
var G__47134 = (0);
seq__47012_47114 = G__47131;
chunk__47013_47115 = G__47132;
count__47014_47116 = G__47133;
i__47015_47117 = G__47134;
continue;
}
} else {
}
}
break;
}

return js;
} else {
if(typeof struct === 'string'){
return struct;
} else {
if(typeof struct === 'number'){
return struct;
} else {
if(cljs.core.seq_QMARK_(struct)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(shadow.cljs.devtools.client.console.clj__GT_jsonml),struct);
} else {
return shadow.cljs.devtools.client.console.object_ref(struct);

}
}
}
}
}
}
});

/**
* @constructor
*/
shadow.cljs.devtools.client.console.SeqFormatter = (function (){
});
(shadow.cljs.devtools.client.console.SeqFormatter.prototype.shadow$formatter = (function (){
var self__ = this;
var this$ = this;
return true;
}));

(shadow.cljs.devtools.client.console.SeqFormatter.prototype.header = (function (obj){
var self__ = this;
var this$ = this;
if(((cljs.core.sequential_QMARK_(obj)) || (cljs.core.set_QMARK_(obj)))){
return shadow.cljs.devtools.client.console.clj__GT_jsonml(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),cljs.core.PersistentArrayMap.EMPTY,[cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.type(obj)], 0))," [count: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.count(obj)),"]"].join('')], null));
} else {
return null;
}
}));

(shadow.cljs.devtools.client.console.SeqFormatter.prototype.hasBody = (function (obj){
var self__ = this;
var this$ = this;
return cljs.core.boolean$(cljs.core.seq(obj));
}));

(shadow.cljs.devtools.client.console.SeqFormatter.prototype.body = (function (s){
var self__ = this;
var this$ = this;
return shadow.cljs.devtools.client.console.clj__GT_jsonml(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ol","ol",932524051),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"margin","margin",-995903681),(0)], null),(function (){var iter__4611__auto__ = (function shadow$cljs$devtools$client$console$iter__47034(s__47035){
return (new cljs.core.LazySeq(null,(function (){
var s__47035__$1 = s__47035;
while(true){
var temp__5753__auto__ = cljs.core.seq(s__47035__$1);
if(temp__5753__auto__){
var s__47035__$2 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(s__47035__$2)){
var c__4609__auto__ = cljs.core.chunk_first(s__47035__$2);
var size__4610__auto__ = cljs.core.count(c__4609__auto__);
var b__47037 = cljs.core.chunk_buffer(size__4610__auto__);
if((function (){var i__47036 = (0);
while(true){
if((i__47036 < size__4610__auto__)){
var value = cljs.core._nth(c__4609__auto__,i__47036);
cljs.core.chunk_append(b__47037,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),cljs.core.PersistentArrayMap.EMPTY,shadow.cljs.devtools.client.console.object_ref(value)], null));

var G__47136 = (i__47036 + (1));
i__47036 = G__47136;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__47037),shadow$cljs$devtools$client$console$iter__47034(cljs.core.chunk_rest(s__47035__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__47037),null);
}
} else {
var value = cljs.core.first(s__47035__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),cljs.core.PersistentArrayMap.EMPTY,shadow.cljs.devtools.client.console.object_ref(value)], null),shadow$cljs$devtools$client$console$iter__47034(cljs.core.rest(s__47035__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__4611__auto__(s);
})()], null));
}));

(shadow.cljs.devtools.client.console.SeqFormatter.getBasis = (function (){
return cljs.core.PersistentVector.EMPTY;
}));

(shadow.cljs.devtools.client.console.SeqFormatter.cljs$lang$type = true);

(shadow.cljs.devtools.client.console.SeqFormatter.cljs$lang$ctorStr = "shadow.cljs.devtools.client.console/SeqFormatter");

(shadow.cljs.devtools.client.console.SeqFormatter.cljs$lang$ctorPrWriter = (function (this__4450__auto__,writer__4451__auto__,opt__4452__auto__){
return cljs.core._write(writer__4451__auto__,"shadow.cljs.devtools.client.console/SeqFormatter");
}));

/**
 * Positional factory function for shadow.cljs.devtools.client.console/SeqFormatter.
 */
shadow.cljs.devtools.client.console.__GT_SeqFormatter = (function shadow$cljs$devtools$client$console$__GT_SeqFormatter(){
return (new shadow.cljs.devtools.client.console.SeqFormatter());
});


/**
* @constructor
*/
shadow.cljs.devtools.client.console.MapFormatter = (function (){
});
(shadow.cljs.devtools.client.console.MapFormatter.prototype.shadow$formatter = (function (){
var self__ = this;
var this$ = this;
return true;
}));

(shadow.cljs.devtools.client.console.MapFormatter.prototype.header = (function (obj){
var self__ = this;
var this$ = this;
if((((obj instanceof cljs.core.PersistentHashMap)) || ((((obj instanceof cljs.core.PersistentArrayMap)) || (cljs.core.record_QMARK_(obj)))))){
return shadow.cljs.devtools.client.console.clj__GT_jsonml(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),cljs.core.PersistentArrayMap.EMPTY,[cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.type(obj)], 0))," [count: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.count(obj)),"]"].join('')], null));
} else {
return null;
}
}));

(shadow.cljs.devtools.client.console.MapFormatter.prototype.hasBody = (function (obj){
var self__ = this;
var this$ = this;
return cljs.core.boolean$(cljs.core.seq(obj));
}));

(shadow.cljs.devtools.client.console.MapFormatter.prototype.body = (function (m){
var self__ = this;
var this$ = this;
return shadow.cljs.devtools.client.console.clj__GT_jsonml(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"table","table",-564943036),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"width","width",-384071477),"100%",new cljs.core.Keyword(null,"margin-left","margin-left",2015598377),"14px"], null),(function (){var iter__4611__auto__ = (function shadow$cljs$devtools$client$console$iter__47055(s__47056){
return (new cljs.core.LazySeq(null,(function (){
var s__47056__$1 = s__47056;
while(true){
var temp__5753__auto__ = cljs.core.seq(s__47056__$1);
if(temp__5753__auto__){
var s__47056__$2 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(s__47056__$2)){
var c__4609__auto__ = cljs.core.chunk_first(s__47056__$2);
var size__4610__auto__ = cljs.core.count(c__4609__auto__);
var b__47058 = cljs.core.chunk_buffer(size__4610__auto__);
if((function (){var i__47057 = (0);
while(true){
if((i__47057 < size__4610__auto__)){
var key = cljs.core._nth(c__4609__auto__,i__47057);
var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(m,key);
cljs.core.chunk_append(b__47058,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"vertical-align","vertical-align",651007333),"top"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),cljs.core.PersistentArrayMap.EMPTY,shadow.cljs.devtools.client.console.object_ref(key)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),cljs.core.PersistentArrayMap.EMPTY,shadow.cljs.devtools.client.console.object_ref(value)], null)], null));

var G__47139 = (i__47057 + (1));
i__47057 = G__47139;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__47058),shadow$cljs$devtools$client$console$iter__47055(cljs.core.chunk_rest(s__47056__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__47058),null);
}
} else {
var key = cljs.core.first(s__47056__$2);
var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(m,key);
return cljs.core.cons(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"vertical-align","vertical-align",651007333),"top"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),cljs.core.PersistentArrayMap.EMPTY,shadow.cljs.devtools.client.console.object_ref(key)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),cljs.core.PersistentArrayMap.EMPTY,shadow.cljs.devtools.client.console.object_ref(value)], null)], null),shadow$cljs$devtools$client$console$iter__47055(cljs.core.rest(s__47056__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__4611__auto__((function (){var k = cljs.core.keys(m);
try{return cljs.core.sort.cljs$core$IFn$_invoke$arity$1(k);
}catch (e47064){var e = e47064;
return k;
}})());
})()], null));
}));

(shadow.cljs.devtools.client.console.MapFormatter.getBasis = (function (){
return cljs.core.PersistentVector.EMPTY;
}));

(shadow.cljs.devtools.client.console.MapFormatter.cljs$lang$type = true);

(shadow.cljs.devtools.client.console.MapFormatter.cljs$lang$ctorStr = "shadow.cljs.devtools.client.console/MapFormatter");

(shadow.cljs.devtools.client.console.MapFormatter.cljs$lang$ctorPrWriter = (function (this__4450__auto__,writer__4451__auto__,opt__4452__auto__){
return cljs.core._write(writer__4451__auto__,"shadow.cljs.devtools.client.console/MapFormatter");
}));

/**
 * Positional factory function for shadow.cljs.devtools.client.console/MapFormatter.
 */
shadow.cljs.devtools.client.console.__GT_MapFormatter = (function shadow$cljs$devtools$client$console$__GT_MapFormatter(){
return (new shadow.cljs.devtools.client.console.MapFormatter());
});

shadow.cljs.devtools.client.console.keyword_style = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"color","color",1011675173),"rgb(136, 19, 145)"], null);

/**
* @constructor
*/
shadow.cljs.devtools.client.console.KeywordFormatter = (function (){
});
(shadow.cljs.devtools.client.console.KeywordFormatter.prototype.shadow$formatter = (function (){
var self__ = this;
var this$ = this;
return true;
}));

(shadow.cljs.devtools.client.console.KeywordFormatter.prototype.header = (function (obj){
var self__ = this;
var this$ = this;
if((obj instanceof cljs.core.Keyword)){
return shadow.cljs.devtools.client.console.clj__GT_jsonml(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),shadow.cljs.devtools.client.console.keyword_style,cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([obj], 0))], null));
} else {
return null;
}
}));

(shadow.cljs.devtools.client.console.KeywordFormatter.prototype.hasBody = (function (obj){
var self__ = this;
var this$ = this;
return false;
}));

(shadow.cljs.devtools.client.console.KeywordFormatter.prototype.body = (function (m){
var self__ = this;
var this$ = this;
return null;
}));

(shadow.cljs.devtools.client.console.KeywordFormatter.getBasis = (function (){
return cljs.core.PersistentVector.EMPTY;
}));

(shadow.cljs.devtools.client.console.KeywordFormatter.cljs$lang$type = true);

(shadow.cljs.devtools.client.console.KeywordFormatter.cljs$lang$ctorStr = "shadow.cljs.devtools.client.console/KeywordFormatter");

(shadow.cljs.devtools.client.console.KeywordFormatter.cljs$lang$ctorPrWriter = (function (this__4450__auto__,writer__4451__auto__,opt__4452__auto__){
return cljs.core._write(writer__4451__auto__,"shadow.cljs.devtools.client.console/KeywordFormatter");
}));

/**
 * Positional factory function for shadow.cljs.devtools.client.console/KeywordFormatter.
 */
shadow.cljs.devtools.client.console.__GT_KeywordFormatter = (function shadow$cljs$devtools$client$console$__GT_KeywordFormatter(){
return (new shadow.cljs.devtools.client.console.KeywordFormatter());
});


/**
* @constructor
*/
shadow.cljs.devtools.client.console.SymbolFormatter = (function (){
});
(shadow.cljs.devtools.client.console.SymbolFormatter.prototype.shadow$formatter = (function (){
var self__ = this;
var this$ = this;
return true;
}));

(shadow.cljs.devtools.client.console.SymbolFormatter.prototype.header = (function (obj){
var self__ = this;
var this$ = this;
if((obj instanceof cljs.core.Symbol)){
return shadow.cljs.devtools.client.console.clj__GT_jsonml(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),shadow.cljs.devtools.client.console.keyword_style,cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([obj], 0))], null));
} else {
return null;
}
}));

(shadow.cljs.devtools.client.console.SymbolFormatter.prototype.hasBody = (function (obj){
var self__ = this;
var this$ = this;
return false;
}));

(shadow.cljs.devtools.client.console.SymbolFormatter.prototype.body = (function (m){
var self__ = this;
var this$ = this;
return null;
}));

(shadow.cljs.devtools.client.console.SymbolFormatter.getBasis = (function (){
return cljs.core.PersistentVector.EMPTY;
}));

(shadow.cljs.devtools.client.console.SymbolFormatter.cljs$lang$type = true);

(shadow.cljs.devtools.client.console.SymbolFormatter.cljs$lang$ctorStr = "shadow.cljs.devtools.client.console/SymbolFormatter");

(shadow.cljs.devtools.client.console.SymbolFormatter.cljs$lang$ctorPrWriter = (function (this__4450__auto__,writer__4451__auto__,opt__4452__auto__){
return cljs.core._write(writer__4451__auto__,"shadow.cljs.devtools.client.console/SymbolFormatter");
}));

/**
 * Positional factory function for shadow.cljs.devtools.client.console/SymbolFormatter.
 */
shadow.cljs.devtools.client.console.__GT_SymbolFormatter = (function shadow$cljs$devtools$client$console$__GT_SymbolFormatter(){
return (new shadow.cljs.devtools.client.console.SymbolFormatter());
});


/**
* @constructor
*/
shadow.cljs.devtools.client.console.DerefFormatter = (function (){
});
(shadow.cljs.devtools.client.console.DerefFormatter.prototype.shadow$formatter = (function (){
var self__ = this;
var this$ = this;
return true;
}));

(shadow.cljs.devtools.client.console.DerefFormatter.prototype.header = (function (obj){
var self__ = this;
var this$ = this;
if((((obj instanceof cljs.core.Atom)) || ((obj instanceof cljs.core.Volatile)))){
return shadow.cljs.devtools.client.console.clj__GT_jsonml(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),shadow.cljs.devtools.client.console.keyword_style,["@DEREF ",cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.type(obj)], 0))].join('')], null));
} else {
return null;
}
}));

(shadow.cljs.devtools.client.console.DerefFormatter.prototype.hasBody = (function (obj){
var self__ = this;
var this$ = this;
return true;
}));

(shadow.cljs.devtools.client.console.DerefFormatter.prototype.body = (function (v){
var self__ = this;
var this$ = this;
return shadow.cljs.devtools.client.console.clj__GT_jsonml(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"margin-left","margin-left",2015598377),"14px"], null),shadow.cljs.devtools.client.console.object_ref(cljs.core.deref(v))], null));
}));

(shadow.cljs.devtools.client.console.DerefFormatter.getBasis = (function (){
return cljs.core.PersistentVector.EMPTY;
}));

(shadow.cljs.devtools.client.console.DerefFormatter.cljs$lang$type = true);

(shadow.cljs.devtools.client.console.DerefFormatter.cljs$lang$ctorStr = "shadow.cljs.devtools.client.console/DerefFormatter");

(shadow.cljs.devtools.client.console.DerefFormatter.cljs$lang$ctorPrWriter = (function (this__4450__auto__,writer__4451__auto__,opt__4452__auto__){
return cljs.core._write(writer__4451__auto__,"shadow.cljs.devtools.client.console/DerefFormatter");
}));

/**
 * Positional factory function for shadow.cljs.devtools.client.console/DerefFormatter.
 */
shadow.cljs.devtools.client.console.__GT_DerefFormatter = (function shadow$cljs$devtools$client$console$__GT_DerefFormatter(){
return (new shadow.cljs.devtools.client.console.DerefFormatter());
});

shadow.cljs.devtools.client.console.install_all_BANG_ = (function shadow$cljs$devtools$client$console$install_all_BANG_(){
var temp__5753__auto__ = goog.global.devtoolsFormatters;
if(cljs.core.truth_(temp__5753__auto__)){
var f = temp__5753__auto__;
var G__47097 = f;
G__47097.push((new shadow.cljs.devtools.client.console.KeywordFormatter()));

G__47097.push((new shadow.cljs.devtools.client.console.MapFormatter()));

G__47097.push((new shadow.cljs.devtools.client.console.SeqFormatter()));

G__47097.push((new shadow.cljs.devtools.client.console.SymbolFormatter()));

G__47097.push((new shadow.cljs.devtools.client.console.DerefFormatter()));

return G__47097;
} else {
return null;
}
});
shadow.cljs.devtools.client.console.remove_all_BANG_ = (function shadow$cljs$devtools$client$console$remove_all_BANG_(){
var all = cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.remove.cljs$core$IFn$_invoke$arity$2((function (p1__47099_SHARP_){
return goog.object.get(p1__47099_SHARP_,"shadow$formatter");
}),cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1((function (){var or__4212__auto__ = goog.global.devtoolsFormatters;
if(cljs.core.truth_(or__4212__auto__)){
return or__4212__auto__;
} else {
return [];
}
})())));
return goog.object.set(goog.global,"devtoolsFormatters",all);
});
shadow.cljs.devtools.client.console.remove_all_BANG_();
shadow.cljs.devtools.client.console.install_all_BANG_();

//# sourceMappingURL=shadow.cljs.devtools.client.console.js.map

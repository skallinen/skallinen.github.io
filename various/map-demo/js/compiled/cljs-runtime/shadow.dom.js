goog.provide('shadow.dom');
shadow.dom.transition_supported_QMARK_ = (((typeof window !== 'undefined'))?goog.style.transition.isSupported():null);

/**
 * @interface
 */
shadow.dom.IElement = function(){};

var shadow$dom$IElement$_to_dom$dyn_53179 = (function (this$){
var x__4509__auto__ = (((this$ == null))?null:this$);
var m__4510__auto__ = (shadow.dom._to_dom[goog.typeOf(x__4509__auto__)]);
if((!((m__4510__auto__ == null)))){
return (m__4510__auto__.cljs$core$IFn$_invoke$arity$1 ? m__4510__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__4510__auto__.call(null,this$));
} else {
var m__4508__auto__ = (shadow.dom._to_dom["_"]);
if((!((m__4508__auto__ == null)))){
return (m__4508__auto__.cljs$core$IFn$_invoke$arity$1 ? m__4508__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__4508__auto__.call(null,this$));
} else {
throw cljs.core.missing_protocol("IElement.-to-dom",this$);
}
}
});
shadow.dom._to_dom = (function shadow$dom$_to_dom(this$){
if((((!((this$ == null)))) && ((!((this$.shadow$dom$IElement$_to_dom$arity$1 == null)))))){
return this$.shadow$dom$IElement$_to_dom$arity$1(this$);
} else {
return shadow$dom$IElement$_to_dom$dyn_53179(this$);
}
});


/**
 * @interface
 */
shadow.dom.SVGElement = function(){};

var shadow$dom$SVGElement$_to_svg$dyn_53180 = (function (this$){
var x__4509__auto__ = (((this$ == null))?null:this$);
var m__4510__auto__ = (shadow.dom._to_svg[goog.typeOf(x__4509__auto__)]);
if((!((m__4510__auto__ == null)))){
return (m__4510__auto__.cljs$core$IFn$_invoke$arity$1 ? m__4510__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__4510__auto__.call(null,this$));
} else {
var m__4508__auto__ = (shadow.dom._to_svg["_"]);
if((!((m__4508__auto__ == null)))){
return (m__4508__auto__.cljs$core$IFn$_invoke$arity$1 ? m__4508__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__4508__auto__.call(null,this$));
} else {
throw cljs.core.missing_protocol("SVGElement.-to-svg",this$);
}
}
});
shadow.dom._to_svg = (function shadow$dom$_to_svg(this$){
if((((!((this$ == null)))) && ((!((this$.shadow$dom$SVGElement$_to_svg$arity$1 == null)))))){
return this$.shadow$dom$SVGElement$_to_svg$arity$1(this$);
} else {
return shadow$dom$SVGElement$_to_svg$dyn_53180(this$);
}
});

shadow.dom.lazy_native_coll_seq = (function shadow$dom$lazy_native_coll_seq(coll,idx){
if((idx < coll.length)){
return (new cljs.core.LazySeq(null,(function (){
return cljs.core.cons((coll[idx]),(function (){var G__51996 = coll;
var G__51997 = (idx + (1));
return (shadow.dom.lazy_native_coll_seq.cljs$core$IFn$_invoke$arity$2 ? shadow.dom.lazy_native_coll_seq.cljs$core$IFn$_invoke$arity$2(G__51996,G__51997) : shadow.dom.lazy_native_coll_seq.call(null,G__51996,G__51997));
})());
}),null,null));
} else {
return null;
}
});

/**
* @constructor
 * @implements {cljs.core.IIndexed}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IDeref}
 * @implements {shadow.dom.IElement}
*/
shadow.dom.NativeColl = (function (coll){
this.coll = coll;
this.cljs$lang$protocol_mask$partition0$ = 8421394;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(shadow.dom.NativeColl.prototype.cljs$core$IDeref$_deref$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.coll;
}));

(shadow.dom.NativeColl.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (this$,n){
var self__ = this;
var this$__$1 = this;
return (self__.coll[n]);
}));

(shadow.dom.NativeColl.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (this$,n,not_found){
var self__ = this;
var this$__$1 = this;
var or__4212__auto__ = (self__.coll[n]);
if(cljs.core.truth_(or__4212__auto__)){
return or__4212__auto__;
} else {
return not_found;
}
}));

(shadow.dom.NativeColl.prototype.cljs$core$ICounted$_count$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.coll.length;
}));

(shadow.dom.NativeColl.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return shadow.dom.lazy_native_coll_seq(self__.coll,(0));
}));

(shadow.dom.NativeColl.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.dom.NativeColl.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.coll;
}));

(shadow.dom.NativeColl.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"coll","coll",-1006698606,null)], null);
}));

(shadow.dom.NativeColl.cljs$lang$type = true);

(shadow.dom.NativeColl.cljs$lang$ctorStr = "shadow.dom/NativeColl");

(shadow.dom.NativeColl.cljs$lang$ctorPrWriter = (function (this__4450__auto__,writer__4451__auto__,opt__4452__auto__){
return cljs.core._write(writer__4451__auto__,"shadow.dom/NativeColl");
}));

/**
 * Positional factory function for shadow.dom/NativeColl.
 */
shadow.dom.__GT_NativeColl = (function shadow$dom$__GT_NativeColl(coll){
return (new shadow.dom.NativeColl(coll));
});

shadow.dom.native_coll = (function shadow$dom$native_coll(coll){
return (new shadow.dom.NativeColl(coll));
});
shadow.dom.dom_node = (function shadow$dom$dom_node(el){
if((el == null)){
return null;
} else {
if((((!((el == null))))?((((false) || ((cljs.core.PROTOCOL_SENTINEL === el.shadow$dom$IElement$))))?true:false):false)){
return el.shadow$dom$IElement$_to_dom$arity$1(null);
} else {
if(typeof el === 'string'){
return document.createTextNode(el);
} else {
if(typeof el === 'number'){
return document.createTextNode(cljs.core.str.cljs$core$IFn$_invoke$arity$1(el));
} else {
return el;

}
}
}
}
});
shadow.dom.query_one = (function shadow$dom$query_one(var_args){
var G__52032 = arguments.length;
switch (G__52032) {
case 1:
return shadow.dom.query_one.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.query_one.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.query_one.cljs$core$IFn$_invoke$arity$1 = (function (sel){
return document.querySelector(sel);
}));

(shadow.dom.query_one.cljs$core$IFn$_invoke$arity$2 = (function (sel,root){
return shadow.dom.dom_node(root).querySelector(sel);
}));

(shadow.dom.query_one.cljs$lang$maxFixedArity = 2);

shadow.dom.query = (function shadow$dom$query(var_args){
var G__52046 = arguments.length;
switch (G__52046) {
case 1:
return shadow.dom.query.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.query.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.query.cljs$core$IFn$_invoke$arity$1 = (function (sel){
return (new shadow.dom.NativeColl(document.querySelectorAll(sel)));
}));

(shadow.dom.query.cljs$core$IFn$_invoke$arity$2 = (function (sel,root){
return (new shadow.dom.NativeColl(shadow.dom.dom_node(root).querySelectorAll(sel)));
}));

(shadow.dom.query.cljs$lang$maxFixedArity = 2);

shadow.dom.by_id = (function shadow$dom$by_id(var_args){
var G__52061 = arguments.length;
switch (G__52061) {
case 2:
return shadow.dom.by_id.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return shadow.dom.by_id.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.by_id.cljs$core$IFn$_invoke$arity$2 = (function (id,el){
return shadow.dom.dom_node(el).getElementById(id);
}));

(shadow.dom.by_id.cljs$core$IFn$_invoke$arity$1 = (function (id){
return document.getElementById(id);
}));

(shadow.dom.by_id.cljs$lang$maxFixedArity = 2);

shadow.dom.build = shadow.dom.dom_node;
shadow.dom.ev_stop = (function shadow$dom$ev_stop(var_args){
var G__52072 = arguments.length;
switch (G__52072) {
case 1:
return shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 4:
return shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$1 = (function (e){
if(cljs.core.truth_(e.stopPropagation)){
e.stopPropagation();

e.preventDefault();
} else {
(e.cancelBubble = true);

(e.returnValue = false);
}

return e;
}));

(shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$2 = (function (e,el){
shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$1(e);

return el;
}));

(shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$4 = (function (e,el,scope,owner){
shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$1(e);

return el;
}));

(shadow.dom.ev_stop.cljs$lang$maxFixedArity = 4);

/**
 * check wether a parent node (or the document) contains the child
 */
shadow.dom.contains_QMARK_ = (function shadow$dom$contains_QMARK_(var_args){
var G__52090 = arguments.length;
switch (G__52090) {
case 1:
return shadow.dom.contains_QMARK_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.contains_QMARK_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.contains_QMARK_.cljs$core$IFn$_invoke$arity$1 = (function (el){
return goog.dom.contains(document,shadow.dom.dom_node(el));
}));

(shadow.dom.contains_QMARK_.cljs$core$IFn$_invoke$arity$2 = (function (parent,el){
return goog.dom.contains(shadow.dom.dom_node(parent),shadow.dom.dom_node(el));
}));

(shadow.dom.contains_QMARK_.cljs$lang$maxFixedArity = 2);

shadow.dom.add_class = (function shadow$dom$add_class(el,cls){
return goog.dom.classlist.add(shadow.dom.dom_node(el),cls);
});
shadow.dom.remove_class = (function shadow$dom$remove_class(el,cls){
return goog.dom.classlist.remove(shadow.dom.dom_node(el),cls);
});
shadow.dom.toggle_class = (function shadow$dom$toggle_class(var_args){
var G__52112 = arguments.length;
switch (G__52112) {
case 2:
return shadow.dom.toggle_class.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return shadow.dom.toggle_class.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.toggle_class.cljs$core$IFn$_invoke$arity$2 = (function (el,cls){
return goog.dom.classlist.toggle(shadow.dom.dom_node(el),cls);
}));

(shadow.dom.toggle_class.cljs$core$IFn$_invoke$arity$3 = (function (el,cls,v){
if(cljs.core.truth_(v)){
return shadow.dom.add_class(el,cls);
} else {
return shadow.dom.remove_class(el,cls);
}
}));

(shadow.dom.toggle_class.cljs$lang$maxFixedArity = 3);

shadow.dom.dom_listen = (cljs.core.truth_((function (){var or__4212__auto__ = (!((typeof document !== 'undefined')));
if(or__4212__auto__){
return or__4212__auto__;
} else {
return document.addEventListener;
}
})())?(function shadow$dom$dom_listen_good(el,ev,handler){
return el.addEventListener(ev,handler,false);
}):(function shadow$dom$dom_listen_ie(el,ev,handler){
try{return el.attachEvent(["on",cljs.core.str.cljs$core$IFn$_invoke$arity$1(ev)].join(''),(function (e){
return (handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(e,el) : handler.call(null,e,el));
}));
}catch (e52129){if((e52129 instanceof Object)){
var e = e52129;
return console.log("didnt support attachEvent",el,e);
} else {
throw e52129;

}
}}));
shadow.dom.dom_listen_remove = (cljs.core.truth_((function (){var or__4212__auto__ = (!((typeof document !== 'undefined')));
if(or__4212__auto__){
return or__4212__auto__;
} else {
return document.removeEventListener;
}
})())?(function shadow$dom$dom_listen_remove_good(el,ev,handler){
return el.removeEventListener(ev,handler,false);
}):(function shadow$dom$dom_listen_remove_ie(el,ev,handler){
return el.detachEvent(["on",cljs.core.str.cljs$core$IFn$_invoke$arity$1(ev)].join(''),handler);
}));
shadow.dom.on_query = (function shadow$dom$on_query(root_el,ev,selector,handler){
var seq__52143 = cljs.core.seq(shadow.dom.query.cljs$core$IFn$_invoke$arity$2(selector,root_el));
var chunk__52144 = null;
var count__52145 = (0);
var i__52146 = (0);
while(true){
if((i__52146 < count__52145)){
var el = chunk__52144.cljs$core$IIndexed$_nth$arity$2(null,i__52146);
var handler_53223__$1 = ((function (seq__52143,chunk__52144,count__52145,i__52146,el){
return (function (e){
return (handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(e,el) : handler.call(null,e,el));
});})(seq__52143,chunk__52144,count__52145,i__52146,el))
;
shadow.dom.dom_listen(el,cljs.core.name(ev),handler_53223__$1);


var G__53224 = seq__52143;
var G__53225 = chunk__52144;
var G__53226 = count__52145;
var G__53227 = (i__52146 + (1));
seq__52143 = G__53224;
chunk__52144 = G__53225;
count__52145 = G__53226;
i__52146 = G__53227;
continue;
} else {
var temp__5753__auto__ = cljs.core.seq(seq__52143);
if(temp__5753__auto__){
var seq__52143__$1 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__52143__$1)){
var c__4638__auto__ = cljs.core.chunk_first(seq__52143__$1);
var G__53228 = cljs.core.chunk_rest(seq__52143__$1);
var G__53229 = c__4638__auto__;
var G__53230 = cljs.core.count(c__4638__auto__);
var G__53231 = (0);
seq__52143 = G__53228;
chunk__52144 = G__53229;
count__52145 = G__53230;
i__52146 = G__53231;
continue;
} else {
var el = cljs.core.first(seq__52143__$1);
var handler_53232__$1 = ((function (seq__52143,chunk__52144,count__52145,i__52146,el,seq__52143__$1,temp__5753__auto__){
return (function (e){
return (handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(e,el) : handler.call(null,e,el));
});})(seq__52143,chunk__52144,count__52145,i__52146,el,seq__52143__$1,temp__5753__auto__))
;
shadow.dom.dom_listen(el,cljs.core.name(ev),handler_53232__$1);


var G__53233 = cljs.core.next(seq__52143__$1);
var G__53234 = null;
var G__53235 = (0);
var G__53236 = (0);
seq__52143 = G__53233;
chunk__52144 = G__53234;
count__52145 = G__53235;
i__52146 = G__53236;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.dom.on = (function shadow$dom$on(var_args){
var G__52168 = arguments.length;
switch (G__52168) {
case 3:
return shadow.dom.on.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return shadow.dom.on.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.on.cljs$core$IFn$_invoke$arity$3 = (function (el,ev,handler){
return shadow.dom.on.cljs$core$IFn$_invoke$arity$4(el,ev,handler,false);
}));

(shadow.dom.on.cljs$core$IFn$_invoke$arity$4 = (function (el,ev,handler,capture){
if(cljs.core.vector_QMARK_(ev)){
return shadow.dom.on_query(el,cljs.core.first(ev),cljs.core.second(ev),handler);
} else {
var handler__$1 = (function (e){
return (handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(e,el) : handler.call(null,e,el));
});
return shadow.dom.dom_listen(shadow.dom.dom_node(el),cljs.core.name(ev),handler__$1);
}
}));

(shadow.dom.on.cljs$lang$maxFixedArity = 4);

shadow.dom.remove_event_handler = (function shadow$dom$remove_event_handler(el,ev,handler){
return shadow.dom.dom_listen_remove(shadow.dom.dom_node(el),cljs.core.name(ev),handler);
});
shadow.dom.add_event_listeners = (function shadow$dom$add_event_listeners(el,events){
var seq__52184 = cljs.core.seq(events);
var chunk__52185 = null;
var count__52186 = (0);
var i__52187 = (0);
while(true){
if((i__52187 < count__52186)){
var vec__52205 = chunk__52185.cljs$core$IIndexed$_nth$arity$2(null,i__52187);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__52205,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__52205,(1),null);
shadow.dom.on.cljs$core$IFn$_invoke$arity$3(el,k,v);


var G__53240 = seq__52184;
var G__53241 = chunk__52185;
var G__53242 = count__52186;
var G__53243 = (i__52187 + (1));
seq__52184 = G__53240;
chunk__52185 = G__53241;
count__52186 = G__53242;
i__52187 = G__53243;
continue;
} else {
var temp__5753__auto__ = cljs.core.seq(seq__52184);
if(temp__5753__auto__){
var seq__52184__$1 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__52184__$1)){
var c__4638__auto__ = cljs.core.chunk_first(seq__52184__$1);
var G__53244 = cljs.core.chunk_rest(seq__52184__$1);
var G__53245 = c__4638__auto__;
var G__53246 = cljs.core.count(c__4638__auto__);
var G__53247 = (0);
seq__52184 = G__53244;
chunk__52185 = G__53245;
count__52186 = G__53246;
i__52187 = G__53247;
continue;
} else {
var vec__52214 = cljs.core.first(seq__52184__$1);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__52214,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__52214,(1),null);
shadow.dom.on.cljs$core$IFn$_invoke$arity$3(el,k,v);


var G__53252 = cljs.core.next(seq__52184__$1);
var G__53253 = null;
var G__53254 = (0);
var G__53255 = (0);
seq__52184 = G__53252;
chunk__52185 = G__53253;
count__52186 = G__53254;
i__52187 = G__53255;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.dom.set_style = (function shadow$dom$set_style(el,styles){
var dom = shadow.dom.dom_node(el);
var seq__52219 = cljs.core.seq(styles);
var chunk__52221 = null;
var count__52222 = (0);
var i__52223 = (0);
while(true){
if((i__52223 < count__52222)){
var vec__52240 = chunk__52221.cljs$core$IIndexed$_nth$arity$2(null,i__52223);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__52240,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__52240,(1),null);
goog.style.setStyle(dom,cljs.core.name(k),(((v == null))?"":v));


var G__53256 = seq__52219;
var G__53257 = chunk__52221;
var G__53258 = count__52222;
var G__53259 = (i__52223 + (1));
seq__52219 = G__53256;
chunk__52221 = G__53257;
count__52222 = G__53258;
i__52223 = G__53259;
continue;
} else {
var temp__5753__auto__ = cljs.core.seq(seq__52219);
if(temp__5753__auto__){
var seq__52219__$1 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__52219__$1)){
var c__4638__auto__ = cljs.core.chunk_first(seq__52219__$1);
var G__53260 = cljs.core.chunk_rest(seq__52219__$1);
var G__53261 = c__4638__auto__;
var G__53262 = cljs.core.count(c__4638__auto__);
var G__53263 = (0);
seq__52219 = G__53260;
chunk__52221 = G__53261;
count__52222 = G__53262;
i__52223 = G__53263;
continue;
} else {
var vec__52251 = cljs.core.first(seq__52219__$1);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__52251,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__52251,(1),null);
goog.style.setStyle(dom,cljs.core.name(k),(((v == null))?"":v));


var G__53264 = cljs.core.next(seq__52219__$1);
var G__53265 = null;
var G__53266 = (0);
var G__53267 = (0);
seq__52219 = G__53264;
chunk__52221 = G__53265;
count__52222 = G__53266;
i__52223 = G__53267;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.dom.set_attr_STAR_ = (function shadow$dom$set_attr_STAR_(el,key,value){
var G__52260_53268 = key;
var G__52260_53269__$1 = (((G__52260_53268 instanceof cljs.core.Keyword))?G__52260_53268.fqn:null);
switch (G__52260_53269__$1) {
case "id":
(el.id = cljs.core.str.cljs$core$IFn$_invoke$arity$1(value));

break;
case "class":
(el.className = cljs.core.str.cljs$core$IFn$_invoke$arity$1(value));

break;
case "for":
(el.htmlFor = value);

break;
case "cellpadding":
el.setAttribute("cellPadding",value);

break;
case "cellspacing":
el.setAttribute("cellSpacing",value);

break;
case "colspan":
el.setAttribute("colSpan",value);

break;
case "frameborder":
el.setAttribute("frameBorder",value);

break;
case "height":
el.setAttribute("height",value);

break;
case "maxlength":
el.setAttribute("maxLength",value);

break;
case "role":
el.setAttribute("role",value);

break;
case "rowspan":
el.setAttribute("rowSpan",value);

break;
case "type":
el.setAttribute("type",value);

break;
case "usemap":
el.setAttribute("useMap",value);

break;
case "valign":
el.setAttribute("vAlign",value);

break;
case "width":
el.setAttribute("width",value);

break;
case "on":
shadow.dom.add_event_listeners(el,value);

break;
case "style":
if((value == null)){
} else {
if(typeof value === 'string'){
el.setAttribute("style",value);
} else {
if(cljs.core.map_QMARK_(value)){
shadow.dom.set_style(el,value);
} else {
goog.style.setStyle(el,value);

}
}
}

break;
default:
var ks_53271 = cljs.core.name(key);
if(cljs.core.truth_((function (){var or__4212__auto__ = goog.string.startsWith(ks_53271,"data-");
if(cljs.core.truth_(or__4212__auto__)){
return or__4212__auto__;
} else {
return goog.string.startsWith(ks_53271,"aria-");
}
})())){
el.setAttribute(ks_53271,value);
} else {
(el[ks_53271] = value);
}

}

return el;
});
shadow.dom.set_attrs = (function shadow$dom$set_attrs(el,attrs){
return cljs.core.reduce_kv((function (el__$1,key,value){
shadow.dom.set_attr_STAR_(el__$1,key,value);

return el__$1;
}),shadow.dom.dom_node(el),attrs);
});
shadow.dom.set_attr = (function shadow$dom$set_attr(el,key,value){
return shadow.dom.set_attr_STAR_(shadow.dom.dom_node(el),key,value);
});
shadow.dom.has_class_QMARK_ = (function shadow$dom$has_class_QMARK_(el,cls){
return goog.dom.classlist.contains(shadow.dom.dom_node(el),cls);
});
shadow.dom.merge_class_string = (function shadow$dom$merge_class_string(current,extra_class){
if(cljs.core.seq(current)){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(current)," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(extra_class)].join('');
} else {
return extra_class;
}
});
shadow.dom.parse_tag = (function shadow$dom$parse_tag(spec){
var spec__$1 = cljs.core.name(spec);
var fdot = spec__$1.indexOf(".");
var fhash = spec__$1.indexOf("#");
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((-1),fdot)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((-1),fhash)))){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spec__$1,null,null], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((-1),fhash)){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spec__$1.substring((0),fdot),null,clojure.string.replace(spec__$1.substring((fdot + (1))),/\./," ")], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((-1),fdot)){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spec__$1.substring((0),fhash),spec__$1.substring((fhash + (1))),null], null);
} else {
if((fhash > fdot)){
throw ["cant have id after class?",spec__$1].join('');
} else {
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spec__$1.substring((0),fhash),spec__$1.substring((fhash + (1)),fdot),clojure.string.replace(spec__$1.substring((fdot + (1))),/\./," ")], null);

}
}
}
}
});
shadow.dom.create_dom_node = (function shadow$dom$create_dom_node(tag_def,p__52281){
var map__52283 = p__52281;
var map__52283__$1 = cljs.core.__destructure_map(map__52283);
var props = map__52283__$1;
var class$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__52283__$1,new cljs.core.Keyword(null,"class","class",-2030961996));
var tag_props = ({});
var vec__52285 = shadow.dom.parse_tag(tag_def);
var tag_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__52285,(0),null);
var tag_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__52285,(1),null);
var tag_classes = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__52285,(2),null);
if(cljs.core.truth_(tag_id)){
(tag_props["id"] = tag_id);
} else {
}

if(cljs.core.truth_(tag_classes)){
(tag_props["class"] = shadow.dom.merge_class_string(class$,tag_classes));
} else {
}

var G__52291 = goog.dom.createDom(tag_name,tag_props);
shadow.dom.set_attrs(G__52291,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(props,new cljs.core.Keyword(null,"class","class",-2030961996)));

return G__52291;
});
shadow.dom.append = (function shadow$dom$append(var_args){
var G__52295 = arguments.length;
switch (G__52295) {
case 1:
return shadow.dom.append.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.append.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.append.cljs$core$IFn$_invoke$arity$1 = (function (node){
if(cljs.core.truth_(node)){
var temp__5753__auto__ = shadow.dom.dom_node(node);
if(cljs.core.truth_(temp__5753__auto__)){
var n = temp__5753__auto__;
document.body.appendChild(n);

return n;
} else {
return null;
}
} else {
return null;
}
}));

(shadow.dom.append.cljs$core$IFn$_invoke$arity$2 = (function (el,node){
if(cljs.core.truth_(node)){
var temp__5753__auto__ = shadow.dom.dom_node(node);
if(cljs.core.truth_(temp__5753__auto__)){
var n = temp__5753__auto__;
shadow.dom.dom_node(el).appendChild(n);

return n;
} else {
return null;
}
} else {
return null;
}
}));

(shadow.dom.append.cljs$lang$maxFixedArity = 2);

shadow.dom.destructure_node = (function shadow$dom$destructure_node(create_fn,p__52308){
var vec__52311 = p__52308;
var seq__52312 = cljs.core.seq(vec__52311);
var first__52313 = cljs.core.first(seq__52312);
var seq__52312__$1 = cljs.core.next(seq__52312);
var nn = first__52313;
var first__52313__$1 = cljs.core.first(seq__52312__$1);
var seq__52312__$2 = cljs.core.next(seq__52312__$1);
var np = first__52313__$1;
var nc = seq__52312__$2;
var node = vec__52311;
if((nn instanceof cljs.core.Keyword)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("invalid dom node",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"node","node",581201198),node], null));
}

if((((np == null)) && ((nc == null)))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__52316 = nn;
var G__52317 = cljs.core.PersistentArrayMap.EMPTY;
return (create_fn.cljs$core$IFn$_invoke$arity$2 ? create_fn.cljs$core$IFn$_invoke$arity$2(G__52316,G__52317) : create_fn.call(null,G__52316,G__52317));
})(),cljs.core.List.EMPTY], null);
} else {
if(cljs.core.map_QMARK_(np)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(create_fn.cljs$core$IFn$_invoke$arity$2 ? create_fn.cljs$core$IFn$_invoke$arity$2(nn,np) : create_fn.call(null,nn,np)),nc], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__52319 = nn;
var G__52320 = cljs.core.PersistentArrayMap.EMPTY;
return (create_fn.cljs$core$IFn$_invoke$arity$2 ? create_fn.cljs$core$IFn$_invoke$arity$2(G__52319,G__52320) : create_fn.call(null,G__52319,G__52320));
})(),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(nc,np)], null);

}
}
});
shadow.dom.make_dom_node = (function shadow$dom$make_dom_node(structure){
var vec__52329 = shadow.dom.destructure_node(shadow.dom.create_dom_node,structure);
var node = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__52329,(0),null);
var node_children = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__52329,(1),null);
var seq__52334_53289 = cljs.core.seq(node_children);
var chunk__52335_53290 = null;
var count__52336_53291 = (0);
var i__52337_53292 = (0);
while(true){
if((i__52337_53292 < count__52336_53291)){
var child_struct_53293 = chunk__52335_53290.cljs$core$IIndexed$_nth$arity$2(null,i__52337_53292);
var children_53294 = shadow.dom.dom_node(child_struct_53293);
if(cljs.core.seq_QMARK_(children_53294)){
var seq__52388_53295 = cljs.core.seq(cljs.core.map.cljs$core$IFn$_invoke$arity$2(shadow.dom.dom_node,children_53294));
var chunk__52390_53296 = null;
var count__52391_53297 = (0);
var i__52392_53298 = (0);
while(true){
if((i__52392_53298 < count__52391_53297)){
var child_53299 = chunk__52390_53296.cljs$core$IIndexed$_nth$arity$2(null,i__52392_53298);
if(cljs.core.truth_(child_53299)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_53299);


var G__53300 = seq__52388_53295;
var G__53301 = chunk__52390_53296;
var G__53302 = count__52391_53297;
var G__53303 = (i__52392_53298 + (1));
seq__52388_53295 = G__53300;
chunk__52390_53296 = G__53301;
count__52391_53297 = G__53302;
i__52392_53298 = G__53303;
continue;
} else {
var G__53304 = seq__52388_53295;
var G__53305 = chunk__52390_53296;
var G__53306 = count__52391_53297;
var G__53307 = (i__52392_53298 + (1));
seq__52388_53295 = G__53304;
chunk__52390_53296 = G__53305;
count__52391_53297 = G__53306;
i__52392_53298 = G__53307;
continue;
}
} else {
var temp__5753__auto___53308 = cljs.core.seq(seq__52388_53295);
if(temp__5753__auto___53308){
var seq__52388_53309__$1 = temp__5753__auto___53308;
if(cljs.core.chunked_seq_QMARK_(seq__52388_53309__$1)){
var c__4638__auto___53310 = cljs.core.chunk_first(seq__52388_53309__$1);
var G__53311 = cljs.core.chunk_rest(seq__52388_53309__$1);
var G__53312 = c__4638__auto___53310;
var G__53313 = cljs.core.count(c__4638__auto___53310);
var G__53314 = (0);
seq__52388_53295 = G__53311;
chunk__52390_53296 = G__53312;
count__52391_53297 = G__53313;
i__52392_53298 = G__53314;
continue;
} else {
var child_53315 = cljs.core.first(seq__52388_53309__$1);
if(cljs.core.truth_(child_53315)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_53315);


var G__53316 = cljs.core.next(seq__52388_53309__$1);
var G__53317 = null;
var G__53318 = (0);
var G__53319 = (0);
seq__52388_53295 = G__53316;
chunk__52390_53296 = G__53317;
count__52391_53297 = G__53318;
i__52392_53298 = G__53319;
continue;
} else {
var G__53320 = cljs.core.next(seq__52388_53309__$1);
var G__53321 = null;
var G__53322 = (0);
var G__53323 = (0);
seq__52388_53295 = G__53320;
chunk__52390_53296 = G__53321;
count__52391_53297 = G__53322;
i__52392_53298 = G__53323;
continue;
}
}
} else {
}
}
break;
}
} else {
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,children_53294);
}


var G__53324 = seq__52334_53289;
var G__53325 = chunk__52335_53290;
var G__53326 = count__52336_53291;
var G__53327 = (i__52337_53292 + (1));
seq__52334_53289 = G__53324;
chunk__52335_53290 = G__53325;
count__52336_53291 = G__53326;
i__52337_53292 = G__53327;
continue;
} else {
var temp__5753__auto___53329 = cljs.core.seq(seq__52334_53289);
if(temp__5753__auto___53329){
var seq__52334_53330__$1 = temp__5753__auto___53329;
if(cljs.core.chunked_seq_QMARK_(seq__52334_53330__$1)){
var c__4638__auto___53331 = cljs.core.chunk_first(seq__52334_53330__$1);
var G__53332 = cljs.core.chunk_rest(seq__52334_53330__$1);
var G__53333 = c__4638__auto___53331;
var G__53334 = cljs.core.count(c__4638__auto___53331);
var G__53335 = (0);
seq__52334_53289 = G__53332;
chunk__52335_53290 = G__53333;
count__52336_53291 = G__53334;
i__52337_53292 = G__53335;
continue;
} else {
var child_struct_53336 = cljs.core.first(seq__52334_53330__$1);
var children_53337 = shadow.dom.dom_node(child_struct_53336);
if(cljs.core.seq_QMARK_(children_53337)){
var seq__52425_53338 = cljs.core.seq(cljs.core.map.cljs$core$IFn$_invoke$arity$2(shadow.dom.dom_node,children_53337));
var chunk__52427_53339 = null;
var count__52428_53340 = (0);
var i__52429_53341 = (0);
while(true){
if((i__52429_53341 < count__52428_53340)){
var child_53342 = chunk__52427_53339.cljs$core$IIndexed$_nth$arity$2(null,i__52429_53341);
if(cljs.core.truth_(child_53342)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_53342);


var G__53343 = seq__52425_53338;
var G__53344 = chunk__52427_53339;
var G__53345 = count__52428_53340;
var G__53346 = (i__52429_53341 + (1));
seq__52425_53338 = G__53343;
chunk__52427_53339 = G__53344;
count__52428_53340 = G__53345;
i__52429_53341 = G__53346;
continue;
} else {
var G__53347 = seq__52425_53338;
var G__53348 = chunk__52427_53339;
var G__53349 = count__52428_53340;
var G__53350 = (i__52429_53341 + (1));
seq__52425_53338 = G__53347;
chunk__52427_53339 = G__53348;
count__52428_53340 = G__53349;
i__52429_53341 = G__53350;
continue;
}
} else {
var temp__5753__auto___53352__$1 = cljs.core.seq(seq__52425_53338);
if(temp__5753__auto___53352__$1){
var seq__52425_53353__$1 = temp__5753__auto___53352__$1;
if(cljs.core.chunked_seq_QMARK_(seq__52425_53353__$1)){
var c__4638__auto___53354 = cljs.core.chunk_first(seq__52425_53353__$1);
var G__53355 = cljs.core.chunk_rest(seq__52425_53353__$1);
var G__53356 = c__4638__auto___53354;
var G__53357 = cljs.core.count(c__4638__auto___53354);
var G__53358 = (0);
seq__52425_53338 = G__53355;
chunk__52427_53339 = G__53356;
count__52428_53340 = G__53357;
i__52429_53341 = G__53358;
continue;
} else {
var child_53360 = cljs.core.first(seq__52425_53353__$1);
if(cljs.core.truth_(child_53360)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_53360);


var G__53361 = cljs.core.next(seq__52425_53353__$1);
var G__53362 = null;
var G__53363 = (0);
var G__53364 = (0);
seq__52425_53338 = G__53361;
chunk__52427_53339 = G__53362;
count__52428_53340 = G__53363;
i__52429_53341 = G__53364;
continue;
} else {
var G__53365 = cljs.core.next(seq__52425_53353__$1);
var G__53366 = null;
var G__53367 = (0);
var G__53368 = (0);
seq__52425_53338 = G__53365;
chunk__52427_53339 = G__53366;
count__52428_53340 = G__53367;
i__52429_53341 = G__53368;
continue;
}
}
} else {
}
}
break;
}
} else {
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,children_53337);
}


var G__53369 = cljs.core.next(seq__52334_53330__$1);
var G__53370 = null;
var G__53371 = (0);
var G__53372 = (0);
seq__52334_53289 = G__53369;
chunk__52335_53290 = G__53370;
count__52336_53291 = G__53371;
i__52337_53292 = G__53372;
continue;
}
} else {
}
}
break;
}

return node;
});
(cljs.core.Keyword.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.Keyword.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var this$__$1 = this;
return shadow.dom.make_dom_node(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [this$__$1], null));
}));

(cljs.core.PersistentVector.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.PersistentVector.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var this$__$1 = this;
return shadow.dom.make_dom_node(this$__$1);
}));

(cljs.core.LazySeq.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.LazySeq.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var this$__$1 = this;
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(shadow.dom._to_dom,this$__$1);
}));
if(cljs.core.truth_(((typeof HTMLElement) != 'undefined'))){
(HTMLElement.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(HTMLElement.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var this$__$1 = this;
return this$__$1;
}));
} else {
}
if(cljs.core.truth_(((typeof DocumentFragment) != 'undefined'))){
(DocumentFragment.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(DocumentFragment.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var this$__$1 = this;
return this$__$1;
}));
} else {
}
/**
 * clear node children
 */
shadow.dom.reset = (function shadow$dom$reset(node){
return goog.dom.removeChildren(shadow.dom.dom_node(node));
});
shadow.dom.remove = (function shadow$dom$remove(node){
if((((!((node == null))))?(((((node.cljs$lang$protocol_mask$partition0$ & (8388608))) || ((cljs.core.PROTOCOL_SENTINEL === node.cljs$core$ISeqable$))))?true:false):false)){
var seq__52460 = cljs.core.seq(node);
var chunk__52461 = null;
var count__52462 = (0);
var i__52463 = (0);
while(true){
if((i__52463 < count__52462)){
var n = chunk__52461.cljs$core$IIndexed$_nth$arity$2(null,i__52463);
(shadow.dom.remove.cljs$core$IFn$_invoke$arity$1 ? shadow.dom.remove.cljs$core$IFn$_invoke$arity$1(n) : shadow.dom.remove.call(null,n));


var G__53373 = seq__52460;
var G__53374 = chunk__52461;
var G__53375 = count__52462;
var G__53376 = (i__52463 + (1));
seq__52460 = G__53373;
chunk__52461 = G__53374;
count__52462 = G__53375;
i__52463 = G__53376;
continue;
} else {
var temp__5753__auto__ = cljs.core.seq(seq__52460);
if(temp__5753__auto__){
var seq__52460__$1 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__52460__$1)){
var c__4638__auto__ = cljs.core.chunk_first(seq__52460__$1);
var G__53379 = cljs.core.chunk_rest(seq__52460__$1);
var G__53380 = c__4638__auto__;
var G__53381 = cljs.core.count(c__4638__auto__);
var G__53382 = (0);
seq__52460 = G__53379;
chunk__52461 = G__53380;
count__52462 = G__53381;
i__52463 = G__53382;
continue;
} else {
var n = cljs.core.first(seq__52460__$1);
(shadow.dom.remove.cljs$core$IFn$_invoke$arity$1 ? shadow.dom.remove.cljs$core$IFn$_invoke$arity$1(n) : shadow.dom.remove.call(null,n));


var G__53383 = cljs.core.next(seq__52460__$1);
var G__53384 = null;
var G__53385 = (0);
var G__53386 = (0);
seq__52460 = G__53383;
chunk__52461 = G__53384;
count__52462 = G__53385;
i__52463 = G__53386;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return goog.dom.removeNode(node);
}
});
shadow.dom.replace_node = (function shadow$dom$replace_node(old,new$){
return goog.dom.replaceNode(shadow.dom.dom_node(new$),shadow.dom.dom_node(old));
});
shadow.dom.text = (function shadow$dom$text(var_args){
var G__52489 = arguments.length;
switch (G__52489) {
case 2:
return shadow.dom.text.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return shadow.dom.text.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.text.cljs$core$IFn$_invoke$arity$2 = (function (el,new_text){
return (shadow.dom.dom_node(el).innerText = new_text);
}));

(shadow.dom.text.cljs$core$IFn$_invoke$arity$1 = (function (el){
return shadow.dom.dom_node(el).innerText;
}));

(shadow.dom.text.cljs$lang$maxFixedArity = 2);

shadow.dom.check = (function shadow$dom$check(var_args){
var G__52497 = arguments.length;
switch (G__52497) {
case 1:
return shadow.dom.check.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.check.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.check.cljs$core$IFn$_invoke$arity$1 = (function (el){
return shadow.dom.check.cljs$core$IFn$_invoke$arity$2(el,true);
}));

(shadow.dom.check.cljs$core$IFn$_invoke$arity$2 = (function (el,checked){
return (shadow.dom.dom_node(el).checked = checked);
}));

(shadow.dom.check.cljs$lang$maxFixedArity = 2);

shadow.dom.checked_QMARK_ = (function shadow$dom$checked_QMARK_(el){
return shadow.dom.dom_node(el).checked;
});
shadow.dom.form_elements = (function shadow$dom$form_elements(el){
return (new shadow.dom.NativeColl(shadow.dom.dom_node(el).elements));
});
shadow.dom.children = (function shadow$dom$children(el){
return (new shadow.dom.NativeColl(shadow.dom.dom_node(el).children));
});
shadow.dom.child_nodes = (function shadow$dom$child_nodes(el){
return (new shadow.dom.NativeColl(shadow.dom.dom_node(el).childNodes));
});
shadow.dom.attr = (function shadow$dom$attr(var_args){
var G__52515 = arguments.length;
switch (G__52515) {
case 2:
return shadow.dom.attr.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return shadow.dom.attr.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.attr.cljs$core$IFn$_invoke$arity$2 = (function (el,key){
return shadow.dom.dom_node(el).getAttribute(cljs.core.name(key));
}));

(shadow.dom.attr.cljs$core$IFn$_invoke$arity$3 = (function (el,key,default$){
var or__4212__auto__ = shadow.dom.dom_node(el).getAttribute(cljs.core.name(key));
if(cljs.core.truth_(or__4212__auto__)){
return or__4212__auto__;
} else {
return default$;
}
}));

(shadow.dom.attr.cljs$lang$maxFixedArity = 3);

shadow.dom.del_attr = (function shadow$dom$del_attr(el,key){
return shadow.dom.dom_node(el).removeAttribute(cljs.core.name(key));
});
shadow.dom.data = (function shadow$dom$data(el,key){
return shadow.dom.dom_node(el).getAttribute(["data-",cljs.core.name(key)].join(''));
});
shadow.dom.set_data = (function shadow$dom$set_data(el,key,value){
return shadow.dom.dom_node(el).setAttribute(["data-",cljs.core.name(key)].join(''),cljs.core.str.cljs$core$IFn$_invoke$arity$1(value));
});
shadow.dom.set_html = (function shadow$dom$set_html(node,text){
return (shadow.dom.dom_node(node).innerHTML = text);
});
shadow.dom.get_html = (function shadow$dom$get_html(node){
return shadow.dom.dom_node(node).innerHTML;
});
shadow.dom.fragment = (function shadow$dom$fragment(var_args){
var args__4824__auto__ = [];
var len__4818__auto___53393 = arguments.length;
var i__4819__auto___53394 = (0);
while(true){
if((i__4819__auto___53394 < len__4818__auto___53393)){
args__4824__auto__.push((arguments[i__4819__auto___53394]));

var G__53395 = (i__4819__auto___53394 + (1));
i__4819__auto___53394 = G__53395;
continue;
} else {
}
break;
}

var argseq__4825__auto__ = ((((0) < args__4824__auto__.length))?(new cljs.core.IndexedSeq(args__4824__auto__.slice((0)),(0),null)):null);
return shadow.dom.fragment.cljs$core$IFn$_invoke$arity$variadic(argseq__4825__auto__);
});

(shadow.dom.fragment.cljs$core$IFn$_invoke$arity$variadic = (function (nodes){
var fragment = document.createDocumentFragment();
var seq__52541_53397 = cljs.core.seq(nodes);
var chunk__52542_53398 = null;
var count__52543_53399 = (0);
var i__52544_53400 = (0);
while(true){
if((i__52544_53400 < count__52543_53399)){
var node_53401 = chunk__52542_53398.cljs$core$IIndexed$_nth$arity$2(null,i__52544_53400);
fragment.appendChild(shadow.dom._to_dom(node_53401));


var G__53402 = seq__52541_53397;
var G__53403 = chunk__52542_53398;
var G__53404 = count__52543_53399;
var G__53405 = (i__52544_53400 + (1));
seq__52541_53397 = G__53402;
chunk__52542_53398 = G__53403;
count__52543_53399 = G__53404;
i__52544_53400 = G__53405;
continue;
} else {
var temp__5753__auto___53406 = cljs.core.seq(seq__52541_53397);
if(temp__5753__auto___53406){
var seq__52541_53407__$1 = temp__5753__auto___53406;
if(cljs.core.chunked_seq_QMARK_(seq__52541_53407__$1)){
var c__4638__auto___53409 = cljs.core.chunk_first(seq__52541_53407__$1);
var G__53410 = cljs.core.chunk_rest(seq__52541_53407__$1);
var G__53411 = c__4638__auto___53409;
var G__53412 = cljs.core.count(c__4638__auto___53409);
var G__53413 = (0);
seq__52541_53397 = G__53410;
chunk__52542_53398 = G__53411;
count__52543_53399 = G__53412;
i__52544_53400 = G__53413;
continue;
} else {
var node_53414 = cljs.core.first(seq__52541_53407__$1);
fragment.appendChild(shadow.dom._to_dom(node_53414));


var G__53415 = cljs.core.next(seq__52541_53407__$1);
var G__53416 = null;
var G__53417 = (0);
var G__53418 = (0);
seq__52541_53397 = G__53415;
chunk__52542_53398 = G__53416;
count__52543_53399 = G__53417;
i__52544_53400 = G__53418;
continue;
}
} else {
}
}
break;
}

return (new shadow.dom.NativeColl(fragment));
}));

(shadow.dom.fragment.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(shadow.dom.fragment.cljs$lang$applyTo = (function (seq52536){
var self__4806__auto__ = this;
return self__4806__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq52536));
}));

/**
 * given a html string, eval all <script> tags and return the html without the scripts
 * don't do this for everything, only content you trust.
 */
shadow.dom.eval_scripts = (function shadow$dom$eval_scripts(s){
var scripts = cljs.core.re_seq(/<script[^>]*?>(.+?)<\/script>/,s);
var seq__52555_53419 = cljs.core.seq(scripts);
var chunk__52556_53420 = null;
var count__52557_53421 = (0);
var i__52558_53422 = (0);
while(true){
if((i__52558_53422 < count__52557_53421)){
var vec__52578_53423 = chunk__52556_53420.cljs$core$IIndexed$_nth$arity$2(null,i__52558_53422);
var script_tag_53424 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__52578_53423,(0),null);
var script_body_53425 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__52578_53423,(1),null);
eval(script_body_53425);


var G__53426 = seq__52555_53419;
var G__53427 = chunk__52556_53420;
var G__53428 = count__52557_53421;
var G__53429 = (i__52558_53422 + (1));
seq__52555_53419 = G__53426;
chunk__52556_53420 = G__53427;
count__52557_53421 = G__53428;
i__52558_53422 = G__53429;
continue;
} else {
var temp__5753__auto___53430 = cljs.core.seq(seq__52555_53419);
if(temp__5753__auto___53430){
var seq__52555_53431__$1 = temp__5753__auto___53430;
if(cljs.core.chunked_seq_QMARK_(seq__52555_53431__$1)){
var c__4638__auto___53432 = cljs.core.chunk_first(seq__52555_53431__$1);
var G__53433 = cljs.core.chunk_rest(seq__52555_53431__$1);
var G__53434 = c__4638__auto___53432;
var G__53435 = cljs.core.count(c__4638__auto___53432);
var G__53436 = (0);
seq__52555_53419 = G__53433;
chunk__52556_53420 = G__53434;
count__52557_53421 = G__53435;
i__52558_53422 = G__53436;
continue;
} else {
var vec__52586_53437 = cljs.core.first(seq__52555_53431__$1);
var script_tag_53438 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__52586_53437,(0),null);
var script_body_53439 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__52586_53437,(1),null);
eval(script_body_53439);


var G__53440 = cljs.core.next(seq__52555_53431__$1);
var G__53441 = null;
var G__53442 = (0);
var G__53443 = (0);
seq__52555_53419 = G__53440;
chunk__52556_53420 = G__53441;
count__52557_53421 = G__53442;
i__52558_53422 = G__53443;
continue;
}
} else {
}
}
break;
}

return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (s__$1,p__52590){
var vec__52591 = p__52590;
var script_tag = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__52591,(0),null);
var script_body = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__52591,(1),null);
return clojure.string.replace(s__$1,script_tag,"");
}),s,scripts);
});
shadow.dom.str__GT_fragment = (function shadow$dom$str__GT_fragment(s){
var el = document.createElement("div");
(el.innerHTML = s);

return (new shadow.dom.NativeColl(goog.dom.childrenToNode_(document,el)));
});
shadow.dom.node_name = (function shadow$dom$node_name(el){
return shadow.dom.dom_node(el).nodeName;
});
shadow.dom.ancestor_by_class = (function shadow$dom$ancestor_by_class(el,cls){
return goog.dom.getAncestorByClass(shadow.dom.dom_node(el),cls);
});
shadow.dom.ancestor_by_tag = (function shadow$dom$ancestor_by_tag(var_args){
var G__52616 = arguments.length;
switch (G__52616) {
case 2:
return shadow.dom.ancestor_by_tag.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return shadow.dom.ancestor_by_tag.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.ancestor_by_tag.cljs$core$IFn$_invoke$arity$2 = (function (el,tag){
return goog.dom.getAncestorByTagNameAndClass(shadow.dom.dom_node(el),cljs.core.name(tag));
}));

(shadow.dom.ancestor_by_tag.cljs$core$IFn$_invoke$arity$3 = (function (el,tag,cls){
return goog.dom.getAncestorByTagNameAndClass(shadow.dom.dom_node(el),cljs.core.name(tag),cljs.core.name(cls));
}));

(shadow.dom.ancestor_by_tag.cljs$lang$maxFixedArity = 3);

shadow.dom.get_value = (function shadow$dom$get_value(dom){
return goog.dom.forms.getValue(shadow.dom.dom_node(dom));
});
shadow.dom.set_value = (function shadow$dom$set_value(dom,value){
return goog.dom.forms.setValue(shadow.dom.dom_node(dom),value);
});
shadow.dom.px = (function shadow$dom$px(value){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1((value | (0))),"px"].join('');
});
shadow.dom.pct = (function shadow$dom$pct(value){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(value),"%"].join('');
});
shadow.dom.remove_style_STAR_ = (function shadow$dom$remove_style_STAR_(el,style){
return el.style.removeProperty(cljs.core.name(style));
});
shadow.dom.remove_style = (function shadow$dom$remove_style(el,style){
var el__$1 = shadow.dom.dom_node(el);
return shadow.dom.remove_style_STAR_(el__$1,style);
});
shadow.dom.remove_styles = (function shadow$dom$remove_styles(el,style_keys){
var el__$1 = shadow.dom.dom_node(el);
var seq__52655 = cljs.core.seq(style_keys);
var chunk__52656 = null;
var count__52657 = (0);
var i__52658 = (0);
while(true){
if((i__52658 < count__52657)){
var it = chunk__52656.cljs$core$IIndexed$_nth$arity$2(null,i__52658);
shadow.dom.remove_style_STAR_(el__$1,it);


var G__53446 = seq__52655;
var G__53447 = chunk__52656;
var G__53448 = count__52657;
var G__53449 = (i__52658 + (1));
seq__52655 = G__53446;
chunk__52656 = G__53447;
count__52657 = G__53448;
i__52658 = G__53449;
continue;
} else {
var temp__5753__auto__ = cljs.core.seq(seq__52655);
if(temp__5753__auto__){
var seq__52655__$1 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__52655__$1)){
var c__4638__auto__ = cljs.core.chunk_first(seq__52655__$1);
var G__53451 = cljs.core.chunk_rest(seq__52655__$1);
var G__53452 = c__4638__auto__;
var G__53453 = cljs.core.count(c__4638__auto__);
var G__53454 = (0);
seq__52655 = G__53451;
chunk__52656 = G__53452;
count__52657 = G__53453;
i__52658 = G__53454;
continue;
} else {
var it = cljs.core.first(seq__52655__$1);
shadow.dom.remove_style_STAR_(el__$1,it);


var G__53456 = cljs.core.next(seq__52655__$1);
var G__53457 = null;
var G__53458 = (0);
var G__53459 = (0);
seq__52655 = G__53456;
chunk__52656 = G__53457;
count__52657 = G__53458;
i__52658 = G__53459;
continue;
}
} else {
return null;
}
}
break;
}
});

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IKVReduce}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
shadow.dom.Coordinate = (function (x,y,__meta,__extmap,__hash){
this.x = x;
this.y = y;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2230716170;
this.cljs$lang$protocol_mask$partition1$ = 139264;
});
(shadow.dom.Coordinate.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__4461__auto__,k__4462__auto__){
var self__ = this;
var this__4461__auto____$1 = this;
return this__4461__auto____$1.cljs$core$ILookup$_lookup$arity$3(null,k__4462__auto__,null);
}));

(shadow.dom.Coordinate.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__4463__auto__,k52673,else__4464__auto__){
var self__ = this;
var this__4463__auto____$1 = this;
var G__52686 = k52673;
var G__52686__$1 = (((G__52686 instanceof cljs.core.Keyword))?G__52686.fqn:null);
switch (G__52686__$1) {
case "x":
return self__.x;

break;
case "y":
return self__.y;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k52673,else__4464__auto__);

}
}));

(shadow.dom.Coordinate.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__4481__auto__,f__4482__auto__,init__4483__auto__){
var self__ = this;
var this__4481__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__4484__auto__,p__52693){
var vec__52695 = p__52693;
var k__4485__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__52695,(0),null);
var v__4486__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__52695,(1),null);
return (f__4482__auto__.cljs$core$IFn$_invoke$arity$3 ? f__4482__auto__.cljs$core$IFn$_invoke$arity$3(ret__4484__auto__,k__4485__auto__,v__4486__auto__) : f__4482__auto__.call(null,ret__4484__auto__,k__4485__auto__,v__4486__auto__));
}),init__4483__auto__,this__4481__auto____$1);
}));

(shadow.dom.Coordinate.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__4476__auto__,writer__4477__auto__,opts__4478__auto__){
var self__ = this;
var this__4476__auto____$1 = this;
var pr_pair__4479__auto__ = (function (keyval__4480__auto__){
return cljs.core.pr_sequential_writer(writer__4477__auto__,cljs.core.pr_writer,""," ","",opts__4478__auto__,keyval__4480__auto__);
});
return cljs.core.pr_sequential_writer(writer__4477__auto__,pr_pair__4479__auto__,"#shadow.dom.Coordinate{",", ","}",opts__4478__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"x","x",2099068185),self__.x],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"y","y",-1757859776),self__.y],null))], null),self__.__extmap));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__52672){
var self__ = this;
var G__52672__$1 = this;
return (new cljs.core.RecordIter((0),G__52672__$1,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"x","x",2099068185),new cljs.core.Keyword(null,"y","y",-1757859776)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__4459__auto__){
var self__ = this;
var this__4459__auto____$1 = this;
return self__.__meta;
}));

(shadow.dom.Coordinate.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__4456__auto__){
var self__ = this;
var this__4456__auto____$1 = this;
return (new shadow.dom.Coordinate(self__.x,self__.y,self__.__meta,self__.__extmap,self__.__hash));
}));

(shadow.dom.Coordinate.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__4465__auto__){
var self__ = this;
var this__4465__auto____$1 = this;
return (2 + cljs.core.count(self__.__extmap));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__4457__auto__){
var self__ = this;
var this__4457__auto____$1 = this;
var h__4319__auto__ = self__.__hash;
if((!((h__4319__auto__ == null)))){
return h__4319__auto__;
} else {
var h__4319__auto____$1 = (function (coll__4458__auto__){
return (145542109 ^ cljs.core.hash_unordered_coll(coll__4458__auto__));
})(this__4457__auto____$1);
(self__.__hash = h__4319__auto____$1);

return h__4319__auto____$1;
}
}));

(shadow.dom.Coordinate.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this52674,other52675){
var self__ = this;
var this52674__$1 = this;
return (((!((other52675 == null)))) && ((((this52674__$1.constructor === other52675.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this52674__$1.x,other52675.x)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this52674__$1.y,other52675.y)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this52674__$1.__extmap,other52675.__extmap)))))))));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__4471__auto__,k__4472__auto__){
var self__ = this;
var this__4471__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"y","y",-1757859776),null,new cljs.core.Keyword(null,"x","x",2099068185),null], null), null),k__4472__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core._with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__4471__auto____$1),self__.__meta),k__4472__auto__);
} else {
return (new shadow.dom.Coordinate(self__.x,self__.y,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__4472__auto__)),null));
}
}));

(shadow.dom.Coordinate.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__4468__auto__,k52673){
var self__ = this;
var this__4468__auto____$1 = this;
var G__52706 = k52673;
var G__52706__$1 = (((G__52706 instanceof cljs.core.Keyword))?G__52706.fqn:null);
switch (G__52706__$1) {
case "x":
case "y":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k52673);

}
}));

(shadow.dom.Coordinate.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__4469__auto__,k__4470__auto__,G__52672){
var self__ = this;
var this__4469__auto____$1 = this;
var pred__52712 = cljs.core.keyword_identical_QMARK_;
var expr__52713 = k__4470__auto__;
if(cljs.core.truth_((pred__52712.cljs$core$IFn$_invoke$arity$2 ? pred__52712.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"x","x",2099068185),expr__52713) : pred__52712.call(null,new cljs.core.Keyword(null,"x","x",2099068185),expr__52713)))){
return (new shadow.dom.Coordinate(G__52672,self__.y,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__52712.cljs$core$IFn$_invoke$arity$2 ? pred__52712.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"y","y",-1757859776),expr__52713) : pred__52712.call(null,new cljs.core.Keyword(null,"y","y",-1757859776),expr__52713)))){
return (new shadow.dom.Coordinate(self__.x,G__52672,self__.__meta,self__.__extmap,null));
} else {
return (new shadow.dom.Coordinate(self__.x,self__.y,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__4470__auto__,G__52672),null));
}
}
}));

(shadow.dom.Coordinate.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__4474__auto__){
var self__ = this;
var this__4474__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"x","x",2099068185),self__.x,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"y","y",-1757859776),self__.y,null))], null),self__.__extmap));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__4460__auto__,G__52672){
var self__ = this;
var this__4460__auto____$1 = this;
return (new shadow.dom.Coordinate(self__.x,self__.y,G__52672,self__.__extmap,self__.__hash));
}));

(shadow.dom.Coordinate.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__4466__auto__,entry__4467__auto__){
var self__ = this;
var this__4466__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__4467__auto__)){
return this__4466__auto____$1.cljs$core$IAssociative$_assoc$arity$3(null,cljs.core._nth(entry__4467__auto__,(0)),cljs.core._nth(entry__4467__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__4466__auto____$1,entry__4467__auto__);
}
}));

(shadow.dom.Coordinate.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"x","x",-555367584,null),new cljs.core.Symbol(null,"y","y",-117328249,null)], null);
}));

(shadow.dom.Coordinate.cljs$lang$type = true);

(shadow.dom.Coordinate.cljs$lang$ctorPrSeq = (function (this__4505__auto__){
return (new cljs.core.List(null,"shadow.dom/Coordinate",null,(1),null));
}));

(shadow.dom.Coordinate.cljs$lang$ctorPrWriter = (function (this__4505__auto__,writer__4506__auto__){
return cljs.core._write(writer__4506__auto__,"shadow.dom/Coordinate");
}));

/**
 * Positional factory function for shadow.dom/Coordinate.
 */
shadow.dom.__GT_Coordinate = (function shadow$dom$__GT_Coordinate(x,y){
return (new shadow.dom.Coordinate(x,y,null,null,null));
});

/**
 * Factory function for shadow.dom/Coordinate, taking a map of keywords to field values.
 */
shadow.dom.map__GT_Coordinate = (function shadow$dom$map__GT_Coordinate(G__52677){
var extmap__4501__auto__ = (function (){var G__52746 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__52677,new cljs.core.Keyword(null,"x","x",2099068185),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"y","y",-1757859776)], 0));
if(cljs.core.record_QMARK_(G__52677)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__52746);
} else {
return G__52746;
}
})();
return (new shadow.dom.Coordinate(new cljs.core.Keyword(null,"x","x",2099068185).cljs$core$IFn$_invoke$arity$1(G__52677),new cljs.core.Keyword(null,"y","y",-1757859776).cljs$core$IFn$_invoke$arity$1(G__52677),null,cljs.core.not_empty(extmap__4501__auto__),null));
});

shadow.dom.get_position = (function shadow$dom$get_position(el){
var pos = goog.style.getPosition(shadow.dom.dom_node(el));
return shadow.dom.__GT_Coordinate(pos.x,pos.y);
});
shadow.dom.get_client_position = (function shadow$dom$get_client_position(el){
var pos = goog.style.getClientPosition(shadow.dom.dom_node(el));
return shadow.dom.__GT_Coordinate(pos.x,pos.y);
});
shadow.dom.get_page_offset = (function shadow$dom$get_page_offset(el){
var pos = goog.style.getPageOffset(shadow.dom.dom_node(el));
return shadow.dom.__GT_Coordinate(pos.x,pos.y);
});

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IKVReduce}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
shadow.dom.Size = (function (w,h,__meta,__extmap,__hash){
this.w = w;
this.h = h;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2230716170;
this.cljs$lang$protocol_mask$partition1$ = 139264;
});
(shadow.dom.Size.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__4461__auto__,k__4462__auto__){
var self__ = this;
var this__4461__auto____$1 = this;
return this__4461__auto____$1.cljs$core$ILookup$_lookup$arity$3(null,k__4462__auto__,null);
}));

(shadow.dom.Size.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__4463__auto__,k52766,else__4464__auto__){
var self__ = this;
var this__4463__auto____$1 = this;
var G__52793 = k52766;
var G__52793__$1 = (((G__52793 instanceof cljs.core.Keyword))?G__52793.fqn:null);
switch (G__52793__$1) {
case "w":
return self__.w;

break;
case "h":
return self__.h;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k52766,else__4464__auto__);

}
}));

(shadow.dom.Size.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__4481__auto__,f__4482__auto__,init__4483__auto__){
var self__ = this;
var this__4481__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__4484__auto__,p__52799){
var vec__52800 = p__52799;
var k__4485__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__52800,(0),null);
var v__4486__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__52800,(1),null);
return (f__4482__auto__.cljs$core$IFn$_invoke$arity$3 ? f__4482__auto__.cljs$core$IFn$_invoke$arity$3(ret__4484__auto__,k__4485__auto__,v__4486__auto__) : f__4482__auto__.call(null,ret__4484__auto__,k__4485__auto__,v__4486__auto__));
}),init__4483__auto__,this__4481__auto____$1);
}));

(shadow.dom.Size.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__4476__auto__,writer__4477__auto__,opts__4478__auto__){
var self__ = this;
var this__4476__auto____$1 = this;
var pr_pair__4479__auto__ = (function (keyval__4480__auto__){
return cljs.core.pr_sequential_writer(writer__4477__auto__,cljs.core.pr_writer,""," ","",opts__4478__auto__,keyval__4480__auto__);
});
return cljs.core.pr_sequential_writer(writer__4477__auto__,pr_pair__4479__auto__,"#shadow.dom.Size{",", ","}",opts__4478__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"w","w",354169001),self__.w],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"h","h",1109658740),self__.h],null))], null),self__.__extmap));
}));

(shadow.dom.Size.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__52765){
var self__ = this;
var G__52765__$1 = this;
return (new cljs.core.RecordIter((0),G__52765__$1,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"w","w",354169001),new cljs.core.Keyword(null,"h","h",1109658740)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
}));

(shadow.dom.Size.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__4459__auto__){
var self__ = this;
var this__4459__auto____$1 = this;
return self__.__meta;
}));

(shadow.dom.Size.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__4456__auto__){
var self__ = this;
var this__4456__auto____$1 = this;
return (new shadow.dom.Size(self__.w,self__.h,self__.__meta,self__.__extmap,self__.__hash));
}));

(shadow.dom.Size.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__4465__auto__){
var self__ = this;
var this__4465__auto____$1 = this;
return (2 + cljs.core.count(self__.__extmap));
}));

(shadow.dom.Size.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__4457__auto__){
var self__ = this;
var this__4457__auto____$1 = this;
var h__4319__auto__ = self__.__hash;
if((!((h__4319__auto__ == null)))){
return h__4319__auto__;
} else {
var h__4319__auto____$1 = (function (coll__4458__auto__){
return (-1228019642 ^ cljs.core.hash_unordered_coll(coll__4458__auto__));
})(this__4457__auto____$1);
(self__.__hash = h__4319__auto____$1);

return h__4319__auto____$1;
}
}));

(shadow.dom.Size.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this52767,other52768){
var self__ = this;
var this52767__$1 = this;
return (((!((other52768 == null)))) && ((((this52767__$1.constructor === other52768.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this52767__$1.w,other52768.w)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this52767__$1.h,other52768.h)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this52767__$1.__extmap,other52768.__extmap)))))))));
}));

(shadow.dom.Size.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__4471__auto__,k__4472__auto__){
var self__ = this;
var this__4471__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"w","w",354169001),null,new cljs.core.Keyword(null,"h","h",1109658740),null], null), null),k__4472__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core._with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__4471__auto____$1),self__.__meta),k__4472__auto__);
} else {
return (new shadow.dom.Size(self__.w,self__.h,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__4472__auto__)),null));
}
}));

(shadow.dom.Size.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__4468__auto__,k52766){
var self__ = this;
var this__4468__auto____$1 = this;
var G__52860 = k52766;
var G__52860__$1 = (((G__52860 instanceof cljs.core.Keyword))?G__52860.fqn:null);
switch (G__52860__$1) {
case "w":
case "h":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k52766);

}
}));

(shadow.dom.Size.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__4469__auto__,k__4470__auto__,G__52765){
var self__ = this;
var this__4469__auto____$1 = this;
var pred__52865 = cljs.core.keyword_identical_QMARK_;
var expr__52866 = k__4470__auto__;
if(cljs.core.truth_((pred__52865.cljs$core$IFn$_invoke$arity$2 ? pred__52865.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"w","w",354169001),expr__52866) : pred__52865.call(null,new cljs.core.Keyword(null,"w","w",354169001),expr__52866)))){
return (new shadow.dom.Size(G__52765,self__.h,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__52865.cljs$core$IFn$_invoke$arity$2 ? pred__52865.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"h","h",1109658740),expr__52866) : pred__52865.call(null,new cljs.core.Keyword(null,"h","h",1109658740),expr__52866)))){
return (new shadow.dom.Size(self__.w,G__52765,self__.__meta,self__.__extmap,null));
} else {
return (new shadow.dom.Size(self__.w,self__.h,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__4470__auto__,G__52765),null));
}
}
}));

(shadow.dom.Size.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__4474__auto__){
var self__ = this;
var this__4474__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"w","w",354169001),self__.w,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"h","h",1109658740),self__.h,null))], null),self__.__extmap));
}));

(shadow.dom.Size.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__4460__auto__,G__52765){
var self__ = this;
var this__4460__auto____$1 = this;
return (new shadow.dom.Size(self__.w,self__.h,G__52765,self__.__extmap,self__.__hash));
}));

(shadow.dom.Size.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__4466__auto__,entry__4467__auto__){
var self__ = this;
var this__4466__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__4467__auto__)){
return this__4466__auto____$1.cljs$core$IAssociative$_assoc$arity$3(null,cljs.core._nth(entry__4467__auto__,(0)),cljs.core._nth(entry__4467__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__4466__auto____$1,entry__4467__auto__);
}
}));

(shadow.dom.Size.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"w","w",1994700528,null),new cljs.core.Symbol(null,"h","h",-1544777029,null)], null);
}));

(shadow.dom.Size.cljs$lang$type = true);

(shadow.dom.Size.cljs$lang$ctorPrSeq = (function (this__4505__auto__){
return (new cljs.core.List(null,"shadow.dom/Size",null,(1),null));
}));

(shadow.dom.Size.cljs$lang$ctorPrWriter = (function (this__4505__auto__,writer__4506__auto__){
return cljs.core._write(writer__4506__auto__,"shadow.dom/Size");
}));

/**
 * Positional factory function for shadow.dom/Size.
 */
shadow.dom.__GT_Size = (function shadow$dom$__GT_Size(w,h){
return (new shadow.dom.Size(w,h,null,null,null));
});

/**
 * Factory function for shadow.dom/Size, taking a map of keywords to field values.
 */
shadow.dom.map__GT_Size = (function shadow$dom$map__GT_Size(G__52775){
var extmap__4501__auto__ = (function (){var G__52899 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__52775,new cljs.core.Keyword(null,"w","w",354169001),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"h","h",1109658740)], 0));
if(cljs.core.record_QMARK_(G__52775)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__52899);
} else {
return G__52899;
}
})();
return (new shadow.dom.Size(new cljs.core.Keyword(null,"w","w",354169001).cljs$core$IFn$_invoke$arity$1(G__52775),new cljs.core.Keyword(null,"h","h",1109658740).cljs$core$IFn$_invoke$arity$1(G__52775),null,cljs.core.not_empty(extmap__4501__auto__),null));
});

shadow.dom.size__GT_clj = (function shadow$dom$size__GT_clj(size){
return (new shadow.dom.Size(size.width,size.height,null,null,null));
});
shadow.dom.get_size = (function shadow$dom$get_size(el){
return shadow.dom.size__GT_clj(goog.style.getSize(shadow.dom.dom_node(el)));
});
shadow.dom.get_height = (function shadow$dom$get_height(el){
return shadow.dom.get_size(el).h;
});
shadow.dom.get_viewport_size = (function shadow$dom$get_viewport_size(){
return shadow.dom.size__GT_clj(goog.dom.getViewportSize());
});
shadow.dom.first_child = (function shadow$dom$first_child(el){
return (shadow.dom.dom_node(el).children[(0)]);
});
shadow.dom.select_option_values = (function shadow$dom$select_option_values(el){
var native$ = shadow.dom.dom_node(el);
var opts = (native$["options"]);
var a__4692__auto__ = opts;
var l__4693__auto__ = a__4692__auto__.length;
var i = (0);
var ret = cljs.core.PersistentVector.EMPTY;
while(true){
if((i < l__4693__auto__)){
var G__53485 = (i + (1));
var G__53486 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(ret,(opts[i]["value"]));
i = G__53485;
ret = G__53486;
continue;
} else {
return ret;
}
break;
}
});
shadow.dom.build_url = (function shadow$dom$build_url(path,query_params){
if(cljs.core.empty_QMARK_(query_params)){
return path;
} else {
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(path),"?",clojure.string.join.cljs$core$IFn$_invoke$arity$2("&",cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__52924){
var vec__52925 = p__52924;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__52925,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__52925,(1),null);
return [cljs.core.name(k),"=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(encodeURIComponent(cljs.core.str.cljs$core$IFn$_invoke$arity$1(v)))].join('');
}),query_params))].join('');
}
});
shadow.dom.redirect = (function shadow$dom$redirect(var_args){
var G__52932 = arguments.length;
switch (G__52932) {
case 1:
return shadow.dom.redirect.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.redirect.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.redirect.cljs$core$IFn$_invoke$arity$1 = (function (path){
return shadow.dom.redirect.cljs$core$IFn$_invoke$arity$2(path,cljs.core.PersistentArrayMap.EMPTY);
}));

(shadow.dom.redirect.cljs$core$IFn$_invoke$arity$2 = (function (path,query_params){
return (document["location"]["href"] = shadow.dom.build_url(path,query_params));
}));

(shadow.dom.redirect.cljs$lang$maxFixedArity = 2);

shadow.dom.reload_BANG_ = (function shadow$dom$reload_BANG_(){
return (document.location.href = document.location.href);
});
shadow.dom.tag_name = (function shadow$dom$tag_name(el){
var dom = shadow.dom.dom_node(el);
return dom.tagName;
});
shadow.dom.insert_after = (function shadow$dom$insert_after(ref,new$){
var new_node = shadow.dom.dom_node(new$);
goog.dom.insertSiblingAfter(new_node,shadow.dom.dom_node(ref));

return new_node;
});
shadow.dom.insert_before = (function shadow$dom$insert_before(ref,new$){
var new_node = shadow.dom.dom_node(new$);
goog.dom.insertSiblingBefore(new_node,shadow.dom.dom_node(ref));

return new_node;
});
shadow.dom.insert_first = (function shadow$dom$insert_first(ref,new$){
var temp__5751__auto__ = shadow.dom.dom_node(ref).firstChild;
if(cljs.core.truth_(temp__5751__auto__)){
var child = temp__5751__auto__;
return shadow.dom.insert_before(child,new$);
} else {
return shadow.dom.append.cljs$core$IFn$_invoke$arity$2(ref,new$);
}
});
shadow.dom.index_of = (function shadow$dom$index_of(el){
var el__$1 = shadow.dom.dom_node(el);
var i = (0);
while(true){
var ps = el__$1.previousSibling;
if((ps == null)){
return i;
} else {
var G__53496 = ps;
var G__53497 = (i + (1));
el__$1 = G__53496;
i = G__53497;
continue;
}
break;
}
});
shadow.dom.get_parent = (function shadow$dom$get_parent(el){
return goog.dom.getParentElement(shadow.dom.dom_node(el));
});
shadow.dom.parents = (function shadow$dom$parents(el){
var parent = shadow.dom.get_parent(el);
if(cljs.core.truth_(parent)){
return cljs.core.cons(parent,(new cljs.core.LazySeq(null,(function (){
return (shadow.dom.parents.cljs$core$IFn$_invoke$arity$1 ? shadow.dom.parents.cljs$core$IFn$_invoke$arity$1(parent) : shadow.dom.parents.call(null,parent));
}),null,null)));
} else {
return null;
}
});
shadow.dom.matches = (function shadow$dom$matches(el,sel){
return shadow.dom.dom_node(el).matches(sel);
});
shadow.dom.get_next_sibling = (function shadow$dom$get_next_sibling(el){
return goog.dom.getNextElementSibling(shadow.dom.dom_node(el));
});
shadow.dom.get_previous_sibling = (function shadow$dom$get_previous_sibling(el){
return goog.dom.getPreviousElementSibling(shadow.dom.dom_node(el));
});
shadow.dom.xmlns = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, ["svg","http://www.w3.org/2000/svg","xlink","http://www.w3.org/1999/xlink"], null));
shadow.dom.create_svg_node = (function shadow$dom$create_svg_node(tag_def,props){
var vec__52947 = shadow.dom.parse_tag(tag_def);
var tag_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__52947,(0),null);
var tag_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__52947,(1),null);
var tag_classes = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__52947,(2),null);
var el = document.createElementNS("http://www.w3.org/2000/svg",tag_name);
if(cljs.core.truth_(tag_id)){
el.setAttribute("id",tag_id);
} else {
}

if(cljs.core.truth_(tag_classes)){
el.setAttribute("class",shadow.dom.merge_class_string(new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(props),tag_classes));
} else {
}

var seq__52952_53501 = cljs.core.seq(props);
var chunk__52953_53502 = null;
var count__52954_53503 = (0);
var i__52955_53504 = (0);
while(true){
if((i__52955_53504 < count__52954_53503)){
var vec__52973_53505 = chunk__52953_53502.cljs$core$IIndexed$_nth$arity$2(null,i__52955_53504);
var k_53506 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__52973_53505,(0),null);
var v_53507 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__52973_53505,(1),null);
el.setAttributeNS((function (){var temp__5753__auto__ = cljs.core.namespace(k_53506);
if(cljs.core.truth_(temp__5753__auto__)){
var ns = temp__5753__auto__;
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(shadow.dom.xmlns),ns);
} else {
return null;
}
})(),cljs.core.name(k_53506),v_53507);


var G__53508 = seq__52952_53501;
var G__53509 = chunk__52953_53502;
var G__53510 = count__52954_53503;
var G__53511 = (i__52955_53504 + (1));
seq__52952_53501 = G__53508;
chunk__52953_53502 = G__53509;
count__52954_53503 = G__53510;
i__52955_53504 = G__53511;
continue;
} else {
var temp__5753__auto___53513 = cljs.core.seq(seq__52952_53501);
if(temp__5753__auto___53513){
var seq__52952_53515__$1 = temp__5753__auto___53513;
if(cljs.core.chunked_seq_QMARK_(seq__52952_53515__$1)){
var c__4638__auto___53516 = cljs.core.chunk_first(seq__52952_53515__$1);
var G__53517 = cljs.core.chunk_rest(seq__52952_53515__$1);
var G__53518 = c__4638__auto___53516;
var G__53519 = cljs.core.count(c__4638__auto___53516);
var G__53520 = (0);
seq__52952_53501 = G__53517;
chunk__52953_53502 = G__53518;
count__52954_53503 = G__53519;
i__52955_53504 = G__53520;
continue;
} else {
var vec__52976_53524 = cljs.core.first(seq__52952_53515__$1);
var k_53525 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__52976_53524,(0),null);
var v_53526 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__52976_53524,(1),null);
el.setAttributeNS((function (){var temp__5753__auto____$1 = cljs.core.namespace(k_53525);
if(cljs.core.truth_(temp__5753__auto____$1)){
var ns = temp__5753__auto____$1;
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(shadow.dom.xmlns),ns);
} else {
return null;
}
})(),cljs.core.name(k_53525),v_53526);


var G__53527 = cljs.core.next(seq__52952_53515__$1);
var G__53528 = null;
var G__53529 = (0);
var G__53530 = (0);
seq__52952_53501 = G__53527;
chunk__52953_53502 = G__53528;
count__52954_53503 = G__53529;
i__52955_53504 = G__53530;
continue;
}
} else {
}
}
break;
}

return el;
});
shadow.dom.svg_node = (function shadow$dom$svg_node(el){
if((el == null)){
return null;
} else {
if((((!((el == null))))?((((false) || ((cljs.core.PROTOCOL_SENTINEL === el.shadow$dom$SVGElement$))))?true:false):false)){
return el.shadow$dom$SVGElement$_to_svg$arity$1(null);
} else {
return el;

}
}
});
shadow.dom.make_svg_node = (function shadow$dom$make_svg_node(structure){
var vec__52983 = shadow.dom.destructure_node(shadow.dom.create_svg_node,structure);
var node = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__52983,(0),null);
var node_children = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__52983,(1),null);
var seq__52986_53536 = cljs.core.seq(node_children);
var chunk__52988_53537 = null;
var count__52989_53538 = (0);
var i__52990_53539 = (0);
while(true){
if((i__52990_53539 < count__52989_53538)){
var child_struct_53540 = chunk__52988_53537.cljs$core$IIndexed$_nth$arity$2(null,i__52990_53539);
if((!((child_struct_53540 == null)))){
if(typeof child_struct_53540 === 'string'){
var text_53542 = (node["textContent"]);
(node["textContent"] = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(text_53542),child_struct_53540].join(''));
} else {
var children_53544 = shadow.dom.svg_node(child_struct_53540);
if(cljs.core.seq_QMARK_(children_53544)){
var seq__53039_53545 = cljs.core.seq(children_53544);
var chunk__53041_53546 = null;
var count__53042_53547 = (0);
var i__53043_53548 = (0);
while(true){
if((i__53043_53548 < count__53042_53547)){
var child_53549 = chunk__53041_53546.cljs$core$IIndexed$_nth$arity$2(null,i__53043_53548);
if(cljs.core.truth_(child_53549)){
node.appendChild(child_53549);


var G__53550 = seq__53039_53545;
var G__53551 = chunk__53041_53546;
var G__53552 = count__53042_53547;
var G__53553 = (i__53043_53548 + (1));
seq__53039_53545 = G__53550;
chunk__53041_53546 = G__53551;
count__53042_53547 = G__53552;
i__53043_53548 = G__53553;
continue;
} else {
var G__53554 = seq__53039_53545;
var G__53555 = chunk__53041_53546;
var G__53556 = count__53042_53547;
var G__53557 = (i__53043_53548 + (1));
seq__53039_53545 = G__53554;
chunk__53041_53546 = G__53555;
count__53042_53547 = G__53556;
i__53043_53548 = G__53557;
continue;
}
} else {
var temp__5753__auto___53558 = cljs.core.seq(seq__53039_53545);
if(temp__5753__auto___53558){
var seq__53039_53559__$1 = temp__5753__auto___53558;
if(cljs.core.chunked_seq_QMARK_(seq__53039_53559__$1)){
var c__4638__auto___53561 = cljs.core.chunk_first(seq__53039_53559__$1);
var G__53562 = cljs.core.chunk_rest(seq__53039_53559__$1);
var G__53563 = c__4638__auto___53561;
var G__53564 = cljs.core.count(c__4638__auto___53561);
var G__53565 = (0);
seq__53039_53545 = G__53562;
chunk__53041_53546 = G__53563;
count__53042_53547 = G__53564;
i__53043_53548 = G__53565;
continue;
} else {
var child_53567 = cljs.core.first(seq__53039_53559__$1);
if(cljs.core.truth_(child_53567)){
node.appendChild(child_53567);


var G__53568 = cljs.core.next(seq__53039_53559__$1);
var G__53569 = null;
var G__53570 = (0);
var G__53571 = (0);
seq__53039_53545 = G__53568;
chunk__53041_53546 = G__53569;
count__53042_53547 = G__53570;
i__53043_53548 = G__53571;
continue;
} else {
var G__53572 = cljs.core.next(seq__53039_53559__$1);
var G__53573 = null;
var G__53574 = (0);
var G__53575 = (0);
seq__53039_53545 = G__53572;
chunk__53041_53546 = G__53573;
count__53042_53547 = G__53574;
i__53043_53548 = G__53575;
continue;
}
}
} else {
}
}
break;
}
} else {
node.appendChild(children_53544);
}
}


var G__53576 = seq__52986_53536;
var G__53577 = chunk__52988_53537;
var G__53578 = count__52989_53538;
var G__53579 = (i__52990_53539 + (1));
seq__52986_53536 = G__53576;
chunk__52988_53537 = G__53577;
count__52989_53538 = G__53578;
i__52990_53539 = G__53579;
continue;
} else {
var G__53580 = seq__52986_53536;
var G__53581 = chunk__52988_53537;
var G__53582 = count__52989_53538;
var G__53583 = (i__52990_53539 + (1));
seq__52986_53536 = G__53580;
chunk__52988_53537 = G__53581;
count__52989_53538 = G__53582;
i__52990_53539 = G__53583;
continue;
}
} else {
var temp__5753__auto___53584 = cljs.core.seq(seq__52986_53536);
if(temp__5753__auto___53584){
var seq__52986_53589__$1 = temp__5753__auto___53584;
if(cljs.core.chunked_seq_QMARK_(seq__52986_53589__$1)){
var c__4638__auto___53590 = cljs.core.chunk_first(seq__52986_53589__$1);
var G__53592 = cljs.core.chunk_rest(seq__52986_53589__$1);
var G__53593 = c__4638__auto___53590;
var G__53594 = cljs.core.count(c__4638__auto___53590);
var G__53595 = (0);
seq__52986_53536 = G__53592;
chunk__52988_53537 = G__53593;
count__52989_53538 = G__53594;
i__52990_53539 = G__53595;
continue;
} else {
var child_struct_53598 = cljs.core.first(seq__52986_53589__$1);
if((!((child_struct_53598 == null)))){
if(typeof child_struct_53598 === 'string'){
var text_53601 = (node["textContent"]);
(node["textContent"] = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(text_53601),child_struct_53598].join(''));
} else {
var children_53602 = shadow.dom.svg_node(child_struct_53598);
if(cljs.core.seq_QMARK_(children_53602)){
var seq__53066_53603 = cljs.core.seq(children_53602);
var chunk__53068_53604 = null;
var count__53069_53605 = (0);
var i__53070_53606 = (0);
while(true){
if((i__53070_53606 < count__53069_53605)){
var child_53607 = chunk__53068_53604.cljs$core$IIndexed$_nth$arity$2(null,i__53070_53606);
if(cljs.core.truth_(child_53607)){
node.appendChild(child_53607);


var G__53608 = seq__53066_53603;
var G__53609 = chunk__53068_53604;
var G__53610 = count__53069_53605;
var G__53611 = (i__53070_53606 + (1));
seq__53066_53603 = G__53608;
chunk__53068_53604 = G__53609;
count__53069_53605 = G__53610;
i__53070_53606 = G__53611;
continue;
} else {
var G__53613 = seq__53066_53603;
var G__53614 = chunk__53068_53604;
var G__53615 = count__53069_53605;
var G__53616 = (i__53070_53606 + (1));
seq__53066_53603 = G__53613;
chunk__53068_53604 = G__53614;
count__53069_53605 = G__53615;
i__53070_53606 = G__53616;
continue;
}
} else {
var temp__5753__auto___53618__$1 = cljs.core.seq(seq__53066_53603);
if(temp__5753__auto___53618__$1){
var seq__53066_53619__$1 = temp__5753__auto___53618__$1;
if(cljs.core.chunked_seq_QMARK_(seq__53066_53619__$1)){
var c__4638__auto___53620 = cljs.core.chunk_first(seq__53066_53619__$1);
var G__53621 = cljs.core.chunk_rest(seq__53066_53619__$1);
var G__53622 = c__4638__auto___53620;
var G__53623 = cljs.core.count(c__4638__auto___53620);
var G__53624 = (0);
seq__53066_53603 = G__53621;
chunk__53068_53604 = G__53622;
count__53069_53605 = G__53623;
i__53070_53606 = G__53624;
continue;
} else {
var child_53625 = cljs.core.first(seq__53066_53619__$1);
if(cljs.core.truth_(child_53625)){
node.appendChild(child_53625);


var G__53627 = cljs.core.next(seq__53066_53619__$1);
var G__53628 = null;
var G__53629 = (0);
var G__53630 = (0);
seq__53066_53603 = G__53627;
chunk__53068_53604 = G__53628;
count__53069_53605 = G__53629;
i__53070_53606 = G__53630;
continue;
} else {
var G__53631 = cljs.core.next(seq__53066_53619__$1);
var G__53632 = null;
var G__53633 = (0);
var G__53634 = (0);
seq__53066_53603 = G__53631;
chunk__53068_53604 = G__53632;
count__53069_53605 = G__53633;
i__53070_53606 = G__53634;
continue;
}
}
} else {
}
}
break;
}
} else {
node.appendChild(children_53602);
}
}


var G__53635 = cljs.core.next(seq__52986_53589__$1);
var G__53636 = null;
var G__53637 = (0);
var G__53638 = (0);
seq__52986_53536 = G__53635;
chunk__52988_53537 = G__53636;
count__52989_53538 = G__53637;
i__52990_53539 = G__53638;
continue;
} else {
var G__53640 = cljs.core.next(seq__52986_53589__$1);
var G__53641 = null;
var G__53642 = (0);
var G__53643 = (0);
seq__52986_53536 = G__53640;
chunk__52988_53537 = G__53641;
count__52989_53538 = G__53642;
i__52990_53539 = G__53643;
continue;
}
}
} else {
}
}
break;
}

return node;
});
goog.object.set(shadow.dom.SVGElement,"string",true);

goog.object.set(shadow.dom._to_svg,"string",(function (this$){
if((this$ instanceof cljs.core.Keyword)){
return shadow.dom.make_svg_node(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [this$], null));
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("strings cannot be in svgs",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"this","this",-611633625),this$], null));
}
}));

(cljs.core.PersistentVector.prototype.shadow$dom$SVGElement$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.PersistentVector.prototype.shadow$dom$SVGElement$_to_svg$arity$1 = (function (this$){
var this$__$1 = this;
return shadow.dom.make_svg_node(this$__$1);
}));

(cljs.core.LazySeq.prototype.shadow$dom$SVGElement$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.LazySeq.prototype.shadow$dom$SVGElement$_to_svg$arity$1 = (function (this$){
var this$__$1 = this;
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(shadow.dom._to_svg,this$__$1);
}));

goog.object.set(shadow.dom.SVGElement,"null",true);

goog.object.set(shadow.dom._to_svg,"null",(function (_){
return null;
}));
shadow.dom.svg = (function shadow$dom$svg(var_args){
var args__4824__auto__ = [];
var len__4818__auto___53645 = arguments.length;
var i__4819__auto___53646 = (0);
while(true){
if((i__4819__auto___53646 < len__4818__auto___53645)){
args__4824__auto__.push((arguments[i__4819__auto___53646]));

var G__53647 = (i__4819__auto___53646 + (1));
i__4819__auto___53646 = G__53647;
continue;
} else {
}
break;
}

var argseq__4825__auto__ = ((((1) < args__4824__auto__.length))?(new cljs.core.IndexedSeq(args__4824__auto__.slice((1)),(0),null)):null);
return shadow.dom.svg.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__4825__auto__);
});

(shadow.dom.svg.cljs$core$IFn$_invoke$arity$variadic = (function (attrs,children){
return shadow.dom._to_svg(cljs.core.vec(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"svg","svg",856789142),attrs], null),children)));
}));

(shadow.dom.svg.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(shadow.dom.svg.cljs$lang$applyTo = (function (seq53090){
var G__53091 = cljs.core.first(seq53090);
var seq53090__$1 = cljs.core.next(seq53090);
var self__4805__auto__ = this;
return self__4805__auto__.cljs$core$IFn$_invoke$arity$variadic(G__53091,seq53090__$1);
}));

/**
 * returns a channel for events on el
 * transform-fn should be a (fn [e el] some-val) where some-val will be put on the chan
 * once-or-cleanup handles the removal of the event handler
 * - true: remove after one event
 * - false: never removed
 * - chan: remove on msg/close
 */
shadow.dom.event_chan = (function shadow$dom$event_chan(var_args){
var G__53107 = arguments.length;
switch (G__53107) {
case 2:
return shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$2 = (function (el,event){
return shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$4(el,event,null,false);
}));

(shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$3 = (function (el,event,xf){
return shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$4(el,event,xf,false);
}));

(shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$4 = (function (el,event,xf,once_or_cleanup){
var buf = cljs.core.async.sliding_buffer((1));
var chan = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2(buf,xf);
var event_fn = (function shadow$dom$event_fn(e){
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(chan,e);

if(once_or_cleanup === true){
shadow.dom.remove_event_handler(el,event,shadow$dom$event_fn);

return cljs.core.async.close_BANG_(chan);
} else {
return null;
}
});
shadow.dom.dom_listen(shadow.dom.dom_node(el),cljs.core.name(event),event_fn);

if(cljs.core.truth_((function (){var and__4210__auto__ = once_or_cleanup;
if(cljs.core.truth_(and__4210__auto__)){
return (!(once_or_cleanup === true));
} else {
return and__4210__auto__;
}
})())){
var c__49005__auto___53660 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__49006__auto__ = (function (){var switch__48629__auto__ = (function (state_53128){
var state_val_53129 = (state_53128[(1)]);
if((state_val_53129 === (1))){
var state_53128__$1 = state_53128;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_53128__$1,(2),once_or_cleanup);
} else {
if((state_val_53129 === (2))){
var inst_53125 = (state_53128[(2)]);
var inst_53126 = shadow.dom.remove_event_handler(el,event,event_fn);
var state_53128__$1 = (function (){var statearr_53138 = state_53128;
(statearr_53138[(7)] = inst_53125);

return statearr_53138;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_53128__$1,inst_53126);
} else {
return null;
}
}
});
return (function() {
var shadow$dom$state_machine__48630__auto__ = null;
var shadow$dom$state_machine__48630__auto____0 = (function (){
var statearr_53145 = [null,null,null,null,null,null,null,null];
(statearr_53145[(0)] = shadow$dom$state_machine__48630__auto__);

(statearr_53145[(1)] = (1));

return statearr_53145;
});
var shadow$dom$state_machine__48630__auto____1 = (function (state_53128){
while(true){
var ret_value__48631__auto__ = (function (){try{while(true){
var result__48632__auto__ = switch__48629__auto__(state_53128);
if(cljs.core.keyword_identical_QMARK_(result__48632__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__48632__auto__;
}
break;
}
}catch (e53146){var ex__48633__auto__ = e53146;
var statearr_53148_53661 = state_53128;
(statearr_53148_53661[(2)] = ex__48633__auto__);


if(cljs.core.seq((state_53128[(4)]))){
var statearr_53150_53668 = state_53128;
(statearr_53150_53668[(1)] = cljs.core.first((state_53128[(4)])));

} else {
throw ex__48633__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__48631__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__53669 = state_53128;
state_53128 = G__53669;
continue;
} else {
return ret_value__48631__auto__;
}
break;
}
});
shadow$dom$state_machine__48630__auto__ = function(state_53128){
switch(arguments.length){
case 0:
return shadow$dom$state_machine__48630__auto____0.call(this);
case 1:
return shadow$dom$state_machine__48630__auto____1.call(this,state_53128);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
shadow$dom$state_machine__48630__auto__.cljs$core$IFn$_invoke$arity$0 = shadow$dom$state_machine__48630__auto____0;
shadow$dom$state_machine__48630__auto__.cljs$core$IFn$_invoke$arity$1 = shadow$dom$state_machine__48630__auto____1;
return shadow$dom$state_machine__48630__auto__;
})()
})();
var state__49007__auto__ = (function (){var statearr_53155 = f__49006__auto__();
(statearr_53155[(6)] = c__49005__auto___53660);

return statearr_53155;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__49007__auto__);
}));

} else {
}

return chan;
}));

(shadow.dom.event_chan.cljs$lang$maxFixedArity = 4);


//# sourceMappingURL=shadow.dom.js.map

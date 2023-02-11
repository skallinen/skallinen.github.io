goog.provide('shadow.dom');
shadow.dom.transition_supported_QMARK_ = (((typeof window !== 'undefined'))?goog.style.transition.isSupported():null);

/**
 * @interface
 */
shadow.dom.IElement = function(){};

var shadow$dom$IElement$_to_dom$dyn_41665 = (function (this$){
var x__5393__auto__ = (((this$ == null))?null:this$);
var m__5394__auto__ = (shadow.dom._to_dom[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5394__auto__.call(null,this$));
} else {
var m__5392__auto__ = (shadow.dom._to_dom["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5392__auto__.call(null,this$));
} else {
throw cljs.core.missing_protocol("IElement.-to-dom",this$);
}
}
});
shadow.dom._to_dom = (function shadow$dom$_to_dom(this$){
if((((!((this$ == null)))) && ((!((this$.shadow$dom$IElement$_to_dom$arity$1 == null)))))){
return this$.shadow$dom$IElement$_to_dom$arity$1(this$);
} else {
return shadow$dom$IElement$_to_dom$dyn_41665(this$);
}
});


/**
 * @interface
 */
shadow.dom.SVGElement = function(){};

var shadow$dom$SVGElement$_to_svg$dyn_41666 = (function (this$){
var x__5393__auto__ = (((this$ == null))?null:this$);
var m__5394__auto__ = (shadow.dom._to_svg[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5394__auto__.call(null,this$));
} else {
var m__5392__auto__ = (shadow.dom._to_svg["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5392__auto__.call(null,this$));
} else {
throw cljs.core.missing_protocol("SVGElement.-to-svg",this$);
}
}
});
shadow.dom._to_svg = (function shadow$dom$_to_svg(this$){
if((((!((this$ == null)))) && ((!((this$.shadow$dom$SVGElement$_to_svg$arity$1 == null)))))){
return this$.shadow$dom$SVGElement$_to_svg$arity$1(this$);
} else {
return shadow$dom$SVGElement$_to_svg$dyn_41666(this$);
}
});

shadow.dom.lazy_native_coll_seq = (function shadow$dom$lazy_native_coll_seq(coll,idx){
if((idx < coll.length)){
return (new cljs.core.LazySeq(null,(function (){
return cljs.core.cons((coll[idx]),(function (){var G__40248 = coll;
var G__40249 = (idx + (1));
return (shadow.dom.lazy_native_coll_seq.cljs$core$IFn$_invoke$arity$2 ? shadow.dom.lazy_native_coll_seq.cljs$core$IFn$_invoke$arity$2(G__40248,G__40249) : shadow.dom.lazy_native_coll_seq.call(null,G__40248,G__40249));
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
var or__5045__auto__ = (self__.coll[n]);
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
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

(shadow.dom.NativeColl.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"shadow.dom/NativeColl");
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
var G__40319 = arguments.length;
switch (G__40319) {
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
var G__40341 = arguments.length;
switch (G__40341) {
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
var G__40364 = arguments.length;
switch (G__40364) {
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
var G__40388 = arguments.length;
switch (G__40388) {
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
var G__40420 = arguments.length;
switch (G__40420) {
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
var G__40449 = arguments.length;
switch (G__40449) {
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

shadow.dom.dom_listen = (cljs.core.truth_((function (){var or__5045__auto__ = (!((typeof document !== 'undefined')));
if(or__5045__auto__){
return or__5045__auto__;
} else {
return document.addEventListener;
}
})())?(function shadow$dom$dom_listen_good(el,ev,handler){
return el.addEventListener(ev,handler,false);
}):(function shadow$dom$dom_listen_ie(el,ev,handler){
try{return el.attachEvent(["on",cljs.core.str.cljs$core$IFn$_invoke$arity$1(ev)].join(''),(function (e){
return (handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(e,el) : handler.call(null,e,el));
}));
}catch (e40469){if((e40469 instanceof Object)){
var e = e40469;
return console.log("didnt support attachEvent",el,e);
} else {
throw e40469;

}
}}));
shadow.dom.dom_listen_remove = (cljs.core.truth_((function (){var or__5045__auto__ = (!((typeof document !== 'undefined')));
if(or__5045__auto__){
return or__5045__auto__;
} else {
return document.removeEventListener;
}
})())?(function shadow$dom$dom_listen_remove_good(el,ev,handler){
return el.removeEventListener(ev,handler,false);
}):(function shadow$dom$dom_listen_remove_ie(el,ev,handler){
return el.detachEvent(["on",cljs.core.str.cljs$core$IFn$_invoke$arity$1(ev)].join(''),handler);
}));
shadow.dom.on_query = (function shadow$dom$on_query(root_el,ev,selector,handler){
var seq__40525 = cljs.core.seq(shadow.dom.query.cljs$core$IFn$_invoke$arity$2(selector,root_el));
var chunk__40526 = null;
var count__40527 = (0);
var i__40528 = (0);
while(true){
if((i__40528 < count__40527)){
var el = chunk__40526.cljs$core$IIndexed$_nth$arity$2(null,i__40528);
var handler_41680__$1 = ((function (seq__40525,chunk__40526,count__40527,i__40528,el){
return (function (e){
return (handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(e,el) : handler.call(null,e,el));
});})(seq__40525,chunk__40526,count__40527,i__40528,el))
;
shadow.dom.dom_listen(el,cljs.core.name(ev),handler_41680__$1);


var G__41682 = seq__40525;
var G__41683 = chunk__40526;
var G__41684 = count__40527;
var G__41685 = (i__40528 + (1));
seq__40525 = G__41682;
chunk__40526 = G__41683;
count__40527 = G__41684;
i__40528 = G__41685;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__40525);
if(temp__5804__auto__){
var seq__40525__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__40525__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__40525__$1);
var G__41687 = cljs.core.chunk_rest(seq__40525__$1);
var G__41688 = c__5568__auto__;
var G__41689 = cljs.core.count(c__5568__auto__);
var G__41690 = (0);
seq__40525 = G__41687;
chunk__40526 = G__41688;
count__40527 = G__41689;
i__40528 = G__41690;
continue;
} else {
var el = cljs.core.first(seq__40525__$1);
var handler_41691__$1 = ((function (seq__40525,chunk__40526,count__40527,i__40528,el,seq__40525__$1,temp__5804__auto__){
return (function (e){
return (handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(e,el) : handler.call(null,e,el));
});})(seq__40525,chunk__40526,count__40527,i__40528,el,seq__40525__$1,temp__5804__auto__))
;
shadow.dom.dom_listen(el,cljs.core.name(ev),handler_41691__$1);


var G__41692 = cljs.core.next(seq__40525__$1);
var G__41693 = null;
var G__41694 = (0);
var G__41695 = (0);
seq__40525 = G__41692;
chunk__40526 = G__41693;
count__40527 = G__41694;
i__40528 = G__41695;
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
var G__40602 = arguments.length;
switch (G__40602) {
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
var seq__40645 = cljs.core.seq(events);
var chunk__40646 = null;
var count__40647 = (0);
var i__40648 = (0);
while(true){
if((i__40648 < count__40647)){
var vec__40674 = chunk__40646.cljs$core$IIndexed$_nth$arity$2(null,i__40648);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40674,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40674,(1),null);
shadow.dom.on.cljs$core$IFn$_invoke$arity$3(el,k,v);


var G__41699 = seq__40645;
var G__41700 = chunk__40646;
var G__41701 = count__40647;
var G__41702 = (i__40648 + (1));
seq__40645 = G__41699;
chunk__40646 = G__41700;
count__40647 = G__41701;
i__40648 = G__41702;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__40645);
if(temp__5804__auto__){
var seq__40645__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__40645__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__40645__$1);
var G__41703 = cljs.core.chunk_rest(seq__40645__$1);
var G__41704 = c__5568__auto__;
var G__41705 = cljs.core.count(c__5568__auto__);
var G__41706 = (0);
seq__40645 = G__41703;
chunk__40646 = G__41704;
count__40647 = G__41705;
i__40648 = G__41706;
continue;
} else {
var vec__40695 = cljs.core.first(seq__40645__$1);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40695,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40695,(1),null);
shadow.dom.on.cljs$core$IFn$_invoke$arity$3(el,k,v);


var G__41707 = cljs.core.next(seq__40645__$1);
var G__41708 = null;
var G__41709 = (0);
var G__41710 = (0);
seq__40645 = G__41707;
chunk__40646 = G__41708;
count__40647 = G__41709;
i__40648 = G__41710;
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
var seq__40700 = cljs.core.seq(styles);
var chunk__40701 = null;
var count__40702 = (0);
var i__40703 = (0);
while(true){
if((i__40703 < count__40702)){
var vec__40719 = chunk__40701.cljs$core$IIndexed$_nth$arity$2(null,i__40703);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40719,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40719,(1),null);
goog.style.setStyle(dom,cljs.core.name(k),(((v == null))?"":v));


var G__41711 = seq__40700;
var G__41712 = chunk__40701;
var G__41713 = count__40702;
var G__41714 = (i__40703 + (1));
seq__40700 = G__41711;
chunk__40701 = G__41712;
count__40702 = G__41713;
i__40703 = G__41714;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__40700);
if(temp__5804__auto__){
var seq__40700__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__40700__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__40700__$1);
var G__41715 = cljs.core.chunk_rest(seq__40700__$1);
var G__41716 = c__5568__auto__;
var G__41717 = cljs.core.count(c__5568__auto__);
var G__41718 = (0);
seq__40700 = G__41715;
chunk__40701 = G__41716;
count__40702 = G__41717;
i__40703 = G__41718;
continue;
} else {
var vec__40734 = cljs.core.first(seq__40700__$1);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40734,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40734,(1),null);
goog.style.setStyle(dom,cljs.core.name(k),(((v == null))?"":v));


var G__41721 = cljs.core.next(seq__40700__$1);
var G__41722 = null;
var G__41723 = (0);
var G__41724 = (0);
seq__40700 = G__41721;
chunk__40701 = G__41722;
count__40702 = G__41723;
i__40703 = G__41724;
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
var G__40756_41726 = key;
var G__40756_41727__$1 = (((G__40756_41726 instanceof cljs.core.Keyword))?G__40756_41726.fqn:null);
switch (G__40756_41727__$1) {
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
var ks_41733 = cljs.core.name(key);
if(cljs.core.truth_((function (){var or__5045__auto__ = goog.string.startsWith(ks_41733,"data-");
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return goog.string.startsWith(ks_41733,"aria-");
}
})())){
el.setAttribute(ks_41733,value);
} else {
(el[ks_41733] = value);
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
shadow.dom.create_dom_node = (function shadow$dom$create_dom_node(tag_def,p__40802){
var map__40804 = p__40802;
var map__40804__$1 = cljs.core.__destructure_map(map__40804);
var props = map__40804__$1;
var class$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40804__$1,new cljs.core.Keyword(null,"class","class",-2030961996));
var tag_props = ({});
var vec__40807 = shadow.dom.parse_tag(tag_def);
var tag_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40807,(0),null);
var tag_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40807,(1),null);
var tag_classes = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40807,(2),null);
if(cljs.core.truth_(tag_id)){
(tag_props["id"] = tag_id);
} else {
}

if(cljs.core.truth_(tag_classes)){
(tag_props["class"] = shadow.dom.merge_class_string(class$,tag_classes));
} else {
}

var G__40812 = goog.dom.createDom(tag_name,tag_props);
shadow.dom.set_attrs(G__40812,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(props,new cljs.core.Keyword(null,"class","class",-2030961996)));

return G__40812;
});
shadow.dom.append = (function shadow$dom$append(var_args){
var G__40822 = arguments.length;
switch (G__40822) {
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
var temp__5804__auto__ = shadow.dom.dom_node(node);
if(cljs.core.truth_(temp__5804__auto__)){
var n = temp__5804__auto__;
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
var temp__5804__auto__ = shadow.dom.dom_node(node);
if(cljs.core.truth_(temp__5804__auto__)){
var n = temp__5804__auto__;
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

shadow.dom.destructure_node = (function shadow$dom$destructure_node(create_fn,p__40841){
var vec__40844 = p__40841;
var seq__40845 = cljs.core.seq(vec__40844);
var first__40846 = cljs.core.first(seq__40845);
var seq__40845__$1 = cljs.core.next(seq__40845);
var nn = first__40846;
var first__40846__$1 = cljs.core.first(seq__40845__$1);
var seq__40845__$2 = cljs.core.next(seq__40845__$1);
var np = first__40846__$1;
var nc = seq__40845__$2;
var node = vec__40844;
if((nn instanceof cljs.core.Keyword)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("invalid dom node",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"node","node",581201198),node], null));
}

if((((np == null)) && ((nc == null)))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__40848 = nn;
var G__40849 = cljs.core.PersistentArrayMap.EMPTY;
return (create_fn.cljs$core$IFn$_invoke$arity$2 ? create_fn.cljs$core$IFn$_invoke$arity$2(G__40848,G__40849) : create_fn.call(null,G__40848,G__40849));
})(),cljs.core.List.EMPTY], null);
} else {
if(cljs.core.map_QMARK_(np)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(create_fn.cljs$core$IFn$_invoke$arity$2 ? create_fn.cljs$core$IFn$_invoke$arity$2(nn,np) : create_fn.call(null,nn,np)),nc], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__40850 = nn;
var G__40851 = cljs.core.PersistentArrayMap.EMPTY;
return (create_fn.cljs$core$IFn$_invoke$arity$2 ? create_fn.cljs$core$IFn$_invoke$arity$2(G__40850,G__40851) : create_fn.call(null,G__40850,G__40851));
})(),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(nc,np)], null);

}
}
});
shadow.dom.make_dom_node = (function shadow$dom$make_dom_node(structure){
var vec__40853 = shadow.dom.destructure_node(shadow.dom.create_dom_node,structure);
var node = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40853,(0),null);
var node_children = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40853,(1),null);
var seq__40857_41739 = cljs.core.seq(node_children);
var chunk__40858_41740 = null;
var count__40859_41741 = (0);
var i__40860_41742 = (0);
while(true){
if((i__40860_41742 < count__40859_41741)){
var child_struct_41743 = chunk__40858_41740.cljs$core$IIndexed$_nth$arity$2(null,i__40860_41742);
var children_41744 = shadow.dom.dom_node(child_struct_41743);
if(cljs.core.seq_QMARK_(children_41744)){
var seq__40949_41745 = cljs.core.seq(cljs.core.map.cljs$core$IFn$_invoke$arity$2(shadow.dom.dom_node,children_41744));
var chunk__40951_41746 = null;
var count__40952_41747 = (0);
var i__40953_41748 = (0);
while(true){
if((i__40953_41748 < count__40952_41747)){
var child_41749 = chunk__40951_41746.cljs$core$IIndexed$_nth$arity$2(null,i__40953_41748);
if(cljs.core.truth_(child_41749)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_41749);


var G__41751 = seq__40949_41745;
var G__41752 = chunk__40951_41746;
var G__41753 = count__40952_41747;
var G__41754 = (i__40953_41748 + (1));
seq__40949_41745 = G__41751;
chunk__40951_41746 = G__41752;
count__40952_41747 = G__41753;
i__40953_41748 = G__41754;
continue;
} else {
var G__41755 = seq__40949_41745;
var G__41756 = chunk__40951_41746;
var G__41757 = count__40952_41747;
var G__41758 = (i__40953_41748 + (1));
seq__40949_41745 = G__41755;
chunk__40951_41746 = G__41756;
count__40952_41747 = G__41757;
i__40953_41748 = G__41758;
continue;
}
} else {
var temp__5804__auto___41759 = cljs.core.seq(seq__40949_41745);
if(temp__5804__auto___41759){
var seq__40949_41760__$1 = temp__5804__auto___41759;
if(cljs.core.chunked_seq_QMARK_(seq__40949_41760__$1)){
var c__5568__auto___41761 = cljs.core.chunk_first(seq__40949_41760__$1);
var G__41762 = cljs.core.chunk_rest(seq__40949_41760__$1);
var G__41763 = c__5568__auto___41761;
var G__41764 = cljs.core.count(c__5568__auto___41761);
var G__41765 = (0);
seq__40949_41745 = G__41762;
chunk__40951_41746 = G__41763;
count__40952_41747 = G__41764;
i__40953_41748 = G__41765;
continue;
} else {
var child_41766 = cljs.core.first(seq__40949_41760__$1);
if(cljs.core.truth_(child_41766)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_41766);


var G__41767 = cljs.core.next(seq__40949_41760__$1);
var G__41768 = null;
var G__41769 = (0);
var G__41770 = (0);
seq__40949_41745 = G__41767;
chunk__40951_41746 = G__41768;
count__40952_41747 = G__41769;
i__40953_41748 = G__41770;
continue;
} else {
var G__41771 = cljs.core.next(seq__40949_41760__$1);
var G__41772 = null;
var G__41773 = (0);
var G__41774 = (0);
seq__40949_41745 = G__41771;
chunk__40951_41746 = G__41772;
count__40952_41747 = G__41773;
i__40953_41748 = G__41774;
continue;
}
}
} else {
}
}
break;
}
} else {
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,children_41744);
}


var G__41775 = seq__40857_41739;
var G__41776 = chunk__40858_41740;
var G__41777 = count__40859_41741;
var G__41778 = (i__40860_41742 + (1));
seq__40857_41739 = G__41775;
chunk__40858_41740 = G__41776;
count__40859_41741 = G__41777;
i__40860_41742 = G__41778;
continue;
} else {
var temp__5804__auto___41779 = cljs.core.seq(seq__40857_41739);
if(temp__5804__auto___41779){
var seq__40857_41781__$1 = temp__5804__auto___41779;
if(cljs.core.chunked_seq_QMARK_(seq__40857_41781__$1)){
var c__5568__auto___41782 = cljs.core.chunk_first(seq__40857_41781__$1);
var G__41783 = cljs.core.chunk_rest(seq__40857_41781__$1);
var G__41784 = c__5568__auto___41782;
var G__41785 = cljs.core.count(c__5568__auto___41782);
var G__41786 = (0);
seq__40857_41739 = G__41783;
chunk__40858_41740 = G__41784;
count__40859_41741 = G__41785;
i__40860_41742 = G__41786;
continue;
} else {
var child_struct_41787 = cljs.core.first(seq__40857_41781__$1);
var children_41788 = shadow.dom.dom_node(child_struct_41787);
if(cljs.core.seq_QMARK_(children_41788)){
var seq__40986_41789 = cljs.core.seq(cljs.core.map.cljs$core$IFn$_invoke$arity$2(shadow.dom.dom_node,children_41788));
var chunk__40988_41790 = null;
var count__40989_41791 = (0);
var i__40990_41792 = (0);
while(true){
if((i__40990_41792 < count__40989_41791)){
var child_41793 = chunk__40988_41790.cljs$core$IIndexed$_nth$arity$2(null,i__40990_41792);
if(cljs.core.truth_(child_41793)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_41793);


var G__41794 = seq__40986_41789;
var G__41795 = chunk__40988_41790;
var G__41796 = count__40989_41791;
var G__41797 = (i__40990_41792 + (1));
seq__40986_41789 = G__41794;
chunk__40988_41790 = G__41795;
count__40989_41791 = G__41796;
i__40990_41792 = G__41797;
continue;
} else {
var G__41799 = seq__40986_41789;
var G__41800 = chunk__40988_41790;
var G__41801 = count__40989_41791;
var G__41802 = (i__40990_41792 + (1));
seq__40986_41789 = G__41799;
chunk__40988_41790 = G__41800;
count__40989_41791 = G__41801;
i__40990_41792 = G__41802;
continue;
}
} else {
var temp__5804__auto___41803__$1 = cljs.core.seq(seq__40986_41789);
if(temp__5804__auto___41803__$1){
var seq__40986_41804__$1 = temp__5804__auto___41803__$1;
if(cljs.core.chunked_seq_QMARK_(seq__40986_41804__$1)){
var c__5568__auto___41805 = cljs.core.chunk_first(seq__40986_41804__$1);
var G__41806 = cljs.core.chunk_rest(seq__40986_41804__$1);
var G__41807 = c__5568__auto___41805;
var G__41808 = cljs.core.count(c__5568__auto___41805);
var G__41809 = (0);
seq__40986_41789 = G__41806;
chunk__40988_41790 = G__41807;
count__40989_41791 = G__41808;
i__40990_41792 = G__41809;
continue;
} else {
var child_41810 = cljs.core.first(seq__40986_41804__$1);
if(cljs.core.truth_(child_41810)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_41810);


var G__41811 = cljs.core.next(seq__40986_41804__$1);
var G__41812 = null;
var G__41813 = (0);
var G__41814 = (0);
seq__40986_41789 = G__41811;
chunk__40988_41790 = G__41812;
count__40989_41791 = G__41813;
i__40990_41792 = G__41814;
continue;
} else {
var G__41815 = cljs.core.next(seq__40986_41804__$1);
var G__41816 = null;
var G__41817 = (0);
var G__41818 = (0);
seq__40986_41789 = G__41815;
chunk__40988_41790 = G__41816;
count__40989_41791 = G__41817;
i__40990_41792 = G__41818;
continue;
}
}
} else {
}
}
break;
}
} else {
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,children_41788);
}


var G__41820 = cljs.core.next(seq__40857_41781__$1);
var G__41821 = null;
var G__41822 = (0);
var G__41823 = (0);
seq__40857_41739 = G__41820;
chunk__40858_41740 = G__41821;
count__40859_41741 = G__41822;
i__40860_41742 = G__41823;
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
var seq__41049 = cljs.core.seq(node);
var chunk__41050 = null;
var count__41051 = (0);
var i__41052 = (0);
while(true){
if((i__41052 < count__41051)){
var n = chunk__41050.cljs$core$IIndexed$_nth$arity$2(null,i__41052);
(shadow.dom.remove.cljs$core$IFn$_invoke$arity$1 ? shadow.dom.remove.cljs$core$IFn$_invoke$arity$1(n) : shadow.dom.remove.call(null,n));


var G__41826 = seq__41049;
var G__41827 = chunk__41050;
var G__41828 = count__41051;
var G__41829 = (i__41052 + (1));
seq__41049 = G__41826;
chunk__41050 = G__41827;
count__41051 = G__41828;
i__41052 = G__41829;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__41049);
if(temp__5804__auto__){
var seq__41049__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__41049__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__41049__$1);
var G__41830 = cljs.core.chunk_rest(seq__41049__$1);
var G__41831 = c__5568__auto__;
var G__41832 = cljs.core.count(c__5568__auto__);
var G__41833 = (0);
seq__41049 = G__41830;
chunk__41050 = G__41831;
count__41051 = G__41832;
i__41052 = G__41833;
continue;
} else {
var n = cljs.core.first(seq__41049__$1);
(shadow.dom.remove.cljs$core$IFn$_invoke$arity$1 ? shadow.dom.remove.cljs$core$IFn$_invoke$arity$1(n) : shadow.dom.remove.call(null,n));


var G__41834 = cljs.core.next(seq__41049__$1);
var G__41835 = null;
var G__41836 = (0);
var G__41837 = (0);
seq__41049 = G__41834;
chunk__41050 = G__41835;
count__41051 = G__41836;
i__41052 = G__41837;
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
var G__41058 = arguments.length;
switch (G__41058) {
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
var G__41060 = arguments.length;
switch (G__41060) {
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
var G__41083 = arguments.length;
switch (G__41083) {
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
var or__5045__auto__ = shadow.dom.dom_node(el).getAttribute(cljs.core.name(key));
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
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
var args__5775__auto__ = [];
var len__5769__auto___41853 = arguments.length;
var i__5770__auto___41854 = (0);
while(true){
if((i__5770__auto___41854 < len__5769__auto___41853)){
args__5775__auto__.push((arguments[i__5770__auto___41854]));

var G__41855 = (i__5770__auto___41854 + (1));
i__5770__auto___41854 = G__41855;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((0) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((0)),(0),null)):null);
return shadow.dom.fragment.cljs$core$IFn$_invoke$arity$variadic(argseq__5776__auto__);
});

(shadow.dom.fragment.cljs$core$IFn$_invoke$arity$variadic = (function (nodes){
var fragment = document.createDocumentFragment();
var seq__41121_41856 = cljs.core.seq(nodes);
var chunk__41122_41857 = null;
var count__41123_41858 = (0);
var i__41124_41859 = (0);
while(true){
if((i__41124_41859 < count__41123_41858)){
var node_41860 = chunk__41122_41857.cljs$core$IIndexed$_nth$arity$2(null,i__41124_41859);
fragment.appendChild(shadow.dom._to_dom(node_41860));


var G__41861 = seq__41121_41856;
var G__41862 = chunk__41122_41857;
var G__41863 = count__41123_41858;
var G__41864 = (i__41124_41859 + (1));
seq__41121_41856 = G__41861;
chunk__41122_41857 = G__41862;
count__41123_41858 = G__41863;
i__41124_41859 = G__41864;
continue;
} else {
var temp__5804__auto___41865 = cljs.core.seq(seq__41121_41856);
if(temp__5804__auto___41865){
var seq__41121_41866__$1 = temp__5804__auto___41865;
if(cljs.core.chunked_seq_QMARK_(seq__41121_41866__$1)){
var c__5568__auto___41867 = cljs.core.chunk_first(seq__41121_41866__$1);
var G__41868 = cljs.core.chunk_rest(seq__41121_41866__$1);
var G__41869 = c__5568__auto___41867;
var G__41870 = cljs.core.count(c__5568__auto___41867);
var G__41871 = (0);
seq__41121_41856 = G__41868;
chunk__41122_41857 = G__41869;
count__41123_41858 = G__41870;
i__41124_41859 = G__41871;
continue;
} else {
var node_41872 = cljs.core.first(seq__41121_41866__$1);
fragment.appendChild(shadow.dom._to_dom(node_41872));


var G__41873 = cljs.core.next(seq__41121_41866__$1);
var G__41874 = null;
var G__41875 = (0);
var G__41876 = (0);
seq__41121_41856 = G__41873;
chunk__41122_41857 = G__41874;
count__41123_41858 = G__41875;
i__41124_41859 = G__41876;
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
(shadow.dom.fragment.cljs$lang$applyTo = (function (seq41118){
var self__5755__auto__ = this;
return self__5755__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq41118));
}));

/**
 * given a html string, eval all <script> tags and return the html without the scripts
 * don't do this for everything, only content you trust.
 */
shadow.dom.eval_scripts = (function shadow$dom$eval_scripts(s){
var scripts = cljs.core.re_seq(/<script[^>]*?>(.+?)<\/script>/,s);
var seq__41131_41878 = cljs.core.seq(scripts);
var chunk__41133_41879 = null;
var count__41134_41880 = (0);
var i__41135_41881 = (0);
while(true){
if((i__41135_41881 < count__41134_41880)){
var vec__41147_41882 = chunk__41133_41879.cljs$core$IIndexed$_nth$arity$2(null,i__41135_41881);
var script_tag_41883 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41147_41882,(0),null);
var script_body_41884 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41147_41882,(1),null);
eval(script_body_41884);


var G__41885 = seq__41131_41878;
var G__41886 = chunk__41133_41879;
var G__41887 = count__41134_41880;
var G__41888 = (i__41135_41881 + (1));
seq__41131_41878 = G__41885;
chunk__41133_41879 = G__41886;
count__41134_41880 = G__41887;
i__41135_41881 = G__41888;
continue;
} else {
var temp__5804__auto___41889 = cljs.core.seq(seq__41131_41878);
if(temp__5804__auto___41889){
var seq__41131_41890__$1 = temp__5804__auto___41889;
if(cljs.core.chunked_seq_QMARK_(seq__41131_41890__$1)){
var c__5568__auto___41891 = cljs.core.chunk_first(seq__41131_41890__$1);
var G__41892 = cljs.core.chunk_rest(seq__41131_41890__$1);
var G__41893 = c__5568__auto___41891;
var G__41894 = cljs.core.count(c__5568__auto___41891);
var G__41895 = (0);
seq__41131_41878 = G__41892;
chunk__41133_41879 = G__41893;
count__41134_41880 = G__41894;
i__41135_41881 = G__41895;
continue;
} else {
var vec__41151_41896 = cljs.core.first(seq__41131_41890__$1);
var script_tag_41897 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41151_41896,(0),null);
var script_body_41898 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41151_41896,(1),null);
eval(script_body_41898);


var G__41899 = cljs.core.next(seq__41131_41890__$1);
var G__41900 = null;
var G__41901 = (0);
var G__41902 = (0);
seq__41131_41878 = G__41899;
chunk__41133_41879 = G__41900;
count__41134_41880 = G__41901;
i__41135_41881 = G__41902;
continue;
}
} else {
}
}
break;
}

return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (s__$1,p__41154){
var vec__41157 = p__41154;
var script_tag = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41157,(0),null);
var script_body = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41157,(1),null);
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
var G__41174 = arguments.length;
switch (G__41174) {
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
var seq__41189 = cljs.core.seq(style_keys);
var chunk__41190 = null;
var count__41191 = (0);
var i__41192 = (0);
while(true){
if((i__41192 < count__41191)){
var it = chunk__41190.cljs$core$IIndexed$_nth$arity$2(null,i__41192);
shadow.dom.remove_style_STAR_(el__$1,it);


var G__41904 = seq__41189;
var G__41905 = chunk__41190;
var G__41906 = count__41191;
var G__41907 = (i__41192 + (1));
seq__41189 = G__41904;
chunk__41190 = G__41905;
count__41191 = G__41906;
i__41192 = G__41907;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__41189);
if(temp__5804__auto__){
var seq__41189__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__41189__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__41189__$1);
var G__41908 = cljs.core.chunk_rest(seq__41189__$1);
var G__41909 = c__5568__auto__;
var G__41910 = cljs.core.count(c__5568__auto__);
var G__41911 = (0);
seq__41189 = G__41908;
chunk__41190 = G__41909;
count__41191 = G__41910;
i__41192 = G__41911;
continue;
} else {
var it = cljs.core.first(seq__41189__$1);
shadow.dom.remove_style_STAR_(el__$1,it);


var G__41912 = cljs.core.next(seq__41189__$1);
var G__41913 = null;
var G__41914 = (0);
var G__41915 = (0);
seq__41189 = G__41912;
chunk__41190 = G__41913;
count__41191 = G__41914;
i__41192 = G__41915;
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
(shadow.dom.Coordinate.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5343__auto__,k__5344__auto__){
var self__ = this;
var this__5343__auto____$1 = this;
return this__5343__auto____$1.cljs$core$ILookup$_lookup$arity$3(null,k__5344__auto__,null);
}));

(shadow.dom.Coordinate.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5345__auto__,k41208,else__5346__auto__){
var self__ = this;
var this__5345__auto____$1 = this;
var G__41224 = k41208;
var G__41224__$1 = (((G__41224 instanceof cljs.core.Keyword))?G__41224.fqn:null);
switch (G__41224__$1) {
case "x":
return self__.x;

break;
case "y":
return self__.y;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k41208,else__5346__auto__);

}
}));

(shadow.dom.Coordinate.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__5363__auto__,f__5364__auto__,init__5365__auto__){
var self__ = this;
var this__5363__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__5366__auto__,p__41231){
var vec__41232 = p__41231;
var k__5367__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41232,(0),null);
var v__5368__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41232,(1),null);
return (f__5364__auto__.cljs$core$IFn$_invoke$arity$3 ? f__5364__auto__.cljs$core$IFn$_invoke$arity$3(ret__5366__auto__,k__5367__auto__,v__5368__auto__) : f__5364__auto__.call(null,ret__5366__auto__,k__5367__auto__,v__5368__auto__));
}),init__5365__auto__,this__5363__auto____$1);
}));

(shadow.dom.Coordinate.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5358__auto__,writer__5359__auto__,opts__5360__auto__){
var self__ = this;
var this__5358__auto____$1 = this;
var pr_pair__5361__auto__ = (function (keyval__5362__auto__){
return cljs.core.pr_sequential_writer(writer__5359__auto__,cljs.core.pr_writer,""," ","",opts__5360__auto__,keyval__5362__auto__);
});
return cljs.core.pr_sequential_writer(writer__5359__auto__,pr_pair__5361__auto__,"#shadow.dom.Coordinate{",", ","}",opts__5360__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"x","x",2099068185),self__.x],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"y","y",-1757859776),self__.y],null))], null),self__.__extmap));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__41207){
var self__ = this;
var G__41207__$1 = this;
return (new cljs.core.RecordIter((0),G__41207__$1,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"x","x",2099068185),new cljs.core.Keyword(null,"y","y",-1757859776)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5341__auto__){
var self__ = this;
var this__5341__auto____$1 = this;
return self__.__meta;
}));

(shadow.dom.Coordinate.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5338__auto__){
var self__ = this;
var this__5338__auto____$1 = this;
return (new shadow.dom.Coordinate(self__.x,self__.y,self__.__meta,self__.__extmap,self__.__hash));
}));

(shadow.dom.Coordinate.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5347__auto__){
var self__ = this;
var this__5347__auto____$1 = this;
return (2 + cljs.core.count(self__.__extmap));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5339__auto__){
var self__ = this;
var this__5339__auto____$1 = this;
var h__5154__auto__ = self__.__hash;
if((!((h__5154__auto__ == null)))){
return h__5154__auto__;
} else {
var h__5154__auto____$1 = (function (coll__5340__auto__){
return (145542109 ^ cljs.core.hash_unordered_coll(coll__5340__auto__));
})(this__5339__auto____$1);
(self__.__hash = h__5154__auto____$1);

return h__5154__auto____$1;
}
}));

(shadow.dom.Coordinate.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this41209,other41210){
var self__ = this;
var this41209__$1 = this;
return (((!((other41210 == null)))) && ((((this41209__$1.constructor === other41210.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this41209__$1.x,other41210.x)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this41209__$1.y,other41210.y)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this41209__$1.__extmap,other41210.__extmap)))))))));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5353__auto__,k__5354__auto__){
var self__ = this;
var this__5353__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"y","y",-1757859776),null,new cljs.core.Keyword(null,"x","x",2099068185),null], null), null),k__5354__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core._with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__5353__auto____$1),self__.__meta),k__5354__auto__);
} else {
return (new shadow.dom.Coordinate(self__.x,self__.y,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__5354__auto__)),null));
}
}));

(shadow.dom.Coordinate.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__5350__auto__,k41208){
var self__ = this;
var this__5350__auto____$1 = this;
var G__41265 = k41208;
var G__41265__$1 = (((G__41265 instanceof cljs.core.Keyword))?G__41265.fqn:null);
switch (G__41265__$1) {
case "x":
case "y":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k41208);

}
}));

(shadow.dom.Coordinate.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5351__auto__,k__5352__auto__,G__41207){
var self__ = this;
var this__5351__auto____$1 = this;
var pred__41268 = cljs.core.keyword_identical_QMARK_;
var expr__41269 = k__5352__auto__;
if(cljs.core.truth_((pred__41268.cljs$core$IFn$_invoke$arity$2 ? pred__41268.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"x","x",2099068185),expr__41269) : pred__41268.call(null,new cljs.core.Keyword(null,"x","x",2099068185),expr__41269)))){
return (new shadow.dom.Coordinate(G__41207,self__.y,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__41268.cljs$core$IFn$_invoke$arity$2 ? pred__41268.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"y","y",-1757859776),expr__41269) : pred__41268.call(null,new cljs.core.Keyword(null,"y","y",-1757859776),expr__41269)))){
return (new shadow.dom.Coordinate(self__.x,G__41207,self__.__meta,self__.__extmap,null));
} else {
return (new shadow.dom.Coordinate(self__.x,self__.y,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5352__auto__,G__41207),null));
}
}
}));

(shadow.dom.Coordinate.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5356__auto__){
var self__ = this;
var this__5356__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"x","x",2099068185),self__.x,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"y","y",-1757859776),self__.y,null))], null),self__.__extmap));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5342__auto__,G__41207){
var self__ = this;
var this__5342__auto____$1 = this;
return (new shadow.dom.Coordinate(self__.x,self__.y,G__41207,self__.__extmap,self__.__hash));
}));

(shadow.dom.Coordinate.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5348__auto__,entry__5349__auto__){
var self__ = this;
var this__5348__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__5349__auto__)){
return this__5348__auto____$1.cljs$core$IAssociative$_assoc$arity$3(null,cljs.core._nth(entry__5349__auto__,(0)),cljs.core._nth(entry__5349__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__5348__auto____$1,entry__5349__auto__);
}
}));

(shadow.dom.Coordinate.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"x","x",-555367584,null),new cljs.core.Symbol(null,"y","y",-117328249,null)], null);
}));

(shadow.dom.Coordinate.cljs$lang$type = true);

(shadow.dom.Coordinate.cljs$lang$ctorPrSeq = (function (this__5389__auto__){
return (new cljs.core.List(null,"shadow.dom/Coordinate",null,(1),null));
}));

(shadow.dom.Coordinate.cljs$lang$ctorPrWriter = (function (this__5389__auto__,writer__5390__auto__){
return cljs.core._write(writer__5390__auto__,"shadow.dom/Coordinate");
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
shadow.dom.map__GT_Coordinate = (function shadow$dom$map__GT_Coordinate(G__41215){
var extmap__5385__auto__ = (function (){var G__41286 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__41215,new cljs.core.Keyword(null,"x","x",2099068185),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"y","y",-1757859776)], 0));
if(cljs.core.record_QMARK_(G__41215)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__41286);
} else {
return G__41286;
}
})();
return (new shadow.dom.Coordinate(new cljs.core.Keyword(null,"x","x",2099068185).cljs$core$IFn$_invoke$arity$1(G__41215),new cljs.core.Keyword(null,"y","y",-1757859776).cljs$core$IFn$_invoke$arity$1(G__41215),null,cljs.core.not_empty(extmap__5385__auto__),null));
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
(shadow.dom.Size.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5343__auto__,k__5344__auto__){
var self__ = this;
var this__5343__auto____$1 = this;
return this__5343__auto____$1.cljs$core$ILookup$_lookup$arity$3(null,k__5344__auto__,null);
}));

(shadow.dom.Size.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5345__auto__,k41304,else__5346__auto__){
var self__ = this;
var this__5345__auto____$1 = this;
var G__41308 = k41304;
var G__41308__$1 = (((G__41308 instanceof cljs.core.Keyword))?G__41308.fqn:null);
switch (G__41308__$1) {
case "w":
return self__.w;

break;
case "h":
return self__.h;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k41304,else__5346__auto__);

}
}));

(shadow.dom.Size.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__5363__auto__,f__5364__auto__,init__5365__auto__){
var self__ = this;
var this__5363__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__5366__auto__,p__41309){
var vec__41310 = p__41309;
var k__5367__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41310,(0),null);
var v__5368__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41310,(1),null);
return (f__5364__auto__.cljs$core$IFn$_invoke$arity$3 ? f__5364__auto__.cljs$core$IFn$_invoke$arity$3(ret__5366__auto__,k__5367__auto__,v__5368__auto__) : f__5364__auto__.call(null,ret__5366__auto__,k__5367__auto__,v__5368__auto__));
}),init__5365__auto__,this__5363__auto____$1);
}));

(shadow.dom.Size.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5358__auto__,writer__5359__auto__,opts__5360__auto__){
var self__ = this;
var this__5358__auto____$1 = this;
var pr_pair__5361__auto__ = (function (keyval__5362__auto__){
return cljs.core.pr_sequential_writer(writer__5359__auto__,cljs.core.pr_writer,""," ","",opts__5360__auto__,keyval__5362__auto__);
});
return cljs.core.pr_sequential_writer(writer__5359__auto__,pr_pair__5361__auto__,"#shadow.dom.Size{",", ","}",opts__5360__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"w","w",354169001),self__.w],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"h","h",1109658740),self__.h],null))], null),self__.__extmap));
}));

(shadow.dom.Size.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__41303){
var self__ = this;
var G__41303__$1 = this;
return (new cljs.core.RecordIter((0),G__41303__$1,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"w","w",354169001),new cljs.core.Keyword(null,"h","h",1109658740)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
}));

(shadow.dom.Size.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5341__auto__){
var self__ = this;
var this__5341__auto____$1 = this;
return self__.__meta;
}));

(shadow.dom.Size.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5338__auto__){
var self__ = this;
var this__5338__auto____$1 = this;
return (new shadow.dom.Size(self__.w,self__.h,self__.__meta,self__.__extmap,self__.__hash));
}));

(shadow.dom.Size.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5347__auto__){
var self__ = this;
var this__5347__auto____$1 = this;
return (2 + cljs.core.count(self__.__extmap));
}));

(shadow.dom.Size.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5339__auto__){
var self__ = this;
var this__5339__auto____$1 = this;
var h__5154__auto__ = self__.__hash;
if((!((h__5154__auto__ == null)))){
return h__5154__auto__;
} else {
var h__5154__auto____$1 = (function (coll__5340__auto__){
return (-1228019642 ^ cljs.core.hash_unordered_coll(coll__5340__auto__));
})(this__5339__auto____$1);
(self__.__hash = h__5154__auto____$1);

return h__5154__auto____$1;
}
}));

(shadow.dom.Size.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this41305,other41306){
var self__ = this;
var this41305__$1 = this;
return (((!((other41306 == null)))) && ((((this41305__$1.constructor === other41306.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this41305__$1.w,other41306.w)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this41305__$1.h,other41306.h)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this41305__$1.__extmap,other41306.__extmap)))))))));
}));

(shadow.dom.Size.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5353__auto__,k__5354__auto__){
var self__ = this;
var this__5353__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"w","w",354169001),null,new cljs.core.Keyword(null,"h","h",1109658740),null], null), null),k__5354__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core._with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__5353__auto____$1),self__.__meta),k__5354__auto__);
} else {
return (new shadow.dom.Size(self__.w,self__.h,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__5354__auto__)),null));
}
}));

(shadow.dom.Size.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__5350__auto__,k41304){
var self__ = this;
var this__5350__auto____$1 = this;
var G__41313 = k41304;
var G__41313__$1 = (((G__41313 instanceof cljs.core.Keyword))?G__41313.fqn:null);
switch (G__41313__$1) {
case "w":
case "h":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k41304);

}
}));

(shadow.dom.Size.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5351__auto__,k__5352__auto__,G__41303){
var self__ = this;
var this__5351__auto____$1 = this;
var pred__41316 = cljs.core.keyword_identical_QMARK_;
var expr__41317 = k__5352__auto__;
if(cljs.core.truth_((pred__41316.cljs$core$IFn$_invoke$arity$2 ? pred__41316.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"w","w",354169001),expr__41317) : pred__41316.call(null,new cljs.core.Keyword(null,"w","w",354169001),expr__41317)))){
return (new shadow.dom.Size(G__41303,self__.h,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__41316.cljs$core$IFn$_invoke$arity$2 ? pred__41316.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"h","h",1109658740),expr__41317) : pred__41316.call(null,new cljs.core.Keyword(null,"h","h",1109658740),expr__41317)))){
return (new shadow.dom.Size(self__.w,G__41303,self__.__meta,self__.__extmap,null));
} else {
return (new shadow.dom.Size(self__.w,self__.h,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5352__auto__,G__41303),null));
}
}
}));

(shadow.dom.Size.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5356__auto__){
var self__ = this;
var this__5356__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"w","w",354169001),self__.w,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"h","h",1109658740),self__.h,null))], null),self__.__extmap));
}));

(shadow.dom.Size.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5342__auto__,G__41303){
var self__ = this;
var this__5342__auto____$1 = this;
return (new shadow.dom.Size(self__.w,self__.h,G__41303,self__.__extmap,self__.__hash));
}));

(shadow.dom.Size.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5348__auto__,entry__5349__auto__){
var self__ = this;
var this__5348__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__5349__auto__)){
return this__5348__auto____$1.cljs$core$IAssociative$_assoc$arity$3(null,cljs.core._nth(entry__5349__auto__,(0)),cljs.core._nth(entry__5349__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__5348__auto____$1,entry__5349__auto__);
}
}));

(shadow.dom.Size.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"w","w",1994700528,null),new cljs.core.Symbol(null,"h","h",-1544777029,null)], null);
}));

(shadow.dom.Size.cljs$lang$type = true);

(shadow.dom.Size.cljs$lang$ctorPrSeq = (function (this__5389__auto__){
return (new cljs.core.List(null,"shadow.dom/Size",null,(1),null));
}));

(shadow.dom.Size.cljs$lang$ctorPrWriter = (function (this__5389__auto__,writer__5390__auto__){
return cljs.core._write(writer__5390__auto__,"shadow.dom/Size");
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
shadow.dom.map__GT_Size = (function shadow$dom$map__GT_Size(G__41307){
var extmap__5385__auto__ = (function (){var G__41327 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__41307,new cljs.core.Keyword(null,"w","w",354169001),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"h","h",1109658740)], 0));
if(cljs.core.record_QMARK_(G__41307)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__41327);
} else {
return G__41327;
}
})();
return (new shadow.dom.Size(new cljs.core.Keyword(null,"w","w",354169001).cljs$core$IFn$_invoke$arity$1(G__41307),new cljs.core.Keyword(null,"h","h",1109658740).cljs$core$IFn$_invoke$arity$1(G__41307),null,cljs.core.not_empty(extmap__5385__auto__),null));
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
var a__5633__auto__ = opts;
var l__5634__auto__ = a__5633__auto__.length;
var i = (0);
var ret = cljs.core.PersistentVector.EMPTY;
while(true){
if((i < l__5634__auto__)){
var G__41927 = (i + (1));
var G__41928 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(ret,(opts[i]["value"]));
i = G__41927;
ret = G__41928;
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
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(path),"?",clojure.string.join.cljs$core$IFn$_invoke$arity$2("&",cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__41332){
var vec__41333 = p__41332;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41333,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41333,(1),null);
return [cljs.core.name(k),"=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(encodeURIComponent(cljs.core.str.cljs$core$IFn$_invoke$arity$1(v)))].join('');
}),query_params))].join('');
}
});
shadow.dom.redirect = (function shadow$dom$redirect(var_args){
var G__41337 = arguments.length;
switch (G__41337) {
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
var temp__5802__auto__ = shadow.dom.dom_node(ref).firstChild;
if(cljs.core.truth_(temp__5802__auto__)){
var child = temp__5802__auto__;
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
var G__41931 = ps;
var G__41932 = (i + (1));
el__$1 = G__41931;
i = G__41932;
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
var vec__41348 = shadow.dom.parse_tag(tag_def);
var tag_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41348,(0),null);
var tag_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41348,(1),null);
var tag_classes = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41348,(2),null);
var el = document.createElementNS("http://www.w3.org/2000/svg",tag_name);
if(cljs.core.truth_(tag_id)){
el.setAttribute("id",tag_id);
} else {
}

if(cljs.core.truth_(tag_classes)){
el.setAttribute("class",shadow.dom.merge_class_string(new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(props),tag_classes));
} else {
}

var seq__41351_41933 = cljs.core.seq(props);
var chunk__41352_41934 = null;
var count__41353_41935 = (0);
var i__41354_41936 = (0);
while(true){
if((i__41354_41936 < count__41353_41935)){
var vec__41388_41938 = chunk__41352_41934.cljs$core$IIndexed$_nth$arity$2(null,i__41354_41936);
var k_41939 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41388_41938,(0),null);
var v_41940 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41388_41938,(1),null);
el.setAttributeNS((function (){var temp__5804__auto__ = cljs.core.namespace(k_41939);
if(cljs.core.truth_(temp__5804__auto__)){
var ns = temp__5804__auto__;
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(shadow.dom.xmlns),ns);
} else {
return null;
}
})(),cljs.core.name(k_41939),v_41940);


var G__41941 = seq__41351_41933;
var G__41942 = chunk__41352_41934;
var G__41943 = count__41353_41935;
var G__41944 = (i__41354_41936 + (1));
seq__41351_41933 = G__41941;
chunk__41352_41934 = G__41942;
count__41353_41935 = G__41943;
i__41354_41936 = G__41944;
continue;
} else {
var temp__5804__auto___41946 = cljs.core.seq(seq__41351_41933);
if(temp__5804__auto___41946){
var seq__41351_41947__$1 = temp__5804__auto___41946;
if(cljs.core.chunked_seq_QMARK_(seq__41351_41947__$1)){
var c__5568__auto___41948 = cljs.core.chunk_first(seq__41351_41947__$1);
var G__41949 = cljs.core.chunk_rest(seq__41351_41947__$1);
var G__41950 = c__5568__auto___41948;
var G__41951 = cljs.core.count(c__5568__auto___41948);
var G__41952 = (0);
seq__41351_41933 = G__41949;
chunk__41352_41934 = G__41950;
count__41353_41935 = G__41951;
i__41354_41936 = G__41952;
continue;
} else {
var vec__41406_41953 = cljs.core.first(seq__41351_41947__$1);
var k_41954 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41406_41953,(0),null);
var v_41955 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41406_41953,(1),null);
el.setAttributeNS((function (){var temp__5804__auto____$1 = cljs.core.namespace(k_41954);
if(cljs.core.truth_(temp__5804__auto____$1)){
var ns = temp__5804__auto____$1;
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(shadow.dom.xmlns),ns);
} else {
return null;
}
})(),cljs.core.name(k_41954),v_41955);


var G__41956 = cljs.core.next(seq__41351_41947__$1);
var G__41957 = null;
var G__41958 = (0);
var G__41959 = (0);
seq__41351_41933 = G__41956;
chunk__41352_41934 = G__41957;
count__41353_41935 = G__41958;
i__41354_41936 = G__41959;
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
var vec__41423 = shadow.dom.destructure_node(shadow.dom.create_svg_node,structure);
var node = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41423,(0),null);
var node_children = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41423,(1),null);
var seq__41426_41960 = cljs.core.seq(node_children);
var chunk__41428_41961 = null;
var count__41429_41962 = (0);
var i__41430_41963 = (0);
while(true){
if((i__41430_41963 < count__41429_41962)){
var child_struct_41964 = chunk__41428_41961.cljs$core$IIndexed$_nth$arity$2(null,i__41430_41963);
if((!((child_struct_41964 == null)))){
if(typeof child_struct_41964 === 'string'){
var text_41965 = (node["textContent"]);
(node["textContent"] = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(text_41965),child_struct_41964].join(''));
} else {
var children_41966 = shadow.dom.svg_node(child_struct_41964);
if(cljs.core.seq_QMARK_(children_41966)){
var seq__41509_41967 = cljs.core.seq(children_41966);
var chunk__41511_41968 = null;
var count__41512_41969 = (0);
var i__41513_41970 = (0);
while(true){
if((i__41513_41970 < count__41512_41969)){
var child_41971 = chunk__41511_41968.cljs$core$IIndexed$_nth$arity$2(null,i__41513_41970);
if(cljs.core.truth_(child_41971)){
node.appendChild(child_41971);


var G__41972 = seq__41509_41967;
var G__41973 = chunk__41511_41968;
var G__41974 = count__41512_41969;
var G__41975 = (i__41513_41970 + (1));
seq__41509_41967 = G__41972;
chunk__41511_41968 = G__41973;
count__41512_41969 = G__41974;
i__41513_41970 = G__41975;
continue;
} else {
var G__41976 = seq__41509_41967;
var G__41977 = chunk__41511_41968;
var G__41978 = count__41512_41969;
var G__41979 = (i__41513_41970 + (1));
seq__41509_41967 = G__41976;
chunk__41511_41968 = G__41977;
count__41512_41969 = G__41978;
i__41513_41970 = G__41979;
continue;
}
} else {
var temp__5804__auto___41980 = cljs.core.seq(seq__41509_41967);
if(temp__5804__auto___41980){
var seq__41509_41981__$1 = temp__5804__auto___41980;
if(cljs.core.chunked_seq_QMARK_(seq__41509_41981__$1)){
var c__5568__auto___41982 = cljs.core.chunk_first(seq__41509_41981__$1);
var G__41983 = cljs.core.chunk_rest(seq__41509_41981__$1);
var G__41984 = c__5568__auto___41982;
var G__41985 = cljs.core.count(c__5568__auto___41982);
var G__41986 = (0);
seq__41509_41967 = G__41983;
chunk__41511_41968 = G__41984;
count__41512_41969 = G__41985;
i__41513_41970 = G__41986;
continue;
} else {
var child_41987 = cljs.core.first(seq__41509_41981__$1);
if(cljs.core.truth_(child_41987)){
node.appendChild(child_41987);


var G__41988 = cljs.core.next(seq__41509_41981__$1);
var G__41989 = null;
var G__41990 = (0);
var G__41991 = (0);
seq__41509_41967 = G__41988;
chunk__41511_41968 = G__41989;
count__41512_41969 = G__41990;
i__41513_41970 = G__41991;
continue;
} else {
var G__41992 = cljs.core.next(seq__41509_41981__$1);
var G__41993 = null;
var G__41994 = (0);
var G__41995 = (0);
seq__41509_41967 = G__41992;
chunk__41511_41968 = G__41993;
count__41512_41969 = G__41994;
i__41513_41970 = G__41995;
continue;
}
}
} else {
}
}
break;
}
} else {
node.appendChild(children_41966);
}
}


var G__41996 = seq__41426_41960;
var G__41997 = chunk__41428_41961;
var G__41998 = count__41429_41962;
var G__41999 = (i__41430_41963 + (1));
seq__41426_41960 = G__41996;
chunk__41428_41961 = G__41997;
count__41429_41962 = G__41998;
i__41430_41963 = G__41999;
continue;
} else {
var G__42000 = seq__41426_41960;
var G__42001 = chunk__41428_41961;
var G__42002 = count__41429_41962;
var G__42003 = (i__41430_41963 + (1));
seq__41426_41960 = G__42000;
chunk__41428_41961 = G__42001;
count__41429_41962 = G__42002;
i__41430_41963 = G__42003;
continue;
}
} else {
var temp__5804__auto___42005 = cljs.core.seq(seq__41426_41960);
if(temp__5804__auto___42005){
var seq__41426_42006__$1 = temp__5804__auto___42005;
if(cljs.core.chunked_seq_QMARK_(seq__41426_42006__$1)){
var c__5568__auto___42007 = cljs.core.chunk_first(seq__41426_42006__$1);
var G__42008 = cljs.core.chunk_rest(seq__41426_42006__$1);
var G__42009 = c__5568__auto___42007;
var G__42010 = cljs.core.count(c__5568__auto___42007);
var G__42011 = (0);
seq__41426_41960 = G__42008;
chunk__41428_41961 = G__42009;
count__41429_41962 = G__42010;
i__41430_41963 = G__42011;
continue;
} else {
var child_struct_42012 = cljs.core.first(seq__41426_42006__$1);
if((!((child_struct_42012 == null)))){
if(typeof child_struct_42012 === 'string'){
var text_42013 = (node["textContent"]);
(node["textContent"] = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(text_42013),child_struct_42012].join(''));
} else {
var children_42014 = shadow.dom.svg_node(child_struct_42012);
if(cljs.core.seq_QMARK_(children_42014)){
var seq__41543_42015 = cljs.core.seq(children_42014);
var chunk__41545_42016 = null;
var count__41546_42017 = (0);
var i__41547_42018 = (0);
while(true){
if((i__41547_42018 < count__41546_42017)){
var child_42019 = chunk__41545_42016.cljs$core$IIndexed$_nth$arity$2(null,i__41547_42018);
if(cljs.core.truth_(child_42019)){
node.appendChild(child_42019);


var G__42020 = seq__41543_42015;
var G__42021 = chunk__41545_42016;
var G__42022 = count__41546_42017;
var G__42023 = (i__41547_42018 + (1));
seq__41543_42015 = G__42020;
chunk__41545_42016 = G__42021;
count__41546_42017 = G__42022;
i__41547_42018 = G__42023;
continue;
} else {
var G__42024 = seq__41543_42015;
var G__42025 = chunk__41545_42016;
var G__42026 = count__41546_42017;
var G__42027 = (i__41547_42018 + (1));
seq__41543_42015 = G__42024;
chunk__41545_42016 = G__42025;
count__41546_42017 = G__42026;
i__41547_42018 = G__42027;
continue;
}
} else {
var temp__5804__auto___42028__$1 = cljs.core.seq(seq__41543_42015);
if(temp__5804__auto___42028__$1){
var seq__41543_42029__$1 = temp__5804__auto___42028__$1;
if(cljs.core.chunked_seq_QMARK_(seq__41543_42029__$1)){
var c__5568__auto___42030 = cljs.core.chunk_first(seq__41543_42029__$1);
var G__42031 = cljs.core.chunk_rest(seq__41543_42029__$1);
var G__42032 = c__5568__auto___42030;
var G__42033 = cljs.core.count(c__5568__auto___42030);
var G__42034 = (0);
seq__41543_42015 = G__42031;
chunk__41545_42016 = G__42032;
count__41546_42017 = G__42033;
i__41547_42018 = G__42034;
continue;
} else {
var child_42035 = cljs.core.first(seq__41543_42029__$1);
if(cljs.core.truth_(child_42035)){
node.appendChild(child_42035);


var G__42036 = cljs.core.next(seq__41543_42029__$1);
var G__42037 = null;
var G__42038 = (0);
var G__42039 = (0);
seq__41543_42015 = G__42036;
chunk__41545_42016 = G__42037;
count__41546_42017 = G__42038;
i__41547_42018 = G__42039;
continue;
} else {
var G__42040 = cljs.core.next(seq__41543_42029__$1);
var G__42041 = null;
var G__42042 = (0);
var G__42043 = (0);
seq__41543_42015 = G__42040;
chunk__41545_42016 = G__42041;
count__41546_42017 = G__42042;
i__41547_42018 = G__42043;
continue;
}
}
} else {
}
}
break;
}
} else {
node.appendChild(children_42014);
}
}


var G__42044 = cljs.core.next(seq__41426_42006__$1);
var G__42045 = null;
var G__42046 = (0);
var G__42047 = (0);
seq__41426_41960 = G__42044;
chunk__41428_41961 = G__42045;
count__41429_41962 = G__42046;
i__41430_41963 = G__42047;
continue;
} else {
var G__42048 = cljs.core.next(seq__41426_42006__$1);
var G__42049 = null;
var G__42050 = (0);
var G__42051 = (0);
seq__41426_41960 = G__42048;
chunk__41428_41961 = G__42049;
count__41429_41962 = G__42050;
i__41430_41963 = G__42051;
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
(shadow.dom.SVGElement["string"] = true);

(shadow.dom._to_svg["string"] = (function (this$){
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

(shadow.dom.SVGElement["null"] = true);

(shadow.dom._to_svg["null"] = (function (_){
return null;
}));
shadow.dom.svg = (function shadow$dom$svg(var_args){
var args__5775__auto__ = [];
var len__5769__auto___42052 = arguments.length;
var i__5770__auto___42053 = (0);
while(true){
if((i__5770__auto___42053 < len__5769__auto___42052)){
args__5775__auto__.push((arguments[i__5770__auto___42053]));

var G__42054 = (i__5770__auto___42053 + (1));
i__5770__auto___42053 = G__42054;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return shadow.dom.svg.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(shadow.dom.svg.cljs$core$IFn$_invoke$arity$variadic = (function (attrs,children){
return shadow.dom._to_svg(cljs.core.vec(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"svg","svg",856789142),attrs], null),children)));
}));

(shadow.dom.svg.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(shadow.dom.svg.cljs$lang$applyTo = (function (seq41597){
var G__41598 = cljs.core.first(seq41597);
var seq41597__$1 = cljs.core.next(seq41597);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__41598,seq41597__$1);
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
var G__41628 = arguments.length;
switch (G__41628) {
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

if(cljs.core.truth_((function (){var and__5043__auto__ = once_or_cleanup;
if(cljs.core.truth_(and__5043__auto__)){
return (!(once_or_cleanup === true));
} else {
return and__5043__auto__;
}
})())){
var c__36431__auto___42059 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__36432__auto__ = (function (){var switch__35511__auto__ = (function (state_41638){
var state_val_41639 = (state_41638[(1)]);
if((state_val_41639 === (1))){
var state_41638__$1 = state_41638;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_41638__$1,(2),once_or_cleanup);
} else {
if((state_val_41639 === (2))){
var inst_41634 = (state_41638[(2)]);
var inst_41636 = shadow.dom.remove_event_handler(el,event,event_fn);
var state_41638__$1 = (function (){var statearr_41640 = state_41638;
(statearr_41640[(7)] = inst_41634);

return statearr_41640;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_41638__$1,inst_41636);
} else {
return null;
}
}
});
return (function() {
var shadow$dom$state_machine__35512__auto__ = null;
var shadow$dom$state_machine__35512__auto____0 = (function (){
var statearr_41642 = [null,null,null,null,null,null,null,null];
(statearr_41642[(0)] = shadow$dom$state_machine__35512__auto__);

(statearr_41642[(1)] = (1));

return statearr_41642;
});
var shadow$dom$state_machine__35512__auto____1 = (function (state_41638){
while(true){
var ret_value__35513__auto__ = (function (){try{while(true){
var result__35514__auto__ = switch__35511__auto__(state_41638);
if(cljs.core.keyword_identical_QMARK_(result__35514__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__35514__auto__;
}
break;
}
}catch (e41643){var ex__35515__auto__ = e41643;
var statearr_41645_42062 = state_41638;
(statearr_41645_42062[(2)] = ex__35515__auto__);


if(cljs.core.seq((state_41638[(4)]))){
var statearr_41646_42063 = state_41638;
(statearr_41646_42063[(1)] = cljs.core.first((state_41638[(4)])));

} else {
throw ex__35515__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35513__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__42064 = state_41638;
state_41638 = G__42064;
continue;
} else {
return ret_value__35513__auto__;
}
break;
}
});
shadow$dom$state_machine__35512__auto__ = function(state_41638){
switch(arguments.length){
case 0:
return shadow$dom$state_machine__35512__auto____0.call(this);
case 1:
return shadow$dom$state_machine__35512__auto____1.call(this,state_41638);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
shadow$dom$state_machine__35512__auto__.cljs$core$IFn$_invoke$arity$0 = shadow$dom$state_machine__35512__auto____0;
shadow$dom$state_machine__35512__auto__.cljs$core$IFn$_invoke$arity$1 = shadow$dom$state_machine__35512__auto____1;
return shadow$dom$state_machine__35512__auto__;
})()
})();
var state__36433__auto__ = (function (){var statearr_41651 = f__36432__auto__();
(statearr_41651[(6)] = c__36431__auto___42059);

return statearr_41651;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__36433__auto__);
}));

} else {
}

return chan;
}));

(shadow.dom.event_chan.cljs$lang$maxFixedArity = 4);


//# sourceMappingURL=shadow.dom.js.map

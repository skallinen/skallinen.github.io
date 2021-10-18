goog.provide('ajax.xml_http_request');
ajax.xml_http_request.ready_state = (function ajax$xml_http_request$ready_state(e){
var G__54021 = e.target.readyState;
var fexpr__54020 = new cljs.core.PersistentArrayMap(null, 5, [(0),new cljs.core.Keyword(null,"not-initialized","not-initialized",-1937378906),(1),new cljs.core.Keyword(null,"connection-established","connection-established",-1403749733),(2),new cljs.core.Keyword(null,"request-received","request-received",2110590540),(3),new cljs.core.Keyword(null,"processing-request","processing-request",-264947221),(4),new cljs.core.Keyword(null,"response-ready","response-ready",245208276)], null);
return (fexpr__54020.cljs$core$IFn$_invoke$arity$1 ? fexpr__54020.cljs$core$IFn$_invoke$arity$1(G__54021) : fexpr__54020.call(null,G__54021));
});
ajax.xml_http_request.append = (function ajax$xml_http_request$append(current,next){
if(cljs.core.truth_(current)){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(current),", ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(next)].join('');
} else {
return next;
}
});
ajax.xml_http_request.process_headers = (function ajax$xml_http_request$process_headers(header_str){
if(cljs.core.truth_(header_str)){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (headers,header_line){
if(cljs.core.truth_(goog.string.isEmptyOrWhitespace(header_line))){
return headers;
} else {
var key_value = goog.string.splitLimit(header_line,": ",(2));
return cljs.core.update.cljs$core$IFn$_invoke$arity$4(headers,(key_value[(0)]),ajax.xml_http_request.append,(key_value[(1)]));
}
}),cljs.core.PersistentArrayMap.EMPTY,header_str.split("\r\n"));
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
});
ajax.xml_http_request.xmlhttprequest = (((typeof goog !== 'undefined') && (typeof goog.global !== 'undefined') && (typeof goog.global.XMLHttpRequest !== 'undefined'))?goog.global.XMLHttpRequest:(((typeof require !== 'undefined'))?(function (){var req = require;
return (req.cljs$core$IFn$_invoke$arity$1 ? req.cljs$core$IFn$_invoke$arity$1("xmlhttprequest") : req.call(null,"xmlhttprequest")).XMLHttpRequest;
})():null));
(ajax.xml_http_request.xmlhttprequest.prototype.ajax$protocols$AjaxImpl$ = cljs.core.PROTOCOL_SENTINEL);

(ajax.xml_http_request.xmlhttprequest.prototype.ajax$protocols$AjaxImpl$_js_ajax_request$arity$3 = (function (this$,p__54044,handler){
var map__54045 = p__54044;
var map__54045__$1 = cljs.core.__destructure_map(map__54045);
var uri = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54045__$1,new cljs.core.Keyword(null,"uri","uri",-774711847));
var method = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54045__$1,new cljs.core.Keyword(null,"method","method",55703592));
var body = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54045__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var headers = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54045__$1,new cljs.core.Keyword(null,"headers","headers",-835030129));
var timeout = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__54045__$1,new cljs.core.Keyword(null,"timeout","timeout",-318625318),(0));
var with_credentials = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__54045__$1,new cljs.core.Keyword(null,"with-credentials","with-credentials",-1163127235),false);
var response_format = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54045__$1,new cljs.core.Keyword(null,"response-format","response-format",1664465322));
var this$__$1 = this;
(this$__$1.withCredentials = with_credentials);

(this$__$1.onreadystatechange = (function (p1__54039_SHARP_){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"response-ready","response-ready",245208276),ajax.xml_http_request.ready_state(p1__54039_SHARP_))){
return (handler.cljs$core$IFn$_invoke$arity$1 ? handler.cljs$core$IFn$_invoke$arity$1(this$__$1) : handler.call(null,this$__$1));
} else {
return null;
}
}));

this$__$1.open(method,uri,true);

(this$__$1.timeout = timeout);

var temp__5753__auto___54079 = new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(response_format);
if(cljs.core.truth_(temp__5753__auto___54079)){
var response_type_54080 = temp__5753__auto___54079;
(this$__$1.responseType = cljs.core.name(response_type_54080));
} else {
}

var seq__54047_54081 = cljs.core.seq(headers);
var chunk__54048_54082 = null;
var count__54049_54083 = (0);
var i__54050_54084 = (0);
while(true){
if((i__54050_54084 < count__54049_54083)){
var vec__54064_54085 = chunk__54048_54082.cljs$core$IIndexed$_nth$arity$2(null,i__54050_54084);
var k_54086 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__54064_54085,(0),null);
var v_54087 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__54064_54085,(1),null);
this$__$1.setRequestHeader(k_54086,v_54087);


var G__54088 = seq__54047_54081;
var G__54089 = chunk__54048_54082;
var G__54090 = count__54049_54083;
var G__54091 = (i__54050_54084 + (1));
seq__54047_54081 = G__54088;
chunk__54048_54082 = G__54089;
count__54049_54083 = G__54090;
i__54050_54084 = G__54091;
continue;
} else {
var temp__5753__auto___54092 = cljs.core.seq(seq__54047_54081);
if(temp__5753__auto___54092){
var seq__54047_54093__$1 = temp__5753__auto___54092;
if(cljs.core.chunked_seq_QMARK_(seq__54047_54093__$1)){
var c__4638__auto___54098 = cljs.core.chunk_first(seq__54047_54093__$1);
var G__54099 = cljs.core.chunk_rest(seq__54047_54093__$1);
var G__54100 = c__4638__auto___54098;
var G__54101 = cljs.core.count(c__4638__auto___54098);
var G__54102 = (0);
seq__54047_54081 = G__54099;
chunk__54048_54082 = G__54100;
count__54049_54083 = G__54101;
i__54050_54084 = G__54102;
continue;
} else {
var vec__54069_54103 = cljs.core.first(seq__54047_54093__$1);
var k_54104 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__54069_54103,(0),null);
var v_54105 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__54069_54103,(1),null);
this$__$1.setRequestHeader(k_54104,v_54105);


var G__54106 = cljs.core.next(seq__54047_54093__$1);
var G__54107 = null;
var G__54108 = (0);
var G__54109 = (0);
seq__54047_54081 = G__54106;
chunk__54048_54082 = G__54107;
count__54049_54083 = G__54108;
i__54050_54084 = G__54109;
continue;
}
} else {
}
}
break;
}

this$__$1.send((function (){var or__4212__auto__ = body;
if(cljs.core.truth_(or__4212__auto__)){
return or__4212__auto__;
} else {
return "";
}
})());

return this$__$1;
}));

(ajax.xml_http_request.xmlhttprequest.prototype.ajax$protocols$AjaxRequest$ = cljs.core.PROTOCOL_SENTINEL);

(ajax.xml_http_request.xmlhttprequest.prototype.ajax$protocols$AjaxRequest$_abort$arity$1 = (function (this$){
var this$__$1 = this;
return this$__$1.abort();
}));

(ajax.xml_http_request.xmlhttprequest.prototype.ajax$protocols$AjaxResponse$ = cljs.core.PROTOCOL_SENTINEL);

(ajax.xml_http_request.xmlhttprequest.prototype.ajax$protocols$AjaxResponse$_body$arity$1 = (function (this$){
var this$__$1 = this;
return this$__$1.response;
}));

(ajax.xml_http_request.xmlhttprequest.prototype.ajax$protocols$AjaxResponse$_status$arity$1 = (function (this$){
var this$__$1 = this;
return this$__$1.status;
}));

(ajax.xml_http_request.xmlhttprequest.prototype.ajax$protocols$AjaxResponse$_status_text$arity$1 = (function (this$){
var this$__$1 = this;
return this$__$1.statusText;
}));

(ajax.xml_http_request.xmlhttprequest.prototype.ajax$protocols$AjaxResponse$_get_all_headers$arity$1 = (function (this$){
var this$__$1 = this;
return ajax.xml_http_request.process_headers(this$__$1.getAllResponseHeaders());
}));

(ajax.xml_http_request.xmlhttprequest.prototype.ajax$protocols$AjaxResponse$_get_response_header$arity$2 = (function (this$,header){
var this$__$1 = this;
return this$__$1.getResponseHeader(header);
}));

(ajax.xml_http_request.xmlhttprequest.prototype.ajax$protocols$AjaxResponse$_was_aborted$arity$1 = (function (this$){
var this$__$1 = this;
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((0),this$__$1.readyState);
}));

//# sourceMappingURL=ajax.xml_http_request.js.map

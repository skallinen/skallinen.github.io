// Compiled by ClojureScript 1.10.597 {}
goog.provide('cljs_http.core');
goog.require('cljs.core');
goog.require('goog.net.EventType');
goog.require('goog.net.ErrorCode');
goog.require('goog.net.XhrIo');
goog.require('goog.net.Jsonp');
goog.require('cljs_http.util');
goog.require('cljs.core.async');
goog.require('clojure.string');
cljs_http.core.pending_requests = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
/**
 * Attempt to close the given channel and abort the pending HTTP request
 *   with which it is associated.
 */
cljs_http.core.abort_BANG_ = (function cljs_http$core$abort_BANG_(channel){
var temp__5735__auto__ = cljs.core.deref.call(null,cljs_http.core.pending_requests).call(null,channel);
if(cljs.core.truth_(temp__5735__auto__)){
var req = temp__5735__auto__;
cljs.core.swap_BANG_.call(null,cljs_http.core.pending_requests,cljs.core.dissoc,channel);

cljs.core.async.close_BANG_.call(null,channel);

if(cljs.core.truth_(req.hasOwnProperty("abort"))){
return req.abort();
} else {
return new cljs.core.Keyword(null,"jsonp","jsonp",226119588).cljs$core$IFn$_invoke$arity$1(req).cancel(new cljs.core.Keyword(null,"request","request",1772954723).cljs$core$IFn$_invoke$arity$1(req));
}
} else {
return null;
}
});
cljs_http.core.aborted_QMARK_ = (function cljs_http$core$aborted_QMARK_(xhr){
return cljs.core._EQ_.call(null,xhr.getLastErrorCode(),goog.net.ErrorCode.ABORT);
});
/**
 * Takes an XhrIo object and applies the default-headers to it.
 */
cljs_http.core.apply_default_headers_BANG_ = (function cljs_http$core$apply_default_headers_BANG_(xhr,headers){
var formatted_h = cljs.core.zipmap.call(null,cljs.core.map.call(null,cljs_http.util.camelize,cljs.core.keys.call(null,headers)),cljs.core.vals.call(null,headers));
return cljs.core.dorun.call(null,cljs.core.map.call(null,(function (p__28622){
var vec__28623 = p__28622;
var k = cljs.core.nth.call(null,vec__28623,(0),null);
var v = cljs.core.nth.call(null,vec__28623,(1),null);
return xhr.headers.set(k,v);
}),formatted_h));
});
/**
 * Takes an XhrIo object and sets response-type if not nil.
 */
cljs_http.core.apply_response_type_BANG_ = (function cljs_http$core$apply_response_type_BANG_(xhr,response_type){
return xhr.setResponseType((function (){var G__28626 = response_type;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"array-buffer","array-buffer",519008380),G__28626)){
return goog.net.XhrIo.ResponseType.ARRAY_BUFFER;
} else {
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"blob","blob",1636965233),G__28626)){
return goog.net.XhrIo.ResponseType.BLOB;
} else {
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"document","document",-1329188687),G__28626)){
return goog.net.XhrIo.ResponseType.DOCUMENT;
} else {
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"text","text",-1790561697),G__28626)){
return goog.net.XhrIo.ResponseType.TEXT;
} else {
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"default","default",-1987822328),G__28626)){
return goog.net.XhrIo.ResponseType.DEFAULT;
} else {
if(cljs.core._EQ_.call(null,null,G__28626)){
return goog.net.XhrIo.ResponseType.DEFAULT;
} else {
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__28626)].join('')));

}
}
}
}
}
}
})());
});
/**
 * Builds an XhrIo object from the request parameters.
 */
cljs_http.core.build_xhr = (function cljs_http$core$build_xhr(p__28627){
var map__28628 = p__28627;
var map__28628__$1 = (((((!((map__28628 == null))))?(((((map__28628.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__28628.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__28628):map__28628);
var request = map__28628__$1;
var with_credentials_QMARK_ = cljs.core.get.call(null,map__28628__$1,new cljs.core.Keyword(null,"with-credentials?","with-credentials?",-1773202222));
var default_headers = cljs.core.get.call(null,map__28628__$1,new cljs.core.Keyword(null,"default-headers","default-headers",-43146094));
var response_type = cljs.core.get.call(null,map__28628__$1,new cljs.core.Keyword(null,"response-type","response-type",-1493770458));
var timeout = (function (){var or__4185__auto__ = new cljs.core.Keyword(null,"timeout","timeout",-318625318).cljs$core$IFn$_invoke$arity$1(request);
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
return (0);
}
})();
var send_credentials = (((with_credentials_QMARK_ == null))?true:with_credentials_QMARK_);
var G__28630 = (new goog.net.XhrIo());
cljs_http.core.apply_default_headers_BANG_.call(null,G__28630,default_headers);

cljs_http.core.apply_response_type_BANG_.call(null,G__28630,response_type);

G__28630.setTimeoutInterval(timeout);

G__28630.setWithCredentials(send_credentials);

return G__28630;
});
cljs_http.core.error_kw = cljs.core.PersistentHashMap.fromArrays([(0),(7),(1),(4),(6),(3),(2),(9),(5),(8)],[new cljs.core.Keyword(null,"no-error","no-error",1984610064),new cljs.core.Keyword(null,"abort","abort",521193198),new cljs.core.Keyword(null,"access-denied","access-denied",959449406),new cljs.core.Keyword(null,"custom-error","custom-error",-1565161123),new cljs.core.Keyword(null,"http-error","http-error",-1040049553),new cljs.core.Keyword(null,"ff-silent-error","ff-silent-error",189390514),new cljs.core.Keyword(null,"file-not-found","file-not-found",-65398940),new cljs.core.Keyword(null,"offline","offline",-107631935),new cljs.core.Keyword(null,"exception","exception",-335277064),new cljs.core.Keyword(null,"timeout","timeout",-318625318)]);
/**
 * Execute the HTTP request corresponding to the given Ring request
 *   map and return a core.async channel.
 */
cljs_http.core.xhr = (function cljs_http$core$xhr(p__28631){
var map__28632 = p__28631;
var map__28632__$1 = (((((!((map__28632 == null))))?(((((map__28632.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__28632.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__28632):map__28632);
var request = map__28632__$1;
var request_method = cljs.core.get.call(null,map__28632__$1,new cljs.core.Keyword(null,"request-method","request-method",1764796830));
var headers = cljs.core.get.call(null,map__28632__$1,new cljs.core.Keyword(null,"headers","headers",-835030129));
var body = cljs.core.get.call(null,map__28632__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var with_credentials_QMARK_ = cljs.core.get.call(null,map__28632__$1,new cljs.core.Keyword(null,"with-credentials?","with-credentials?",-1773202222));
var cancel = cljs.core.get.call(null,map__28632__$1,new cljs.core.Keyword(null,"cancel","cancel",-1964088360));
var progress = cljs.core.get.call(null,map__28632__$1,new cljs.core.Keyword(null,"progress","progress",244323547));
var channel = cljs.core.async.chan.call(null);
var request_url = cljs_http.util.build_url.call(null,request);
var method = cljs.core.name.call(null,(function (){var or__4185__auto__ = request_method;
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
return new cljs.core.Keyword(null,"get","get",1683182755);
}
})());
var headers__$1 = cljs_http.util.build_headers.call(null,headers);
var xhr = cljs_http.core.build_xhr.call(null,request);
cljs.core.swap_BANG_.call(null,cljs_http.core.pending_requests,cljs.core.assoc,channel,xhr);

xhr.listen(goog.net.EventType.COMPLETE,(function (evt){
var target = evt.target;
var response = new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"status","status",-1997798413),target.getStatus(),new cljs.core.Keyword(null,"success","success",1890645906),target.isSuccess(),new cljs.core.Keyword(null,"body","body",-2049205669),target.getResponse(),new cljs.core.Keyword(null,"headers","headers",-835030129),cljs_http.util.parse_headers.call(null,target.getAllResponseHeaders()),new cljs.core.Keyword(null,"trace-redirects","trace-redirects",-1149427907),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [request_url,target.getLastUri()], null),new cljs.core.Keyword(null,"error-code","error-code",180497232),cljs_http.core.error_kw.call(null,target.getLastErrorCode()),new cljs.core.Keyword(null,"error-text","error-text",2021893718),target.getLastError()], null);
if((!(cljs_http.core.aborted_QMARK_.call(null,xhr)))){
cljs.core.async.put_BANG_.call(null,channel,response);
} else {
}

cljs.core.swap_BANG_.call(null,cljs_http.core.pending_requests,cljs.core.dissoc,channel);

if(cljs.core.truth_(cancel)){
cljs.core.async.close_BANG_.call(null,cancel);
} else {
}

return cljs.core.async.close_BANG_.call(null,channel);
}));

if(cljs.core.truth_(progress)){
var listener_28656 = (function (direction,evt){
return cljs.core.async.put_BANG_.call(null,progress,cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"direction","direction",-633359395),direction,new cljs.core.Keyword(null,"loaded","loaded",-1246482293),evt.loaded], null),(cljs.core.truth_(evt.lengthComputable)?new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"total","total",1916810418),evt.total], null):null)));
});
var G__28634_28657 = xhr;
G__28634_28657.setProgressEventsEnabled(true);

G__28634_28657.listen(goog.net.EventType.UPLOAD_PROGRESS,cljs.core.partial.call(null,listener_28656,new cljs.core.Keyword(null,"upload","upload",-255769218)));

G__28634_28657.listen(goog.net.EventType.DOWNLOAD_PROGRESS,cljs.core.partial.call(null,listener_28656,new cljs.core.Keyword(null,"download","download",-300081668)));

} else {
}

xhr.send(request_url,method,body,headers__$1);

if(cljs.core.truth_(cancel)){
var c__26680__auto___28658 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26681__auto__ = (function (){var switch__26585__auto__ = (function (state_28645){
var state_val_28646 = (state_28645[(1)]);
if((state_val_28646 === (1))){
var state_28645__$1 = state_28645;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_28645__$1,(2),cancel);
} else {
if((state_val_28646 === (2))){
var inst_28636 = (state_28645[(2)]);
var inst_28637 = xhr.isComplete();
var inst_28638 = cljs.core.not.call(null,inst_28637);
var state_28645__$1 = (function (){var statearr_28647 = state_28645;
(statearr_28647[(7)] = inst_28636);

return statearr_28647;
})();
if(inst_28638){
var statearr_28648_28659 = state_28645__$1;
(statearr_28648_28659[(1)] = (3));

} else {
var statearr_28649_28660 = state_28645__$1;
(statearr_28649_28660[(1)] = (4));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28646 === (3))){
var inst_28640 = xhr.abort();
var state_28645__$1 = state_28645;
var statearr_28650_28661 = state_28645__$1;
(statearr_28650_28661[(2)] = inst_28640);

(statearr_28650_28661[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28646 === (4))){
var state_28645__$1 = state_28645;
var statearr_28651_28662 = state_28645__$1;
(statearr_28651_28662[(2)] = null);

(statearr_28651_28662[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28646 === (5))){
var inst_28643 = (state_28645[(2)]);
var state_28645__$1 = state_28645;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_28645__$1,inst_28643);
} else {
return null;
}
}
}
}
}
});
return (function() {
var cljs_http$core$xhr_$_state_machine__26586__auto__ = null;
var cljs_http$core$xhr_$_state_machine__26586__auto____0 = (function (){
var statearr_28652 = [null,null,null,null,null,null,null,null];
(statearr_28652[(0)] = cljs_http$core$xhr_$_state_machine__26586__auto__);

(statearr_28652[(1)] = (1));

return statearr_28652;
});
var cljs_http$core$xhr_$_state_machine__26586__auto____1 = (function (state_28645){
while(true){
var ret_value__26587__auto__ = (function (){try{while(true){
var result__26588__auto__ = switch__26585__auto__.call(null,state_28645);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26588__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26588__auto__;
}
break;
}
}catch (e28653){if((e28653 instanceof Object)){
var ex__26589__auto__ = e28653;
var statearr_28654_28663 = state_28645;
(statearr_28654_28663[(5)] = ex__26589__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_28645);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e28653;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26587__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__28664 = state_28645;
state_28645 = G__28664;
continue;
} else {
return ret_value__26587__auto__;
}
break;
}
});
cljs_http$core$xhr_$_state_machine__26586__auto__ = function(state_28645){
switch(arguments.length){
case 0:
return cljs_http$core$xhr_$_state_machine__26586__auto____0.call(this);
case 1:
return cljs_http$core$xhr_$_state_machine__26586__auto____1.call(this,state_28645);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs_http$core$xhr_$_state_machine__26586__auto__.cljs$core$IFn$_invoke$arity$0 = cljs_http$core$xhr_$_state_machine__26586__auto____0;
cljs_http$core$xhr_$_state_machine__26586__auto__.cljs$core$IFn$_invoke$arity$1 = cljs_http$core$xhr_$_state_machine__26586__auto____1;
return cljs_http$core$xhr_$_state_machine__26586__auto__;
})()
})();
var state__26682__auto__ = (function (){var statearr_28655 = f__26681__auto__.call(null);
(statearr_28655[(6)] = c__26680__auto___28658);

return statearr_28655;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26682__auto__);
}));

} else {
}

return channel;
});
/**
 * Execute the JSONP request corresponding to the given Ring request
 *   map and return a core.async channel.
 */
cljs_http.core.jsonp = (function cljs_http$core$jsonp(p__28665){
var map__28666 = p__28665;
var map__28666__$1 = (((((!((map__28666 == null))))?(((((map__28666.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__28666.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__28666):map__28666);
var request = map__28666__$1;
var timeout = cljs.core.get.call(null,map__28666__$1,new cljs.core.Keyword(null,"timeout","timeout",-318625318));
var callback_name = cljs.core.get.call(null,map__28666__$1,new cljs.core.Keyword(null,"callback-name","callback-name",336964714));
var cancel = cljs.core.get.call(null,map__28666__$1,new cljs.core.Keyword(null,"cancel","cancel",-1964088360));
var keywordize_keys_QMARK_ = cljs.core.get.call(null,map__28666__$1,new cljs.core.Keyword(null,"keywordize-keys?","keywordize-keys?",-254545987),true);
var channel = cljs.core.async.chan.call(null);
var jsonp = (new goog.net.Jsonp(cljs_http.util.build_url.call(null,request),callback_name));
jsonp.setRequestTimeout(timeout);

var req_28679 = jsonp.send(null,(function cljs_http$core$jsonp_$_success_callback(data){
var response = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"status","status",-1997798413),(200),new cljs.core.Keyword(null,"success","success",1890645906),true,new cljs.core.Keyword(null,"body","body",-2049205669),cljs.core.js__GT_clj.call(null,data,new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),keywordize_keys_QMARK_)], null);
cljs.core.async.put_BANG_.call(null,channel,response);

cljs.core.swap_BANG_.call(null,cljs_http.core.pending_requests,cljs.core.dissoc,channel);

if(cljs.core.truth_(cancel)){
cljs.core.async.close_BANG_.call(null,cancel);
} else {
}

return cljs.core.async.close_BANG_.call(null,channel);
}),(function cljs_http$core$jsonp_$_error_callback(){
cljs.core.swap_BANG_.call(null,cljs_http.core.pending_requests,cljs.core.dissoc,channel);

if(cljs.core.truth_(cancel)){
cljs.core.async.close_BANG_.call(null,cancel);
} else {
}

return cljs.core.async.close_BANG_.call(null,channel);
}));
cljs.core.swap_BANG_.call(null,cljs_http.core.pending_requests,cljs.core.assoc,channel,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"jsonp","jsonp",226119588),jsonp,new cljs.core.Keyword(null,"request","request",1772954723),req_28679], null));

if(cljs.core.truth_(cancel)){
var c__26680__auto___28680 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26681__auto__ = (function (){var switch__26585__auto__ = (function (state_28672){
var state_val_28673 = (state_28672[(1)]);
if((state_val_28673 === (1))){
var state_28672__$1 = state_28672;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_28672__$1,(2),cancel);
} else {
if((state_val_28673 === (2))){
var inst_28669 = (state_28672[(2)]);
var inst_28670 = jsonp.cancel(req_28679);
var state_28672__$1 = (function (){var statearr_28674 = state_28672;
(statearr_28674[(7)] = inst_28669);

return statearr_28674;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_28672__$1,inst_28670);
} else {
return null;
}
}
});
return (function() {
var cljs_http$core$jsonp_$_state_machine__26586__auto__ = null;
var cljs_http$core$jsonp_$_state_machine__26586__auto____0 = (function (){
var statearr_28675 = [null,null,null,null,null,null,null,null];
(statearr_28675[(0)] = cljs_http$core$jsonp_$_state_machine__26586__auto__);

(statearr_28675[(1)] = (1));

return statearr_28675;
});
var cljs_http$core$jsonp_$_state_machine__26586__auto____1 = (function (state_28672){
while(true){
var ret_value__26587__auto__ = (function (){try{while(true){
var result__26588__auto__ = switch__26585__auto__.call(null,state_28672);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26588__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26588__auto__;
}
break;
}
}catch (e28676){if((e28676 instanceof Object)){
var ex__26589__auto__ = e28676;
var statearr_28677_28681 = state_28672;
(statearr_28677_28681[(5)] = ex__26589__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_28672);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e28676;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26587__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__28682 = state_28672;
state_28672 = G__28682;
continue;
} else {
return ret_value__26587__auto__;
}
break;
}
});
cljs_http$core$jsonp_$_state_machine__26586__auto__ = function(state_28672){
switch(arguments.length){
case 0:
return cljs_http$core$jsonp_$_state_machine__26586__auto____0.call(this);
case 1:
return cljs_http$core$jsonp_$_state_machine__26586__auto____1.call(this,state_28672);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs_http$core$jsonp_$_state_machine__26586__auto__.cljs$core$IFn$_invoke$arity$0 = cljs_http$core$jsonp_$_state_machine__26586__auto____0;
cljs_http$core$jsonp_$_state_machine__26586__auto__.cljs$core$IFn$_invoke$arity$1 = cljs_http$core$jsonp_$_state_machine__26586__auto____1;
return cljs_http$core$jsonp_$_state_machine__26586__auto__;
})()
})();
var state__26682__auto__ = (function (){var statearr_28678 = f__26681__auto__.call(null);
(statearr_28678[(6)] = c__26680__auto___28680);

return statearr_28678;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26682__auto__);
}));

} else {
}

return channel;
});
/**
 * Execute the HTTP request corresponding to the given Ring request
 *   map and return a core.async channel.
 */
cljs_http.core.request = (function cljs_http$core$request(p__28683){
var map__28684 = p__28683;
var map__28684__$1 = (((((!((map__28684 == null))))?(((((map__28684.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__28684.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__28684):map__28684);
var request = map__28684__$1;
var request_method = cljs.core.get.call(null,map__28684__$1,new cljs.core.Keyword(null,"request-method","request-method",1764796830));
if(cljs.core._EQ_.call(null,request_method,new cljs.core.Keyword(null,"jsonp","jsonp",226119588))){
return cljs_http.core.jsonp.call(null,request);
} else {
return cljs_http.core.xhr.call(null,request);
}
});

//# sourceMappingURL=core.js.map?rel=1587041651650

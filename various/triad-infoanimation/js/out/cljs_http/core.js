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
return cljs.core.dorun.call(null,cljs.core.map.call(null,(function (p__28261){
var vec__28262 = p__28261;
var k = cljs.core.nth.call(null,vec__28262,(0),null);
var v = cljs.core.nth.call(null,vec__28262,(1),null);
return xhr.headers.set(k,v);
}),formatted_h));
});
/**
 * Takes an XhrIo object and sets response-type if not nil.
 */
cljs_http.core.apply_response_type_BANG_ = (function cljs_http$core$apply_response_type_BANG_(xhr,response_type){
return xhr.setResponseType((function (){var G__28265 = response_type;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"array-buffer","array-buffer",519008380),G__28265)){
return goog.net.XhrIo.ResponseType.ARRAY_BUFFER;
} else {
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"blob","blob",1636965233),G__28265)){
return goog.net.XhrIo.ResponseType.BLOB;
} else {
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"document","document",-1329188687),G__28265)){
return goog.net.XhrIo.ResponseType.DOCUMENT;
} else {
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"text","text",-1790561697),G__28265)){
return goog.net.XhrIo.ResponseType.TEXT;
} else {
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"default","default",-1987822328),G__28265)){
return goog.net.XhrIo.ResponseType.DEFAULT;
} else {
if(cljs.core._EQ_.call(null,null,G__28265)){
return goog.net.XhrIo.ResponseType.DEFAULT;
} else {
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__28265)].join('')));

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
cljs_http.core.build_xhr = (function cljs_http$core$build_xhr(p__28266){
var map__28267 = p__28266;
var map__28267__$1 = (((((!((map__28267 == null))))?(((((map__28267.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__28267.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__28267):map__28267);
var request = map__28267__$1;
var with_credentials_QMARK_ = cljs.core.get.call(null,map__28267__$1,new cljs.core.Keyword(null,"with-credentials?","with-credentials?",-1773202222));
var default_headers = cljs.core.get.call(null,map__28267__$1,new cljs.core.Keyword(null,"default-headers","default-headers",-43146094));
var response_type = cljs.core.get.call(null,map__28267__$1,new cljs.core.Keyword(null,"response-type","response-type",-1493770458));
var timeout = (function (){var or__4185__auto__ = new cljs.core.Keyword(null,"timeout","timeout",-318625318).cljs$core$IFn$_invoke$arity$1(request);
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
return (0);
}
})();
var send_credentials = (((with_credentials_QMARK_ == null))?true:with_credentials_QMARK_);
var G__28269 = (new goog.net.XhrIo());
cljs_http.core.apply_default_headers_BANG_.call(null,G__28269,default_headers);

cljs_http.core.apply_response_type_BANG_.call(null,G__28269,response_type);

G__28269.setTimeoutInterval(timeout);

G__28269.setWithCredentials(send_credentials);

return G__28269;
});
cljs_http.core.error_kw = cljs.core.PersistentHashMap.fromArrays([(0),(7),(1),(4),(6),(3),(2),(9),(5),(8)],[new cljs.core.Keyword(null,"no-error","no-error",1984610064),new cljs.core.Keyword(null,"abort","abort",521193198),new cljs.core.Keyword(null,"access-denied","access-denied",959449406),new cljs.core.Keyword(null,"custom-error","custom-error",-1565161123),new cljs.core.Keyword(null,"http-error","http-error",-1040049553),new cljs.core.Keyword(null,"ff-silent-error","ff-silent-error",189390514),new cljs.core.Keyword(null,"file-not-found","file-not-found",-65398940),new cljs.core.Keyword(null,"offline","offline",-107631935),new cljs.core.Keyword(null,"exception","exception",-335277064),new cljs.core.Keyword(null,"timeout","timeout",-318625318)]);
/**
 * Execute the HTTP request corresponding to the given Ring request
 *   map and return a core.async channel.
 */
cljs_http.core.xhr = (function cljs_http$core$xhr(p__28270){
var map__28271 = p__28270;
var map__28271__$1 = (((((!((map__28271 == null))))?(((((map__28271.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__28271.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__28271):map__28271);
var request = map__28271__$1;
var request_method = cljs.core.get.call(null,map__28271__$1,new cljs.core.Keyword(null,"request-method","request-method",1764796830));
var headers = cljs.core.get.call(null,map__28271__$1,new cljs.core.Keyword(null,"headers","headers",-835030129));
var body = cljs.core.get.call(null,map__28271__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var with_credentials_QMARK_ = cljs.core.get.call(null,map__28271__$1,new cljs.core.Keyword(null,"with-credentials?","with-credentials?",-1773202222));
var cancel = cljs.core.get.call(null,map__28271__$1,new cljs.core.Keyword(null,"cancel","cancel",-1964088360));
var progress = cljs.core.get.call(null,map__28271__$1,new cljs.core.Keyword(null,"progress","progress",244323547));
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
var listener_28295 = (function (direction,evt){
return cljs.core.async.put_BANG_.call(null,progress,cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"direction","direction",-633359395),direction,new cljs.core.Keyword(null,"loaded","loaded",-1246482293),evt.loaded], null),(cljs.core.truth_(evt.lengthComputable)?new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"total","total",1916810418),evt.total], null):null)));
});
var G__28273_28296 = xhr;
G__28273_28296.setProgressEventsEnabled(true);

G__28273_28296.listen(goog.net.EventType.UPLOAD_PROGRESS,cljs.core.partial.call(null,listener_28295,new cljs.core.Keyword(null,"upload","upload",-255769218)));

G__28273_28296.listen(goog.net.EventType.DOWNLOAD_PROGRESS,cljs.core.partial.call(null,listener_28295,new cljs.core.Keyword(null,"download","download",-300081668)));

} else {
}

xhr.send(request_url,method,body,headers__$1);

if(cljs.core.truth_(cancel)){
var c__26319__auto___28297 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26320__auto__ = (function (){var switch__26224__auto__ = (function (state_28284){
var state_val_28285 = (state_28284[(1)]);
if((state_val_28285 === (1))){
var state_28284__$1 = state_28284;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_28284__$1,(2),cancel);
} else {
if((state_val_28285 === (2))){
var inst_28275 = (state_28284[(2)]);
var inst_28276 = xhr.isComplete();
var inst_28277 = cljs.core.not.call(null,inst_28276);
var state_28284__$1 = (function (){var statearr_28286 = state_28284;
(statearr_28286[(7)] = inst_28275);

return statearr_28286;
})();
if(inst_28277){
var statearr_28287_28298 = state_28284__$1;
(statearr_28287_28298[(1)] = (3));

} else {
var statearr_28288_28299 = state_28284__$1;
(statearr_28288_28299[(1)] = (4));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28285 === (3))){
var inst_28279 = xhr.abort();
var state_28284__$1 = state_28284;
var statearr_28289_28300 = state_28284__$1;
(statearr_28289_28300[(2)] = inst_28279);

(statearr_28289_28300[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28285 === (4))){
var state_28284__$1 = state_28284;
var statearr_28290_28301 = state_28284__$1;
(statearr_28290_28301[(2)] = null);

(statearr_28290_28301[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28285 === (5))){
var inst_28282 = (state_28284[(2)]);
var state_28284__$1 = state_28284;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_28284__$1,inst_28282);
} else {
return null;
}
}
}
}
}
});
return (function() {
var cljs_http$core$xhr_$_state_machine__26225__auto__ = null;
var cljs_http$core$xhr_$_state_machine__26225__auto____0 = (function (){
var statearr_28291 = [null,null,null,null,null,null,null,null];
(statearr_28291[(0)] = cljs_http$core$xhr_$_state_machine__26225__auto__);

(statearr_28291[(1)] = (1));

return statearr_28291;
});
var cljs_http$core$xhr_$_state_machine__26225__auto____1 = (function (state_28284){
while(true){
var ret_value__26226__auto__ = (function (){try{while(true){
var result__26227__auto__ = switch__26224__auto__.call(null,state_28284);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26227__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26227__auto__;
}
break;
}
}catch (e28292){if((e28292 instanceof Object)){
var ex__26228__auto__ = e28292;
var statearr_28293_28302 = state_28284;
(statearr_28293_28302[(5)] = ex__26228__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_28284);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e28292;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26226__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__28303 = state_28284;
state_28284 = G__28303;
continue;
} else {
return ret_value__26226__auto__;
}
break;
}
});
cljs_http$core$xhr_$_state_machine__26225__auto__ = function(state_28284){
switch(arguments.length){
case 0:
return cljs_http$core$xhr_$_state_machine__26225__auto____0.call(this);
case 1:
return cljs_http$core$xhr_$_state_machine__26225__auto____1.call(this,state_28284);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs_http$core$xhr_$_state_machine__26225__auto__.cljs$core$IFn$_invoke$arity$0 = cljs_http$core$xhr_$_state_machine__26225__auto____0;
cljs_http$core$xhr_$_state_machine__26225__auto__.cljs$core$IFn$_invoke$arity$1 = cljs_http$core$xhr_$_state_machine__26225__auto____1;
return cljs_http$core$xhr_$_state_machine__26225__auto__;
})()
})();
var state__26321__auto__ = (function (){var statearr_28294 = f__26320__auto__.call(null);
(statearr_28294[(6)] = c__26319__auto___28297);

return statearr_28294;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26321__auto__);
}));

} else {
}

return channel;
});
/**
 * Execute the JSONP request corresponding to the given Ring request
 *   map and return a core.async channel.
 */
cljs_http.core.jsonp = (function cljs_http$core$jsonp(p__28304){
var map__28305 = p__28304;
var map__28305__$1 = (((((!((map__28305 == null))))?(((((map__28305.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__28305.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__28305):map__28305);
var request = map__28305__$1;
var timeout = cljs.core.get.call(null,map__28305__$1,new cljs.core.Keyword(null,"timeout","timeout",-318625318));
var callback_name = cljs.core.get.call(null,map__28305__$1,new cljs.core.Keyword(null,"callback-name","callback-name",336964714));
var cancel = cljs.core.get.call(null,map__28305__$1,new cljs.core.Keyword(null,"cancel","cancel",-1964088360));
var keywordize_keys_QMARK_ = cljs.core.get.call(null,map__28305__$1,new cljs.core.Keyword(null,"keywordize-keys?","keywordize-keys?",-254545987),true);
var channel = cljs.core.async.chan.call(null);
var jsonp = (new goog.net.Jsonp(cljs_http.util.build_url.call(null,request),callback_name));
jsonp.setRequestTimeout(timeout);

var req_28318 = jsonp.send(null,(function cljs_http$core$jsonp_$_success_callback(data){
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
cljs.core.swap_BANG_.call(null,cljs_http.core.pending_requests,cljs.core.assoc,channel,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"jsonp","jsonp",226119588),jsonp,new cljs.core.Keyword(null,"request","request",1772954723),req_28318], null));

if(cljs.core.truth_(cancel)){
var c__26319__auto___28319 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26320__auto__ = (function (){var switch__26224__auto__ = (function (state_28311){
var state_val_28312 = (state_28311[(1)]);
if((state_val_28312 === (1))){
var state_28311__$1 = state_28311;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_28311__$1,(2),cancel);
} else {
if((state_val_28312 === (2))){
var inst_28308 = (state_28311[(2)]);
var inst_28309 = jsonp.cancel(req_28318);
var state_28311__$1 = (function (){var statearr_28313 = state_28311;
(statearr_28313[(7)] = inst_28308);

return statearr_28313;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_28311__$1,inst_28309);
} else {
return null;
}
}
});
return (function() {
var cljs_http$core$jsonp_$_state_machine__26225__auto__ = null;
var cljs_http$core$jsonp_$_state_machine__26225__auto____0 = (function (){
var statearr_28314 = [null,null,null,null,null,null,null,null];
(statearr_28314[(0)] = cljs_http$core$jsonp_$_state_machine__26225__auto__);

(statearr_28314[(1)] = (1));

return statearr_28314;
});
var cljs_http$core$jsonp_$_state_machine__26225__auto____1 = (function (state_28311){
while(true){
var ret_value__26226__auto__ = (function (){try{while(true){
var result__26227__auto__ = switch__26224__auto__.call(null,state_28311);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26227__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26227__auto__;
}
break;
}
}catch (e28315){if((e28315 instanceof Object)){
var ex__26228__auto__ = e28315;
var statearr_28316_28320 = state_28311;
(statearr_28316_28320[(5)] = ex__26228__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_28311);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e28315;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26226__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__28321 = state_28311;
state_28311 = G__28321;
continue;
} else {
return ret_value__26226__auto__;
}
break;
}
});
cljs_http$core$jsonp_$_state_machine__26225__auto__ = function(state_28311){
switch(arguments.length){
case 0:
return cljs_http$core$jsonp_$_state_machine__26225__auto____0.call(this);
case 1:
return cljs_http$core$jsonp_$_state_machine__26225__auto____1.call(this,state_28311);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs_http$core$jsonp_$_state_machine__26225__auto__.cljs$core$IFn$_invoke$arity$0 = cljs_http$core$jsonp_$_state_machine__26225__auto____0;
cljs_http$core$jsonp_$_state_machine__26225__auto__.cljs$core$IFn$_invoke$arity$1 = cljs_http$core$jsonp_$_state_machine__26225__auto____1;
return cljs_http$core$jsonp_$_state_machine__26225__auto__;
})()
})();
var state__26321__auto__ = (function (){var statearr_28317 = f__26320__auto__.call(null);
(statearr_28317[(6)] = c__26319__auto___28319);

return statearr_28317;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26321__auto__);
}));

} else {
}

return channel;
});
/**
 * Execute the HTTP request corresponding to the given Ring request
 *   map and return a core.async channel.
 */
cljs_http.core.request = (function cljs_http$core$request(p__28322){
var map__28323 = p__28322;
var map__28323__$1 = (((((!((map__28323 == null))))?(((((map__28323.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__28323.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__28323):map__28323);
var request = map__28323__$1;
var request_method = cljs.core.get.call(null,map__28323__$1,new cljs.core.Keyword(null,"request-method","request-method",1764796830));
if(cljs.core._EQ_.call(null,request_method,new cljs.core.Keyword(null,"jsonp","jsonp",226119588))){
return cljs_http.core.jsonp.call(null,request);
} else {
return cljs_http.core.xhr.call(null,request);
}
});

//# sourceMappingURL=core.js.map

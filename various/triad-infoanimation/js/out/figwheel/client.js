// Compiled by ClojureScript 1.10.597 {}
goog.provide('figwheel.client');
goog.require('cljs.core');
goog.require('goog.Uri');
goog.require('goog.userAgent.product');
goog.require('goog.object');
goog.require('cljs.reader');
goog.require('cljs.core.async');
goog.require('figwheel.client.socket');
goog.require('figwheel.client.utils');
goog.require('figwheel.client.heads_up');
goog.require('figwheel.client.file_reloading');
goog.require('clojure.string');
goog.require('cljs.repl');
figwheel.client._figwheel_version_ = "0.5.19";
figwheel.client.js_stringify = (((((typeof JSON !== 'undefined')) && ((!((JSON.stringify == null))))))?(function (x){
return ["#js ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(JSON.stringify(x,null," "))].join('');
}):(function (x){
try{return cljs.core.str.cljs$core$IFn$_invoke$arity$1(x);
}catch (e31795){if((e31795 instanceof Error)){
var e = e31795;
return "Error: Unable to stringify";
} else {
throw e31795;

}
}}));
figwheel.client.figwheel_repl_print = (function figwheel$client$figwheel_repl_print(var_args){
var G__31798 = arguments.length;
switch (G__31798) {
case 2:
return figwheel.client.figwheel_repl_print.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return figwheel.client.figwheel_repl_print.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(figwheel.client.figwheel_repl_print.cljs$core$IFn$_invoke$arity$2 = (function (stream,args){
figwheel.client.socket.send_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"figwheel-event","figwheel-event",519570592),"callback",new cljs.core.Keyword(null,"callback-name","callback-name",336964714),"figwheel-repl-print",new cljs.core.Keyword(null,"content","content",15833224),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"stream","stream",1534941648),stream,new cljs.core.Keyword(null,"args","args",1315556576),cljs.core.mapv.call(null,(function (p1__31796_SHARP_){
if(typeof p1__31796_SHARP_ === 'string'){
return p1__31796_SHARP_;
} else {
return figwheel.client.js_stringify.call(null,p1__31796_SHARP_);
}
}),args)], null)], null));

return null;
}));

(figwheel.client.figwheel_repl_print.cljs$core$IFn$_invoke$arity$1 = (function (args){
return figwheel.client.figwheel_repl_print.call(null,new cljs.core.Keyword(null,"out","out",-910545517),args);
}));

(figwheel.client.figwheel_repl_print.cljs$lang$maxFixedArity = 2);

figwheel.client.console_out_print = (function figwheel$client$console_out_print(args){
return console.log.apply(console,cljs.core.into_array.call(null,args));
});
figwheel.client.console_err_print = (function figwheel$client$console_err_print(args){
return console.error.apply(console,cljs.core.into_array.call(null,args));
});
figwheel.client.repl_out_print_fn = (function figwheel$client$repl_out_print_fn(var_args){
var args__4795__auto__ = [];
var len__4789__auto___31801 = arguments.length;
var i__4790__auto___31802 = (0);
while(true){
if((i__4790__auto___31802 < len__4789__auto___31801)){
args__4795__auto__.push((arguments[i__4790__auto___31802]));

var G__31803 = (i__4790__auto___31802 + (1));
i__4790__auto___31802 = G__31803;
continue;
} else {
}
break;
}

var argseq__4796__auto__ = ((((0) < args__4795__auto__.length))?(new cljs.core.IndexedSeq(args__4795__auto__.slice((0)),(0),null)):null);
return figwheel.client.repl_out_print_fn.cljs$core$IFn$_invoke$arity$variadic(argseq__4796__auto__);
});

(figwheel.client.repl_out_print_fn.cljs$core$IFn$_invoke$arity$variadic = (function (args){
figwheel.client.console_out_print.call(null,args);

figwheel.client.figwheel_repl_print.call(null,new cljs.core.Keyword(null,"out","out",-910545517),args);

return null;
}));

(figwheel.client.repl_out_print_fn.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(figwheel.client.repl_out_print_fn.cljs$lang$applyTo = (function (seq31800){
var self__4777__auto__ = this;
return self__4777__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq31800));
}));

figwheel.client.repl_err_print_fn = (function figwheel$client$repl_err_print_fn(var_args){
var args__4795__auto__ = [];
var len__4789__auto___31805 = arguments.length;
var i__4790__auto___31806 = (0);
while(true){
if((i__4790__auto___31806 < len__4789__auto___31805)){
args__4795__auto__.push((arguments[i__4790__auto___31806]));

var G__31807 = (i__4790__auto___31806 + (1));
i__4790__auto___31806 = G__31807;
continue;
} else {
}
break;
}

var argseq__4796__auto__ = ((((0) < args__4795__auto__.length))?(new cljs.core.IndexedSeq(args__4795__auto__.slice((0)),(0),null)):null);
return figwheel.client.repl_err_print_fn.cljs$core$IFn$_invoke$arity$variadic(argseq__4796__auto__);
});

(figwheel.client.repl_err_print_fn.cljs$core$IFn$_invoke$arity$variadic = (function (args){
figwheel.client.console_err_print.call(null,args);

figwheel.client.figwheel_repl_print.call(null,new cljs.core.Keyword(null,"err","err",-2089457205),args);

return null;
}));

(figwheel.client.repl_err_print_fn.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(figwheel.client.repl_err_print_fn.cljs$lang$applyTo = (function (seq31804){
var self__4777__auto__ = this;
return self__4777__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq31804));
}));

figwheel.client.enable_repl_print_BANG_ = (function figwheel$client$enable_repl_print_BANG_(){
(cljs.core._STAR_print_newline_STAR_ = false);

cljs.core.set_print_fn_BANG_.call(null,figwheel.client.repl_out_print_fn);

cljs.core.set_print_err_fn_BANG_.call(null,figwheel.client.repl_err_print_fn);

return null;
});
figwheel.client.autoload_QMARK_ = (function figwheel$client$autoload_QMARK_(){
return figwheel.client.utils.persistent_config_get.call(null,new cljs.core.Keyword(null,"figwheel-autoload","figwheel-autoload",-2044741728),true);
});
figwheel.client.toggle_autoload = (function figwheel$client$toggle_autoload(){
var res = figwheel.client.utils.persistent_config_set_BANG_.call(null,new cljs.core.Keyword(null,"figwheel-autoload","figwheel-autoload",-2044741728),cljs.core.not.call(null,figwheel.client.autoload_QMARK_.call(null)));
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),"Toggle autoload deprecated! Use (figwheel.client/set-autoload! false)");

figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),["Figwheel autoloading ",(cljs.core.truth_(figwheel.client.autoload_QMARK_.call(null))?"ON":"OFF")].join(''));

return res;
});
goog.exportSymbol('figwheel.client.toggle_autoload', figwheel.client.toggle_autoload);
/**
 * Figwheel by default loads code changes as you work. Sometimes you
 *   just want to work on your code without the ramifications of
 *   autoloading and simply load your code piecemeal in the REPL. You can
 *   turn autoloading on and of with this method.
 * 
 *   (figwheel.client/set-autoload false)
 * 
 *   NOTE: This is a persistent setting, meaning that it will persist
 *   through browser reloads.
 */
figwheel.client.set_autoload = (function figwheel$client$set_autoload(b){
if(((b === true) || (b === false))){
} else {
throw (new Error("Assert failed: (or (true? b) (false? b))"));
}

return figwheel.client.utils.persistent_config_set_BANG_.call(null,new cljs.core.Keyword(null,"figwheel-autoload","figwheel-autoload",-2044741728),b);
});
goog.exportSymbol('figwheel.client.set_autoload', figwheel.client.set_autoload);
figwheel.client.repl_pprint = (function figwheel$client$repl_pprint(){
return figwheel.client.utils.persistent_config_get.call(null,new cljs.core.Keyword(null,"figwheel-repl-pprint","figwheel-repl-pprint",1076150873),true);
});
goog.exportSymbol('figwheel.client.repl_pprint', figwheel.client.repl_pprint);
/**
 * This method gives you the ability to turn the pretty printing of
 *   the REPL's return value on and off.
 * 
 *   (figwheel.client/set-repl-pprint false)
 * 
 *   NOTE: This is a persistent setting, meaning that it will persist
 *   through browser reloads.
 */
figwheel.client.set_repl_pprint = (function figwheel$client$set_repl_pprint(b){
if(((b === true) || (b === false))){
} else {
throw (new Error("Assert failed: (or (true? b) (false? b))"));
}

return figwheel.client.utils.persistent_config_set_BANG_.call(null,new cljs.core.Keyword(null,"figwheel-repl-pprint","figwheel-repl-pprint",1076150873),b);
});
goog.exportSymbol('figwheel.client.set_repl_pprint', figwheel.client.set_repl_pprint);
figwheel.client.repl_result_pr_str = (function figwheel$client$repl_result_pr_str(v){
if(cljs.core.truth_(figwheel.client.repl_pprint.call(null))){
return figwheel.client.utils.pprint_to_string.call(null,v);
} else {
return cljs.core.pr_str.call(null,v);
}
});
goog.exportSymbol('figwheel.client.repl_result_pr_str', figwheel.client.repl_result_pr_str);
figwheel.client.get_essential_messages = (function figwheel$client$get_essential_messages(ed){
if(cljs.core.truth_(ed)){
return cljs.core.cons.call(null,cljs.core.select_keys.call(null,ed,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"message","message",-406056002),new cljs.core.Keyword(null,"class","class",-2030961996)], null)),figwheel.client.get_essential_messages.call(null,new cljs.core.Keyword(null,"cause","cause",231901252).cljs$core$IFn$_invoke$arity$1(ed)));
} else {
return null;
}
});
figwheel.client.error_msg_format = (function figwheel$client$error_msg_format(p__31808){
var map__31809 = p__31808;
var map__31809__$1 = (((((!((map__31809 == null))))?(((((map__31809.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__31809.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__31809):map__31809);
var message = cljs.core.get.call(null,map__31809__$1,new cljs.core.Keyword(null,"message","message",-406056002));
var class$ = cljs.core.get.call(null,map__31809__$1,new cljs.core.Keyword(null,"class","class",-2030961996));
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(class$)," : ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(message)].join('');
});
figwheel.client.format_messages = cljs.core.comp.call(null,cljs.core.partial.call(null,cljs.core.map,figwheel.client.error_msg_format),figwheel.client.get_essential_messages);
figwheel.client.focus_msgs = (function figwheel$client$focus_msgs(name_set,msg_hist){
return cljs.core.cons.call(null,cljs.core.first.call(null,msg_hist),cljs.core.filter.call(null,cljs.core.comp.call(null,name_set,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863)),cljs.core.rest.call(null,msg_hist)));
});
figwheel.client.reload_file_QMARK__STAR_ = (function figwheel$client$reload_file_QMARK__STAR_(msg_name,opts){
var or__4185__auto__ = new cljs.core.Keyword(null,"load-warninged-code","load-warninged-code",-2030345223).cljs$core$IFn$_invoke$arity$1(opts);
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
return cljs.core.not_EQ_.call(null,msg_name,new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356));
}
});
figwheel.client.reload_file_state_QMARK_ = (function figwheel$client$reload_file_state_QMARK_(msg_names,opts){
if(cljs.core._EQ_.call(null,cljs.core.first.call(null,msg_names),new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563))){
return figwheel.client.reload_file_QMARK__STAR_.call(null,cljs.core.second.call(null,msg_names),opts);
} else {
return false;
}
});
figwheel.client.block_reload_file_state_QMARK_ = (function figwheel$client$block_reload_file_state_QMARK_(msg_names,opts){
return ((cljs.core._EQ_.call(null,cljs.core.first.call(null,msg_names),new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563))) && (cljs.core.not.call(null,figwheel.client.reload_file_QMARK__STAR_.call(null,cljs.core.second.call(null,msg_names),opts))));
});
figwheel.client.warning_append_state_QMARK_ = (function figwheel$client$warning_append_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356)], null),cljs.core.take.call(null,(2),msg_names));
});
figwheel.client.warning_state_QMARK_ = (function figwheel$client$warning_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),cljs.core.first.call(null,msg_names));
});
figwheel.client.rewarning_state_QMARK_ = (function figwheel$client$rewarning_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563),new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356)], null),cljs.core.take.call(null,(3),msg_names));
});
figwheel.client.compile_fail_state_QMARK_ = (function figwheel$client$compile_fail_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289),cljs.core.first.call(null,msg_names));
});
figwheel.client.compile_refail_state_QMARK_ = (function figwheel$client$compile_refail_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289),new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289)], null),cljs.core.take.call(null,(2),msg_names));
});
figwheel.client.css_loaded_state_QMARK_ = (function figwheel$client$css_loaded_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"css-files-changed","css-files-changed",720773874),cljs.core.first.call(null,msg_names));
});
figwheel.client.file_reloader_plugin = (function figwheel$client$file_reloader_plugin(opts){
var ch = cljs.core.async.chan.call(null);
var c__26681__auto___31888 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26682__auto__ = (function (){var switch__26586__auto__ = (function (state_31860){
var state_val_31861 = (state_31860[(1)]);
if((state_val_31861 === (7))){
var inst_31856 = (state_31860[(2)]);
var state_31860__$1 = state_31860;
var statearr_31862_31889 = state_31860__$1;
(statearr_31862_31889[(2)] = inst_31856);

(statearr_31862_31889[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31861 === (1))){
var state_31860__$1 = state_31860;
var statearr_31863_31890 = state_31860__$1;
(statearr_31863_31890[(2)] = null);

(statearr_31863_31890[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31861 === (4))){
var inst_31813 = (state_31860[(7)]);
var inst_31813__$1 = (state_31860[(2)]);
var state_31860__$1 = (function (){var statearr_31864 = state_31860;
(statearr_31864[(7)] = inst_31813__$1);

return statearr_31864;
})();
if(cljs.core.truth_(inst_31813__$1)){
var statearr_31865_31891 = state_31860__$1;
(statearr_31865_31891[(1)] = (5));

} else {
var statearr_31866_31892 = state_31860__$1;
(statearr_31866_31892[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31861 === (15))){
var inst_31820 = (state_31860[(8)]);
var inst_31835 = new cljs.core.Keyword(null,"files","files",-472457450).cljs$core$IFn$_invoke$arity$1(inst_31820);
var inst_31836 = cljs.core.first.call(null,inst_31835);
var inst_31837 = new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(inst_31836);
var inst_31838 = ["Figwheel: Not loading code with warnings - ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(inst_31837)].join('');
var inst_31839 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"warn","warn",-436710552),inst_31838);
var state_31860__$1 = state_31860;
var statearr_31867_31893 = state_31860__$1;
(statearr_31867_31893[(2)] = inst_31839);

(statearr_31867_31893[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31861 === (13))){
var inst_31844 = (state_31860[(2)]);
var state_31860__$1 = state_31860;
var statearr_31868_31894 = state_31860__$1;
(statearr_31868_31894[(2)] = inst_31844);

(statearr_31868_31894[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31861 === (6))){
var state_31860__$1 = state_31860;
var statearr_31869_31895 = state_31860__$1;
(statearr_31869_31895[(2)] = null);

(statearr_31869_31895[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31861 === (17))){
var inst_31842 = (state_31860[(2)]);
var state_31860__$1 = state_31860;
var statearr_31870_31896 = state_31860__$1;
(statearr_31870_31896[(2)] = inst_31842);

(statearr_31870_31896[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31861 === (3))){
var inst_31858 = (state_31860[(2)]);
var state_31860__$1 = state_31860;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_31860__$1,inst_31858);
} else {
if((state_val_31861 === (12))){
var inst_31819 = (state_31860[(9)]);
var inst_31833 = figwheel.client.block_reload_file_state_QMARK_.call(null,inst_31819,opts);
var state_31860__$1 = state_31860;
if(inst_31833){
var statearr_31871_31897 = state_31860__$1;
(statearr_31871_31897[(1)] = (15));

} else {
var statearr_31872_31898 = state_31860__$1;
(statearr_31872_31898[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31861 === (2))){
var state_31860__$1 = state_31860;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_31860__$1,(4),ch);
} else {
if((state_val_31861 === (11))){
var inst_31820 = (state_31860[(8)]);
var inst_31825 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_31826 = figwheel.client.file_reloading.reload_js_files.call(null,opts,inst_31820);
var inst_31827 = cljs.core.async.timeout.call(null,(1000));
var inst_31828 = [inst_31826,inst_31827];
var inst_31829 = (new cljs.core.PersistentVector(null,2,(5),inst_31825,inst_31828,null));
var state_31860__$1 = state_31860;
return cljs.core.async.ioc_alts_BANG_.call(null,state_31860__$1,(14),inst_31829);
} else {
if((state_val_31861 === (9))){
var inst_31820 = (state_31860[(8)]);
var inst_31846 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"warn","warn",-436710552),"Figwheel: code autoloading is OFF");
var inst_31847 = new cljs.core.Keyword(null,"files","files",-472457450).cljs$core$IFn$_invoke$arity$1(inst_31820);
var inst_31848 = cljs.core.map.call(null,new cljs.core.Keyword(null,"file","file",-1269645878),inst_31847);
var inst_31849 = ["Not loading: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(inst_31848)].join('');
var inst_31850 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),inst_31849);
var state_31860__$1 = (function (){var statearr_31873 = state_31860;
(statearr_31873[(10)] = inst_31846);

return statearr_31873;
})();
var statearr_31874_31899 = state_31860__$1;
(statearr_31874_31899[(2)] = inst_31850);

(statearr_31874_31899[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31861 === (5))){
var inst_31813 = (state_31860[(7)]);
var inst_31815 = [new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),null,new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563),null];
var inst_31816 = (new cljs.core.PersistentArrayMap(null,2,inst_31815,null));
var inst_31817 = (new cljs.core.PersistentHashSet(null,inst_31816,null));
var inst_31818 = figwheel.client.focus_msgs.call(null,inst_31817,inst_31813);
var inst_31819 = cljs.core.map.call(null,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863),inst_31818);
var inst_31820 = cljs.core.first.call(null,inst_31818);
var inst_31821 = figwheel.client.autoload_QMARK_.call(null);
var state_31860__$1 = (function (){var statearr_31875 = state_31860;
(statearr_31875[(8)] = inst_31820);

(statearr_31875[(9)] = inst_31819);

return statearr_31875;
})();
if(cljs.core.truth_(inst_31821)){
var statearr_31876_31900 = state_31860__$1;
(statearr_31876_31900[(1)] = (8));

} else {
var statearr_31877_31901 = state_31860__$1;
(statearr_31877_31901[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31861 === (14))){
var inst_31831 = (state_31860[(2)]);
var state_31860__$1 = state_31860;
var statearr_31878_31902 = state_31860__$1;
(statearr_31878_31902[(2)] = inst_31831);

(statearr_31878_31902[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31861 === (16))){
var state_31860__$1 = state_31860;
var statearr_31879_31903 = state_31860__$1;
(statearr_31879_31903[(2)] = null);

(statearr_31879_31903[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31861 === (10))){
var inst_31852 = (state_31860[(2)]);
var state_31860__$1 = (function (){var statearr_31880 = state_31860;
(statearr_31880[(11)] = inst_31852);

return statearr_31880;
})();
var statearr_31881_31904 = state_31860__$1;
(statearr_31881_31904[(2)] = null);

(statearr_31881_31904[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31861 === (8))){
var inst_31819 = (state_31860[(9)]);
var inst_31823 = figwheel.client.reload_file_state_QMARK_.call(null,inst_31819,opts);
var state_31860__$1 = state_31860;
if(cljs.core.truth_(inst_31823)){
var statearr_31882_31905 = state_31860__$1;
(statearr_31882_31905[(1)] = (11));

} else {
var statearr_31883_31906 = state_31860__$1;
(statearr_31883_31906[(1)] = (12));

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
});
return (function() {
var figwheel$client$file_reloader_plugin_$_state_machine__26587__auto__ = null;
var figwheel$client$file_reloader_plugin_$_state_machine__26587__auto____0 = (function (){
var statearr_31884 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_31884[(0)] = figwheel$client$file_reloader_plugin_$_state_machine__26587__auto__);

(statearr_31884[(1)] = (1));

return statearr_31884;
});
var figwheel$client$file_reloader_plugin_$_state_machine__26587__auto____1 = (function (state_31860){
while(true){
var ret_value__26588__auto__ = (function (){try{while(true){
var result__26589__auto__ = switch__26586__auto__.call(null,state_31860);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26589__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26589__auto__;
}
break;
}
}catch (e31885){if((e31885 instanceof Object)){
var ex__26590__auto__ = e31885;
var statearr_31886_31907 = state_31860;
(statearr_31886_31907[(5)] = ex__26590__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_31860);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e31885;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26588__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__31908 = state_31860;
state_31860 = G__31908;
continue;
} else {
return ret_value__26588__auto__;
}
break;
}
});
figwheel$client$file_reloader_plugin_$_state_machine__26587__auto__ = function(state_31860){
switch(arguments.length){
case 0:
return figwheel$client$file_reloader_plugin_$_state_machine__26587__auto____0.call(this);
case 1:
return figwheel$client$file_reloader_plugin_$_state_machine__26587__auto____1.call(this,state_31860);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloader_plugin_$_state_machine__26587__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloader_plugin_$_state_machine__26587__auto____0;
figwheel$client$file_reloader_plugin_$_state_machine__26587__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloader_plugin_$_state_machine__26587__auto____1;
return figwheel$client$file_reloader_plugin_$_state_machine__26587__auto__;
})()
})();
var state__26683__auto__ = (function (){var statearr_31887 = f__26682__auto__.call(null);
(statearr_31887[(6)] = c__26681__auto___31888);

return statearr_31887;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26683__auto__);
}));


return (function (msg_hist){
cljs.core.async.put_BANG_.call(null,ch,msg_hist);

return msg_hist;
});
});
figwheel.client.truncate_stack_trace = (function figwheel$client$truncate_stack_trace(stack_str){
return cljs.core.take_while.call(null,(function (p1__31909_SHARP_){
return cljs.core.not.call(null,cljs.core.re_matches.call(null,/.*eval_javascript_STAR__STAR_.*/,p1__31909_SHARP_));
}),clojure.string.split_lines.call(null,stack_str));
});
figwheel.client.get_ua_product = (function figwheel$client$get_ua_product(){
if(figwheel.client.utils.node_env_QMARK_.call(null)){
return new cljs.core.Keyword(null,"chrome","chrome",1718738387);
} else {
if(goog.userAgent.product.SAFARI){
return new cljs.core.Keyword(null,"safari","safari",497115653);
} else {
if(goog.userAgent.product.CHROME){
return new cljs.core.Keyword(null,"chrome","chrome",1718738387);
} else {
if(goog.userAgent.product.FIREFOX){
return new cljs.core.Keyword(null,"firefox","firefox",1283768880);
} else {
if(goog.userAgent.product.IE){
return new cljs.core.Keyword(null,"ie","ie",2038473780);
} else {
return null;
}
}
}
}
}
});
var base_path_31915 = figwheel.client.utils.base_url_path.call(null);
figwheel.client.eval_javascript_STAR__STAR_ = (function figwheel$client$eval_javascript_STAR__STAR_(code,opts,result_handler){
try{var sb = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__31911 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__31912 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__31913 = true;
var _STAR_print_fn_STAR__temp_val__31914 = (function (x){
return sb.append(x);
});
(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__31913);

(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__31914);

try{var result_value = figwheel.client.utils.eval_helper.call(null,code,opts);
var result_value__$1 = (((!(typeof result_value === 'string')))?cljs.core.pr_str.call(null,result_value):result_value);
return result_handler.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"status","status",-1997798413),new cljs.core.Keyword(null,"success","success",1890645906),new cljs.core.Keyword(null,"out","out",-910545517),cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb),new cljs.core.Keyword(null,"ua-product","ua-product",938384227),figwheel.client.get_ua_product.call(null),new cljs.core.Keyword(null,"value","value",305978217),result_value__$1], null));
}finally {(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__31912);

(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__31911);
}}catch (e31910){if((e31910 instanceof Error)){
var e = e31910;
return result_handler.call(null,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"status","status",-1997798413),new cljs.core.Keyword(null,"exception","exception",-335277064),new cljs.core.Keyword(null,"value","value",305978217),cljs.core.pr_str.call(null,e),new cljs.core.Keyword(null,"ua-product","ua-product",938384227),figwheel.client.get_ua_product.call(null),new cljs.core.Keyword(null,"stacktrace","stacktrace",-95588394),clojure.string.join.call(null,"\n",figwheel.client.truncate_stack_trace.call(null,e.stack)),new cljs.core.Keyword(null,"base-path","base-path",495760020),base_path_31915], null));
} else {
var e = e31910;
return result_handler.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"status","status",-1997798413),new cljs.core.Keyword(null,"exception","exception",-335277064),new cljs.core.Keyword(null,"ua-product","ua-product",938384227),figwheel.client.get_ua_product.call(null),new cljs.core.Keyword(null,"value","value",305978217),cljs.core.pr_str.call(null,e),new cljs.core.Keyword(null,"stacktrace","stacktrace",-95588394),"No stacktrace available."], null));

}
}});
/**
 * The REPL can disconnect and reconnect lets ensure cljs.user exists at least.
 */
figwheel.client.ensure_cljs_user = (function figwheel$client$ensure_cljs_user(){
if(cljs.core.truth_(cljs.user)){
return null;
} else {
return (cljs.user = ({}));
}
});
figwheel.client.repl_plugin = (function figwheel$client$repl_plugin(p__31916){
var map__31917 = p__31916;
var map__31917__$1 = (((((!((map__31917 == null))))?(((((map__31917.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__31917.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__31917):map__31917);
var opts = map__31917__$1;
var build_id = cljs.core.get.call(null,map__31917__$1,new cljs.core.Keyword(null,"build-id","build-id",1642831089));
return (function (p__31919){
var vec__31920 = p__31919;
var seq__31921 = cljs.core.seq.call(null,vec__31920);
var first__31922 = cljs.core.first.call(null,seq__31921);
var seq__31921__$1 = cljs.core.next.call(null,seq__31921);
var map__31923 = first__31922;
var map__31923__$1 = (((((!((map__31923 == null))))?(((((map__31923.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__31923.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__31923):map__31923);
var msg = map__31923__$1;
var msg_name = cljs.core.get.call(null,map__31923__$1,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863));
var _ = seq__31921__$1;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"repl-eval","repl-eval",-1784727398),msg_name)){
figwheel.client.ensure_cljs_user.call(null);

return figwheel.client.eval_javascript_STAR__STAR_.call(null,new cljs.core.Keyword(null,"code","code",1586293142).cljs$core$IFn$_invoke$arity$1(msg),opts,(function (res){
return figwheel.client.socket.send_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"figwheel-event","figwheel-event",519570592),"callback",new cljs.core.Keyword(null,"callback-name","callback-name",336964714),new cljs.core.Keyword(null,"callback-name","callback-name",336964714).cljs$core$IFn$_invoke$arity$1(msg),new cljs.core.Keyword(null,"content","content",15833224),res], null));
}));
} else {
return null;
}
});
});
figwheel.client.css_reloader_plugin = (function figwheel$client$css_reloader_plugin(opts){
return (function (p__31925){
var vec__31926 = p__31925;
var seq__31927 = cljs.core.seq.call(null,vec__31926);
var first__31928 = cljs.core.first.call(null,seq__31927);
var seq__31927__$1 = cljs.core.next.call(null,seq__31927);
var map__31929 = first__31928;
var map__31929__$1 = (((((!((map__31929 == null))))?(((((map__31929.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__31929.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__31929):map__31929);
var msg = map__31929__$1;
var msg_name = cljs.core.get.call(null,map__31929__$1,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863));
var _ = seq__31927__$1;
if(cljs.core._EQ_.call(null,msg_name,new cljs.core.Keyword(null,"css-files-changed","css-files-changed",720773874))){
return figwheel.client.file_reloading.reload_css_files.call(null,opts,msg);
} else {
return null;
}
});
});
figwheel.client.compile_fail_warning_plugin = (function figwheel$client$compile_fail_warning_plugin(p__31931){
var map__31932 = p__31931;
var map__31932__$1 = (((((!((map__31932 == null))))?(((((map__31932.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__31932.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__31932):map__31932);
var on_compile_warning = cljs.core.get.call(null,map__31932__$1,new cljs.core.Keyword(null,"on-compile-warning","on-compile-warning",-1195585947));
var on_compile_fail = cljs.core.get.call(null,map__31932__$1,new cljs.core.Keyword(null,"on-compile-fail","on-compile-fail",728013036));
return (function (p__31934){
var vec__31935 = p__31934;
var seq__31936 = cljs.core.seq.call(null,vec__31935);
var first__31937 = cljs.core.first.call(null,seq__31936);
var seq__31936__$1 = cljs.core.next.call(null,seq__31936);
var map__31938 = first__31937;
var map__31938__$1 = (((((!((map__31938 == null))))?(((((map__31938.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__31938.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__31938):map__31938);
var msg = map__31938__$1;
var msg_name = cljs.core.get.call(null,map__31938__$1,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863));
var _ = seq__31936__$1;
var pred__31940 = cljs.core._EQ_;
var expr__31941 = msg_name;
if(cljs.core.truth_(pred__31940.call(null,new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),expr__31941))){
return on_compile_warning.call(null,msg);
} else {
if(cljs.core.truth_(pred__31940.call(null,new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289),expr__31941))){
return on_compile_fail.call(null,msg);
} else {
return null;
}
}
});
});
figwheel.client.auto_jump_to_error = (function figwheel$client$auto_jump_to_error(opts,error){
if(cljs.core.truth_(new cljs.core.Keyword(null,"auto-jump-to-source-on-error","auto-jump-to-source-on-error",-960314920).cljs$core$IFn$_invoke$arity$1(opts))){
return figwheel.client.heads_up.auto_notify_source_file_line.call(null,error);
} else {
return null;
}
});
figwheel.client.heads_up_plugin_msg_handler = (function figwheel$client$heads_up_plugin_msg_handler(opts,msg_hist_SINGLEQUOTE_){
var msg_hist = figwheel.client.focus_msgs.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289),null,new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),null,new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563),null], null), null),msg_hist_SINGLEQUOTE_);
var msg_names = cljs.core.map.call(null,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863),msg_hist);
var msg = cljs.core.first.call(null,msg_hist);
var c__26681__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26682__auto__ = (function (){var switch__26586__auto__ = (function (state_32030){
var state_val_32031 = (state_32030[(1)]);
if((state_val_32031 === (7))){
var inst_31950 = (state_32030[(2)]);
var state_32030__$1 = state_32030;
if(cljs.core.truth_(inst_31950)){
var statearr_32032_32079 = state_32030__$1;
(statearr_32032_32079[(1)] = (8));

} else {
var statearr_32033_32080 = state_32030__$1;
(statearr_32033_32080[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32031 === (20))){
var inst_32024 = (state_32030[(2)]);
var state_32030__$1 = state_32030;
var statearr_32034_32081 = state_32030__$1;
(statearr_32034_32081[(2)] = inst_32024);

(statearr_32034_32081[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32031 === (27))){
var inst_32020 = (state_32030[(2)]);
var state_32030__$1 = state_32030;
var statearr_32035_32082 = state_32030__$1;
(statearr_32035_32082[(2)] = inst_32020);

(statearr_32035_32082[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32031 === (1))){
var inst_31943 = figwheel.client.reload_file_state_QMARK_.call(null,msg_names,opts);
var state_32030__$1 = state_32030;
if(cljs.core.truth_(inst_31943)){
var statearr_32036_32083 = state_32030__$1;
(statearr_32036_32083[(1)] = (2));

} else {
var statearr_32037_32084 = state_32030__$1;
(statearr_32037_32084[(1)] = (3));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32031 === (24))){
var inst_32022 = (state_32030[(2)]);
var state_32030__$1 = state_32030;
var statearr_32038_32085 = state_32030__$1;
(statearr_32038_32085[(2)] = inst_32022);

(statearr_32038_32085[(1)] = (20));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32031 === (4))){
var inst_32028 = (state_32030[(2)]);
var state_32030__$1 = state_32030;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_32030__$1,inst_32028);
} else {
if((state_val_32031 === (15))){
var inst_32026 = (state_32030[(2)]);
var state_32030__$1 = state_32030;
var statearr_32039_32086 = state_32030__$1;
(statearr_32039_32086[(2)] = inst_32026);

(statearr_32039_32086[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32031 === (21))){
var inst_31979 = (state_32030[(2)]);
var inst_31980 = new cljs.core.Keyword(null,"exception-data","exception-data",-512474886).cljs$core$IFn$_invoke$arity$1(msg);
var inst_31981 = figwheel.client.auto_jump_to_error.call(null,opts,inst_31980);
var state_32030__$1 = (function (){var statearr_32040 = state_32030;
(statearr_32040[(7)] = inst_31979);

return statearr_32040;
})();
var statearr_32041_32087 = state_32030__$1;
(statearr_32041_32087[(2)] = inst_31981);

(statearr_32041_32087[(1)] = (20));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32031 === (31))){
var inst_32009 = figwheel.client.css_loaded_state_QMARK_.call(null,msg_names);
var state_32030__$1 = state_32030;
if(inst_32009){
var statearr_32042_32088 = state_32030__$1;
(statearr_32042_32088[(1)] = (34));

} else {
var statearr_32043_32089 = state_32030__$1;
(statearr_32043_32089[(1)] = (35));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32031 === (32))){
var inst_32018 = (state_32030[(2)]);
var state_32030__$1 = state_32030;
var statearr_32044_32090 = state_32030__$1;
(statearr_32044_32090[(2)] = inst_32018);

(statearr_32044_32090[(1)] = (27));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32031 === (33))){
var inst_32005 = (state_32030[(2)]);
var inst_32006 = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(msg);
var inst_32007 = figwheel.client.auto_jump_to_error.call(null,opts,inst_32006);
var state_32030__$1 = (function (){var statearr_32045 = state_32030;
(statearr_32045[(8)] = inst_32005);

return statearr_32045;
})();
var statearr_32046_32091 = state_32030__$1;
(statearr_32046_32091[(2)] = inst_32007);

(statearr_32046_32091[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32031 === (13))){
var inst_31964 = figwheel.client.heads_up.clear.call(null);
var state_32030__$1 = state_32030;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_32030__$1,(16),inst_31964);
} else {
if((state_val_32031 === (22))){
var inst_31985 = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(msg);
var inst_31986 = figwheel.client.heads_up.append_warning_message.call(null,inst_31985);
var state_32030__$1 = state_32030;
var statearr_32047_32092 = state_32030__$1;
(statearr_32047_32092[(2)] = inst_31986);

(statearr_32047_32092[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32031 === (36))){
var inst_32016 = (state_32030[(2)]);
var state_32030__$1 = state_32030;
var statearr_32048_32093 = state_32030__$1;
(statearr_32048_32093[(2)] = inst_32016);

(statearr_32048_32093[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32031 === (29))){
var inst_31996 = (state_32030[(2)]);
var inst_31997 = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(msg);
var inst_31998 = figwheel.client.auto_jump_to_error.call(null,opts,inst_31997);
var state_32030__$1 = (function (){var statearr_32049 = state_32030;
(statearr_32049[(9)] = inst_31996);

return statearr_32049;
})();
var statearr_32050_32094 = state_32030__$1;
(statearr_32050_32094[(2)] = inst_31998);

(statearr_32050_32094[(1)] = (27));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32031 === (6))){
var inst_31945 = (state_32030[(10)]);
var state_32030__$1 = state_32030;
var statearr_32051_32095 = state_32030__$1;
(statearr_32051_32095[(2)] = inst_31945);

(statearr_32051_32095[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32031 === (28))){
var inst_31992 = (state_32030[(2)]);
var inst_31993 = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(msg);
var inst_31994 = figwheel.client.heads_up.display_warning.call(null,inst_31993);
var state_32030__$1 = (function (){var statearr_32052 = state_32030;
(statearr_32052[(11)] = inst_31992);

return statearr_32052;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_32030__$1,(29),inst_31994);
} else {
if((state_val_32031 === (25))){
var inst_31990 = figwheel.client.heads_up.clear.call(null);
var state_32030__$1 = state_32030;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_32030__$1,(28),inst_31990);
} else {
if((state_val_32031 === (34))){
var inst_32011 = figwheel.client.heads_up.flash_loaded.call(null);
var state_32030__$1 = state_32030;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_32030__$1,(37),inst_32011);
} else {
if((state_val_32031 === (17))){
var inst_31970 = (state_32030[(2)]);
var inst_31971 = new cljs.core.Keyword(null,"exception-data","exception-data",-512474886).cljs$core$IFn$_invoke$arity$1(msg);
var inst_31972 = figwheel.client.auto_jump_to_error.call(null,opts,inst_31971);
var state_32030__$1 = (function (){var statearr_32053 = state_32030;
(statearr_32053[(12)] = inst_31970);

return statearr_32053;
})();
var statearr_32054_32096 = state_32030__$1;
(statearr_32054_32096[(2)] = inst_31972);

(statearr_32054_32096[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32031 === (3))){
var inst_31962 = figwheel.client.compile_refail_state_QMARK_.call(null,msg_names);
var state_32030__$1 = state_32030;
if(inst_31962){
var statearr_32055_32097 = state_32030__$1;
(statearr_32055_32097[(1)] = (13));

} else {
var statearr_32056_32098 = state_32030__$1;
(statearr_32056_32098[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32031 === (12))){
var inst_31958 = (state_32030[(2)]);
var state_32030__$1 = state_32030;
var statearr_32057_32099 = state_32030__$1;
(statearr_32057_32099[(2)] = inst_31958);

(statearr_32057_32099[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32031 === (2))){
var inst_31945 = (state_32030[(10)]);
var inst_31945__$1 = figwheel.client.autoload_QMARK_.call(null);
var state_32030__$1 = (function (){var statearr_32058 = state_32030;
(statearr_32058[(10)] = inst_31945__$1);

return statearr_32058;
})();
if(cljs.core.truth_(inst_31945__$1)){
var statearr_32059_32100 = state_32030__$1;
(statearr_32059_32100[(1)] = (5));

} else {
var statearr_32060_32101 = state_32030__$1;
(statearr_32060_32101[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32031 === (23))){
var inst_31988 = figwheel.client.rewarning_state_QMARK_.call(null,msg_names);
var state_32030__$1 = state_32030;
if(inst_31988){
var statearr_32061_32102 = state_32030__$1;
(statearr_32061_32102[(1)] = (25));

} else {
var statearr_32062_32103 = state_32030__$1;
(statearr_32062_32103[(1)] = (26));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32031 === (35))){
var state_32030__$1 = state_32030;
var statearr_32063_32104 = state_32030__$1;
(statearr_32063_32104[(2)] = null);

(statearr_32063_32104[(1)] = (36));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32031 === (19))){
var inst_31983 = figwheel.client.warning_append_state_QMARK_.call(null,msg_names);
var state_32030__$1 = state_32030;
if(inst_31983){
var statearr_32064_32105 = state_32030__$1;
(statearr_32064_32105[(1)] = (22));

} else {
var statearr_32065_32106 = state_32030__$1;
(statearr_32065_32106[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32031 === (11))){
var inst_31954 = (state_32030[(2)]);
var state_32030__$1 = state_32030;
var statearr_32066_32107 = state_32030__$1;
(statearr_32066_32107[(2)] = inst_31954);

(statearr_32066_32107[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32031 === (9))){
var inst_31956 = figwheel.client.heads_up.clear.call(null);
var state_32030__$1 = state_32030;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_32030__$1,(12),inst_31956);
} else {
if((state_val_32031 === (5))){
var inst_31947 = new cljs.core.Keyword(null,"autoload","autoload",-354122500).cljs$core$IFn$_invoke$arity$1(opts);
var state_32030__$1 = state_32030;
var statearr_32067_32108 = state_32030__$1;
(statearr_32067_32108[(2)] = inst_31947);

(statearr_32067_32108[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32031 === (14))){
var inst_31974 = figwheel.client.compile_fail_state_QMARK_.call(null,msg_names);
var state_32030__$1 = state_32030;
if(inst_31974){
var statearr_32068_32109 = state_32030__$1;
(statearr_32068_32109[(1)] = (18));

} else {
var statearr_32069_32110 = state_32030__$1;
(statearr_32069_32110[(1)] = (19));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32031 === (26))){
var inst_32000 = figwheel.client.warning_state_QMARK_.call(null,msg_names);
var state_32030__$1 = state_32030;
if(inst_32000){
var statearr_32070_32111 = state_32030__$1;
(statearr_32070_32111[(1)] = (30));

} else {
var statearr_32071_32112 = state_32030__$1;
(statearr_32071_32112[(1)] = (31));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32031 === (16))){
var inst_31966 = (state_32030[(2)]);
var inst_31967 = new cljs.core.Keyword(null,"exception-data","exception-data",-512474886).cljs$core$IFn$_invoke$arity$1(msg);
var inst_31968 = figwheel.client.heads_up.display_exception.call(null,inst_31967);
var state_32030__$1 = (function (){var statearr_32072 = state_32030;
(statearr_32072[(13)] = inst_31966);

return statearr_32072;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_32030__$1,(17),inst_31968);
} else {
if((state_val_32031 === (30))){
var inst_32002 = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(msg);
var inst_32003 = figwheel.client.heads_up.display_warning.call(null,inst_32002);
var state_32030__$1 = state_32030;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_32030__$1,(33),inst_32003);
} else {
if((state_val_32031 === (10))){
var inst_31960 = (state_32030[(2)]);
var state_32030__$1 = state_32030;
var statearr_32073_32113 = state_32030__$1;
(statearr_32073_32113[(2)] = inst_31960);

(statearr_32073_32113[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32031 === (18))){
var inst_31976 = new cljs.core.Keyword(null,"exception-data","exception-data",-512474886).cljs$core$IFn$_invoke$arity$1(msg);
var inst_31977 = figwheel.client.heads_up.display_exception.call(null,inst_31976);
var state_32030__$1 = state_32030;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_32030__$1,(21),inst_31977);
} else {
if((state_val_32031 === (37))){
var inst_32013 = (state_32030[(2)]);
var state_32030__$1 = state_32030;
var statearr_32074_32114 = state_32030__$1;
(statearr_32074_32114[(2)] = inst_32013);

(statearr_32074_32114[(1)] = (36));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32031 === (8))){
var inst_31952 = figwheel.client.heads_up.flash_loaded.call(null);
var state_32030__$1 = state_32030;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_32030__$1,(11),inst_31952);
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
});
return (function() {
var figwheel$client$heads_up_plugin_msg_handler_$_state_machine__26587__auto__ = null;
var figwheel$client$heads_up_plugin_msg_handler_$_state_machine__26587__auto____0 = (function (){
var statearr_32075 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_32075[(0)] = figwheel$client$heads_up_plugin_msg_handler_$_state_machine__26587__auto__);

(statearr_32075[(1)] = (1));

return statearr_32075;
});
var figwheel$client$heads_up_plugin_msg_handler_$_state_machine__26587__auto____1 = (function (state_32030){
while(true){
var ret_value__26588__auto__ = (function (){try{while(true){
var result__26589__auto__ = switch__26586__auto__.call(null,state_32030);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26589__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26589__auto__;
}
break;
}
}catch (e32076){if((e32076 instanceof Object)){
var ex__26590__auto__ = e32076;
var statearr_32077_32115 = state_32030;
(statearr_32077_32115[(5)] = ex__26590__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_32030);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e32076;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26588__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__32116 = state_32030;
state_32030 = G__32116;
continue;
} else {
return ret_value__26588__auto__;
}
break;
}
});
figwheel$client$heads_up_plugin_msg_handler_$_state_machine__26587__auto__ = function(state_32030){
switch(arguments.length){
case 0:
return figwheel$client$heads_up_plugin_msg_handler_$_state_machine__26587__auto____0.call(this);
case 1:
return figwheel$client$heads_up_plugin_msg_handler_$_state_machine__26587__auto____1.call(this,state_32030);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$heads_up_plugin_msg_handler_$_state_machine__26587__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$heads_up_plugin_msg_handler_$_state_machine__26587__auto____0;
figwheel$client$heads_up_plugin_msg_handler_$_state_machine__26587__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$heads_up_plugin_msg_handler_$_state_machine__26587__auto____1;
return figwheel$client$heads_up_plugin_msg_handler_$_state_machine__26587__auto__;
})()
})();
var state__26683__auto__ = (function (){var statearr_32078 = f__26682__auto__.call(null);
(statearr_32078[(6)] = c__26681__auto__);

return statearr_32078;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26683__auto__);
}));

return c__26681__auto__;
});
figwheel.client.heads_up_plugin = (function figwheel$client$heads_up_plugin(opts){
var ch = cljs.core.async.chan.call(null);
figwheel.client.heads_up_config_options_STAR__STAR_ = opts;

var c__26681__auto___32145 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26682__auto__ = (function (){var switch__26586__auto__ = (function (state_32131){
var state_val_32132 = (state_32131[(1)]);
if((state_val_32132 === (1))){
var state_32131__$1 = state_32131;
var statearr_32133_32146 = state_32131__$1;
(statearr_32133_32146[(2)] = null);

(statearr_32133_32146[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32132 === (2))){
var state_32131__$1 = state_32131;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_32131__$1,(4),ch);
} else {
if((state_val_32132 === (3))){
var inst_32129 = (state_32131[(2)]);
var state_32131__$1 = state_32131;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_32131__$1,inst_32129);
} else {
if((state_val_32132 === (4))){
var inst_32119 = (state_32131[(7)]);
var inst_32119__$1 = (state_32131[(2)]);
var state_32131__$1 = (function (){var statearr_32134 = state_32131;
(statearr_32134[(7)] = inst_32119__$1);

return statearr_32134;
})();
if(cljs.core.truth_(inst_32119__$1)){
var statearr_32135_32147 = state_32131__$1;
(statearr_32135_32147[(1)] = (5));

} else {
var statearr_32136_32148 = state_32131__$1;
(statearr_32136_32148[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32132 === (5))){
var inst_32119 = (state_32131[(7)]);
var inst_32121 = figwheel.client.heads_up_plugin_msg_handler.call(null,opts,inst_32119);
var state_32131__$1 = state_32131;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_32131__$1,(8),inst_32121);
} else {
if((state_val_32132 === (6))){
var state_32131__$1 = state_32131;
var statearr_32137_32149 = state_32131__$1;
(statearr_32137_32149[(2)] = null);

(statearr_32137_32149[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32132 === (7))){
var inst_32127 = (state_32131[(2)]);
var state_32131__$1 = state_32131;
var statearr_32138_32150 = state_32131__$1;
(statearr_32138_32150[(2)] = inst_32127);

(statearr_32138_32150[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32132 === (8))){
var inst_32123 = (state_32131[(2)]);
var state_32131__$1 = (function (){var statearr_32139 = state_32131;
(statearr_32139[(8)] = inst_32123);

return statearr_32139;
})();
var statearr_32140_32151 = state_32131__$1;
(statearr_32140_32151[(2)] = null);

(statearr_32140_32151[(1)] = (2));


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
});
return (function() {
var figwheel$client$heads_up_plugin_$_state_machine__26587__auto__ = null;
var figwheel$client$heads_up_plugin_$_state_machine__26587__auto____0 = (function (){
var statearr_32141 = [null,null,null,null,null,null,null,null,null];
(statearr_32141[(0)] = figwheel$client$heads_up_plugin_$_state_machine__26587__auto__);

(statearr_32141[(1)] = (1));

return statearr_32141;
});
var figwheel$client$heads_up_plugin_$_state_machine__26587__auto____1 = (function (state_32131){
while(true){
var ret_value__26588__auto__ = (function (){try{while(true){
var result__26589__auto__ = switch__26586__auto__.call(null,state_32131);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26589__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26589__auto__;
}
break;
}
}catch (e32142){if((e32142 instanceof Object)){
var ex__26590__auto__ = e32142;
var statearr_32143_32152 = state_32131;
(statearr_32143_32152[(5)] = ex__26590__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_32131);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e32142;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26588__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__32153 = state_32131;
state_32131 = G__32153;
continue;
} else {
return ret_value__26588__auto__;
}
break;
}
});
figwheel$client$heads_up_plugin_$_state_machine__26587__auto__ = function(state_32131){
switch(arguments.length){
case 0:
return figwheel$client$heads_up_plugin_$_state_machine__26587__auto____0.call(this);
case 1:
return figwheel$client$heads_up_plugin_$_state_machine__26587__auto____1.call(this,state_32131);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$heads_up_plugin_$_state_machine__26587__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$heads_up_plugin_$_state_machine__26587__auto____0;
figwheel$client$heads_up_plugin_$_state_machine__26587__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$heads_up_plugin_$_state_machine__26587__auto____1;
return figwheel$client$heads_up_plugin_$_state_machine__26587__auto__;
})()
})();
var state__26683__auto__ = (function (){var statearr_32144 = f__26682__auto__.call(null);
(statearr_32144[(6)] = c__26681__auto___32145);

return statearr_32144;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26683__auto__);
}));


figwheel.client.heads_up.ensure_container.call(null);

return (function (msg_hist){
cljs.core.async.put_BANG_.call(null,ch,msg_hist);

return msg_hist;
});
});
figwheel.client.enforce_project_plugin = (function figwheel$client$enforce_project_plugin(opts){
return (function (msg_hist){
if(((1) < cljs.core.count.call(null,cljs.core.set.call(null,cljs.core.keep.call(null,new cljs.core.Keyword(null,"project-id","project-id",206449307),cljs.core.take.call(null,(5),msg_hist)))))){
figwheel.client.socket.close_BANG_.call(null);

console.error("Figwheel: message received from different project. Shutting socket down.");

if(cljs.core.truth_(new cljs.core.Keyword(null,"heads-up-display","heads-up-display",-896577202).cljs$core$IFn$_invoke$arity$1(opts))){
var c__26681__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26682__auto__ = (function (){var switch__26586__auto__ = (function (state_32159){
var state_val_32160 = (state_32159[(1)]);
if((state_val_32160 === (1))){
var inst_32154 = cljs.core.async.timeout.call(null,(3000));
var state_32159__$1 = state_32159;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_32159__$1,(2),inst_32154);
} else {
if((state_val_32160 === (2))){
var inst_32156 = (state_32159[(2)]);
var inst_32157 = figwheel.client.heads_up.display_system_warning.call(null,"Connection from different project","Shutting connection down!!!!!");
var state_32159__$1 = (function (){var statearr_32161 = state_32159;
(statearr_32161[(7)] = inst_32156);

return statearr_32161;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_32159__$1,inst_32157);
} else {
return null;
}
}
});
return (function() {
var figwheel$client$enforce_project_plugin_$_state_machine__26587__auto__ = null;
var figwheel$client$enforce_project_plugin_$_state_machine__26587__auto____0 = (function (){
var statearr_32162 = [null,null,null,null,null,null,null,null];
(statearr_32162[(0)] = figwheel$client$enforce_project_plugin_$_state_machine__26587__auto__);

(statearr_32162[(1)] = (1));

return statearr_32162;
});
var figwheel$client$enforce_project_plugin_$_state_machine__26587__auto____1 = (function (state_32159){
while(true){
var ret_value__26588__auto__ = (function (){try{while(true){
var result__26589__auto__ = switch__26586__auto__.call(null,state_32159);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26589__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26589__auto__;
}
break;
}
}catch (e32163){if((e32163 instanceof Object)){
var ex__26590__auto__ = e32163;
var statearr_32164_32166 = state_32159;
(statearr_32164_32166[(5)] = ex__26590__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_32159);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e32163;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26588__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__32167 = state_32159;
state_32159 = G__32167;
continue;
} else {
return ret_value__26588__auto__;
}
break;
}
});
figwheel$client$enforce_project_plugin_$_state_machine__26587__auto__ = function(state_32159){
switch(arguments.length){
case 0:
return figwheel$client$enforce_project_plugin_$_state_machine__26587__auto____0.call(this);
case 1:
return figwheel$client$enforce_project_plugin_$_state_machine__26587__auto____1.call(this,state_32159);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$enforce_project_plugin_$_state_machine__26587__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$enforce_project_plugin_$_state_machine__26587__auto____0;
figwheel$client$enforce_project_plugin_$_state_machine__26587__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$enforce_project_plugin_$_state_machine__26587__auto____1;
return figwheel$client$enforce_project_plugin_$_state_machine__26587__auto__;
})()
})();
var state__26683__auto__ = (function (){var statearr_32165 = f__26682__auto__.call(null);
(statearr_32165[(6)] = c__26681__auto__);

return statearr_32165;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26683__auto__);
}));

return c__26681__auto__;
} else {
return null;
}
} else {
return null;
}
});
});
figwheel.client.enforce_figwheel_version_plugin = (function figwheel$client$enforce_figwheel_version_plugin(opts){
return (function (msg_hist){
var temp__5735__auto__ = new cljs.core.Keyword(null,"figwheel-version","figwheel-version",1409553832).cljs$core$IFn$_invoke$arity$1(cljs.core.first.call(null,msg_hist));
if(cljs.core.truth_(temp__5735__auto__)){
var figwheel_version = temp__5735__auto__;
if(cljs.core.not_EQ_.call(null,figwheel_version,figwheel.client._figwheel_version_)){
figwheel.client.socket.close_BANG_.call(null);

console.error("Figwheel: message received from different version of Figwheel.");

if(cljs.core.truth_(new cljs.core.Keyword(null,"heads-up-display","heads-up-display",-896577202).cljs$core$IFn$_invoke$arity$1(opts))){
var c__26681__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26682__auto__ = (function (){var switch__26586__auto__ = (function (state_32174){
var state_val_32175 = (state_32174[(1)]);
if((state_val_32175 === (1))){
var inst_32168 = cljs.core.async.timeout.call(null,(2000));
var state_32174__$1 = state_32174;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_32174__$1,(2),inst_32168);
} else {
if((state_val_32175 === (2))){
var inst_32170 = (state_32174[(2)]);
var inst_32171 = ["Figwheel Client Version <strong>",figwheel.client._figwheel_version_,"</strong> is not equal to ","Figwheel Sidecar Version <strong>",cljs.core.str.cljs$core$IFn$_invoke$arity$1(figwheel_version),"</strong>",".  Shutting down Websocket Connection!","<h4>To fix try:</h4>","<ol><li>Reload this page and make sure you are not getting a cached version of the client.</li>","<li>You may have to clean (delete compiled assets) and rebuild to make sure that the new client code is being used.</li>","<li>Also, make sure you have consistent Figwheel dependencies.</li></ol>"].join('');
var inst_32172 = figwheel.client.heads_up.display_system_warning.call(null,"Figwheel Client and Server have different versions!!",inst_32171);
var state_32174__$1 = (function (){var statearr_32176 = state_32174;
(statearr_32176[(7)] = inst_32170);

return statearr_32176;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_32174__$1,inst_32172);
} else {
return null;
}
}
});
return (function() {
var figwheel$client$enforce_figwheel_version_plugin_$_state_machine__26587__auto__ = null;
var figwheel$client$enforce_figwheel_version_plugin_$_state_machine__26587__auto____0 = (function (){
var statearr_32177 = [null,null,null,null,null,null,null,null];
(statearr_32177[(0)] = figwheel$client$enforce_figwheel_version_plugin_$_state_machine__26587__auto__);

(statearr_32177[(1)] = (1));

return statearr_32177;
});
var figwheel$client$enforce_figwheel_version_plugin_$_state_machine__26587__auto____1 = (function (state_32174){
while(true){
var ret_value__26588__auto__ = (function (){try{while(true){
var result__26589__auto__ = switch__26586__auto__.call(null,state_32174);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26589__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26589__auto__;
}
break;
}
}catch (e32178){if((e32178 instanceof Object)){
var ex__26590__auto__ = e32178;
var statearr_32179_32181 = state_32174;
(statearr_32179_32181[(5)] = ex__26590__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_32174);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e32178;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26588__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__32182 = state_32174;
state_32174 = G__32182;
continue;
} else {
return ret_value__26588__auto__;
}
break;
}
});
figwheel$client$enforce_figwheel_version_plugin_$_state_machine__26587__auto__ = function(state_32174){
switch(arguments.length){
case 0:
return figwheel$client$enforce_figwheel_version_plugin_$_state_machine__26587__auto____0.call(this);
case 1:
return figwheel$client$enforce_figwheel_version_plugin_$_state_machine__26587__auto____1.call(this,state_32174);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$enforce_figwheel_version_plugin_$_state_machine__26587__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$enforce_figwheel_version_plugin_$_state_machine__26587__auto____0;
figwheel$client$enforce_figwheel_version_plugin_$_state_machine__26587__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$enforce_figwheel_version_plugin_$_state_machine__26587__auto____1;
return figwheel$client$enforce_figwheel_version_plugin_$_state_machine__26587__auto__;
})()
})();
var state__26683__auto__ = (function (){var statearr_32180 = f__26682__auto__.call(null);
(statearr_32180[(6)] = c__26681__auto__);

return statearr_32180;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26683__auto__);
}));

return c__26681__auto__;
} else {
return null;
}
} else {
return null;
}
} else {
return null;
}
});
});
figwheel.client.default_on_jsload = cljs.core.identity;
figwheel.client.file_line_column = (function figwheel$client$file_line_column(p__32183){
var map__32184 = p__32183;
var map__32184__$1 = (((((!((map__32184 == null))))?(((((map__32184.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__32184.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__32184):map__32184);
var file = cljs.core.get.call(null,map__32184__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
var line = cljs.core.get.call(null,map__32184__$1,new cljs.core.Keyword(null,"line","line",212345235));
var column = cljs.core.get.call(null,map__32184__$1,new cljs.core.Keyword(null,"column","column",2078222095));
var G__32186 = "";
var G__32186__$1 = (cljs.core.truth_(file)?[G__32186,"file ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(file)].join(''):G__32186);
var G__32186__$2 = (cljs.core.truth_(line)?[G__32186__$1," at line ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(line)].join(''):G__32186__$1);
if(cljs.core.truth_((function (){var and__4174__auto__ = line;
if(cljs.core.truth_(and__4174__auto__)){
return column;
} else {
return and__4174__auto__;
}
})())){
return [G__32186__$2,", column ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(column)].join('');
} else {
return G__32186__$2;
}
});
figwheel.client.default_on_compile_fail = (function figwheel$client$default_on_compile_fail(p__32187){
var map__32188 = p__32187;
var map__32188__$1 = (((((!((map__32188 == null))))?(((((map__32188.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__32188.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__32188):map__32188);
var ed = map__32188__$1;
var exception_data = cljs.core.get.call(null,map__32188__$1,new cljs.core.Keyword(null,"exception-data","exception-data",-512474886));
var cause = cljs.core.get.call(null,map__32188__$1,new cljs.core.Keyword(null,"cause","cause",231901252));
var message_32191 = (function (){var G__32190 = cljs.core.apply.call(null,cljs.core.str,"Figwheel: Compile Exception ",figwheel.client.format_messages.call(null,exception_data));
if(cljs.core.truth_(new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(exception_data))){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__32190)," Error on ",figwheel.client.file_line_column.call(null,exception_data)].join('');
} else {
return G__32190;
}
})();
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"warn","warn",-436710552),message_32191);

return ed;
});
figwheel.client.default_on_compile_warning = (function figwheel$client$default_on_compile_warning(p__32192){
var map__32193 = p__32192;
var map__32193__$1 = (((((!((map__32193 == null))))?(((((map__32193.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__32193.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__32193):map__32193);
var w = map__32193__$1;
var message = cljs.core.get.call(null,map__32193__$1,new cljs.core.Keyword(null,"message","message",-406056002));
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"warn","warn",-436710552),["Figwheel: Compile Warning - ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(message))," in ",figwheel.client.file_line_column.call(null,message)].join(''));

return w;
});
figwheel.client.default_before_load = (function figwheel$client$default_before_load(files){
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: notified of file changes");

return files;
});
figwheel.client.default_on_cssload = (function figwheel$client$default_on_cssload(files){
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: loaded CSS files");

figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),cljs.core.pr_str.call(null,cljs.core.map.call(null,new cljs.core.Keyword(null,"file","file",-1269645878),files)));

return files;
});
if((typeof figwheel !== 'undefined') && (typeof figwheel.client !== 'undefined') && (typeof figwheel.client.config_defaults !== 'undefined')){
} else {
figwheel.client.config_defaults = cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"on-compile-warning","on-compile-warning",-1195585947),new cljs.core.Keyword(null,"on-jsload","on-jsload",-395756602),new cljs.core.Keyword(null,"reload-dependents","reload-dependents",-956865430),new cljs.core.Keyword(null,"on-compile-fail","on-compile-fail",728013036),new cljs.core.Keyword(null,"debug","debug",-1608172596),new cljs.core.Keyword(null,"heads-up-display","heads-up-display",-896577202),new cljs.core.Keyword(null,"websocket-url","websocket-url",-490444938),new cljs.core.Keyword(null,"auto-jump-to-source-on-error","auto-jump-to-source-on-error",-960314920),new cljs.core.Keyword(null,"before-jsload","before-jsload",-847513128),new cljs.core.Keyword(null,"load-warninged-code","load-warninged-code",-2030345223),new cljs.core.Keyword(null,"eval-fn","eval-fn",-1111644294),new cljs.core.Keyword(null,"retry-count","retry-count",1936122875),new cljs.core.Keyword(null,"autoload","autoload",-354122500),new cljs.core.Keyword(null,"on-cssload","on-cssload",1825432318)],[new cljs.core.Var(function(){return figwheel.client.default_on_compile_warning;},new cljs.core.Symbol("figwheel.client","default-on-compile-warning","figwheel.client/default-on-compile-warning",584144208,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[new cljs.core.Symbol(null,"figwheel.client","figwheel.client",-538710252,null),new cljs.core.Symbol(null,"default-on-compile-warning","default-on-compile-warning",-18911586,null),"public/js/out/figwheel/client.cljs",33,1,362,362,cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"keys","keys",1068423698),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"message","message",1234475525,null)], null),new cljs.core.Keyword(null,"as","as",1148689641),new cljs.core.Symbol(null,"w","w",1994700528,null)], null)], null)),null,(cljs.core.truth_(figwheel.client.default_on_compile_warning)?figwheel.client.default_on_compile_warning.cljs$lang$test:null)])),figwheel.client.default_on_jsload,true,new cljs.core.Var(function(){return figwheel.client.default_on_compile_fail;},new cljs.core.Symbol("figwheel.client","default-on-compile-fail","figwheel.client/default-on-compile-fail",1384826337,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[new cljs.core.Symbol(null,"figwheel.client","figwheel.client",-538710252,null),new cljs.core.Symbol(null,"default-on-compile-fail","default-on-compile-fail",-158814813,null),"public/js/out/figwheel/client.cljs",30,1,355,355,cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"keys","keys",1068423698),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"exception-data","exception-data",1128056641,null),new cljs.core.Symbol(null,"cause","cause",1872432779,null)], null),new cljs.core.Keyword(null,"as","as",1148689641),new cljs.core.Symbol(null,"ed","ed",2076825751,null)], null)], null)),null,(cljs.core.truth_(figwheel.client.default_on_compile_fail)?figwheel.client.default_on_compile_fail.cljs$lang$test:null)])),false,true,["ws://",cljs.core.str.cljs$core$IFn$_invoke$arity$1(((figwheel.client.utils.html_env_QMARK_.call(null))?location.host:"localhost:3449")),"/figwheel-ws"].join(''),false,figwheel.client.default_before_load,false,false,(100),true,figwheel.client.default_on_cssload]);
}
figwheel.client.handle_deprecated_jsload_callback = (function figwheel$client$handle_deprecated_jsload_callback(config){
if(cljs.core.truth_(new cljs.core.Keyword(null,"jsload-callback","jsload-callback",-1949628369).cljs$core$IFn$_invoke$arity$1(config))){
return cljs.core.dissoc.call(null,cljs.core.assoc.call(null,config,new cljs.core.Keyword(null,"on-jsload","on-jsload",-395756602),new cljs.core.Keyword(null,"jsload-callback","jsload-callback",-1949628369).cljs$core$IFn$_invoke$arity$1(config)),new cljs.core.Keyword(null,"jsload-callback","jsload-callback",-1949628369));
} else {
return config;
}
});
figwheel.client.fill_url_template = (function figwheel$client$fill_url_template(config){
if(figwheel.client.utils.html_env_QMARK_.call(null)){
return cljs.core.update_in.call(null,config,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"websocket-url","websocket-url",-490444938)], null),(function (x){
return clojure.string.replace.call(null,clojure.string.replace.call(null,x,"[[client-hostname]]",location.hostname),"[[client-port]]",location.port);
}));
} else {
return config;
}
});
figwheel.client.base_plugins = (function figwheel$client$base_plugins(system_options){
var base = new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"enforce-project-plugin","enforce-project-plugin",959402899),figwheel.client.enforce_project_plugin,new cljs.core.Keyword(null,"enforce-figwheel-version-plugin","enforce-figwheel-version-plugin",-1916185220),figwheel.client.enforce_figwheel_version_plugin,new cljs.core.Keyword(null,"file-reloader-plugin","file-reloader-plugin",-1792964733),figwheel.client.file_reloader_plugin,new cljs.core.Keyword(null,"comp-fail-warning-plugin","comp-fail-warning-plugin",634311),figwheel.client.compile_fail_warning_plugin,new cljs.core.Keyword(null,"css-reloader-plugin","css-reloader-plugin",2002032904),figwheel.client.css_reloader_plugin,new cljs.core.Keyword(null,"repl-plugin","repl-plugin",-1138952371),figwheel.client.repl_plugin], null);
var base__$1 = (((!(figwheel.client.utils.html_env_QMARK_.call(null))))?cljs.core.select_keys.call(null,base,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"file-reloader-plugin","file-reloader-plugin",-1792964733),new cljs.core.Keyword(null,"comp-fail-warning-plugin","comp-fail-warning-plugin",634311),new cljs.core.Keyword(null,"repl-plugin","repl-plugin",-1138952371)], null)):base);
var base__$2 = ((new cljs.core.Keyword(null,"autoload","autoload",-354122500).cljs$core$IFn$_invoke$arity$1(system_options) === false)?cljs.core.dissoc.call(null,base__$1,new cljs.core.Keyword(null,"file-reloader-plugin","file-reloader-plugin",-1792964733)):base__$1);
if(cljs.core.truth_((function (){var and__4174__auto__ = new cljs.core.Keyword(null,"heads-up-display","heads-up-display",-896577202).cljs$core$IFn$_invoke$arity$1(system_options);
if(cljs.core.truth_(and__4174__auto__)){
return figwheel.client.utils.html_env_QMARK_.call(null);
} else {
return and__4174__auto__;
}
})())){
return cljs.core.assoc.call(null,base__$2,new cljs.core.Keyword(null,"heads-up-display-plugin","heads-up-display-plugin",1745207501),figwheel.client.heads_up_plugin);
} else {
return base__$2;
}
});
figwheel.client.add_message_watch = (function figwheel$client$add_message_watch(key,callback){
return cljs.core.add_watch.call(null,figwheel.client.socket.message_history_atom,key,(function (_,___$1,___$2,msg_hist){
return callback.call(null,cljs.core.first.call(null,msg_hist));
}));
});
figwheel.client.add_json_message_watch = (function figwheel$client$add_json_message_watch(key,callback){
return figwheel.client.add_message_watch.call(null,key,cljs.core.comp.call(null,callback,cljs.core.clj__GT_js));
});
goog.exportSymbol('figwheel.client.add_json_message_watch', figwheel.client.add_json_message_watch);
figwheel.client.add_plugins = (function figwheel$client$add_plugins(plugins,system_options){
var seq__32195 = cljs.core.seq.call(null,plugins);
var chunk__32196 = null;
var count__32197 = (0);
var i__32198 = (0);
while(true){
if((i__32198 < count__32197)){
var vec__32205 = cljs.core._nth.call(null,chunk__32196,i__32198);
var k = cljs.core.nth.call(null,vec__32205,(0),null);
var plugin = cljs.core.nth.call(null,vec__32205,(1),null);
if(cljs.core.truth_(plugin)){
var pl_32211 = plugin.call(null,system_options);
cljs.core.add_watch.call(null,figwheel.client.socket.message_history_atom,k,((function (seq__32195,chunk__32196,count__32197,i__32198,pl_32211,vec__32205,k,plugin){
return (function (_,___$1,___$2,msg_hist){
return pl_32211.call(null,msg_hist);
});})(seq__32195,chunk__32196,count__32197,i__32198,pl_32211,vec__32205,k,plugin))
);
} else {
}


var G__32212 = seq__32195;
var G__32213 = chunk__32196;
var G__32214 = count__32197;
var G__32215 = (i__32198 + (1));
seq__32195 = G__32212;
chunk__32196 = G__32213;
count__32197 = G__32214;
i__32198 = G__32215;
continue;
} else {
var temp__5735__auto__ = cljs.core.seq.call(null,seq__32195);
if(temp__5735__auto__){
var seq__32195__$1 = temp__5735__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__32195__$1)){
var c__4609__auto__ = cljs.core.chunk_first.call(null,seq__32195__$1);
var G__32216 = cljs.core.chunk_rest.call(null,seq__32195__$1);
var G__32217 = c__4609__auto__;
var G__32218 = cljs.core.count.call(null,c__4609__auto__);
var G__32219 = (0);
seq__32195 = G__32216;
chunk__32196 = G__32217;
count__32197 = G__32218;
i__32198 = G__32219;
continue;
} else {
var vec__32208 = cljs.core.first.call(null,seq__32195__$1);
var k = cljs.core.nth.call(null,vec__32208,(0),null);
var plugin = cljs.core.nth.call(null,vec__32208,(1),null);
if(cljs.core.truth_(plugin)){
var pl_32220 = plugin.call(null,system_options);
cljs.core.add_watch.call(null,figwheel.client.socket.message_history_atom,k,((function (seq__32195,chunk__32196,count__32197,i__32198,pl_32220,vec__32208,k,plugin,seq__32195__$1,temp__5735__auto__){
return (function (_,___$1,___$2,msg_hist){
return pl_32220.call(null,msg_hist);
});})(seq__32195,chunk__32196,count__32197,i__32198,pl_32220,vec__32208,k,plugin,seq__32195__$1,temp__5735__auto__))
);
} else {
}


var G__32221 = cljs.core.next.call(null,seq__32195__$1);
var G__32222 = null;
var G__32223 = (0);
var G__32224 = (0);
seq__32195 = G__32221;
chunk__32196 = G__32222;
count__32197 = G__32223;
i__32198 = G__32224;
continue;
}
} else {
return null;
}
}
break;
}
});
figwheel.client.start = (function figwheel$client$start(var_args){
var G__32226 = arguments.length;
switch (G__32226) {
case 1:
return figwheel.client.start.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 0:
return figwheel.client.start.cljs$core$IFn$_invoke$arity$0();

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(figwheel.client.start.cljs$core$IFn$_invoke$arity$1 = (function (opts){
if((goog.dependencies_ == null)){
return null;
} else {
if((typeof figwheel !== 'undefined') && (typeof figwheel.client !== 'undefined') && (typeof figwheel.client.__figwheel_start_once__ !== 'undefined')){
return null;
} else {
return (
figwheel.client.__figwheel_start_once__ = setTimeout((function (){
var plugins_SINGLEQUOTE_ = new cljs.core.Keyword(null,"plugins","plugins",1900073717).cljs$core$IFn$_invoke$arity$1(opts);
var merge_plugins = new cljs.core.Keyword(null,"merge-plugins","merge-plugins",-1193912370).cljs$core$IFn$_invoke$arity$1(opts);
var system_options = figwheel.client.fill_url_template.call(null,figwheel.client.handle_deprecated_jsload_callback.call(null,cljs.core.merge.call(null,figwheel.client.config_defaults,cljs.core.dissoc.call(null,opts,new cljs.core.Keyword(null,"plugins","plugins",1900073717),new cljs.core.Keyword(null,"merge-plugins","merge-plugins",-1193912370)))));
var plugins = (cljs.core.truth_(plugins_SINGLEQUOTE_)?plugins_SINGLEQUOTE_:cljs.core.merge.call(null,figwheel.client.base_plugins.call(null,system_options),merge_plugins));
(figwheel.client.utils._STAR_print_debug_STAR_ = new cljs.core.Keyword(null,"debug","debug",-1608172596).cljs$core$IFn$_invoke$arity$1(opts));

figwheel.client.enable_repl_print_BANG_.call(null);

figwheel.client.add_plugins.call(null,plugins,system_options);

figwheel.client.file_reloading.patch_goog_base.call(null);

var seq__32227_32232 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"initial-messages","initial-messages",2057377771).cljs$core$IFn$_invoke$arity$1(system_options));
var chunk__32228_32233 = null;
var count__32229_32234 = (0);
var i__32230_32235 = (0);
while(true){
if((i__32230_32235 < count__32229_32234)){
var msg_32236 = cljs.core._nth.call(null,chunk__32228_32233,i__32230_32235);
figwheel.client.socket.handle_incoming_message.call(null,msg_32236);


var G__32237 = seq__32227_32232;
var G__32238 = chunk__32228_32233;
var G__32239 = count__32229_32234;
var G__32240 = (i__32230_32235 + (1));
seq__32227_32232 = G__32237;
chunk__32228_32233 = G__32238;
count__32229_32234 = G__32239;
i__32230_32235 = G__32240;
continue;
} else {
var temp__5735__auto___32241 = cljs.core.seq.call(null,seq__32227_32232);
if(temp__5735__auto___32241){
var seq__32227_32242__$1 = temp__5735__auto___32241;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__32227_32242__$1)){
var c__4609__auto___32243 = cljs.core.chunk_first.call(null,seq__32227_32242__$1);
var G__32244 = cljs.core.chunk_rest.call(null,seq__32227_32242__$1);
var G__32245 = c__4609__auto___32243;
var G__32246 = cljs.core.count.call(null,c__4609__auto___32243);
var G__32247 = (0);
seq__32227_32232 = G__32244;
chunk__32228_32233 = G__32245;
count__32229_32234 = G__32246;
i__32230_32235 = G__32247;
continue;
} else {
var msg_32248 = cljs.core.first.call(null,seq__32227_32242__$1);
figwheel.client.socket.handle_incoming_message.call(null,msg_32248);


var G__32249 = cljs.core.next.call(null,seq__32227_32242__$1);
var G__32250 = null;
var G__32251 = (0);
var G__32252 = (0);
seq__32227_32232 = G__32249;
chunk__32228_32233 = G__32250;
count__32229_32234 = G__32251;
i__32230_32235 = G__32252;
continue;
}
} else {
}
}
break;
}

return figwheel.client.socket.open.call(null,system_options);
})))
;
}
}
}));

(figwheel.client.start.cljs$core$IFn$_invoke$arity$0 = (function (){
return figwheel.client.start.call(null,cljs.core.PersistentArrayMap.EMPTY);
}));

(figwheel.client.start.cljs$lang$maxFixedArity = 1);

figwheel.client.watch_and_reload_with_opts = figwheel.client.start;
figwheel.client.watch_and_reload = (function figwheel$client$watch_and_reload(var_args){
var args__4795__auto__ = [];
var len__4789__auto___32257 = arguments.length;
var i__4790__auto___32258 = (0);
while(true){
if((i__4790__auto___32258 < len__4789__auto___32257)){
args__4795__auto__.push((arguments[i__4790__auto___32258]));

var G__32259 = (i__4790__auto___32258 + (1));
i__4790__auto___32258 = G__32259;
continue;
} else {
}
break;
}

var argseq__4796__auto__ = ((((0) < args__4795__auto__.length))?(new cljs.core.IndexedSeq(args__4795__auto__.slice((0)),(0),null)):null);
return figwheel.client.watch_and_reload.cljs$core$IFn$_invoke$arity$variadic(argseq__4796__auto__);
});

(figwheel.client.watch_and_reload.cljs$core$IFn$_invoke$arity$variadic = (function (p__32254){
var map__32255 = p__32254;
var map__32255__$1 = (((((!((map__32255 == null))))?(((((map__32255.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__32255.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__32255):map__32255);
var opts = map__32255__$1;
return figwheel.client.start.call(null,opts);
}));

(figwheel.client.watch_and_reload.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(figwheel.client.watch_and_reload.cljs$lang$applyTo = (function (seq32253){
var self__4777__auto__ = this;
return self__4777__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq32253));
}));

figwheel.client.fetch_data_from_env = (function figwheel$client$fetch_data_from_env(){
try{return cljs.reader.read_string.call(null,goog.object.get(window,"FIGWHEEL_CLIENT_CONFIGURATION"));
}catch (e32260){if((e32260 instanceof Error)){
var e = e32260;
cljs.core._STAR_print_err_fn_STAR_.call(null,"Unable to load FIGWHEEL_CLIENT_CONFIGURATION from the environment");

return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"autoload","autoload",-354122500),false], null);
} else {
throw e32260;

}
}});
figwheel.client.console_intro_message = "Figwheel has compiled a temporary helper application to your :output-file.\n\nThe code currently in your configured output file does not\nrepresent the code that you are trying to compile.\n\nThis temporary application is intended to help you continue to get\nfeedback from Figwheel until the build you are working on compiles\ncorrectly.\n\nWhen your ClojureScript source code compiles correctly this helper\napplication will auto-reload and pick up your freshly compiled\nClojureScript program.";
figwheel.client.bad_compile_helper_app = (function figwheel$client$bad_compile_helper_app(){
cljs.core.enable_console_print_BANG_.call(null);

var config = figwheel.client.fetch_data_from_env.call(null);
cljs.core.println.call(null,figwheel.client.console_intro_message);

figwheel.client.heads_up.bad_compile_screen.call(null);

if(cljs.core.truth_(goog.dependencies_)){
} else {
(goog.dependencies_ = true);
}

figwheel.client.start.call(null,config);

return figwheel.client.add_message_watch.call(null,new cljs.core.Keyword(null,"listen-for-successful-compile","listen-for-successful-compile",-995277603),(function (p__32261){
var map__32262 = p__32261;
var map__32262__$1 = (((((!((map__32262 == null))))?(((((map__32262.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__32262.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__32262):map__32262);
var msg_name = cljs.core.get.call(null,map__32262__$1,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863));
if(cljs.core._EQ_.call(null,msg_name,new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563))){
return (location.href = location.href);
} else {
return null;
}
}));
});

//# sourceMappingURL=client.js.map?rel=1587042628035

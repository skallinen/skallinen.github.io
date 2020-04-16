// Compiled by ClojureScript 1.10.597 {}
goog.provide('cljs.repl');
goog.require('cljs.core');
goog.require('cljs.spec.alpha');
goog.require('goog.string');
goog.require('goog.string.format');
cljs.repl.print_doc = (function cljs$repl$print_doc(p__31448){
var map__31449 = p__31448;
var map__31449__$1 = (((((!((map__31449 == null))))?(((((map__31449.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__31449.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__31449):map__31449);
var m = map__31449__$1;
var n = cljs.core.get.call(null,map__31449__$1,new cljs.core.Keyword(null,"ns","ns",441598760));
var nm = cljs.core.get.call(null,map__31449__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.println.call(null,"-------------------------");

cljs.core.println.call(null,(function (){var or__4185__auto__ = new cljs.core.Keyword(null,"spec","spec",347520401).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
return [(function (){var temp__5735__auto__ = new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(temp__5735__auto__)){
var ns = temp__5735__auto__;
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns),"/"].join('');
} else {
return null;
}
})(),cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join('');
}
})());

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Protocol");
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m))){
var seq__31451_31483 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m));
var chunk__31452_31484 = null;
var count__31453_31485 = (0);
var i__31454_31486 = (0);
while(true){
if((i__31454_31486 < count__31453_31485)){
var f_31487 = cljs.core._nth.call(null,chunk__31452_31484,i__31454_31486);
cljs.core.println.call(null,"  ",f_31487);


var G__31488 = seq__31451_31483;
var G__31489 = chunk__31452_31484;
var G__31490 = count__31453_31485;
var G__31491 = (i__31454_31486 + (1));
seq__31451_31483 = G__31488;
chunk__31452_31484 = G__31489;
count__31453_31485 = G__31490;
i__31454_31486 = G__31491;
continue;
} else {
var temp__5735__auto___31492 = cljs.core.seq.call(null,seq__31451_31483);
if(temp__5735__auto___31492){
var seq__31451_31493__$1 = temp__5735__auto___31492;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__31451_31493__$1)){
var c__4609__auto___31494 = cljs.core.chunk_first.call(null,seq__31451_31493__$1);
var G__31495 = cljs.core.chunk_rest.call(null,seq__31451_31493__$1);
var G__31496 = c__4609__auto___31494;
var G__31497 = cljs.core.count.call(null,c__4609__auto___31494);
var G__31498 = (0);
seq__31451_31483 = G__31495;
chunk__31452_31484 = G__31496;
count__31453_31485 = G__31497;
i__31454_31486 = G__31498;
continue;
} else {
var f_31499 = cljs.core.first.call(null,seq__31451_31493__$1);
cljs.core.println.call(null,"  ",f_31499);


var G__31500 = cljs.core.next.call(null,seq__31451_31493__$1);
var G__31501 = null;
var G__31502 = (0);
var G__31503 = (0);
seq__31451_31483 = G__31500;
chunk__31452_31484 = G__31501;
count__31453_31485 = G__31502;
i__31454_31486 = G__31503;
continue;
}
} else {
}
}
break;
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m))){
var arglists_31504 = new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_((function (){var or__4185__auto__ = new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
return new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m);
}
})())){
cljs.core.prn.call(null,arglists_31504);
} else {
cljs.core.prn.call(null,((cljs.core._EQ_.call(null,new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.first.call(null,arglists_31504)))?cljs.core.second.call(null,arglists_31504):arglists_31504));
}
} else {
}
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"special-form","special-form",-1326536374).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Special Form");

cljs.core.println.call(null," ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m));

if(cljs.core.contains_QMARK_.call(null,m,new cljs.core.Keyword(null,"url","url",276297046))){
if(cljs.core.truth_(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))){
return cljs.core.println.call(null,["\n  Please see http://clojure.org/",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))].join(''));
} else {
return null;
}
} else {
return cljs.core.println.call(null,["\n  Please see http://clojure.org/special_forms#",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join(''));
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Macro");
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"spec","spec",347520401).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Spec");
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"REPL Special Function");
} else {
}

cljs.core.println.call(null," ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m));

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
var seq__31455_31505 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"methods","methods",453930866).cljs$core$IFn$_invoke$arity$1(m));
var chunk__31456_31506 = null;
var count__31457_31507 = (0);
var i__31458_31508 = (0);
while(true){
if((i__31458_31508 < count__31457_31507)){
var vec__31469_31509 = cljs.core._nth.call(null,chunk__31456_31506,i__31458_31508);
var name_31510 = cljs.core.nth.call(null,vec__31469_31509,(0),null);
var map__31472_31511 = cljs.core.nth.call(null,vec__31469_31509,(1),null);
var map__31472_31512__$1 = (((((!((map__31472_31511 == null))))?(((((map__31472_31511.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__31472_31511.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__31472_31511):map__31472_31511);
var doc_31513 = cljs.core.get.call(null,map__31472_31512__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists_31514 = cljs.core.get.call(null,map__31472_31512__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println.call(null);

cljs.core.println.call(null," ",name_31510);

cljs.core.println.call(null," ",arglists_31514);

if(cljs.core.truth_(doc_31513)){
cljs.core.println.call(null," ",doc_31513);
} else {
}


var G__31515 = seq__31455_31505;
var G__31516 = chunk__31456_31506;
var G__31517 = count__31457_31507;
var G__31518 = (i__31458_31508 + (1));
seq__31455_31505 = G__31515;
chunk__31456_31506 = G__31516;
count__31457_31507 = G__31517;
i__31458_31508 = G__31518;
continue;
} else {
var temp__5735__auto___31519 = cljs.core.seq.call(null,seq__31455_31505);
if(temp__5735__auto___31519){
var seq__31455_31520__$1 = temp__5735__auto___31519;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__31455_31520__$1)){
var c__4609__auto___31521 = cljs.core.chunk_first.call(null,seq__31455_31520__$1);
var G__31522 = cljs.core.chunk_rest.call(null,seq__31455_31520__$1);
var G__31523 = c__4609__auto___31521;
var G__31524 = cljs.core.count.call(null,c__4609__auto___31521);
var G__31525 = (0);
seq__31455_31505 = G__31522;
chunk__31456_31506 = G__31523;
count__31457_31507 = G__31524;
i__31458_31508 = G__31525;
continue;
} else {
var vec__31474_31526 = cljs.core.first.call(null,seq__31455_31520__$1);
var name_31527 = cljs.core.nth.call(null,vec__31474_31526,(0),null);
var map__31477_31528 = cljs.core.nth.call(null,vec__31474_31526,(1),null);
var map__31477_31529__$1 = (((((!((map__31477_31528 == null))))?(((((map__31477_31528.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__31477_31528.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__31477_31528):map__31477_31528);
var doc_31530 = cljs.core.get.call(null,map__31477_31529__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists_31531 = cljs.core.get.call(null,map__31477_31529__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println.call(null);

cljs.core.println.call(null," ",name_31527);

cljs.core.println.call(null," ",arglists_31531);

if(cljs.core.truth_(doc_31530)){
cljs.core.println.call(null," ",doc_31530);
} else {
}


var G__31532 = cljs.core.next.call(null,seq__31455_31520__$1);
var G__31533 = null;
var G__31534 = (0);
var G__31535 = (0);
seq__31455_31505 = G__31532;
chunk__31456_31506 = G__31533;
count__31457_31507 = G__31534;
i__31458_31508 = G__31535;
continue;
}
} else {
}
}
break;
}
} else {
}

if(cljs.core.truth_(n)){
var temp__5735__auto__ = cljs.spec.alpha.get_spec.call(null,cljs.core.symbol.call(null,cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.ns_name.call(null,n)),cljs.core.name.call(null,nm)));
if(cljs.core.truth_(temp__5735__auto__)){
var fnspec = temp__5735__auto__;
cljs.core.print.call(null,"Spec");

var seq__31479 = cljs.core.seq.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"args","args",1315556576),new cljs.core.Keyword(null,"ret","ret",-468222814),new cljs.core.Keyword(null,"fn","fn",-1175266204)], null));
var chunk__31480 = null;
var count__31481 = (0);
var i__31482 = (0);
while(true){
if((i__31482 < count__31481)){
var role = cljs.core._nth.call(null,chunk__31480,i__31482);
var temp__5735__auto___31536__$1 = cljs.core.get.call(null,fnspec,role);
if(cljs.core.truth_(temp__5735__auto___31536__$1)){
var spec_31537 = temp__5735__auto___31536__$1;
cljs.core.print.call(null,["\n ",cljs.core.name.call(null,role),":"].join(''),cljs.spec.alpha.describe.call(null,spec_31537));
} else {
}


var G__31538 = seq__31479;
var G__31539 = chunk__31480;
var G__31540 = count__31481;
var G__31541 = (i__31482 + (1));
seq__31479 = G__31538;
chunk__31480 = G__31539;
count__31481 = G__31540;
i__31482 = G__31541;
continue;
} else {
var temp__5735__auto____$1 = cljs.core.seq.call(null,seq__31479);
if(temp__5735__auto____$1){
var seq__31479__$1 = temp__5735__auto____$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__31479__$1)){
var c__4609__auto__ = cljs.core.chunk_first.call(null,seq__31479__$1);
var G__31542 = cljs.core.chunk_rest.call(null,seq__31479__$1);
var G__31543 = c__4609__auto__;
var G__31544 = cljs.core.count.call(null,c__4609__auto__);
var G__31545 = (0);
seq__31479 = G__31542;
chunk__31480 = G__31543;
count__31481 = G__31544;
i__31482 = G__31545;
continue;
} else {
var role = cljs.core.first.call(null,seq__31479__$1);
var temp__5735__auto___31546__$2 = cljs.core.get.call(null,fnspec,role);
if(cljs.core.truth_(temp__5735__auto___31546__$2)){
var spec_31547 = temp__5735__auto___31546__$2;
cljs.core.print.call(null,["\n ",cljs.core.name.call(null,role),":"].join(''),cljs.spec.alpha.describe.call(null,spec_31547));
} else {
}


var G__31548 = cljs.core.next.call(null,seq__31479__$1);
var G__31549 = null;
var G__31550 = (0);
var G__31551 = (0);
seq__31479 = G__31548;
chunk__31480 = G__31549;
count__31481 = G__31550;
i__31482 = G__31551;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return null;
}
} else {
return null;
}
}
});
/**
 * Constructs a data representation for a Error with keys:
 *  :cause - root cause message
 *  :phase - error phase
 *  :via - cause chain, with cause keys:
 *           :type - exception class symbol
 *           :message - exception message
 *           :data - ex-data
 *           :at - top stack element
 *  :trace - root cause stack elements
 */
cljs.repl.Error__GT_map = (function cljs$repl$Error__GT_map(o){
var base = (function (t){
return cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),(((t instanceof cljs.core.ExceptionInfo))?new cljs.core.Symbol(null,"ExceptionInfo","ExceptionInfo",294935087,null):(((t instanceof Error))?cljs.core.symbol.call(null,"js",t.name):null
))], null),(function (){var temp__5735__auto__ = cljs.core.ex_message.call(null,t);
if(cljs.core.truth_(temp__5735__auto__)){
var msg = temp__5735__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"message","message",-406056002),msg], null);
} else {
return null;
}
})(),(function (){var temp__5735__auto__ = cljs.core.ex_data.call(null,t);
if(cljs.core.truth_(temp__5735__auto__)){
var ed = temp__5735__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data","data",-232669377),ed], null);
} else {
return null;
}
})());
});
var via = (function (){var via = cljs.core.PersistentVector.EMPTY;
var t = o;
while(true){
if(cljs.core.truth_(t)){
var G__31552 = cljs.core.conj.call(null,via,t);
var G__31553 = cljs.core.ex_cause.call(null,t);
via = G__31552;
t = G__31553;
continue;
} else {
return via;
}
break;
}
})();
var root = cljs.core.peek.call(null,via);
return cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"via","via",-1904457336),cljs.core.vec.call(null,cljs.core.map.call(null,base,via)),new cljs.core.Keyword(null,"trace","trace",-1082747415),null], null),(function (){var temp__5735__auto__ = cljs.core.ex_message.call(null,root);
if(cljs.core.truth_(temp__5735__auto__)){
var root_msg = temp__5735__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cause","cause",231901252),root_msg], null);
} else {
return null;
}
})(),(function (){var temp__5735__auto__ = cljs.core.ex_data.call(null,root);
if(cljs.core.truth_(temp__5735__auto__)){
var data = temp__5735__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data","data",-232669377),data], null);
} else {
return null;
}
})(),(function (){var temp__5735__auto__ = new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358).cljs$core$IFn$_invoke$arity$1(cljs.core.ex_data.call(null,o));
if(cljs.core.truth_(temp__5735__auto__)){
var phase = temp__5735__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"phase","phase",575722892),phase], null);
} else {
return null;
}
})());
});
/**
 * Returns an analysis of the phase, error, cause, and location of an error that occurred
 *   based on Throwable data, as returned by Throwable->map. All attributes other than phase
 *   are optional:
 *  :clojure.error/phase - keyword phase indicator, one of:
 *    :read-source :compile-syntax-check :compilation :macro-syntax-check :macroexpansion
 *    :execution :read-eval-result :print-eval-result
 *  :clojure.error/source - file name (no path)
 *  :clojure.error/line - integer line number
 *  :clojure.error/column - integer column number
 *  :clojure.error/symbol - symbol being expanded/compiled/invoked
 *  :clojure.error/class - cause exception class symbol
 *  :clojure.error/cause - cause exception message
 *  :clojure.error/spec - explain-data for spec error
 */
cljs.repl.ex_triage = (function cljs$repl$ex_triage(datafied_throwable){
var map__31556 = datafied_throwable;
var map__31556__$1 = (((((!((map__31556 == null))))?(((((map__31556.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__31556.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__31556):map__31556);
var via = cljs.core.get.call(null,map__31556__$1,new cljs.core.Keyword(null,"via","via",-1904457336));
var trace = cljs.core.get.call(null,map__31556__$1,new cljs.core.Keyword(null,"trace","trace",-1082747415));
var phase = cljs.core.get.call(null,map__31556__$1,new cljs.core.Keyword(null,"phase","phase",575722892),new cljs.core.Keyword(null,"execution","execution",253283524));
var map__31557 = cljs.core.last.call(null,via);
var map__31557__$1 = (((((!((map__31557 == null))))?(((((map__31557.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__31557.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__31557):map__31557);
var type = cljs.core.get.call(null,map__31557__$1,new cljs.core.Keyword(null,"type","type",1174270348));
var message = cljs.core.get.call(null,map__31557__$1,new cljs.core.Keyword(null,"message","message",-406056002));
var data = cljs.core.get.call(null,map__31557__$1,new cljs.core.Keyword(null,"data","data",-232669377));
var map__31558 = data;
var map__31558__$1 = (((((!((map__31558 == null))))?(((((map__31558.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__31558.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__31558):map__31558);
var problems = cljs.core.get.call(null,map__31558__$1,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814));
var fn = cljs.core.get.call(null,map__31558__$1,new cljs.core.Keyword("cljs.spec.alpha","fn","cljs.spec.alpha/fn",408600443));
var caller = cljs.core.get.call(null,map__31558__$1,new cljs.core.Keyword("cljs.spec.test.alpha","caller","cljs.spec.test.alpha/caller",-398302390));
var map__31559 = new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.first.call(null,via));
var map__31559__$1 = (((((!((map__31559 == null))))?(((((map__31559.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__31559.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__31559):map__31559);
var top_data = map__31559__$1;
var source = cljs.core.get.call(null,map__31559__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397));
return cljs.core.assoc.call(null,(function (){var G__31564 = phase;
var G__31564__$1 = (((G__31564 instanceof cljs.core.Keyword))?G__31564.fqn:null);
switch (G__31564__$1) {
case "read-source":
var map__31565 = data;
var map__31565__$1 = (((((!((map__31565 == null))))?(((((map__31565.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__31565.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__31565):map__31565);
var line = cljs.core.get.call(null,map__31565__$1,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471));
var column = cljs.core.get.call(null,map__31565__$1,new cljs.core.Keyword("clojure.error","column","clojure.error/column",304721553));
var G__31567 = cljs.core.merge.call(null,new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.second.call(null,via)),top_data);
var G__31567__$1 = (cljs.core.truth_(source)?cljs.core.assoc.call(null,G__31567,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),source):G__31567);
var G__31567__$2 = (cljs.core.truth_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null).call(null,source))?cljs.core.dissoc.call(null,G__31567__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397)):G__31567__$1);
if(cljs.core.truth_(message)){
return cljs.core.assoc.call(null,G__31567__$2,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message);
} else {
return G__31567__$2;
}

break;
case "compile-syntax-check":
case "compilation":
case "macro-syntax-check":
case "macroexpansion":
var G__31568 = top_data;
var G__31568__$1 = (cljs.core.truth_(source)?cljs.core.assoc.call(null,G__31568,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),source):G__31568);
var G__31568__$2 = (cljs.core.truth_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null).call(null,source))?cljs.core.dissoc.call(null,G__31568__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397)):G__31568__$1);
var G__31568__$3 = (cljs.core.truth_(type)?cljs.core.assoc.call(null,G__31568__$2,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type):G__31568__$2);
var G__31568__$4 = (cljs.core.truth_(message)?cljs.core.assoc.call(null,G__31568__$3,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message):G__31568__$3);
if(cljs.core.truth_(problems)){
return cljs.core.assoc.call(null,G__31568__$4,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595),data);
} else {
return G__31568__$4;
}

break;
case "read-eval-result":
case "print-eval-result":
var vec__31569 = cljs.core.first.call(null,trace);
var source__$1 = cljs.core.nth.call(null,vec__31569,(0),null);
var method = cljs.core.nth.call(null,vec__31569,(1),null);
var file = cljs.core.nth.call(null,vec__31569,(2),null);
var line = cljs.core.nth.call(null,vec__31569,(3),null);
var G__31572 = top_data;
var G__31572__$1 = (cljs.core.truth_(line)?cljs.core.assoc.call(null,G__31572,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471),line):G__31572);
var G__31572__$2 = (cljs.core.truth_(file)?cljs.core.assoc.call(null,G__31572__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),file):G__31572__$1);
var G__31572__$3 = (cljs.core.truth_((function (){var and__4174__auto__ = source__$1;
if(cljs.core.truth_(and__4174__auto__)){
return method;
} else {
return and__4174__auto__;
}
})())?cljs.core.assoc.call(null,G__31572__$2,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[source__$1,method],null))):G__31572__$2);
var G__31572__$4 = (cljs.core.truth_(type)?cljs.core.assoc.call(null,G__31572__$3,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type):G__31572__$3);
if(cljs.core.truth_(message)){
return cljs.core.assoc.call(null,G__31572__$4,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message);
} else {
return G__31572__$4;
}

break;
case "execution":
var vec__31573 = cljs.core.first.call(null,trace);
var source__$1 = cljs.core.nth.call(null,vec__31573,(0),null);
var method = cljs.core.nth.call(null,vec__31573,(1),null);
var file = cljs.core.nth.call(null,vec__31573,(2),null);
var line = cljs.core.nth.call(null,vec__31573,(3),null);
var file__$1 = cljs.core.first.call(null,cljs.core.remove.call(null,(function (p1__31555_SHARP_){
var or__4185__auto__ = (p1__31555_SHARP_ == null);
if(or__4185__auto__){
return or__4185__auto__;
} else {
return new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null).call(null,p1__31555_SHARP_);
}
}),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(caller),file], null)));
var err_line = (function (){var or__4185__auto__ = new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(caller);
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
return line;
}
})();
var G__31576 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type], null);
var G__31576__$1 = (cljs.core.truth_(err_line)?cljs.core.assoc.call(null,G__31576,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471),err_line):G__31576);
var G__31576__$2 = (cljs.core.truth_(message)?cljs.core.assoc.call(null,G__31576__$1,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message):G__31576__$1);
var G__31576__$3 = (cljs.core.truth_((function (){var or__4185__auto__ = fn;
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
var and__4174__auto__ = source__$1;
if(cljs.core.truth_(and__4174__auto__)){
return method;
} else {
return and__4174__auto__;
}
}
})())?cljs.core.assoc.call(null,G__31576__$2,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994),(function (){var or__4185__auto__ = fn;
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
return (new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[source__$1,method],null));
}
})()):G__31576__$2);
var G__31576__$4 = (cljs.core.truth_(file__$1)?cljs.core.assoc.call(null,G__31576__$3,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),file__$1):G__31576__$3);
if(cljs.core.truth_(problems)){
return cljs.core.assoc.call(null,G__31576__$4,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595),data);
} else {
return G__31576__$4;
}

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__31564__$1)].join('')));

}
})(),new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358),phase);
});
/**
 * Returns a string from exception data, as produced by ex-triage.
 *   The first line summarizes the exception phase and location.
 *   The subsequent lines describe the cause.
 */
cljs.repl.ex_str = (function cljs$repl$ex_str(p__31580){
var map__31581 = p__31580;
var map__31581__$1 = (((((!((map__31581 == null))))?(((((map__31581.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__31581.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__31581):map__31581);
var triage_data = map__31581__$1;
var phase = cljs.core.get.call(null,map__31581__$1,new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358));
var source = cljs.core.get.call(null,map__31581__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397));
var line = cljs.core.get.call(null,map__31581__$1,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471));
var column = cljs.core.get.call(null,map__31581__$1,new cljs.core.Keyword("clojure.error","column","clojure.error/column",304721553));
var symbol = cljs.core.get.call(null,map__31581__$1,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994));
var class$ = cljs.core.get.call(null,map__31581__$1,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890));
var cause = cljs.core.get.call(null,map__31581__$1,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742));
var spec = cljs.core.get.call(null,map__31581__$1,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595));
var loc = [cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var or__4185__auto__ = source;
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
return "<cljs repl>";
}
})()),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var or__4185__auto__ = line;
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
return (1);
}
})()),(cljs.core.truth_(column)?[":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(column)].join(''):"")].join('');
var class_name = cljs.core.name.call(null,(function (){var or__4185__auto__ = class$;
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
return "";
}
})());
var simple_class = class_name;
var cause_type = ((cljs.core.contains_QMARK_.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["RuntimeException",null,"Exception",null], null), null),simple_class))?"":[" (",simple_class,")"].join(''));
var format = goog.string.format;
var G__31583 = phase;
var G__31583__$1 = (((G__31583 instanceof cljs.core.Keyword))?G__31583.fqn:null);
switch (G__31583__$1) {
case "read-source":
return format.call(null,"Syntax error reading source at (%s).\n%s\n",loc,cause);

break;
case "macro-syntax-check":
return format.call(null,"Syntax error macroexpanding %sat (%s).\n%s",(cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):""),loc,(cljs.core.truth_(spec)?(function (){var sb__4720__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__31584_31593 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__31585_31594 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__31586_31595 = true;
var _STAR_print_fn_STAR__temp_val__31587_31596 = (function (x__4721__auto__){
return sb__4720__auto__.append(x__4721__auto__);
});
(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__31586_31595);

(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__31587_31596);

try{cljs.spec.alpha.explain_out.call(null,cljs.core.update.call(null,spec,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814),(function (probs){
return cljs.core.map.call(null,(function (p1__31578_SHARP_){
return cljs.core.dissoc.call(null,p1__31578_SHARP_,new cljs.core.Keyword(null,"in","in",-1531184865));
}),probs);
}))
);
}finally {(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__31585_31594);

(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__31584_31593);
}
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__4720__auto__);
})():format.call(null,"%s\n",cause)));

break;
case "macroexpansion":
return format.call(null,"Unexpected error%s macroexpanding %sat (%s).\n%s\n",cause_type,(cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):""),loc,cause);

break;
case "compile-syntax-check":
return format.call(null,"Syntax error%s compiling %sat (%s).\n%s\n",cause_type,(cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):""),loc,cause);

break;
case "compilation":
return format.call(null,"Unexpected error%s compiling %sat (%s).\n%s\n",cause_type,(cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):""),loc,cause);

break;
case "read-eval-result":
return format.call(null,"Error reading eval result%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause);

break;
case "print-eval-result":
return format.call(null,"Error printing return value%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause);

break;
case "execution":
if(cljs.core.truth_(spec)){
return format.call(null,"Execution error - invalid arguments to %s at (%s).\n%s",symbol,loc,(function (){var sb__4720__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__31588_31597 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__31589_31598 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__31590_31599 = true;
var _STAR_print_fn_STAR__temp_val__31591_31600 = (function (x__4721__auto__){
return sb__4720__auto__.append(x__4721__auto__);
});
(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__31590_31599);

(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__31591_31600);

try{cljs.spec.alpha.explain_out.call(null,cljs.core.update.call(null,spec,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814),(function (probs){
return cljs.core.map.call(null,(function (p1__31579_SHARP_){
return cljs.core.dissoc.call(null,p1__31579_SHARP_,new cljs.core.Keyword(null,"in","in",-1531184865));
}),probs);
}))
);
}finally {(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__31589_31598);

(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__31588_31597);
}
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__4720__auto__);
})());
} else {
return format.call(null,"Execution error%s at %s(%s).\n%s\n",cause_type,(cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):""),loc,cause);
}

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__31583__$1)].join('')));

}
});
cljs.repl.error__GT_str = (function cljs$repl$error__GT_str(error){
return cljs.repl.ex_str.call(null,cljs.repl.ex_triage.call(null,cljs.repl.Error__GT_map.call(null,error)));
});

//# sourceMappingURL=repl.js.map?rel=1587042627243

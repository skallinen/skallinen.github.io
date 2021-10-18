goog.provide('cljs.repl');
cljs.repl.print_doc = (function cljs$repl$print_doc(p__49267){
var map__49271 = p__49267;
var map__49271__$1 = cljs.core.__destructure_map(map__49271);
var m = map__49271__$1;
var n = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49271__$1,new cljs.core.Keyword(null,"ns","ns",441598760));
var nm = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49271__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["-------------------------"], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(function (){var or__4212__auto__ = new cljs.core.Keyword(null,"spec","spec",347520401).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__4212__auto__)){
return or__4212__auto__;
} else {
return [(function (){var temp__5753__auto__ = new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(temp__5753__auto__)){
var ns = temp__5753__auto__;
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns),"/"].join('');
} else {
return null;
}
})(),cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join('');
}
})()], 0));

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Protocol"], 0));
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m))){
var seq__49288_49578 = cljs.core.seq(new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m));
var chunk__49289_49579 = null;
var count__49290_49580 = (0);
var i__49291_49581 = (0);
while(true){
if((i__49291_49581 < count__49290_49580)){
var f_49582 = chunk__49289_49579.cljs$core$IIndexed$_nth$arity$2(null,i__49291_49581);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["  ",f_49582], 0));


var G__49583 = seq__49288_49578;
var G__49584 = chunk__49289_49579;
var G__49585 = count__49290_49580;
var G__49586 = (i__49291_49581 + (1));
seq__49288_49578 = G__49583;
chunk__49289_49579 = G__49584;
count__49290_49580 = G__49585;
i__49291_49581 = G__49586;
continue;
} else {
var temp__5753__auto___49587 = cljs.core.seq(seq__49288_49578);
if(temp__5753__auto___49587){
var seq__49288_49589__$1 = temp__5753__auto___49587;
if(cljs.core.chunked_seq_QMARK_(seq__49288_49589__$1)){
var c__4638__auto___49590 = cljs.core.chunk_first(seq__49288_49589__$1);
var G__49592 = cljs.core.chunk_rest(seq__49288_49589__$1);
var G__49593 = c__4638__auto___49590;
var G__49594 = cljs.core.count(c__4638__auto___49590);
var G__49595 = (0);
seq__49288_49578 = G__49592;
chunk__49289_49579 = G__49593;
count__49290_49580 = G__49594;
i__49291_49581 = G__49595;
continue;
} else {
var f_49596 = cljs.core.first(seq__49288_49589__$1);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["  ",f_49596], 0));


var G__49598 = cljs.core.next(seq__49288_49589__$1);
var G__49599 = null;
var G__49600 = (0);
var G__49601 = (0);
seq__49288_49578 = G__49598;
chunk__49289_49579 = G__49599;
count__49290_49580 = G__49600;
i__49291_49581 = G__49601;
continue;
}
} else {
}
}
break;
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m))){
var arglists_49602 = new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_((function (){var or__4212__auto__ = new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__4212__auto__)){
return or__4212__auto__;
} else {
return new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m);
}
})())){
cljs.core.prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([arglists_49602], 0));
} else {
cljs.core.prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.first(arglists_49602)))?cljs.core.second(arglists_49602):arglists_49602)], 0));
}
} else {
}
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"special-form","special-form",-1326536374).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Special Form"], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m)], 0));

if(cljs.core.contains_QMARK_(m,new cljs.core.Keyword(null,"url","url",276297046))){
if(cljs.core.truth_(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))){
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["\n  Please see http://clojure.org/",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))].join('')], 0));
} else {
return null;
}
} else {
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["\n  Please see http://clojure.org/special_forms#",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join('')], 0));
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Macro"], 0));
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"spec","spec",347520401).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Spec"], 0));
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["REPL Special Function"], 0));
} else {
}

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m)], 0));

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
var seq__49304_49605 = cljs.core.seq(new cljs.core.Keyword(null,"methods","methods",453930866).cljs$core$IFn$_invoke$arity$1(m));
var chunk__49305_49606 = null;
var count__49306_49607 = (0);
var i__49307_49608 = (0);
while(true){
if((i__49307_49608 < count__49306_49607)){
var vec__49323_49610 = chunk__49305_49606.cljs$core$IIndexed$_nth$arity$2(null,i__49307_49608);
var name_49611 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__49323_49610,(0),null);
var map__49326_49612 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__49323_49610,(1),null);
var map__49326_49613__$1 = cljs.core.__destructure_map(map__49326_49612);
var doc_49614 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49326_49613__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists_49615 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49326_49613__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println();

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",name_49611], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",arglists_49615], 0));

if(cljs.core.truth_(doc_49614)){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",doc_49614], 0));
} else {
}


var G__49618 = seq__49304_49605;
var G__49619 = chunk__49305_49606;
var G__49620 = count__49306_49607;
var G__49621 = (i__49307_49608 + (1));
seq__49304_49605 = G__49618;
chunk__49305_49606 = G__49619;
count__49306_49607 = G__49620;
i__49307_49608 = G__49621;
continue;
} else {
var temp__5753__auto___49622 = cljs.core.seq(seq__49304_49605);
if(temp__5753__auto___49622){
var seq__49304_49624__$1 = temp__5753__auto___49622;
if(cljs.core.chunked_seq_QMARK_(seq__49304_49624__$1)){
var c__4638__auto___49625 = cljs.core.chunk_first(seq__49304_49624__$1);
var G__49626 = cljs.core.chunk_rest(seq__49304_49624__$1);
var G__49627 = c__4638__auto___49625;
var G__49628 = cljs.core.count(c__4638__auto___49625);
var G__49629 = (0);
seq__49304_49605 = G__49626;
chunk__49305_49606 = G__49627;
count__49306_49607 = G__49628;
i__49307_49608 = G__49629;
continue;
} else {
var vec__49331_49630 = cljs.core.first(seq__49304_49624__$1);
var name_49631 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__49331_49630,(0),null);
var map__49334_49632 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__49331_49630,(1),null);
var map__49334_49633__$1 = cljs.core.__destructure_map(map__49334_49632);
var doc_49634 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49334_49633__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists_49635 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49334_49633__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println();

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",name_49631], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",arglists_49635], 0));

if(cljs.core.truth_(doc_49634)){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",doc_49634], 0));
} else {
}


var G__49636 = cljs.core.next(seq__49304_49624__$1);
var G__49637 = null;
var G__49638 = (0);
var G__49639 = (0);
seq__49304_49605 = G__49636;
chunk__49305_49606 = G__49637;
count__49306_49607 = G__49638;
i__49307_49608 = G__49639;
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
var temp__5753__auto__ = cljs.spec.alpha.get_spec(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2(cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.ns_name(n)),cljs.core.name(nm)));
if(cljs.core.truth_(temp__5753__auto__)){
var fnspec = temp__5753__auto__;
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Spec"], 0));

var seq__49339 = cljs.core.seq(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"args","args",1315556576),new cljs.core.Keyword(null,"ret","ret",-468222814),new cljs.core.Keyword(null,"fn","fn",-1175266204)], null));
var chunk__49340 = null;
var count__49341 = (0);
var i__49342 = (0);
while(true){
if((i__49342 < count__49341)){
var role = chunk__49340.cljs$core$IIndexed$_nth$arity$2(null,i__49342);
var temp__5753__auto___49648__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(fnspec,role);
if(cljs.core.truth_(temp__5753__auto___49648__$1)){
var spec_49649 = temp__5753__auto___49648__$1;
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["\n ",cljs.core.name(role),":"].join(''),cljs.spec.alpha.describe(spec_49649)], 0));
} else {
}


var G__49651 = seq__49339;
var G__49652 = chunk__49340;
var G__49653 = count__49341;
var G__49654 = (i__49342 + (1));
seq__49339 = G__49651;
chunk__49340 = G__49652;
count__49341 = G__49653;
i__49342 = G__49654;
continue;
} else {
var temp__5753__auto____$1 = cljs.core.seq(seq__49339);
if(temp__5753__auto____$1){
var seq__49339__$1 = temp__5753__auto____$1;
if(cljs.core.chunked_seq_QMARK_(seq__49339__$1)){
var c__4638__auto__ = cljs.core.chunk_first(seq__49339__$1);
var G__49670 = cljs.core.chunk_rest(seq__49339__$1);
var G__49671 = c__4638__auto__;
var G__49672 = cljs.core.count(c__4638__auto__);
var G__49673 = (0);
seq__49339 = G__49670;
chunk__49340 = G__49671;
count__49341 = G__49672;
i__49342 = G__49673;
continue;
} else {
var role = cljs.core.first(seq__49339__$1);
var temp__5753__auto___49678__$2 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(fnspec,role);
if(cljs.core.truth_(temp__5753__auto___49678__$2)){
var spec_49679 = temp__5753__auto___49678__$2;
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["\n ",cljs.core.name(role),":"].join(''),cljs.spec.alpha.describe(spec_49679)], 0));
} else {
}


var G__49680 = cljs.core.next(seq__49339__$1);
var G__49681 = null;
var G__49682 = (0);
var G__49683 = (0);
seq__49339 = G__49680;
chunk__49340 = G__49681;
count__49341 = G__49682;
i__49342 = G__49683;
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
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),(((t instanceof cljs.core.ExceptionInfo))?new cljs.core.Symbol("cljs.core","ExceptionInfo","cljs.core/ExceptionInfo",701839050,null):(((t instanceof Error))?cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("js",t.name):null
))], null),(function (){var temp__5753__auto__ = cljs.core.ex_message(t);
if(cljs.core.truth_(temp__5753__auto__)){
var msg = temp__5753__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"message","message",-406056002),msg], null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.ex_data(t);
if(cljs.core.truth_(temp__5753__auto__)){
var ed = temp__5753__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data","data",-232669377),ed], null);
} else {
return null;
}
})()], 0));
});
var via = (function (){var via = cljs.core.PersistentVector.EMPTY;
var t = o;
while(true){
if(cljs.core.truth_(t)){
var G__49689 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(via,t);
var G__49690 = cljs.core.ex_cause(t);
via = G__49689;
t = G__49690;
continue;
} else {
return via;
}
break;
}
})();
var root = cljs.core.peek(via);
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"via","via",-1904457336),cljs.core.vec(cljs.core.map.cljs$core$IFn$_invoke$arity$2(base,via)),new cljs.core.Keyword(null,"trace","trace",-1082747415),null], null),(function (){var temp__5753__auto__ = cljs.core.ex_message(root);
if(cljs.core.truth_(temp__5753__auto__)){
var root_msg = temp__5753__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cause","cause",231901252),root_msg], null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.ex_data(root);
if(cljs.core.truth_(temp__5753__auto__)){
var data = temp__5753__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data","data",-232669377),data], null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358).cljs$core$IFn$_invoke$arity$1(cljs.core.ex_data(o));
if(cljs.core.truth_(temp__5753__auto__)){
var phase = temp__5753__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"phase","phase",575722892),phase], null);
} else {
return null;
}
})()], 0));
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
var map__49393 = datafied_throwable;
var map__49393__$1 = cljs.core.__destructure_map(map__49393);
var via = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49393__$1,new cljs.core.Keyword(null,"via","via",-1904457336));
var trace = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49393__$1,new cljs.core.Keyword(null,"trace","trace",-1082747415));
var phase = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__49393__$1,new cljs.core.Keyword(null,"phase","phase",575722892),new cljs.core.Keyword(null,"execution","execution",253283524));
var map__49394 = cljs.core.last(via);
var map__49394__$1 = cljs.core.__destructure_map(map__49394);
var type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49394__$1,new cljs.core.Keyword(null,"type","type",1174270348));
var message = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49394__$1,new cljs.core.Keyword(null,"message","message",-406056002));
var data = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49394__$1,new cljs.core.Keyword(null,"data","data",-232669377));
var map__49395 = data;
var map__49395__$1 = cljs.core.__destructure_map(map__49395);
var problems = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49395__$1,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814));
var fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49395__$1,new cljs.core.Keyword("cljs.spec.alpha","fn","cljs.spec.alpha/fn",408600443));
var caller = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49395__$1,new cljs.core.Keyword("cljs.spec.test.alpha","caller","cljs.spec.test.alpha/caller",-398302390));
var map__49396 = new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.first(via));
var map__49396__$1 = cljs.core.__destructure_map(map__49396);
var top_data = map__49396__$1;
var source = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49396__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397));
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3((function (){var G__49400 = phase;
var G__49400__$1 = (((G__49400 instanceof cljs.core.Keyword))?G__49400.fqn:null);
switch (G__49400__$1) {
case "read-source":
var map__49407 = data;
var map__49407__$1 = cljs.core.__destructure_map(map__49407);
var line = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49407__$1,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471));
var column = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49407__$1,new cljs.core.Keyword("clojure.error","column","clojure.error/column",304721553));
var G__49410 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.second(via)),top_data], 0));
var G__49410__$1 = (cljs.core.truth_(source)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__49410,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),source):G__49410);
var G__49410__$2 = (cljs.core.truth_((function (){var fexpr__49411 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null);
return (fexpr__49411.cljs$core$IFn$_invoke$arity$1 ? fexpr__49411.cljs$core$IFn$_invoke$arity$1(source) : fexpr__49411.call(null,source));
})())?cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(G__49410__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397)):G__49410__$1);
if(cljs.core.truth_(message)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__49410__$2,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message);
} else {
return G__49410__$2;
}

break;
case "compile-syntax-check":
case "compilation":
case "macro-syntax-check":
case "macroexpansion":
var G__49415 = top_data;
var G__49415__$1 = (cljs.core.truth_(source)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__49415,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),source):G__49415);
var G__49415__$2 = (cljs.core.truth_((function (){var fexpr__49417 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null);
return (fexpr__49417.cljs$core$IFn$_invoke$arity$1 ? fexpr__49417.cljs$core$IFn$_invoke$arity$1(source) : fexpr__49417.call(null,source));
})())?cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(G__49415__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397)):G__49415__$1);
var G__49415__$3 = (cljs.core.truth_(type)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__49415__$2,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type):G__49415__$2);
var G__49415__$4 = (cljs.core.truth_(message)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__49415__$3,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message):G__49415__$3);
if(cljs.core.truth_(problems)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__49415__$4,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595),data);
} else {
return G__49415__$4;
}

break;
case "read-eval-result":
case "print-eval-result":
var vec__49423 = cljs.core.first(trace);
var source__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__49423,(0),null);
var method = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__49423,(1),null);
var file = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__49423,(2),null);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__49423,(3),null);
var G__49428 = top_data;
var G__49428__$1 = (cljs.core.truth_(line)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__49428,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471),line):G__49428);
var G__49428__$2 = (cljs.core.truth_(file)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__49428__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),file):G__49428__$1);
var G__49428__$3 = (cljs.core.truth_((function (){var and__4210__auto__ = source__$1;
if(cljs.core.truth_(and__4210__auto__)){
return method;
} else {
return and__4210__auto__;
}
})())?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__49428__$2,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[source__$1,method],null))):G__49428__$2);
var G__49428__$4 = (cljs.core.truth_(type)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__49428__$3,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type):G__49428__$3);
if(cljs.core.truth_(message)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__49428__$4,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message);
} else {
return G__49428__$4;
}

break;
case "execution":
var vec__49434 = cljs.core.first(trace);
var source__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__49434,(0),null);
var method = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__49434,(1),null);
var file = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__49434,(2),null);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__49434,(3),null);
var file__$1 = cljs.core.first(cljs.core.remove.cljs$core$IFn$_invoke$arity$2((function (p1__49391_SHARP_){
var or__4212__auto__ = (p1__49391_SHARP_ == null);
if(or__4212__auto__){
return or__4212__auto__;
} else {
var fexpr__49438 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null);
return (fexpr__49438.cljs$core$IFn$_invoke$arity$1 ? fexpr__49438.cljs$core$IFn$_invoke$arity$1(p1__49391_SHARP_) : fexpr__49438.call(null,p1__49391_SHARP_));
}
}),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(caller),file], null)));
var err_line = (function (){var or__4212__auto__ = new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(caller);
if(cljs.core.truth_(or__4212__auto__)){
return or__4212__auto__;
} else {
return line;
}
})();
var G__49441 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type], null);
var G__49441__$1 = (cljs.core.truth_(err_line)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__49441,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471),err_line):G__49441);
var G__49441__$2 = (cljs.core.truth_(message)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__49441__$1,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message):G__49441__$1);
var G__49441__$3 = (cljs.core.truth_((function (){var or__4212__auto__ = fn;
if(cljs.core.truth_(or__4212__auto__)){
return or__4212__auto__;
} else {
var and__4210__auto__ = source__$1;
if(cljs.core.truth_(and__4210__auto__)){
return method;
} else {
return and__4210__auto__;
}
}
})())?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__49441__$2,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994),(function (){var or__4212__auto__ = fn;
if(cljs.core.truth_(or__4212__auto__)){
return or__4212__auto__;
} else {
return (new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[source__$1,method],null));
}
})()):G__49441__$2);
var G__49441__$4 = (cljs.core.truth_(file__$1)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__49441__$3,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),file__$1):G__49441__$3);
if(cljs.core.truth_(problems)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__49441__$4,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595),data);
} else {
return G__49441__$4;
}

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__49400__$1)].join('')));

}
})(),new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358),phase);
});
/**
 * Returns a string from exception data, as produced by ex-triage.
 *   The first line summarizes the exception phase and location.
 *   The subsequent lines describe the cause.
 */
cljs.repl.ex_str = (function cljs$repl$ex_str(p__49453){
var map__49454 = p__49453;
var map__49454__$1 = cljs.core.__destructure_map(map__49454);
var triage_data = map__49454__$1;
var phase = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49454__$1,new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358));
var source = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49454__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397));
var line = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49454__$1,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471));
var column = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49454__$1,new cljs.core.Keyword("clojure.error","column","clojure.error/column",304721553));
var symbol = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49454__$1,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994));
var class$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49454__$1,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890));
var cause = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49454__$1,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742));
var spec = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49454__$1,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595));
var loc = [cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var or__4212__auto__ = source;
if(cljs.core.truth_(or__4212__auto__)){
return or__4212__auto__;
} else {
return "<cljs repl>";
}
})()),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var or__4212__auto__ = line;
if(cljs.core.truth_(or__4212__auto__)){
return or__4212__auto__;
} else {
return (1);
}
})()),(cljs.core.truth_(column)?[":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(column)].join(''):"")].join('');
var class_name = cljs.core.name((function (){var or__4212__auto__ = class$;
if(cljs.core.truth_(or__4212__auto__)){
return or__4212__auto__;
} else {
return "";
}
})());
var simple_class = class_name;
var cause_type = ((cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["RuntimeException",null,"Exception",null], null), null),simple_class))?"":[" (",simple_class,")"].join(''));
var format = goog.string.format;
var G__49479 = phase;
var G__49479__$1 = (((G__49479 instanceof cljs.core.Keyword))?G__49479.fqn:null);
switch (G__49479__$1) {
case "read-source":
return (format.cljs$core$IFn$_invoke$arity$3 ? format.cljs$core$IFn$_invoke$arity$3("Syntax error reading source at (%s).\n%s\n",loc,cause) : format.call(null,"Syntax error reading source at (%s).\n%s\n",loc,cause));

break;
case "macro-syntax-check":
var G__49484 = "Syntax error macroexpanding %sat (%s).\n%s";
var G__49485 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__49486 = loc;
var G__49487 = (cljs.core.truth_(spec)?(function (){var sb__4749__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__49490_49751 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__49491_49752 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__49492_49753 = true;
var _STAR_print_fn_STAR__temp_val__49493_49754 = (function (x__4750__auto__){
return sb__4749__auto__.append(x__4750__auto__);
});
(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__49492_49753);

(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__49493_49754);

try{cljs.spec.alpha.explain_out(cljs.core.update.cljs$core$IFn$_invoke$arity$3(spec,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814),(function (probs){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__49448_SHARP_){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__49448_SHARP_,new cljs.core.Keyword(null,"in","in",-1531184865));
}),probs);
}))
);
}finally {(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__49491_49752);

(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__49490_49751);
}
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__4749__auto__);
})():(format.cljs$core$IFn$_invoke$arity$2 ? format.cljs$core$IFn$_invoke$arity$2("%s\n",cause) : format.call(null,"%s\n",cause)));
return (format.cljs$core$IFn$_invoke$arity$4 ? format.cljs$core$IFn$_invoke$arity$4(G__49484,G__49485,G__49486,G__49487) : format.call(null,G__49484,G__49485,G__49486,G__49487));

break;
case "macroexpansion":
var G__49498 = "Unexpected error%s macroexpanding %sat (%s).\n%s\n";
var G__49499 = cause_type;
var G__49500 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__49501 = loc;
var G__49502 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__49498,G__49499,G__49500,G__49501,G__49502) : format.call(null,G__49498,G__49499,G__49500,G__49501,G__49502));

break;
case "compile-syntax-check":
var G__49504 = "Syntax error%s compiling %sat (%s).\n%s\n";
var G__49505 = cause_type;
var G__49506 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__49507 = loc;
var G__49508 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__49504,G__49505,G__49506,G__49507,G__49508) : format.call(null,G__49504,G__49505,G__49506,G__49507,G__49508));

break;
case "compilation":
var G__49512 = "Unexpected error%s compiling %sat (%s).\n%s\n";
var G__49513 = cause_type;
var G__49514 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__49515 = loc;
var G__49516 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__49512,G__49513,G__49514,G__49515,G__49516) : format.call(null,G__49512,G__49513,G__49514,G__49515,G__49516));

break;
case "read-eval-result":
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5("Error reading eval result%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause) : format.call(null,"Error reading eval result%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause));

break;
case "print-eval-result":
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5("Error printing return value%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause) : format.call(null,"Error printing return value%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause));

break;
case "execution":
if(cljs.core.truth_(spec)){
var G__49518 = "Execution error - invalid arguments to %s at (%s).\n%s";
var G__49519 = symbol;
var G__49520 = loc;
var G__49521 = (function (){var sb__4749__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__49522_49759 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__49523_49760 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__49524_49761 = true;
var _STAR_print_fn_STAR__temp_val__49525_49762 = (function (x__4750__auto__){
return sb__4749__auto__.append(x__4750__auto__);
});
(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__49524_49761);

(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__49525_49762);

try{cljs.spec.alpha.explain_out(cljs.core.update.cljs$core$IFn$_invoke$arity$3(spec,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814),(function (probs){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__49451_SHARP_){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__49451_SHARP_,new cljs.core.Keyword(null,"in","in",-1531184865));
}),probs);
}))
);
}finally {(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__49523_49760);

(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__49522_49759);
}
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__4749__auto__);
})();
return (format.cljs$core$IFn$_invoke$arity$4 ? format.cljs$core$IFn$_invoke$arity$4(G__49518,G__49519,G__49520,G__49521) : format.call(null,G__49518,G__49519,G__49520,G__49521));
} else {
var G__49533 = "Execution error%s at %s(%s).\n%s\n";
var G__49534 = cause_type;
var G__49535 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__49536 = loc;
var G__49537 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__49533,G__49534,G__49535,G__49536,G__49537) : format.call(null,G__49533,G__49534,G__49535,G__49536,G__49537));
}

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__49479__$1)].join('')));

}
});
cljs.repl.error__GT_str = (function cljs$repl$error__GT_str(error){
return cljs.repl.ex_str(cljs.repl.ex_triage(cljs.repl.Error__GT_map(error)));
});

//# sourceMappingURL=cljs.repl.js.map

goog.provide('app.core');
var module$node_modules$bitcoin_address_generator$index=shadow.js.require("module$node_modules$bitcoin_address_generator$index", {});
var module$node_modules$react_dom$client=shadow.js.require("module$node_modules$react_dom$client", {});
app.core.gen_address = (function app$core$gen_address(){
var result = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.EMPTY);
module$node_modules$bitcoin_address_generator$index.createWalletAddress((function (p1__37425_SHARP_){
return cljs.core.reset_BANG_(result,p1__37425_SHARP_);
}));

return cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$variadic(cljs.core.deref(result),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),true], 0));
});
app.core.reset_component = (function app$core$reset_component(seconds){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),"button",new cljs.core.Keyword(null,"value","value",305978217),"Reset",new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return cljs.core.reset_BANG_(seconds,(60));
})], null)], null);
});
app.core.base = 1.9;
app.core.responsive_font_siexe = (function app$core$responsive_font_siexe(size){
var s = (function (){var G__37426 = size;
var G__37426__$1 = (((G__37426 instanceof cljs.core.Keyword))?G__37426.fqn:null);
switch (G__37426__$1) {
case "h1":
return (3);

break;
case "h2":
return 1.5;

break;
case "base":
return (1);

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__37426__$1)].join('')));

}
})();
var v = (app.core.base * s);
var pt_min = ((6) * v);
var pt_max = ((32) * v);
return ["max(min(",cljs.core.str.cljs$core$IFn$_invoke$arity$1(v),"vh, ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(pt_max),"px), ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(pt_min),"px)"].join('');
});

app.core.app = (function (){var G__37428 = (function app$core$app_render(props__34477__auto__,maybe_ref__34478__auto__){
var vec__37429 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [helix.core.extract_cljs_props(props__34477__auto__),maybe_ref__34478__auto__], null);

var vec__37432 = helix.hooks.use_state(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"display-win?","display-win?",-867263381),false,new cljs.core.Keyword(null,"display","display",242065432),true,new cljs.core.Keyword(null,"current","current",-1088038603),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"result","result",1415092211),app.core.gen_address(),new cljs.core.Keyword(null,"display","display",242065432),false], null)], null));
var state = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37432,(0),null);
var set_state = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37432,(1),null);
return helix.core.get_react().createElement("div",(function (){var obj37436 = ({"style":(function (){var obj37438 = ({"fontFamily":helix.impl.props.__GT_js("Helvetica, Helvetica Neue, Roboto, sans-serif;")});
return obj37438;
})(),"className":"mb-10 mx-5 sm:mx-10 md:mx-16 lg:mx-20 xl:mx-64 grid"});
return obj37436;
})(),helix.core.get_react().createElement("p",(function (){var obj37440 = ({"style":(function (){var obj37442 = ({"fontSize":helix.impl.props.__GT_js(app.core.responsive_font_siexe(new cljs.core.Keyword(null,"base","base",185279322)))});
return obj37442;
})(),"className":"pt-3 text-center lg:lg"});
return obj37440;
})(),"IRRATIONAL HOPE"),helix.core.get_react().createElement("p",(function (){var obj37444 = ({"style":(function (){var obj37446 = ({"fontSize":helix.impl.props.__GT_js(app.core.responsive_font_siexe(new cljs.core.Keyword(null,"h1","h1",-1896887462)))});
return obj37446;
})(),"className":"text-center"});
return obj37444;
})(),"Is Today Your Lucky Day?"),helix.core.get_react().createElement("p",(function (){var obj37448 = ({"style":(function (){var obj37450 = ({"fontSize":helix.impl.props.__GT_js(app.core.responsive_font_siexe(new cljs.core.Keyword(null,"h2","h2",-372662728)))});
return obj37450;
})(),"className":"py-12 text-center"});
return obj37448;
})(),"1/2+ Billion Dollar Lottery (Free)!"),helix.core.get_react().createElement("p",(function (){var obj37452 = ({"style":(function (){var obj37454 = ({"fontSize":helix.impl.props.__GT_js(app.core.responsive_font_siexe(new cljs.core.Keyword(null,"base","base",185279322)))});
return obj37454;
})(),"className":"pb-12"});
return obj37452;
})(),["Wallet 967 has been inactive since July 25th, 2010, and holds ","a balance of 31,000 BTC, more than half a billion dollars. It's ","likely that the owner of this early wallet has lost the access ","information, like many others. By clicking the button below, ","we'll generate a random key for the account. The chances of it ","being the right one are incredibly slim, at one in 2^256, but ","who knows, maybe today's your lucky day! Give it a shot and ","find out:"].join('')),helix.core.get_react().createElement("button",(function (){var obj37456 = ({"style":(function (){var obj37458 = ({"fontSize":helix.impl.props.__GT_js(app.core.responsive_font_siexe(new cljs.core.Keyword(null,"base","base",185279322))),"display":helix.impl.props.__GT_js((cljs.core.truth_(new cljs.core.Keyword(null,"display","display",242065432).cljs$core$IFn$_invoke$arity$1(state))?"block":"none"))});
return obj37458;
})(),"className":"bg-blue-500 hover:bg-orange-700 text-white font-bold p-2 rounded-full","onClick":(function (){
var G__37459 = cljs.core.assoc;
var G__37460 = new cljs.core.Keyword(null,"display","display",242065432);
var G__37461 = cljs.core.not(new cljs.core.Keyword(null,"display","display",242065432).cljs$core$IFn$_invoke$arity$1(state));
return (set_state.cljs$core$IFn$_invoke$arity$3 ? set_state.cljs$core$IFn$_invoke$arity$3(G__37459,G__37460,G__37461) : set_state.call(null,G__37459,G__37460,G__37461));
}),"onMouseOver":(function (){
var G__37462 = cljs.core.assoc_in;
var G__37463 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"current","current",-1088038603),new cljs.core.Keyword(null,"display","display",242065432)], null);
var G__37464 = true;
return (set_state.cljs$core$IFn$_invoke$arity$3 ? set_state.cljs$core$IFn$_invoke$arity$3(G__37462,G__37463,G__37464) : set_state.call(null,G__37462,G__37463,G__37464));
}),"onMouseOut":(function (){
var G__37465 = cljs.core.assoc_in;
var G__37466 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"current","current",-1088038603),new cljs.core.Keyword(null,"display","display",242065432)], null);
var G__37467 = false;
return (set_state.cljs$core$IFn$_invoke$arity$3 ? set_state.cljs$core$IFn$_invoke$arity$3(G__37465,G__37466,G__37467) : set_state.call(null,G__37465,G__37466,G__37467));
})});
return obj37456;
})(),"Are you feeling lucky?"),helix.core.get_react().createElement("div",(function (){var obj37469 = ({"style":(function (){var obj37471 = ({"display":helix.impl.props.__GT_js((cljs.core.truth_(new cljs.core.Keyword(null,"display","display",242065432).cljs$core$IFn$_invoke$arity$1(state))?"none":"grid")),"className":helix.impl.props.__GT_js("text-center")});
return obj37471;
})()});
return obj37469;
})(),helix.core.get_react().createElement("button",(function (){var obj37473 = ({"style":(function (){var obj37475 = ({"fontSize":helix.impl.props.__GT_js(app.core.responsive_font_siexe(new cljs.core.Keyword(null,"base","base",185279322)))});
return obj37475;
})(),"className":"text-center p10 block","onClick":(function (){
return (set_state.cljs$core$IFn$_invoke$arity$3 ? set_state.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc,new cljs.core.Keyword(null,"display-win?","display-win?",-867263381),true) : set_state.call(null,cljs.core.assoc,new cljs.core.Keyword(null,"display-win?","display-win?",-867263381),true));
})});
return obj37473;
})(),new cljs.core.Keyword(null,"address","address",559499426).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"result","result",1415092211).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"current","current",-1088038603).cljs$core$IFn$_invoke$arity$1(state)))),helix.core.get_react().createElement("p",(function (){var obj37477 = ({"className":"text-center","style":(function (){var obj37479 = ({"fontSize":helix.impl.props.__GT_js("4vw"),"display":helix.impl.props.__GT_js((cljs.core.truth_(new cljs.core.Keyword(null,"display-win?","display-win?",-867263381).cljs$core$IFn$_invoke$arity$1(state))?"none":"block"))});
return obj37479;
})()});
return obj37477;
})(),"Click on the key \u261D to find out if you won!")),helix.core.get_react().createElement("div",(function (){var obj37481 = ({"style":(function (){var obj37483 = ({"display":helix.impl.props.__GT_js((cljs.core.truth_(new cljs.core.Keyword(null,"display-win?","display-win?",-867263381).cljs$core$IFn$_invoke$arity$1(state))?"block":"none"))});
return obj37483;
})(),"className":"text-center text-4xl p10"});
return obj37481;
})(),(cljs.core.truth_((function (){var G__37485 = new cljs.core.Keyword(null,"address","address",559499426).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"result","result",1415092211).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"current","current",-1088038603).cljs$core$IFn$_invoke$arity$1(state)));
var fexpr__37484 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, ["12ib7dApVFvg82TXKycWBNpN8kFyiAN1dr",null], null), null);
return (fexpr__37484.cljs$core$IFn$_invoke$arity$1 ? fexpr__37484.cljs$core$IFn$_invoke$arity$1(G__37485) : fexpr__37484.call(null,G__37485));
})())?helix.core.get_react().createElement("div",null,helix.core.get_react().createElement("p",(function (){var obj37487 = ({"className":"border-3 text-green-500 pt-10"});
return obj37487;
})(),"WOOOOOOOO! Fucking hell! You won it! Take note of your private key:"),helix.core.get_react().createElement("p",(function (){var obj37489 = ({"className":"text-sm p-10"});
return obj37489;
})(),new cljs.core.Keyword(null,"key","key",-1516042587).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"result","result",1415092211).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"current","current",-1088038603).cljs$core$IFn$_invoke$arity$1(state))))):helix.core.get_react().createElement("div",null,helix.core.get_react().createElement("p",(function (){var obj37491 = ({"className":"pt-10 text-blue-500"});
return obj37491;
})(),"Nope! Sorry, not today..."),helix.core.get_react().createElement("p",(function (){var obj37493 = ({"className":"text-base"});
return obj37493;
})(),"Try again tomorrow...")))),helix.core.get_react().createElement("img",(function (){var obj37495 = ({"src":cljs.core.rand_nth(new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, ["https://media3.giphy.com/media/GhU3C9uMON5X8OLx2G/giphy.gif?cid=ecf05e47nlyjmfa9s1ljn8hxw418dmq4jik7uoku8575fexu&rid=giphy.gif&ct=g","https://media2.giphy.com/media/1AHZBEKJx5Mf57NQqb/giphy.gif?cid=ecf05e47j9pmfgook4yf3cdztme3eake5fxo3tpf8x60cdb7&rid=giphy.gif&ct=g","https://media0.giphy.com/media/30VBSGB7QW1RJpNcHO/giphy.gif?cid=ecf05e47j9pmfgook4yf3cdztme3eake5fxo3tpf8x60cdb7&rid=giphy.gif&ct=g","https://media0.giphy.com/media/30VBSGB7QW1RJpNcHO/giphy.gif?cid=ecf05e47j9pmfgook4yf3cdztme3eake5fxo3tpf8x60cdb7&rid=giphy.gif&ct=g","https://media0.giphy.com/media/30VBSGB7QW1RJpNcHO/giphy.gif?cid=ecf05e47j9pmfgook4yf3cdztme3eake5fxo3tpf8x60cdb7&rid=giphy.gif&ct=g","https://media0.giphy.com/media/287U9qQH5vrKg7KYSH/giphy.gif?cid=ecf05e471h2jyvklk295f15umw86g1atvvymxeztii830oo4&rid=giphy.gif&ct=g","https://media0.giphy.com/media/CayH3P0wRYbjPudd3J/giphy.gif?cid=ecf05e471h2jyvklk295f15umw86g1atvvymxeztii830oo4&rid=giphy.gif&ct=g","https://media3.giphy.com/media/uqPDIEPMODKne/giphy.gif?cid=ecf05e47t9woh5p3i50y2r3z5o07xf6iepzfodluqeamybuk&rid=giphy.gif&ct=g"], null)),"style":(function (){var obj37497 = ({"display":helix.impl.props.__GT_js((cljs.core.truth_(new cljs.core.Keyword(null,"display","display",242065432).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"current","current",-1088038603).cljs$core$IFn$_invoke$arity$1(state)))?"block":"none"))});
return obj37497;
})(),"className":"place-self-center pt-8","width":"150"});
return obj37495;
})()));
});
if(goog.DEBUG === true){
var G__37498 = G__37428;
(G__37498.displayName = "app.core/app");

return G__37498;
} else {
return G__37428;
}
})();



app.core.init = (function app$core$init(){
var root = module$node_modules$react_dom$client.createRoot(document.getElementById("app"));
return root.render(helix.core.get_react().createElement(app.core.app,null));
});

//# sourceMappingURL=app.core.js.map
